// src/components/Dashboard.tsx
import {
  AlertCircle, BarChart3, Car, ChevronDown, Globe, LogOut, Map, Menu,
  Package, User, X
} from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';
import ActivityChart from './ActivityChart';
import Devices from './Devices';
import Drivers from './Drivers';
import EmergencyAlert from './emergency';
import EngineTelemetry from './EngineTelemetry';
import Events from './Events';
import FuelManagement from './fuelManagement';
import Login from './login';
import Logs from './Logs';
import MapOverview from './MapOverview';
import AudioVideoMonitoring from './monitoring';
import NotificationCenter from './notifications';
import Signup from './register';
import RemindersPanel from './RemindersPanel';
import Reports from './Reports';
import Sensors from './Sensors';
import ServiceMaintenance from './serviceMaintenence';
import SettingsPage from './setting';
import Sidebar from './Sidebar';
import TabsContent from './tabsContent';
import TimeManagement from './TimeManagement';
import Tools from './Tools';
import TrackingMapView from './trackingMapView';
import Trips from './Trips';
import VehicleProfile from './VehicleProfile';
import AccountProfile from './profile';

// ==================== i18n SYSTEM ====================
type Language = 'id' | 'en';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    'Total Cameras': 'Total Cameras',
    'Recording': 'Recording',
    'Offline': 'Offline',
    'View All Vehicle': 'View All Vehicles',
    'Siaran Langsung': 'Live Streaming',
    'Settings': 'Settings',
    'Role & Permission Management': 'Role & Permission Management',
    'Edit Hak Akses': 'Edit Permissions',
    'Multi-Factor Authentication (MFA)': 'Multi-Factor Authentication (MFA)',
    'Wajib untuk Admin & Kepala Dinas': 'Required for Admin & Department Head',
    'Vehicle Threshold Settings': 'Vehicle Threshold Settings',
    'Fuel Low Alert': 'Fuel Low Alert',
    'Max Speed Limit': 'Max Speed Limit',
    'Service Interval': 'Service Interval',
    'Notification Channels': 'Notification Channels',
    'Push Notification (App)': 'Push Notification (App)',
    'Email': 'Email',
    'SMS (Critical Only)': 'SMS (Critical Only)',
    'QR Code Management': 'QR Code Management',
    'Generate QR Baru (100 unit)': 'Generate New QR (100 units)',
    'Download Semua QR (PDF)': 'Download All QR (PDF)',
    'Backup & Security Summary': 'Backup & Security Summary',
    'Uptime Bulan Ini': 'Uptime This Month',
    'Daily': 'Daily',
    'Encrypted Backup': 'Encrypted Backup',
    'Data Encryption': 'Data Encryption',
    'Lokasi': 'Locations',
    'Cloud + On-Premise': 'Cloud + On-Premise',

    'Audio/Video': 'Audio/Video Monitoring',
    'Lihat Semua Kendaraan': 'View All Vehicles',
    'Total Kamera': 'Total Cameras',
    // 'Live Streaming': 'Siaran Langsung',
    'Sedang Merekam': 'Recording',
    'Cari plat nomor atau tipe kamera...': 'Search license plate or camera type...',
    'Semua': 'All',
    'Live': 'Live',
    'Menampilkan': 'Showing',
    'dari': 'of',
    'kamera': 'cameras',
    'kendaraan terdaftar': 'registered vehicles',
    'Terakhir aktif': 'Last seen',
    'Daftar Kendaraan': 'Vehicle List',

    'Emergency / Accident Alert': 'Emergency / Accident Alert',
    'ACTIVE EMERGENCY ALERT!': 'ACTIVE EMERGENCY ALERT!',
    'Vehicle detected in accident': 'Vehicle detected in accident',
    'Call Driver Now': 'Call Driver Now',
    'Send Medical & Police Team': 'Send Medical & Police Team',
    'No Active Emergency': 'No Active Emergency',
    'All vehicles are safe': 'All vehicles are safe',
    'Emergency History (Last 7 Days)': 'Emergency History (Last 7 Days)',
    'Resolved': 'Resolved',
    'Accident Detected': 'Accident Detected',
    'Manual Emergency Button': 'Manual Emergency Button',
    'Hard Braking + Impact': 'Hard Braking + Impact',
    'Reports': 'Reports',
    'Generate Report': 'Generate Report',
    'Total Reports': 'Total Reports',
    'This Month': 'This Month',
    'Pending': 'Pending',
    'Archived': 'Archived',
    'Recent Reports': 'Recent Reports',
    'Report Schedule': 'Report Schedule',
    'Download': 'Download',
    'Ready': 'Ready',
    'Daily': 'Daily',
    'Weekly': 'Weekly',
    'Monthly': 'Monthly',
    'Pro Tip': 'Pro Tip',
    'Fleet Summary Report': 'Fleet Summary Report',
    'Overview of fleet performance and metrics': 'Overview of fleet performance and metrics',
    'Driver Performance': 'Driver Performance',
    'Individual driver metrics and compliance': 'Individual driver metrics and compliance',
    'Fuel Consumption Analysis': 'Fuel Consumption Analysis',
    'Detailed fuel usage and cost analysis': 'Detailed fuel usage and cost analysis',
    'Maintenance Schedule': 'Maintenance Schedule',
    'Upcoming maintenance tasks and history': 'Upcoming maintenance tasks and history',

    'Daily Summary': 'Daily Summary',
    'Daily fleet overview': 'Daily fleet overview',
    'Weekly Performance': 'Weekly driver and vehicle performance',
    'Monthly Report': 'Monthly Report',
    'Comprehensive monthly analysis': 'Comprehensive monthly analysis',
    'Compliance Report': 'Compliance Report',
    'Regulatory compliance tracking': 'Regulatory compliance tracking',

    'January 1-15, 2024': 'January 1-15, 2024',
    'January 2024': 'January 2024',
    'Q1 2024': 'Q1 2024',

    'Schedule automated reports to be generated and sent to your email daily, weekly, or monthly. This helps you stay informed about your fleet\'s performance without manual effort.': 
    'Schedule automated reports to be generated and sent to your email daily, weekly, or monthly. This helps you stay informed about your fleet\'s performance without manual effort.',
    'Time Management': 'Time Management',
    'Schedule Shift': 'Schedule Shift',
    'Active Shifts': 'Active Shifts',
    'Total Hours': 'Total Hours',
    'Compliant': 'Compliant',
    'Issues': 'Issues',
    'Driver Shifts': 'Driver Shifts',
    'Driver': 'Driver',
    'Date': 'Date',
    'Time': 'Time',
    'Drive Time': 'Drive Time',
    'Break': 'Break',
    'Status': 'Status',
    'Compliance': 'Compliance',
    'Active': 'Active',
    'Scheduled': 'Scheduled',
    'Completed': 'Completed',
    'Warning': 'Warning',
    'Drive Time Limits': 'Drive Time Limits',
    'Daily Driving': 'Daily Driving',
    'Remaining': 'Remaining',
    'Fuel Management': 'Fuel Management',
    'Manual Fuel Input': 'Manual Fuel Input',
    'Total Fuel Cost': 'Total Fuel Cost',
    'Total Liters': 'Total Liters',
    'Average Consumption': 'Average Consumption',
    'Recent Refuel History': 'Recent Refuel History',
    'Low Fuel Alert': 'Low Fuel Alert',
    'Fuel Level': 'Fuel Level',
    'Last Refill': 'Last Refill',
    'Refill Map This Month': 'Refill Map This Month',
    'Click point for station & transaction detail': 'Click point for station & transaction details',
    'Service & Maintenance': 'Service & Maintenance',
    'Scan Mechanic QR': 'Scan Mechanic QR',
    'Upcoming': 'Upcoming',
    'Overdue': 'Overdue',
    'In Service': 'In Service',
    'Total Cost This Month': 'Total Cost This Month',
    'Upcoming Service Reminders': 'Upcoming Service Reminders',
    'Due Date': 'Due Date',
    'Predictive Maintenance': 'Predictive Maintenance',
    'Prediction Accuracy': 'Prediction Accuracy',
    'Estimated': 'Estimated',
    'Service History': 'Service History',
    'Service Type': 'Service Type',
    'Cost': 'Cost',
    'Mechanic': 'Mechanic',

    'Devices': 'Devices',
    'Add Device': 'Add Device',
    'Vehicle': 'Vehicle',
    'Type': 'Type',
    'Model': 'Model',
    'Firmware': 'Firmware',
    'Signal Strength': 'Signal Strength',
    'Last Seen': 'Last Seen',
    'Configure': 'Configure',
    'Details': 'Details',
    'Online': 'Online',
    // 'Offline': 'Offline',
    'IMEI': 'IMEI',

    // Global / Header
    'Map Overview': 'Map Overview',
    'Assets Car': 'Vehicle Assets',
    'Trips Car': 'Trips',
    'My Events': 'Events',
    'Drivers Data': 'Drivers',
    'Sensors': 'Sensors',
    'Logs Driver': 'Driver Logs',
    'Time Driver': 'Driver Time',
    'Other Tools': 'Tools',
    'Report Car': 'Reports',
    'Maintenance': 'Maintenance',
    'Fuel Car': 'Fuel Management',
    'Tracking': 'Tracking',
    'Engine Car': 'Engine Telemetry',
    // 'Audio/Video': 'Audio/Video Monitoring',
    'Emergency': 'Emergency Alert',
    'Notifications': 'Notifications',
    // 'Settings': 'Settings',
    'Profile Saya': 'My Profile',
    'Login': 'Login',
    'SignUp': 'Sign Up',
    'Keluar': 'Logout',
    'Soon': 'Coming Soon',

    // MapOverview
    'Total Vehicles': 'Total Vehicles',
    'Active Trips': 'Active Trips',
    'Alerts': 'Alerts',
    'Drivers Online': 'Drivers Online',
    'Interactive Map': 'Interactive Map',
    'Displaying live vehicle locations': 'Displaying live vehicle locations',
    'Active Vehicles': 'Active Vehicles',
    'In Transit': 'In Transit',
    'Idle': 'Idle',
    'Active Alerts': 'Active Alerts',
    'Speeding': 'Speeding',
    'Low Fuel': 'Low Fuel',
    'Fleet Summary': 'Fleet Summary',
    'Avg Speed': 'Avg Speed',

    // Trips
    'Trips Data': 'Trips Data',
    'Create New Trip': 'Create New Trip',
    'Total Trips': 'Total Trips',
    'Total Distance': 'Total Distance',
    'Trips This Week': 'Trips This Week',
    'Trip Status Overview': 'Trip Status Overview',
    'Recent Trips': 'Recent Trips',
    'Route': 'Route',
    'Schedule': 'Schedule',
    'Distance': 'Distance',
    'Fuel': 'Fuel',
    'Ongoing': 'Ongoing',

    // Events
    'Events Data': 'Events Data',
    'All Severity': 'All Severity',
    'Critical': 'Critical',
    'Info': 'Info',
    'Last 24 Hours': 'Last 24 Hours',
    'Last 7 Days': 'Last 7 Days',
    'Last 30 Days': 'Last 30 Days',
    'Location': 'Location',
    'Current Speed': 'Current Speed',
    'Speed Limit': 'Speed Limit',
    'Hard Braking': 'Hard Braking',
    'Harsh Acceleration': 'Harsh Acceleration',
    'Maintenance Alert': 'Maintenance Alert',

    // VehicleProfile
    'Oil': 'Oil',
    'Battery': 'Battery',

    // ActivityChart & Reminders
    'Activity': 'Activity',
    'View All': 'View All',
    'Reminders (1)': 'Reminders (1)',
    'Service Reminders': 'Service Reminders',
    'Add': 'Add',
  },
  id: {
    'Total Cameras': 'Total Kamera',
    'Live Streaming': 'Siaran Langsung',
    'Recording': 'Sedang Merekam',
    'Offline': 'Offline',
    'View All Vehicle': 'Lihat Semua Kendaraan',
    
    'Settings': 'Pengaturan',
    'Role & Permission Management': 'Manajemen Role & Hak Akses',
    'Edit Hak Akses': 'Edit Hak Akses',
    'Multi-Factor Authentication (MFA)': 'Autentikasi Multi-Faktor (MFA)',
    'Wajib untuk Admin & Kepala Dinas': 'Wajib untuk Admin & Kepala Dinas',
    'Vehicle Threshold Settings': 'Pengaturan Ambang Batas Kendaraan',
    'Fuel Low Alert': 'Peringatan BBM Rendah',
    'Max Speed Limit': 'Batas Kecepatan Maksimal',
    'Service Interval': 'Interval Servis',
    'Notification Channels': 'Saluran Notifikasi',
    'Push Notification (App)': 'Notifikasi Push (Aplikasi)',
    'Email': 'Email',
    'SMS (Critical Only)': 'SMS (Khusus Kritis)',
    'QR Code Management': 'Manajemen Kode QR',
    'Generate QR Baru (100 unit)': 'Generate QR Baru (100 unit)',
    'Download Semua QR (PDF)': 'Download Semua QR (PDF)',
    'Backup & Security Summary': 'Ringkasan Backup & Keamanan',
    'Uptime Bulan Ini': 'Uptime Bulan Ini',
    'Daily': 'Harian',
    'Encrypted Backup': 'Backup Terenkripsi',
    'Data Encryption': 'Enkripsi Data',
    'Lokasi': 'Lokasi',
    'Cloud + On-Premise': 'Cloud + On-Premise',

    'Audio/Video': 'Audio/Video Monitoring',
    'Lihat Semua Kendaraan': 'View All Vehicles',
    'Total Kamera': 'Total Cameras',
    'Live Streaming': 'Live Streaming',
    'Sedang Merekam': 'Recording',
    'Cari plat nomor atau tipe kamera...': 'Search license plate or camera type...',
    'Semua': 'All',
    'Live': 'Live',
    'Menampilkan': 'Showing',
    'dari': 'of',
    'kamera': 'cameras',
    'kendaraan terdaftar': 'registered vehicles',
    'Terakhir aktif': 'Last seen',
    'Daftar Kendaraan': 'Vehicle List',
    
    'Emergency / Accident Alert': 'Peringatan Darurat / Kecelakaan',
    'ACTIVE EMERGENCY ALERT!': 'PERINGATAN DARURAT AKTIF!',
    'Vehicle detected in accident': 'Kendaraan terdeteksi mengalami kecelakaan',
    'Call Driver Now': 'Hubungi Driver Sekarang',
    'Send Medical & Police Team': 'Kirim Tim Medis & Polisi',
    'No Active Emergency': 'Tidak Ada Darurat Aktif',
    'All vehicles are safe': 'Semua kendaraan dalam kondisi aman',
    'Emergency History (Last 7 Days)': 'Riwayat Darurat (7 Hari Terakhir)',
    'Resolved': 'Selesai',
    'Accident Detected': 'Kecelakaan Terdeteksi',
    'Manual Emergency Button': 'Tombol Darurat Manual Ditekan',
    'Hard Braking + Impact': 'Pengereman Keras + Benturan',

    // Notification Center
    'Notification Center': 'Pusat Notifikasi',
    'Mark all as read': 'Tandai semua telah dibaca',
    'Unread': 'Belum Dibaca',
    'Total This Month': 'Total Bulan Ini',
    'Today\'s Reminders': 'Pengingat Hari Ini',
    'All Notifications': 'Semua Notifikasi',
    'Low Fuel': 'Bahan Bakar Rendah',
    'B 2345 MNO only 15% left': 'B 2345 MNO hanya tersisa 15%',
    'Service Overdue': 'Service Terlambat',
    'B 7890 JKL overdue by 1,200 km': 'B 7890 JKL sudah lewat 1.200 km',
    'Emergency Button Pressed': 'Tombol Darurat Ditekan',
    'Driver Budi P. (B 9012 DEF)': 'Driver Budi P. (B 9012 DEF)',
    'Exited Area': 'Keluar Area',
    'B 1234 ABC exited office zone': 'B 1234 ABC keluar zona kantor',
    '10 minutes ago': '10 menit lalu',
    '2 hours ago': '2 jam lalu',
    '1 day ago': '1 hari lalu',
    '3 days ago': '3 hari lalu',
    'Reports': 'Laporan',
    'Generate Report': 'Buat Laporan',
    'Total Reports': 'Total Laporan',
    'This Month': 'Bulan Ini',
    'Pending': 'Menunggu',
    'Archived': 'Diarsipkan',
    'Recent Reports': 'Laporan Terbaru',
    'Report Schedule': 'Jadwal Laporan',
    'Download': 'Unduh',
    'Ready': 'Siap',
    'Daily': 'Harian',
    'Weekly': 'Mingguan',
    'Monthly': 'Bulanan',
    'Pro Tip': 'Tips Pro',

    'Fleet Summary Report': 'Laporan Ringkasan Armada',
    'Overview of fleet performance and metrics': 'Ikhtisar performa dan metrik armada',
    'Driver Performance': 'Performa Supir',
    'Individual driver metrics and compliance': 'Metrik dan kepatuhan supir individu',
    'Fuel Consumption Analysis': 'Analisis Konsumsi BBM',
    'Detailed fuel usage and cost analysis': 'Analisis detail penggunaan dan biaya BBM',
    'Maintenance Schedule': 'Jadwal Perawatan',
    'Upcoming maintenance tasks and history': 'Tugas perawatan mendatang dan riwayat',

    'Daily Summary': 'Ringkasan Harian',
    'Daily fleet overview': 'Ikhtisar armada harian',
    'Weekly Performance': 'Performa Mingguan',
    'Weekly driver and vehicle performance': 'Performa supir dan kendaraan mingguan',
    'Monthly Report': 'Laporan Bulanan',
    'Comprehensive monthly analysis': 'Analisis bulanan menyeluruh',
    'Compliance Report': 'Laporan Kepatuhan',
    'Regulatory compliance tracking': 'Pelacakan kepatuhan peraturan',

    'January 1-15, 2024': '1-15 Januari 2024',
    'January 2024': 'Januari 2024',
    'Q1 2024': 'Kuartal 1 2024',

    'Schedule automated reports to be generated and sent to your email daily, weekly, or monthly. This helps you stay informed about your fleet\'s performance without manual effort.': 
    'Jadwalkan laporan otomatis untuk dibuat dan dikirim ke email Anda setiap hari, minggu, atau bulan. Ini membantu Anda tetap mendapat informasi tentang performa armada tanpa usaha manual.',

    'Sensors': 'Sensor',
    'Sensors Dashboard': 'Dashboard Sensor',
    'Total Sensors': 'Total Sensor',
    'Active': 'Aktif',
    'Low Battery': 'Baterai Rendah',
    'Weak Signal': 'Sinyal Lemah',
    'Refresh': 'Segarkan',
    'Refreshing...': 'Menyegarkan...',
    'Export CSV': 'Ekspor CSV',
    'Add Sensor': 'Tambah Sensor',
    'Add New Sensor': 'Tambah Sensor Baru',
    'Filter by status': 'Filter berdasarkan status',
    'All': 'Semua',
    'Inactive': 'Tidak Aktif',
    'Showing': 'Menampilkan',
    'of': 'dari',
    'sensors': 'sensor',
    'Sensor': 'Sensor',
    'Vehicle': 'Kendaraan',
    'Type': 'Tipe',
    'Status': 'Status',
    'Value': 'Nilai',
    'Battery': 'Baterai',
    'Signal': 'Sinyal',
    'Strong': 'Kuat',
    'Weak': 'Lemah',
    'Sensor Name': 'Nama Sensor',
    'e.g. Pressure Sensor Front': 'misal Sensor Tekanan Depan',
    'Initial Battery (%)': 'Baterai Awal (%)',
    'Cancel': 'Batal',
    'Location': 'Lokasi',
    'Temperature': 'Suhu',
    'Fuel': 'BBM',
    'Speed': 'Kecepatan',
    'Door': 'Pintu',
    'Diagnostics': 'Diagnostik',

    'Tools & Utilities': 'Alat & Utilitas',
    'Fleet Management Tools': 'Alat Manajemen Armada',
    'Add Tool': 'Tambah Alat',
    'Open': 'Buka',
    'Maintenance Scheduler': 'Penjadwal Perawatan',
    'Route Planner': 'Perencana Rute',
    'Pengaturan': 'Pengaturan',
    'Alert Preferences': 'Preferensi Peringatan',
    'Configure which alerts to receive': 'Atur peringatan mana yang ingin diterima',
    'Konfigurasi': 'Konfigurasi',

    'GPS Settings': 'Pengaturan GPS',
    'Adjust GPS tracking frequency': 'Atur frekuensi pelacakan GPS',
    'Speed Limits': 'Batas Kecepatan',
    'Set speed limit thresholds by zone': 'Atur ambang batas kecepatan berdasarkan zona',
    'Report Templates': 'Template Laporan',
    'Customize report templates': 'Sesuaikan template laporan',
    'Utilities': 'Utilitas',
    'Backup Database': 'Cadangkan Database',
    'Create and manage database backups': 'Buat dan kelola cadangan database',
    'Backup Now': 'Cadangkan Sekarang',
    'Export Data': 'Ekspor Data',
    'Export data in CSV or Excel format': 'Ekspor data dalam format CSV atau Excel',
    'Export': 'Ekspor',
    'Import Data': 'Impor Data',
    'Import driver or vehicle data': 'Impor data supir atau kendaraan',
    'Import': 'Impor',
    'Maintenance': 'Perawatan',
    'Planning': 'Perencanaan',
    'Documentation': 'Dokumentasi',
    'Analytics': 'Analitik',
    'System Health': 'Kesehatan Sistem',
    'Check system status and performance': 'Periksa status dan performa sistem',
    'Check Status': 'Periksa Status',
    'Fuel Management': 'Manajemen BBM',
    'Manual Fuel Input': 'Input Manual Isi BBM',
    'Total Fuel Cost': 'Total Pengeluaran BBM',
    'Total Liters': 'Total Liter',
    'Average Consumption': 'Rata-rata Konsumsi',
    'Recent Refuel History': 'Histori Pengisian Terakhir',
    'Low Fuel Alert': 'BBM Rendah (Peringatan)',
    'Fuel Level': 'Level BBM',
    'Last Refill': 'Terakhir Isi',
    'Refill Map This Month': 'Peta Lokasi Pengisian Bulan Ini',
    'Click point for station & transaction detail': 'Klik titik untuk detail SPBU & transaksi',
    'Service & Maintenance': 'Servis & Perawatan',
    'Scan Mechanic QR': 'Scan QR Mekanik',
    'Upcoming': 'Akan Datang',
    'Overdue': 'Terlambat',
    'In Service': 'Sedang Diservis',
    'Total Cost This Month': 'Total Biaya Bulan Ini',
    'Upcoming Service Reminders': 'Pengingat Servis Mendatang',
    'Due Date': 'Batas',
    'Predictive Maintenance': 'Perawatan Prediktif',
    'Prediction Accuracy': 'Akurasi Prediksi',
    'Estimated': 'Estimasi',
    'Service History': 'Riwayat Servis',
    'Service Type': 'Jenis Servis',
    'Cost': 'Biaya',
    'Mechanic': 'Mekanik',
    'Date': 'Tanggal',
    'Completed': 'Selesai',

    'Devices': 'Perangkat',
    'Add Device': 'Tambah Perangkat',
    'Model': 'Model',
    'Firmware': 'Firmware',
    'Signal Strength': 'Kekuatan Sinyal',
    'Last Seen': 'Terakhir Aktif',
    'Configure': 'Konfigurasi',
    'Details': 'Detail',
    'Online': 'Online',
    'Offline': 'Offline',
    'IMEI': 'IMEI',

    'Map Overview': 'Ikhtisar Peta',
    'Assets Car': 'Aset Kendaraan',
    'Trips Car': 'Perjalanan',
    'My Events': 'Event Saya',
    'Drivers Data': 'Data Supir',
    'Logs Driver': 'Log Supir',
    'Time Driver': 'Waktu Supir',
    'Other Tools': 'Alat Lainnya',
    'Report Car': 'Laporan',
    'Fuel Car': 'Manajemen BBM',
    'Tracking': 'Pelacakan',
    'Engine Car': 'Telemetri Mesin',
    'Audio/Video': 'Monitoring Audio/Video',
    'Emergency': 'Darurat',
    'Notifications': 'Notifikasi',
    'Settings': 'Pengaturan',
    'Profile Saya': 'Profil Saya',
    'Login': 'Masuk',
    'SignUp': 'Daftar',
    'Keluar': 'Keluar',
    'Soon': 'Segera Hadir',

    'Time Management': 'Manajemen Waktu',
    'Schedule Shift': 'Jadwalkan Shift',
    'Active Shifts': 'Shift Aktif',
    'Total Hours': 'Total Jam',
    'Compliant': 'Sesuai Aturan',
    'Issues': 'Masalah',
    'Driver Shifts': 'Shift Supir',
    'Driver': 'Supir',
    'Time': 'Waktu',
    'Drive Time': 'Waktu Mengemudi',
    'Break': 'Istirahat',
    'Compliance': 'Kepatuhan',
    'Scheduled': 'Terjadwal',
    'Warning': 'Peringatan',
    'Drive Time Limits': 'Batas Waktu Mengemudi',
    'Daily Driving': 'Mengemudi Harian',
    'Remaining': 'Sisa',

    'Total Vehicles': 'Total Kendaraan',
    'Active Trips': 'Perjalanan Aktif',
    'Alerts': 'Peringatan',
    'Drivers Online': 'Supir Online',
    'Interactive Map': 'Peta Interaktif',
    'Displaying live vehicle locations': 'Menampilkan lokasi kendaraan secara langsung',
    'Active Vehicles': 'Kendaraan Aktif',
    'In Transit': 'Sedang Berjalan',
    'Idle': 'Berhenti',
    'Active Alerts': 'Peringatan Aktif',
    'Speeding': 'Ngebut',
    'Fleet Summary': 'Ringkasan Armada',
    'Avg Speed': 'Kecepatan Rata-rata',

    'Trips Data': 'Data Perjalanan',
    'Create New Trip': 'Buat Perjalanan Baru',
    'Total Trips': 'Total Perjalanan',
    'Total Distance': 'Total Jarak',
    'Trips This Week': 'Perjalanan Minggu Ini',
    'Trip Status Overview': 'Ikhtisar Status Perjalanan',
    'Recent Trips': 'Perjalanan Terbaru',
    'Route': 'Rute',
    'Schedule': 'Jadwal',
    'Distance': 'Jarak',
    'Ongoing': 'Sedang Berjalan',

    'Events Data': 'Data Event',
    'All Severity': 'Semua Tingkat',
    'Critical': 'Kritis',
    'Info': 'Info',
    'Last 24 Hours': '24 Jam Terakhir',
    'Last 7 Days': '7 Hari Terakhir',
    'Last 30 Days': '30 Hari Terakhir',
    'Current Speed': 'Kecepatan Saat Ini',
    'Speed Limit': 'Batas Kecepatan',
    'Hard Braking': 'Pengereman Keras',
    'Harsh Acceleration': 'Akselerasi Kasar',
    'Maintenance Alert': 'Peringatan Perawatan',

    'Oil': 'Oli',

    'Activity': 'Aktivitas',
    'View All': 'Lihat Semua',
    'Reminders (1)': 'Pengingat (1)',
    'Service Reminders': 'Pengingat Servis',
    'Add': 'Tambah',
  },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}>({
  lang: 'id',
  setLang: () => {},
  t: (key) => key,
});

