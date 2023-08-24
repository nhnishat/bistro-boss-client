const Bistro = () => {
	return (
		<div
			className="hero h-[700px]"
			style={{
				backgroundImage: 'url(https://i.ibb.co/TkN8Jh0/chef-service.jpg)',
			}}
		>
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center bg-white w-2/3 text-black">
				<div className="p-4" style={{ maxWidth: '48rem' }}>
					<h1 className="mb-5 text-5xl font-bold">Bistro Boss</h1>
					<p className="mb-5">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Necessitatibus, libero accusamus laborum deserunt ratione dolor
						officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
						nihil iusto ducimus incidunt quibusdam nemo.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Bistro;
