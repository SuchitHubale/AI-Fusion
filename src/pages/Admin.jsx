import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../utils/firebase';
import * as XLSX from 'xlsx';
import { 
  Download, 
  Filter, 
  Search, 
  RefreshCcw, 
  Lock, 
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/Card';

const Admin = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalRevenue: 0,
    eventWiseCount: {},
  });

  const db = getFirestore(app);

  const fetchData = async () => {
    setLoading(true);
    try {
      const registrationsCollection = collection(db, 'registrations');
      const registrationSnapshot = await getDocs(registrationsCollection);
      const registrationList = registrationSnapshot.docs.map((doc) => doc.data());
      
      const sortedRegistrations = registrationList.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setRegistrations(sortedRegistrations);
      
      // Calculate statistics
      const eventCounts = {};
      let totalRev = 0;
      
      sortedRegistrations.forEach(reg => {
        eventCounts[reg.event] = (eventCounts[reg.event] || 0) + 1;
        totalRev += Number(reg.amount || 0);
      });
      
      setStats({
        totalRegistrations: sortedRegistrations.length,
        totalRevenue: totalRev,
        eventWiseCount: eventCounts
      });

      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => doc.data().title);
      setEvents(eventsList);
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [db, isAuthenticated]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRegistrations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, `registrations_${new Date().toISOString()}.xlsx`);
  };

  const filteredRegistrations = registrations
    .filter(reg => selectedEvent === 'All' || reg.event === selectedEvent)
    .filter(reg => 
      searchTerm === '' || 
      Object.values(reg).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const handleLogin = () => {
    const adminPassword = 'aiml@2667';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admin password"
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations}
            icon={<Users className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          />
          <StatCard
            title="Active Events"
            value={events.length}
            icon={<Calendar className="w-6 h-6 text-purple-600" />}
          />
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search registrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Events</option>
                    {events.map((event, index) => (
                      <option key={index} value={event}>{event}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchData}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-white border rounded-lg hover:bg-gray-50"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </button>
                <button
                  onClick={downloadExcel}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  Export Excel
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Event</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Payment ID</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        Loading data...
                      </td>
                    </tr>
                  ) : filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No registrations found
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((registration, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{registration.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{registration.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{registration.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {registration.event}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{registration.paymentId || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{registration.orderId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(registration.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Card>
    <CardContent className="flex items-center justify-between p-6">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </CardContent>
  </Card>
);

export default Admin;