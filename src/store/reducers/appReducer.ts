import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem type
type CartItem = {
    productId: number;
    quantity: number;
    price: number;
    bulkPrice?: boolean;
};

// Define the FavoriteItem type
type FavoriteItem = {
    productId: number;
};
type UpdateQuantityPayload = {
    productId: number;
    quantity: number;
    incremental?: boolean; // if true, add to existing quantity, if false replace
};

// Define the initial state type
export interface AppState {
    cart: CartItem[];
    favorites: FavoriteItem[];
}

// Get initial state from localStorage
const getInitialState = (): AppState => {
    if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        const savedFavorites = localStorage.getItem('favorites');
        return {
            cart: savedCart ? JSON.parse(savedCart) : [],
            favorites: savedFavorites ? JSON.parse(savedFavorites) : []
        };
    }
    return { cart: [], favorites: [] };
};

// Helper function to save cart to localStorage
const saveToLocalStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

// Set the initial state
const initialState: AppState = getInitialState();

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Set the entire cart
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cart = action.payload;
            saveToLocalStorage('cart', state.cart);
        },
        // Add or update item in cart
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.cart.findIndex(
                item => item.productId === action.payload.productId
            );

            if (existingItemIndex !== -1) {
                // Replace existing item with new item
                state.cart[existingItemIndex] = {
                    ...action.payload,
                    quantity: state.cart[existingItemIndex].quantity + action.payload.quantity
                };
            } else {
                // Add new item
                state.cart.push(action.payload);
            }

            saveToLocalStorage('cart', state.cart);
        },
        // Update quantity of an item
        updateCartItemQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
            const { productId, quantity, incremental = false } = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.productId === productId);

            if (existingItemIndex !== -1) {
                const newQuantity = incremental
                    ? state.cart[existingItemIndex].quantity + quantity
                    : quantity;

                state.cart[existingItemIndex] = {
                    ...state.cart[existingItemIndex],
                    quantity: newQuantity
                };

                // Remove item if quantity becomes 0 or negative
                if (state.cart[existingItemIndex].quantity <= 0) {
                    state.cart = state.cart.filter(item => item.productId !== productId);
                }
            }

            saveToLocalStorage('cart', state.cart);
        },
        // Replace an item entirely
        replaceCartItem: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.cart.findIndex(
                item => item.productId === action.payload.productId
            );

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex] = action.payload;
            } else {
                state.cart.push(action.payload);
            }

            saveToLocalStorage('cart', state.cart);
        },
        // Remove an item from the cart by productId
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.productId !== action.payload);
            saveToLocalStorage('cart', state.cart);
        },

        // Favorite actions
        setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
            state.favorites = action.payload;
            saveToLocalStorage('favorites', state.favorites);
        },
        addToFavorites: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            if (!state.favorites.some(item => item.productId === productId)) {
                state.favorites.push({ productId });
                saveToLocalStorage('favorites', state.favorites);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.favorites = state.favorites.filter(item => item.productId !== productId);
            saveToLocalStorage('favorites', state.favorites);
        }
    },
});

// Export the actions
export const {
    setCart,
    addToCart,
    updateCartItemQuantity,
    replaceCartItem,
    removeFromCart,
    setFavorites,
    addToFavorites,
    removeFromFavorites
} = appSlice.actions;

// Export the reducer
export default appSlice.reducer;
