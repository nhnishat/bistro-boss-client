import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
	return (
		<Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
			<div>
				<img src="https://i.ibb.co/d0Ysbpx/01.jpg" />
			</div>
			<div>
				<img src="https://i.ibb.co/5BHgncx/02.jpg" />
			</div>
			<div>
				<img src="https://i.ibb.co/vBWJqp1/03.png" />
			</div>
			<div>
				<img src="https://i.ibb.co/pQCwF9q/04.jpg" />
			</div>
			<div>
				<img src="https://i.ibb.co/41vTBXb/05.png" />
			</div>
			<div>
				<img src="https://i.ibb.co/cJhv1R8/06.png" />
			</div>
		</Carousel>
	);
};

export default Banner;
