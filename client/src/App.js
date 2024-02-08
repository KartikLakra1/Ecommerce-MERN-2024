import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Home/Home.js'
import Contactpage from './Pages/Contact/Contact.js'
import Aboutpage from './Pages/About/About.js'
import PagenotFound from './Pages/PagenotFound/PagenotFound';
import Policies from './Pages/Policies/Policies';
import Register from './Pages/Auth/Register.js';
import Login from './Pages/Auth/Login.js';
import Dashboard from './Pages/user/Dashboard.js';
import PrivateRoute from './Components/Routes/Private.js';
import ForgotPassword from './Pages/Auth/ForgotPassword.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/policy" element={<Policies />} />
        <Route path="*" element={<PagenotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>




      </Routes>
    </>
  );
}

export default App;
