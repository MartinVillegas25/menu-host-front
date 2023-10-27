import AdminMenu from './AdminMenu/AdminMenu';
import ClientsTableHome from './ClientsTableHome/ClientsTableHome.jsx';
import SideMenu from './SideMenu/SideMenu';

export default function AdminDashboardHome() {
	return (
		<div className="admin-dashboard">
			<h3 className="admin-menu-title">INICIO</h3>
			<AdminMenu />
			<SideMenu />
			<ClientsTableHome />
			{/* <FunctionPanel /> */}
		</div>
	);
}
