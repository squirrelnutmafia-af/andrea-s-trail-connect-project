import { Users } from "lucide-react";

const communities = [
  { city: "Munich", country: "Germany", members: 2340 },
  { city: "Zurich", country: "Switzerland", members: 1850 },
  { city: "Geneva", country: "Switzerland", members: 1420 },
  { city: "Denver", country: "USA", members: 3100 },
  { city: "Vancouver", country: "Canada", members: 2780 },
  { city: "Vienna", country: "Austria", members: 1650 },
  { city: "Barcelona", country: "Spain", members: 1920 },
  { city: "Oslo", country: "Norway", members: 1380 },
];

const CommunitiesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Find Your Local Community
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Join thousands of outdoor enthusiasts in cities around the world. 
            Connect with hikers near you and plan your next adventure together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {communities.map((community, index) => (
            <a
              key={community.city}
              href="#"
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-soft transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-heading group-hover:text-primary transition-colors">
                    {community.city}
                  </h3>
                  <p className="text-sm text-muted-foreground">{community.country}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-heading">{community.members.toLocaleString()}</span> members
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
