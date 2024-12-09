import React, { useState, useEffect } from "react";
import axios from "axios";

const SurveillanceTable = () => {
  const [surveillances, setSurveillances] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [examDays, setExamDays] = useState([]);
  useEffect(() => {
    fetchSurveillances();
    fetchSessionSchedule();
  }, []);
  const fetchSessionSchedule = async () => {
    try {
      const response = await axios.get(`/api/sessions/${sessionId}/schedule`);
      setTimeSlots(response.data.timeSlots);
      setExamDays(response.data.examDays);
    } catch (error) {
      console.error('Error fetching session schedule:', error);
    }
  };
  const fetchSurveillances = async () => {
    try {
      const response = await axios.get("/api/surveillances?departmentId=1&date=2024-11-06");
      setSurveillances(response.data);
    } catch (error) {
      console.error("Error fetching surveillances:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Enseignant</th>
          {examDays.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {surveillances.map((surveillance) => (
          <tr key={surveillance.id}>
            <td>{surveillance.enseignantName}</td>
            {examDays.map((day) => (
              <td key={day}>
                {timeSlots.map((slot) =>
                  surveillance.date === day && surveillance.timeSlot === slot ? (
                    <div key={slot}>Assigned</div>
                  ) : null
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SurveillanceTable;
