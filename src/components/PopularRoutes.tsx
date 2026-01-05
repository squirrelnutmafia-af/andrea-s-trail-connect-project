import { ArrowRight } from "lucide-react";
import routeBavaria from "@/assets/route-bavaria.jpg";
import routeDolomites from "@/assets/route-dolomites.jpg";
import routeSwissAlps from "@/assets/route-swiss-alps.jpg";
import routeLakeDistrict from "@/assets/route-lakedistrict.jpg";
import routePyrenees from "@/assets/route-pyrenees.jpg";
import routeTyrol from "@/assets/route-tyrol.jpg";

const routes = [
  {
    name: "Bavaria, Germany",
    routes: 823,
    image: routeBavaria,
  },
  {
    name: "Dolomites, Italy",
    routes: 342,
    image: routeDolomites,
  },
  {
    name: "Swiss Alps",
    routes: 912,
    image: routeSwissAlps,
  },
  {
    name: "Lake District, England",
    routes: 456,
    image: routeLakeDistrict,
  },
  {
    name: "Pyrenees, France",
    routes: 287,
    image: routePyrenees,
  },
  {
    name: "Tyrol, Austria",
    routes: 534,
    image: routeTyrol,
  },
];

const PopularRoutes = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-heading">
            Explore hiking routes
          </h2>
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Explore more routes
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {routes.map((route, index) => (
            <a
              key={route.name}
              href="#"
              className="flex-shrink-0 group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative w-32 h-40 md:w-36 md:h-44 rounded-2xl overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-2 space-y-0.5">
                <h3 className="font-semibold text-heading text-sm group-hover:text-primary transition-colors">
                  {route.name}
                </h3>
                <p className="text-xs text-muted-foreground">{route.routes} routes</p>
              </div>
            </a>
          ))}
        </div>

        <a
          href="#"
          className="sm:hidden flex items-center justify-center gap-2 text-primary font-semibold mt-6 border-t border-border pt-4"
        >
          Explore more routes
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default PopularRoutes;
