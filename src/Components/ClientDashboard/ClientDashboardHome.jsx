import ClientHome from './ClientHome/ClientHome.jsx';
import ClientProfile from './ClientProfile/ClientProfile.jsx';
import ClientSideMenu from './ClientSideMenu/ClientSideMenu.jsx';

export default function ClientDashboardHome() {
	return (
		<div className="admin-dashboard">
			<h3 className="admin-menu-title">Monitoreo del salon</h3>
			<ClientProfile />
			<ClientSideMenu />
			<ClientHome />
		</div>
	);
}
