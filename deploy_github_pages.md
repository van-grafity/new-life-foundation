# Cara Deploy Website *New Life Foundation* ke GitHub Pages

GitHub Pages adalah layanan gratis dari GitHub untuk menghosting website statis. Berikut langkah-langkahnya:

## Persiapan
Sebelum mulai, pastikan:
- Anda memiliki akun GitHub
- Git sudah terinstal di komputer
- File website Anda sudah siap (misalnya: `index.html`, CSS, JS, gambar, dll.)

## Langkah-Langkah Deploy

### 1. Buat Repository di GitHub

1. Buka [github.com/new](https://github.com/new)  
2. Isi:
   - **Repository name:** `new-life-foundation` (atau nama lain sesuai kebutuhan)
   - **Visibility:** pilih **Public** (karena GitHub Pages gratis tidak mendukung private)
3. Klik **Create repository**

### 2. Upload Website ke Repository

Ada dua cara: **menggunakan Git (Terminal)** atau **GitHub Desktop (lebih mudah untuk pemula).**

#### Opsi A – Menggunakan Git (Terminal)
1. Clone repository ke komputer Anda:
   ```bash
   git clone https://github.com/username-anda/new-life-foundation.git
   cd new-life-foundation
   ```
2. Salin semua file website Anda (termasuk `index.html`, CSS, JS, gambar) ke folder repository tersebut.
3. Jalankan:
   ```bash
   git add .
   git commit -m "Upload website pertama"
   git push origin main
   ```

#### Opsi B – Menggunakan GitHub Desktop (Lebih Mudah)
1. Download GitHub Desktop: [desktop.github.com](https://desktop.github.com/)  
2. Login menggunakan akun GitHub Anda  
3. Klik **Clone a repository** → pilih repo `new-life-foundation`  
4. Buka folder repo di komputer Anda, lalu **salin semua file website ke dalam folder tersebut**  
5. Kembali ke GitHub Desktop → klik **Commit** → **Push origin**  

### 3. Aktifkan GitHub Pages

1. Buka halaman repository di GitHub  
2. Klik **Settings** → pilih menu **Pages**  
3. Pada bagian **Source**:
   - Branch: pilih **main**
   - Folder: pilih **/(root)**
4. Klik **Save**

### 4. Tunggu Proses Deploy

Biasanya butuh 1–2 menit. Jika berhasil, akan muncul URL live, misalnya:  
```
https://username-anda.github.io/new-life-foundation
```

### 5. (Opsional) Pakai Domain Sendiri

Jika Anda punya domain seperti `newlifefoundation.org`:
1. Buat file bernama `CNAME` di repository → isinya:
   ```
   newlifefoundation.org
   ```
2. Atur DNS domain Anda:
   - Tambahkan **A Record** ke:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Tambahkan **CNAME Record**:
     ```
     www → username-anda.github.io
     ```

### 6. Memperbarui Website

Jika Anda ingin mengubah isi website:
1. Edit file di komputer  
2. Simpan → commit → push:
   ```bash
   git add .
   git commit -m "Perbarui halaman utama"
   git push origin main
   ```
3. GitHub Pages akan otomatis mengupdate situs Anda.

### 7. Jika Website Tidak Muncul

- Pastikan file utama bernama **`index.html`**  
- Pastikan semua path file (CSS/JS/gambar) menggunakan path relatif, bukan absolut  
- Cek **Settings → Pages** apakah ada error  
- Cek **tab Actions** untuk melihat error saat build  
