import React, { useState, useEffect } from 'react';
import { Clock,X, Calendar } from 'lucide-react';
import axios from 'axios';
import Navbar from './Navbar';

axios.defaults.baseURL = 'http://localhost:8088';

const ExamSchedule = () => {
  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [exams, setExams] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [options, setOptions] = useState([]);
  const [modules, setModules] = useState([]);
  const [locals, setLocals] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [examDays, setExamDays] = useState([]);

  const sessionId = 1;

  useEffect(() => {
    fetchDepartments();
    fetchOptions();
    fetchLocals();
    fetchSessionSchedule();
    fetchExams();
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

  const fetchExams = async () => {
    try {
      const response = await axios.get('/api/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/departements');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get('/api/options');
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchLocals = async () => {
    try {
      const response = await axios.get('/locals/all');
      setLocals(response.data);
    } catch (error) {
      console.error('Error fetching locals:', error);
    }
  };

  const handleDepartmentChange = async (departmentId) => {
    try {
      const response = await axios.get(`/enseignants/search/departement/${departmentId}`);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleOptionChange = async (optionId) => {
    try {
      const response = await axios.get(`/api/modules/byOption/${optionId}`);
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleCellClick = (day, timeSlot) => {
    setSelectedSlot({ day, timeSlot });
    setShowExamModal(true);
  };

  const handleExamCreate = async (examData) => {
    try {
      // Extract the date portion (YYYY-MM-DD) from examData.date
      const examDate = examData.date.split("T")[0]; // Remove any time component
  
      const payload = {
        name: examData.name,
        examDate: examDate, // Ensure only the date is sent
        startTime: examData.startTime, // Send time in HH:mm format
        endTime: examData.endTime,
        sessionId,
        localId: parseInt(examData.localId, 10),
        moduleId: parseInt(examData.moduleId, 10),
        optionId: parseInt(examData.optionId, 10),
        instructorId: parseInt(examData.teacherId, 10),
        nombreDesEtudiants: parseInt(examData.nombreDesEtudiants, 10),
      };
  
      const response = await axios.post("/api/exams", payload);
      setExams((prev) => [...prev, response.data]);
      setShowExamModal(false);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Failed to create exam. Please try again.");
    }
  };
  
  const getExamsForSlot = (date, time) => {
    if (!time) {
      console.error("Invalid time parameter:", time);
      return [];
    }
  
    const [slotStartTime] = time.split("-"); // Extract the start time from the range
  
    return exams.filter(
      (exam) =>
        exam.examDate === date && // Ensure the date matches
        exam.startTime.startsWith(slotStartTime) // Compare only the start time
    );
  };
  
  const getExamForSlot = (date, time) => {
    if (!time) {
      console.error("Invalid time parameter:", time);
      return undefined;
    }
  
    const [slotStartTime] = time.split("-"); // Extract the start time from the range
  
    return exams.find(
      (exam) =>
        exam.examDate === date && // Ensure the date matches
        exam.startTime.startsWith(slotStartTime) // Compare only the start time
    );
  };
  
  return (
    <div>
      <Navbar />
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Exam Schedule</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-3 bg-gray-50">Jours</th>
            {timeSlots.map((slot) => (
              <th key={slot.id} className="border p-3 bg-gray-50">
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} />
                  {slot.time}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {examDays.map((day) => (
            <tr key={day.date}>
              <td className="border p-3 font-medium bg-gray-50">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {day.display}
                </div>
              </td>
              {timeSlots.map((timeSlot) => {
                const examsForSlot = getExamsForSlot(day.date, timeSlot.time);
                return (
                  <td
                    key={timeSlot.id}
                    className="border p-3 cursor-pointer transition-colors hover:bg-blue-50"
                    onClick={() => handleCellClick(day, timeSlot)}
                  >
                    {examsForSlot.length > 0 ? (
                      examsForSlot.map((exam) => (
                        <a
                          key={exam.id}
                          href={`/exam/${exam.id}`}
                          className="text-blue-500 underline mr-1"
                        >
                          {exam.name}
                        </a>
                      ))
                    ) : (
                      <div className="text-gray-400">Ajouter un examen</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showExamModal && selectedSlot && (
        <ExamModal
          onClose={() => setShowExamModal(false)}
          onSubmit={handleExamCreate}
          selectedSlot={selectedSlot}
          departments={departments}
          teachers={teachers}
          options={options}
          modules={modules}
          locals={locals}
          onDepartmentChange={handleDepartmentChange}
          onOptionChange={handleOptionChange}
        />
      )}
    </div>
    </div>
  );
};
const ExamModal = ({
  onClose,
  onSubmit,
  selectedSlot,
  departments,
  teachers,
  options,
  modules,
  locals,
  onDepartmentChange,
  onOptionChange,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    departmentId: '',
    teacherId: '',
    optionId: '',
    moduleId: '',
    localId: '',
    date: selectedSlot.day.date, // Keep the date as it is
    startTime: selectedSlot.timeSlot.time.split("-")[0], // Extract start time
    endTime: selectedSlot.timeSlot.time.split("-")[1], 
    nombreDesEtudiants: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg space-y-4">
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <h3 className="text-lg">Ajouter un examen</h3>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Exam Name - Full Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Exam Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter exam name"
          required
        />
      </div>

      {/* Other Fields - Two by Two Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Département */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Département
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => {
              const departmentId = e.target.value;
              setFormData({ ...formData, departmentId });
              onDepartmentChange(departmentId);
            }}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Responsable du module */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsable du module
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={formData.teacherId}
            onChange={(e) =>
              setFormData({ ...formData, teacherId: e.target.value })
            }
          >
            <option value="">Select enseignant</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.lastName}, {teacher.firstName}
              </option>
            ))}
          </select>
        </div>

        {/* Option */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Option
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => {
              const optionId = e.target.value;
              setFormData({ ...formData, optionId });
              onOptionChange(optionId);
            }}
          >
            <option value="">Select Option</option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        {/* Module */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Module
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, moduleId: e.target.value })
            }
          >
            <option value="">Select Module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre d'étudiants inscrit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre d'étudiants inscrit
          </label>
          <input
            type="number"
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={formData.nombreDesEtudiants}
            onChange={(e) =>
              setFormData({ ...formData, nombreDesEtudiants: e.target.value })
            }
          />
        </div>

        {/* Locaux d'examen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Locaux d'examen
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, localId: e.target.value })
            }
          >
            <option value="">Liste déroulante</option>
            {locals.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Créer
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default ExamSchedule;
