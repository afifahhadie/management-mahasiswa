/**
 * APLIKASI MANAJEMEN DATA MAHASISWA
 * Versi Perbaikan - Responsive & Bug Fixed
 * Implementasi konsep OOP, Array, Pointer, Fungsi, File I/O, Searching, Sorting, Regex, Exception Handling
 */

// ==================== KELAS UTAMA DAN INHERITANCE ====================

/**
 * Kelas dasar Person (menggunakan enkapsulasi)
 */
class Person {
    #nama; // Private field untuk enkapsulasi
    
    constructor(nama) {
        this.#nama = nama;
    }
    
    // Getter untuk nama
    get nama() {
        return this.#nama;
    }
    
    // Setter untuk nama dengan validasi
    set nama(namaBaru) {
        if (typeof namaBaru === 'string' && namaBaru.trim().length > 0) {
            this.#nama = namaBaru.trim();
        } else {
            throw new Error("Nama tidak valid");
        }
    }
    
    // Method untuk menampilkan informasi dasar
    getInfo() {
        return `Nama: ${this.#nama}`;
    }
}

/**
 * Kelas Mahasiswa yang mewarisi dari Person (menggunakan inheritance)
 */
class Mahasiswa extends Person {
    #nim;
    #jurusan;
    #semester;
    
    constructor(nim, nama, jurusan, semester) {
        super(nama); // Memanggil constructor parent class
        this.#nim = nim;
        this.#jurusan = jurusan;
        this.#semester = parseInt(semester);
    }
    
    // Getter dan setter untuk properti private
    get nim() {
        return this.#nim;
    }
    
    set nim(nimBaru) {
        const nimRegex = /^\d{12}$/;
        if (nimRegex.test(nimBaru)) {
            this.#nim = nimBaru;
        } else {
            throw new Error("NIM harus terdiri dari 12 digit angka");
        }
    }
    
    get jurusan() {
        return this.#jurusan;
    }
    
    set jurusan(jurusanBaru) {
        if (typeof jurusanBaru === 'string' && jurusanBaru.trim().length > 0) {
            this.#jurusan = jurusanBaru.trim();
        } else {
            throw new Error("Jurusan tidak valid");
        }
    }
    
    get semester() {
        return this.#semester;
    }
    
    set semester(semesterBaru) {
        const semester = parseInt(semesterBaru);
        if (!isNaN(semester) && semester >= 1 && semester <= 14) {
            this.#semester = semester;
        } else {
            throw new Error("Semester harus antara 1-14");
        }
    }
    
    // Polimorfisme: override method getInfo dari parent class
    getInfo() {
        return `${super.getInfo()}, NIM: ${this.#nim}, Jurusan: ${this.#jurusan}, Semester: ${this.#semester}`;
    }
    
    // Method untuk mengembalikan objek plain
    toObject() {
        return {
            nim: this.#nim,
            nama: this.nama,
            jurusan: this.#jurusan,
            semester: this.#semester
        };
    }
}

/**
 * Kelas untuk mengelola kumpulan mahasiswa (menggunakan array dan pointer)
 */
class MahasiswaManager {
    constructor() {
        this.mahasiswaList = []; // Array untuk menyimpan data
        this.currentEditIndex = -1; // Pointer untuk data yang sedang diedit
        this.init();
    }
    
    /**
     * Inisialisasi awal
     */
    init() {
        this.loadFromStorage();
        // Jika tidak ada data di storage, tambahkan sample data
        if (this.mahasiswaList.length === 0) {
            this.initSampleData();
            this.saveToStorage();
        }
    }
    
