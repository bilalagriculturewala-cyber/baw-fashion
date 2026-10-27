import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getCategoryBySlug, getPackSizes, getProductById, getProductsByCategory, getRetailPrice, isProductOnSale, isWholesaleProduct } from '../data/products';
import { formatPrice, getWhatsAppUrl } from '../config/site';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
    const { id } = useParams();
    const product = getProductById(id);
    const { dispatch } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedPackSize, setSelectedPackSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    if (!product) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6 pt-28">
                <div className="text-center">
                    <p className="font-serif text-2xl text-baw-ivory">Product not found.</p>
                    <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-baw-gold hover:underline">
                        Return to shop <ArrowRight size={14} />
                    </Link>
                </div>
            </main>
        );
    }

    const category = getCategoryBySlug(product.category);
    const wholesale = isWholesaleProduct(product);
    const packSizes = wholesale ? getPackSizes(product) : [];
    const related = getProductsByCategory(product.category).filter((item) => item.id !== product.id).slice(0, 4);
    const images = Array.isArray(product.images) ? product.images : [];
    const image = images[selectedImage];
    const configuredInStock = product.inStock === true;
    const price = typeof product.price === 'number' && Number.isFinite(product.price) ? product.price : null;
    const hasDiscount = isProductOnSale(product);
    const configuredPackPrice = selectedPackSize ? product.packPrices?.[Number(selectedPackSize)] : null;
    const packPrice = typeof configuredPackPrice === 'number' && Number.isFinite(configuredPackPrice) ? configuredPackPrice : null;
    const optionsAreSelected = (!product.sizes?.length || selectedSize) && (!product.colors?.length || selectedColor);
    const canPurchase = !product.isDemo && configuredInStock && (wholesale ? packPrice !== null : price !== null) && optionsAreSelected && (!wholesale || packSizes.includes(Number(selectedPackSize)));
    const enquiryUrl = getWhatsAppUrl([
        `Hello BAW Fashion, I saw a demo style reference for ${product.name}.`,
        'Please let me know whether a similar style is part of your actual catalogue. I understand this demo image is not a confirmed BAW product.',
        wholesale
            ? `Wholesale pack size: ${selectedPackSize ? `${selectedPackSize} pieces` : 'Please share available options'}.`
            : 'Please share more information about this product.',
    ].join('\n'));

    const addToCart = () => {
        if (!canPurchase) {
            setError(wholesale && !selectedPackSize ? 'Select a wholesale pack size.' : 'Availability or required product details are not configured.');
            return;
        }
        dispatch({
            type: 'ADD_ITEM',
            payload: { product, selectedSize, selectedColor, selectedPackSize: wholesale ? Number(selectedPackSize) : null, quantity },
        });
        setError('');
        setShowToast(true);
    };

    const fieldClass = 'border border-baw-gold/30 px-4 py-2 text-sm text-baw-ivory transition-colors hover:border-baw-gold';
    const selectedClass = 'border-baw-gold bg-baw-gold text-white';

    return (
        <main className="min-h-screen px-6 pb-20 pt-28 lg:px-8">
            <Toast message={`${product.name} added to cart.`} isVisible={showToast} onClose={() => setShowToast(false)} />
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-baw-muted">
                    <Link to="/" className="hover:text-baw-gold">Home</Link><ArrowRight size={10} />
                    <Link to={`/category/${product.category}`} className="hover:text-baw-gold">{category?.name ?? product.category}</Link><ArrowRight size={10} />
                    <span className="text-baw-gold">{product.name}</span>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div className="aspect-[4/5] overflow-hidden bg-baw-gray">
                            {image
                                ? <img src={image} alt={product.name} className="h-full w-full object-cover" />
                                : <div className="flex h-full items-center justify-center text-sm text-baw-muted">Product image not provided</div>}
                        </div>
                        {images.length > 1 && (
                            <div className="mt-3 flex gap-3">
                                {images.map((src, index) => (
                                    <button key={src} type="button" onClick={() => setSelectedImage(index)} className={`h-20 w-16 overflow-hidden border-2 ${selectedImage === index ? 'border-baw-gold' : 'border-transparent'}`} aria-label={`View product image ${index + 1}`}>
                                        <img src={src} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs uppercase tracking-[0.25em] text-baw-gold">{category?.name ?? 'BAW'}</p>
                        <h1 className="mt-3 font-serif text-3xl leading-tight text-baw-ivory md:text-4xl">{product.name}</h1>
                        <p className="mt-4 text-sm leading-7 text-baw-muted">{product.description || category?.description}</p>
                        {product.isDemo === true && (
                            <p className="mt-5 border border-baw-gold/25 bg-white/55 px-4 py-3 text-sm leading-6 text-baw-muted" role="note">
                                Demo image only—not a confirmed BAW product and not available to purchase. No product specifications, price, or stock status are confirmed.
                            </p>
                        )}

                        <div className="my-6 border-y border-baw-gold/20 py-5">
                            {product.isDemo === true ? (
                                <p className="text-sm text-baw-muted">Demo image · not for sale</p>
                            ) : wholesale ? (
                                <p className={packPrice === null ? 'text-sm text-baw-muted' : 'font-serif text-2xl text-baw-gold'}>
                                    {packPrice === null ? 'Contact for Wholesale Pricing' : `${formatPrice(packPrice)} / ${selectedPackSize}-piece pack`}
                                </p>
                            ) : price !== null ? (
                                <p className="font-serif text-2xl text-baw-gold">
                                    {formatPrice(getRetailPrice(product))}
                                    {hasDiscount && <span className="ml-3 align-middle font-sans text-sm text-baw-muted line-through">{formatPrice(price)}</span>}
                                </p>
                            ) : <p className="text-sm text-baw-muted">Price to be confirmed</p>}
                        </div>

                        <div className="mb-6 flex items-start gap-2 text-sm text-baw-muted">
                            <AlertCircle size={16} className="mt-0.5 shrink-0 text-baw-gold" />
                            <span>
                                {configuredInStock
                                    ? 'Availability configured.'
                                    : product.inStock === false
                                        ? 'Currently unavailable.'
                                        : 'Availability has not been provided.'}
                            </span>
                        </div>

                        {wholesale && (
                            <div className="mb-6 border-l-2 border-baw-gold bg-white/60 p-4">
                                <p className="text-sm font-medium text-baw-ivory">Wholesale only. Individual retail purchases are not available.</p>
                                {packSizes.length ? (
                                    <div className="mt-4">
                                        <p className="mb-2 text-xs uppercase tracking-widest text-baw-muted">Pack size</p>
                                        <div className="flex gap-2">
                                            {packSizes.map((size) => (
                                                <button key={size} type="button" onClick={() => { setSelectedPackSize(size); setError(''); }} className={`${fieldClass} ${Number(selectedPackSize) === size ? selectedClass : ''}`}>
                                                    {size} pieces
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : <p className="mt-2 text-sm text-baw-muted">Wholesale pack options are not configured for this product.</p>}
                            </div>
                        )}

                        {product.colors?.length > 0 && (
                            <fieldset className="mb-6">
                                <legend className="mb-3 text-xs uppercase tracking-widest text-baw-muted">Colour</legend>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => <button key={color} type="button" onClick={() => setSelectedColor(color)} className={`${fieldClass} ${selectedColor === color ? selectedClass : ''}`}>{color}</button>)}
                                </div>
                            </fieldset>
                        )}
                        {product.sizes?.length > 0 && (
                            <fieldset className="mb-6">
                                <legend className="mb-3 text-xs uppercase tracking-widest text-baw-muted">Size</legend>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`${fieldClass} ${selectedSize === size ? selectedClass : ''}`}>{size}</button>)}
                                </div>
                            </fieldset>
                        )}

                        <div className="mb-6">
                            <label htmlFor="product-quantity" className="mb-2 block text-xs uppercase tracking-widest text-baw-muted">{wholesale ? 'Number of packs' : 'Quantity'}</label>
                            <div className="flex w-fit items-center border border-baw-gold/30">
                                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex h-10 w-10 items-center justify-center hover:bg-baw-gray" aria-label="Decrease quantity"><Minus size={14} /></button>
                                <span id="product-quantity" className="flex h-10 min-w-10 items-center justify-center border-x border-baw-gold/30 text-sm">{quantity}</span>
                                <button type="button" onClick={() => setQuantity((value) => value + 1)} className="flex h-10 w-10 items-center justify-center hover:bg-baw-gray" aria-label="Increase quantity"><Plus size={14} /></button>
                            </div>
                        </div>

                        {error && <p className="mb-4 text-sm text-red-700" role="alert">{error}</p>}
                        <button type="button" onClick={addToCart} disabled={!canPurchase} className="flex w-full items-center justify-center gap-3 bg-baw-gold px-5 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-baw-black disabled:cursor-not-allowed disabled:bg-baw-gray disabled:text-baw-muted">
                            <ShoppingBag size={17} /> {canPurchase ? 'Add to cart' : 'Purchase unavailable'}
                        </button>
                        {enquiryUrl && (
                            <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 border border-baw-black/20 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-baw-black transition-colors hover:border-baw-gold hover:text-baw-gold">
                                <MessageCircle size={16} /> {product.isDemo === true ? 'Ask about a similar style' : wholesale ? 'Enquire on WhatsApp' : 'Product enquiry on WhatsApp'}
                            </a>
                        )}
                        <p className="mt-4 text-xs leading-5 text-baw-muted">
                            Checkout is not connected to an order service. Adding an item to your cart does not place or submit an order.
                        </p>
                    </motion.section>
                </div>

                {related.length > 0 && (
                    <section className="mt-24">
                        <h2 className="mb-8 font-serif text-3xl text-baw-ivory">More in this category</h2>
                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div>
                    </section>
                )}
            </div>
        </main>
    );
}
