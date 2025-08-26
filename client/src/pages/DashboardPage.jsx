// src/pages/DashboardPage.jsx

import Navbar from "../components/Navbar";
import RequireNutrition from "../components/RequireNutrition"; 
import CalendarTracker from "../components/CalendarTracker";
import AiLogger from "../components/AiLogger";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* <RequireNutrition/> */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {/* Main content area */}
          <div className="w-full max-w-4xl mx-auto">
            <CalendarTracker />
          </div>
          
          {/* Food Logger area */}
          <div className="w-full max-w-3xl mx-auto">
            <AiLogger />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
