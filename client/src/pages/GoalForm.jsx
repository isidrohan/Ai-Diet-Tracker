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
      console.log("Nutrition Plan:", res.data);
      // Directly navigate to dashboard without alert
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save goal. Please check your input.");
      console.error("Goal save error:", err.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 py-8 px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Set Your Health Goals
          </h2>
          <p className="text-gray-600">Let's create your personalized nutrition plan</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gender */}
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="gender">
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="age">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Weight */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="currentWeight">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="targetWeight">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
          </div>
          
          {/* Height */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="heightFeet">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="heightInches">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="relative">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="activityLevel">
              Activity Level
            </label>
            <div className="relative">
              <select
                name="activityLevel"
                id="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none"
              >
              <option value="light">Light (sedentary)</option>
              <option value="moderate">Moderate (light exercise)</option>
              <option value="active">Active (frequent exercise)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          </div>

          {/* Goal Type */}
          <div className="relative">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="goalType">
              Goal
            </label>
            <div className="relative">
              <select
                name="goalType"
                id="goalType"
                value={formData.goalType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none"
              >
                <option value="gain">Gain weight</option>
                <option value="lose">Lose weight</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Weekly Goal (for loss) or Weight Gain Rate (for gain) */}
          {formData.goalType === "gain" ? (
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="weightGainRate">
                Weight Gain Rate
              </label>
              <div className="relative">
                <select
                  name="weightGainRate"
                  id="weightGainRate"
                  value={formData.weightGainRate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none"
                >
                  <option value="500g">0.5 kg / week</option>
                  <option value="1kg">1 kg / week</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="weeklyGoal">
                Weekly Weight Loss Goal
              </label>
              <div className="relative">
                <select
                  name="weeklyGoal"
                  id="weeklyGoal"
                  value={formData.weeklyGoal}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 appearance-none"
                >
                  <option value="0.5">0.5 kg / week</option>
                  <option value="1">1 kg / week</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-200
              ${submitting
                ? "bg-emerald-400 cursor-wait"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30"
              }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Your Plan...
              </div>
            ) : (
              "Create My Plan"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;