import './styles/css/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthContext';
import ProductProvider from './context/ProductContext';
import OrdersProvider from './context/OrdersContext';
import ClientProvider from './context/ClientContext';

import NotFound from "./pages/NotFound";
import Product from './pages/Product';
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import Staff from './pages/Staff';
import Order from './pages/Order';
import Client from './pages/Client';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <OrdersProvider>
              <ClientProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Product />} />
                    <Route path="/dashboard/order" element={<Order />} />
                    <Route path="/dashboard/staff" element={<Staff />} />
                    <Route path="/dashboard/client" element={<Client />} />
                      
                  </Route>
                  
                  <Route path="*" element={<NotFound />}/>
                </Routes>
              </ClientProvider>
            </OrdersProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
