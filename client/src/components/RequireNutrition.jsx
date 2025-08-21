import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RequireNutrition = () => {
    const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [nutrition, setNutrition] = useState(null);
  const navigate = useNavigate();

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


  if (loading) return <div className="text-center p-4">Loading...</div>;
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">🍎 Your Nutrition Plan</h2>
      </div>
      {/* Nutrition Data */}
      {nutrition ? (
        <div className="space-y-2 text-gray-700 text-lg">
          <p><strong>Calories:</strong> {nutrition.calories} kcal</p>
          <p><strong>Protein:</strong> {nutrition.protein} g</p>
          <p><strong>Carbs:</strong> {nutrition.carbs} g</p>
          <p><strong>Fats:</strong> {nutrition.fat} g</p>
        </div>
      ) : (
        <p className="text-red-500">No nutrition goal found. Please fill the goal form first.</p>
      )}
    </div>
  )
}

export default RequireNutrition