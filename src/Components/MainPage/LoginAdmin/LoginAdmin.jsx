/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux';
import './LoginAdmin.css';
import { useState } from 'react';
import { createAdmin } from '../../../redux/actions';

export default function LoginAdmin() {
	const dispatch = useDispatch();
	const newAdmin = useSelector((state) => state.newAdmin);
	console.log(newAdmin.msg);
	const [input, setInput] = useState({
		name: '',
		email: '',
		password: '',
		img: ''
	});

	const [repeatPass, setRepeatPass] = useState('');
	const handleRepeatPass = (e) => {
		setRepeatPass(e.target.value);
	};

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		console.log(input);
		e.preventDefault();
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		if (input.name.trim() === '') {
			alert('Por favor complete su nombre');
			return;
		} else if (input.email.trim() === '') {
			alert('Por favor ingrese su email');
			return;
		} else if (!emailRegex.test(input.email)) {
			alert('Email no válido');
			return;
		} else if (input.password.trim() === '') {
			alert('Ingrese una contraseña');
			return;
		} else if (input.password.trim() !== repeatPass) {
			alert('Las contraseñas no coinciden');
			return;
		}
		dispatch(createAdmin(input));
	};

	return (
		<div className="loginAdmin">
			<div className="login-img-container"></div>
			<div className="form-loginadmin">
				<form action="">
					<h2 className="h2-login">Crea un Administrador</h2>
					{newAdmin?.msg === 'email existente' ? (
						<h3>Usuario ya existente</h3>
					) : (
						<div></div>
					)}
					<label htmlFor="">Nombre</label>
					<input
						type="text"
						name="name"
						id=""
						value={input.name}
						onChange={handleChange}
					/>
					<label htmlFor="">Email</label>
					<input
						type="email"
						name="email"
						id=""
						value={input.email}
						onChange={handleChange}
					/>
					<label htmlFor="">Password</label>
					<input
						type="password"
						name="password"
						id=""
						value={input.password}
						onChange={handleChange}
					/>
					<label htmlFor="">Confirmar Password</label>
					<input
						type="password"
						name=""
						id=""
						value={repeatPass}
						onChange={handleRepeatPass}
					/>
					<button className="submit-login" onClick={handleSubmit}>
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
