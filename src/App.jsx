import './styles/css/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthContext';
import ProductProvider from './context/ProductContext';
import OrdersProvider from './context/OrdersContext';

import NotFound from "./pages/NotFound";
import Product from './pages/Product';
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import Staff from './pages/Staff';
import Order from './pages/Order';


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <OrdersProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<Product />} />
                  <Route path="/dashboard/order" element={<Order />} />
                  <Route path="/dashboard/staff" element={<Staff />} />
                    
                </Route>
                
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </OrdersProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
