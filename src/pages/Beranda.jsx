import Layout from '../components/Layout'
import { ABSENSI_HARI_INI, PENGAJUAN_IZIN, TUKAR_SHIFT, KARYAWAN } from '../data/dummyData'
import { Users, UserCheck, Clock, UserX, FileText } from 'lucide-react'

const statusColor = { Hadir: '#10b981', Terlambat: '#f59e0b', 'Tidak Hadir': '#ef4444', Izin: '#3b82f6' }
const statusBg = { Hadir: '#ecfdf5', Terlambat: '#fffbeb', 'Tidak Hadir': '#fef2f2', Izin: '#eff6ff' }

const MetricCard = ({ label, value, icon: Icon, iconBg, valueColor }) => (
  <div style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
    <div>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: valueColor || '#1e293b' }}>{value}</div>
    </div>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={22} color={valueColor || '#2563eb'} />
    </div>
  </div>
)

export default function Beranda() {
  const hadir = ABSENSI_HARI_INI.filter(a => a.status === 'Hadir').length
  const terlambat = ABSENSI_HARI_INI.filter(a => a.status === 'Terlambat').length
  const tidakHadir = ABSENSI_HARI_INI.filter(a => a.status === 'Tidak Hadir').length
  const pending = PENGAJUAN_IZIN.filter(p => p.status === 'Pending').length + TUKAR_SHIFT.filter(t => t.statusAdmin === 'Pending').length
  const totalAktif = KARYAWAN.filter(k => k.status === 'aktif' && k.role !== 'admin').length

  const allPending = [
    ...PENGAJUAN_IZIN.filter(p => p.status === 'Pending').map(p => ({ ...p, tipe: 'Izin' })),
    ...TUKAR_SHIFT.map(t => ({ id: t.id, nama: `${t.pengajuNama} ↔ ${t.penggantiNama}`, tipe: 'Tukar Shift', periodeStart: t.tglPengaju, periodeEnd: t.tglPengganti, status: t.statusAdmin === 'Pending' ? 'Menunggu Admin' : 'Menunggu Rekan' })),
  ]

  return (
    <Layout title="Beranda" subtitle="Selamat datang, Administrator">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Total Karyawan Aktif" value={totalAktif} icon={Users} iconBg="#eff6ff" valueColor="#2563eb" />
        <MetricCard label="Hadir Hari Ini" value={hadir} icon={UserCheck} iconBg="#ecfdf5" valueColor="#10b981" />
        <MetricCard label="Terlambat" value={terlambat} icon={Clock} iconBg="#fffbeb" valueColor="#f59e0b" />
        <MetricCard label="Tidak Hadir" value={tidakHadir} icon={UserX} iconBg="#fef2f2" valueColor="#ef4444" />
        <MetricCard label="Pengajuan Pending" value={pending} icon={FileText} iconBg="#f5f3ff" valueColor="#8b5cf6" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Status Absensi Hari Ini</h2>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {ABSENSI_HARI_INI.map(a => (
            <div key={a.empId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{a.nama}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.empId} • {a.jabatan}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {a.checkIn && <div style={{ fontSize: 11, color: '#64748b', marginBottom: 3 }}>Check-in: {a.checkIn}</div>}
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: statusBg[a.status], color: statusColor[a.status] }}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Pengajuan Menunggu Approval</h2>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>{allPending.length} pengajuan</p>
          {allPending.map(p => (
            <div key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{p.nama}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{p.tipe}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{p.periodeStart}{p.periodeEnd && p.periodeEnd !== p.periodeStart ? ` - ${p.periodeEnd}` : ''}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: p.status === 'Pending' ? '#fffbeb' : p.status === 'Menunggu Admin' ? '#fffbeb' : '#fef9c3', color: p.status === 'Pending' ? '#d97706' : '#92400e', whiteSpace: 'nowrap' }}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
