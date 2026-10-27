import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../config/site';
import { getCartItemUnitPrice } from '../data/products';

export default function CartDrawer() {
    const { state, dispatch, subtotal } = useCart();

    const handleQty = (key, qty) => {
        if (qty < 1) dispatch({ type: 'REMOVE_ITEM', payload: key });
        else dispatch({ type: 'UPDATE_QTY', payload: { key, quantity: qty } });
    };

    return (
        <AnimatePresence>
            {state.isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => dispatch({ type: 'CLOSE_CART' })}
                        className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-baw-dark border-l border-baw-gold/20 flex flex-col shadow-luxury"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-baw-gold/20">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} className="text-baw-gold" />
                                <h2 className="font-serif text-xl text-baw-ivory">Your Cart</h2>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                                className="p-2 text-baw-muted hover:text-baw-gold transition-colors"
                                aria-label="Close cart"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            {state.items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full gap-4 text-center"
                                >
                                    <ShoppingBag size={48} className="text-baw-gold/30" />
                                    <p className="text-baw-muted font-serif text-lg">Your cart is empty</p>
                                    <button
                                        onClick={() => dispatch({ type: 'CLOSE_CART' })}
                                        className="text-sm text-baw-gold border border-baw-gold/40 px-6 py-2 hover:bg-baw-gold hover:text-white transition-all duration-200"
                                    >
                                        Continue Shopping
                                    </button>
                                </motion.div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {state.items.map((item) => (
                                        <motion.div
                                            key={item.key}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="flex gap-4 pb-4 border-b border-baw-gold/10"
                                        >
                                            {/* Image */}
                                            <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
                                                {item.product.images?.[0] ? (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-baw-gray font-serif text-xs tracking-widest text-baw-muted">BAW</div>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-serif text-baw-ivory text-sm leading-tight line-clamp-2">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-baw-muted text-xs mt-1">
                                                    {item.selectedPackSize
                                                        ? `${item.selectedPackSize} pieces per pack`
                                                        : [item.selectedSize, item.selectedColor].filter(Boolean).join(' · ')}
                                                </p>

                                                {/* Price */}
                                                <p className="text-baw-gold text-sm font-semibold mt-2">
                                                    {formatPrice(getCartItemUnitPrice(item))} {item.selectedPackSize && <span className="text-xs font-normal text-baw-muted">/ pack</span>}
                                                </p>

                                                {/* Qty controls */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <button
                                                        onClick={() => handleQty(item.key, item.quantity - 1)}
                                                        className="w-7 h-7 border border-baw-gold/30 text-baw-ivory hover:border-baw-gold flex items-center justify-center transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-baw-ivory text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQty(item.key, item.quantity + 1)}
                                                        className="w-7 h-7 border border-baw-gold/30 text-baw-ivory hover:border-baw-gold flex items-center justify-center transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={12} />
                                                    </button>

                                                    <button
                                                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.key })}
                                                        className="ml-auto text-baw-muted hover:text-red-400 transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {state.items.length > 0 && (
                            <div className="px-6 py-6 border-t border-baw-gold/20 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-baw-muted text-sm tracking-widest uppercase">Subtotal</span>
                                    <motion.span
                                        key={subtotal}
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-serif text-baw-gold text-xl"
                                    >
                                        {formatPrice(subtotal)}
                                    </motion.span>
                                </div>
                                <p className="text-baw-muted text-xs">Delivery terms have not been configured.</p>

                                <Link
                                    to="/checkout"
                                    onClick={() => dispatch({ type: 'CLOSE_CART' })}
                                    className="block w-full text-center bg-baw-gold text-baw-black font-semibold tracking-widest uppercase py-4 hover:bg-baw-gold-light transition-colors duration-200"
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    to="/cart"
                                    onClick={() => dispatch({ type: 'CLOSE_CART' })}
                                    className="block w-full text-center border border-baw-gold/40 text-baw-ivory py-3 hover:border-baw-gold text-sm tracking-widest uppercase transition-colors duration-200"
                                >
                                    View Full Cart
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
