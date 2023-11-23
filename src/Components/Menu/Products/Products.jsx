import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToMinicart,
	getMenuCategories,
	getProducts
} from '../../../redux/actions';
import './Products.css';
import queryString from 'query-string';
import { BsCheckCircle } from 'react-icons/bs';

export default function Products() {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);

	useEffect(() => {
		const url = window.location.href;
		const parsed = queryString.parseUrl(url);
		const email = parsed.query.email;
		dispatch(getMenuCategories(email));
		dispatch(getProducts(email));
	}, []);

	const categories = useSelector((state) => state.menuCategories.categorias);
	const products = useSelector((state) => state.localProducts);
	// Funcion para mostrar solo los productos correspondientes a la categoria seleccionada
	const handleCategorySelection = (categoryName) => {
		setSelectedCategory(categoryName);
	};
	// Funcion para mostrar todas las categorias
	const handleShowAll = () => {
		setSelectedCategory(null);
	};

	const handleAddToMinicart = (e) => {
		const producto = JSON.parse(e.target.value); // Convierte la cadena JSON en un objeto
		dispatch(addToMinicart(producto));
		setShowConfirmation(true);
		setTimeout(() => {
			setShowConfirmation(false);
		}, 1000);
	};

	return (
		<main className="products-container">
			<div className="menu-mobile-admin-categories">
				<button
					className={`menu-mobile-admin-btn ${
						selectedCategory === null ? 'selected-category' : ''
					}`}
					onClick={handleShowAll}
				>
					Todas
				</button>
				{categories?.map((c, index) => (
					<button
						className={`menu-mobile-admin-btn ${
							selectedCategory === c.nombre_categoria ? 'selected-category' : ''
						}`}
						key={c.nombre_categoria + index}
						onClick={() => handleCategorySelection(c.nombre_categoria)}
					>
						{c.nombre_categoria}
					</button>
				))}
			</div>
			{showConfirmation && (
				<div className="confirmation-symbol">
					<BsCheckCircle />
				</div>
			)}

			<div>
				{products.map((categoria, index) => (
					<div key={categoria.categoria + index}>
						{selectedCategory === null ||
						selectedCategory === categoria.categoria ? (
							<>
								<h2 className="category-title">{categoria.categoria}</h2>
								{categoria.subcategorias.map((subcategoria, subIndex) => (
									<div key={subcategoria.subcategoria_id + subIndex}>
										<h2 className="subcategory-title">
											{subcategoria.subcategoria}
										</h2>
										<ul className="products-list">
											{subcategoria.productos.map((producto, prodIndex) => (
												<li
													key={producto.nombre + prodIndex}
													className="product-container"
												>
													<div>
														<img
															src={producto.img}
															alt={producto.nombre}
															className="product-img"
														/>
													</div>
													<div className="product-info">
														<p className="product-name">{producto.nombre}</p>
														<p className="product-price">
															Precio: ${producto.precio}
														</p>
													</div>
													<div className="product-add">
														<button
															value={JSON.stringify(producto)}
															onClick={handleAddToMinicart}
														>
															+
														</button>
													</div>
												</li>
											))}
										</ul>
									</div>
								))}
							</>
						) : null}
					</div>
				))}
			</div>
		</main>
	);
}