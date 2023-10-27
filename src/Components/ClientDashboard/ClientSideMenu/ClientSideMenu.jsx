import './ClientSideMenu.css';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdMenuBook } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';

import logo from '../../../assets/logos/Logo1.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocalImg, getLocalData } from '../../../redux/actions';
import swal from 'sweetalert';

export default function ClientSideMenu() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	// Datos del cliente

	useEffect(() => {
		dispatch(getLocalData(userEmail));
	}, []);
	const dataLocal = useSelector((state) => state.localData.usuario);

	const dispatch = useDispatch();

	const [menuOpen, setMenuOpen] = useState(false);

	// Funciones para cambiar la imagen de perfil
	const [imgInput, setImgInput] = useState(false);
	const [newImg, setNewImg] = useState('');

	const handleOpenInput = () => {
		setImgInput(true);
	};

	const handleImg = (e) => {
		setNewImg(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		swal({
			title: 'Modificar',
			text: 'Esta seguro que desea  cambiar la imagen de perfil?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				const formData = new FormData();
				formData.append('newImagen', newImg);
				dispatch(changeLocalImg(formData));
				swal({
					text: `Se ha modificado la imagen de perfil`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha modificado la imagen', icon: 'info' });
			}
		});
	};

	return (
		<div>
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className={menuOpen === true ? `openSideBtn` : `closedSideBtn`}
			>
				{' '}
				<BsArrowRightCircle className="menuBtn" />
			</button>
			{menuOpen ? (
				<aside className="client-side-menu-web">
					<img src={logo} alt="" className="client-side-menu-logo" />
					<div className="client-side-container">
						<div className="client-side-link">
							<IoRestaurantOutline />
							<a href={`/dashboard?email=${userEmail}`}>Salon</a>
						</div>
						<div className="client-side-link">
							<MdMenuBook />
							<a href={`/dashboard/menu?email=${userEmail}`}>Menu</a>
						</div>
						<div className="client-side-link">
							<BsFillPersonFill />
							<a href={`/dashboard/configuracion?email=${userEmail}`}>
								Configuracion
							</a>
						</div>
						<div className="client-side-link">
							<BsFillPersonFill />
							<a href={`/dashboard/chat?email=${userEmail}`}>Chat</a>
						</div>
						<div className="client-side-link">
							<VscSignOut />
							<a href="/">Salir</a>
						</div>
						<div className="client-side-img">
							<img src={dataLocal?.img} alt="" />

							<button className="cambiarimg-btn" onClick={handleOpenInput}>
								Cambiar imagen
							</button>
							{imgInput ? (
								<div className="admin-side-img-change">
									<input
										type="file"
										id="newImg"
										accept="image/*"
										onChange={handleImg}
									/>
									<button className="cambiarimg-btn" onClick={handleSubmit}>
										Cambiar
									</button>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</div>
				</aside>
			) : (
				<div className="sideMenuClosed"></div>
			)}
		</div>
	);
}
