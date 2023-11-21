import ClientConfig from './ClientConfig/ClientConfig.jsx';

import ClientProfile from './ClientProfile/ClientProfile.jsx';
import ClientSideMenu from './ClientSideMenu/ClientSideMenu.jsx';

export default function ClientDashboardConfig() {
	return (
		<div className="admin-dashboard">
			
			<ClientProfile />
			<ClientSideMenu />
			<ClientConfig />
			{/* <FunctionPanel /> */}
		</div>
	);
}
