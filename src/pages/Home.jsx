import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, BriefcaseBusiness, Shirt, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import BagRequestSection from '../components/BagRequestSection';

const categoryVisuals = {
    bags: {
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=85',
        icon: ShoppingBag,
        eyebrow: 'Demo image · individual retail category',
    },
    'clothing-men': {
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1000&q=85',
        icon: Shirt,
        eyebrow: 'Demo image · individual retail category',
    },
    'kids-wholesale': {
        image: '/assets/products/kids-wholesale/kids-wholesale-09.jpg',
        icon: BriefcaseBusiness,
        eyebrow: 'Demo image · wholesale category · packs of 6 or 12',
    },
};

function SectionIntro({ eyebrow, title, description }) {
    return (
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-baw-gold">{eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl text-baw-ivory md:text-4xl">{title}</h2>
            {description && <p className="mt-4 text-sm leading-7 text-baw-muted">{description}</p>}
            <div className="divider-gold mx-auto mt-5 w-20" />
        </div>
    );
}

export default function Home() {
    const reduceMotion = useReducedMotion();

    return (
        <main>
            <section className="relative overflow-hidden bg-[#FAF7F0] pt-[72px] lg:pt-[116px]">
                <div className="mx-auto grid max-w-[1440px] items-center gap-5 px-5 pb-10 pt-10 sm:px-8 sm:pb-14 lg:min-h-[690px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-0 lg:px-12 lg:py-0 xl:px-16">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.65 }}
                        className="relative z-10 max-w-[610px] py-7 lg:py-16"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-baw-gold sm:text-xs sm:tracking-[0.3em]">BAW FASHION • MADE FOR YOUR STYLE</p>
                        <h1 className="mt-5 font-serif text-[clamp(3.25rem,9vw,7rem)] font-medium leading-[0.98] tracking-[-0.045em] text-baw-black lg:mt-7">
                            Your Style.
                            <br />
                            <span className="italic text-baw-black">Your BAW.</span>
                        </h1>
                        <p className="mt-5 max-w-[520px] text-sm leading-7 text-baw-muted sm:mt-6 sm:text-base sm:leading-8">
                            Discover bags made for your style, men&apos;s six-pocket trousers for everyday wear, and kids&apos; paint-shirt sets for wholesale buyers.
                        </p>
                        <div className="mt-7 flex max-w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                            <Link to="/category/bags" className="inline-flex min-h-14 items-center justify-center gap-3 bg-baw-black px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-baw-gold">
                                Shop Bags <ArrowRight size={15} />
                            </Link>
                            <Link to="/shop" className="inline-flex min-h-14 items-center justify-center border border-baw-black/30 px-7 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-baw-black transition-colors hover:border-baw-gold hover:text-baw-gold">
                                Explore the collection
                            </Link>
                        </div>
                        <Link to="/shop" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-baw-muted transition-colors hover:text-baw-gold">
                            Explore all categories <ArrowRight size={12} />
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15 }}
                        className="relative -mx-5 h-[min(104vw,470px)] min-h-[300px] overflow-hidden bg-[#FAF7F0] sm:mx-0 sm:h-[480px] lg:absolute lg:right-0 lg:top-[116px] lg:mx-0 lg:h-[min(42vw,660px)] lg:min-h-[574px] lg:w-[60%] lg:max-w-[920px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1772026251816-a6d382c67b3b?w=1400&q=85&auto=format&fit=crop"
                            alt="Handbag inspiration photograph; this is not a confirmed BAW product or product listing"
                            className="absolute inset-0 h-full w-full object-cover object-[50%_52%] lg:object-center"
                            fetchPriority="high"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-[#FAF7F0]/10 lg:bg-gradient-to-r lg:from-[#FAF7F0] lg:via-[#FAF7F0]/20 lg:to-transparent" />
                        <p className="absolute bottom-3 right-4 bg-black/35 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white/90 sm:bottom-4 sm:right-5 sm:text-[9px]">Editorial inspiration · not a product listing</p>
                    </motion.div>
                </div>
                <a href="#collections" aria-label="Scroll to collections" className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-baw-black/50 transition-colors hover:text-baw-gold lg:block">
                    <ArrowDown size={18} />
                </a>
            </section>

            <section id="collections" className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
                <SectionIntro
                    eyebrow="The BAW selection"
                    title="Shop by category"
                    description="Browse demo image references by category. They are not confirmed BAW products; actual prices, stock, and specifications are not yet provided."
                />
                <div className="grid gap-5 md:grid-cols-3">
                    {categories.map((category) => {
                        const visual = categoryVisuals[category.slug];
                        const Icon = visual.icon;
                        return (
                            <Link key={category.slug} to={`/category/${category.slug}`} className="group relative min-h-[390px] overflow-hidden bg-baw-gray md:min-h-[500px]">
                                <img src={visual.image} alt="Demo category image, not a confirmed BAW product" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
                                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center border border-white/50"><Icon size={18} /></div>
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">{visual.eyebrow}</p>
                                    <h3 className="mt-2 font-serif text-2xl md:text-3xl">{category.name}</h3>
                                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">{category.description}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest">Explore category <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 md:pb-20 lg:px-12">
                <BagRequestSection />
            </div>

            <section className="border-y border-baw-gold/20 bg-white/50 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-baw-gold">For shopkeepers & wholesale buyers</p>
                        <h2 className="mt-3 font-serif text-3xl text-baw-ivory md:text-4xl">Kids&apos; paint-shirt sets, wholesale only.</h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-baw-muted">
                            These sets are not available for individual retail purchase. Wholesale pack sizes are 6 or 12 pieces.
                        </p>
                    </div>
                    <Link to="/category/kids-wholesale" className="inline-flex w-fit items-center gap-3 border border-baw-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-baw-gold transition-colors hover:bg-baw-gold hover:text-white">
                        Wholesale details <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

        </main>
    );
}
