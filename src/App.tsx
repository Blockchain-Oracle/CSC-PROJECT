import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import SubmitFeedback from './pages/SubmitFeedback';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ScrollToTop } from './components/ScrollToTop';

const App = () => {
  
  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route
          path="/"
          element={<AppLayout />}
        >
          <Route index element={<SubmitFeedback />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  )
}


export default App;