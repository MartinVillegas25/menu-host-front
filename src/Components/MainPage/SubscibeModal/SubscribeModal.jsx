/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './SubscribeModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../redux/actions';
import img from '../../../assets/restaurant.jpg';

// eslint-disable-next-line react/prop-types
export default function SubscribeModal({ handleCloseSubscribe }) {
	const dispatch = useDispatch();
	const newUser = useSelector((state) => state.newUser);

	// Inicio de los datos a cargar para la subscripción
	const [input, setInput] = useState({
		img: null,
		name: '',
		storeName: '',
		email: '',
		password: '',
		address: '',
		cp: '',
		plan: '',
		telefono: '',
		pais: '',
		localidad: '',
		tipo: '',
		comentario: ''
	});

	// Función para cargar los datos desde los input
	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	// Logica para 'repetir contraseña'
	const [repeatPass, setRepeatPass] = useState('');
	const handleRepeatPass = (e) => {
		setRepeatPass(e.target.value);
	};

	// Función de ejecutar el control de errores y el registro
	const handleSubmit = (e) => {
		e.preventDefault();

		// Regular expression para validación de el email
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		// Chequeo de errores

		if (input.name.trim() === '') {
			alert('Por favor complete su nombre');
			return;
		} else if (input.address.trim() === '') {
			alert('Por favor complete su dirección');
			return;
		} else if (input.storeName.trim() === '') {
			alert('Por favor indique el nombre de su local');
			return;
		} else if (input.email.trim() === '') {
			alert('Por favor ingrese su email');
			return;
		} else if (!emailRegex.test(input.email)) {
			alert('Email no válido');
			return;
		} else if (input.cp.trim() === '') {
			alert('Ingrese su código postal');
			return;
		} else if (input.password.trim() === '') {
			alert('Ingrese una contraseña');
			return;
		} else if (input.password.trim() !== repeatPass) {
			alert('Las contraseñas no coinciden');
			return;
		} else if (input.telefono.trim() === '') {
			alert('Ingrese su teléfono');
			return;
		} else if (input.pais.trim() === '') {
			alert('Ingrese su país');
		} else if (input.localidad.trim() === '') {
			alert('Ingrese su localidad');
		}

		// Si no hay errores, despachar la acción de registrar el usuario
		dispatch(createUser(input));

		// Limpiar los input después de ejecutar la función
		setInput({
			img: '',
			name: '',
			storeName: '',
			email: '',
			password: '',
			address: '',
			cp: '',
			plan: '',
			telefono: '',
			pais: '',
			localidad: '',
			tipo: '',
			comentario: ''
		});
		setRepeatPass('');
		dispatch(handleCloseSubscribe);
	};

	const handleSubmitBasicUser = (e) => {
		e.preventDefault();

		// Regular expression para validación de el email
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		// Chequeo de errores

		if (input.name.trim() === '') {
			alert('Por favor complete su nombre');
			return;
		} else if (input.address.trim() === '') {
			alert('Por favor complete su dirección');
			return;
		} else if (input.storeName.trim() === '') {
			alert('Por favor indique el nombre de su local');
			return;
		} else if (input.email.trim() === '') {
			alert('Por favor ingrese su email');
			return;
		} else if (!emailRegex.test(input.email)) {
			alert('Email no válido');
			return;
		} else if (input.cp.trim() === '') {
			alert('Ingrese su código postal');
			return;
		} else if (input.password.trim() === '') {
			alert('Ingrese una contraseña');
			return;
		} else if (input.password.trim() !== repeatPass) {
			alert('Las contraseñas no coinciden');
			return;
		} else if (input.telefono.trim() === '') {
			alert('Ingrese su teléfono');
			return;
		} else if (input.pais.trim() === '') {
			alert('Ingrese su país');
		} else if (input.localidad.trim() === '') {
			alert('Ingrese su localidad');
		}

		// Si no hay errores, despachar la acción de registrar el usuario
		dispatch(createUser(input));

		// Limpiar los input después de ejecutar la función
		setInput({
			img: '',
			name: '',
			storeName: '',
			email: '',
			password: '',
			address: '',
			cp: '',
			plan: '',
			telefono: '',
			pais: '',
			localidad: '',
			tipo: '',
			comentario: ''
		});
		setRepeatPass('');
		alert('usuario creado con exito');
		window.location.reload(true);
	};

	return (
		<div className="subscribe">
			<button className="subscribe-close-btn" onClick={handleCloseSubscribe}>
				X
			</button>
			<div className="subscribe-container">
				<div className="subscribe-input">
					<h2>
						Bienvenido a <span>SiMesero</span>
					</h2>
					<p>
						Si ya tienes una cuenta <a href="">Inicia Sesión</a>
					</p>

					<div>
						<p>Ingresa tu email para formar parte:</p>
						<input
							type="text"
							name="email"
							value={input.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p>Ingresa una contraseña:</p>
						<input
							type="password"
							name="password"
							value={input.password}
							onChange={handleChange}
						/>
						<p>Repite la contraseña:</p>
						<input
							type="password"
							value={repeatPass}
							onChange={handleRepeatPass}
						/>
					</div>
					<p>Completa los siguientes datos:</p>
					<div className="subs-data">
						<div className="subs-data-container">
							<input
								type="text"
								placeholder="Nombre completo"
								name="name"
								className="subs-input"
								value={input.name}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Nombre del local"
								name="storeName"
								className="subs-input"
								value={input.storeName}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Dirección"
								name="address"
								className="subs-input"
								value={input.address}
								onChange={handleChange}
							/>
							<input
								type="number"
								placeholder="Código Postal"
								name="cp"
								className="subs-input"
								value={input.cp}
								onChange={handleChange}
							/>
							<input
								type="file"
								placeholder="Foto perfil"
								accept="image/*"
								name="img"
								className="subs-input"
								value={input.img}
								onChange={handleChange}
							/>

							<input
								type="number"
								placeholder="Teléfono"
								name="telefono"
								className="subs-input"
								value={input.telefono}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="País"
								name="pais"
								className="subs-input"
								value={input.pais}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Localidad"
								name="localidad"
								className="subs-input"
								value={input.localidad}
								onChange={handleChange}
							/>
							<input
								type="text"
								placeholder="Comentario"
								name="comentario"
								className="subs-input"
								value={input.comentario}
								onChange={handleChange}
							/>
							<p>¿Qué tipo de comercio es?</p>
							<div className="subs-plan">
								<select name="tipo" onClick={handleChange}>
									<option value="">-</option>
									<option value="cafe">Café</option>
									<option value="restaurant">Restaurante</option>
									<option value="bar">Bar</option>
								</select>
							</div>
						</div>
					</div>
					<p>Selecciona el plan ideal para ti:</p>
					<div className="plan-data">
						<div className="subs-plans">
							<select name="plan" onClick={handleChange}>
								<option value="">-</option>
								<option value="basic">Básico</option>
								<option value="standard">Estándar</option>
								<option value="premium">Premium</option>
							</select>
						</div>
					</div>
					<div className="subs-btn-container">
						{input.plan === 'standard' ? (
							<div>
								<a
									// eslint-disable-next-line react/no-unknown-property
									mp-mode="dftl"
									href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848ae746f0018af1220de80617"
									name="MP-payButton"
									className="blue-ar-l-rn-none"
								>
									Suscribirme
								</a>
								<script type="text/javascript">
									{(function () {
										function $MPC_load() {
											window.$MPC_loaded !== true &&
												(function () {
													var s = document.createElement('script');
													s.type = 'text/javascript';
													s.async = true;
													s.src =
														document.location.protocol +
														'//secure.mlstatic.com/mptools/render.js';
													var x = document.getElementsByTagName('script')[0];
													x.parentNode.insertBefore(s, x);
													window.$MPC_loaded = true;
												})();
										}
										window.$MPC_loaded !== true
											? window.attachEvent
												? window.attachEvent('onload', $MPC_load)
												: window.addEventListener('load', $MPC_load, false)
											: null;
									})()}
									{/* ;  // to receive event with message when closing modal from
									congrants back to site function $MPC_message(event){' '}
									{
										// onclose modal ->CALLBACK FUNCTION
										// !!!!!!!!FUNCTION_CALLBACK HERE Received message: {event.data} preapproval_id !!!!!!!!
									}
									window.$MPC_loaded !== true ?
									(window.addEventListener("message", $MPC_message)) : null;  */}
								</script>
							</div>
						) : input.plan === 'basic' ? (
							<div>
								<button className="subs-btn" onClick={handleSubmitBasicUser}>
									Básico
								</button>
							</div>
						) : input.plan === 'premium' ? (
							<div>
								<a
									// eslint-disable-next-line react/no-unknown-property
									mp-mode="dftl"
									href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848af994d0018b02039da906a5"
									name="MP-payButton"
									className="blue-ar-l-rn-none"
								>
									Suscribirme
								</a>
								<script type="text/javascript">
									{(function () {
										function $MPC_load() {
											window.$MPC_loaded !== true &&
												(function () {
													var s = document.createElement('script');
													s.type = 'text/javascript';
													s.async = true;
													s.src =
														document.location.protocol +
														'//secure.mlstatic.com/mptools/render.js';
													var x = document.getElementsByTagName('script')[0];
													x.parentNode.insertBefore(s, x);
													window.$MPC_loaded = true;
												})();
										}
										window.$MPC_loaded !== true
											? window.attachEvent
												? window.attachEvent('onload', $MPC_load)
												: window.addEventListener('load', $MPC_load, false)
											: null;
									})()}
									;
									{/*
        // to receive event with message when closing modal from congrants back to site
        function $MPC_message(event) {
          // onclose modal ->CALLBACK FUNCTION
         // !!!!!!!!FUNCTION_CALLBACK HERE Received message: {event.data} preapproval_id !!!!!!!!
        }
        window.$MPC_loaded !== true ? (window.addEventListener("message", $MPC_message)) : null;
        */}
								</script>
							</div>
						) : (
							<div>Seleccione un tipo de plan</div>
						)}
					</div>
				</div>
				<div>
					<img src={img} alt="" className="subs-img" />
				</div>
			</div>
		</div>
	);
}
