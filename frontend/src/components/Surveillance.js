import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";

axios.defaults.baseURL = "http://localhost:8088";

const Surveillance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [session, setSession] = useState(null);
  const [surveillances, setSurveillances] = useState({});

  const sessionId = localStorage.getItem("sessionid");

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/departements");
        setDepartments(response.data);
        setSelectedDepartment(response.data[0]?.id || "1");
        console.log("Fetched Departments:", response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch teachers based on department
  useEffect(() => {
    const fetchTeachers = async () => {
      if (!selectedDepartment) return;
      try {
        const response = await axios.get(
          `/enseignants/search/departement/${selectedDepartment}`
        );
        setTeachers(response.data);
        console.log("Fetched Teachers:", response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, [selectedDepartment]);

  // Fetch session details
  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      try {
        const response = await axios.get(`/api/sessions/${sessionId}`);
        setSession(response.data);
        setStartDate(new Date(response.data.startDate));
        setEndDate(new Date(response.data.endDate));
        console.log("Fetched Session:", response.data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, [sessionId]);

  // Fetch surveillances
  useEffect(() => {
    const fetchSurveillances = async () => {
      try {
        const response = await axios.get(`/api/surveillance/generate`, {
          params: { sessionId: sessionId },
        });
        setSurveillances(response.data);
        console.log("Fetched Surveillances:", response.data);
      } catch (error) {
        console.error("Error fetching surveillances:", error);
      }
    };
    fetchSurveillances();
  }, [sessionId]);

  // Generate dates dynamically
  const generateDates = (start, days) => {
    const dates = [];
    let currentDate = new Date(start);
    for (let i = 0; i < days; i++) {
      const periods = [
        session?.exam1Start && session.exam1End
          ? `${session.exam1Start} - ${session.exam1End}`
          : null,
        session?.exam2Start && session.exam2End
          ? `${session.exam2Start} - ${session.exam2End}`
          : null,
        session?.exam3Start && session.exam3End
          ? `${session.exam3Start} - ${session.exam3End}`
          : null,
        session?.exam4Start && session.exam4End
          ? `${session.exam4Start} - ${session.exam4End}`
          : null,
      ].filter(Boolean);
      dates.push({
        date: currentDate.toISOString().split("T")[0],
        periods,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log("Generated Dates:", dates);
    return dates;
  };

  const dateRange = session ? generateDates(startDate, 3) : [];

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const navigateDays = (direction) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + (direction === "next" ? 3 : -3));
    if (
      newDate >= new Date(session.startDate) &&
      newDate <= new Date(session.endDate)
    ) {
      setStartDate(newDate);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };
  const getKey = (date, period) => {
    // Split the period into start and end times
    const [startTime, endTime] = period.split(" - ").map((time) => time.trim());
    const startHour = parseInt(startTime.split(":")[0]);

    // Determine if it's Morning or Afternoon
    const periodCategory = startHour >= 12 ? "Afternoon" : "Morning";

    // Adjust the start time based on the period category
    const adjustedStartTime = periodCategory === "Morning" ? "08:00:00" : "14:00:00";
    const formattedPeriod = `${adjustedStartTime.replace(":00", "")}-${endTime.replace(":00", "")}`;

    // Construct the key
    const key = `${date} ${periodCategory} (${formattedPeriod})`;

    return key;
};

  // Adjusted getRole function
  const getRole = (teacherId, date, period) => {
    console.log(period)
    if (!surveillances[teacherId]) {
      console.log(`No data for teacher ${teacherId}`);
      return ""; // No surveillance data for this teacher
    }
  
    // Remove seconds from the period
    const formattedPeriod = period.replace(/:00/g, "").replace(" - ", "-");
    
  
    // Construct the key
    const key = getKey(date,period);
  
    // Fetch the role
    const role = surveillances[teacherId][key] || "";
    console.log(key)  

  
    console.log(
      `Teacher: ${teacherId}, Date: ${date}, Period: ${formattedPeriod}, Role: ${role}`
    );
  
    return role; // Return the role or empty string
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Surveillance par départements</h1>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label htmlFor="department" className="block text-sm font-medium">
              Choisir un département:
            </label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="mt-1 block w-full p-3 border rounded-lg"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateDays("prev")} className="p-2">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => navigateDays("next")} className="p-2">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={handleRefresh} className="p-2 bg-blue-500 text-white">
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Enseignants</th>
                {dateRange.map((day) => (
                  <th key={day.date} colSpan={day.periods.length}>
                    {day.date}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border px-4 py-2"></th>
                {dateRange.flatMap((day) =>
                  day.periods.map((period) => (
                    <th key={`${day.date}-${period}`} className="border px-4 py-2">
                      {period}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="border px-4 py-2">
                    {teacher.firstName} {teacher.lastName}
                  </td>
                  {dateRange.flatMap((day) =>
                    day.periods.map((period) => (
                      <td key={`${day.date}-${period}`} className="border px-4 py-2">
                        {getRole(teacher.id, day.date, period)}
                        
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Surveillance;
