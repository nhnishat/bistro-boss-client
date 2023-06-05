import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import SectionTitle from '../../../Components/SectionTitle';

const TestiMonials = () => {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch('http://localhost:5000/reviews')
			.then((res) => res.json())
			.then((data) => {
				setReviews(data);
			});
	}, []);
	// console.log(reviews);
	return (
		<section className="my-20">
			<SectionTitle
				subheading="What our client say"
				heading="Testimonials"
			></SectionTitle>
			<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
				{reviews.map((review) => (
					<SwiperSlide key={review._id}>
						<div className="flex flex-col items-center my-16 mx-24">
							<Rating
								style={{ maxWidth: 180 }}
								value={review.rating}
								readOnly
							/>
							<p className="my-8">{review.details}</p>
							<h3 className="text-2xl text-yellow-500">{review.name}</h3>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default TestiMonials;
