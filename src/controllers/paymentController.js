import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { bookingId: bookingId.toString() }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { bookingId, paymentIntentId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const payment = new Payment({
        booking: bookingId,
        customer: req.user.id,
        amount,
        paymentMethod: 'stripe',
        transactionId: paymentIntentId,
        stripePaymentIntentId: paymentIntentId,
        status: 'completed'
      });

      await payment.save();

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { paymentStatus: 'paid' },
        { new: true }
      );

      res.json({
        message: 'Payment confirmed',
        payment,
        booking
      });
    } else {
      res.status(400).json({ error: 'Payment not confirmed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPaymentIntent, confirmPayment };
