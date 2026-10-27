import { motion } from 'framer-motion';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import BagRequestSection from '../components/BagRequestSection';
import { getCategoryBySlug, getProductsByCategory } from '../data/products';
import { getWhatsAppUrl } from '../config/site';

export default function CategoryPage() {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const category = getCategoryBySlug(slug);
    const categoryProducts = getProductsByCategory(slug);
    const requestedBagType = searchParams.get('bagType');
    const initialBagType = category?.bagTypes?.some((type) => type.slug === requestedBagType)
        ? requestedBagType
        : 'all';
    const selectedBagType = category?.bagTypes?.find((type) => type.slug === initialBagType);
    const matchingBagProducts = selectedBagType
        ? categoryProducts.filter((product) => product.bagType === selectedBagType.slug)
        : categoryProducts;
    const hasMatchingProducts = matchingBagProducts.length > 0;
    const kidsWholesaleUrl = getWhatsAppUrl('Hello BAW Fashion, I am a shopkeeper/wholesale buyer interested in the kids’ paint-shirt sets. Please share the wholesale details and pricing.');

    const emptyTitle = selectedBagType && !hasMatchingProducts
        ? `No ${selectedBagType.name.toLowerCase()} are listed just yet.`
        : category?.slug === 'bags'
        ? 'No bags are listed just yet.'
        : category?.slug === 'clothing-men'
            ? "Men's trouser listings are being prepared."
            : category?.slug === 'kids-wholesale'
                ? "No kids' paint-shirt sets are listed just yet."
                : 'This collection is being prepared.';
    const emptyDescription = selectedBagType && !hasMatchingProducts
        ? `Verified ${selectedBagType.name.toLowerCase()} will appear here when real product details, prices, and images are added.`
        : category?.slug === 'bags'
        ? 'Verified bag styles will appear when real product details, prices, and images are added. Use the request section below to share a style that inspired you.'
        : category?.slug === 'clothing-men'
            ? 'Verified six-pocket trouser listings will appear when product details, prices, and availability are configured. These products are intended for individual retail.'
            : category?.sellingType === 'wholesale'
                ? "Verified wholesale listings will appear when the catalogue is configured. Kids' paint-shirt sets are sold only in packs of 6 or 12 pieces, never as single-piece retail purchases."
                : 'Verified products will appear here when the catalogue is configured. No sample products, prices, or availability are displayed.';

    return (
        <main className="min-h-screen px-5 pb-20 pt-28 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-baw-muted"
                >
                    <Link to="/" className="transition-colors hover:text-baw-gold">Home</Link>
                    <ArrowRight size={10} />
                    <span className="text-baw-gold">{category?.name ?? slug}</span>
                </motion.div>

                {category && (
                    <div className="mb-10 flex flex-col gap-5 border-b border-baw-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-baw-gold">
                                {category.sellingType === 'wholesale' ? 'Wholesale collection' : 'BAW collection'}
                            </p>
                            <h1 className="font-serif text-3xl text-baw-black sm:text-4xl">{category.name}</h1>
                            <p className="mt-3 text-sm leading-7 text-baw-muted">{category.description}</p>
                            {category.sellingType === 'wholesale' && (
                                <div className="mt-3 max-w-xl border-l-2 border-baw-gold pl-3">
                                    <p className="text-sm font-medium leading-6 text-baw-black">
                                        Wholesale only for shopkeepers and bulk buyers · packs of {category.packSizes.join(' or ')} pieces. Single-piece retail purchases are not available.
                                    </p>
                                    {kidsWholesaleUrl && (
                                        <a href={kidsWholesaleUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-2 bg-baw-black px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-baw-gold">
                                            <MessageCircle size={14} /> Ask about wholesale on WhatsApp
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <ProductGrid
                    key={`${slug}-${initialBagType}`}
                    products={categoryProducts}
                    showFilters={false}
                    showBagFilters={slug === 'bags'}
                    initialBagType={initialBagType}
                    heading={category ? undefined : 'Collection'}
                    emptyTitle={categoryProducts.length === 0 || (selectedBagType && !hasMatchingProducts) ? emptyTitle : undefined}
                    emptyDescription={emptyDescription}
                />
                {category?.slug === 'bags' && <BagRequestSection />}
                {categoryProducts.length === 0 && (
                    <div className="mt-7 flex flex-wrap justify-center gap-5 text-center">
                        <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-baw-black transition-colors hover:text-baw-gold">
                            Browse all categories <ArrowRight size={14} />
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
