import FeaturedImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../Components/SectionTitle';
import './Featured.css';
const Featured = () => {
	return (
		<div className="featured-item bg-fixed text-white pt-8 my-20">
			<SectionTitle
				subheading="check it Out"
				heading="Featured Item"
			></SectionTitle>
			<div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36">
				<div>
					<img src={FeaturedImg} alt="" />
				</div>
				<div className="md:ml-10">
					<p>Aug 20,2029</p>
					<p className="uppercase my-3">Where can i get some?</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto autem
						minima dicta? Ex delectus nostrum dolore? Sunt qui adipisci maiores
						voluptates facilis consectetur sit a quos aliquam placeat illo non
						sint minus at sequi ad tenetur, consequatur iure blanditiis soluta
						recusandae aperiam, voluptatibus odio saepe? Aperiam optio
						distinctio quia laudantium?
					</p>
					<button className="btn btn-outline border-0 border-b-4 my-3">
						{' '}
						order now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Featured;
