import { useState } from 'react'
import Layout from '../components/Layout'
import { KeyRound, Eye, EyeOff, Check } from 'lucide-react'

export default function GantiPassword() {
  const [form, setForm] = useState({ lama: '', baru: '', konfirmasi: '' })
  const [show, setShow] = useState({ lama: false, baru: false, konfirmasi: false })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.baru !== form.konfirmasi) { setError('Password baru dan konfirmasi tidak cocok.'); return }
    if (form.baru.length < 6) { setError('Password minimal 6 karakter.'); return }
    setError('')
    setSuccess(true)
    setForm({ lama: '', baru: '', konfirmasi: '' })
    setTimeout(() => setSuccess(false), 3000)
  }

  const Field = ({ label, key2, placeholder }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type={show[key2] ? 'text' : 'password'} value={form[key2]} onChange={e => setForm({ ...form, [key2]: e.target.value })} placeholder={placeholder} style={{ width: '100%', padding: '10px 40px 10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
        <button type="button" onClick={() => setShow({ ...show, [key2]: !show[key2] })} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8' }}>{show[key2] ? <EyeOff size={15} /> : <Eye size={15} />}</button>
      </div>
    </div>
  )

  return (
    <Layout title="Ganti Password" subtitle="Ubah password akun Anda">
      <div style={{ maxWidth: 440 }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KeyRound size={20} color="#2563eb" /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>Keamanan Akun</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Disarankan mengganti password secara berkala</div>
            </div>
          </div>
          {success && <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#059669', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Password berhasil diubah!</div>}
          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#dc2626', marginBottom: 16 }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <Field label="Password Lama" key2="lama" placeholder="Masukkan password lama" />
            <Field label="Password Baru" key2="baru" placeholder="Minimal 6 karakter" />
            <Field label="Konfirmasi Password Baru" key2="konfirmasi" placeholder="Ulangi password baru" />
            <button type="submit" style={{ width: '100%', padding: 12, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, marginTop: 4 }}>Simpan Password Baru</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