export const useTranslation = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


// ==================== MAIN DASHBOARD ====================
function Dashboard() {
  const [activePage, setActivePage] = useState('map');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const renderPage = () => {
    switch (activePage) {
      case 'assets':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VehicleProfile />
              </div>
              <div className="space-y-6">
                <ActivityChart />
                <RemindersPanel />
              </div>
            </div>
            <div className="mt-6">
              <TabsContent />
            </div>
          </div>
        );
      case 'map':
        return <MapOverview />;
      case 'trips':
        return <Trips />;
      case 'events':
        return <Events />;
      case 'drivers':
        return <Drivers />;
      case 'sensors':
        return <Sensors />;
      case 'devices':
        return <Devices />;
      case 'logs':
        return <Logs />;
      case 'time':
        return <TimeManagement />;
      case 'tools':
        return <Tools />;
      case 'reports':
        return <Reports />;
      case 'maintenance':
        return <ServiceMaintenance />;
      case 'fuel':
        return <FuelManagement />;
      case 'tracking':
        // return <Reports />;
        return <TrackingMapView />;
      case 'telemetry':
        return <EngineTelemetry />;
      case 'monitoring':
        return <AudioVideoMonitoring />;
      case 'emergency':
        return <EmergencyAlert />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <AccountProfile />;
      case 'login':
      return <Login activePage={() => setActivePage('assets')} onNavigateToRegister={() => setActivePage('register')} />;
      case 'register':
        return <Signup onNavigateToLogin={() => setActivePage('login')} />;
      default:
        return <VehicleProfile />;
    }
  };

  function Header({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) {
    const { lang, setLang, t } = useTranslation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const user = { name: 'Ahmad Fauzi', email: 'ahmad@company.co' };
    const languages = [
      { code: 'id', name: 'Indonesia', flag: 'ID' },
      { code: 'en', name: 'English', flag: 'US' },
    ];
    const currentLang = languages.find(l => l.code === lang) || languages[0];

    const pageTitles: Record<string, string> = {
      map: t('Map Overview'), assets: t('Assets Car'), trips: t('Trips Car'),
      events: t('My Events'), login: t('Login'), register: t('SignUp'),
    };
    const currentTitle = pageTitles[activePage] || 'Dashboard';

    const getInitials = (n: string) => n.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2);

    return (
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={onMobileMenuToggle} className="lg:hidden"><Menu className="w-6 h-6" /></button>
            {/* <h1 className="text-md md:text-xl font-semibold truncate">{currentTitle}</h1> */}
          </div>

          <div className="flex items-center space-x-1">
            {/* Language */}
            <div className="relative z-[4499999]">
              <button onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline">{currentLang.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLanguageOpen && (
                <>
                  {/* <div className="fixed inset-0 z-[222222]" onClick={() => setIsLanguageOpen(false)} /> */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
                    {languages.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code as Language); setIsLanguageOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${lang === l.code ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}>
                        <div className={`w-6 h-4 rounded-sm flex items-center justify-center text-xs font-bold ${l.flag === 'ID' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                          {l.flag}
                        </div>
                        <span>{l.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(user.name)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                    <div className="px-4 py-3 border-b"><p className="font-semibold">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                    <div className="py-1">
                      <button onClick={() => setActivePage('profile')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3">
                        <User className="w-4 h-4" /> {t('Profile Saya')}
                      </button>
                    </div>
                    <div className="border-t pt-1">
                      <button onClick={() => setActivePage('login')} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                        <LogOut className="w-4 h-4" /> {t('Keluar')}
                      </button>
                      {/* <Link to='/login'>
                      </Link> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-100">
        {activePage !== 'login' && activePage !== 'register' ? (
          <>
            <div className="hidden lg:block"><Sidebar activePage={activePage} onPageChange={setActivePage} /></div>

            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[99999999999999999999999999] lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
                <div className="absolute left-0 top-0 h-full w-[100vw] bg-white shadow-xl">
                  <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <div className='flex flex-col relative top-[-2px]'>
                        <span className="text-xl font-bold text-gray-800">LINTAS</span>
                        <small className='w-max text-[9px] text-gray-800'>Lacak Informasi Transportasi Aset Sistem</small>
                      </div>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
                  </div>
                  <Sidebar activePage={activePage} onPageChange={(p) => { setActivePage(p); setMobileMenuOpen(false); }} />
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
                {renderPage()}
              </main>

              <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
                <div className="grid grid-cols-4 py-2">
                  {[{ id: 'map', icon: Map, label: 'Map' }, { id: 'assets', icon: Package, label: 'Assets' },
                    { id: 'trips', icon: BarChart3, label: 'Trips' }, { id: 'events', icon: AlertCircle, label: 'Events' }]
                    .map(item => {
                      const Icon = item.icon;
                      return (
                        <button key={item.id} onClick={() => setActivePage(item.id)}
                          className={`flex flex-col items-center py-2 ${activePage === item.id ? 'text-blue-600' : 'text-gray-600'}`}>
                          <Icon className="w-5 h-5" />
                          <span className="text-xs mt-1">{item.label}</span>
                        </button>
                      );
                    })}
                </div>
              </nav>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            {renderPage()}
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}

export default Dashboard;