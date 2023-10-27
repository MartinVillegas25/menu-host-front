import './AppDetails.css';
import mobile1 from '../../../assets/mobile1.png';
import mobile2 from '../../../assets/mobile2.png';
import mobile3 from '../../../assets/mobile4.png';

export default function AppDetails() {
	return (
		<div className="appdet">
			<div className="appdet-circles">
				<div>
					<h3>Gestión integral de menú y precios</h3>
				</div>
				<div>
					<h3>División de cuentas automatizada</h3>
				</div>
				<div>
					<h3>Gestión eficiente de pedidos</h3>
				</div>
			</div>
			<div className="appdet-images">
				<img src={mobile1} alt="" />
				<img src={mobile2} alt="" />
				<img src={mobile3} alt="" />
			</div>
		</div>
	);
}
