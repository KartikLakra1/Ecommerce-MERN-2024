import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Home/Home.js'
import Contactpage from './Pages/Contact/Contact.js'
import Aboutpage from './Pages/About/About.js'
import PagenotFound from './Pages/PagenotFound/PagenotFound';
import Policies from './Pages/Policies/Policies';
import Register from './Pages/Auth/Register.js';
import Login from './Pages/Auth/Login.js';
import PrivateRoute from './Components/Routes/Private.js';
import ForgotPassword from './Pages/Auth/ForgotPassword.js';
import AdminRoute from './Components/Routes/AdminRoute.js';
import AdminDashboard from './Pages/Admin/AdminDashboard.js';
import CreateCategory from './Pages/Admin/CreateCategory.js';
import CreateProduct from './Pages/Admin/CreateProduct.js';
import User from './Pages/Admin/User.js';
import UserDashboard from './Pages/user/UserDashboard.js';
import Orders from './Pages/user/Orders.js';
import Profile from './Pages/user/Profile.js';
import Products from './Pages/Admin/Products.js';
import UpdateProduct from './Pages/Admin/UpdateProduct.js';

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
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>


        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<User />} />
        </Route>








      </Routes>
    </>
  );
}

export default App;
