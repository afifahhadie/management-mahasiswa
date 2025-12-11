# Aplikasi Manajemen Data Mahasiswa

Aplikasi berbasis website untuk mengelola data mahasiswa dengan berbagai fitur algoritma struktur data.

## Fitur Utama

### 1. **CRUD Operations**
- **Create**: Tambah data mahasiswa baru
- **Read**: Tampilkan semua data mahasiswa
- **Update**: Edit data mahasiswa yang sudah ada
- **Delete**: Hapus data mahasiswa

### 2. **Konsep OOP (Object-Oriented Programming)**
- **Class & Object**: Kelas `Person`, `Mahasiswa`, `MahasiswaManager`
- **Enkapsulasi**: Penggunaan private fields (`#nama`, `#nim`, dll.)
- **Pewarisan**: `Mahasiswa` mewarisi dari `Person`
- **Polimorfisme**: Override method `getInfo()`

### 3. **Struktur Data dan Algoritma**
- **Array**: Penyimpanan data mahasiswa dalam array
- **Pointer**: Indeks untuk mengakses dan memanipulasi data
- **Fungsi**: Modularisasi kode dengan berbagai fungsi

### 4. **File I/O Operations**
- **Simpan ke localStorage**: Penyimpanan data di browser
- **Ekspor ke file**: Download data sebagai file JSON
- **Impor dari file**: Upload data dari file JSON

### 5. **Searching Algorithms**
- **Linear Search**: Pencarian dengan mengecek setiap elemen (O(n))
- **Binary Search**: Pencarian pada data terurut (O(log n))
- **Sequential Search**: Pencarian berdasarkan nama (O(n))

### 6. **Sorting Algorithms**
- **Bubble Sort**: O(n²)
- **Selection Sort**: O(n²)
- **Insertion Sort**: O(n²)
- **Shell Sort**: O(n log n) - O(n²)
- **Merge Sort**: O(n log n)

### 7. **Input Validation dengan Regex**
- **NIM**: 12 digit angka (`/^\d{12}$/`)
- **Nama**: Huruf dan spasi, minimal 2 karakter (`/^[A-Za-z\s]{2,}$/`)
- **Semester**: Angka 1-14
- **Jurusan**: Tidak boleh kosong

### 8. **Error Handling**
- **Try-Catch Blocks**: Untuk operasi yang mungkin gagal
- **Custom Exceptions**: Pesan error yang informatif
- **Graceful Degradation**: Tetap berfungsi meski ada error

### 9. **Time Complexity Analysis**
- Informasi kompleksitas waktu untuk setiap algoritma
- Perbandingan efisiensi algoritma

## Cara Menggunakan

### 1. Menambahkan Data
1. Isi form di sidebar kiri
2. NIM harus 12 digit angka
3. Nama minimal 2 karakter huruf
4. Pilih jurusan dan semester
5. Klik "Tambah Data"

### 2. Mencari Data
1. Masukkan kata kunci di kolom pencarian
2. Pilih algoritma pencarian:
   - Linear Search (berdasarkan NIM)
   - Binary Search (berdasarkan NIM, data harus terurut)
   - Sequential Search (berdasarkan nama)
3. Klik tombol "Cari"

### 3. Mengurutkan Data
1. Pilih kriteria pengurutan (NIM, Nama, Semester)
2. Pilih algoritma pengurutan
3. Klik tombol "Urutkan"

### 4. Mengedit Data
1. Klik tombol "Edit" pada baris data yang ingin diedit
2. Data akan muncul di form
3. Ubah data yang diperlukan
4. Klik "Update Data"

### 5. Menghapus Data
1. Klik tombol "Hapus" pada baris data yang ingin dihapus
2. Konfirmasi penghapusan di modal
3. Data akan dihapus permanen

### 6. Operasi File
- **Ekspor**: Download data sebagai file JSON
- **Impor**: Upload data dari file JSON (akan mengganti data yang ada)
- **Load Sample**: Memuat data sampel yang sudah disediakan

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman web
- **CSS3**: Styling dan layout responsif
- **JavaScript ES6+**: Logika aplikasi
- **LocalStorage**: Penyimpanan data di browser
- **Font Awesome**: Ikon untuk UI

## Kompleksitas Waktu (Time Complexity)

| Algoritma | Best Case | Average Case | Worst Case |
|-----------|-----------|--------------|------------|
| Linear Search | O(1) | O(n) | O(n) |
| Binary Search | O(1) | O(log n) | O(log n) |
| Bubble Sort | O(n) | O(n²) | O(n²) |
| Selection Sort | O(n²) | O(n²) | O(n²) |
| Insertion Sort | O(n) | O(n²) | O(n²) |
| Shell Sort | O(n log n) | O(n log n) | O(n²) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) |

## Struktur Kode
