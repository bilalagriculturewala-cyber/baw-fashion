import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { bagPriceBands, categories, getStartingPrice, isProductOnSale } from '../data/products';

const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'sale', label: 'On Sale' },
];

export default function ProductGrid({
    products,
    showFilters = true,
    heading,
    initialSort = 'featured',
    showBagFilters = false,
    initialBagType = 'all',
    emptyTitle,
    emptyDescription,
}) {
    const [sortBy, setSortBy] = useState(initialSort);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterBagType, setFilterBagType] = useState(initialBagType);
    const [priceBand, setPriceBand] = useState('all');

    const filtered = useMemo(() => {
        let list = filterCategory === 'all'
            ? products
            : products.filter((p) => p.category === filterCategory);

        if (showBagFilters && filterBagType !== 'all') {
            list = list.filter((product) => product.bagType === filterBagType);
        }
        if (showBagFilters && priceBand !== 'all') {
            const selectedBand = bagPriceBands.find((band) => band.value === priceBand);
            if (selectedBand) {
                list = list.filter((product) => {
                    const price = getStartingPrice(product);
                    return typeof price === 'number' && Number.isFinite(price) && selectedBand.matches(price);
                });
            }
        }

        switch (sortBy) {
            case 'newest': return [...list].sort((a, b) => Number(b.isNew === true) - Number(a.isNew === true));
            case 'price-asc': return [...list].sort((a, b) => {
                const priceA = getStartingPrice(a);
                const priceB = getStartingPrice(b);
                if (priceA == null) return priceB == null ? 0 : 1;
                if (priceB == null) return -1;
                return priceA - priceB;
            });
            case 'price-desc': return [...list].sort((a, b) => {
                const priceA = getStartingPrice(a);
                const priceB = getStartingPrice(b);
                if (priceA == null) return priceB == null ? 0 : 1;
                if (priceB == null) return -1;
                return priceB - priceA;
            });
            case 'sale': return [...list].filter(isProductOnSale);
            default: return list;
        }
    }, [products, sortBy, filterCategory, filterBagType, priceBand, showBagFilters]);

    const allCategories = [
        { slug: 'all', label: 'All' },
        ...categories.map(({ slug, name }) => ({ slug, label: name })),
    ];
    const bagTypes = [
        { slug: 'all', label: 'All bags' },
        ...(categories.find(({ slug }) => slug === 'bags')?.bagTypes ?? [])
            .map(({ slug, name }) => ({ slug, label: name })),
    ];

    return (
        <div>
            {heading && (
                <div className="mb-10">
                    <h1 className="font-serif text-3xl text-baw-ivory md:text-4xl">{heading}</h1>
                    <div className="divider-gold mt-4 w-24" />
                </div>
            )}

            {products.some((product) => product.isDemo === true) && (
                <p className="mb-8 border border-baw-gold/25 bg-white/55 px-5 py-4 text-sm leading-6 text-baw-muted" role="note">
                    <span className="font-semibold text-baw-black">Demo catalogue preview.</span>{' '}
                    Images are illustrative references only—not confirmed BAW products. Prices, stock, and product specifications have not been provided.
                </p>
            )}

            {(showFilters || showBagFilters) && (
                <div className="mb-8 space-y-4">
                    {showFilters && (
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => setFilterCategory(cat.slug)}
                                    aria-pressed={filterCategory === cat.slug}
                                    className={`flex-shrink-0 border px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200 ${filterCategory === cat.slug
                                        ? 'border-baw-gold bg-baw-gold font-bold text-baw-black'
                                        : 'border-baw-black/15 text-baw-muted hover:border-baw-gold hover:text-baw-gold'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {showBagFilters && (
                        <div className="space-y-4">
                            <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter bags by type">
                                {bagTypes.map((type) => (
                                    <button
                                        key={type.slug}
                                        type="button"
                                        onClick={() => setFilterBagType(type.slug)}
                                        aria-pressed={filterBagType === type.slug}
                                        className={`flex-shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${filterBagType === type.slug
                                            ? 'border-baw-black bg-baw-black text-white'
                                            : 'border-baw-black/15 text-baw-muted hover:border-baw-gold hover:text-baw-black'
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-baw-black/10 pt-4">
                                <label className="flex items-center gap-3 text-xs uppercase tracking-wider text-baw-muted">
                                    <span>Price range</span>
                                    <select
                                        value={priceBand}
                                        onChange={(event) => setPriceBand(event.target.value)}
                                        className="min-h-10 border border-baw-black/15 bg-white px-3 text-xs normal-case tracking-normal text-baw-black focus:border-baw-gold focus:outline-none"
                                    >
                                        {bagPriceBands.map((band) => (
                                            <option key={band.value} value={band.value}>{band.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="flex items-center gap-3 text-xs uppercase tracking-wider text-baw-muted">
                                    <span>Sort by</span>
                                    <select
                                        value={sortBy}
                                        onChange={(event) => setSortBy(event.target.value)}
                                        className="min-h-10 border border-baw-black/15 bg-white px-3 text-xs normal-case tracking-normal text-baw-black focus:border-baw-gold focus:outline-none"
                                    >
                                        {SORT_OPTIONS.filter((option) => ['featured', 'price-asc', 'price-desc'].includes(option.value)).map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <p className="text-sm text-baw-muted" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</p>
                            </div>
                        </div>
                    )}

                    {showFilters && !showBagFilters && (
                        <div className="flex items-center justify-between gap-4 border-t border-baw-black/10 pt-4">
                            <p className="text-sm text-baw-muted" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</p>
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal size={14} className="text-baw-gold" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-baw-black/15 bg-white px-3 py-2 text-xs tracking-wide text-baw-black transition-colors focus:border-baw-gold focus:outline-none"
                                    aria-label="Sort products"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-y border-baw-black/10 bg-white/45 px-6 py-20 text-center"
                    >
                        <p className="font-serif text-xl text-baw-ivory md:text-2xl">
                            {emptyTitle ?? (products.length === 0 ? 'Our collection is being prepared.' : 'No products match these filters.')}
                        </p>
                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-baw-muted">
                            {products.length === 0
                                ? emptyDescription ?? 'This category will be updated when verified product details and images are added.'
                                : 'No products match these filters. Try a different category, bag type, or price range.'}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key={`${filterCategory}-${filterBagType}-${priceBand}-${sortBy}`}
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6"
                    >
                        {filtered.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
