import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { getProductsWithPrice, newArrivals, products, saleProducts } from '../data/products';

const collections = {
    'new-in': {
        eyebrow: 'Just added',
        heading: 'New In',
        description: 'Browse products explicitly marked as new in the verified catalogue.',
        products: newArrivals,
        emptyTitle: 'No new arrivals yet.',
        emptyDescription: 'New In will show products only when they are explicitly marked as new in the catalogue.',
    },
    price: {
        eyebrow: 'Browse by price',
        heading: 'Shop by Price',
        description: 'Browse bags by their verified retail prices. Price bands do not imply that products are available in every range.',
        products: getProductsWithPrice().filter((product) => product.category === 'bags'),
        initialSort: 'price-asc',
        emptyTitle: 'Prices are not available yet.',
        emptyDescription: 'This collection will show products once verified retail or wholesale pack prices are added.',
    },
    sale: {
        eyebrow: 'Offers',
        heading: 'Sale',
        description: 'Only products with explicit sale marking and a valid lower sale price are shown here.',
        products: saleProducts,
        emptyTitle: 'No sale items are listed.',
        emptyDescription: 'Sale products will appear only after verified original prices and sale prices are entered in the catalogue.',
    },
};

export default function Shop() {
    const [searchParams] = useSearchParams();
    const collection = collections[searchParams.get('collection')];
    const visibleProducts = collection?.products ?? products;

    return (
        <main className="min-h-screen px-5 pb-20 pt-28 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <motion.header
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-8 max-w-2xl"
                >
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-baw-gold sm:text-xs">
                        {collection?.eyebrow ?? 'Explore BAW'}
                    </p>
                    {collection?.description && (
                        <p className="text-sm leading-7 text-baw-muted">{collection.description}</p>
                    )}
                </motion.header>
                <ProductGrid
                    key={searchParams.toString() || 'all-products'}
                    products={visibleProducts}
                    showFilters={collection?.heading !== 'Shop by Price'}
                    showBagFilters={collection?.heading === 'Shop by Price'}
                    heading={collection?.heading ?? 'All Products'}
                    initialSort={collection?.initialSort ?? 'featured'}
                    emptyTitle={collection?.emptyTitle}
                    emptyDescription={collection?.emptyDescription}
                />
            </div>
        </main>
    );
}
