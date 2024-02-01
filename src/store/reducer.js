export const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1) {
                const existingItem = state.items[existingCartItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };

                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems.push({ ...action.payload, quantity: 1 });
            }

            return {
                ...state,
                items: updatedItems,
            };
        }

        case "REMOVE_ITEM": {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );
            const existingItem = state.items[existingCartItemIndex];
            const updatedItems = [...state.items];

            if (existingItem.quantity === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems,
            };
        }

        case "CLEAR_CART": {
            return {
                ...state,
                items: [],
            };
        }

        default:
            return state;
    }
};

export default cartReducer;