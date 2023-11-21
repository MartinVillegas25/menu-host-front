import ClientMenu from './ClientMenu/ClientMenu.jsx';
import ClientProfile from './ClientProfile/ClientProfile.jsx';
import ClientSideMenu from './ClientSideMenu/ClientSideMenu.jsx';

export default function ClientDashboard() {
	return (
		<div className="admin-dashboard">
			
			<ClientProfile />
			<ClientSideMenu />
			<ClientMenu />
		</div>
	);
}
