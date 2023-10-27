import ClientMenu from './ClientMenu/ClientMenu.jsx';
import ClientProfile from './ClientProfile/ClientProfile.jsx';
import ClientSideMenu from './ClientSideMenu/ClientSideMenu.jsx';

export default function ClientDashboard() {
	return (
		<div className="admin-dashboard">
			<h3 className="admin-menu-title">Nombre del local</h3>
			<ClientProfile />
			<ClientSideMenu />
			<ClientMenu />
		</div>
	);
}
