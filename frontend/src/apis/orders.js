import API_URL from "../utils/apiConfig";

export const getCheckoutSession = async (cartId, token) => {
    try {
        const response = await fetch(`${API_URL}/orders/checkout-session/${cartId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Failed to create checkout session");
        }

        return data.session;
    } catch (error) {
        console.error("Checkout error:", error);
        throw error;
    }
};
