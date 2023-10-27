import ClientConfig from './ClientConfig/ClientConfig.jsx';

import ClientProfile from './ClientProfile/ClientProfile.jsx';
import ClientSideMenu from './ClientSideMenu/ClientSideMenu.jsx';

export default function ClientDashboardConfig() {
	return (
		<div className="admin-dashboard">
			<h3 className="admin-menu-title">Nombre del local</h3>
			<ClientProfile />
			<ClientSideMenu />
			<ClientConfig />
			{/* <FunctionPanel /> */}
		</div>
	);
}
