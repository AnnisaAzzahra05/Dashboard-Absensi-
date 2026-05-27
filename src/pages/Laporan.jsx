import { useState } from 'react'
import Layout from '../components/Layout'
import { LAPORAN_DATA, KARYAWAN } from '../data/dummyData'
import { Download, FileText, Table } from 'lucide-react'

export default function Laporan() {
  const [filterEmp, setFilterEmp] = useState('')
  const [tglMulai, setTglMulai] = useState('')
  const [tglAkhir, setTglAkhir] = useState('')

  const filtered = LAPORAN_DATA.filter(r =>
    filterEmp === '' || r.empId === filterEmp
  )

  const total = {
    hadir: filtered.reduce((s, r) => s + r.hadir, 0),
    terlambat: filtered.reduce((s, r) => s + r.terlambat, 0),
    tidakHadir: filtered.reduce((s, r) => s + r.tidakHadir, 0),
    izin: filtered.reduce((s, r) => s + r.izin, 0),
  }

  return (
    <Layout title="Laporan" subtitle="Generate dan unduh laporan absensi">
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: 20, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Filter Laporan</h2>
        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Pilih kriteria untuk generate laporan</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Karyawan</label>
            <select value={filterEmp} onChange={e => setFilterEmp(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff' }}>
              <option value="">Semua Karyawan</option>
              {KARYAWAN.filter(k => k.role !== 'admin').map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Tanggal Mulai</label>
            <input type="date" value={tglMulai} onChange={e => setTglMulai(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Tanggal Akhir</label>
            <input type="date" value={tglAkhir} onChange={e => setTglAkhir(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            <FileText size={15} /> Download PDF
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: '#fff', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            <Table size={15} /> Download Excel
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>Preview Laporan</h2>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>Menampilkan {filtered.length} karyawan</p>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['ID', 'Nama', 'Jabatan', 'Departemen', 'Hadir', 'Terlambat', 'Tidak Hadir', 'Izin', 'Total'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: h === 'ID' || h === 'Nama' || h === 'Jabatan' || h === 'Departemen' ? 'left' : 'center', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.empId} style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{r.empId}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{r.nama}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>{r.jabatan}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>{r.departemen}</td>
                {[
                  [r.hadir, '#ecfdf5', '#059669'],
                  [r.terlambat, '#fffbeb', '#d97706'],
                  [r.tidakHadir, '#fef2f2', '#dc2626'],
                  [r.izin, '#eff6ff', '#2563eb'],
                ].map(([v, bg, c], i) => (
                  <td key={i} style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: bg, color: c, fontSize: 12, fontWeight: 700 }}>{v}</span>
                  </td>
                ))}
                <td style={{ padding: '12px 14px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[['Total Hadir', total.hadir, '#059669'], ['Total Terlambat', total.terlambat, '#d97706'], ['Total Tidak Hadir', total.tidakHadir, '#dc2626'], ['Total Izin', total.izin, '#2563eb']].map(([l, v, c]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 12, border: '1px solid #f1f5f9', padding: '16px 20px' }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c }}>{v}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
