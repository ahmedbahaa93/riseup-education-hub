import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

export interface CheckoutSessionData {
  items: Array<{
    courseId: string;
    courseName: string;
    price: number;
    quantity: number;
  }>;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}

export const createCheckoutSession = async (data: CheckoutSessionData): Promise<string> => {
  try {
    // In a real implementation, this would call your backend API
    // which would create a Stripe checkout session
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};

export const redirectToCheckout = async (sessionId: string): Promise<void> => {
  const stripe = await getStripe();
  
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    console.error('Error redirecting to checkout:', error);
    throw new Error('Failed to redirect to checkout');
  }
};

export const processPayment = async (checkoutData: CheckoutSessionData): Promise<void> => {
  try {
    const sessionId = await createCheckoutSession(checkoutData);
    await redirectToCheckout(sessionId);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};