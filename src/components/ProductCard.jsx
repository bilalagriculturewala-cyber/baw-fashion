import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../config/site';
import { getStartingPrice, isProductOnSale, isWholesaleProduct } from '../data/products';

export default function ProductCard({ product, index = 0 }) {
    const { dispatch } = useCart();
    const [imgLoaded, setImgLoaded] = useState(false);
    const images = Array.isArray(product.images) ? product.images : [];
    const image = images[0];
    const secondaryImage = images[1] && images[1] !== image ? images[1] : null;
    const isWholesale = isWholesaleProduct(product);
    const hasDiscount = isProductOnSale(product);
    const price = getStartingPrice(product);
    const hasOptions = Boolean(product.sizes?.length || product.colors?.length);
    const canQuickAdd = !product.isDemo && !isWholesale && product.inStock === true && !hasOptions;

    const handleQuickAdd = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!canQuickAdd) return;
        dispatch({
            type: 'ADD_ITEM',
            payload: { product, selectedSize: '', selectedColor: '', quantity: 1 },
        });
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="group"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-baw-gray">
                <Link to={`/product/${product.id}`} className="absolute inset-0 block">
                    {image ? (
                        <>
                            {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-baw-gray" />}
                            <img
                                src={image}
                                alt={product.name}
                                loading="lazy"
                                onLoad={() => setImgLoaded(true)}
                                className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'} ${secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                            />
                            {secondaryImage && (
                                <img
                                    src={secondaryImage}
                                    alt=""
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                            )}
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-baw-muted">Product image not provided</div>
                    )}
                    {isWholesale && (
                        <span className="absolute left-3 top-3 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-baw-black">Wholesale only</span>
                    )}
                    {product.isDemo === true && (
                        <span className={`absolute left-3 ${isWholesale ? 'top-10' : 'top-3'} bg-baw-black/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white`}>Demo sample</span>
                    )}
                    {hasDiscount && (
                        <span className={`absolute ${isWholesale || product.isDemo === true ? 'top-10' : 'top-3'} left-3 bg-baw-amber px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white`}>Sale</span>
                    )}
                    {product.isNew === true && (
                        <span className="absolute right-3 top-3 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-baw-black">New</span>
                    )}
                    {product.inStock === false && (
                        <span className="absolute right-3 bottom-3 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-baw-black">Unavailable</span>
                    )}
                </Link>
                {canQuickAdd && (
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleQuickAdd}
                        className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-full items-center justify-center gap-2 bg-baw-gold py-3 text-xs font-semibold uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0"
                    >
                        <ShoppingBag size={14} /> Add to cart
                    </motion.button>
                )}
            </div>
            <Link to={`/product/${product.id}`} className="block">
                <div className="pt-4">
                    <h3 className="line-clamp-2 font-serif text-base leading-snug text-baw-ivory transition-colors group-hover:text-baw-gold">{product.name || 'Untitled product'}</h3>
                    <p className="mt-2 text-sm text-baw-muted">
                        {product.isDemo === true
                            ? 'Demo image · not for sale'
                            : price !== undefined
                            ? <>{isWholesale ? `From ${formatPrice(price)} / pack` : formatPrice(price)}{hasDiscount && <span className="ml-2 text-xs text-baw-muted line-through">{formatPrice(product.price)}</span>}</>
                            : isWholesale ? 'Contact for Wholesale Pricing' : 'Price to be confirmed'}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-baw-gold">
                        {isWholesale ? 'Wholesale enquiry' : 'View details'} <ArrowRight size={12} />
                    </span>
                </div>
            </Link>
        </motion.article>
    );
}
