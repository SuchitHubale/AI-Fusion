import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './firebase'; // Assuming Firebase is configured in a file called firebase.js
import * as XLSX from 'xlsx';

const Admin = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication
  const [error, setError] = useState('');

  const db = getFirestore(app);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch registrations and events from Firestore only when authenticated
      const fetchData = async () => {
        const registrationsCollection = collection(db, 'registrations');
        const registrationSnapshot = await getDocs(registrationsCollection);
        const registrationList = registrationSnapshot.docs.map((doc) => doc.data());
        
        // Sort the registrationList by 'createdAt' field (ascending order)
        const sortedRegistrations = registrationList.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setRegistrations(sortedRegistrations);

        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => doc.data().title); // Assuming the title attribute
        setEvents(eventsList);
      };

      fetchData();
    }
  }, [db, isAuthenticated]);

  // Function to download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(registrations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, 'registrations.xlsx');
  };

  // Filtered registrations based on selected event
  const filteredRegistrations = selectedEvent === 'All'
    ? registrations
    : registrations.filter((registration) => registration.event === selectedEvent);

  // Function to handle login
  const handleLogin = () => {
    const adminPassword = 'aiml@2667'; // Replace with your password or use an environment variable
    if (password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // If not authenticated, show the login form
  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <div className="mb-4">
          <label className="mr-2">Enter Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  // If authenticated, show the admin dashboard
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registrations</h1>

      {/* Dropdown for event filtering */}
      <div className="mb-4">
        <label className="mr-2">Filter by Event:</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All</option>
          {events.map((event, index) => (
            <option key={index} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      {/* Button to download Excel */}
      <div className="mb-4">
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download Excel
        </button>
      </div>

      {/* Registration Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Event</th>
            <th className="py-2 px-4 border-b">Payment ID</th>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.map((registration, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{registration.name}</td>
              <td className="py-2 px-4 border-b">{registration.email}</td>
              <td className="py-2 px-4 border-b">{registration.phone}</td>
              <td className="py-2 px-4 border-b">{registration.event}</td>
              <td className="py-2 px-4 border-b">{registration.paymentId || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{registration.orderId}</td>
              <td className="py-2 px-4 border-b">{registration.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
