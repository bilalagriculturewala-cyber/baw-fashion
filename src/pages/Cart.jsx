import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../config/site';
import { getCartItemUnitPrice } from '../data/products';

export default function Cart() {
    const { state, dispatch, subtotal, totalItems } = useCart();

    const handleQty = (key, qty) => {
        if (qty < 1) dispatch({ type: 'REMOVE_ITEM', payload: key });
        else dispatch({ type: 'UPDATE_QTY', payload: { key, quantity: qty } });
    };

    return (
        <main className="pt-28 pb-20 min-h-screen max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-baw-gold text-xs tracking-[0.4em] uppercase mb-2">Your Selection</p>
                <h1 className="font-serif text-4xl text-baw-ivory mb-2">Shopping Cart</h1>
                <div className="divider-gold w-24 mb-10" />
            </motion.div>

            {state.items.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-24 flex flex-col items-center gap-5"
                >
                    <ShoppingBag size={56} className="text-baw-gold/30" />
                    <p className="font-serif text-2xl text-baw-muted">Your cart is empty</p>
                    <Link
                        to="/shop"
                        className="flex items-center gap-2 border border-baw-gold text-baw-gold px-8 py-3 hover:bg-baw-gold hover:text-white transition-all duration-300 text-sm tracking-widest uppercase"
                    >
                        Continue Shopping <ArrowRight size={14} />
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-0">
                        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-4 border-b border-baw-gold/20 text-baw-muted text-xs tracking-widest uppercase">
                            <span>Product</span>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span className="text-right">Total</span>
                        </div>

                        <AnimatePresence initial={false}>
                            {state.items.map((item) => {
                                const unitPrice = getCartItemUnitPrice(item);
                                const options = [item.selectedSize, item.selectedColor].filter(Boolean).join(' · ');
                                return (
                                    <motion.div
                                        key={item.key}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: 60, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center py-6 border-b border-baw-gold/10"
                                    >
                                        {/* Product info */}
                                        <div className="flex items-center gap-4">
                                            <Link to={`/product/${item.product.id}`}>
                                                {item.product.images?.[0] ? (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="h-24 w-20 flex-shrink-0 object-cover transition-opacity hover:opacity-80"
                                                    />
                                                ) : (
                                                    <span aria-hidden="true" className="flex h-24 w-20 flex-shrink-0 items-center justify-center bg-baw-gray font-serif text-xs tracking-widest text-baw-muted">BAW</span>
                                                )}
                                            </Link>
                                            <div>
                                                <Link to={`/product/${item.product.id}`}>
                                                    <p className="font-serif text-baw-ivory text-sm hover:text-baw-gold transition-colors line-clamp-2">{item.product.name}</p>
                                                </Link>
                                                <p className="text-baw-muted text-xs mt-1">
                                                    {item.selectedPackSize ? `${item.selectedPackSize} pieces per pack` : options}
                                                </p>
                                                <button
                                                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.key })}
                                                    className="flex items-center gap-1 text-baw-muted hover:text-red-400 transition-colors text-xs mt-2"
                                                >
                                                    <Trash2 size={12} /> Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Unit price */}
                                        <div>
                                            <span className="sm:hidden text-baw-muted text-xs uppercase mr-2">Price:</span>
                                            <span className="text-baw-ivory text-sm">{formatPrice(unitPrice)}</span>
                                        </div>

                                        {/* Qty */}
                                        <div>
                                            <div>
                                                {item.selectedPackSize && <span className="sm:hidden mr-2 text-xs uppercase text-baw-muted">Packs:</span>}
                                                <div className="flex w-fit items-center gap-0 border border-baw-gold/30">
                                                <button
                                                    onClick={() => handleQty(item.key, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-baw-ivory hover:bg-baw-gold/10 transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-8 h-8 flex items-center justify-center text-baw-ivory text-sm border-x border-baw-gold/30">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQty(item.key, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-baw-ivory hover:bg-baw-gold/10 transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Line total */}
                                        <div className="sm:text-right">
                                            <motion.span
                                                key={item.quantity}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-baw-gold font-semibold text-sm"
                                            >
                                                {formatPrice(unitPrice * item.quantity)}
                                            </motion.span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Order summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-baw-dark border border-baw-gold/20 p-6 sticky top-28">
                            <h2 className="font-serif text-xl text-baw-ivory mb-6">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-baw-muted">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-baw-muted">
                                    <span>Delivery</span>
                                    <span className="text-baw-gold">Not configured</span>
                                </div>
                            </div>

                            <div className="divider-gold my-5" />

                            <div className="flex justify-between items-center">
                                <span className="text-baw-ivory text-sm uppercase tracking-widest">Subtotal</span>
                                <motion.span
                                    key={subtotal}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    className="font-serif text-baw-gold text-2xl"
                                >
                                    {formatPrice(subtotal)}
                                </motion.span>
                            </div>
                            <p className="mt-3 text-xs leading-5 text-baw-muted">
                                Final total is not available until delivery charges are confirmed.
                            </p>

                            <Link
                                to="/checkout"
                                className="mt-6 block w-full text-center bg-baw-gold text-baw-black font-semibold tracking-widest uppercase py-4 hover:bg-baw-gold-light transition-colors duration-200"
                            >
                                Proceed to Checkout
                            </Link>
                            <Link
                                to="/shop"
                                className="mt-3 block w-full text-center border border-baw-gold/30 text-baw-muted py-3 hover:border-baw-gold hover:text-baw-ivory text-sm tracking-widest uppercase transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}
