import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js full codefrom

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSequre = useAxios();
  const [cart, refetch] = useCart();
  const { user } = UseAuth();
  const [tranjuscrionId, setTranjuscrionId] = useState("");
  const TotalPrice = cart.reduce((total, item) => total + item.price, 0);
  // const navigate = useNavigate();

  //   https://docs.stripe.com/api/payment_intents/object code from
  useEffect(() => {
    if (TotalPrice > 0) {
      axiosSequre
        .post("/create-payment-intent", { price: TotalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSequre, TotalPrice]);
  // end

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // https://docs.stripe.com/js/payment_intents/confirm_card_payment

    const { paymentIntent, error: ConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (ConfirmError) {
      console.log("ConfirmError", ConfirmError);
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("tranjuscrion id ", paymentIntent.id);
        setTranjuscrionId(paymentIntent.id);
        // save the payment ro the database
        const payment = {
          email: user.email,
          price: TotalPrice,
          tranjuscrionId: paymentIntent.id,
          date: new Date(), //  moment js to convirt date
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };
        const res = await axiosSequre.post("/paymets", payment);
        console.log("payment saved", res.data);
        refetch();
        if(res.data?.paymentResult?.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title: ` Payment Done`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // navigate('/dashbord/paymentHisory')
       

      }
    }
    // https://docs.stripe.com/js/payment_intents/confirm_card_payment end
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",

              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn-sm btn btn-outline my-5"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600 text-center">{error}</p>
      {tranjuscrionId && (
        <p className="text-green-500 text-center">
          Your Tranjuctio id : {tranjuscrionId}
        </p>
      )}
    </form>
  );
};

export default CheckOutForm;
