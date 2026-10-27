import { createContext, useContext, useReducer, useEffect } from 'react';
import { getCartItemUnitPrice, getPackSizes, getRetailPrice, isWholesaleProduct, products } from '../data/products';

const CartContext = createContext(null);

const initialState = {
    items: [],
    isOpen: false,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, selectedSize, selectedColor, selectedPackSize, quantity = 1 } = action.payload;
            const currentProduct = products.find((item) => String(item.id) === String(product?.id));
            const wholesale = isWholesaleProduct(currentProduct);
            const itemPrice = wholesale
                ? currentProduct?.packPrices?.[Number(selectedPackSize)]
                : getRetailPrice(currentProduct);
            if (
                !currentProduct ||
                currentProduct.isDemo === true ||
                currentProduct.isVisible === false ||
                typeof itemPrice !== 'number' ||
                !Number.isFinite(itemPrice) ||
                currentProduct.inStock !== true ||
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                (wholesale && !getPackSizes(currentProduct).includes(Number(selectedPackSize)))
            ) return state;

            const packSize = wholesale ? Number(selectedPackSize) : null;
            const key = `${currentProduct.id}-${selectedSize ?? ''}-${selectedColor ?? ''}-${packSize ?? ''}`;
            const existing = state.items.find((i) => i.key === key);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.key === key ? { ...i, quantity: i.quantity + quantity } : i
                    ),
                    isOpen: true,
                };
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    { key, product: currentProduct, selectedSize, selectedColor, selectedPackSize: packSize, quantity },
                ],
                isOpen: true,
            };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((i) => i.key !== action.payload) };
        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items.map((i) =>
                    i.key === action.payload.key ? { ...i, quantity: action.payload.quantity } : i
                ),
            };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'OPEN_CART':
            return { ...state, isOpen: true };
        case 'CLOSE_CART':
            return { ...state, isOpen: false };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
        try {
            const saved = localStorage.getItem('baw-cart');
            const savedItems = saved ? JSON.parse(saved) : [];
            const items = Array.isArray(savedItems)
                ? savedItems.filter((item) => {
                    const product = products.find((entry) => String(entry.id) === String(item.product?.id));
                    const wholesale = isWholesaleProduct(product);
                    const itemPrice = wholesale
                        ? product?.packPrices?.[Number(item.selectedPackSize)]
                        : getRetailPrice(product);
                    return product &&
                        product.isDemo !== true &&
                        product.isVisible !== false &&
                        typeof itemPrice === 'number' &&
                        Number.isFinite(itemPrice) &&
                        product.inStock === true &&
                        Number.isInteger(item.quantity) &&
                        item.quantity > 0 && (
                        !isWholesaleProduct(product) ||
                        getPackSizes(product).includes(Number(item.selectedPackSize))
                    );
                }).map((item) => ({
                    ...item,
                    product: products.find((product) => String(product.id) === String(item.product.id)),
                }))
                : [];
            return { ...init, items };
        } catch {
            return init;
        }
    });

    useEffect(() => {
        localStorage.setItem('baw-cart', JSON.stringify(state.items));
    }, [state.items]);

    const totalItems = state.items.reduce((acc, i) => acc + i.quantity * (i.selectedPackSize ?? 1), 0);
    const subtotal = state.items.reduce(
        (acc, i) => acc + getCartItemUnitPrice(i) * i.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ state, dispatch, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
