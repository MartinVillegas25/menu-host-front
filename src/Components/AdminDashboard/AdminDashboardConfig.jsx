import AdminConfig from './AdminConfig/AdminConfig';
import AdminMenu from './AdminMenu/AdminMenu';
import SideMenu from './SideMenu/SideMenu';

export default function AdminDashboardConfig() {
	return (
		<div className="admin-dashboard">
			<h3 className="admin-menu-title">CONFIGURACION</h3>
			<AdminMenu />
			<SideMenu />
			<AdminConfig />
		</div>
	);
}
