import '@smastrom/react-rating/style.css';
import { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import { Rating } from '@smastrom/react-rating';

const Testimonials = () => {
	const [isRatting, setIsRatting] = useState([]);

	useEffect(() => {
		fetch('https://bistro-boss-server-three-steel.vercel.app/reviews')
			.then((res) => res.json())
			.then((data) => {
				setIsRatting(data);
			});
	}, []);

	return (
		<section>
			<SectionTitle subHeading="What Our Clients Say" heading="TESTIMONIALS" />

			<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
				{isRatting.map((rate) => (
					<SwiperSlide key={rate._id}>
						<div className="flex flex-col items-center mx-24 my-16 text-center space-y-4">
							<Rating
								style={{ maxWidth: '180px' }}
								value={rate.rating}
								readOnly
							/>
							<FaQuoteLeft className="text-6xl" />
							<p className="py-8">{rate.details}</p>
							<h3 className="text-2xl text-orange-400">{rate.name}</h3>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Testimonials;
