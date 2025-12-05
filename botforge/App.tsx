import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { PricingPage } from './components/PricingPage';
import { FAQPage } from './components/FAQPage';
import { Auth } from './components/Auth';
import { Payment } from './components/Payment';
import { Dashboard } from './components/Dashboard';
import { SystemAdminDashboard } from './components/SystemAdminDashboard';
import { PageView } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.LANDING);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage(PageView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage(PageView.LOGIN);
  };

  const handlePaymentSuccess = () => {
    // In a real app, this would verify payment then log the user in
    setIsLoggedIn(true);
    setCurrentPage(PageView.DASHBOARD);
  };

  return (
    <>
      {currentPage === PageView.SYSTEM_ADMIN ? (
        <SystemAdminDashboard 
          onLogout={handleLogout} 
          onBackToDashboard={() => setCurrentPage(PageView.DASHBOARD)} 
        />
      ) : (
        <Layout 
          setCurrentPage={setCurrentPage} 
          currentPage={currentPage}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        >
          {currentPage === PageView.LANDING && <LandingPage onNavigate={setCurrentPage} />}
          {currentPage === PageView.PRICING && <PricingPage onNavigate={setCurrentPage} />}
          {currentPage === PageView.FAQ && <FAQPage />}
          
          {(currentPage === PageView.LOGIN || 
            currentPage === PageView.REGISTER || 
            currentPage === PageView.ACTIVATED) && (
            <Auth 
              view={currentPage} 
              onNavigate={setCurrentPage} 
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {currentPage === PageView.PAYMENT && <Payment onPaymentSuccess={handlePaymentSuccess} />}
          
          {currentPage === PageView.DASHBOARD && isLoggedIn && (
            <Dashboard 
              onLogout={handleLogout} 
              onSystemAdminLogin={() => setCurrentPage(PageView.SYSTEM_ADMIN)} 
            />
          )}
        </Layout>
      )}
    </>
  );
}