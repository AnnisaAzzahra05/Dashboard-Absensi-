import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Beranda from './pages/Beranda'
import Karyawan from './pages/Karyawan'
import JadwalShift from './pages/JadwalShift'
import AbsensiQR from './pages/AbsensiQR'
import ValidasiPengajuan from './pages/ValidasiPengajuan'
import Laporan from './pages/Laporan'
import GantiPassword from './pages/GantiPassword'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (user.role !== 'admin') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, textAlign: 'center', maxWidth: 360 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🚫</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Akses Ditolak</h2>
        <p style={{ fontSize: 13, color: '#64748b' }}>Halaman ini hanya untuk admin. Silakan login dengan akun admin.</p>
        <button onClick={() => window.location.href = '/'} style={{ marginTop: 16, padding: '10px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Kembali ke Login</button>
      </div>
    </div>
  )
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/beranda" replace /> : <Login />} />
      <Route path="/beranda" element={<ProtectedRoute><Beranda /></ProtectedRoute>} />
      <Route path="/karyawan" element={<ProtectedRoute><Karyawan /></ProtectedRoute>} />
      <Route path="/jadwal" element={<ProtectedRoute><JadwalShift /></ProtectedRoute>} />
      <Route path="/absensi" element={<ProtectedRoute><AbsensiQR /></ProtectedRoute>} />
      <Route path="/validasi" element={<ProtectedRoute><ValidasiPengajuan /></ProtectedRoute>} />
      <Route path="/laporan" element={<ProtectedRoute><Laporan /></ProtectedRoute>} />
      <Route path="/ganti-password" element={<ProtectedRoute><GantiPassword /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
