import React from "react";

interface StarRatingProps {
  count: number;
  value: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  onChange?: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  count,
  value,
  size = 24,
  activeColor = "#ffd700",
  inactiveColor = "#dcdcdc",
  onChange,
}) => {
  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        cursor: onChange ? "pointer" : "default",
      }}
    >
      {stars.map((star) => (
        <svg
          key={star}
          height={size}
          width={size}
          viewBox="0 0 24 24"
          fill={star <= value ? activeColor : inactiveColor}
          onClick={() => onChange && onChange(star)}
          style={{ marginRight: 2 }}
        >
          <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
