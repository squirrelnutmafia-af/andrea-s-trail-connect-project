import { Heart, Users, Shield, ArrowRight } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            More Than Just Trails
          </h2>
          <p className="text-lg text-body leading-relaxed">
            TrailMates is a global community built on the shared love of the outdoors. 
            We believe that every adventure is better when shared, and every trail is a chance 
            to make lasting connections. Whether you're a seasoned mountaineer or just starting out, 
            you belong here.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-heading mb-2">Inclusive Community</h3>
              <p className="text-sm text-muted-foreground">All skill levels welcome. From beginners to experts, everyone finds their place.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-heading mb-2">Real Connections</h3>
              <p className="text-sm text-muted-foreground">Meet people who share your passion and create memories together.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-heading mb-2">Safe & Respectful</h3>
              <p className="text-sm text-muted-foreground">Our community guidelines ensure a positive experience for everyone.</p>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all mt-6"
          >
            Read our community values
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
