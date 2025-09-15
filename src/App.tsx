import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutPage from "./components/AboutPage";
import SellerLogin from "./components/SellerLogin";
import BuyerLogin from "./components/BuyerLogin";

import AnitaPage from "./components/AnitaPage";
import SmartSourcingTools from "./components/SmartSourcingTools";
import LearnPage from "./components/LearnPage";
import VendorsHub from "./components/VendorsHub";
import ProcurementSolutions from "./components/ProcurementSolutions";
import SalesSolutions from "./components/SalesSolutions";
import IntegrationSolutions from "./components/IntegrationSolutions";
import Footer from "./components/Footer";
import SellerPage from "./components/SellerPage";
import HowItWorks from "./components/HowItWorks";
import ContactUs from "./components/ContactUs";
import BookDemo from "./components/BookDemo";
// import Login from "./components/Login";
import BuyerDashboard from "./components/BuyerDashboard";
import RFQCreationFlow from "./components/Buyer/RFQCreation/RFQCreationFlow";
import MainLogin from "./components/OnBoarding/login";
import SellerDashboard from "./components/Seller/SellerDashboard";

import Marketplace from "./components/MarketPlace/Marketplace";
import ProductSearchPage from "./components/MarketPlace/ProductSearchPage";
import ServiceSearchPage from "./components/MarketPlace/ServiceSearchPage";
import ServiceProviderPage from "./components/MarketPlace/ServiceProviderPage";
import ProductDetailPage from "./components/MarketPlace/ProductDetailPage";

import DashboardV2 from "./components/Dashboardv2";
import TopNavigation from "./components/TopNavigation";
import MobileDashboardBuyer from "./components/MobileDashboard/MobileDashboard";
import MobileDashboardSeller from "./components/Seller/DashBoard/MobileDashboardSeller";
// import MobileDashboardSeller from "./components/Seller/DashBoard/MobileDashboardSeller";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/about-us"
            element={
              <>
                <Header />
                <AboutPage />
              </>
            }
          />
          <Route
            path="/contact-us"
            element={
              <>
                <Header />
                <ContactUs />
              </>
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <>
                <div className="hidden md:block pt-[70px]">
                  <TopNavigation
                    onNotificationClick={() => {}}
                    unreadNotificationCount={2}
                    onProfileClick={() => {}}
                  />
                  <SellerDashboard profileStatus="pending" />
                </div>
                <div className="md:hidden">
                  <MobileDashboardBuyer />
                </div>
              </>
            }
          />
          <Route
            path="/seller-dashboard-v2"
            element={
              <>
                <div className="hidden md:block pt-[70px]">
                  <TopNavigation
                    onNotificationClick={() => {}}
                    unreadNotificationCount={2}
                    onProfileClick={() => {}}
                  />
                  <DashboardV2 />
                </div>
                <div className="md:hidden">
                  <MobileDashboardSeller />
                </div>
              </>
            }
          />
          <Route
            path="/book-demo"
            element={
              <>
                <Header />
                <BookDemo />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <MainLogin page="login" />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header />
                <MainLogin page="signup" />
              </>
            }
          />
          <Route
            path="/buyer-dashboard"
            element={
              <>
                <div className="hidden md:block pt-[70px] bg-gray-100">
                  <TopNavigation
                    onNotificationClick={() => {}}
                    unreadNotificationCount={2}
                    onProfileClick={() => {}}
                  />
                  <BuyerDashboard />
                </div>
                <div className="md:hidden">
                  <MobileDashboardBuyer />
                </div>
              </>
            }
          />
          {/* <Route
            path="/buyer-dashboard"
            element={
              <>
                <div className="hidden md:block">
                  <BuyerDashboard />
                </div>
                <div className="md:hidden">
                  <MobileDashboardBuyer />
                </div>
              </>
            }
          /> */}
          <Route
            path="/become-a-seller"
            element={
              <>
                <Header />
                <SellerLogin />
              </>
            }
          />
          <Route
            path="/become-a-buyer"
            element={
              <>
                <Header />
                <BuyerLogin />
              </>
            }
          />

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/products" element={<ProductSearchPage />} />
          <Route path="/services" element={<ServiceSearchPage />} />
          <Route path="/seller/:sellerId" element={<SellerPage />} />
          <Route
            path="/provider/:providerId"
            element={<ServiceProviderPage />}
          />
          <Route
            path="/seller/:sellerId/product/:productId"
            element={<ProductDetailPage />}
          />
          <Route
            path="/anita"
            element={
              <>
                <Header />
                <AnitaPage />
              </>
            }
          />
          <Route
            path="/smart-sourcing-tools"
            element={
              <>
                <Header />
                <SmartSourcingTools />
              </>
            }
          />
          <Route
            path="/learn"
            element={
              <>
                <Header />
                <LearnPage />
              </>
            }
          />
          <Route
            path="/vendors-hub"
            element={
              <>
                <Header />
                <VendorsHub />
                <HowItWorks defaultPage="sellers" />
              </>
            }
          />
          <Route
            path="/procurement-solutions"
            element={
              <>
                <Header />
                <ProcurementSolutions />
              </>
            }
          />
          <Route
            path="/sales-solutions"
            element={
              <>
                <Header />
                <SalesSolutions />
              </>
            }
          />
          <Route
            path="/integration-solutions"
            element={
              <>
                <Header />
                <IntegrationSolutions />
              </>
            }
          />
          <Route
            path="/seller-page"
            element={
              <>
                <SellerPage />
              </>
            }
          />
          <Route
            path="/rfq-creation"
            element={
              <>
                <Header />
                <RFQCreationFlow />
              </>
            }
          />
        </Routes>
        <Routes>
          <Route path="/seller-dashboard" element={null} />
          <Route path="/rfq-creation" element={null} />
          <Route path="/buyer-dashboard" element={null} />
          <Route path="/marketplace" element={null} />
          <Route path="/smart-sourcing-tools" element={<Footer />} />
          <Route path="/learn" element={<Footer />} />
          <Route path="/vendors-hub" element={<Footer />} />
          <Route path="/procurement-solutions" element={<Footer />} />
          <Route path="/sales-solutions" element={<Footer />} />
          <Route path="/integration-solutions" element={<Footer />} />
          {/* <Route path="*" element={<Footer />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
