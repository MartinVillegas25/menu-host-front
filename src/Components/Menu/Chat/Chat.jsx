/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';
import { getPlanToMenu } from '../../../redux/actions';
const socket = io();
//const socket = io('https://menu-didactico.up.railway.app/');
export default function Chat() {
	const dispatch = useDispatch();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	console.log('searchParams:', searchParams.toString()); // Verifica qué parámetros de consulta se están pasando

	const usuario = {
		mesa: searchParams.get('mesa'),
		email: searchParams.get('email')
	};

	const divUsuarios = document.querySelector('#divUsuarios');
	const formEnviar = document.querySelector('#formEnviar');
	const txtMensaje = document.querySelector('#txtMensaje');
	const divChatbox = document.querySelector('#divChatbox');

	function renderizarUsuarios(personas) {
		personas?.forEach((persona) => {
			usuario.email = persona.email;
			return usuario.email;
		});

		let html = '';

		personas?.forEach((persona) => {
			return (html += (
				<li>
					<a data-id="${persona.id}" href="javascript:void(0)">
						<span>
							{' '}
							Mesa ${persona.mesa}{' '}
							<small className="text-success">online</small>
						</span>
					</a>
				</li>
			));
		});

		// divUsuarios.innerHTML = html;
	}

	function renderizarMensajes(mensaje, yo) {
		const fecha = new Date(mensaje?.fecha);
		const hora = `${fecha.getHours()}:${fecha.getMinutes()}`;

		let html = yo ? (
			<li className="reverse">
				<div className="chat-content">
					<h5>${mensaje.mesa}</h5>
					<div className="box bg-light-inverse">${mensaje.mensaje}</div>
				</div>
				<div className="chat-time">${hora}</div>
			</li>
		) : (
			<li className="animated fadeIn">
				$
				{mensaje?.mesa !== 'Administrador'
					? `<div className="chat-img"><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1695696885/icons8-circundado-usuario-mujer-tipo-4-de-la-piel-48_ttarml.png" alt="user" /></div>`
					: ''}
				<div className="chat-content">
					<h5>${mensaje?.mesa}</h5>
					<div className="box bg-light-info">${mensaje?.mensaje}</div>
				</div>
				<div className="chat-time">${hora}</div>
			</li>
		);

		divChatbox?.insertAdjacentHTML('beforeend', html);
	}

	function scrollBottom() {
		const newMessage = divChatbox.querySelector('li:last-child');

		const clientHeight = divChatbox.clientHeight;
		const scrollTop = divChatbox.scrollTop;
		const scrollHeight = divChatbox.scrollHeight;
		const newMessageHeight = newMessage.clientHeight;
		const lastMessageHeight =
			(newMessage.previousElementSibling &&
				newMessage.previousElementSibling.clientHeight) ||
			0;

		if (
			clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
			scrollHeight
		) {
			divChatbox.scrollTop = scrollHeight;
		}
	}

	useEffect(() => {
		socket.on('connect', () => {
			console.log('conenctado menu');
			socket.emit('entrarChat', usuario, (resp) => {
				// console.log('Usuarios conectados', resp);
				renderizarUsuarios(resp);
			});
		});
		socket.on('crearMensaje', (mensaje) => {
			// console.log('Servidor:', mensaje);
			renderizarMensajes(mensaje, false);
			scrollBottom();
		});
		socket.on('listaPersona', (personas) => {
			renderizarUsuarios(personas);
		});

		socket.on('disconnect', () => {
			console.log('disconnect');
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (txtMensaje.value.trim().length === 0) {
			return;
		}

		socket.emit(
			'crearMensaje',
			{
				mesa: usuario.mesa,
				mensaje: txtMensaje.value
			},
			(mensaje) => {
				txtMensaje.value = '';
				txtMensaje.focus();
				renderizarMensajes(mensaje, true);
				scrollBottom();
			}
		);
	};

	useEffect(() => {
		dispatch(getPlanToMenu(usuario.email));
	}, []);
	const plan = useSelector((state) => state.planToMenu);

	return (
		<div>
			{plan === 'basic' || plan === 'standard' ? (
				<div>Funcionalidad sin acceso</div>
			) : (
				<div className="row animated fadeIn">
					<div className="col-12">
						<div className="card m-b-0">
							<div className="chat-main-box">
								<div className="chat-left-aside">
									<div className="open-panel">
										<i className="ti-angle-right"></i>
									</div>
									<div className="chat-left-inner">
										<ul className="chatonline style-none" id="divUsuarios">
											{' '}
										</ul>
									</div>
								</div>

								<div className="chat-right-aside">
									<div className="chat-main-header">
										<div className="p-20 b-b">
											<h3 className="box-title">Sala de Chat</h3>
										</div>
									</div>

									<div className="chat-rbox">
										<ul className="chat-list p-20" id="divChatbox"></ul>
									</div>
									<div className="card-body b-t">
										<form id="formEnviar" onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-8">
													<input
														autoComplete="off"
														id="txtMensaje"
														placeholder="Escribe tu mensaje aquí"
														className="form-control b-0"
														autoFocus
													/>
												</div>
												<div className="col-4 text-right">
													<button
														type="submit"
														className="btn btn-info btn-circle"
													>
														{' '}
														Enviar{' '}
													</button>
												</div>
											</div>
										</form>
										{renderizarUsuarios()}
										{renderizarMensajes()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
