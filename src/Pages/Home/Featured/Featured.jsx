import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import './Featured.css';
const Featured = () => {
	return (
		<div className="featured-itme bg-fixed">
			<section className="text-white bg-slate-700 bg-opacity-40 pt-8 my-20">
				<SectionTitle subHeading="Check it Out" heading="Featured Item" />
				<div className="flex justify-center items-center pb-20 pt-12 px-36 gap-5">
					<div>
						<img src="https://i.ibb.co/C7YmXCB/featured.jpg" alt="" />
					</div>
					<div className="space-y-4">
						<p>Aug 20, 2029</p>
						<p className="uppercase">Where can i get some</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Accusamus maiores quisquam nemo magnam temporibus nulla minus quam
							doloribus, atque voluptas enim alias magni labore quia facilis,
							velit maxime dicta expedita necessitatibus ipsam non. Sunt harum,
							eveniet quod molestias, doloribus animi earum eius rem, porro
							fugit dolorum veritatis fuga consectetur officiis.
						</p>
						<button className="btn btn-outline border-0 border-b-2 text-white">
							Order Now
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Featured;
