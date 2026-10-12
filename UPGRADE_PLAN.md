# Portfolio Upgrade & Roadmap Plan — Arrashi Satyadi

Dokumen ini merupakan catatan lengkap status upgrade, panduan pengelolaan aset gambar, dan roadmap pengembangan lanjutan untuk website portofolio Arrashi Satyadi.

---

## 1. Status Pekerjaan (Yang Sudah Selesai & Aktif)

Semua tugas di bawah ini telah selesai diimplementasikan, lolos build/typecheck (`npx tsc --noEmit`), dan telah diverifikasi langsung di browser:

- [x] **Redesign Visual Total ke Gaya SpaceX & Tesla:**
  - Estetika monokrom modern (pure black, hairline border `#3a3a3f`, soft black `#0a0a0a`).
  - Menghilangkan efek "AI-slop" (glow berlebihan, gradien cyan-emerald ad-hoc, bayangan blur).
  - Tipografi terstandarisasi: Barlow Condensed (uppercase display title) + Barlow (body text) sebagai padanan resmi D-DIN.
  - Tombol aksi berbasis *ghost pill* (`.sx-ghost`) dengan transisi warna halus 0.33s ala Tesla.
- [x] **Foto Profil Hero Berwarna Alami:**
  - Efek grayscale/hitam-putih telah dihapus dari `components/Hero.tsx`. Foto kini tampil berwarna natural dengan framing teknis gelap yang presisi.
- [x] **Status Availability Badge Hero:**
  - Teks diperbarui menjadi `AVAILABLE FOR HIRE` yang ringkas dan profesional.
- [x] **Penyempurnaan Efek Typewriter Hero:**
  - Jeda diperpanjang menjadi 2.600ms saat teks lengkap, sehingga role/spesialisasi terbaca tuntas tanpa terpotong cepat.
- [x] **Pusat Aset Gambar Project (`public/projects/`):**
  - Folder terpusat dibuat di `public/projects/`.
  - Seluruh file dari folder lokal `Aset gambar` telah disalin dengan nama file URL-friendly (tanpa spasi/karakter khusus).
- [x] **Proyek Baru — Tactical UGV Crawler Robot:**
  - Ditambahkan project unggulan baru: *Tactical UGV Crawler Robot & Telemetry* lengkap dengan 6 foto detail (konsep robot, ground station, remote control, sistem video SIYI HD, dashboard, dan draft desain).
- [x] **Card Project dengan Cover Image 16:9 & Ruang Foto Masa Depan:**
  - Setiap kartu project di `components/Projects.tsx` menampilkan cover image 16:9 dengan efek hover zoom halus.
  - Jika project belum memiliki foto, disediakan slot placeholder teknis (`Visual Telemetry Ready`) sehingga tata letak grid tetap rapi dan siap menerima foto baru kapan saja.
- [x] **Interactive Fullscreen Lightbox Photo Gallery Modal:**
  - Jika sebuah project memiliki lebih dari 1 foto, muncul badge `+X Photos` dan tombol `Gallery (X)`.
  - Mengklik foto atau tombol membuka modal galeri fullscreen lengkap dengan navigasi panah kiri/kanan, strip thumbnail di bawah, counter `[1 / 6]`, dan tombol close (`ESC` / `X`).
- [x] **Baris Hasil Terukur (Measurable Impact / Outcome):**
  - Ditambahkan baris metrik bergaris tepi di tiap kartu project (misal: *Rp 16M+ Official LKPP Procurement*, *Zero Evidence Loss on CGNAT*, dll.).
- [x] **Integrasi Admin CMS (`ProjectsEditor.tsx`):**
  - Form editor kini memiliki input untuk Cover Image URL, Additional Photos (galeri multi-foto), dan Measurable Impact.
- [x] **Pembaruan Link Sosial:**
  - Link GitHub di footer kini mengarah ke akun aktif Arrashi: `https://github.com/volkov501`.
- [x] **SEO, OpenGraph & Social Sharing:**
  - Ditambahkan `metadataBase`, OpenGraph preview, Twitter card, dan robots metadata di `app/layout.tsx`.
  - Disediakan aset cover sosial `public/og.jpg` (1200x630).

---

## 2. Panduan Lengkap: Cara Memasukkan & Mengganti Gambar

Untuk memastikan tampilan web tetap prima dan tidak pecah, ikuti panduan berikut saat menambahkan foto baru:

### A. Menambahkan Foto Cover / Galeri Project Baru

#### Langkah 1: Simpan File Foto ke Folder `public/`
1. Buka folder proyek di komputermu:
   ```
   c:\Portofolio\portfolio\public\projects\
   ```
2. Salin/paste file foto baru ke folder tersebut.
3. **Penting:** Gunakan nama file huruf kecil tanpa spasi (gunakan tanda minus `-`), contoh:
   * `vtol-drone-test.jpg`
   * `server-rack-gpu.png`
   * `iot-dashboard-v2.jpg`

#### Langkah 2: Hubungkan Foto ke Project via Admin CMS
1. Buka browser ke: `http://localhost:3000/admin`
2. Klik tab **Projects**.
3. Pilih project yang ingin ditambahkan fotonya (atau klik **+ Add Project** jika project baru).
4. Isi kolom foto:
   * **Cover Image URL:** Masukkan jalur foto sampul, contoh:
     ```
     /projects/vtol-drone-test.jpg
     ```
   * **Additional Photos (Galeri Banyak Foto):** Masukkan daftar foto dipisahkan koma, contoh:
     ```
     /projects/vtol-drone-test.jpg, /projects/vtol-gcs.jpg, /projects/vtol-electronics.jpg
     ```
