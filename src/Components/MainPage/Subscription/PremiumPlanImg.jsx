import { IoRestaurantSharp } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../../../redux/actions';
import { useEffect } from 'react';
// eslint-disable-next-line react/prop-types
export default function PremiumPlanImg({ handleOpenSubscribe }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPlans());
	}, []);
	const plans = useSelector((state) => state.plans);

	return (
		<div className="subscription-img">
			<IoRestaurantSharp className="icon" />
			<h3>$ {plans.premium} </h3>
			<p>Por mes</p>
			<ul className="subs-list">
				<li>1. Menú digital interactivo</li>
				<li>2. División de cuentas automatizada</li>
				<li>3. Gestión de pedidos eficiente</li>
				<li>4. Precios actualizados en tiempo real</li>
				<li>5. Soporte técnico personalizado</li>
				<li>6. Experiencia culinaria mejorada</li>
			</ul>

			<button className="subs-btn" onClick={handleOpenSubscribe}>
				Comprar ahora
			</button>
		</div>
	);
}
