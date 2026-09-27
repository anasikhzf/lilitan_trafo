/* =====================================================
   DATA PERHITUNGAN
===================================================== */
const dataPerhitungan = { 
    1: {
        title: "Jumlah Lilitan Sekunder (TR)",
        fields: [
            {
                id: "TapPendekPrimer",
                label: "Tap Pendek Primer",
                
            },
            {
                id: "TapStep",
                label: "Tap Step",
                
            }
        ]
    },

    2: {
        title: "Jumlah Lilitan Primer (TM)",
        fields: [
            {
                id: "LilitanSekunder",
                label: "Lilitan Sekunder(TR)",
            },
            {
                id: "TeganganTap",
                label: "Tegangan Tap (V)",
            }
        ]
    },

    3: {
        title: "Jumlah Antar Tap Primer",
        fields: [
            {
                 id: "LilitanPrimer",
                label: "Lilitan Primer (TM)",
            },
            
            {
                id: "TapPendekPrimer",
                label: "Tap Pendek Primer",
               
            },
            {
                id: "TotalPembagianTapPendek",
                label: "Total Pembagian Tap Pendek",
            }
            
            
        ]
    },

    4: {
        title: "Mengetahui Jumlah Kelebihan/Kekurangan Lilitan",
        fields: [
            {
                id: "HasilTTRLilitanYangRusak",
                label: "Hasil TTR Kumparan Fasa Setelah Rewinding",
    
            },
            {
                id: "LilitanSekunder",
                label: "Lilitan Sekunder (TR)",
            
            }
        ]
    },

};


/* =====================================================
   HASIL REKAP
===================================================== */
const hasilRekap = {

    1: null,
    2: null,
    3: null,
    4: null,

};


/* =====================================================
   SIMPAN HASIL REKAP KE SESSION PHP
===================================================== */

