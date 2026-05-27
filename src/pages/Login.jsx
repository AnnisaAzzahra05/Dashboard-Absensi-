import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LogIn, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(id.trim(), password)
      if (result.ok) {
        navigate('/beranda')
      } else {
        setError('ID atau password salah. Coba lagi.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#dbe9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 4px 24px rgba(37,99,235,.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <LogIn size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Sistem Absensi Karyawan</h1>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>Silakan login untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>ID Karyawan</label>
            <input
              value={id} onChange={e => setId(e.target.value)}
              placeholder="Contoh: ADMIN001"
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', transition: 'border .15s' }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password"
                style={{ width: '100%', padding: '10px 40px 10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', transition: 'border .15s' }}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', padding: 0 }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#dc2626', marginBottom: 16 }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? '#93c5fd' : '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, transition: 'background .15s' }}>
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: 20, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, fontSize: 12 }}>
          <div style={{ color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Demo Credentials:</div>
          <div style={{ color: '#64748b' }}>Admin: <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: 4 }}>ADMIN001</code> / <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: 4 }}>admin123</code></div>
          <div style={{ color: '#64748b', marginTop: 4 }}>Karyawan: <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: 4 }}>EMP001</code> / <code style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: 4 }}>emp123</code></div>
        </div>
      </div>
    </div>
  )
}
