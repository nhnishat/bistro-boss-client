import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const img_hosting_Token = import.meta.env.VITE_image_Upload_token;

const UpdateItem = () => {
	const [axiosSecure] = useAxiosSecure();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_Token}`;

	const { id } = useParams();

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append('image', data.image[0]);
		fetch(img_hosting_url, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((imgResponse) => {
				if (imgResponse.success) {
					const imgURL = imgResponse.data.display_url;
					const { name, price, recipe, category } = data;
					const newItem = {
						name,
						price: parseFloat(price),
						recipe,
						category,
						image: imgURL,
					};
					console.log(newItem);
					axiosSecure.patch(`/menu/${id}`, newItem).then((data) => {
						console.log('after posting new menu item', data);
						if (data.data.modifiedCount > 0) {
							reset();
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								title: 'Menu item added succesfully',
								showConfirmButton: false,
								timer: 1500,
							});
						}
					});
				}
			});
	};

	console.log(errors);

	return (
		<div className="w-full px-4">
			<Helmet>
				<title>Bistro Boss || Item Update</title>
			</Helmet>
			<div>
				<SectionTitle
					subHeading={"---What's new?---"}
					heading={'Update AN ITEM'}
				></SectionTitle>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control w-full ">
					<label className="label">
						<span className="label-text font-semibold">Recipe name *</span>
					</label>
					<input
						type="text"
						placeholder="Recipe Name"
						{...register('name', { required: true, maxLength: 80 })}
						className="input input-bordered w-full "
					/>
				</div>
				<div className="flex my-4">
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text font-semibold">Category*</span>
						</label>
						<select
							{...register('category', { required: true })}
							className="select select-bordered"
						>
							<option disabled selected>
								Category
							</option>
							<option>PIZZA</option>
							<option>SOUP Potter</option>
							<option>SALAD</option>
							<option>DRINKS</option>
							<option>DESSERT</option>
						</select>
					</div>
					<div className="form-control w-full ml-4">
						<label className="label">
							<span className="label-text font-semibold">Price *</span>
						</label>
						<input
							type="number"
							placeholder="Type here"
							{...register('price', { required: true })}
							className="input input-bordered w-full "
						/>
					</div>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text font-semibold">Recipe Details*</span>
					</label>
					<textarea
						className="textarea textarea-bordered h-24"
						{...register('recipe', { required: true })}
						placeholder="Recipe Details"
					></textarea>
				</div>
				<div className="form-control w-full my-4">
					<label className="label">
						<span className="label-text">Pick an Image*</span>
					</label>
					<input
						type="file"
						className="file-input file-input-bordered w-full"
						{...register('image', { required: false })}
					/>
					{errors.image && (
						<span className="text-red-500">Image is required.</span>
					)}
				</div>

				<button className="btn btn-warning mt-4">Update Item</button>
			</form>
		</div>
	);
};

export default UpdateItem;
