# Panduan Folder Aset Foto Project

Folder ini (`public/projects/`) adalah tempat penyimpanan seluruh foto project portofolio Arrashi Satyadi.

## Cara Menambah Foto Baru:
1. **Simpan File Foto di Sini:**
   - Masukkan file foto langsung ke dalam folder `public/projects/`.
   - Gunakan nama file yang rapi tanpa spasi, contoh:
     - `my-new-drone.jpg`
     - `server-rack-2.png`
     - `telemetry-dashboard.jpg`

2. **Hubungkan ke Project via Admin CMS:**
   - Buka browser ke: `http://localhost:3000/admin`
   - Pilih tab **Projects**.
   - Pada project yang diinginkan:
     - **Cover Image URL:** Masukkan `/projects/my-new-drone.jpg` untuk foto sampul utama.
     - **Additional Photos:** Masukkan daftar foto tambahan dipisahkan koma, contoh:
       `/projects/my-new-drone.jpg, /projects/telemetry-dashboard.jpg, /projects/another-photo.jpg`
   - Klik **Save Changes** (atau tekan `Ctrl+S`).

3. **Fitur Galeri Interaktif Otomatis:**
   - Di web portofolio, jika sebuah project memiliki lebih dari 1 foto, badge `+X Photos` dan tombol `Gallery (X)` akan muncul secara otomatis.
   - Pengunjung bisa mengklik foto untuk membuka **Lightbox Fullscreen** dengan navigasi panah kiri/kanan, strip thumbnail, dan tombol close `ESC`.

## Daftar Foto yang Tersedia Saat Ini:
- `body-cam.jpg` (Foto Tactical Body Camera)
- `body-cam-dashboard-v2.jpg` (Satellite Command Center Map & Live GPS Tracking UNIT-01)
- `body-cam-real.jpg` (Foto Fisik Hardware Bodycam & M10Q Ceramic GPS Antenna Patch)
- `body-cam-front.jpg` (Body Camera tampak depan)
- `body-cam-up.jpg` (Body Camera tampak atas)
- `body-cam-dashboard.png` (Screenshot Web Dashboard Bodycam)
- `crawler-concept.jpg` (Foto Concept Crawler Robot)
- `crawler-frontend-cam.jpg` (X-FIRE Mission Control Dashboard dengan Dual-Camera Live Stream)
- `crawler-ground-station.jpg` (Foto Ground Station Crawler)
- `crawler-remote.jpg` (Foto Remote Controller Crawler)
- `crawler-video-siyi.jpg` (Foto SIYI Video Transmitter System)
- `crawler-dashboard.jpg` (Screenshot Web Dashboard Crawler)
- `crawler-draft.jpg` (Sketsa / Draft Crawler Robot)
- `eagle-hawk.jpg` (Foto Pesawat VTOL Eagle Hawk)
- `eagle-hawk-web.jpg` (Screenshot Custom Web GCS Eagle Hawk)
- `eagle-hawk-reverse.jpg` (Foto Reverse Engineering Eagle Hawk)
- `ai-server-h100.jpg` (Foto AI Server Supercomputer Rack)
- `server-monitor-testing.jpg` (Pengujian Fisik IoT di Datacenter Server Rack LePKom)
- `server-monitor-workflow.jpg` (Diagram Alur Kerja & Arsitektur Monitoring Server)
- `server-monitor-flutter.jpg` (UI Aplikasi Mobile Flutter Monitoring Server F8)
- `server-monitor-smoke.jpg` (Notifikasi Peringatan Dini Deteksi Asap, Suhu & Air)

