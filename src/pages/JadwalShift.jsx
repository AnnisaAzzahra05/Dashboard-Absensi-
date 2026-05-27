import { useState } from 'react'
import Layout from '../components/Layout'
import { SHIFTS, JADWAL_MINGGU, KARYAWAN } from '../data/dummyData'
import { Plus, Edit2, ChevronLeft, ChevronRight, X, Check } from 'lucide-react'

const shiftWarna = { Pagi: '#3b82f6', Siang: '#f59e0b', Malam: '#8b5cf6', Regular: '#10b981', Libur: '#94a3b8' }
const shiftBg = { Pagi: '#eff6ff', Siang: '#fffbeb', Malam: '#f5f3ff', Regular: '#ecfdf5', Libur: '#f8fafc' }

const days = ['Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min', 'Sen']
const dates = ['26/5', '27/5', '28/5', '29/5', '30/5', '31/5', '1/6']

export default function JadwalShift() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ empId: 'EMP001', tglMulai: '', tglSelesai: '', shift: 'Pagi' })

  return (
    <Layout title="Jadwal shift" subtitle="Kelola jadwal kerja karyawan">
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>Jenis Shift</h2>
            <p style={{ fontSize: 12, color: '#94a3b8' }}>{SHIFTS.length} shift terdaftar</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            <Plus size={14} /> Tambah Shift
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {SHIFTS.map(s => (
            <div key={s.id} style={{ border: '1.5px solid #f1f5f9', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.warna, flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{s.nama}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{s.jamMasuk} – {s.jamPulang}</div>
                </div>
              </div>
              <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 7px', color: '#94a3b8' }}><Edit2 size={13} /></button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px', color: '#64748b' }}><ChevronLeft size={15} /></button>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>26 Mei – 1 Jun 2026</span>
            <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px', color: '#64748b' }}><ChevronRight size={15} /></button>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {Object.entries(shiftWarna).slice(0, 4).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748b' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: v }}></div>{k}
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              <Plus size={14} /> Plotting Shift
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #f1f5f9', minWidth: 130 }}>Karyawan</th>
                {days.map((d, i) => (
                  <th key={d} style={{ padding: '10px 8px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: i === 0 ? '#2563eb' : '#64748b', borderBottom: '1px solid #f1f5f9', minWidth: 70 }}>
                    <div>{d}</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{dates[i].split('/')[0]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JADWAL_MINGGU.map((row, ri) => (
                <tr key={row.empId} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{row.nama}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{row.empId}</div>
                  </td>
                  {row.jadwal.map((shift, di) => (
                    <td key={di} style={{ padding: '8px 4px', textAlign: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: shiftBg[shift] || '#f8fafc', color: shiftWarna[shift] || '#94a3b8', display: 'inline-block' }}>{shift}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Jadwal Shift</h2>
        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Plotting shift per karyawan</p>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Pilih Tanggal</label>
          <input type="date" style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
        </div>
        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>4 karyawan dijadwalkan</p>
        {JADWAL_MINGGU.map(row => (
          <div key={row.empId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{row.nama}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{row.empId}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: shiftWarna[row.jadwal[0]] }}></div>
              <span style={{ fontSize: 12, color: '#64748b' }}>{row.jadwal[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 28, width: 400, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Plotting Shift Karyawan</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Karyawan</label>
              <select value={form.empId} onChange={e => setForm({ ...form, empId: e.target.value })} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff' }}>
                {KARYAWAN.filter(k => k.role !== 'admin').map(k => <option key={k.id} value={k.id}>{k.nama} ({k.id})</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              {[['Tanggal Mulai', 'tglMulai'], ['Tanggal Selesai', 'tglSelesai']].map(([label, key]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{label}</label>
                  <input type="date" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Jenis Shift</label>
              {['Pagi', 'Siang', 'Malam', 'Regular', 'Libur'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer', fontSize: 13, color: '#374151' }}>
                  <input type="radio" name="shift" checked={form.shift === s} onChange={() => setForm({ ...form, shift: s })} />
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: shiftBg[s] || '#f8fafc', color: shiftWarna[s] || '#94a3b8' }}>{s}</span>
                  {SHIFTS.find(sh => sh.nama === s) && <span style={{ fontSize: 12, color: '#94a3b8' }}>{SHIFTS.find(sh => sh.nama === s).jamMasuk} – {SHIFTS.find(sh => sh.nama === s).jamPulang}</span>}
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '9px 18px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', color: '#64748b', fontSize: 13 }}>Batal</button>
              <button onClick={() => setShowModal(false)} style={{ padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Simpan Jadwal</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
