import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import './ClientHome.css';
import { useLocation } from 'react-router-dom';
import { deletePedido, getPedidos } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

const socket = io();
//const socket = io('https://menu-didactico.up.railway.app/');
export default function ClientHome() {
	const [popUp, setPopUp] = useState(false);
	const [selectedPedidoId, setSelectedPedidoId] = useState(null);

	// Funcion para cuando llega una nueva notificacion
	const [newAlert, setNewAlert] = useState(false);
	const handleNewAlert = () => {
		setNewAlert(true);
	};
	// Funcion para marcar las alertas como vistas
	const handleCheckAlert = () => {
		setNewAlert(false);
	};

	const handleOpenPopUp = (orderId) => {
		console.log(orderId);
		setSelectedPedidoId(orderId);
		setPopUp(!popUp);
	};

	const dispatch = useDispatch();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	// Funcion para recibir y renderizar las alertas cuando se emiten desde las mesas
	useEffect(() => {
		dispatch(getPedidos());
		socket.on('connect', () => {
			console.log('conectado a la sala' + userEmail);
			socket.emit('join-room', { room: userEmail + '-llamar-camarera' });
			socket.emit('join-room', { room: userEmail + '-pedir-cuenta' });
			socket.emit('join-room', { room: userEmail });
		});

		socket.on('disconnect', () => {
			console.log('desconectado');
		});

		socket.emit('join-room', { room: userEmail });

		socket.on('estado-actual', (payload) => {
			console.log('payload', payload);

			const email = searchParams.get('email');
			console.log(payload[email][0]);

			if (payload[email][0]) {
				handleNewAlert();
				document.getElementById('lblTicket1').innerText = payload[email][0];
			}

			if (payload[email][1]) {
				handleNewAlert();
				document.getElementById('lblTicket2').innerText = payload[email][1];
			}

			if (payload[email][2]) {
				handleNewAlert();
				document.getElementById('lblTicket3').innerText = payload[email][2];
			}

			if (payload[email][3]) {
				handleNewAlert();
				document.getElementById('lblTicket4').innerText = payload[email][3];
			}
		});

		// Actualizar los datos de la tabla cada un minuto
		const updateTableData = () => {
			dispatch(getPedidos());
		};

		// Llamar a la función de actualización cada 1 minuto
		const intervalId = setInterval(updateTableData, 60000);

		// Limpieza del intervalo al desmontar el componente
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const pedidos = useSelector((state) => state.pedidos.pedidos);
	console.log(pedidos);

	const handleDelete = (e) => {
		e.preventDefault();
		swal({
			title: 'Eliminar',
			text: 'Esta seguro que desea liberar la mesa?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(deletePedido(e.target.name, e.target.value));
				swal({
					text: `Se ha liberado la mesa`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha liberado la mesa', icon: 'info' });
			}
		});
	};

	return (
		<main>
			<div className="client-home-container">
				<div>
					<div>
						<h2>Monitoreo del salon</h2>
					</div>
				</div>
				<div className="client-home">
					<div className="client-home-table-container">
						<table className="client-home-table">
							<thead className="">
								<tr>
									<th>Mesa</th>
									<th>Nombre</th>
									<th>Pedido</th>
									<th>Total</th>
									<th>Alertas</th>
									<th>-</th>
								</tr>
							</thead>
							<tbody className="client-table-body">
								{pedidos?.map((c) => {
									return (
										<tr key={c.id}>
											<td>{c.mesa}</td>
											<td>{c.nombre}</td>
											<td>
												<button onClick={() => handleOpenPopUp(c.id)}>
													Ver
												</button>
											</td>
											<td>$ {c.total}</td>
											<td>alerta</td>
											<td>
												<button
													name={c.mesa}
													value={c.nombre}
													className="client-home-table-btn"
													onClick={handleDelete}
												>
													Liberar mesa
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
							{popUp && selectedPedidoId !== null && (
								<div className="popup-background">
									<div className="popup-container">
										<span
											className="popup-close"
											onClick={() => handleOpenPopUp(null)}
										>
											&times;
										</span>
										<div className="popup-content">
											<h3>Detalles del Pedido</h3>
											<p>
												Mesa:{' '}
												{
													pedidos.find((order) => order.id === selectedPedidoId)
														.mesa
												}
											</p>
											<p>
												Nombre:{' '}
												{
													pedidos.find((order) => order.id === selectedPedidoId)
														.nombre
												}
											</p>
											<p>
												Pedido:{' '}
												{
													pedidos.find((order) => order.id === selectedPedidoId)
														.pedido
												}
											</p>
											<p>
												Comentarios:{' '}
												{
													pedidos.find((order) => order.id === selectedPedidoId)
														.comentarios
												}
											</p>
										</div>
									</div>
								</div>
							)}
						</table>
					</div>
					<div
						className={
							newAlert ? 'client-home-alerts-active' : 'client-home-alerts'
						}
					>
						<div>
							<button className="alert-btn" onClick={handleCheckAlert}>
								Alerta Vista
							</button>

							<table>
								<tbody>
									<tr>
										<td valign="middle" className="ticket-actual">
											<span
												id="lblTicket1"
												className="ticket-actual-numero"
											></span>
											<span
												id="lblEscritorio1"
												className="ticket-actual-escritorio"
											></span>
										</td>
									</tr>
									<tr>
										<td>
											<span
												id="lblTicket2"
												className="ticket-secundario"
											></span>
											<span id="lblEscritorio2"> </span>
										</td>
									</tr>
									<tr>
										<td>
											<span
												id="lblTicket3"
												className="ticket-secundario"
											></span>
											<span id="lblEscritorio3"></span>
										</td>
									</tr>
									<tr>
										<td>
											<span
												id="lblTicket4"
												className="ticket-secundario"
											></span>
											<span id="lblEscritorio4"></span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