5. Tekan tombol **Save Changes** (atau shortcut `Ctrl + S`).
6. Selesai! Web akan otomatis menampilkan banner cover dan tombol Galeri Interaktif di kartu project tersebut.

*(Alternatif: Kamu juga bisa langsung mengedit file `data/portfolio.json` pada bagian `image` dan `images`)*.

---

### B. Mengganti Foto Profil (Hero Section)

1. Siapkan foto profil baru Anda.
2. Format yang disarankan: JPG atau PNG, rasio aspek **4:5** (misal resolusi `800x1000` px atau `1000x1250` px).
3. Simpan file tersebut ke `public/profile.jpg` (menimpa file yang lama).
4. Karena jalur file tetap `/profile.jpg`, foto di halaman depan akan otomatis terupdate.

---

### C. Rekomendasi Format & Ukuran Gambar

| Jenis Aset | Rekomendasi Format | Rasio Aspek | Resolusi Ideal | Catatan |
|---|---|---|---|---|
| **Cover Project** | JPG / WebP | 16:9 | 1280 x 720 px | Bagian tengah gambar menjadi fokus utama |
| **Foto Galeri Detail** | JPG / PNG | Bebas (16:9, 4:3, dll.) | Max 1920 x 1080 px | Kompres di bawah 1.5 MB per foto agar loading cepat |
| **Foto Profil Hero** | JPG / PNG | 4:5 (Portrait) | 800 x 1000 px | Latar belakang gelap atau studio kontras tinggi |
| **Social Share (OG)** | JPG | 1.91:1 | 1200 x 630 px | Disimpan di `public/og.jpg` untuk preview WhatsApp/LinkedIn |

---

## 3. Saran Upgrade Selanjutnya (Roadmap Belum Dikerjakan)

Berikut adalah daftar rekomendasi upgrade tingkat lanjut yang bisa dikerjakan di tahap berikutnya untuk semakin memukau rekruter dan klien enterprise/defense tech:

### [ ] Saran 1: Filter Kategori Project (Category Tabs)
* **Konsep:** Tambahkan tab filter di atas section Key Projects:
  * `[ ALL ]` `[ AUTONOMOUS & DRONES ]` `[ NETWORK & HPC INFRA ]` `[ EMBEDDED & AIOT ]`
* **Manfaat:** Pengunjung/rekruter dapat langsung memfilter portofolio sesuai bidang yang ingin mereka rekrut (misal: hanya ingin melihat proyek drone atau hanya ingin melihat proyek server).

### [ ] Saran 2: Support Video Player di Modal Galeri
* **Konsep:** Saat ini Anda memiliki file video rekaman uji coba robot (`Test Crawler.mp4`) dan footage penerbangan drone.
* **Fitur:** Modal galeri dapat mendukung pemutaran video MP4 singkat / WebM secara seamless di samping foto-foto diam.

### [ ] Saran 3: Interactive Resume PDF Viewer Modal
* **Konsep:** Saat ini tombol "Resume (PDF)" langsung mendownload file `Arrashi_Satyadi_Resume_ATS.pdf`.
* **Fitur:** Tambahkan opsi tombol *"Quick Preview"* yang membuka modal pop-up PDF viewer langsung di dalam browser tanpa harus mendownload file ke drive lokal terlebih dahulu.

### [ ] Saran 4: Diagram Arsitektur & Topologi Interaktif
* **Konsep:** Rekruter infrastruktur jaringan dan HPC sangat menyukai diagram topologi sistem (Cisco topology, 4-tier Dell PowerEdge cluster, dan alur WebSockets ESP32 CGNAT bypass).
* **Fitur:** Tambahkan tab *"Architecture Blueprint"* atau visualizer topologi yang interaktif di kartu proyek AI Server dan Smart Tactical Bodycam.

### [ ] Saran 5: Form Kontak Cepat (Direct Notification Webhook)
* **Konsep:** Selain email dan nomor telepon, sediakan form pesan ringkas di footer: *"Send Encrypted Message / Fast Inquire"*.
* **Fitur:** Form ini otomatis meneruskan pesan langsung ke Bot Telegram / Webhook Discord / email Arrashi melalui Next.js API Route (`app/api/contact/route.ts`).

### [ ] Saran 6: Vercel Web Analytics & Speed Insights
* **Konsep:** Pasang paket resmi `@vercel/analytics` dan `@vercel/speed-insights`.
* **Manfaat:** Anda bisa melihat jumlah pengunjung portofolio secara real-time dari dashboard Vercel (negara asal pengunjung, halaman yang paling lama dilihat, dan skor kecepatan loading).

### [ ] Saran 7: Sertifikasi & Verifikasi Kredensial Interaktif
* **Konsep:** Di section Education/Certifications, sediakan tombol *"Verify Credential"* yang menampilkan preview sertifikat BNSP / TOEIC / CCNA dalam popup modal.

---

## 4. Cara Deploy & Update Online ke Vercel

Setiap kali Anda atau agen AI melakukan perubahan dan menjalankan perintah git push:
```bash
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```
Vercel yang terhubung ke repositori GitHub `volkov501/portofolio` akan **secara otomatis melakukan build dan deploy** versi terbaru ke domain publik Anda dalam waktu ~1-2 menit.
