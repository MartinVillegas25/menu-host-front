/* eslint-disable no-unused-vars */
import './ClientMenu.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
	createCategory,
	createProduct,
	createSubCategory,
	deleteCategory,
	deleteSubCategory,
	getCategories,
	getSubCategories
} from '../../../redux/actions';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import ClientMenuConfig from './ClientMenuConfig';
import { useLocation } from 'react-router-dom';

export default function ClientMenu() {
	const dispatch = useDispatch();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	useEffect(() => {
		dispatch(getCategories());
	}, []);
	const categories = useSelector((state) => state.localCategories.categorias);

	const [newCategory, setNewCategory] = useState('');

	const handleChangeCategory = (e) => {
		setNewCategory(e.target.value);
	};
	// const handleCreateCateg = () => {
	// 	dispatch(createCategory({ nombre_categoria: newCategory }));
	// 	setNewCategory('');
	// 	setCategorySelected('');
	// 	window.location.reload(true);
	// };

	const handleCreateCateg = (e) => {
		e.preventDefault();
		swal({
			title: 'Nueva categoria',
			text: 'Desea crear esta categoria?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(createCategory({ nombre_categoria: newCategory }));
				setNewCategory('');
				setCategorySelected('');

				swal({
					text: `Se ha creado la categoria`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'No se ha creado la categoria', icon: 'info' });
			}
		});
	};

	const [categorySelected, setCategorySelected] = useState('');
	const handleselectCategory = (e) => {
		e.preventDefault();
		setCategorySelected(e.target.value);
	};

	const handleselectCategoryToSub = (e) => {
		e.preventDefault();
		setCategorySelected(e.target.value);
		dispatch(getSubCategories(e.target.value));
	};

	const handleselectCategoryToProd = (e) => {
		e.preventDefault();
		setCategorySelected(e.target.value);
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		dispatch(getSubCategories(e.target.value));
	};
	const [newSubCategory, setNewSubCategory] = useState('');
	const handleChangeSubCategory = (e) => {
		setNewSubCategory(e.target.value);
	};
	const subcategories = useSelector(
		(state) => state.localSubcategories.subcategorias
	);

	const handleCreateSubCategory = () => {
		dispatch(
			createSubCategory({
				subcategoria: newSubCategory,
				categoria: categorySelected
			})
		);
		setCategorySelected('');
		setNewCategory('');

		window.location.reload(true);
	};

	const [subCategorySelected, setSubCategorySelected] = useState('');
	const handleselectSubCategory = (e) => {
		e.preventDefault();
		setSubCategorySelected(e.target.value);
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const [input, setInput] = useState({
		nombre: '',
		categoria: '',
		subcategoria: '',
		precio: 0,
		img: null
	});

	const handleChangeImg = (e) => {
		setInput({ ...input, img: e.target.files[0] });
	};

	const handleChange = (e) => {
		setInput((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value
		}));
	};

	const handleCreateProdcut = (e) => {
		e.preventDefault();
		if (categorySelected === '') {
			alert('Debe seleccionar una categoria');
			return;
		} else if (subCategorySelected === '') {
			alert('Debe seleccionar una subcategoria');
			return;
		}
		if (input.nombre === '') {
			alert('Debe ingresar el nombre del producto');
			return;
		}
		swal({
			title: 'Nuevo producto',
			text: 'Desea crear este producto?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				const formData = new FormData();
				formData.append('nombre', input.nombre);
				formData.append('precio', input.precio);
				formData.append('img', input.img);
				formData.append('categoria', input.categoria);
				formData.append('subcategoria', input.subcategoria);
				dispatch(createProduct(formData));
				swal({
					text: `Se ha creado el producto`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'No se ha creado el producto', icon: 'info' });
			}
		});
	};

	const handleDeleteCategory = (e) => {
		e.preventDefault();
		swal({
			title: 'Eliminar',
			text: `Esta seguro que desea eliminar la categoria ${categorySelected} ? Se eliminaran todos los productos y subcategorias asociados`,
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(deleteCategory(categorySelected, userEmail));

				swal({
					text: `Se ha eliminado la categoria ${categorySelected}`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha eliminado la categoria', icon: 'info' });
			}
		});
	};

	const handleDeleteSubCategory = (e) => {
		e.preventDefault();
		swal({
			title: 'Eliminar',
			text: `Esta seguro que desea eliminar la subcategoria ${categorySelected} - ${subCategorySelected} ? Se eliminaran todos los productos asociados`,
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(
					deleteSubCategory(subCategorySelected, categorySelected, userEmail)
				);
				swal({
					text: `Se ha eliminado la subcategoria ${categorySelected} - ${subCategorySelected}`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha eliminado la subcategoria', icon: 'info' });
			}
		});
	};

	return (
		<main className="client-create-menu-container">
			<div className="create-menu-container">
				<h2 className="create-menu-tittle">Menu</h2>
				<div>
					<h4 className="h4-menu">Nueva Categoria</h4>
					<div className="create-menu-input">
						<label htmlFor="">Titulo de la categoria: </label>
						<div className="section-form">
							<input
								type="text"
								value={newCategory}
								onChange={handleChangeCategory}
							/>
							<button className="btn-agregar" onClick={handleCreateCateg}>
								<MdAddCircle className="create-menu-add-icon" />
							</button>
						</div>
					</div>

					<h4 className="h4-menu">Borrar Categoria</h4>
					<div className="create-menu-input create-menu-select">
						<div>
							<label htmlFor="">Categorias existentes: </label>
							<select name="" id="" onChange={handleselectCategory}>
								{' '}
								<option value="">-</option>
								{categories?.map((a, index) => (
									<option
										value={a.nombre_categoria}
										key={a.nombre_categoria + index}
									>
										{a.nombre_categoria}
									</option>
								))}
							</select>
						</div>
						<button
							className="create-menu-delete-btn"
							onClick={handleDeleteCategory}
						>
							<AiOutlineDelete className="create-menu-delete-icon" />
						</button>
					</div>
				</div>
				<h4 className="h4-menu">Nueva Subcategoria</h4>
				<div>
					<div className="create-menu-input">
						<label htmlFor="">Titulo de la categoria: </label>
						<select name="" id="" onChange={handleselectCategoryToSub}>
							<option value="">-</option>
							{categories?.map((a, index) => (
								<option
									value={a.nombre_categoria}
									key={a.nombre_categoria + index}
								>
									{' '}
									{a.nombre_categoria}
								</option>
							))}
						</select>{' '}
					</div>
					<label htmlFor="">Añadir sub categoria: </label>
					<div className="section-form">
						<input
							type="text"
							className="add-subC-input"
							value={newSubCategory}
							onChange={handleChangeSubCategory}
						/>
						<button className="btn-agregar" onClick={handleCreateSubCategory}>
							<span>
								<MdAddCircle className="create-menu-add-icon" />
							</span>
						</button>
					</div>

					<h4 className="h4-menu">Borrar Subcategoria</h4>

					<div className="create-menu-input create-menu-select">
						<div>
							<label htmlFor="">Subcategorias existentes: </label>
							<select name="" id="" onChange={handleselectSubCategory}>
								<option value="">-</option>
								{subcategories?.map((a) => (
									<option value={a.nombre_subcategoria} key={a}>
										{a.nombre_subcategoria}
									</option>
								))}
							</select>
						</div>
						<button
							className="create-menu-delete-btn"
							onClick={handleDeleteSubCategory}
						>
							<AiOutlineDelete className="create-menu-delete-icon" />
						</button>
					</div>
				</div>
				<h4 className="h4-menu">Agregar Producto</h4>
				<div>
					<div className="create-menu-input">
						<label htmlFor="">Categoria: </label>
						<select
							name="categoria"
							id=""
							value={input.categoria}
							onChange={handleselectCategoryToProd}
						>
							<option value="">-</option>
							{categories?.map((a, index) => (
								<option
									value={a.nombre_categoria}
									key={a.nombre_categoria + index}
								>
									{' '}
									{a.nombre_categoria}
								</option>
							))}
						</select>{' '}
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Sub Categoria: </label>
						<select
							name="subcategoria"
							id=""
							onChange={handleselectSubCategory}
							value={input.subcategoria}
						>
							<option value="">-</option>
							{subcategories?.map((a, index) => (
								<option
									value={a.nombre_subcategoria}
									key={a.nombre_subcategoria + index}
								>
									{a.nombre_subcategoria}
								</option>
							))}
						</select>{' '}
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Nombre:</label>
						<input
							type="text"
							name="nombre"
							value={input.nombre}
							onChange={handleChange}
						/>
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Precio: $</label>
						<input
							type="number"
							name="precio"
							value={input.precio}
							onChange={handleChange}
						/>
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Imagen:</label>
						<input
							type="file"
							id="newImg"
							accept="img/*"
							onChange={handleChangeImg}
						/>
					</div>
					<div className="btn-add-product">
						<button
							className="create-menu-add-product"
							onClick={handleCreateProdcut}
						>
							<span>Agregar</span>
						</button>
					</div>
				</div>
			</div>
			<div className="menu-mobile-admin">
				<ClientMenuConfig />
			</div>
		</main>
	);
}
