import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper';
import FoodCard from '../../../Shared/FoodCard/FoodCard';

const pagination = {
	clickable: true,
	renderBullet: function (index, className) {
		return '<span class="' + className + '">' + (index + 1) + '</span>';
	},
};

const OrderTab = ({ items }) => {
	const itemPerPage = 6;
	const numberPage = Math.ceil(items.length / itemPerPage);
	const slides = [...new Array(numberPage).keys()];
	return (
		<div>
			<Swiper
				pagination={pagination}
				modules={[Pagination]}
				className="mySwiper"
			>
				{slides.map((index) => (
					<div key={index}>
						<SwiperSlide>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
								{items
									.slice(index * itemPerPage, (index + 1) * itemPerPage)
									.map((item) => (
										<FoodCard key={item._id} item={item} />
									))}
							</div>
						</SwiperSlide>
					</div>
				))}
			</Swiper>
		</div>
	);
};

export default OrderTab;
