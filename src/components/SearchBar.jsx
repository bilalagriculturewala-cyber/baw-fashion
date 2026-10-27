import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { formatPrice } from '../config/site';
import { getCategoryBySlug, getStartingPrice, isProductOnSale } from '../data/products';

export default function SearchBar() {
    const { query, setQuery, isOpen, setIsOpen } = useSearch();
    const inputRef = useRef(null);

    const results = query.length > 1
        ? products.filter((p) =>
            String(p.name ?? '').toLowerCase().includes(query.toLowerCase()) ||
            p.category?.toLowerCase().includes(query.toLowerCase()) ||
            getCategoryBySlug(p.category)?.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
        : [];

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setIsOpen]);

    const close = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[90] bg-baw-dark/95 backdrop-blur-sm flex flex-col"
                >
                    {/* Search input */}
                    <div className="flex items-center gap-4 px-6 py-6 border-b border-baw-gold/20 max-w-3xl mx-auto w-full mt-16">
                        <Search size={22} className="text-baw-gold flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products…"
                            className="flex-1 bg-transparent text-baw-ivory text-2xl font-serif placeholder-baw-muted/50 outline-none"
                            aria-label="Search products"
                        />
                        <button onClick={close} className="text-baw-muted hover:text-baw-gold transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full px-6 py-6">
                        {query.length > 1 && results.length === 0 && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-baw-muted text-center py-12 font-serif text-lg"
                            >
                                No products found for "{query}"
                            </motion.p>
                        )}

                        <div className="space-y-3">
                            {results.map((product, i) => {
                                const productCategory = getCategoryBySlug(product.category);
                                const price = getStartingPrice(product);
                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={close}
                                        className="flex items-center gap-4 border border-transparent p-3 transition-all duration-200 hover:border-baw-gold/20 hover:bg-baw-gold/5"
                                    >
                                        {product.images?.[0] ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name ?? ''}
                                                className="h-16 w-14 flex-shrink-0 object-cover"
                                            />
                                        ) : (
                                            <span aria-hidden="true" className="flex h-16 w-14 flex-shrink-0 items-center justify-center bg-baw-gray text-[8px] uppercase tracking-wider text-baw-muted">BAW</span>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="line-clamp-1 font-serif text-baw-ivory">{product.name || 'Untitled product'}</p>
                                            <p className="text-baw-muted text-xs mt-0.5 capitalize">
                                                {productCategory?.name ?? product.category?.replace('-', ' ') ?? 'Category'}
                                            </p>
                                            <p className="text-baw-gold text-sm mt-1">
                                                {product.isDemo === true
                                                    ? 'Demo image · not for sale'
                                                    : price === undefined && productCategory?.sellingType === 'wholesale'
                                                    ? 'Contact for Wholesale Pricing'
                                                    : `${formatPrice(price)}${productCategory?.sellingType === 'wholesale' ? ' / pack' : ''}`}
                                            </p>
                                        </div>
                                        {product.isDemo === true && (
                                            <span className="border border-baw-gold/30 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-baw-black">Demo</span>
                                        )}
                                        {product.isNew === true && (
                                            <span className="text-[10px] bg-baw-champagne text-baw-black px-2 py-0.5 font-bold">NEW</span>
                                        )}
                                        {isProductOnSale(product) && (
                                            <span className="bg-baw-amber px-2 py-0.5 text-[10px] font-bold text-white">SALE</span>
                                        )}
                                    </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {query.length <= 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-baw-muted font-serif text-xl">Start typing to search…</p>
                                <p className="text-baw-muted/50 text-sm mt-2">Search by product name or category</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
