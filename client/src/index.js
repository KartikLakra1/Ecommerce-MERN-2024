import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/Auth';
import { SearchProvider } from './Context/Search';
import { CartProvider } from './Context/Cart';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <SearchProvider>
      <AuthProvider>
        <BrowserRouter>
          <React.StrictMode>

            <App />


          </React.StrictMode>
        </BrowserRouter>
      </AuthProvider>
    </SearchProvider>
  </CartProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
