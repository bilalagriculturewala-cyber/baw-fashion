import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

// Layout components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import DeliveryPolicy from './pages/DeliveryPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';

// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/delivery-policy" element={<DeliveryPolicy />} />
        <Route path="/returns-policy" element={<ReturnsPolicy />} />
        {/* Catch-all: redirect unmatched paths to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
          {/* Persistent layout */}
          <Navbar />
          <CartDrawer />
          <SearchBar />
          <Toast />

          {/* Page content */}
          <AnimatedRoutes />

          <Footer />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