function simpanHasilKeSession() {

    const data = new URLSearchParams();

    data.append("simpan_hasil_rekap", "1");

    data.append(
        "hasil_rekap",
        JSON.stringify(hasilRekap)
    );

    fetch("rumus1.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    .then(response => response.text())
    .then(data => {

        console.log("Hasil rekap berhasil disimpan ke Session.");

    })
    .catch(error => {

        console.error(
            "Gagal menyimpan hasil rekap:",
            error
        );

    });

}
/* =====================================================
   PILIH PERHITUNGAN
===================================================== */

const pilihan = document.querySelectorAll(".pilihan");

pilihan.forEach(function(button) {

    button.addEventListener("click", function() {

        const id = this.dataset.id;

        pilihan.forEach(function(item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

        document.getElementById("judulHalaman").textContent =
            dataPerhitungan[id].title;

        tampilkanForm(id);

    });

});

/* =====================================================
   TAMPILKAN FORM
===================================================== */

function tampilkanForm(id) {
    console.log("Form dipanggil dengan ID:", id);

    const form = document.getElementById("formInput");
    if (!form) {
        console.error("formInput tidak ditemukan!");
        return;
    }

    form.innerHTML = "";

    dataPerhitungan[id].fields.forEach(function(field) {

        const group = document.createElement("div");

        group.className = "form-group";

        group.innerHTML = `
            <label>${field.label}</label>
            <input
                type="number"
                id="${field.id}"
                placeholder="Masukan nilai"
                step="any"
            >
        `;

        form.appendChild(group);

    });
}
/* =====================================================
   HITUNG
===================================================== */

function hitung() {

    const active = document.querySelector(".pilihan.active");
    

    const id = active.dataset.id;

    let hasil = 0;


    /* ==========================================
       RUMUS 1
    ========================================== */
    if (id === "1") {

    const inputTapPendekPrimer =
        document.getElementById("TapPendekPrimer");

    const inputTapStep =
        document.getElementById("TapStep");

    if (!inputTapPendekPrimer || !inputTapStep) {
        alert("Input tidak ditemukan. Periksa ID input.");
        return;
    }

    const TapPendekPrimer =
        parseFloat(inputTapPendekPrimer.value);

    const TapStep =
        parseFloat(inputTapStep.value);


    // CEK INPUT KOSONG
    if (inputTapPendekPrimer.value === "" ||
        inputTapStep.value === "") {

        alert("Silakan isi kedua data terlebih dahulu.");
        return;
    }


    // CEK ANGKA
    if (isNaN(TapPendekPrimer) || isNaN(TapStep)) {

        alert("Data harus berupa angka.");
        return;
    }


    // CEK 0
    if (TapPendekPrimer === 0) {

        alert("Nilai Tap Pendek Primer tidak boleh 0.");
        return;
    }

    if (TapStep === 0) {

        alert("Nilai Tap Step tidak boleh 0.");
        return;
    }


    // RUMUS
    hasil = (TapPendekPrimer / TapStep) * 231;


    // SIMPAN HASIL
    hasilRekap[1] = hasil.toFixed(4)+ " lilitan";
}


/* ==========================================
   RUMUS 2
========================================== */
else if (id === "2") {

    const inputLilitanSekunder =
        document.getElementById("LilitanSekunder");

    const inputTeganganTap =
        document.getElementById("TeganganTap");


    // CEK INPUT ADA
    if (!inputLilitanSekunder || !inputTeganganTap) {

        alert("Input perhitungan nomor 2 tidak ditemukan.");

        return;
    }


    // CEK KOSONG
    if (
        inputLilitanSekunder.value.trim() === "" ||
        inputTeganganTap.value.trim() === ""
    ) {

        alert("Silakan isi kedua data terlebih dahulu.");

        return;
    }


    // AMBIL NILAI
    const LilitanSekunder =
        parseFloat(inputLilitanSekunder.value);

    const TeganganTap =
        parseFloat(inputTeganganTap.value);


    // CEK ANGKA
    if (
        isNaN(LilitanSekunder) ||
        isNaN(TeganganTap)
    ) {

        alert("Data harus berupa angka.");

        return;
    }


    // CEK 0
    if (LilitanSekunder === 0) {

        alert("Lilitan Sekunder tidak boleh 0.");

        return;
    }


    if (TeganganTap === 0) {

        alert("Tegangan Tap tidak boleh 0.");

        return;
    }

    // RUMUS
    hasil =
        (LilitanSekunder / 231) * TeganganTap;


    // SIMPAN HASIL
    hasilRekap[2] =Math.round(hasil).toLocaleString('id-ID') + " lilitan";


    // TAMPILKAN HASIL
    document.getElementById("hasilBox").innerHTML = `

        <div class="hasil-icon">
            ✓
        </div>

        <p>
            Hasil:
            <strong>${hasilRekap[2]}</strong>
        </p>

    `;
}
    /* ==========================================
       RUMUS 3
    ========================================== */
    else if (id === "3") {
        
        const LilitanPrimer =
            parseFloat(document.getElementById("LilitanPrimer").value);

        const TapPendekPrimer =
            parseFloat(document.getElementById("TapPendekPrimer").value);

        const TotalPembagianTapPendek =
            parseFloat(document.getElementById("TotalPembagianTapPendek").value);
        if (    isNaN(LilitanPrimer) ||isNaN(TapPendekPrimer) || isNaN(TotalPembagianTapPendek) ) {
            alert("Silakan lengkapi data.");
            return;
        }
        if (LilitanPrimer === 0) {
            alert("Lilitan Primer Tidak Boleh 0.");
            return;
        }

        if (TapPendekPrimer === 0) {
            alert("Tap Pendek Primer Tidak Boleh 0.");
            return;
        }
        if (TotalPembagianTapPendek === 0) {
            alert("Total Pembagian Tap Pendek Tidak Boleh 0.");
            return;
        }
        hasil = LilitanPrimer - (TapPendekPrimer * TotalPembagianTapPendek);

        hasilRekap[3] = Math.round(hasil).toLocaleString('id-ID') + " lilitan";
    }


    /* ==========================================
       RUMUS 4
   ========================================== */
    else if (id === "4") {
    // Ambil elemen input
    const inputRusak = document.getElementById("HasilTTRLilitanYangRusak");
    const inputSekunder = document.getElementById("LilitanSekunder");

    // Pastikan elemen ditemukan
    if (!inputRusak || !inputSekunder) {
        console.log("Input Rumus 4 tidak ditemukan.");
        return;
    }

    // Ambil nilai input
    let nilaiRusak = inputRusak.value.trim();
    let nilaiSekunder = inputSekunder.value.trim();

    // Jika menggunakan koma, ubah menjadi titik
    nilaiRusak = nilaiRusak.replace(",", ".");
    nilaiSekunder = nilaiSekunder.replace(",", ".");

    // Ubah menjadi angka
    const HasilTTRLilitanYangRusak = parseFloat(nilaiRusak);
    const Lilitansekunder = parseFloat(nilaiSekunder);

    // Jika input kosong atau bukan angka
    if (
        nilaiRusak === "" ||
        nilaiSekunder === "" ||
        isNaN(HasilTTRLilitanYangRusak) ||
        isNaN(Lilitansekunder)
    ) {
        console.log("Data Rumus 4 belum lengkap.");
        return;
    }

    // Nilai tidak boleh 0
    if (HasilTTRLilitanYangRusak === 0) {
        console.log("Hasil TTR Lilitan Yang Rusak tidak boleh 0.");
        return;
    }

    if (Lilitansekunder === 0) {
        console.log("Lilitan sekunder tidak boleh 0.");
        return;
    }

    // Perhitungan
    hasil = HasilTTRLilitanYangRusak * Lilitansekunder;

    // Simpan hasil
    hasilRekap[4] =  hasil.toFixed(2) +" lilitan" ;
}
/* =========================================================
   ID TIDAK VALID
   ========================================================= */

    else {

        alert(
            "Perhitungan tidak ditemukan."
        );

        return;
    }
/* =========================================================
        TAMPILKAN HASIL
   ========================================================= */

        tampilkanHasil(
            hasilRekap[id]
        );

 /* =========================================================
        UPDATE TABEL REKAP
    ========================================================= */

        updateRekap();

}
function updateRekap() {
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`rekap${i}`);
        if (el) {
            el.textContent = hasilRekap[i] || '-';
        }
    }
}


function tampilkanHasil(nilai) {

    const hasilBox =
        document.getElementById("hasilBox");


    if (!hasilBox) {

        console.error(
            "Elemen hasilBox tidak ditemukan."
        );

        return;
    }


    hasilBox.innerHTML = `

        <div class="hasil-icon">
            ✓
        </div>

        <p>
            Hasil:
            <strong>${nilai}</strong>
        </p>

    `;
}
/* =====================================================
    UPDATE REKAP
===================================================== */

function updateRekap() {

    let selesai = 0;


    for (let i = 1; i <= 4; i++) {

        const hasil =
            document.getElementById("hasilRekap" + i);

        const status =
            document.getElementById("status" + i);


        if (hasilRekap[i] !== null) {

            hasil.textContent = hasilRekap[i];

            status.textContent = "Selesai";

            status.classList.remove("status-belum");

            status.classList.add("status-selesai");

            selesai++;

        } else {

            hasil.textContent = "—";

            status.textContent = "Belum";

            status.classList.remove("status-selesai");

            status.classList.add("status-belum");

        }

    }


    /* =================================================
       PROGRESS
    ================================================== */

    const persen =
        (selesai / 4) * 100;


    document.getElementById("progressBar").style.width =
        persen + "%";


    document.getElementById("progressText").textContent =
        selesai + " / 4";

}


/* =====================================================
   RESET HASIL
===================================================== */

function resetHasil() {

    document.getElementById("hasilBox").innerHTML = `

        <div class="hasil-icon">
            ↑
        </div>

        <p>
            Hasil akan muncul di sini
        </p>

    `;

}


/* =====================================================
   RESET INPUT
===================================================== */

function resetInput() {

    const inputs =
        document.querySelectorAll("#formInput input");


    inputs.forEach(function(input) {

        input.value = "";

    });


    resetHasil();

}
/* =====================================================
   FORM PERTAMA SAAT HALAMAN DIBUKA
===================================================== */

tampilkanForm(1);

updateRekap();

/* =========================================================
   SIMPAN HASIL KE ARSIP LOCALSTORAGE
========================================================= */

function simpanArsipRumus1() {
    const dataTrafo = JSON.parse(localStorage.getItem('data_trafo_rumus1') || '{}');
    const arsipBaru = {
        nama_teknisi: dataTrafo.nama_teknisi || '-',
        no_seri: dataTrafo.no_seri || '-',
        merk: dataTrafo.merk || '-',
        kapasitas: dataTrafo.kapasitas || '-',
        rumus: "1 (PT Mulya Jatra)",
        tanggal: new Date().toLocaleDateString('id-ID'),
        rekap: { ...hasilRekap }
    };

    const listArsip = JSON.parse(localStorage.getItem('arsip_trafo') || '[]');
    listArsip.unshift(arsipBaru);
    localStorage.setItem('arsip_trafo', JSON.stringify(listArsip));

    alert("Hasil perhitungan Rumus 1 berhasil disimpan ke Arsip!");
    window.location.href = "arsip.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const btnSimpan = document.getElementById('btn-simpan-arsip');
    if (btnSimpan) {
        btnSimpan.addEventListener('click', simpanArsipRumus1);
    }
});


