import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';

const Session = () => {
  const [sessions, setSessions] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [newSession, setNewSession] = useState({
    sessionType: '',
    startDate: '',
    endDate: '',
    exam1Start: '08:00',
    exam1End: '10:00',
    exam2Start: '10:00',
    exam2End: '12:00',
    exam3Start: '14:00',
    exam3End: '16:00',
    exam4Start: '16:00',
    exam4End: '18:00',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
    fetchSessionCount();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/sessions');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchSessionCount = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/sessions/count');
      setSessionCount(response.data);
    } catch (error) {
      console.error('Error fetching session count:', error);
    }
  };

  const handleAddSession = async (e) => {
    e.preventDefault();
    if (!newSession.sessionType || !newSession.startDate || !newSession.endDate) {
      alert('Please fill all required fields.');
      return;
    }
    try {
      if (isEditMode && selectedSession) {
        await axios.put(`http://localhost:8088/api/sessions/${selectedSession.id}, newSession`);
      } else {
        await axios.post('http://localhost:8088/api/sessions', newSession);
      }
      fetchSessions();
      fetchSessionCount();
      resetForm();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation(); // Prevent triggering row click
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await axios.delete(`http://localhost:8088/api/sessions/${sessionId}`);
        fetchSessions();
        fetchSessionCount();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleEditClick = (e, session) => {
    e.stopPropagation(); // Prevent triggering row click
    setSelectedSession(session);
    setNewSession(session);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSessionClick = (session) => {
    navigate('/Dashboard', { state: { session } });
    localStorage.setItem('sessionid', session.id);
  };

  const resetForm = () => {
    setNewSession({
      sessionType: '',
      startDate: '',
      endDate: '',
      exam1Start: '08:00',
      exam1End: '10:00',
      exam2Start: '10:00',
      exam2End: '12:00',
      exam3Start: '14:00',
      exam3End: '16:00',
      exam4Start: '16:00',
      exam4End: '18:00',
    });
    setSelectedSession(null);
    setIsEditMode(false);
    setIsDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSession((prevSession) => ({
      ...prevSession,
      [name]: value,
    }));
  };

  const filteredSessions = sessions.filter((session) =>
    session.sessionType.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Sessions ({sessionCount})</h1>
          <p className="text-sm text-gray-500">Gérer les sessions</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
        >
          <span className="mr-2">+</span> Ajouter une nouvelle session
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-gray-500 border-b">
          <div>Type</div>
          <div>Date de Début</div>
          <div>Date de Fin</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSessionClick(session)}
            >
              <div className="text-gray-900">{session.sessionType}</div>
              <div className="text-gray-600">{session.startDate}</div>
              <div className="text-gray-600">{session.endDate}</div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={(e) => handleEditClick(e, session)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => handleDeleteSession(e, session.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[80%] max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isEditMode ? 'Modifier Session' : 'Ajouter Session'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-700 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddSession} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
                <select
                  name="sessionType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={newSession.sessionType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner le type de session</option>
                  <option value="Normale d'hiver">Normale d'hiver</option>
                  <option value="Normale de printemps">Normale de printemps</option>
                  <option value="Rattrapage d'hiver">Rattrapage d'hiver</option>
                  <option value="Rattrapage de printemps">Rattrapage de printemps</option>
                </select>
              </div>

              <div id="date-range-picker" className="flex items-center space-x-4">
                <div className="relative w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm0 4h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      name="startDate"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      value={newSession.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <span className="mx-4 text-gray-500">à</span>
                <div className="relative w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm0 4h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      name="endDate"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      value={newSession.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div className="grid grid-cols-4 gap-4 items-center">
                  <input
                    type="time"
                    name="exam1Start"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={newSession.exam1Start}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="exam1End"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={newSession.exam1End}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="exam2Start"
                    value={newSession.exam2Start}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="time"
                    name="exam2End"
                    value={newSession.exam2End}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <input
                  type="time"
                  name="exam3Start"
                  value={newSession.exam3Start}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  name="exam3End"
                  value={newSession.exam3End}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  name="exam4Start"
                  value={newSession.exam4Start}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  name="exam4End"
                  value={newSession.exam4End}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isEditMode ? 'Modifier' : 'Creer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Session;