import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import './Checkout.css';
const CheckoutForm = ({ price, cart }) => {
	const { user } = useAuth();
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState('');
	const [axiosSecure] = useAxiosSecure();
	const [clientSecret, setClientSecret] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionID, setTransactionID] = useState('');

	useEffect(() => {
		const fetchClientSecret = async () => {
			if (price <= 0) {
				console.log('Invalid price value:', price);
				return;
			}
			const response = await axiosSecure.post('/create-payment-intent', {
				price,
			});
			setClientSecret(response.data.clientSecret);
		};
		fetchClientSecret();
	}, [price, axiosSecure]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (!card) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: card,
		});

		if (error) {
			setCardError(error.message);
			console.log(error);
			return;
		} else {
			setCardError('');
			console.log(paymentMethod);
		}
		setProcessing(true);

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: user.displayName || 'anonymous',
						email: user.email || 'anonymous',
					},
				},
			});

		if (confirmError) {
			console.log(confirmError);
		}
		setProcessing(false);
		if (paymentIntent.status === 'succeeded') {
			setTransactionID(paymentIntent.id);
			// save payment information

			const payment = {
				email: user?.email,
				transactionID: paymentIntent.id,
				price,
				date: new Date(),
				quantity: cart?.length,

				cartItems: cart.map((item) => item._id),
				menuItems: cart.map((item) => item.menuItemId),
				orderStatus: 'service pending',
				itemNames: cart.map((item) => item?.name),
			};
			axiosSecure.post('/payments', payment).then((res) => {
				console.log(res.data);
				if (res.data.insertedId) {
					console.log(res.data.insertedId);
				}
			});
		}
	};

	return (
		<div className="w-2/3 m-auto">
			<form className="w-2/3 m-auto" onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<button
					type="submit"
					className="mt-5 btn btn-outline btn-primary"
					disabled={!stripe || !clientSecret || processing}
				>
					Pay
				</button>
			</form>
			{cardError && <p className="text-orange-500">{cardError}</p>}
			{transactionID && (
				<p className="text-green-500">
					Transaction complete with transactionID : {transactionID}
				</p>
			)}
		</div>
	);
};

export default CheckoutForm;
