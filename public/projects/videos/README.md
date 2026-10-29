# Video Project

Player video muncul otomatis di kartu Key Projects begitu sebuah project punya video.
Isi kolom **Videos** di Admin → *Projects* (pisahkan dengan koma kalau lebih dari satu),
atau minta Claude yang mengisinya.

## Tiga jenis sumber yang didukung

| Sumber | Contoh yang ditempel | Catatan |
|---|---|---|
| **YouTube** (disarankan) | `https://youtu.be/abc123XYZ00` atau link `youtube.com/watch?v=…` / `shorts/…` | Upload sebagai *Unlisted* kalau tidak mau muncul di pencarian. Thumbnail otomatis jadi sampul kartu. Paling ringan untuk web. |
| **Google Drive** | `https://drive.google.com/file/d/ID_FILE/view?usp=sharing` | Atur akses ke *Anyone with the link*. Tanpa thumbnail otomatis. |
| **File langsung** | `/projects/videos/crawler-demo.mp4` | Taruh file di folder ini. Frame pertama otomatis jadi sampul kalau project belum punya foto. |

## Kalau pakai file langsung

- Format **MP4 (H.264)** agar bisa diputar di semua HP.
- Usahakan **di bawah ±15 MB per file** (klip pendek, 720p). File besar memperlambat web dan
  GitHub menolak file di atas 100 MB. Video panjang lebih baik ke YouTube/Drive.
- Nama file tanpa spasi, contoh `crawler-demo.mp4`.

## Video yang sudah dipasang

- `ugv-crawler-field-test.mp4`: uji lapangan Tactical UGV Crawler (19 detik, vertikal 1080×1920).
  Sudah di-*faststart* (indeks video dipindah ke depan) supaya langsung bisa diputar sebelum
  seluruh file terunduh. Ukurannya 43 MB; kalau mau lebih ringan di data seluler, upload ke
  YouTube lalu ganti link-nya.
