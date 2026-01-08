import ReviewCard, { Review } from "./ReviewCard";

interface ReviewsSectionProps {
  userName: string;
  reviewCount: number;
  reviews: Review[];
}

const ReviewsSection = ({ userName, reviewCount, reviews }: ReviewsSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground uppercase text-sm">
          {userName.toUpperCase()}'S REVIEWS ({reviewCount})
        </h3>
        <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
          Show all →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
