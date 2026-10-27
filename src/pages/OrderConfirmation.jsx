import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderConfirmation() {
    return (
        <main className="flex min-h-[65vh] items-center justify-center px-6 py-20">
            <div className="max-w-lg text-center">
                <AlertCircle size={40} className="mx-auto text-baw-gold" />
                <p className="mt-6 text-xs uppercase tracking-[0.35em] text-baw-gold">Order status</p>
                <h1 className="mt-3 font-serif text-3xl text-baw-ivory">No order was submitted</h1>
                <p className="mt-4 text-sm leading-7 text-baw-muted">
                    This website does not have an order service connected. No order details have been sent or saved to a store server.
                </p>
                <Link to="/shop" className="mt-7 inline-flex items-center gap-2 border border-baw-gold px-6 py-3 text-xs uppercase tracking-widest text-baw-gold hover:bg-baw-gold hover:text-white">
                    <ShoppingBag size={15} /> Return to shop <ArrowRight size={14} />
                </Link>
            </div>
        </main>
    );
}
