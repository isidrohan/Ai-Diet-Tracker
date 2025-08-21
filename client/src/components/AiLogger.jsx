import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";


const AiLogger = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const { user } = useContext(AuthContext);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      const userId = user?.user?.id || user?.id;
      const res = await API.post("/ai/analyze", {
        userId,
        prompt: input,
      });
      setResult(
        res.data.foodLog
          ? `Food: ${res.data.foodLog.foodName}\nCalories: ${res.data.foodLog.calories}\nProtein: ${res.data.foodLog.protein}g\nCarbs: ${res.data.foodLog.carbs}g\nFat: ${res.data.foodLog.fat}g`
          : res.data.message || "Food logged!"
      );
    } catch (err) {
      console.error(err);
      setResult(
        err.response?.data?.error || err.response?.data?.message || "Failed to log food."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🍎 AI Food Logger</h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={4}
        placeholder="e.g., 2 eggs, 1 bowl of rice and dal"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-medium mb-2">🧠 AI Response:</h3>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default AiLogger;
