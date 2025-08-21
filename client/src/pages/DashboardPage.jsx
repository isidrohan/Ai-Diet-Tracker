// src/pages/DashboardPage.jsx

import Navbar from "../components/Navbar";
import RequireNutrition from "../components/RequireNutrition"; 
import CalendarTracker from "../components/CalendarTracker";
import AiLogger from "../components/AiLogger";

const DashboardPage = () => {
  

  return (
    <>
    <Navbar />
    {/* <RequireNutrition/> */}
    <CalendarTracker/>
    <AiLogger/>
      </>
  );
};

export default DashboardPage;
