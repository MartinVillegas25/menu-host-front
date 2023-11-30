import React, { lazy, Suspense } from 'react';

// Importaciones dinámicas
const ClientHome = lazy(() => import('./ClientHome/ClientHome.jsx'));
const ClientProfile = lazy(() => import('./ClientProfile/ClientProfile.jsx'));
const ClientSideMenu = lazy(() => import('./ClientSideMenu/ClientSideMenu.jsx'));

export default function ClientDashboardHome() {
  return (
    <div className="admin-dashboard">
      <h3 className="admin-menu-title">Monitoreo del salon</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientProfile />
        <ClientSideMenu />
        <ClientHome />
      </Suspense>
    </div>
  );
}
