import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/site';

const requestUrl = getWhatsAppUrl(
    'Hello BAW Fashion, I found a bag style I love and would like to ask whether a similar style may be possible. I will attach my reference photo here.',
);

export default function BagRequestSection() {
    return (
        <section className="mt-12 border border-baw-gold/25 bg-white/65 px-6 py-8 sm:px-8 md:py-10">
            <div className="mx-auto max-w-4xl text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-baw-gold">A style that inspired you</p>
                <h2 className="mt-3 font-serif text-3xl text-baw-black sm:text-4xl">Seen a Bag You Love?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-baw-muted">
                    Found a bag on Instagram, Facebook, or another social platform that you love? Send us its photo and we’ll try to arrange a similar style for you.
                </p>
                {requestUrl ? (
                    <a
                        href={requestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-baw-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-baw-gold"
                    >
                        <MessageCircle size={16} /> Request This Bag
                    </a>
                ) : (
                    <p role="status" className="mx-auto mt-6 max-w-xl border border-baw-gold/25 bg-[#FAF7F0] px-4 py-3 text-sm leading-6 text-baw-muted">
                        WhatsApp requests are unavailable until a valid BAW Fashion business number is configured.
                    </p>
                )}
                <p className="mt-4 text-xs leading-5 text-baw-muted">
                    Attach your reference photo manually in WhatsApp after the chat opens; the website cannot attach local images automatically. Similarity, feasibility, pricing, and availability must be confirmed by BAW Fashion.
                </p>
            </div>
        </section>
    );
}
