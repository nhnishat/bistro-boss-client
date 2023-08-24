import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CheckOutForm = ({ price, cart }) => {
	const stripe = useStripe();
	const { user } = useAuth();
	const elements = useElements();
	const [axiosSecure] = useAxiosSecure();
	const [cardError, setCardError] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [transactionId, setTransactionId] = useState('');
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		if (price > 0) {
			axiosSecure.post('/create-payment-intent', { price }).then((res) => {
				console.log(res.data.clientSecret);
				setClientSecret(res.data.clientSecret);
			});
		}
	}, [price, axiosSecure]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card == null) {
			return;
		}
		console.log(card);
		const { error } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});
		if (error) {
			console.log('error', error);
			setCardError(error.message);
		} else {
			setCardError('');
		}
		setProcessing(true);
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || 'unknown',
						name: user?.displayName || 'anonymous',
					},
				},
			});
		if (confirmError) {
			console.log(confirmError);
		}
		setProcessing(false);
		if (paymentIntent.status === 'succeeded') {
			setTransactionId(paymentIntent.id);
			const payment = {
				email: user?.email,
				transactionId: paymentIntent.id,
				price,
				date: new Date(),
				quantity: cart.length,
				cartItems: cart.map((item) => item._id),
				menuItems: cart.map((item) => item.menuItemId),
				status: 'service pending',
				itemNames: cart.map((item) => item.name),
			};
			axiosSecure.post('/payment', payment).then((res) => {
				console.log(res.data);
				if (res.data.insertResult.insertedId) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Payment Success',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
		}
	};
	return (
		<div className="max-w-md mx-auto bg-stone-300 rounded-md shadow-lg p-6 mt-8">
			<form onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="card-element" className="label">
						Card Information
					</label>
					<CardElement
						id="card-element"
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
				</div>
				<button
					className="btn btn-primary mt-4"
					type="submit"
					disabled={!stripe || !clientSecret || processing}
				>
					Pay
				</button>
			</form>
			{cardError && <p className="text-red-600 mt-4">{cardError}</p>}
			{transactionId && (
				<p className="text-green-500 mt-4">
					Transaction complete with transactionId: {transactionId}
				</p>
			)}
		</div>
	);
};

export default CheckOutForm;
// || processing