    /**
     * Inisialisasi data sampel
     */
    initSampleData() {
        const sampleData = [
            new Mahasiswa("241011400174", "Abdul", "Teknik Informatika", "2"),
            new Mahasiswa("241011401513", "Afifah", "Teknik Informatika", "2"),
            new Mahasiswa("241011402073", "Agistna", "Teknik Informatika", "2"),
            new Mahasiswa("241011402803", "Abim", "Teknik Informatika", "2"),
            new Mahasiswa("241011401521", "Akhdan", "Teknik Informatika", "2"),
            new Mahasiswa("241011401225", "Fathur", "Teknik Informatika", "2"),
            new Mahasiswa("241011402606", "Anas", "Teknik Informatika", "2"),
            new Mahasiswa("241011400144", "Dafi", "Teknik Informatika", "2"),
            new Mahasiswa("241011401477", "Deva", "Teknik Informatika", "2"),
            new Mahasiswa("241011401652", "Dian", "Teknik Informatika", "2"),
            new Mahasiswa("241011402404", "Dimas", "Teknik Informatika", "2"),
            new Mahasiswa("241011400160", "Fikri", "Teknik Informatika", "2"),
            new Mahasiswa("241011400148", "Fira", "Teknik Informatika", "2"),
            new Mahasiswa("241011401516", "Ghali", "Teknik Informatika", "2"),
            new Mahasiswa("241011403290", "Haidar", "Teknik Informatika", "2"),
            new Mahasiswa("241011400169", "Ibnu", "Teknik Informatika", "2"),
            new Mahasiswa("241011401517", "Ika", "Teknik Informatika", "2"),
            new Mahasiswa("241011400171", "Tanto", "Teknik Informatika", "2"),
            new Mahasiswa("241011400150", "Faiz", "Teknik Informatika", "2"),
            new Mahasiswa("241011402691", "Ikhwan", "Teknik Informatika", "2"),
            new Mahasiswa("241011403029", "Fachri", "Teknik Informatika", "2"),
            new Mahasiswa("241011401524", "Fathir", "Teknik Informatika", "2"),
            new Mahasiswa("241011402666", "Raka", "Teknik Informatika", "2"),
            new Mahasiswa("241011400168", "Bayu", "Teknik Informatika", "2"),
            new Mahasiswa("241011402339", "Rafly", "Teknik Informatika", "2"),
            new Mahasiswa("241011403079", "Rakha", "Teknik Informatika", "2"),
            new Mahasiswa("241011402424", "Rendy", "Teknik Informatika", "2"),
            new Mahasiswa("241011401522", "Rashad", "Teknik Informatika", "2"),
            new Mahasiswa("241011400154", "Rivan", "Teknik Informatika", "2"),
            new Mahasiswa("241011400156", "Satria", "Teknik Informatika", "2"),
            new Mahasiswa("241011402645", "Tria", "Teknik Informatika", "2"),
            new Mahasiswa("241011402080", "Yusuf", "Teknik Informatika", "2")
        ];
        
        this.mahasiswaList = sampleData;
    }
    
    /**
     * Menambahkan mahasiswa baru ke array
     * @param {Mahasiswa} mahasiswa - Objek mahasiswa
     */
    tambahMahasiswa(mahasiswa) {
        // Cek duplikasi NIM
        if (this.cariByNIM(mahasiswa.nim)) {
            throw new Error("NIM sudah terdaftar");
        }
        
        this.mahasiswaList.push(mahasiswa);
        this.saveToStorage();
        return true;
    }
    
    /**
     * Mengupdate data mahasiswa berdasarkan index
     * @param {number} index - Index data yang akan diupdate
     * @param {Mahasiswa} mahasiswaBaru - Data mahasiswa baru
     */
    updateMahasiswa(index, mahasiswaBaru) {
        if (index < 0 || index >= this.mahasiswaList.length) {
            throw new Error("Index tidak valid");
        }
        
        // Cek duplikasi NIM (kecuali untuk data yang sama)
        const existing = this.cariByNIM(mahasiswaBaru.nim);
        if (existing && existing !== this.mahasiswaList[index]) {
            throw new Error("NIM sudah terdaftar untuk mahasiswa lain");
        }
        
        this.mahasiswaList[index] = mahasiswaBaru;
        this.saveToStorage();
        return true;
    }
    
    /**
     * Menghapus data mahasiswa berdasarkan index
     * @param {number} index - Index data yang akan dihapus
     */
    hapusMahasiswa(index) {
        if (index < 0 || index >= this.mahasiswaList.length) {
            throw new Error("Index tidak valid");
        }
        
        this.mahasiswaList.splice(index, 1);
        this.saveToStorage();
        return true;
    }
    
