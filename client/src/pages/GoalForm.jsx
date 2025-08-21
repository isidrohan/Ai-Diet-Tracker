import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoalForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    currentWeight: "",
    targetWeight: "",
    heightFeet: "",
    heightInches: "", // Add inches field
    activityLevel: "light",
    goalType: "gain",
    weeklyGoal: "0.5", // Always present, for both gain/loss
    weightGainRate: "500g", // For gain only
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Build payload to match backend expectations
      const payload = {
        userId: user?.user?.id || user?.id,
        gender: formData.gender,
        age: Number(formData.age),
        currentWeight: Number(formData.currentWeight),
        targetWeight: Number(formData.targetWeight),
        heightFeet: Number(formData.heightFeet),
        activityLevel: formData.activityLevel,
        goalType: formData.goalType,
        weightGainRate: formData.goalType === "gain" ? formData.weightGainRate : undefined,
      };
      const res = await API.post("/goal/calculate", payload);
      alert("Goal saved successfully!");
      console.log("Nutrition Plan:", res.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save goal. Please check your input.");
      console.error("Goal save error:", err.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Set Your Health Goal</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="1"
              value={formData.age}
              onChange={handleChange}
              placeholder="Years"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="currentWeight">
                Current Weight (kg)
              </label>
              <input
                type="number"
                id="currentWeight"
                name="currentWeight"
                min="1"
                value={formData.currentWeight}
                onChange={handleChange}
                required
                placeholder="e.g. 70"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="targetWeight">
                Target Weight (kg)
              </label>
              <input
                type="number"
                id="targetWeight"
                name="targetWeight"
                min="1"
                value={formData.targetWeight}
                onChange={handleChange}
                required
                placeholder="e.g. 65"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          
          {/* Height */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="heightFeet">
                Height (feet)
              </label>
              <input
                type="number"
                id="heightFeet"
                name="heightFeet"
                min="1"
                value={formData.heightFeet}
                onChange={handleChange}
                required
                placeholder="e.g. 5"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="heightInches">
                Height (inches)
              </label>
              <input
                type="number"
                id="heightInches"
                name="heightInches"
                min="0"
                value={formData.heightInches}
                onChange={handleChange}
                required
                placeholder="e.g. 7"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="activityLevel">
              Activity Level
            </label>
            <select
              name="activityLevel"
              id="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="light">Light (sedentary)</option>
              <option value="moderate">Moderate (light exercise)</option>
              <option value="active">Active (frequent exercise)</option>
            </select>
          </div>

          {/* Goal Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="goalType">
              Goal
            </label>
            <select
              name="goalType"
              id="goalType"
              value={formData.goalType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="gain">Gain weight</option>
              <option value="lose">Lose weight</option>
            </select>
          </div>

          {/* Weekly Goal (for loss) or Weight Gain Rate (for gain) */}
          {formData.goalType === "gain" ? (
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="weightGainRate">
                Weight Gain Rate
              </label>
              <select
                name="weightGainRate"
                id="weightGainRate"
                value={formData.weightGainRate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="500g">0.5 kg / week</option>
                <option value="1kg">1 kg / week</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="weeklyGoal">
                Weekly Weight Loss Goal
              </label>
              <select
                name="weeklyGoal"
                id="weeklyGoal"
                value={formData.weeklyGoal}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="0.5">0.5 kg / week</option>
                <option value="1">1 kg / week</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded text-white font-semibold transition
              ${submitting
                ? "bg-green-400 cursor-wait"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {submitting ? "Submitting..." : "Submit Goal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;