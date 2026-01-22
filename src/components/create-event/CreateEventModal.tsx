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

export type ActivityType = "Hiking" | "Cycling" | "Climbing" | "Skiing" | "Bouldering" | "Social";

export interface CreateEventFormData {
  activityType: ActivityType | null;
  routeId: string | null;
  date: Date | null;
  time: string | null;
}

const STORAGE_KEY = "create-event-draft";

const getInitialFormData = (): CreateEventFormData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        date: parsed.date ? new Date(parsed.date) : null,
      };
    }
  } catch (e) {
    console.error("Failed to parse saved form data", e);
  }
  return {
    activityType: null,
    routeId: null,
    date: null,
    time: null,
  };
};

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [formData, setFormData] = useState<CreateEventFormData>(getInitialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Determine if route selection step is needed
  const needsRouteStep = formData.activityType === "Hiking" || 
                         formData.activityType === "Cycling" || 
                         formData.activityType === "Climbing";

  // Calculate total steps and current progress
  const totalSteps = needsRouteStep ? 3 : 2;
  const progressValue = (currentStep / totalSteps) * 100;

  // Check if form has any data
  const hasUnsavedChanges = 
    formData.activityType !== null || 
    formData.routeId !== null || 
    formData.date !== null || 
    formData.time !== null;

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
    setFormData({
      activityType: null,
      routeId: null,
      date: null,
      time: null,
    });
    setCurrentStep(1);
    setShowConfirmDialog(false);
    onOpenChange(false);
  };

  const handleContinueEditing = () => {
    setShowConfirmDialog(false);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // If on date step (step 3 or 2 depending on flow) and route step was skipped
      if (!needsRouteStep && currentStep === 2) {
        setCurrentStep(1);
      } else if (needsRouteStep && currentStep === 3) {
        setCurrentStep(2);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleActivitySelect = (activity: ActivityType) => {
    setFormData(prev => ({ ...prev, activityType: activity }));
    
    // Determine next step based on activity
    if (activity === "Hiking" || activity === "Cycling" || activity === "Climbing") {
      setCurrentStep(2);
    } else {
      // Skip route selection for Skiing, Bouldering, Social
      setCurrentStep(needsRouteStep ? 3 : 2);
    }
  };

  const handleRouteSelect = (routeId: string) => {
    setFormData(prev => ({ ...prev, routeId }));
    setCurrentStep(3);
  };

  const handleDateTimeChange = (date: Date | null, time: string | null) => {
    setFormData(prev => ({ ...prev, date, time }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "What adventure are you planning?";
      case 2:
        return needsRouteStep ? "Pick a route for your group" : "When are you heading out?";
      case 3:
        return "When are you heading out?";
      default:
        return "";
    }
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <ActivityTypeStep 
          selectedActivity={formData.activityType}
          onSelect={handleActivitySelect}
        />
      );
    }

    if (currentStep === 2 && needsRouteStep) {
      return (
        <RouteSelectionStep 
          onSelect={handleRouteSelect} 
          selectedRouteId={formData.routeId || undefined}
        />
      );
    }

    // Date/Time step (step 2 for non-route activities, step 3 for route activities)
    return (
      <DateTimeStep
        date={formData.date}
        time={formData.time}
        onChange={handleDateTimeChange}
      />
    );
  };

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
              {currentStep > 1 && (
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
                  Step {currentStep} of {totalSteps}
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
          <div className="flex-1 overflow-hidden">
            <div className={`mx-auto px-6 py-8 h-full ${currentStep === 2 && needsRouteStep ? 'max-w-7xl' : 'max-w-3xl py-12'}`}>
              {!(currentStep === 2 && needsRouteStep) && (
                <h1 className="text-3xl font-bold text-foreground mb-8">
                  {getStepTitle()}
                </h1>
              )}
              {renderStep()}
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
