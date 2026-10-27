import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { getCategoryBySlug } from '../data/products';

const navLinks = [
  { to: '/shop?collection=new-in', label: 'New In' },
  { to: '/category/bags', label: 'Bags' },
  { to: '/shop?collection=price', label: 'Shop by Price' },
  { to: '/shop?collection=sale', label: 'Sale' },
  { to: '/category/clothing-men', label: "Men's Six-Pocket Trousers" },
  { to: '/category/kids-wholesale', label: "Kids' Wholesale" },
];
const bagSubcategories = getCategoryBySlug('bags')?.bagTypes ?? [];

function linkIsActive(to, location) {
  const [path, search] = to.split('?');
  return location.pathname === path &&
    (!search || location.search === `?${search}`);
}

export default function Navbar() {
  const { totalItems, dispatch } = useCart();
  const { setIsOpen: setSearchOpen } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  const navLinkClass = (to) =>
    `whitespace-nowrap py-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors xl:text-[11px] xl:tracking-[0.16em] ${
      linkIsActive(to, location)
        ? 'text-baw-gold'
        : 'text-baw-black/75 hover:text-baw-gold'
    }`;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-baw-black/10 bg-[#FAF7F0]/95 shadow-[0_4px_24px_rgba(91,70,50,0.06)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">
          <Logo size="sm" />

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center text-baw-black transition-colors hover:text-baw-gold"
              aria-label="Search products"
            >
              <Search size={19} strokeWidth={1.6} />
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'OPEN_CART' })}
              className="relative inline-flex h-11 w-11 items-center justify-center text-baw-black transition-colors hover:text-baw-gold"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-baw-gold px-1 text-[10px] font-semibold text-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center text-baw-black transition-colors hover:text-baw-gold lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={21} strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <nav
          className="mx-auto hidden h-10 max-w-[1440px] items-center justify-center gap-4 border-t border-baw-black/[0.06] px-3 lg:flex xl:gap-7"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => link.label === 'Bags' ? (
            <div key={link.to} className="group relative h-full">
              <Link to={link.to} className={navLinkClass(link.to)} aria-haspopup="true">
                {link.label}
              </Link>
              <div className="invisible absolute left-1/2 top-full z-10 min-w-52 -translate-x-1/2 border border-baw-black/10 bg-[#FAF7F0] py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {bagSubcategories.map((type) => (
                  <Link
                    key={type.slug}
                    to={`/category/bags?bagType=${type.slug}`}
                    className="block px-5 py-2.5 text-[10px] uppercase tracking-[0.12em] text-baw-black/75 transition-colors hover:bg-baw-gold/10 hover:text-baw-gold"
                  >
                    {type.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={link.to} to={link.to} className={navLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#FAF7F0]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-baw-black/10 px-4 sm:px-6">
              <Logo size="sm" onClick={() => setMobileOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center text-baw-black hover:text-baw-gold"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-5 sm:px-10" aria-label="Mobile main navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block border-b border-baw-black/[0.08] py-4 font-serif text-xl ${
                      linkIsActive(link.to, location) ? 'text-baw-gold' : 'text-baw-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.label === 'Bags' && (
                    <div className="grid grid-cols-2 gap-x-4 border-b border-baw-black/[0.08] pb-4 pl-3">
                      {bagSubcategories.map((type) => (
                        <Link
                          key={type.slug}
                          to={`/category/bags?bagType=${type.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 text-xs text-baw-muted transition-colors hover:text-baw-gold"
                        >
                          {type.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="grid grid-cols-2 gap-4 py-6 text-xs uppercase tracking-[0.14em] text-baw-muted">
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="py-2 hover:text-baw-gold">Contact</Link>
                <Link to="/faq" onClick={() => setMobileOpen(false)} className="py-2 hover:text-baw-gold">FAQs</Link>
                <Link to="/delivery-policy" onClick={() => setMobileOpen(false)} className="py-2 hover:text-baw-gold">Delivery information</Link>
                <Link to="/returns-policy" onClick={() => setMobileOpen(false)} className="py-2 hover:text-baw-gold">Returns information</Link>
              </div>
            </nav>

            <div className="border-t border-baw-black/10 px-6 py-5 sm:px-10">
              <p className="text-xs uppercase tracking-[0.24em] text-baw-gold">BAW Fashion</p>
              <p className="mt-1 text-xs text-baw-muted">Style That Speaks.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
