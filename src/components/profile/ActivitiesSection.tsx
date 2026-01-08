import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityCard, { Activity } from "./ActivityCard";

interface ActivitiesSectionProps {
  userName: string;
  activitiesTab: string;
  setActivitiesTab: (tab: string) => void;
  activities: Activity[];
}

const ActivitiesSection = ({ userName, activitiesTab, setActivitiesTab, activities }: ActivitiesSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-foreground uppercase text-sm mb-4">
        {userName.toUpperCase()}'S ACTIVITIES
      </h3>

      <Tabs value={activitiesTab} onValueChange={setActivitiesTab} className="mb-4">
        <TabsList className="bg-transparent p-0 h-auto gap-4">
          <TabsTrigger
            value="upcoming"
            className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Upcoming | 2
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Recent | 1
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Past | 60
          </TabsTrigger>
          <TabsTrigger
            value="organised"
            className="px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Organised | 43
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesSection;
