export const USERS = {
  ADMIN001: { id: 'ADMIN001', nama: 'Administrator', role: 'admin', password: 'admin123' },
  EMP001: { id: 'EMP001', nama: 'John Doe', role: 'karyawan', password: 'emp123' },
}

export const KARYAWAN = [
  { id: 'EMP001', nama: 'John Doe', jabatan: 'Supervisor', departemen: 'Production', noHp: '0812-3456-7890', shiftDefault: 'Pagi', status: 'aktif', role: 'karyawan' },
  { id: 'EMP002', nama: 'Jane Smith', jabatan: 'Operator', departemen: 'Production', noHp: '0813-9876-5432', shiftDefault: 'Pagi', status: 'aktif', role: 'karyawan' },
  { id: 'EMP003', nama: 'Robert Johnson', jabatan: 'Operator', departemen: 'Quality Control', noHp: '0857-1122-3344', shiftDefault: 'Siang', status: 'aktif', role: 'karyawan' },
  { id: 'EMP004', nama: 'Maria Garcia', jabatan: 'Admin Staff', departemen: 'Administration', noHp: '0821-5566-7788', shiftDefault: 'Regular', status: 'aktif', role: 'karyawan' },
  { id: 'EMP005', nama: 'David Lee', jabatan: 'Technician', departemen: 'Maintenance', noHp: '0838-4455-6677', shiftDefault: 'Siang', status: 'aktif', role: 'karyawan' },
  { id: 'ADMIN001', nama: 'Administrator', jabatan: 'Admin', departemen: 'Management', noHp: '0811-2233-4455', shiftDefault: '-', status: 'aktif', role: 'admin' },
]

export const SHIFTS = [
  { id: 'SH001', nama: 'Pagi', jamMasuk: '07:00', jamPulang: '15:00', warna: '#3b82f6' },
  { id: 'SH002', nama: 'Siang', jamMasuk: '15:00', jamPulang: '23:00', warna: '#f59e0b' },
  { id: 'SH003', nama: 'Malam', jamMasuk: '23:00', jamPulang: '07:00', warna: '#8b5cf6' },
  { id: 'SH004', nama: 'Regular', jamMasuk: '08:00', jamPulang: '17:00', warna: '#10b981' },
]

export const JADWAL_MINGGU = [
  { empId: 'EMP001', nama: 'John Doe', jadwal: ['Pagi','Siang','Malam','Pagi','Siang','Malam','Pagi'] },
  { empId: 'EMP002', nama: 'Jane Smith', jadwal: ['Pagi','Siang','Malam','Pagi','Siang','Malam','Pagi'] },
  { empId: 'EMP003', nama: 'Robert Johnson', jadwal: ['Pagi','Siang','Malam','Pagi','Siang','Malam','Pagi'] },
  { empId: 'EMP004', nama: 'Maria Garcia', jadwal: ['Regular','Regular','Regular','Regular','Regular','Regular','Regular'] },
]

export const ABSENSI_HARI_INI = [
  { empId: 'EMP001', nama: 'John Doe', jabatan: 'Supervisor', checkIn: '07:05', checkOut: null, status: 'Hadir' },
  { empId: 'EMP002', nama: 'Jane Smith', jabatan: 'Operator', checkIn: '07:15', checkOut: null, status: 'Terlambat' },
  { empId: 'EMP003', nama: 'Robert Johnson', jabatan: 'Operator', checkIn: null, checkOut: null, status: 'Tidak Hadir' },
  { empId: 'EMP004', nama: 'Maria Garcia', jabatan: 'Admin Staff', checkIn: '08:00', checkOut: null, status: 'Hadir' },
]

export const PENGAJUAN_IZIN = [
  { id: 'IZ001', empId: 'EMP002', nama: 'Jane Smith', jabatan: 'Operator', jenis: 'Sakit', periodeStart: '2026-05-27', periodeEnd: '2026-05-27', alasan: 'Sakit demam', diajukan: '26/5/2026, 08.30.00', status: 'Pending' },
  { id: 'IZ002', empId: 'EMP003', nama: 'Robert Johnson', jabatan: 'Operator', jenis: 'Cuti Tahunan', periodeStart: '2026-06-01', periodeEnd: '2026-06-03', alasan: 'Cuti tahunan', diajukan: '25/5/2026, 10.00.00', status: 'Pending' },
  { id: 'IZ003', empId: 'EMP001', nama: 'John Doe', jabatan: 'Supervisor', jenis: 'Cuti Tahunan', periodeStart: '2026-05-20', periodeEnd: '2026-05-21', alasan: 'Keperluan keluarga', diajukan: '18/5/2026, 14.00.00', status: 'Disetujui' },
]

export const TUKAR_SHIFT = [
  { id: 'TS001', pengajuId: 'EMP001', pengajuNama: 'John Doe', penggantiId: 'EMP002', penggantiNama: 'Jane Smith', tglPengaju: '2026-05-27', tglPengganti: '2026-05-28', shiftPengaju: 'Pagi', shiftPengganti: 'Siang', tglAjukan: '25/5/2026', statusRekan: 'Setuju', statusAdmin: 'Pending' },
  { id: 'TS002', pengajuId: 'EMP003', pengajuNama: 'Robert Johnson', penggantiId: 'EMP001', penggantiNama: 'John Doe', tglPengaju: '2026-05-29', tglPengganti: '2026-05-30', shiftPengaju: 'Pagi', shiftPengganti: 'Pagi', tglAjukan: '24/5/2026', statusRekan: 'Menunggu', statusAdmin: null },
]

export const LAPORAN_DATA = [
  { empId: 'EMP001', nama: 'John Doe', jabatan: 'Supervisor', departemen: 'Production', hadir: 1, terlambat: 0, tidakHadir: 0, izin: 0, total: 1 },
  { empId: 'EMP002', nama: 'Jane Smith', jabatan: 'Operator', departemen: 'Production', hadir: 1, terlambat: 1, tidakHadir: 0, izin: 0, total: 1 },
  { empId: 'EMP003', nama: 'Robert Johnson', jabatan: 'Operator', departemen: 'Quality Control', hadir: 0, terlambat: 0, tidakHadir: 1, izin: 0, total: 1 },
  { empId: 'EMP004', nama: 'Maria Garcia', jabatan: 'Admin Staff', departemen: 'Administration', hadir: 1, terlambat: 0, tidakHadir: 0, izin: 0, total: 1 },
]
