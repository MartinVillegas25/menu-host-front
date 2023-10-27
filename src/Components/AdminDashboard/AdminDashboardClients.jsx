import AdminMenu from './AdminMenu/AdminMenu';
import AllClientsTable from './AllClientsTable/AllClientsTable';
import SideMenu from './SideMenu/SideMenu';

export default function AdminDashboardHome() {
	return (
		<div className="admin-dashboard">
			<AdminMenu />
			<SideMenu />
			<AllClientsTable />
			{/* <FunctionPanel /> */}
		</div>
	);
}
