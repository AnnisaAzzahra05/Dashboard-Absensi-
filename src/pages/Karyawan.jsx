import { useState } from 'react'
import Layout from '../components/Layout'
import { KARYAWAN } from '../data/dummyData'
import { Search, Plus, Edit2, UserMinus, X, Check } from 'lucide-react'

const initials = (nama) => nama.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
const avColors = ['#eff6ff', '#ecfdf5', '#fffbeb', '#f5f3ff', '#fef2f2']
const avTextColors = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626']

export default function Karyawan() {
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('Semua')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nama: '', noHp: '', role: 'Karyawan', shiftDefault: 'Pagi' })
  const [data, setData] = useState(KARYAWAN)

  const filtered = data.filter(k =>
    (k.nama.toLowerCase().includes(search.toLowerCase()) || k.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterRole === 'Semua' || k.role === filterRole.toLowerCase())
  )

  const handleAdd = () => {
    const newId = 'EMP' + String(data.length + 1).padStart(3, '0')
    setData([...data, { ...form, id: newId, status: 'aktif', role: form.role.toLowerCase(), jabatan: '-', departemen: '-' }])
    setShowModal(false)
    setForm({ nama: '', noHp: '', role: 'Karyawan', shiftDefault: 'Pagi' })
  }

  const handleToggle = (id) => {
    setData(data.map(k => k.id === id ? { ...k, status: k.status === 'aktif' ? 'nonaktif' : 'aktif' } : k))
  }

  return (
    <Layout title="Karyawan" subtitle="Kelola data karyawan toko">
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari karyawan..." style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          </div>
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff' }}>
            <option>Semua</option>
            <option>Karyawan</option>
            <option>Admin</option>
          </select>
          <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            <Plus size={15} /> Tambah Karyawan
          </button>
        </div>

        <div style={{ padding: '12px 20px 8px', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Daftar Karyawan</span>
          <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8 }}>{filtered.length} karyawan</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['ID', 'Nama', 'Jabatan', 'Departemen', 'No. HP', 'Shift Default', 'Role', 'Status', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => (
              <tr key={k.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{k.id}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: avColors[i % 5], color: avTextColors[i % 5], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{initials(k.nama)}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{k.nama}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{k.jabatan}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{k.departemen}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{k.noHp}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{k.shiftDefault}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: k.role === 'admin' ? '#f5f3ff' : '#ecfdf5', color: k.role === 'admin' ? '#7c3aed' : '#059669' }}>{k.role === 'admin' ? 'Admin' : 'Karyawan'}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20, background: k.status === 'aktif' ? '#ecfdf5' : '#f1f5f9', color: k.status === 'aktif' ? '#059669' : '#64748b' }}>{k.status === 'aktif' ? 'Aktif' : 'Nonaktif'}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', color: '#64748b' }}><Edit2 size={13} /></button>
                    <button onClick={() => handleToggle(k.id)} disabled={k.id === 'ADMIN001'} style={{ padding: '4px 8px', border: '1px solid', borderRadius: 6, background: '#fff', borderColor: k.id === 'ADMIN001' ? '#e2e8f0' : '#fecaca', color: k.id === 'ADMIN001' ? '#cbd5e1' : '#dc2626', cursor: k.id === 'ADMIN001' ? 'not-allowed' : 'pointer' }}><UserMinus size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 28, width: 420, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Tambah Karyawan Baru</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8' }}><X size={18} /></button>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#1d4ed8', marginBottom: 18 }}>
              ID karyawan dan password sementara akan digenerate otomatis oleh sistem.
            </div>
            {[['Nama Lengkap', 'nama', 'text', 'Contoh: Hendra Gunawan'], ['No. HP', 'noHp', 'text', '0812-xxxx-xxxx']].map(([label, key, type, placeholder]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              {[['Role', 'role', ['Karyawan', 'Admin']], ['Shift Default', 'shiftDefault', ['Pagi', 'Siang', 'Malam', 'Regular']]].map(([label, key, opts]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{label}</label>
                  <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff' }}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '9px 18px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#fff', color: '#64748b', fontSize: 13 }}>Batal</button>
              <button onClick={handleAdd} style={{ padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Simpan</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
