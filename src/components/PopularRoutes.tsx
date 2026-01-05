import { MapPin, Clock, TrendingUp } from "lucide-react";
import routeDolomites from "@/assets/route-dolomites.jpg";
import routeSwissAlps from "@/assets/route-swiss-alps.jpg";
import routePyrenees from "@/assets/route-pyrenees.jpg";
import routeNorway from "@/assets/route-norway.jpg";
import routeScotland from "@/assets/route-scotland.jpg";
import routePatagonia from "@/assets/route-patagonia.jpg";

const routes = [
  {
    name: "Tre Cime di Lavaredo",
    location: "Dolomites, Italy",
    difficulty: "Moderate",
    duration: "4-5 hours",
    image: routeDolomites,
  },
  {
    name: "Oeschinensee Loop",
    location: "Swiss Alps, Switzerland",
    difficulty: "Easy",
    duration: "3 hours",
    image: routeSwissAlps,
  },
  {
    name: "Cirque de Gavarnie",
    location: "Pyrenees, France",
    difficulty: "Moderate",
    duration: "5-6 hours",
    image: routePyrenees,
  },
  {
    name: "Trolltunga Trail",
    location: "Hordaland, Norway",
    difficulty: "Challenging",
    duration: "10-12 hours",
    image: routeNorway,
  },
  {
    name: "Ben Nevis Summit",
    location: "Scottish Highlands, UK",
    difficulty: "Challenging",
    duration: "7-9 hours",
    image: routeScotland,
  },
  {
    name: "Torres del Paine W Trek",
    location: "Patagonia, Chile",
    difficulty: "Multi-day",
    duration: "4-5 days",
    image: routePatagonia,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-amber-100 text-amber-700",
  Challenging: "bg-orange-100 text-orange-700",
  "Multi-day": "bg-purple-100 text-purple-700",
};

const PopularRoutes = () => {
  return (
    <section className="section-padding bg-secondary/20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Popular Routes
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Explore breathtaking trails handpicked by our community. From scenic day hikes to epic multi-day adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <article
              key={route.name}
              className="group bg-card rounded-2xl overflow-hidden border border-border card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[route.difficulty]}`}>
                    {route.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-heading group-hover:text-primary transition-colors">
                  {route.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{route.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{route.duration}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
