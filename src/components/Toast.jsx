import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const t = setTimeout(onClose, 2500);
            return () => clearTimeout(t);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-baw-dark border border-baw-gold/40 px-5 py-4 shadow-gold max-w-xs"
                >
                    <CheckCircle size={18} className="text-baw-gold flex-shrink-0" />
                    <p className="text-baw-ivory text-sm flex-1">{message}</p>
                    <button onClick={onClose} className="text-baw-muted hover:text-baw-gold transition-colors ml-2">
                        <X size={14} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
