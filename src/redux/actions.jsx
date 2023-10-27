/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const LOG_USER = 'LOG_USER';
export const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
export const SUSPEND_USER = 'SUSPEND_USER';
export const ACTIVATE_USER = 'ACTIVATE_USER';
export const VALIDATE_ADMIN = 'VALIDATE_ADMIN';
export const GET_SUSPENDED_CLIENTS = 'GET_SUSPENDED_CLIENTS';
export const VALIDATE_USER = 'VALIDATE_USER';
export const GET_LOCAL_DATA = 'GET_LOCAL_DATA';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const LOG_OUT = 'LOG_OUT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CREATE_SUB_CATEGORY = 'CREATE_SUB_CATEGORY';
export const GET_PLANS = 'GET_PLANS';
export const GET_SUBCATEGORIES = 'GET_SUBCATEGORIES';
export const PLAN_PRICE = 'PLAN_PRICE';
export const MODIF_DATA = 'MODIF_DATA';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_MENU_CATEGORIES = 'GET_MENU_CATEGORIES';
export const ADD_TO_MINICART = 'ADD_TO_MINICART';
export const REMOVE_FROM_MINICART = 'REMOVE_FROM_MINICART';
export const CREATE_ADMIN = 'CREATE_ADMIN';
export const CHANGE_PLAN = 'CHANGE_PLAN';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_SUBCATEGORY = 'DELETE_SUBCATEGORY';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_PEDIDOS = 'GET_PEDIDOS';
export const ORDER = 'ORDER';
export const DELETE_PEDIDOS = 'DELETE_PEDIDOS';
export const CHANGE_ADMIN_IMG = 'CHANGE_ADMIN_IMG';
export const GET_CLIENTS_TO_CONFIRM = 'GET_CLIENTS_TO_CONFIRM';
export const CHANGE_LOCAL_IMG = 'CHANGE_LOCAL_IMG';
export const MODIFY_PRODUCT = 'MODIFY_PRODUCT';
export const CONFIRM_USER_PAYMENT = 'CONFIRM_USER_PAYMENT';
export const GET_CLIENTS_TO_CONFIRM_PLAN = 'GET_CLIENTS_TO_CONFIRM_PLAN';
export const CONFIRM_USER_NEW_PLAN = 'CONFIRM_USER_NEW_PLAN';
export const SET_PRICE = 'SET_PRICE';
export const GET_PLAN_TO_MENU = 'GET_PLAN_TO_MENU';

//https://menu-didactico.up.railway.app
//FUNCIONALIDADES DE LA PAGINA PRINCIPAL

