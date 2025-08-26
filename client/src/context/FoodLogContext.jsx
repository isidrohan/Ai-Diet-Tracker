import React, { createContext, useState, useContext } from 'react';

const FoodLogContext = createContext();

export const FoodLogProvider = ({ children }) => {
  const [currentDayTotals, setCurrentDayTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const updateTotals = (newLog) => {
    if (!newLog) return;
    
    setCurrentDayTotals(prev => ({
      calories: Number((prev.calories || 0) + (Number(newLog.calories) || 0)),
      protein: Number((prev.protein || 0) + (Number(newLog.protein) || 0)),
      carbs: Number((prev.carbs || 0) + (Number(newLog.carbs) || 0)),
      fat: Number((prev.fat || 0) + (Number(newLog.fat) || 0))
    }));
  };

  const setTotals = (totals) => {
    if (!totals) return;
    
    setCurrentDayTotals({
      calories: Number(totals.calories || 0),
      protein: Number(totals.protein || 0),
      carbs: Number(totals.carbs || 0),
      fat: Number(totals.fat || 0)
    });
  };

  return (
    <FoodLogContext.Provider value={{ currentDayTotals, updateTotals, setTotals }}>
      {children}
    </FoodLogContext.Provider>
  );
};

export const useFoodLog = () => {
  const context = useContext(FoodLogContext);
  if (!context) {
    throw new Error('useFoodLog must be used within a FoodLogProvider');
  }
  return context;
};
