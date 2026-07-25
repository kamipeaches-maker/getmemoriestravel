import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../config/axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ bookingId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      // Create payment intent
      const intentResponse = await apiClient.post('/api/payments/create-intent', {
        bookingId,
        amount
      });

      const { clientSecret } = intentResponse.data;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        await apiClient.post('/api/payments/confirm', {
          bookingId,
          paymentIntentId: result.paymentIntent.id,
          amount
        });
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label>Card Details</label>
        <CardElement />
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary btn-large">
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export const Payment = ({ bookingId, amount, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm bookingId={bookingId} amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
};
