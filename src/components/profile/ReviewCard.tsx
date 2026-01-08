export interface Review {
  text: string;
  author: string;
  location: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => (
  <div className="min-w-[280px] p-4 bg-card rounded-xl border border-border">
    <p className="text-sm text-foreground mb-4 line-clamp-4">{review.text}</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-muted" />
      <div>
        <p className="text-sm font-semibold text-foreground">{review.author}</p>
        <p className="text-xs text-muted-foreground">
          {review.location}, {review.date}
        </p>
      </div>
    </div>
  </div>
);

export default ReviewCard;
