import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function DeliveryPolicy() {
    return (
        <main className="mx-auto min-h-screen max-w-4xl px-6 pb-20 pt-28 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-xs uppercase tracking-[0.35em] text-baw-gold">Information</p>
                <h1 className="mb-8 mt-3 font-serif text-4xl text-baw-ivory">Delivery information</h1>
                <div className="flex items-start gap-4 border border-baw-gold/25 bg-white/60 p-6">
                    <AlertCircle size={20} className="mt-1 shrink-0 text-baw-gold" />
                    <div>
                        <h2 className="font-serif text-xl text-baw-ivory">Delivery terms have not been configured</h2>
                        <p className="mt-3 text-sm leading-7 text-baw-muted">
                            Delivery areas, services, charges, and timeframes have not been provided. This page does not promise delivery coverage or timing. Checkout is not connected to an order service.
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
