import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
 
  CreateVenue,
  EditBooking,
  EditVenue,
  Footer,
  Header,
  HomePage,
} from "./components";

import MyBookings from "./components/MyBookings"; 
import ConfirmPage from "./pages/BookingConfirm/ConfirmPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import VenueDetailsPage from "./pages/VenueDetails/VenueDetailsPage";
import RegisterVenue from "./components/RegisterVenue"
import { containerStyle, mainStyle } from "./styles/App.styles";
import Avatar from "./components/Avatar"; 
import MyVenues from "./components/MyVenues";


const App = () => {
  return (
    <Router>
      <div style={containerStyle}>
        <Header />

        <main style={mainStyle}>
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/registervenue" element={<RegisterVenue/>} />
            <Route path="/venues/create" element={<CreateVenue />} />
            <Route path="/venues/:id/edit" element={<EditVenue />} />
            <Route path="/venues/:id" element={<VenueDetailsPage />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/bookings/:id/edit" element={<EditBooking />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-venues" element={<MyVenues />} />
            <Route path="/my-bookings" element={<MyBookings />} />  

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
