import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { ABSENSI_HARI_INI } from '../data/dummyData'
import { RefreshCw, Clock } from 'lucide-react'

const statusColor = { Hadir: '#10b981', Terlambat: '#f59e0b', 'Tidak Hadir': '#ef4444' }
const statusBg = { Hadir: '#ecfdf5', Terlambat: '#fffbeb', 'Tidak Hadir': '#fef2f2' }

function QRDisplay({ expired }) {
  if (expired) return (
    <div style={{ width: 240, height: 240, background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: '#94a3b8' }}>
      <Clock size={32} />
      <span style={{ fontSize: 13 }}>QR Expired</span>
    </div>
  )
  return (
    <div style={{ width: 240, height: 240, border: '3px solid #2563eb', borderRadius: 12, padding: 12, background: '#fff' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        {[...Array(10)].map((_, r) => [...Array(10)].map((_, c) => {
          const v = (r * 37 + c * 53 + r * c) % 3 === 0
          return v ? <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width={9} height={9} fill="#1e293b" rx={1} /> : null
        }))}
        <rect x={0} y={0} width={30} height={30} fill="none" stroke="#1e293b" strokeWidth={3} />
        <rect x={4} y={4} width={22} height={22} fill="#1e293b" rx={2} />
        <rect x={70} y={0} width={30} height={30} fill="none" stroke="#1e293b" strokeWidth={3} />
        <rect x={74} y={4} width={22} height={22} fill="#1e293b" rx={2} />
        <rect x={0} y={70} width={30} height={30} fill="none" stroke="#1e293b" strokeWidth={3} />
        <rect x={4} y={74} width={22} height={22} fill="#1e293b" rx={2} />
      </svg>
    </div>
  )
}

export default function AbsensiQR() {
  const [expired, setExpired] = useState(30)
  const [minutes, setMinutes] = useState(29)
  const [seconds, setSeconds] = useState(53)
  const [generated, setGenerated] = useState(true)

  useEffect(() => {
    if (!generated) return
    const t = setInterval(() => {
      setSeconds(s => {
        if (s === 0) { setMinutes(m => { if (m === 0) { setGenerated(false); return 0 } return m - 1 }); return 59 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [generated])

  const handleGenerate = () => { setMinutes(expired - 1); setSeconds(59); setGenerated(true) }

  return (
    <Layout title="Absensi & QR" subtitle="Generate QR code dan pantau absensi">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Pengaturan QR Code</h2>
            <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Generate QR code untuk absensi harian karyawan</p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Waktu Expired (Menit)</label>
              <input type="number" value={expired} onChange={e => setExpired(Number(e.target.value))} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, fontWeight: 600, outline: 'none' }} />
            </div>
            <button onClick={handleGenerate} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, width: '100%', justifyContent: 'center' }}>
              <RefreshCw size={15} /> Generate QR Code Baru
            </button>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>QR Code Aktif</h2>
            {generated && <p style={{ fontSize: 12, color: '#10b981', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> Sisa waktu: <strong>{minutes}m {String(seconds).padStart(2, '0')}s</strong></p>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <QRDisplay expired={!generated} />
              {generated && (
                <>
                  <p style={{ fontSize: 12, color: '#64748b', textAlign: 'center' }}>Scan QR code ini menggunakan aplikasi mobile karyawan</p>
                  <p style={{ fontSize: 11, color: '#94a3b8' }}>Berlaku hingga: {String(new Date().getHours()).padStart(2,'0')}:{String(new Date().getMinutes() + minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</p>
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#1d4ed8', textAlign: 'center' }}>
                    <strong>Catatan:</strong> QR Code akan expired secara otomatis setelah {expired} menit.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Status Absensi Hari Ini</h2>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
            {[['Hadir', ABSENSI_HARI_INI.filter(a => a.status === 'Hadir').length, '#10b981'], ['Terlambat', ABSENSI_HARI_INI.filter(a => a.status === 'Terlambat').length, '#f59e0b'], ['Tidak Hadir', ABSENSI_HARI_INI.filter(a => a.status === 'Tidak Hadir').length, '#ef4444']].map(([l, v, c]) => (
              <div key={l} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          {ABSENSI_HARI_INI.map(a => (
            <div key={a.empId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #f8fafc' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{a.nama}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{a.empId} • {a.jabatan}</div>
                {a.checkIn && <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Check-in: {a.checkIn}</div>}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: statusBg[a.status] || '#f8fafc', color: statusColor[a.status] || '#94a3b8' }}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
