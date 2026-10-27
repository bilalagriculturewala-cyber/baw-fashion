import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/site';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
    const whatsappUrl = getWhatsAppUrl('Hello BAW Fashion, I have a general enquiry.');

    return (
        <main className="pt-28 pb-20 min-h-screen max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
                <p className="text-baw-gold text-xs tracking-[0.4em] uppercase mb-2">Get in Touch</p>
                <h1 className="font-serif text-4xl text-baw-ivory mb-2">Contact Us</h1>
                <div className="divider-gold w-24 mb-10" />
            </motion.div>

            <div className="max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 border border-baw-gold/25 bg-white/60 p-6 md:p-8"
                >
                    <MessageCircle size={20} className="mt-1 shrink-0 text-baw-gold" />
                    <div>
                        <h2 className="font-serif text-2xl text-baw-ivory">Contact BAW Fashion</h2>
                        <p className="mt-4 text-sm leading-7 text-baw-muted">
                            For general questions, contact BAW Fashion on WhatsApp.
                        </p>
                        {whatsappUrl && (
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-baw-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-baw-gold">
                                <MessageCircle size={15} /> Message us on WhatsApp
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
