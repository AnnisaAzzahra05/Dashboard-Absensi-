import { useState } from 'react'
import Layout from '../components/Layout'
import { PENGAJUAN_IZIN, TUKAR_SHIFT } from '../data/dummyData'
import { Check, X, ArrowLeftRight } from 'lucide-react'

const jenisColor = { Sakit: '#fef2f2', 'Cuti Tahunan': '#eff6ff', 'Keperluan Keluarga': '#f5f3ff' }
const jenisText = { Sakit: '#dc2626', 'Cuti Tahunan': '#2563eb', 'Keperluan Keluarga': '#7c3aed' }

const initials = (nama) => nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
const avColors = ['#eff6ff', '#ecfdf5', '#fffbeb', '#f5f3ff']
const avText = ['#2563eb', '#059669', '#d97706', '#7c3aed']

export default function ValidasiPengajuan() {
  const [tab, setTab] = useState('izin')
  const [izin, setIzin] = useState(PENGAJUAN_IZIN)
  const [tukar, setTukar] = useState(TUKAR_SHIFT)

  const handleIzin = (id, action) => setIzin(izin.map(i => i.id === id ? { ...i, status: action === 'setuju' ? 'Disetujui' : 'Ditolak' } : i))
  const handleTukar = (id, action) => setTukar(tukar.map(t => t.id === id ? { ...t, statusAdmin: action === 'setuju' ? 'Disetujui' : 'Ditolak' } : t))

  const pendingIzin = izin.filter(i => i.status === 'Pending').length
  const pendingTukar = tukar.filter(t => t.statusAdmin === 'Pending').length

  return (
    <Layout title="Validasi Pengajuan" subtitle="Kelola pengajuan izin dan tukar shift">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        {[['Pengajuan Izin Pending', pendingIzin, '#f59e0b', '#fffbeb'], ['Tukar Shift Pending', pendingTukar, '#8b5cf6', '#f5f3ff']].map(([l, v, c, bg]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: c }}>{v}</div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {l.includes('Izin') ? <Check size={22} color={c} /> : <ArrowLeftRight size={22} color={c} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid #f1f5f9', display: 'flex' }}>
          {[['izin', `Pengajuan Izin (${izin.length})`], ['tukar', `Tukar Shift (${tukar.length})`]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding: '14px 24px', fontSize: 13, fontWeight: tab === key ? 700 : 500, color: tab === key ? '#2563eb' : '#64748b', background: 'none', border: 'none', borderBottom: tab === key ? '2px solid #2563eb' : '2px solid transparent', cursor: 'pointer' }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding: 20 }}>
          {tab === 'izin' && (
            <>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>Daftar Pengajuan Izin</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {izin.map((item, i) => (
                  <div key={item.id} style={{ border: '1.5px solid #f1f5f9', borderRadius: 10, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: avColors[i % 4], color: avText[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{initials(item.nama)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{item.nama}</div>
                            <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.empId} • {item.jabatan}</div>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: item.status === 'Pending' ? '#fffbeb' : item.status === 'Disetujui' ? '#ecfdf5' : '#fef2f2', color: item.status === 'Pending' ? '#d97706' : item.status === 'Disetujui' ? '#059669' : '#dc2626' }}>{item.status}</span>
                        </div>
                        <div style={{ marginTop: 8, fontSize: 13 }}>
                          <span>Jenis: <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: jenisColor[item.jenis] || '#f8fafc', color: jenisText[item.jenis] || '#64748b' }}>{item.jenis}</span></span>
                        </div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Periode: <strong>{item.periodeStart}{item.periodeEnd !== item.periodeStart ? ` s/d ${item.periodeEnd}` : ''}</strong></div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>Alasan: <strong>{item.alasan}</strong></div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Diajukan: {item.diajukan}</div>
                        {item.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            <button onClick={() => handleIzin(item.id, 'setuju')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600 }}><Check size={13} /> Setuju</button>
                            <button onClick={() => handleIzin(item.id, 'tolak')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: '#fff', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 7, fontSize: 12, fontWeight: 600 }}><X size={13} /> Tolak</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'tukar' && (
            <>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>Daftar Pengajuan Tukar Shift</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tukar.map((item, i) => (
                  <div key={item.id} style={{ border: '1.5px solid #f1f5f9', borderRadius: 10, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: avColors[i % 4], color: avText[i % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11 }}>{initials(item.pengajuNama)}</div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.pengajuNama}</span>
                        </div>
                        <ArrowLeftRight size={14} color="#94a3b8" />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: avColors[(i + 1) % 4], color: avText[(i + 1) % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11 }}>{initials(item.penggantiNama)}</div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.penggantiNama}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: item.statusAdmin === 'Pending' ? '#fffbeb' : item.statusAdmin === 'Disetujui' ? '#ecfdf5' : item.statusAdmin === 'Ditolak' ? '#fef2f2' : '#eff6ff', color: item.statusAdmin === 'Pending' ? '#d97706' : item.statusAdmin === 'Disetujui' ? '#059669' : item.statusAdmin === 'Ditolak' ? '#dc2626' : '#2563eb' }}>
                        {item.statusAdmin === 'Pending' ? 'Menunggu Admin' : item.statusAdmin || 'Menunggu Rekan'}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Tanggal: <strong>{item.tglPengaju}</strong> ↔ <strong>{item.tglPengganti}</strong></div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
                      Shift: <span style={{ background: '#eff6ff', color: '#2563eb', padding: '1px 7px', borderRadius: 5, fontSize: 11, fontWeight: 600 }}>{item.shiftPengaju}</span>
                      <span style={{ margin: '0 5px', color: '#94a3b8' }}>→</span>
                      <span style={{ background: '#fffbeb', color: '#d97706', padding: '1px 7px', borderRadius: 5, fontSize: 11, fontWeight: 600 }}>{item.shiftPengganti}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Persetujuan rekan: <strong style={{ color: item.statusRekan === 'Setuju' ? '#059669' : '#f59e0b' }}>{item.statusRekan}</strong></div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>Diajukan: {item.tglAjukan}</div>
                    {item.statusAdmin === 'Pending' && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button onClick={() => handleTukar(item.id, 'setuju')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600 }}><Check size={13} /> Setuju & Ubah Jadwal</button>
                        <button onClick={() => handleTukar(item.id, 'tolak')} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: '#fff', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 7, fontSize: 12, fontWeight: 600 }}><X size={13} /> Tolak</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
