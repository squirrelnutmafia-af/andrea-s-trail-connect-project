import { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ActivityTypeStep } from "./steps/ActivityTypeStep";
import { RouteSelectionStep } from "./steps/RouteSelectionStep";
import { DateTimeStep } from "./steps/DateTimeStep";
import { EventDetailsStep } from "./steps/EventDetailsStep";
import { EventDescriptionStep } from "./steps/EventDescriptionStep";
import { TransportOptionsStep, TransportOption } from "./steps/TransportOptionsStep";
import { PublicTransportStep } from "./steps/PublicTransportStep";
import { CarTransportStep } from "./steps/CarTransportStep";
import { EventPreviewStep } from "./steps/EventPreviewStep";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { mockRoutes } from "@/data/mockRoutes";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

export type ActivityType = "Hiking" | "Cycling" | "Climbing" | "Skiing" | "Bouldering" | "Social";

export interface CreateEventFormData {
  activityType: ActivityType | null;
  routeId: string | null;
  date: Date | null;
  time: string | null;
  eventName: string;
  participants: number | null;
  description: string;
  hasDisclaimer: boolean;
  transportOption: TransportOption | null;
  publicTransport: {
    meetingPoint: string;
    ticketCost: string;
    instructions: string;
  };
  carTransport: {
    pickupLocation: string;
    fuelCost: string;
    carDescription: string;
  };
}

const STORAGE_KEY = "create-event-draft";

const defaultFormData: CreateEventFormData = {
  activityType: null,
  routeId: null,
  date: null,
  time: null,
  eventName: "",
  participants: null,
  description: "",
  hasDisclaimer: false,
  transportOption: null,
  publicTransport: {
    meetingPoint: "",
    ticketCost: "",
    instructions: "",
  },
  carTransport: {
    pickupLocation: "",
    fuelCost: "",
    carDescription: "",
  },
};

const getInitialFormData = (): CreateEventFormData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure nested objects exist
      return {
        ...defaultFormData,
        ...parsed,
        date: parsed.date ? new Date(parsed.date) : null,
        publicTransport: {
          ...defaultFormData.publicTransport,
          ...(parsed.publicTransport || {}),
        },
        carTransport: {
          ...defaultFormData.carTransport,
          ...(parsed.carTransport || {}),
        },
      };
    }
  } catch (e) {
    console.error("Failed to parse saved form data", e);
  }
  return { ...defaultFormData };
};