    /**
     * Mencari mahasiswa berdasarkan NIM (menggunakan linear search)
     * Time Complexity: O(n)
     * @param {string} nim - NIM yang dicari
     * @returns {Mahasiswa|null} - Objek mahasiswa atau null jika tidak ditemukan
     */
    cariByNIM(nim) {
        // Linear Search
        for (let i = 0; i < this.mahasiswaList.length; i++) {
            if (this.mahasiswaList[i].nim === nim) {
                return this.mahasiswaList[i];
            }
        }
        return null;
    }
    
    /**
     * Mencari mahasiswa berdasarkan NIM (menggunakan binary search)
     * Time Complexity: O(log n)
     * @param {string} nim - NIM yang dicari
     * @returns {Mahasiswa|null} - Objek mahasiswa atau null jika tidak ditemukan
     */
    cariByNIMBinary(nim) {
        // Data harus diurutkan terlebih dahulu berdasarkan NIM
        const sortedList = [...this.mahasiswaList].sort((a, b) => a.nim.localeCompare(b.nim));
        
        let left = 0;
        let right = sortedList.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midNIM = sortedList[mid].nim;
            
            if (midNIM === nim) {
                return sortedList[mid];
            } else if (midNIM < nim) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return null;
    }
    
    /**
     * Mencari mahasiswa berdasarkan nama (menggunakan sequential search)
     * Time Complexity: O(n)
     * @param {string} nama - Nama yang dicari
     * @returns {Array} - Array berisi mahasiswa yang cocok
     */
    cariByNama(nama) {
        const results = [];
        const searchTerm = nama.toLowerCase();
        
        for (let i = 0; i < this.mahasiswaList.length; i++) {
            if (this.mahasiswaList[i].nama.toLowerCase().includes(searchTerm)) {
                results.push(this.mahasiswaList[i]);
            }
        }
        
        return results;
    }
    
    /**
     * Mengurutkan data menggunakan algoritma yang dipilih
     * @param {string} type - Tipe pengurutan (nim, nama, semester)
     * @param {string} algorithm - Algoritma yang digunakan
     * @param {boolean} ascending - Urutan ascending atau descending
     * @returns {Array} - Array yang sudah terurut
     */
    sortData(type = 'nim', algorithm = 'bubble', ascending = true) {
        let sortedData = [];
        
        switch (algorithm) {
            case 'bubble':
                sortedData = this.bubbleSort(type, ascending);
                break;
            case 'selection':
                sortedData = this.selectionSort(type, ascending);
                break;
            case 'insertion':
                sortedData = this.insertionSort(type, ascending);
                break;
            case 'shell':
                sortedData = this.shellSort(type, ascending);
                break;
            case 'merge':
                sortedData = this.mergeSort(type, ascending);
                break;
            default:
                sortedData = [...this.mahasiswaList];
        }
        
        return sortedData;
    }
    
    /**
     * Mengurutkan data menggunakan Bubble Sort
     * Time Complexity: O(n²)
     */
    bubbleSort(type = 'nim', ascending = true) {
        const arr = [...this.mahasiswaList];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                let shouldSwap = false;
                
                switch (type) {
                    case 'nim':
                        shouldSwap = ascending ? 
                            arr[j].nim > arr[j + 1].nim : 
                            arr[j].nim < arr[j + 1].nim;
                        break;
                    case 'nama':
                        shouldSwap = ascending ? 
                            arr[j].nama.localeCompare(arr[j + 1].nama) > 0 : 
                            arr[j].nama.localeCompare(arr[j + 1].nama) < 0;
                        break;
                    case 'semester':
                        shouldSwap = ascending ? 
                            arr[j].semester > arr[j + 1].semester : 
                            arr[j].semester < arr[j + 1].semester;
                        break;
                }
                
                if (shouldSwap) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        
        return arr;
    }
    
    /**
     * Mengurutkan data menggunakan Selection Sort
     * Time Complexity: O(n²)
     */
    selectionSort(type = 'nim', ascending = true) {
        const arr = [...this.mahasiswaList];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            let extremeIndex = i;
            
            for (let j = i + 1; j < n; j++) {
                let isExtreme = false;
                
                switch (type) {
                    case 'nim':
                        isExtreme = ascending ? 
                            arr[j].nim < arr[extremeIndex].nim : 
                            arr[j].nim > arr[extremeIndex].nim;
                        break;
                    case 'nama':
                        const compareResult = arr[j].nama.localeCompare(arr[extremeIndex].nama);
                        isExtreme = ascending ? 
                            compareResult < 0 : 
                            compareResult > 0;
                        break;
                    case 'semester':
                        isExtreme = ascending ? 
                            arr[j].semester < arr[extremeIndex].semester : 
                            arr[j].semester > arr[extremeIndex].semester;
                        break;
                }
                
                if (isExtreme) {
                    extremeIndex = j;
                }
            }
            
            if (extremeIndex !== i) {
                [arr[i], arr[extremeIndex]] = [arr[extremeIndex], arr[i]];
            }
        }
        
