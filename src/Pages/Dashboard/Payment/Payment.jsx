import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useCart from '../../../hooks/useCart';
import CheckoutForm from './CheckoutForm';
// TODO PubLishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAYE_PK);
const Payment = () => {
	const [cart] = useCart();
	const total = cart.reduce((sum, item) => item.price + sum, 0);
	const price = parseFloat(total.toFixed(2));

	return (
		<div>
			<SectionTitle
				heading="Payment"
				subHeading="Please Process"
			></SectionTitle>
			<h2>Taka...</h2>
			<Elements stripe={stripePromise}>
				<CheckoutForm price={price} cart={cart} />
			</Elements>
		</div>
	);
};

export default Payment;
