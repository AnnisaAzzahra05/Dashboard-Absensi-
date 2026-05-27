import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  LayoutDashboard, Users, Clock, QrCode, FileCheck,
  BarChart2, KeyRound, LogOut, Building2
} from 'lucide-react'

const nav = [
  { to: '/beranda', icon: LayoutDashboard, label: 'Beranda' },
  { to: '/karyawan', icon: Users, label: 'Karyawan' },
  { to: '/jadwal', icon: Clock, label: 'Jadwal shift' },
  { to: '/absensi', icon: QrCode, label: 'Absensi & QR' },
  { to: '/validasi', icon: FileCheck, label: 'Validasi Pengajuan' },
]

const navLaporan = [
  { to: '/laporan', icon: BarChart2, label: 'Laporan' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  const linkStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '9px 20px', fontSize: 13, fontWeight: isActive ? 600 : 400,
    color: isActive ? '#2563eb' : '#64748b',
    background: isActive ? '#eff6ff' : 'transparent',
    borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
    borderRadius: '0 6px 6px 0', marginRight: 12, transition: 'all .15s',
    textDecoration: 'none',
  })

  return (
    <aside style={{ width: 220, minWidth: 220, background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '18px 20px 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ background: '#2563eb', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#1e293b' }}>Anugerah Jaya</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Dashboard Admin</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, paddingTop: 12, overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', padding: '8px 20px 4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Menu Utama</div>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} style={linkStyle}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
        <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', padding: '16px 20px 4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Laporan</div>
        {navLaporan.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} style={linkStyle}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid #e2e8f0', padding: '12px 8px' }}>
        <NavLink to="/ganti-password" style={linkStyle}>
          <KeyRound size={15} /> Ganti Password
        </NavLink>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 20px', fontSize: 13, color: '#ef4444', background: 'none', border: 'none', width: '100%', cursor: 'pointer', borderRadius: 6, marginRight: 12 }}>
          <LogOut size={15} /> Logout
        </button>
      </div>
    </aside>
  )
}
