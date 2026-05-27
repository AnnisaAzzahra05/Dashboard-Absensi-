import Sidebar from './Sidebar'
import { useAuth } from '../hooks/useAuth'

export default function Layout({ children, title, subtitle }) {
  const { user } = useAuth()
  const initials = user?.nama?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'AD'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>{title}</h1>
            {subtitle && <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{subtitle}</p>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{user?.nama || 'Administrator'}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Administrator • {user?.id || 'ADMIN001'}</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{initials}</div>
          </div>
        </header>
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
