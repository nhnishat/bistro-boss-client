import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const img_hosting = import.meta.env.VITE_TOKEN;
// console.log(img_hosting);
const AddItem = () => {
	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting}`;
	const [axiosSecure] = useAxiosSecure();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		const formData = new FormData();
		formData.append('image', data.image[0]);
		fetch(img_hosting_url, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((imgResponse) => {
				console.log(imgResponse);
				if (imgResponse) {
					const imgURL = imgResponse.data.display_url;
					const { name, price, category, recipe } = data;
					const newItem = {
						name,
						price: parseFloat(price),
						category,
						recipe,
						image: imgURL,
					};
					console.log(newItem);
					axiosSecure.post('/menu', newItem).then((data) => {
						console.log('after posting new menu items', data.data);
					});
				}
			});
	};

	return (
		<div className="w-full pl-10">
			<Helmet>
				<title>Add an Item</title>
			</Helmet>
			<SectionTitle heading="Add An Item" subHeading="what's New" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Recipe Name*</span>
					</label>
					<input
						type="text"
						placeholder="Recipe name"
						className="input input-bordered w-full"
						{...register('name', { required: true, maxLength: 120 })}
					/>
					{errors.name && (
						<span className="text-red-500">Recipe name is required.</span>
					)}
				</div>
				<div className="flex gap-4 my-4">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Category*</span>
						</label>
						<select
							{...register('category', { required: true })}
							className="select select-bordered w-full"
						>
							<option value="">Select a category</option>
							<option value="Salad">Salad</option>
							<option value="Pizza">Pizza</option>
							<option value="Soup">Soup</option>
							<option value="Dessert">Dessert</option>
							<option value="Drinks">Drinks</option>
						</select>
						{errors.category && (
							<span className="text-red-500">Category is required.</span>
						)}
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Price*</span>
						</label>
						<input
							type="text"
							placeholder="Price"
							className="input input-bordered w-full"
							{...register('price', { required: true })}
						/>
						{errors.price && (
							<span className="text-red-500">Price is required.</span>
						)}
					</div>
				</div>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text">Recipe Details*</span>
					</label>
					<textarea
						{...register('recipe', { required: true })}
						className="textarea textarea-bordered h-24"
						placeholder="Recipe Details"
					></textarea>
					{errors.recipe && (
						<span className="text-red-500">Recipe details are required.</span>
					)}
				</div>
				<div className="form-control w-full my-4">
					<label className="label">
						<span className="label-text">Pick an Image*</span>
					</label>
					<input
						type="file"
						className="file-input file-input-bordered w-full"
						{...register('image', { required: true })}
					/>
					{errors.image && (
						<span className="text-red-500">Image is required.</span>
					)}
				</div>
				<input type="submit" value="Add an Item" className="btn btn-primary" />
			</form>
		</div>
	);
};

export default AddItem;
