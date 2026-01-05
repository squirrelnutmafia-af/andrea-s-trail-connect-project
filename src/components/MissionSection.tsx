import missionImage from "@/assets/mission-hiking.jpg";

const MissionSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden">
            <img
              src={missionImage}
              alt="Friends hiking through a canyon"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-heading">
              What we stand for
            </h2>
            <p className="text-body leading-relaxed">
              We are a community of outdoor sports lovers and restless mountains explorers and we believe it is more fun to do it together. Most of events are organized by passionate community members, just like you, and therefore free of charge except transportation and personal costs.
            </p>
            <a
              href="#"
              className="inline-block text-heading underline underline-offset-4 hover:text-primary transition-colors font-medium"
            >
              More about community rules and values
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