// Funcion para el registro del usuario, en el cual, detalla sus datos y elige el tipo de plan a adquirir.
export function createUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post(
				'http://localhost:3000/subscription',
				payload
			);
			console.log('entro en create');
			return dispatch({
				type: CREATE_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para registro de administrador

export function createAdmin(payload) {
	return async function (dispatch) {
		console.log('creando admin');
		try {
			const info = await axios.post(
				'http://localhost:3000/admin-boss',
				payload
			);

			return dispatch({
				type: CREATE_ADMIN,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para el log in del usuario ya registrado en la pagina.
export function logUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post('http://localhost:3000/login', payload);

			return dispatch({
				type: LOG_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para cerrar sesion

export function logOutUser() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get('http://localhost:3000/logout', {
					headers
				})
				.then((response) => {
					return dispatch({
						type: LOG_OUT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para mostrar el precio de los planes
export function getPlans() {
	return async function (dispatch) {
		try {
			const info = await axios.get('http://localhost:3000/planes');
			return dispatch({
				type: GET_PLANS,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}
//FUNCIONALIDADES DE LA PAGINA DE ADMINISTRADOR

//funcion para traer la informacion de todos los clientes registrados.
export function getAllClients() {
	return async function (dispatch) {
		try {
			const info = await axios.get('http://localhost:3000/mostrar');
			return dispatch({
				type: GET_ALL_CLIENTS,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para traer los clientes que no tienen confirmado el pago

export function getClientsToConfirm() {
	return async function (dispatch) {
		try {
			const info = await axios.get('http://localhost:3000/confirmar');
			return dispatch({
				type: GET_CLIENTS_TO_CONFIRM,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para traer los clientes que no tienen confirmado un cambio de plan
export function getClientsToConfirmPlan() {
	return async function (dispatch) {
		try {
			const info = await axios.get('http://localhost:3000/confimar-plan');
			return dispatch({
				type: GET_CLIENTS_TO_CONFIRM_PLAN,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para confirmar el pago de un usuario
export function confirmUserPayment(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/admin/confirmar-pago', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CONFIRM_USER_PAYMENT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para confirmar el cambio de plan
export function confirmUserNewPlan(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/admin/confirmar-plan', payload, {
					headers
				})
				.then((response) => {
					console.log(payload);
					return dispatch({
						type: CONFIRM_USER_NEW_PLAN,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para traer solo los usuarios suspendidos.
export function getSuspendedClients() {
	return async function (dispatch) {
		try {
			const info = await axios.post('http://localhost:3000/status');
			return dispatch({
				type: GET_SUSPENDED_CLIENTS,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para suspender un usuario en particular
export function suspendUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.put('http://localhost:3000/suspender', payload);

			return dispatch({
				type: SUSPEND_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para activar una cuenta suspendida de usuario
export function activateUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.put('http://localhost:3000/activar', payload);

			return dispatch({
				type: ACTIVATE_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para validar el ingreso del admin
export function validateAdmin() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios.get('http://localhost:3000/admin', { headers }).then((response) => {
				return dispatch({
					type: VALIDATE_ADMIN,
					payload: response.data
				});
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para validar el ingreso de un usuario no admin
export function validateUser() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get('http://localhost:3000/dashboard', { headers })
				.then((response) => {
					return dispatch({
						type: VALIDATE_USER,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para cambiar el precio de los planes standard y premium
export function planPrice(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.put('http://localhost:3000/valores', payload);

			return dispatch({
				type: PLAN_PRICE,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para modificar los datos del usuario

export function modifData(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/actualizar', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: MODIF_DATA,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para cambiar la imagen del admin

export function changeAdminImg(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/actualizar-imagen', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CHANGE_ADMIN_IMG,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//FUNCIONALIDADES DE DASHBOARD DE CLIENTE

//funcionalidad para traer los datos del local

export function getLocalData(email) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get(`http://localhost:3000/dashboard/config?email=${email}`, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: GET_LOCAL_DATA,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function changeLocalImg(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/actualizar-img', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CHANGE_LOCAL_IMG,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//crear categoria

export function createCategory(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.post('http://localhost:3000/dashboard/newcategoria', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CREATE_CATEGORY,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createSubCategory(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.post('http://localhost:3000/dashboard/newsubcategoria', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CREATE_SUB_CATEGORY,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para cambiar el plan como usuario
export function changePlan(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/dashboard/actulizar-plan', payload, {
					headers
				})
				.then((response) => {
					console.log(response.data);
					console.log(payload);
					return dispatch({
						type: CHANGE_PLAN,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}
// funcion para mostrar todas las categorias del local
export function getCategories() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get('http://localhost:3000/dashboard/categorias', {
					headers
				})
				.then((response) => {
					return dispatch({
						type: GET_CATEGORIES,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para traer subcategorias correspondientes
export function getSubCategories(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get(
					`http://localhost:3000/dashboard/subcategorias?categoria=${payload}`,
					{
						headers
					}
				)
				.then((response) => {
					console.log(response.data);
					console.log('entro');
					return dispatch({
						type: GET_SUBCATEGORIES,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para crear un nuevo producto

export function createProduct(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage
			console.log('entrando1');
			const headers = {
				'x-token': token
			};
			axios
				.post(`http://localhost:3000/dashboard/items`, payload, {
					headers
				})

				.then((response) => {
					return dispatch({
						type: CREATE_PRODUCT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para eliminar categoria
export function deleteCategory(categoria, email) {
	return async function (dispatch) {
		try {
			axios
				.delete(
					`http://localhost:3000/dashboard/items/borrar-categoria?email=${email}&categoria=${categoria}`

					// { headers }
				)
				.then((response) => {
					console.log(response);
					return dispatch({
						type: DELETE_CATEGORY,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}
// Funcion para eliminar subcategoria
export function deleteSubCategory(subcategoria, categoria, email) {
	return async function (dispatch) {
		try {
			axios
				.delete(
					`http://localhost:3000/dashboard/items/borrar-subcategoria?email=${email}&categoria=${categoria}&subcategoria=${subcategoria}`
				)
				.then((response) => {
					console.log('aca');
					return dispatch({
						type: DELETE_SUBCATEGORY,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para eliminar un producto
export function deleteProduct(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.delete(`http://localhost:3000/dashboard/items?id=${payload}`, {
					headers
				})

				.then((response) => {
					console.log('entra');
					return dispatch({
						type: DELETE_PRODUCT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para editar los datos de un producto

export function modifyProduct(id, payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put(`http://localhost:3000/dashboard/items?id=${id}`, payload, {
					headers
				})
				.then((response) => {
					console.log(response.data);
					console.log(payload);
					return dispatch({
						type: MODIFY_PRODUCT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para mostar los pedidos del local
export function getPedidos() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get(`http://localhost:3000/dashboard/pedidos`, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: GET_PEDIDOS,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para mostrar los productos del local

export function getProducts(payload) {
	return async function (dispatch) {
		try {
			axios
				.get(`http://localhost:3000/dashboard/items?email=${payload}`)
				.then((response) => {
					return dispatch({
						type: GET_PRODUCTS,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}
// Funcion para mostrar las categorias del menu
export function getMenuCategories(payload) {
	return async function (dispatch) {
		try {
			axios
				.get(`http://localhost:3000/menu/categorias?email=${payload}`)
				.then((response) => {
					return dispatch({
						type: GET_MENU_CATEGORIES,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}
// Funcion para agregar productos al carrito
export function addToMinicart(payload) {
	return {
		type: ADD_TO_MINICART,
		payload: payload
	};
}
//Funcion para quitar productos del carrito
export function removeFromMinicart(payload) {
	return {
		type: REMOVE_FROM_MINICART,
		payload: payload
	};
}

// Funcion para realizar el pedido

export function ordering(email, mesa, payload) {
	return async function (dispatch) {
		console.log(payload);
		try {
			axios
				.post(
					`http://localhost:3000/pedido?email=${email}&mesa=${mesa}`,
					payload
				)
				.then((response) => {
					return dispatch({
						type: ORDER,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para eliminar pedido

export function deletePedido(mesa, nombre) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.delete(
					`http://localhost:3000/liberar-pedido?mesa=${mesa}&nombre=${nombre}`,
					{
						headers
					}
				)
				.then((response) => {
					return dispatch({
						type: DELETE_PEDIDOS,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para traer el plan del cliente desde el menu
export function getPlanToMenu(email) {
	return async function (dispatch) {
		try {
			axios
				.get(`http://localhost:3000/menu?email=${email}`)
				.then((response) => {
					return dispatch({
						type: GET_PLAN_TO_MENU,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}
