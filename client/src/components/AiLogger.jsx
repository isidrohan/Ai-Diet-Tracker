import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useFoodLog } from "../context/FoodLogContext";


const AiLogger = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const { user } = useContext(AuthContext);

  const { updateTotals } = useFoodLog();
  
  const handleAnalyze = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      const userId = user?.user?.id || user?.id;
      const res = await API.post("/ai/analyze", {
        userId,
        prompt: input,
      });
      
      if (res.data.foodLog) {
        const foodLog = res.data.foodLog;
        updateTotals(foodLog);
        setResult(
          `Food: ${foodLog.foodName}\nCalories: ${Math.round(foodLog.calories)}\nProtein: ${Number(foodLog.protein).toFixed(1)}g\nCarbs: ${Number(foodLog.carbs).toFixed(1)}g\nFat: ${Number(foodLog.fat).toFixed(1)}g`
        );
        // Clear the input after successful analysis
        setInput("");
      } else {
        setResult(res.data.message || "Food logged!");
        // Clear the input after successful logging
        setInput("");
      }
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
    <div className="h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 h-full sticky top-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Food Logger
          </h2>
        </div>

        <div className="relative mb-6">
          <textarea
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none text-gray-700 bg-gray-50/50"
            rows={4}
            placeholder="Describe your meal here (e.g., 2 eggs, 1 bowl of rice and dal)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-4 bottom-4 text-gray-400 text-sm">
            {input.length} characters
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Analyze with AI
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800">Analysis Result</h3>
                </div>
                <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                  <pre className="whitespace-pre-wrap text-gray-700 font-medium">{result}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AiLogger;
