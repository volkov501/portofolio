# 🚀 Panduan Migrasi GitHub & Deploy 24/7 ke Vercel (Custom Domain)

Panduan lengkap untuk push web portfolio Next.js ke GitHub dan menghubungkannya ke **Vercel** dengan **Custom Domain** sendiri agar berjalan **24/7 non-stop (100% GRATIS & include SSL/HTTPS)**.

---

## 📌 Kenapa Lewat Vercel?
- **100% Gratis** untuk personal portfolio/project.
- **Run 24/7** dengan Global CDN super cepat (dibuat langsung oleh tim Next.js).
- **Custom Domain Gratis**: Bisa dipasang domain sendiri (misal: `arrashisatyadi.com`, `.id`, `.dev`, dll).
- **Free Auto SSL (HTTPS)**: Otomatis terpasang gembok hijau.
- **Auto Deploy (CI/CD)**: Begitu kamu push code baru ke GitHub, web otomatis update sendiri dalam hitungan detik.

---

## 🛠️ Langkah 1: Push Project ke GitHub

### 1.1 Buat Repository Baru di GitHub
1. Buka [github.com](https://github.com) dan login ke akunmu.
2. Klik tombol **"+"** di kanan atas -> Pilih **"New repository"**.
3. Beri nama repo, contoh: `portfolio` atau `arrashi-portfolio`.
4. Pilih **Public** (atau Private jika mau).
5. **JANGAN** centang *"Add a README file"*, *"Add .gitignore"*, atau *"Choose a license"* (karena project lokal kita sudah ada).
6. Klik **"Create repository"**.
7. Salin URL repository GitHub kamu (contoh: `https://github.com/username/portfolio.git`).

---

### 1.2 Push Code dari Komputer ke GitHub
Buka Terminal / PowerShell di folder project (`C:\Portofolio\portfolio`), lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Masukkan semua perubahan ke staging
git add .

# 2. Buat commit pertama
git commit -m "feat: complete modern portfolio & ats resume"

# 3. Pastikan branch bernama main
git branch -M main

# 4. Hubungkan ke repository GitHub kamu (ganti URL di bawah dengan URL repo GitHub-mu)
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# 5. Push ke GitHub
git push -u origin main
```

*(Jika sebelumnya remote `origin` sudah pernah ada, gunakan `git remote set-url origin <URL_BARU>`)*

---

## ☁️ Langkah 2: Deploy ke Vercel (24/7 Free Hosting)

1. Buka **[vercel.com](https://vercel.com)** dan klik **"Sign Up"** (atau **"Log In"** jika sudah punya akun).
2. **Pilih login menggunakan akun GitHub** (*Continue with GitHub*).
3. Setelah masuk ke Dashboard Vercel:
   - Klik tombol **"Add New..."** -> Pilih **"Project"**.
4. Di daftar repository GitHub yang muncul:
   - Cari repository portfolio yang baru saja kamu push.
   - Klik tombol **"Import"** di sebelah nama repo.
5. Pada konfigurasi project:
   - **Framework Preset:** Next.js (otomatis terdeteksi).
   - **Root Directory:** `./` (default).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `.next` (default).
6. Klik tombol biru **"Deploy"**.
7. Tunggu sekitar 1-2 menit hingga proses build selesai. Selamat! Web portfoliomu sekarang sudah live 24/7 di domain bawaan Vercel (contoh: `portfolio-arrashi.vercel.app`).

---

## 🌐 Langkah 3: Menghubungkan Custom Domain Sendiri

Jika kamu sudah punya domain sendiri (misal dibeli di Niagahoster, DomaiNesia, Namecheap, Cloudflare, dll):

1. Di dashboard project Vercel kamu, buka menu **"Settings"** -> pilih tab **"Domains"**.
2. Masukkan nama domain kamu di input box, contoh:
   - `arrashisatyadi.com` atau `portfolio.arrashisatyadi.com`
3. Klik tombol **"Add"**.
4. Vercel akan memberikan petunjuk DNS Records yang harus dimasukkan ke dashboard penyedia domainmu:

### Konfigurasi DNS di Provider Domain Kamu:

| Type | Name / Host | Value / Target | Keterangan |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` (atau kosong) | `76.76.21.21` | Mengarahkan apex domain (contoh: `domain.com`) ke IP Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Mengarahkan subdomain www ke Vercel |

*(Jika menggunakan subdomain, misal `porto.domainkamu.com`, cukup tambahkan CNAME Record: Host `porto` -> Value `cname.vercel-dns.com`)*

5. Setelah DNS ditambahkan di registrar domainmu, tunggu proses propagasi DNS (biasanya 5–30 menit).
6. Di dashboard Vercel, status domain akan berubah menjadi **Valid Configuration** dengan ikon centang hijau ✅.
7. Vercel akan otomatis menerbitkan **SSL Certificate (HTTPS)** gratis untuk domainmu.

---

## 🔄 Cara Update Web di Masa Depan
Kapanpun kamu ingin mengubah isi portfolio atau memperbarui resume:
1. Edit file di komputer lokal.
2. Jalankan:
   ```bash
   git add .
   git commit -m "update data portfolio"
   git push
   ```
3. Vercel akan otomatis mendeteksi push tersebut dan meng-update website yang sedang live dalam hitungan detik! 🎉
