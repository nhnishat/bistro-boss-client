const SectionTitle = ({ heading, subHeading }) => {
	return (
		<div className="my-8 md:w-2/3 text-center mx-auto">
			<p className="text-yellow-500 mb-3">--- {subHeading} ---</p>
			<h3 className="text-3xl uppercase border-y-4 py-4 ">{heading}</h3>
		</div>
	);
};

export default SectionTitle;
