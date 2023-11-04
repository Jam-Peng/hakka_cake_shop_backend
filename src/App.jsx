import './styles/css/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthContext';
import ProductProvider from './context/ProductContext';
import OrdersProvider from './context/OrdersContext';
import ClientProvider from './context/ClientContext';
import ClientBlackProvider from './context/ClientBlackContext';
import StaffWaitProvider from './context/StaffWaitContext';
import SalesProvider from './context/SalesContext';
import StaffClockInRecordStatProvider from './context/StaffClockInRecordStatContext';

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from './pages/Login';
import Product from './pages/Product';
import Order from './pages/Order';
import Staff from './pages/Staff';
import StaffWaitDelete from './pages/StaffWaitDelete';
import Client from './pages/Client';
import ClientBlack from './pages/ClientBlack';
import Sales from './pages/Sales';
import StaffClockInRecord from './pages/StaffClockInRecord';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <OrdersProvider>
              <ClientProvider>
                <ClientBlackProvider>
                  <StaffWaitProvider>
                    <StaffClockInRecordStatProvider>
                      <SalesProvider>
                        <Routes>
                          <Route path="/" element={<Login />} />
                          <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<Product />} />
                            <Route path="/dashboard/order" element={<Order />} />
                            <Route path="/dashboard/client" element={<Client />} />
                            <Route path="/dashboard/client_black" element={<ClientBlack />} />
                            <Route path="/dashboard/staff" element={<Staff />} />
                            <Route path="/dashboard/staff_wait_delete" element={<StaffWaitDelete />} />
                            <Route path="/dashboard/staff_clockin_out_records" element={<StaffClockInRecord />} />
                            <Route path="/dashboard/sales" element={<Sales />} />
                              
                          </Route>
                          
                          <Route path="*" element={<NotFound />}/>
                        </Routes>
                      </SalesProvider>
                    </StaffClockInRecordStatProvider>
                  </StaffWaitProvider>
                </ClientBlackProvider>
              </ClientProvider>
            </OrdersProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
