import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useCart from '../../../hooks/useCart';
import CheckOutForm from './CheckOutForm';
// provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_pk);
const Payment = () => {
	const [cart] = useCart();
	const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
	const price = parseFloat(totalPrice).toFixed(2);
	return (
		<div className="w-full">
			<SectionTitle subHeading="Please Process" heading="Payment" />
			<Elements stripe={stripePromise}>
				<CheckOutForm price={price} cart={cart} />
			</Elements>
		</div>
	);
};

export default Payment;
