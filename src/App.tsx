import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Products from './components/Products';
import Calculators from './components/Calculators';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [bookingRefreshTrigger, setBookingRefreshTrigger] = useState(0);

  const handleActionClick = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductForBooking = (productTitle: string) => {
    setSelectedProduct(productTitle);
  };

  const handleAdminToggle = () => {
    setIsAdminMode((prev) => !prev);
    // If opening admin mode, scroll to it
    if (!isAdminMode) {
      setTimeout(() => {
        const element = document.querySelector('#admin-workspace');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleBookingSuccess = () => {
    // Increment trigger to refresh the admin bookings feed in real-time
    setBookingRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">
      {/* Navigation Header */}
      <Header onAdminToggle={handleAdminToggle} isAdminMode={isAdminMode} />

      {/* Hero Presentation */}
      <Hero onActionClick={handleActionClick} />

      {/* Personal Profile & Branch Values */}
      <AboutMe />

      {/* Select Curated Products Grid */}
      <Products onSelectProduct={handleSelectProductForBooking} />

      {/* Calculators Block (Loans & Savings) */}
      <Calculators />

      {/* Secure Consultation Registration Form */}
      <BookingForm selectedProduct={selectedProduct} onBookingSuccess={handleBookingSuccess} />

      {/* Interactive Admin Workspace Desk (Visible conditionally) */}
      {isAdminMode && (
        <AdminPanel
          onClose={() => setIsAdminMode(false)}
          refreshTrigger={bookingRefreshTrigger}
        />
      )}

      {/* Unified Professional Footer */}
      <Footer />
    </div>
  );
}
