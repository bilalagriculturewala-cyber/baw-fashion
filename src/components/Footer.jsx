import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { getWhatsAppUrl } from '../config/site';

const copyrightYear = new Date().getFullYear();
const whatsappUrl = getWhatsAppUrl('Hello BAW Fashion, I have a question.');

const footerLinks = [
    {
        heading: 'Explore',
        links: [
            { to: '/shop', label: 'Shop all' },
            { to: '/shop?collection=new-in', label: 'New in' },
            { to: '/category/bags', label: 'Bags' },
            { to: '/shop?collection=price', label: 'Shop by price' },
            { to: '/shop?collection=sale', label: 'Sale' },
            { to: '/category/clothing-men', label: "Men's six-pocket trousers" },
            { to: '/category/kids-wholesale', label: "Kids' wholesale sets" },
        ],
    },
    {
        heading: 'Information',
        links: [
            { to: '/contact', label: 'Contact' },
            { to: '/faq', label: 'Frequently asked questions' },
            { to: '/delivery-policy', label: 'Delivery information' },
            { to: '/returns-policy', label: 'Returns information' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="mt-0 border-t border-baw-gold/20 bg-baw-dark">
            <div className="divider-gold" />
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
                <div>
                    <Logo size="md" />
                    <p className="mt-5 max-w-sm text-sm leading-7 text-baw-muted">
                        BAW offers bags and men&apos;s six-pocket trousers for individual retail, alongside kids&apos; paint-shirt sets for wholesale buyers.
                    </p>
                    {whatsappUrl && (
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm text-baw-muted transition-colors hover:text-baw-gold"
                        >
                            <MessageCircle size={16} /> Contact us on WhatsApp
                        </a>
                    )}
                </div>
                {footerLinks.map(({ heading, links }) => (
                    <div key={heading}>
                        <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-baw-ivory">{heading}</h2>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm text-baw-muted transition-colors hover:text-baw-gold">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-baw-gold/15 px-6 py-5 text-center text-xs text-baw-muted">
                © {copyrightYear} BAW. WhatsApp is available for enquiries; checkout is not connected to an order service.
            </div>
        </footer>
    );
}
