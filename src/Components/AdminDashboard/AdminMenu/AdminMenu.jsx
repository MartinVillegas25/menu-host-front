import { IoNotifications } from 'react-icons/io5';
import { RxTriangleDown } from 'react-icons/rx';
import './AdminMenu.css';
import CEO from '../../../assets/CEO.jpg';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function AdminMenu() {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<nav className="admin-menu">
			<div className="admin-menu-container">
				<div className="admin-menu-panel">
					<IoNotifications className="admin-menu-notification" />
					<img src={CEO} alt="" className="admin-menu-img" />
					<div>
						<div>
							<h3>Mi cuenta</h3>
							<button onClick={handleClick}>
								<RxTriangleDown />
							</button>
						</div>
						<div className={`${open ? 'panel-open' : 'panel-closed'}`}>
							<a href="">Mi perfil</a>
							<a href="/">Cerrar sesion</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
