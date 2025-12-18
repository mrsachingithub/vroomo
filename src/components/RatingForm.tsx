import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RatingFormProps {
  requestId: string;
  mechanicId: string;
  customerId: string;
  onSubmitted: () => void;
}

const RatingForm = ({ requestId, mechanicId, customerId, onSubmitted }: RatingFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews" as any).insert({
      request_id: requestId,
      mechanic_id: mechanicId,
      customer_id: customerId,
      rating,
      review_text: reviewText || null,
    } as any);

    setSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you!",
      description: "Your review has been submitted",
    });
    onSubmitted();
  };

  return (
    <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
      <h4 className="font-semibold text-foreground">Rate this service</h4>
      
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Share your experience (optional)"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows={3}
      />

      <Button
        onClick={handleSubmit}
        disabled={submitting || rating === 0}
        className="w-full"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};

export default RatingForm;
