import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'Can I place an order on this website?',
        a: 'Not yet. A checkout or order-submission service has not been configured. Cart and checkout details stay in your browser and are not sent to BAW.',
    },
    {
        q: 'How are kids’ paint-shirt sets sold?',
        a: 'Kids’ paint-shirt sets are wholesale only for shopkeepers and wholesale buyers. Pack sizes are 6 or 12 pieces; individual retail purchases are not offered. Any images currently shown are demo references and do not confirm actual products or availability.',
    },
    {
        q: 'Can I buy a bag individually?',
        a: 'Bags are intended for individual retail purchase. The images currently shown are demo references only; no real products, prices, or availability are confirmed.',
    },
    {
        q: 'Can I request a bag inspired by a reference photo?',
        a: 'You can contact BAW through the WhatsApp request link on the Bags page when a business number is configured. Attach your reference photo manually in WhatsApp. Similarity and availability are not guaranteed.',
    },
    {
        q: 'How are men’s six-pocket trousers sold?',
        a: 'Men’s six-pocket trousers are intended for individual retail purchase. The image currently shown is a demo reference only; no real products, prices, sizes, or availability are confirmed.',
    },
    {
        q: 'What are the delivery, payment, and return terms?',
        a: 'Delivery, payment, and returns terms have not been configured for this store. See the information pages for the current configuration status.',
    },
];

function FAQItem({ faq, i }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="border-b border-baw-gold/15"
        >
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                aria-expanded={open}
            >
                <span className="text-baw-ivory text-sm font-medium">{faq.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-baw-gold flex-shrink-0" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 pr-8 text-baw-muted text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    return (
        <main className="pt-28 pb-20 min-h-screen max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-baw-gold text-xs tracking-[0.4em] uppercase mb-2">Help Centre</p>
                <h1 className="font-serif text-4xl text-baw-ivory mb-2">Frequently Asked Questions</h1>
                <div className="divider-gold w-24 mb-10" />
            </motion.div>

            <div>
                {faqs.map((faq, i) => <FAQItem key={i} faq={faq} i={i} />)}
            </div>
        </main>
    );
}
