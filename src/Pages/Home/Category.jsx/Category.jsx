import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
const Category = () => {
	return (
		<section>
			<SectionTitle
				subHeading={'From 11:00am to 10:00pm'}
				heading={'ORDER ONLINE'}
			/>
			<Swiper
				slidesPerView={4}
				spaceBetween={30}
				centeredSlides={true}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper my-16"
			>
				<SwiperSlide>
					<img src="https://i.ibb.co/Sw8MTsg/slide1.jpg" alt="" />
					<h3 className="text-center uppercase text-3xl font-bold -mt-20  text-white">
						Salads
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src="https://i.ibb.co/fvqSmyQ/slide2.jpg" alt="" />
					<h3 className="text-center uppercase text-3xl font-bold -mt-20  text-white">
						Pizzas
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src="https://i.ibb.co/Fn44PsF/slide3.jpg" alt="" />
					<h3 className="text-center uppercase text-3xl font-bold -mt-20  text-white">
						Soup
					</h3>
				</SwiperSlide>
				<SwiperSlide>
					<img src="https://i.ibb.co/RNKjcw9/slide4.jpg" alt="" />
					<h3 className="text-center uppercase text-3xl font-bold -mt-20  text-white">
						desserts
					</h3>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Category;
