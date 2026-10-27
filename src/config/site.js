export const SITE_NAME = 'BAW Fashion';
export const SITE_TAGLINE = 'Your Style. Your BAW.';
export const CURRENCY = 'PKR';
export const BAW_FASHION_WHATSAPP_NUMBER = '923213548475';

export const getWhatsAppUrl = (message) => {
    if (!/^\d{8,15}$/.test(BAW_FASHION_WHATSAPP_NUMBER)) return null;
    return `https://wa.me/${BAW_FASHION_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const formatPrice = (price) =>
    typeof price === 'number' && Number.isFinite(price)
        ? `PKR ${price.toLocaleString('en-PK')}`
        : 'Price to be confirmed';
