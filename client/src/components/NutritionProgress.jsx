import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NutritionProgress = ({ label, value, goal, color }) => {
  const percentage = Math.min((value / goal) * 100, 100); // cap at 100%

  return (
    <div className="w-32 h-32 flex flex-col items-center">
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#333",
          trailColor: "#eee",
          textSize: "16px",
        })}
      />
      <p className="mt-2 text-sm text-gray-700">{label}</p>
      <p className="text-xs text-gray-500">
        {value} / {goal}
      </p>
    </div>
  );
};

export default NutritionProgress;
