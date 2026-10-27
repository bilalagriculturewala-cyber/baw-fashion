export const categories = [
  {
    slug: 'bags',
    name: 'Bags',
    sellingType: 'retail',
    bagTypes: [
      { slug: 'handbags', name: 'Handbags' },
      { slug: 'totes', name: 'Totes' },
      { slug: 'shoulder-bags', name: 'Shoulder bags' },
      { slug: 'crossbody-bags', name: 'Crossbody bags' },
      { slug: 'laptop-bags', name: 'Laptop bags' },
      { slug: 'purses-wallets', name: 'Purses & Wallets' },
    ],
    description:
      'Browse bags intended for individual retail. Found a style you love elsewhere? Send us its reference photo and we will review whether we can arrange something similar.',
  },
  {
    slug: 'clothing-men',
    name: "Men's Six-Pocket Trousers",
    sellingType: 'retail',
    description: 'Sold individually.',
  },
  {
    slug: 'kids-wholesale',
    name: "Kids' Paint-Shirt Sets",
    sellingType: 'wholesale',
    description:
      'Wholesale only for shopkeepers and wholesale buyers. Available in packs of 6 or 12 pieces.',
    packSizes: [6, 12],
  },
];

// Demo entries are visual references only; remove isDemo only after confirming catalogue details.
const catalogue = [
  {
    id: 'demo-handbag',
    name: 'Handbag · Demo image',
    category: 'bags',
    bagType: 'handbags',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85&auto=format&fit=crop'],
    isDemo: true,
  },
  {
    id: 'demo-purse',
    name: 'Purse · Demo image',
    category: 'bags',
    bagType: 'purses-wallets',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85&auto=format&fit=crop'],
    isDemo: true,
  },
  {
    id: 'demo-tote',
    name: 'Tote bag · Demo image',
    category: 'bags',
    bagType: 'totes',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=85&auto=format&fit=crop'],
    isDemo: true,
  },
  {
    id: 'demo-shoulder-bag',
    name: 'Shoulder bag · Demo image',
    category: 'bags',
    bagType: 'shoulder-bags',
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=900&q=85&auto=format&fit=crop'],
    isDemo: true,
  },
  {
    id: 'demo-laptop-bag',
    name: 'Laptop bag · Demo image',
    category: 'bags',
    bagType: 'laptop-bags',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85&auto=format&fit=crop'],
    isDemo: true,
  },
  {
    id: 'demo-cargo-trousers',
    name: "Men's six-pocket cargo trousers · Demo image",
    category: 'clothing-men',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&q=85&auto=format&fit=crop'],
    isDemo: true,
  },
  {
    id: 'demo-kids-clothing-set',
    name: "Kids' clothing set · Demo image",
    category: 'kids-wholesale',
    images: ['/assets/products/kids-wholesale/kids-wholesale-09.jpg'],
    isDemo: true,
  },
];

export const products = catalogue.filter((product) => product.isVisible !== false);
export const bagPriceBands = [
  { value: 'all', label: 'All prices', matches: () => true },
  { value: 'under-1500', label: 'Under PKR 1,500', matches: (price) => price < 1500 },
  { value: '1500-2000', label: 'PKR 1,500–2,000', matches: (price) => price >= 1500 && price <= 2000 },
  { value: '2001-3000', label: 'PKR 2,001–3,000', matches: (price) => price > 2000 && price <= 3000 },
  { value: '3001-4000', label: 'PKR 3,001–4,000', matches: (price) => price > 3000 && price <= 4000 },
  { value: '4001-5000', label: 'PKR 4,001–5,000', matches: (price) => price > 4000 && price <= 5000 },
  { value: 'over-5000', label: 'Over PKR 5,000', matches: (price) => price > 5000 },
];
export const newArrivals = products.filter((product) => product.isNew === true);
export const saleProducts = products.filter(isProductOnSale);

export function getProductById(id) {
  return products.find((product) => product.isVisible !== false && String(product.id) === String(id));
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  if (!getCategoryBySlug(categorySlug)) return [];
  return products.filter((product) => product.isVisible !== false && product.category === categorySlug);
}

export function getProductsWithPrice() {
  return products.filter((product) => {
    if (product.isVisible === false || product.isDemo === true) return false;
    if (isWholesaleProduct(product)) {
      return getPackSizes(product).some((size) => isValidPrice(product.packPrices?.[size]));
    }
    return isValidPrice(product.price);
  });
}

export function isValidPrice(price) {
  return typeof price === 'number' && Number.isFinite(price) && price >= 0;
}

export function isProductOnSale(product) {
  return product?.isDemo !== true &&
    product?.isOnSale === true &&
    getCategoryBySlug(product.category)?.sellingType === 'retail' &&
    isValidPrice(product.price) &&
    isValidPrice(product.salePrice) &&
    product.salePrice < product.price;
}

export function isWholesaleProduct(product) {
  return getCategoryBySlug(product?.category)?.sellingType === 'wholesale';
}

export function getPackSizes(product) {
  const configuredSizes = product?.packSizes ?? getCategoryBySlug(product?.category)?.packSizes ?? [];
  return configuredSizes.filter((size) => [6, 12].includes(Number(size))).map(Number);
}

export function getRetailPrice(product) {
  if (product?.isDemo === true) return undefined;
  if (isProductOnSale(product)) return product.salePrice;
  return isValidPrice(product?.price) ? product.price : undefined;
}

export function getStartingPrice(product) {
  if (product?.isDemo === true) return undefined;
  if (isWholesaleProduct(product)) {
    const prices = getPackSizes(product)
      .map((size) => product.packPrices?.[size])
      .filter(isValidPrice);
    return prices.length ? Math.min(...prices) : undefined;
  }
  return getRetailPrice(product);
}

export function getCartItemUnitPrice(item) {
  if (isWholesaleProduct(item.product)) {
    return item.product.packPrices?.[item.selectedPackSize];
  }
  return getRetailPrice(item.product);
}
