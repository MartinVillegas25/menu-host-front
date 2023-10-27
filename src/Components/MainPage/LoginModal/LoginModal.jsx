/* eslint-disable react/prop-types */
import './LoginModal.css';
import img from '../../../assets/CAMARERA.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logUser, validateAdmin, validateUser } from '../../../redux/actions';

export default function LoginModal({ handleCloseLogin }) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const userType = useSelector((state) => state.userType);
	console.log(userType);

	const [input, setInput] = useState({
		email: '',
		password: '',
		rememberMe: false
	});

	// Si hay credenciales en el local storage las carga
	useEffect(() => {
		const savedCredentials = localStorage.getItem('savedCredentials');
		if (savedCredentials) {
			const { email, password } = JSON.parse(savedCredentials);
			setInput({
				...input,
				email,
				password,
				rememberMe: true
			});
		}
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		setInput({
			...input,
			[name]: newValue
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		if (
			input.email.trim() === '' ||
			!emailRegex.test(input.email) ||
			input.password.trim() === ''
		) {
			alert('Por favor complete ambos campos');
			return;
		}

		// Si el input de recuerdame esta seleccionado guarda los datos en local storage
		if (input.rememberMe) {
			const savedCredentials = JSON.stringify({
				email: input.email,
				password: input.password
			});
			localStorage.setItem('savedCredentials', savedCredentials);
		} else {
			localStorage.removeItem('savedCredentials'); // Si no esta activo el input, borra las credenciales de localStorage
		}

		await dispatch(logUser(input));
		if (userType === 'admin' || userType === 'local') {
			dispatch(handleCloseLogin());
		}
	};
	//Validaciones de tipo de usuario, para renderizado condicional de botones de acceso a los diferentes dashboard
	useEffect(() => {
		if (token) {
			if (userType === 'admin') {
				localStorage.setItem('token', token);
				dispatch(validateAdmin());
			} else if (userType === 'local') {
				localStorage.setItem('token', token);
				dispatch(validateUser());
			}
		}
	}, [token]);

	return (
		<div className="login">
			<button className="login-close-btn" onClick={handleCloseLogin}>
				X
			</button>
			<div className="login-container">
				<div className="login-input">
					<h3>
						Si <span>Mesero</span>
					</h3>
					<h4>Bienvenido/a de vuelta</h4>

					<p>Ingresá con tu email y contraseña</p>
					{userType === 'pago' ? (
						<p>
							Error en el pago de la suscripcion, contactese con el
							administrador
						</p>
					) : (
						<div></div>
					)}
					<div>
						<p>Correo electrónico</p>
						<input
							type="text"
							name="email"
							value={input.email}
							onChange={handleChange}
						/>
					</div>
					{userType === 'email' ? <p>Email Incorrecto</p> : <div></div>}
					<div>
						<p>Contraseña</p>
						<input
							type="password"
							name="password"
							value={input.password}
							onChange={handleChange}
						/>
						{userType === 'password' ? (
							<p>Contraseña incorrecta</p>
						) : (
							<div></div>
						)}
					</div>
					<div className="remember">
						<div>
							<input
								type="checkbox"
								name="rememberMe"
								checked={input.rememberMe}
								onChange={handleChange}
							/>{' '}
							<p>Recordarme</p>
						</div>
						<a href="">Olvidaste la contraseña?</a>
					</div>
					{userType === 'admin' || userType === 'local' ? (
						<p>Sesion iniciada correctamente</p>
					) : (
						<button className="login-btn" onClick={handleSubmit}>
							Iniciar sesión
						</button>
					)}

					<div className="login-to-register">
						<p>No tienes una cuenta?</p>
						<a href="">Registrate</a>
					</div>
				</div>

				<div>
					<img src={img} alt="" className="login-img" />
				</div>
			</div>
		</div>
	);
}
