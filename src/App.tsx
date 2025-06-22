import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SubmitFeedback from './pages/SubmitFeedback';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
// Define feedback type
export type FeedbackItem = {
  id: string;
  category: string;
  message: string;
  date: string;
  status: 'pending' | 'resolved';
};
// Define admin user type
export type AdminUser = {
  username: string;
  password: string;
  role: string;
};
export function App() {
  // State for feedback items
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  // State for admin authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Load feedback data from localStorage on component mount
  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedbackData');
    if (storedFeedback) {
      setFeedbackItems(JSON.parse(storedFeedback));
    } else {
      // Initialize with some sample data
      const initialData: FeedbackItem[] = [{
        id: '1',
        category: 'Academics',
        message: "The physics lab equipment needs maintenance. Many instruments aren't working properly.",
        date: '2023-11-01T14:30:00',
        status: 'pending'
      }, {
        id: '2',
        category: 'Hostel',
        message: 'There have been frequent water shortages in Block C for the past week.',
        date: '2023-11-03T09:15:00',
        status: 'resolved'
      }, {
        id: '3',
        category: 'Facilities',
        message: "The library's air conditioning system is too cold and makes it uncomfortable to study for long periods.",
        date: '2023-11-04T16:45:00',
        status: 'pending'
      }];
      setFeedbackItems(initialData);
      localStorage.setItem('feedbackData', JSON.stringify(initialData));
    }
  }, []);
  // Admin users (in a real app, this would come from a secure backend)
  const adminUsers: AdminUser[] = [{
    username: 'admin',
    password: 'admin123',
    role: 'Administrator'
  }, {
    username: 'hod',
    password: 'hod123',
    role: 'Head of Department'
  }];
  // Function to add new feedback
  const addFeedback = (category: string, message: string) => {
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      category,
      message,
      date: new Date().toISOString(),
      status: 'pending'
    };
    const updatedFeedback = [...feedbackItems, newFeedback];
    setFeedbackItems(updatedFeedback);
    localStorage.setItem('feedbackData', JSON.stringify(updatedFeedback));
    return newFeedback;
  };
  // Function to update feedback status
  const updateFeedbackStatus = (id: string, status: 'pending' | 'resolved') => {
    const updatedFeedback = feedbackItems.map(item => item.id === id ? {
      ...item,
      status
    } : item);
    setFeedbackItems(updatedFeedback);
    localStorage.setItem('feedbackData', JSON.stringify(updatedFeedback));
  };
  // Function to authenticate admin
  const loginAdmin = (username: string, password: string) => {
    const user = adminUsers.find(user => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  // Function to logout admin
  const logoutAdmin = () => {
    setIsAuthenticated(false);
  };
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isAuthenticated={isAuthenticated} onLogout={logoutAdmin} />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<SubmitFeedback onSubmit={addFeedback} />} />
            <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={loginAdmin} />} />
            <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard feedbackItems={feedbackItems} updateStatus={updateFeedbackStatus} /> : <Navigate to="/admin/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>;
}