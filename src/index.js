import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import TokenContextProvider from './Context/tokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import WishListContextProvider from './Context/wishList';


const root = ReactDOM.createRoot(document.getElementById('root'));
let query = new QueryClient();
root.render(
  <React.StrictMode>
    <CartContextProvider>
    <WishListContextProvider>
      <QueryClientProvider client={query}>
        <TokenContextProvider>
          <App />
        </TokenContextProvider>
      </QueryClientProvider>
    </WishListContextProvider>
    </CartContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
