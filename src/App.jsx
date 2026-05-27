// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnlockTicket from "./pages/UnlockTicket";
import Payment from "./pages/Payment";
import Admin from "./admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnlockTicket />} />
        <Route path="/payment/:transactionId" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;