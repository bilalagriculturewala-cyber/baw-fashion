import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', className = '', onClick }) {
    const scales = {
        sm: 'w-10 h-10',
        md: 'w-14 h-14',
        lg: 'w-20 h-20',
    };

    return (
        <Link to="/" onClick={onClick} className={`flex items-center gap-3 group ${className}`} aria-label="BAW Home">
            {/* SVG Monogram */}
            <div className={`${scales[size]} flex-shrink-0`}>
                <svg
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full logo-metallic"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#5B4632" />
                            <stop offset="45%" stopColor="#F4D9A0" />
                            <stop offset="100%" stopColor="#5B4632" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#5B4632" floodOpacity="0.12" />
                        </filter>
                    </defs>

                    {/* Outer ring */}
                    <circle cx="28" cy="28" r="27" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />

                    {/* B */}
                    <path
                        d="M10 18h7c2.5 0 4.5 2 4.5 4.5S19.5 27 17 27h7c2.8 0 5 2.2 5 5s-2.2 5-5 5H10V18z"
                        fill="none"
                        stroke="url(#goldGrad)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                    />
                    <line x1="10" y1="27" x2="17" y2="27" stroke="url(#goldGrad)" strokeWidth="1.8" />

                    {/* A */}
                    <path
                        d="M25.5 37L31 18l5.5 19M27.5 31h7"
                        fill="none"
                        stroke="url(#goldGrad)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                    />

                    {/* W */}
                    <path
                        d="M37 18l3 12 3-8 3 8 3-12"
                        fill="none"
                        stroke="url(#goldGrad)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                    />
                </svg>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
                <span
                    className="font-serif font-bold tracking-[0.25em] text-baw-black"
                    style={{ fontSize: size === 'sm' ? '1rem' : size === 'lg' ? '1.75rem' : '1.35rem' }}
                >
                    BAW
                </span>
                <span className="text-[10px] tracking-[0.3em] text-baw-muted uppercase mt-0.5">
                    Style That Speaks.
                </span>
            </div>
        </Link>
    );
}
