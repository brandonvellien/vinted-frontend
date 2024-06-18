import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
          {
            title,
            amount: price * 100, // Stripe fonctionne en centimes
            paymentMethodId: paymentMethod.id,
          }
        );
        console.log("Payment successful", response.data);
      } catch (error) {
        console.error("Payment error", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
