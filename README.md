# BAW Fashion storefront

BAW Fashion is a React + Vite storefront for bags, men's six-pocket trousers, and kids' paint-shirt sets. The visible catalogue currently contains demo image references only; these are not confirmed BAW products and are not available to purchase. No prices, stock, or product specifications are assigned to them.

## Development

```sh
npm.cmd install
npm.cmd run dev
```

Create a production build with:

```sh
npm.cmd run build
```

## Deploy to Vercel

Import this project in Vercel and keep the detected Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` rewrite sends client-side routes to the React app, so pages such as `/category/bags` and `/product/demo-handbag` continue to work when opened directly. Vite uses root-relative asset paths for deployment at the domain root.

## Product catalogue

Add verified products to the `catalogue` array in `src/data/products.js`. Use confirmed names, unique IDs, category slugs, descriptions, images, prices, availability, and variants only. Set `isVisible: false` to keep a configured product out of the public catalogue. Supported category slugs are `bags`, `clothing-men`, and `kids-wholesale`.

- Bags and men's six-pocket trousers are individual retail products. A retail product must have a confirmed numeric `price` and `inStock: true` to be purchasable.
- Use a bag `bagType` slug from the `bagTypes` list under the Bags category: `handbags`, `totes`, `shoulder-bags`, `crossbody-bags`, `laptop-bags`, or `purses-wallets`.
- Kids' paint-shirt sets are wholesale only. Set `packSizes` to the confirmed supported sizes (6 and/or 12) and configure each confirmed pack price in `packPrices`, keyed by pack size. A product is purchasable only when it is in stock and the selected pack has a numeric price. Single-piece retail ordering is not supported.
- Mark a confirmed new arrival with `isNew: true`. A sale is displayed only when `isOnSale: true`, `price` and `salePrice` are numeric, and `salePrice` is lower than `price`. Cart totals use the valid sale price.
- Bag price bands are defined alongside the catalogue in `src/data/products.js`. They filter using actual configured product prices; the displayed ranges do not assert that items are available in every bracket.

The catalogue currently shows one image reference per requested product type. Bag and trouser demo images are served individually from Unsplash under its free-to-use license. The kids' demo image uses a supplied local asset. Replace these references with confirmed BAW product photos and remove the `isDemo` flag only when real catalogue details have been confirmed. Demo items remain excluded from purchasing, even if other fields are later added accidentally.

## Business configuration and current limitations

- The official WhatsApp number is configured in international format as `923213548475` in `src/config/site.js`. WhatsApp links use the shared `getWhatsAppUrl` helper. Customers must manually attach bag reference photos in WhatsApp.
- Checkout can prepare a customer-reviewed WhatsApp enquiry with the cart summary and delivery details. The customer must choose to open WhatsApp and send the message. This does not confirm an order or payment.
- This project has no database, server/API, authentication, secure admin panel, order persistence, or payment verification. Customer data and orders are not submitted to or stored by the website.
- Banking instructions and delivery charges have not been supplied. The site asks customers to confirm them and does not claim payment completion or free delivery.
- There is no admin panel. Product catalogue, price bands, and business configuration require source changes until a backend with authenticated administrative access is connected.
- No email address, business location, support hours, delivery terms, or returns terms have been supplied.

Before accepting website orders, connect and test a backend for secure customer/order persistence, authenticated administration, payment-status review, and any required secure evidence upload. Configure confirmed banking and delivery information only after it is supplied.
