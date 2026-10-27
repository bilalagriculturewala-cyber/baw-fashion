import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getWhatsAppUrl } from '../config/site';
import { getCartItemUnitPrice } from '../data/products';

export default function Checkout() {
    const { state, subtotal } = useCart();

    const [form, setForm] = useState({
        name: '', phone: '', city: '', address: '', notes: '',
    });
    const [errors, setErrors] = useState({});
    const [handoffUrl, setHandoffUrl] = useState('');
    const [notice, setNotice] = useState('');

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        if (!form.city.trim()) e.city = 'City is required';
        if (!form.address.trim() || form.address.trim().length < 10) e.address = 'Full address required (min 10 chars)';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setHandoffUrl('');
        setNotice('');
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotice('');
        setHandoffUrl('');
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        if (state.items.length === 0) return;

        const itemSummary = state.items.map((item) => {
            const quantity = item.selectedPackSize
                ? `${item.quantity} pack(s) of ${item.selectedPackSize} pieces`
                : `${item.quantity} item(s)`;
            return `- ${item.product.name} (${quantity}): ${formatPrice(getCartItemUnitPrice(item) * item.quantity)}`;
        }).join('\n');
        const message = [
            'Hello BAW Fashion, I would like to enquire about placing this order:',
            itemSummary,
            `Subtotal: ${formatPrice(subtotal)} (delivery charge to be confirmed)`,
            `Name: ${form.name.trim()}`,
            `Phone: ${form.phone.trim()}`,
            `City: ${form.city.trim()}`,
            `Delivery address: ${form.address.trim()}`,
            form.notes.trim() ? `Notes: ${form.notes.trim()}` : '',
            'Please confirm availability, delivery charges, and advance bank-transfer instructions. This message is an enquiry only; it does not confirm an order or payment.',
        ].filter(Boolean).join('\n');
        const url = getWhatsAppUrl(message);
        if (!url) {
            setNotice('WhatsApp is unavailable because a valid business number is not configured.');
            return;
        }
        setHandoffUrl(url);
        setNotice('Review the prepared message before opening WhatsApp. Your details are not sent until you choose to continue there; this handoff does not confirm an order or payment.');
    };

    if (state.items.length === 0) {
        return (
            <main className="pt-28 min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="font-serif text-baw-muted text-2xl">Your cart is empty.</p>
                    <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-baw-gold hover:underline">
                        Return to Shop <ArrowRight size={14} />
                    </Link>
                </div>
            </main>
        );
    }

    const fieldClass = (name) =>
        `w-full bg-baw-gray border ${errors[name] ? 'border-red-500' : 'border-baw-gold/20'} text-baw-ivory px-4 py-3 text-sm focus:border-baw-gold focus:outline-none transition-colors placeholder-baw-muted/50`;

    return (
        <main className="pt-28 pb-20 min-h-screen max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-baw-gold text-xs tracking-[0.4em] uppercase mb-2">Final Step</p>
                <h1 className="font-serif text-4xl text-baw-ivory mb-2">Checkout</h1>
                <div className="divider-gold w-24 mb-10" />
            </motion.div>

            {/* Order service notice */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 flex items-start gap-3 p-4 border border-baw-gold/30 bg-baw-gold/5"
            >
                <AlertTriangle size={18} className="text-baw-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-baw-muted leading-relaxed">
                    <strong className="text-baw-ivory">Website orders and payments are not configured.</strong> This form prepares an optional WhatsApp enquiry; it does not place or store an order.
                    <br />
                    <span className="text-xs mt-1 block text-baw-muted/70">Advance-payment instructions are not available yet. Do not transfer payment until BAW Fashion provides and confirms the details. Delivery charges also require confirmation.</span>
                </div>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="lg:col-span-2 space-y-5"
                    >
                        <h2 className="font-serif text-xl text-baw-ivory">Delivery Details</h2>

                        {/* Name */}
                        <div>
                            <label htmlFor="checkout-name" className="text-baw-ivory text-xs tracking-widest uppercase block mb-2">Full Name *</label>
                            <input id="checkout-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" autoComplete="name" required aria-invalid={Boolean(errors.name)} className={fieldClass('name')} />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="checkout-phone" className="text-baw-ivory text-xs tracking-widest uppercase block mb-2">Phone Number *</label>
                            <input id="checkout-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" type="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} className={fieldClass('phone')} />
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <label htmlFor="checkout-city" className="text-baw-ivory text-xs tracking-widest uppercase block mb-2">City *</label>
                            <input id="checkout-city" name="city" value={form.city} onChange={handleChange} placeholder="Your city" autoComplete="address-level2" required aria-invalid={Boolean(errors.city)} className={fieldClass('city')} />
                            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="checkout-address" className="text-baw-ivory text-xs tracking-widest uppercase block mb-2">Full Address *</label>
                            <textarea
                                id="checkout-address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="House/flat number, street, area, landmark…"
                                rows={3}
                                autoComplete="street-address"
                                required
                                aria-invalid={Boolean(errors.address)}
                                className={fieldClass('address')}
                            />
                            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="checkout-notes" className="text-baw-ivory text-xs tracking-widest uppercase block mb-2">Order Notes (Optional)</label>
                            <textarea
                                id="checkout-notes"
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                placeholder="Special instructions, gift messages, etc."
                                rows={2}
                                className={fieldClass('notes')}
                            />
                        </div>
                    </motion.div>

                    {/* Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-baw-dark border border-baw-gold/20 p-6 sticky top-28">
                            <h2 className="font-serif text-xl text-baw-ivory mb-5">Order Summary</h2>

                            <div className="space-y-4 mb-5">
                                {state.items.map((item) => (
                                    <div key={item.key} className="flex gap-3">
                                        {item.product.images?.[0]
                                            ? <img src={item.product.images[0]} alt={item.product.name} className="h-16 w-14 flex-shrink-0 object-cover" />
                                            : <span aria-hidden="true" className="flex h-16 w-14 flex-shrink-0 items-center justify-center bg-baw-gray font-serif text-[9px] tracking-widest text-baw-muted">BAW</span>}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-baw-ivory text-xs font-serif line-clamp-2">{item.product.name}</p>
                                            <p className="text-baw-muted text-[11px] mt-0.5">
                                                {item.selectedPackSize ? `${item.selectedPackSize} pieces per pack` : [item.selectedSize, item.selectedColor].filter(Boolean).join(' · ')}
                                            </p>
                                            <p className="text-baw-gold text-xs mt-1">{formatPrice(getCartItemUnitPrice(item) * item.quantity)} × {item.quantity}{item.selectedPackSize ? ' packs' : ''}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="divider-gold mb-4" />

                            <div className="flex justify-between items-center">
                                <span className="text-baw-muted text-sm uppercase tracking-widest">Subtotal</span>
                                <span className="font-serif text-baw-gold text-xl">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="mb-6 mt-3 flex justify-between gap-4 text-xs text-baw-muted">
                                <span>Delivery charge</span>
                                <span className="text-right">To be confirmed</span>
                            </div>

                            <motion.button
                                type="submit"
                                whileTap={{ scale: 0.97 }}
                                className="w-full bg-baw-gold py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-baw-black"
                            >
                                Prepare WhatsApp enquiry
                            </motion.button>

                            {notice && <p className="mt-4 border border-baw-gold/30 bg-white/60 p-3 text-sm leading-6 text-baw-ivory" role="status">{notice}</p>}
                            {handoffUrl && (
                                <a
                                    href={handoffUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 flex min-h-12 w-full items-center justify-center border border-baw-black/20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-baw-black transition-colors hover:border-baw-gold hover:text-baw-gold"
                                >
                                    Review and open WhatsApp
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </form>
        </main>
    );
}
