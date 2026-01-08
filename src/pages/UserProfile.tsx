import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ProfileHeader,
  StatsSection,
  ReviewsSection,
  ActivitiesSection,
} from "@/components/profile";
import type { Review, Activity } from "@/components/profile";

const UserProfile = () => {
  const [statsTab, setStatsTab] = useState("all-time");
  const [activitiesTab, setActivitiesTab] = useState("upcoming");

  const user = {
    name: "Anna",
    badge: "Trail Rookie",
    reviews: 34,
    age: 32,
    membership: "Sustainer",
    location: "Based in Germany",
    experience: "5 years hiking",
    eventsOrganised: 43,
    hikesCompleted: 61,
    cyclingActivities: 4,
    routesCreated: 52,
    viaFerrataActivities: 8,
    difficulties: ["T3", "T4", "T6"],
  };

  const stats = {
    lastMonth: {
      hiking: 9,
      cycling: 1,
      viaFerrata: 0,
      other: 0,
      distance: "12km",
      elevation: "982m",
    },
    allTime: {
      hiking: 43,
      cycling: 4,
      viaFerrata: 1,
      other: 1,
      distance: "34km",
      elevation: "3.982m",
    },
    lastYear: {
      hiking: 43,
      cycling: 3,
      viaFerrata: 1,
      other: 0,
      distance: "28km",
      elevation: "3.100m",
    },
  };

  const difficultyStats = [
    { level: "T1", count: 0 },
    { level: "T2", count: 34 },
    { level: "T3", count: 23 },
    { level: "T4", count: 3 },
    { level: "T5", count: 15 },
    { level: "T6", count: 4 },
  ];

  const reviews: Review[] = [
    {
      text: 'Anna, thank you for organising an excellent "tramping trip". Certainly a fit and furious hike. See you on the next one',
      author: "Karina",
      location: "Hochstaufen (1771m)",
      date: "June 2024",
    },
    {
      text: 'Anna, thank you for organising an excellent "tramping trip". Certainly a fit and furious hike. See you on the next one',
      author: "Karina",
      location: "Hochstaufen (1771m)",
      date: "June 2024",
    },
    {
      text: "Great experience hiking with Anna! Very well organized and she always makes sure everyone is safe. Highly recommend!",
      author: "Marcus",
      location: "Wendelstein (1838m)",
      date: "May 2024",
    },
  ];

  const activities: Activity[] = [
    {
      organizer: "Vera",
      attendees: 14,
      status: "Closed",
      statusType: "closed",
      title: "Jochberg hike and swim",
      userRole: "You are going",
      time: "6:45",
      from: "Munich",
      transport: "Train",
      type: "Hiking",
      distance: "18km",
      elevation: "1982 elevation",
      duration: "4h 30min",
      difficulty: "T3",
    },
    {
      organizer: "Anna",
      attendees: 14,
      status: "1 spot available",
      statusType: "available",
      title: "Jochberg hike and swim",
      userRole: "You're the organiser",
      time: "6:45",
      from: "Munich",
      transport: "Train",
      type: "Hiking",
      distance: "18km",
      elevation: "1982 elevation",
      duration: "4h 30min",
      difficulty: "T3",
    },
  ];

  const currentStats =
    statsTab === "last-month"
      ? stats.lastMonth
      : statsTab === "all-time"
      ? stats.allTime
      : stats.lastYear;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="section-container">
          <ProfileHeader user={user} />

          <StatsSection
            statsTab={statsTab}
            setStatsTab={setStatsTab}
            currentStats={currentStats}
            difficultyStats={difficultyStats}
          />

          <ReviewsSection
            userName={user.name}
            reviewCount={user.reviews}
            reviews={reviews}
          />

          <ActivitiesSection
            userName={user.name}
            activitiesTab={activitiesTab}
            setActivitiesTab={setActivitiesTab}
            activities={activities}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