        return arr;
    }
    
    /**
     * Mengurutkan data menggunakan Insertion Sort
     * Time Complexity: O(n²)
     */
    insertionSort(type = 'nim', ascending = true) {
        const arr = [...this.mahasiswaList];
        const n = arr.length;
        
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            
            while (j >= 0) {
                let shouldMove = false;
                
                switch (type) {
                    case 'nim':
                        shouldMove = ascending ? 
                            arr[j].nim > key.nim : 
                            arr[j].nim < key.nim;
                        break;
                    case 'nama':
                        const compareResult = arr[j].nama.localeCompare(key.nama);
                        shouldMove = ascending ? 
                            compareResult > 0 : 
                            compareResult < 0;
                        break;
                    case 'semester':
                        shouldMove = ascending ? 
                            arr[j].semester > key.semester : 
                            arr[j].semester < key.semester;
                        break;
                }
                
                if (!shouldMove) break;
                
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
        
        return arr;
    }
    
    /**
     * Mengurutkan data menggunakan Shell Sort
     * Time Complexity: O(n log n) sampai O(n²)
     */
    shellSort(type = 'nim', ascending = true) {
        const arr = [...this.mahasiswaList];
        const n = arr.length;
        
        let gaps = [701, 301, 132, 57, 23, 10, 4, 1];
        
        for (const gap of gaps) {
            if (gap >= n) continue;
            
            for (let i = gap; i < n; i++) {
                const temp = arr[i];
                let j = i;
                
                while (j >= gap) {
                    let shouldMove = false;
                    
                    switch (type) {
                        case 'nim':
                            shouldMove = ascending ? 
                                arr[j - gap].nim > temp.nim : 
                                arr[j - gap].nim < temp.nim;
                            break;
                        case 'nama':
                            const compareResult = arr[j - gap].nama.localeCompare(temp.nama);
                            shouldMove = ascending ? 
                                compareResult > 0 : 
                                compareResult < 0;
                            break;
                        case 'semester':
                            shouldMove = ascending ? 
                                arr[j - gap].semester > temp.semester : 
                                arr[j - gap].semester < temp.semester;
                            break;
                    }
                    
                    if (!shouldMove) break;
                    
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                
                arr[j] = temp;
            }
        }
        
        return arr;
    }
    
    /**
     * Mengurutkan data menggunakan Merge Sort
     * Time Complexity: O(n log n)
     */
    mergeSort(type = 'nim', ascending = true) {
        const arr = [...this.mahasiswaList];
        
        const mergeSortRecursive = (arr) => {
            if (arr.length <= 1) {
                return arr;
            }
            
            const mid = Math.floor(arr.length / 2);
            const left = mergeSortRecursive(arr.slice(0, mid));
            const right = mergeSortRecursive(arr.slice(mid));
            
            return merge(left, right);
        };
        
        const merge = (left, right) => {
            const result = [];
            let i = 0, j = 0;
            
            while (i < left.length && j < right.length) {
                let shouldTakeLeft = false;
                
                switch (type) {
                    case 'nim':
                        shouldTakeLeft = ascending ? 
                            left[i].nim <= right[j].nim : 
                            left[i].nim >= right[j].nim;
                        break;
                    case 'nama':
                        const compareResult = left[i].nama.localeCompare(right[j].nama);
                        shouldTakeLeft = ascending ? 
                            compareResult <= 0 : 
                            compareResult >= 0;
                        break;
                    case 'semester':
                        shouldTakeLeft = ascending ? 
                            left[i].semester <= right[j].semester : 
                            left[i].semester >= right[j].semester;
                        break;
                }
                
                if (shouldTakeLeft) {
                    result.push(left[i]);
                    i++;
                } else {
                    result.push(right[j]);
                    j++;
                }
            }
            
            return result.concat(left.slice(i)).concat(right.slice(j));
        };
        
        return mergeSortRecursive(arr);
    }
    
    /**
     * Mendapatkan statistik data
     */
    getStats() {
        if (this.mahasiswaList.length === 0) {
            return {
                total: 0,
                minNIM: '-',
                maxNIM: '-',
                avgSemester: '0.00'
            };
        }
        
        const nims = this.mahasiswaList.map(m => m.nim);
        const semesters = this.mahasiswaList.map(m => m.semester);
        
        // Format NIM agar lebih mudah dibaca
        const formatNIM = (nim) => {
            if (nim === '-') return '-';
            return nim.replace(/(\d{3})(?=\d)/g, '$1 ');
        };
        
        return {
            total: this.mahasiswaList.length,
            minNIM: formatNIM(nims.reduce((a, b) => a < b ? a : b)),
            maxNIM: formatNIM(nims.reduce((a, b) => a > b ? a : b)),
            avgSemester: (semesters.reduce((a, b) => a + b, 0) / semesters.length).toFixed(2)
        };
    }
    
    /**
     * Simpan data ke localStorage (simulasi File I/O)
     */
    saveToStorage() {
        try {
            const data = this.mahasiswaList.map(m => m.toObject());
            localStorage.setItem('mahasiswaData', JSON.stringify(data));
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
            throw new Error("Gagal menyimpan data");
        }
    }
    
    /**
     * Load data dari localStorage (simulasi File I/O)
     */
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem('mahasiswaData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.mahasiswaList = parsedData.map(data => 
                    new Mahasiswa(data.nim, data.nama, data.jurusan, data.semester.toString())
                );
            }
        } catch (error) {
            console.error("Gagal memuat data:", error);
            this.mahasiswaList = [];
        }
    }
    
    /**
     * Ekspor data ke file JSON
     */
    exportToFile() {
        try {
            const data = this.mahasiswaList.map(m => m.toObject());
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `mahasiswa_data_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error("Gagal mengekspor data:", error);
            throw new Error("Gagal mengekspor data ke file");
        }
    }
    
    /**
     * Impor data dari file JSON
     * @param {File} file - File JSON yang akan diimpor
     */
    async importFromFile(file) {
        try {
            const text = await file.text();
            const parsedData = JSON.parse(text);
            
            if (!Array.isArray(parsedData)) {
                throw new Error("Format file tidak valid. Harus berupa array.");
            }
            
            const newMahasiswaList = [];
            for (const item of parsedData) {
                if (!item.nim || !item.nama || !item.jurusan || !item.semester) {
                    throw new Error("Data tidak lengkap. Pastikan setiap item memiliki nim, nama, jurusan, dan semester.");
                }
                
                const nimRegex = /^\d{12}$/;
                if (!nimRegex.test(item.nim)) {
                    throw new Error(`NIM ${item.nim} tidak valid. Harus 12 digit angka.`);
                }
                
                newMahasiswaList.push(new Mahasiswa(
                    item.nim,
                    item.nama,
                    item.jurusan,
                    item.semester.toString()
                ));
            }
            
            this.mahasiswaList = newMahasiswaList;
            this.saveToStorage();
            
            return newMahasiswaList.length;
        } catch (error) {
            console.error("Gagal mengimpor data:", error);
            throw error;
        }
    }
}

// ==================== VALIDATOR DAN UTILITAS ====================

/**
 * Validasi input menggunakan Regular Expression (Regex)
 */
class Validator {
    static validateNIM(nim) {
        const nimRegex = /^\d{12}$/;
        return nimRegex.test(nim);
    }
    
    static validateNama(nama) {
        const namaRegex = /^[A-Za-z\s]{2,}$/;
        return namaRegex.test(nama.trim());
    }
    
    static validateJurusan(jurusan) {
        return jurusan.trim().length > 0;
    }
    
    static validateSemester(semester) {
        const semesterNum = parseInt(semester);
        return !isNaN(semesterNum) && semesterNum >= 1 && semesterNum <= 14;
    }
}

/**
 * Fungsi utilitas
 */
const Utils = {
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
    },
    
    clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    },
    
    fillFormWithData(mahasiswa) {
        document.getElementById('nim').value = mahasiswa.nim;
        document.getElementById('nama').value = mahasiswa.nama;
        document.getElementById('jurusan').value = mahasiswa.jurusan;
        document.getElementById('semester').value = mahasiswa.semester;
        
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('updateBtn').style.display = 'flex';
        document.getElementById('cancelBtn').style.display = 'flex';
    },
    
    resetForm() {
        document.getElementById('mahasiswaForm').reset();
        Utils.clearAllErrors();
        
        document.getElementById('submitBtn').style.display = 'flex';
        document.getElementById('updateBtn').style.display = 'none';
        document.getElementById('cancelBtn').style.display = 'none';
        
        mahasiswaManager.currentEditIndex = -1;
    },
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// ==================== APLIKASI UTAMA ====================

// Buat instance MahasiswaManager
const mahasiswaManager = new MahasiswaManager();

// Variabel untuk pencarian
let currentSearchResults = null;

/**
 * Fungsi untuk menampilkan data ke tabel
 */
function renderTable(data = null) {
    const tableBody = document.getElementById('tableBody');
    const tableInfo = document.getElementById('tableInfo');
    
    const displayData = data || mahasiswaManager.mahasiswaList;
    
    // Kosongkan tabel
    tableBody.innerHTML = '';
    
    // Isi tabel dengan data
    displayData.forEach((mahasiswa, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><span class="nim-value">${mahasiswa.nim}</span></td>
            <td>${mahasiswa.nama}</td>
            <td>${mahasiswa.jurusan}</td>
            <td><span class="semester-badge">${mahasiswa.semester}</span></td>
            <td class="text-center">
                <div class="table-actions">
                    <button class="btn btn-primary btn-sm action-btn-small edit-btn" data-index="${index}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm action-btn-small delete-btn" data-index="${index}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update info tabel
    const totalData = mahasiswaManager.mahasiswaList.length;
    const displayedData = displayData.length;
    
    if (currentSearchResults && displayedData < totalData) {
        tableInfo.textContent = `Menampilkan ${displayedData} dari ${totalData} data mahasiswa (hasil pencarian)`;
    } else {
        tableInfo.textContent = `Menampilkan ${displayedData} data mahasiswa`;
    }
    
    // Update statistik
    updateStats();
}

/**
 * Fungsi untuk memperbarui statistik
 */
function updateStats() {
    const stats = mahasiswaManager.getStats();
    
    document.getElementById('totalMahasiswa').textContent = stats.total;
    document.getElementById('nimTerkecil').textContent = stats.minNIM;
    document.getElementById('nimTerbesar').textContent = stats.maxNIM;
    document.getElementById('rataSemester').textContent = stats.avgSemester;
}

/**
 * Fungsi untuk menangani pencarian
 */
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const searchType = document.getElementById('searchType').value;
    
    if (!searchInput) {
        Utils.showNotification("Masukkan kata kunci pencarian!", 'warning');
        return;
    }
    
    try {
        let results = [];
        
        switch (searchType) {
            case 'linear':
                const result = mahasiswaManager.cariByNIM(searchInput);
                if (result) results = [result];
                break;
                
            case 'binary':
                const binaryResult = mahasiswaManager.cariByNIMBinary(searchInput);
                if (binaryResult) results = [binaryResult];
                break;
                
            case 'sequential':
                results = mahasiswaManager.cariByNama(searchInput);
                break;
        }
        
        currentSearchResults = results;
        renderTable(results);
        
        if (results.length === 0) {
            Utils.showNotification(`Tidak ditemukan hasil untuk "${searchInput}"`, 'warning');
        } else {
            Utils.showNotification(`Ditemukan ${results.length} hasil untuk "${searchInput}"`, 'success');
        }
        
    } catch (error) {
        Utils.showNotification(`Error dalam pencarian: ${error.message}`, 'error');
    }
}

/**
 * Fungsi untuk menangani pengurutan
 */
function handleSort() {
    const sortType = document.getElementById('sortType').value;
    const sortAlgorithm = document.getElementById('sortAlgorithm').value;
    
    try {
        let type = sortType;
        let ascending = true;
        
        if (sortType.endsWith('Desc')) {
            type = sortType.replace('Desc', '');
            ascending = false;
        }
        
        const sortedData = mahasiswaManager.sortData(type, sortAlgorithm, ascending);
        renderTable(sortedData);
        
        const orderText = ascending ? 'Ascending' : 'Descending';
        Utils.showNotification(`Data berhasil diurutkan berdasarkan ${type} (${orderText}) menggunakan ${sortAlgorithm} sort`, 'success');
        
    } catch (error) {
        Utils.showNotification(`Error dalam pengurutan: ${error.message}`, 'error');
    }
}

// ==================== EVENT LISTENERS ====================

// Event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Render data awal
    renderTable();
    
    // Event listener untuk form submit
    document.getElementById('mahasiswaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nim = document.getElementById('nim').value.trim();
        const nama = document.getElementById('nama').value.trim();
        const jurusan = document.getElementById('jurusan').value;
        const semester = document.getElementById('semester').value;
        
        // Validasi input
        let isValid = true;
        Utils.clearAllErrors();
        
        if (!Validator.validateNIM(nim)) {
            Utils.showError('nimError', 'NIM harus terdiri dari 12 digit angka');
            isValid = false;
        }
        
        if (!Validator.validateNama(nama)) {
            Utils.showError('namaError', 'Nama harus terdiri dari huruf dan minimal 2 karakter');
            isValid = false;
        }
        
        if (!Validator.validateJurusan(jurusan)) {
            Utils.showError('jurusanError', 'Pilih jurusan yang valid');
            isValid = false;
        }
        
        if (!Validator.validateSemester(semester)) {
            Utils.showError('semesterError', 'Semester harus antara 1-14');
            isValid = false;
        }
        
        if (!isValid) return;
        
        try {
            const mahasiswaBaru = new Mahasiswa(nim, nama, jurusan, semester);
            
            if (mahasiswaManager.currentEditIndex === -1) {
                // Tambah data baru
                mahasiswaManager.tambahMahasiswa(mahasiswaBaru);
                Utils.showNotification(`Data mahasiswa ${nama} berhasil ditambahkan!`, 'success');
            } else {
                // Update data yang ada
                mahasiswaManager.updateMahasiswa(mahasiswaManager.currentEditIndex, mahasiswaBaru);
                Utils.showNotification(`Data mahasiswa ${nama} berhasil diupdate!`, 'success');
            }
            
            Utils.resetForm();
            renderTable();
            currentSearchResults = null;
            
        } catch (error) {
            Utils.showNotification(`Error: ${error.message}`, 'error');
        }
    });
    
    // Event listener untuk tombol update
    document.getElementById('updateBtn').addEventListener('click', function() {
        document.getElementById('mahasiswaForm').dispatchEvent(new Event('submit'));
    });
    
    // Event listener untuk tombol cancel
    document.getElementById('cancelBtn').addEventListener('click', Utils.resetForm);
    
    // Event listener untuk tombol reset form
    document.getElementById('resetBtn').addEventListener('click', Utils.resetForm);
    
    // Event listener untuk tombol search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    
    // Event listener untuk clear search
    document.getElementById('clearSearchBtn').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
        currentSearchResults = null;
        renderTable();
        Utils.showNotification("Pencarian berhasil dibersihkan", 'info');
    });
    
    // Event listener untuk tombol sort
    document.getElementById('sortBtn').addEventListener('click', handleSort);
    
    // Event listener untuk tabel (edit dan hapus)
    document.getElementById('tableBody').addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;
        
        const index = parseInt(target.getAttribute('data-index'));
        
        if (target.classList.contains('edit-btn')) {
            try {
                const mahasiswa = mahasiswaManager.mahasiswaList[index];
                Utils.fillFormWithData(mahasiswa);
                mahasiswaManager.currentEditIndex = index;
                Utils.showNotification(`Mengedit data ${mahasiswa.nama}`, 'info');
            } catch (error) {
                Utils.showNotification(`Error: ${error.message}`, 'error');
            }
            
        } else if (target.classList.contains('delete-btn')) {
            const modal = document.getElementById('confirmationModal');
            const modalMessage = document.getElementById('modalMessage');
            const mahasiswa = mahasiswaManager.mahasiswaList[index];
            
            modalMessage.textContent = `Apakah Anda yakin ingin menghapus data mahasiswa "${mahasiswa.nama}" (NIM: ${mahasiswa.nim})?`;
            modal.style.display = 'flex';
            
            const confirmBtn = document.getElementById('confirmBtn');
            const cancelBtn = document.getElementById('cancelModalBtn');
            
            const handleConfirm = function() {
                try {
                    mahasiswaManager.hapusMahasiswa(index);
                    renderTable();
                    currentSearchResults = null;
                    modal.style.display = 'none';
                    Utils.showNotification(`Data mahasiswa ${mahasiswa.nama} berhasil dihapus!`, 'success');
                } catch (error) {
                    Utils.showNotification(`Error: ${error.message}`, 'error');
                }
                
                confirmBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            const handleCancel = function() {
                modal.style.display = 'none';
                confirmBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            confirmBtn.addEventListener('click', handleConfirm);
            cancelBtn.addEventListener('click', handleCancel);
        }
    });
    
    // Event listener untuk ekspor data
    document.getElementById('exportBtn').addEventListener('click', function() {
        try {
            mahasiswaManager.exportToFile();
            Utils.showNotification('Data berhasil diekspor ke file JSON!', 'success');
        } catch (error) {
            Utils.showNotification(`Error: ${error.message}`, 'error');
        }
    });
    
    // Event listener untuk impor data
    document.getElementById('importFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.name.endsWith('.json')) {
            Utils.showNotification('Hanya file JSON yang didukung!', 'error');
            return;
        }
        
        if (confirm(`Apakah Anda yakin ingin mengimpor data dari file "${file.name}"? Data yang ada akan diganti.`)) {
            mahasiswaManager.importFromFile(file)
                .then(count => {
                    renderTable();
                    currentSearchResults = null;
                    Utils.showNotification(`${count} data mahasiswa berhasil diimpor dari file!`, 'success');
                    e.target.value = '';
                })
                .catch(error => {
                    Utils.showNotification(`Error: ${error.message}`, 'error');
                    e.target.value = '';
                });
        } else {
            e.target.value = '';
        }
    });
    
    // Event listener untuk load data sample
    document.getElementById('loadSampleBtn').addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin memuat data sampel? Data yang ada akan diganti.')) {
            mahasiswaManager.initSampleData();
            mahasiswaManager.saveToStorage();
            renderTable();
            currentSearchResults = null;
            Utils.showNotification('Data sampel berhasil dimuat!', 'success');
        }
    });
    
    // Event listener untuk pencarian dengan Enter
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Event listener untuk menutup modal saat klik di luar
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('confirmationModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ==================== STYLING TAMBAHAN ====================

// Tambahkan CSS untuk notification dan badge
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        transition: all 0.3s ease;
        max-width: 400px;
        border-left: 4px solid #3498db;
    }
    
    .notification-success {
        border-left-color: #27ae60;
    }
    
    .notification-error {
        border-left-color: #e74c3c;
    }
    
    .notification-warning {
        border-left-color: #f39c12;
    }
    
    .notification-info {
        border-left-color: #3498db;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification-success i {
        color: #27ae60;
    }
    
    .notification-error i {
        color: #e74c3c;
    }
    
    .notification-warning i {
        color: #f39c12;
    }
    
    .notification-info i {
        color: #3498db;
    }
    
    .semester-badge {
        display: inline-block;
        background: #e3f2fd;
        color: #1976d2;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .btn-sm {
        padding: 6px 12px !important;
        font-size: 0.85rem !important;
    }
`;

document.head.appendChild(style);

// ==================== INISIALISASI ====================

// Log info saat aplikasi dimuat
console.log(`
============================================
APLIKASI MANAJEMEN DATA MAHASISWA
============================================
Fitur yang diimplementasikan:
1. OOP (Class, Object, Enkapsulasi, Pewarisan, Polimorfisme)
2. Array dan Pointer untuk manipulasi data
3. File I/O dengan localStorage dan download/upload
4. Searching (Linear, Binary, Sequential Search)
5. Sorting (Bubble, Selection, Insertion, Shell, Merge Sort)
6. Validasi input dengan Regular Expression (Regex)
7. Penanganan error dengan Try-Catch & Exception
8. Estimasi Time Complexity untuk setiap algoritma
9. Desain Responsif untuk semua perangkat
============================================
`);