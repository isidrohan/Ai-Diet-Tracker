
import { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import 'react-calendar/dist/Calendar.css';

// ...existing code...

import NutritionProgress from "./NutritionProgress";

function ProgressBar({ label, value, goal, color }) {
  const percent = Math.min(Math.round((value / goal) * 100), 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-sm text-white">
          {value} / {goal}
        </span>
      </div>
      <div className="w-full bg-white/30 rounded-full h-4">
        <div
          className="h-4 rounded-full"
          style={{ width: percent + "%", background: color }}
        ></div>
      </div>
    </div>
  );
}

const CalendarTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const userId = user?.user?.id || user?.id;
        const res = await API.get(`/goal/user`, { params: { userId } });
        console.log("logged in user data ", res);
        setNutrition(res.data);
      } catch (err) {
        console.error("Failed to fetch nutrition:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNutrition();
  }, []);
  const fetchFoodLogsByDate = async (date) => {
    try {
      setLoading(true);
      // Format date in local time (YYYY-MM-DD)
      const formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
      const userId = user?.user?.id || user?.id;

      // Call your backend API with userId
      const res = await API.get(`/foodlogs/date`, {
        params: { date: formattedDate, userId },
      });

      // Filter logs to only those for the logged-in user (if backend doesn't already do this)
      const foodLogs = (res.data || []).filter((log) => {
        // log.user can be string or object
        const logUserId =
          typeof log.user === "object" ? log.user._id : log.user;
        return logUserId === userId;
      });

      // Calculate totals
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      console.log(foodLogs);
      foodLogs.forEach((log) => {
        totalCalories += Number(log.calories) || 0;
        totalProtein += Number(log.protein) || 0;
        totalCarbs += Number(log.carbs) || 0;
        totalFat += Number(log.fat) || 0;
      });

      setTotals({
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
      });
    } catch (err) {
      console.error("Error fetching food logs:", err);
      setTotals(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodLogsByDate(selectedDate);
  }, [selectedDate]);

  // Calculate calories left
  const caloriesGoal = nutrition?.calories || 1550;
  const caloriesConsumed = totals?.calories || 0;
  const caloriesLeft = Math.max(caloriesGoal - caloriesConsumed, 0);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-0 bg-white shadow rounded">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-400 to-orange-300 rounded-t-lg px-8 py-6 flex flex-col md:flex-row items-center justify-between relative">
        <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold text-white mb-2">
              My Food Tracker
            </h2>
            <div className="flex gap-8 text-white text-lg">
              <div className="flex flex-col items-center">
                <span className="font-semibold">TOTAL</span>
                <span>{totals?.calories || 0} cals</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">CARBS</span>
                <span>{totals?.carbs || 0}g</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">PROTEIN</span>
                <span>{totals?.protein || 0}g</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">FAT</span>
                <span>{totals?.fat || 0}g</span>
              </div>
            </div>
          </div>
        </div>
        {/* Progress Bars for Calories, Protein, Carbs, Fat */}
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0 md:w-1/3">
          <ProgressBar
            label="Calories"
            value={totals?.calories || 0}
            goal={nutrition?.calories || 1550}
            color="#ff6b6b"
          />
          <ProgressBar
            label="Protein"
            value={totals?.protein || 0}
            goal={nutrition?.protein || 50}
            color="#4ecdc4"
          />
          <ProgressBar
            label="Carbs"
            value={totals?.carbs || 0}
            goal={nutrition?.carbs || 250}
            color="#1a73e8"
          />
          <ProgressBar
            label="Fat"
            value={totals?.fat || 0}
            goal={nutrition?.fat || 70}
            color="#feca57"
          />
        </div>
      </div>

      {/* Calendar and nutrition de    tails side by side */}
      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Calendar */}
          <div className="md:w-1/2 w-full bg-white rounded-2xl shadow-lg p-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="mx-auto"
            />
          </div>
          {/* Nutrition Detail  s & Meal Cards */}
          <div className="md:w-1/2 w-full">
            <div className="text-center mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {selectedDate.toDateString()}
              </h3>
              {loading ? (
                <p className="mt-2 text-gray-500">Loading nutrition...</p>
              ) : totals ? (
                <div className="mt-4 space-y-2 text-lg text-gray-700">
                  <p>
                    <strong>Calories:</strong> {totals.calories} kcal
                  </p>
                  <p>
                    <strong>Protein:</strong> {totals.protein} g
                  </p>
                  <p>
                    <strong>Carbs:</strong> {totals.carbs} g
                  </p>
                  <p>
                    <strong>Fats:</strong> {totals.fat} g
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-gray-500">
                  No food logged for this date.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTracker;