// Step identifiers for the flow
type StepId = 
  | "activity"
  | "route"
  | "datetime"
  | "details"
  | "description"
  | "transport"
  | "transport-public"
  | "transport-car"
  | "preview";

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [formData, setFormData] = useState<CreateEventFormData>(getInitialFormData);
  const [currentStep, setCurrentStep] = useState<StepId>("activity");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Determine if route selection step is needed
  const needsRouteStep = formData.activityType === "Hiking" || 
                         formData.activityType === "Cycling" || 
                         formData.activityType === "Climbing";

  // Build the step flow based on selected options
  const getStepFlow = (): StepId[] => {
    const flow: StepId[] = ["activity"];
    
    if (needsRouteStep) {
      flow.push("route");
    }
    
    flow.push("datetime", "details", "description", "transport");
    
    if (formData.transportOption === "public") {
      flow.push("transport-public");
    } else if (formData.transportOption === "car") {
      flow.push("transport-car");
    }
    
    flow.push("preview");
    
    return flow;
  };

  const stepFlow = getStepFlow();
  const currentStepIndex = stepFlow.indexOf(currentStep);
  const totalSteps = stepFlow.length;
  const progressValue = ((currentStepIndex + 1) / totalSteps) * 100;

  // Check if form has any data
  const hasUnsavedChanges = 
    formData.activityType !== null || 
    formData.routeId !== null || 
    formData.date !== null || 
    formData.time !== null ||
    formData.eventName !== "" ||
    formData.participants !== null ||
    formData.description !== "";

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, hasUnsavedChanges]);

  // Reset step when modal opens with saved data
  useEffect(() => {
    if (open) {
      const saved = getInitialFormData();
      if (saved.activityType) {
        setFormData(saved);
      }
    }
  }, [open]);

  const handleClose = useCallback(() => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onOpenChange(false);
    }
  }, [hasUnsavedChanges, onOpenChange]);

  const handleDiscard = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({ ...defaultFormData });
    setCurrentStep("activity");
    setShowConfirmDialog(false);
    onOpenChange(false);
  };

  const handleContinueEditing = () => {
    setShowConfirmDialog(false);
  };

  const handleBack = () => {
    const currentIndex = stepFlow.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepFlow[currentIndex - 1]);
    }
  };

  const goToNextStep = () => {
    const currentIndex = stepFlow.indexOf(currentStep);
    if (currentIndex < stepFlow.length - 1) {
      // Recalculate flow to get the correct next step
      const newFlow = getStepFlow();
      const newIndex = newFlow.indexOf(currentStep);
      if (newIndex < newFlow.length - 1) {
        setCurrentStep(newFlow[newIndex + 1]);
      }
    }
  };

  const handleActivitySelect = (activity: ActivityType) => {
    setFormData(prev => ({ ...prev, activityType: activity }));
    
    // Determine next step based on activity
    if (activity === "Hiking" || activity === "Cycling" || activity === "Climbing") {
      setCurrentStep("route");
    } else {
      setCurrentStep("datetime");
    }
  };

  const handleRouteSelect = (routeId: string) => {
    setFormData(prev => ({ ...prev, routeId }));
    setCurrentStep("datetime");
  };

  const handleDateTimeChange = (date: Date | null, time: string | null) => {
    setFormData(prev => ({ ...prev, date, time }));
  };

  const handleEventDetailsChange = (eventName: string, participants: number | null) => {
    setFormData(prev => ({ ...prev, eventName, participants }));
  };

  const handleEventDescriptionChange = (description: string, hasDisclaimer: boolean) => {
    setFormData(prev => ({ ...prev, description, hasDisclaimer }));
  };

  const handleTransportSelect = (option: TransportOption) => {
    setFormData(prev => ({ ...prev, transportOption: option }));
    
    // Navigate based on selection
    if (option === "public") {
      setCurrentStep("transport-public");
    } else if (option === "car") {
      setCurrentStep("transport-car");
    } else {
      setCurrentStep("preview");
    }
  };

  const handlePublicTransportChange = (meetingPoint: string, ticketCost: string, instructions: string) => {
    setFormData(prev => ({
      ...prev,
      publicTransport: { meetingPoint, ticketCost, instructions }
    }));
  };

  const handleCarTransportChange = (pickupLocation: string, fuelCost: string, carDescription: string) => {
    setFormData(prev => ({
      ...prev,
      carTransport: { pickupLocation, fuelCost, carDescription }
    }));
  };

  const queryClient = useQueryClient();

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Get route details if selected
      const selectedRoute = formData.routeId 
        ? mockRoutes.find(r => r.id === formData.routeId) 
        : null;

      // Build transport details JSON
      const transportDetails = formData.transportOption === "public" 
        ? formData.publicTransport 
        : formData.transportOption === "car" 
          ? formData.carTransport 
          : null;

      // Determine departure location based on transport option
      let departureLocation = "Meet at trailhead";
      if (formData.transportOption === "public" && formData.publicTransport.meetingPoint) {
        departureLocation = formData.publicTransport.meetingPoint;
      } else if (formData.transportOption === "car" && formData.carTransport.pickupLocation) {
        departureLocation = formData.carTransport.pickupLocation;
      }

      // Map transport option to display text
      const transportMethodMap: Record<TransportOption, string> = {
        public: "Public Transport",
        car: "Carpool",
        none: "Meet at Location",
      };

      // Build event data matching the database schema
      const eventData = {
        title: formData.eventName || "Untitled Event",
        event_date: formData.date ? format(formData.date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        time: formData.time || "09:00",
        duration: selectedRoute ? `${selectedRoute.duration}h` : "3h",
        activity_type: (formData.activityType === "Hiking" || formData.activityType === "Cycling") 
          ? formData.activityType 
          : "Hiking" as const, // Default to Hiking for unsupported types
        difficulty: selectedRoute?.difficulty || "intermediate",
        distance: selectedRoute ? `${selectedRoute.distance} km` : "10 km",
        elevation: selectedRoute ? `${selectedRoute.elevationGain}m` : "500m",
        total_height: selectedRoute ? `${selectedRoute.elevationGain}m` : "500m",
        height_type: "height" as const,
        departure_location: departureLocation,
        transport_method: formData.transportOption 
          ? transportMethodMap[formData.transportOption] 
          : "Meet at Location",
        organizer: "You", // TODO: Use actual user info when auth is implemented
        organizer_avatar: null,
        image: selectedRoute?.imageUrl || null,
        coming: 1, // Organizer counts as first participant
        available: formData.participants || null,
        participants: [],
        description: formData.description || null,
        has_disclaimer: formData.hasDisclaimer,
        route_id: formData.routeId,
        transport_details: transportDetails,
      };

      const { error } = await supabase.from("events").insert(eventData);

      if (error) {
        console.error("Error creating event:", error);
        throw error;
      }

      // Invalidate queries to refresh the events list
      queryClient.invalidateQueries({ queryKey: ["events"] });
      
      toast.success("Event published successfully! 🎉");
      localStorage.removeItem(STORAGE_KEY);
      setFormData(getInitialFormData());
      setCurrentStep("activity");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to publish event:", error);
      toast.error("Failed to publish event. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case "activity":
        return "What adventure are you planning?";
      case "route":
        return "Pick a route for your group";
      case "datetime":
        return "When are you heading out?";
      case "details":
        return "Tell us about your event";
      case "description":
        return "Describe your adventure";
      case "transport":
        return "How will you get there?";
      case "transport-public":
        return "Public transport details";
      case "transport-car":
        return "Carpool details";
      case "preview":
        return "Review your event";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "activity":
        return (
          <ActivityTypeStep 
            selectedActivity={formData.activityType}
            onSelect={handleActivitySelect}
          />
        );
      case "route":
        return (
          <RouteSelectionStep 
            onSelect={handleRouteSelect} 
            selectedRouteId={formData.routeId || undefined}
          />
        );
      case "datetime":
        return (
          <DateTimeStep
            date={formData.date}
            time={formData.time}
            onChange={handleDateTimeChange}
          />
        );
      case "details":
        return (
          <EventDetailsStep
            eventName={formData.eventName}
            participants={formData.participants}
            onChange={handleEventDetailsChange}
          />
        );
      case "description":
        return (
          <EventDescriptionStep
            description={formData.description}
            hasDisclaimer={formData.hasDisclaimer}
            onChange={handleEventDescriptionChange}
          />
        );
      case "transport":
        return (
          <TransportOptionsStep
            selected={formData.transportOption}
            onSelect={handleTransportSelect}
          />
        );
      case "transport-public":
        return (
          <PublicTransportStep
            meetingPoint={formData.publicTransport.meetingPoint}
            ticketCost={formData.publicTransport.ticketCost}
            instructions={formData.publicTransport.instructions}
            onChange={handlePublicTransportChange}
          />
        );
      case "transport-car":
        return (
          <CarTransportStep
            pickupLocation={formData.carTransport.pickupLocation}
            fuelCost={formData.carTransport.fuelCost}
            carDescription={formData.carTransport.carDescription}
            onChange={handleCarTransportChange}
          />
        );
      case "preview":
        return (
          <EventPreviewStep
            formData={formData}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        );
      default:
        return null;
    }
  };

  // Steps that need "Next" button (don't auto-advance)
  const needsNextButton = ["datetime", "details", "description", "transport-public", "transport-car"].includes(currentStep);
  const isRouteStep = currentStep === "route";

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}>
        <DialogContent 
          className="max-w-none w-screen h-screen m-0 p-0 rounded-none border-none flex flex-col"
          hideCloseButton
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-4">
              {currentStepIndex > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <Progress value={progressValue} className="w-24 h-2" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <div className={`mx-auto px-6 py-8 h-full ${isRouteStep ? 'max-w-7xl' : 'max-w-3xl py-12'}`}>
              {!isRouteStep && (
                <h1 className="text-3xl font-bold text-foreground mb-8">
                  {getStepTitle()}
                </h1>
              )}
              {renderStep()}
              
              {/* Next Button for steps that need it */}
              {needsNextButton && (
                <div className="mt-8">
                  <Button 
                    onClick={goToNextStep}
                    className="w-full h-12"
                    size="lg"
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              What would you like to do with your event draft?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={handleContinueEditing}>
              Continue editing
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDiscard}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
