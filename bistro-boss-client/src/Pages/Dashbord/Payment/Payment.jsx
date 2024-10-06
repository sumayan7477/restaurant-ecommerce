import { loadStripe } from "@stripe/stripe-js";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js full codefrom

// todo: add publishable key
const stripePromice = loadStripe(import.meta.env.VITE_Payment_getway_PK);
const Payment = () => {
    return (
        <div>
            <SectionTItle heading={'payment'} subHeading={'Please pay'}></SectionTItle>
            <div>
                <Elements stripe={stripePromice}>
                    <CheckOutForm></CheckOutForm>
                </Elements>

            </div>
        </div>
    );
};

export default Payment;


