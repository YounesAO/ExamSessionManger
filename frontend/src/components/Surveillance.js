import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from 'axios';
import Navbar from "./Navbar";

axios.defaults.baseURL = 'http://localhost:8088';

const Surveillance = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("1"); // Default to the first department ID
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [session, setSession] = useState(null);
  const [exams, setExams] = useState([]); // State pour stocker les examens

  const sessionId = localStorage.getItem('sessionid');

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/departements");
        setDepartments(response.data);
        setSelectedDepartment(response.data[0]?.id || "1"); // Set to first department ID
        console.log("Departments fetched:", response.data);
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
        const response = await axios.get(`/enseignants/search/departement/${selectedDepartment}`);
        setTeachers(response.data);
        console.log("Teachers fetched for department", selectedDepartment, ":", response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, [selectedDepartment]);

  // Fetch session details
  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        console.warn("No session ID found in localStorage.");
        return;
      }
      try {
        const response = await axios.get(`/api/sessions/${sessionId}`);
        setSession(response.data);
        setStartDate(new Date(response.data.startDate));
        setEndDate(new Date(response.data.endDate));
        console.log("Session fetched:", response.data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, [sessionId]);

  // Fetch exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("/api/exams");
        setExams(response.data);
        console.log("Exams fetched:", response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  // Generate dates dynamically
  const generateDates = (start, days) => {
    const dates = [];
    let currentDate = new Date(start);
    for (let i = 0; i < days; i++) {
      const periods = [
        session?.exam1Start && session.exam1End ? `${session.exam1Start} - ${session.exam1End}` : null,
        session?.exam2Start && session.exam2End ? `${session.exam2Start} - ${session.exam2End}` : null,
        session?.exam3Start && session.exam3End ? `${session.exam3Start} - ${session.exam3End}` : null,
        session?.exam4Start && session.exam4End ? `${session.exam4Start} - ${session.exam4End}` : null,
      ].filter(Boolean); // Ensure null periods are filtered out
  
      dates.push({
        date: currentDate.toISOString().split("T")[0],
        periods,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log("Generated dates:", dates);
    return dates;
  };
  

  const dateRange = session ? generateDates(startDate, 3) : [];

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    console.log("Selected department:", event.target.value);
  };

  const navigateDays = (direction) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + (direction === "next" ? 3 : -3));
    if (newDate >= new Date(session.startDate) && newDate <= new Date(session.endDate)) {
      setStartDate(newDate);
      console.log("Navigated to new date range starting:", newDate);
    }
  };

  const handleRefresh = () => {
    console.log("Page refreshed");
    window.location.reload();
  };

  // Fonction pour vérifier si un enseignant a un examen à une date et une période spécifiques
  // Function to check if the teacher has an exam at a given date and period
  const hasExam = (teacherId, date, period) => {
    console.log(`\n--- Checking Exam ---`);
    console.log(`Teacher ID: ${teacherId}`);
    console.log(`Date: ${date}`);
    console.log(`Period: ${period}`);
  
    return exams.some((exam) => {
      const examDate = exam.examDate.trim();
      const examStart = exam.startTime.trim();
      const examEnd = exam.endTime.trim();
      const examTeacherId = exam.instructor.id; // Correctly accessing instructor ID
  
      console.log(`Exam Date: ${examDate}`);
      console.log(`Exam Start Time: ${examStart}`);
      console.log(`Exam End Time: ${examEnd}`);
      console.log(`Exam Teacher ID: ${examTeacherId}`);
  
      // Compare teacher ID and date
      const isTeacherMatch = examTeacherId === teacherId;
      const isDateMatch = examDate === date;
  
      console.log(`Is Teacher Match: ${isTeacherMatch}`);
      console.log(`Is Date Match: ${isDateMatch}`);
  
      if (!isTeacherMatch || !isDateMatch) {
        return false;
      }
  
      // Split the period into start and end times
      const [periodStart, periodEnd] = period.split(" - ").map((time) => time.trim());
  
      console.log(`Period Start: ${periodStart}`);
      console.log(`Period End: ${periodEnd}`);
  
      // Check for time overlap
      const isTimeOverlap =
        (examStart <= periodEnd && examEnd >= periodStart) ||
        (examStart >= periodStart && examStart < periodEnd) ||
        (examEnd > periodStart && examEnd <= periodEnd);
  
      console.log(`Is Time Overlap: ${isTimeOverlap}`);
  
      return isTimeOverlap;
    });
  };
  

  
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Surveillance par départements</h1>

        {/* Department Dropdown */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Choisir un département:
            </label>
            <div className="relative">
              <select
                id="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="mt-1 block w-full p-3 pr-10 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm appearance-none"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              {/* Custom dropdown indicator */}
              <div className="absolute top-0 right-0 mt-2 mr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation and Refresh Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateDays("prev")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={!session || startDate <= new Date(session.startDate)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateDays("next")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={!session || startDate >= new Date(session.endDate) - (2 *

24 * 60 * 60 * 1000)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Enseignants</th>
                {dateRange.map((day, dayIndex) => (
                  <th
                    key={dayIndex}
                    className="border border-gray-300 px-4 py-2"
                    colSpan={day.periods.length}
                  >
                    {day.date}
                  </th>
                ))}
              </tr>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2"></th>
                {dateRange.map((day) =>
                  day.periods.map((time, timeIndex) => (
                    <th
                      key={`${day.date}-${timeIndex}`}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {time}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
  {teachers.map((teacher) => (
    <tr key={teacher.id} className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2">
        {teacher.firstName} {teacher.lastName}
      </td>
      {dateRange.map((day) =>
        day.periods.map((time, timeIndex) => {
          const examCheck = hasExam(teacher.id, day.date, time);
          console.log(`Checking exam for Teacher ID: ${teacher.id}, Date: ${day.date}, Period: ${time} => ${examCheck}`);
          return (
            <td
              key={`${day.date}-${timeIndex}`}
              className={`border border-gray-300 px-4 py-2 text-center ${examCheck ? "bg-red-200" : ""}`}
            >
              {examCheck ? "TT" : ""}
            </td>
          );
        })
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
