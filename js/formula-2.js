/* =========================================================
   DATA PERHITUNGAN RUMUS 2 (JURNAL)
   ========================================================= */
const dataPerhitungan = {
  1: {
    title: "Rasio Tegangan Antar Tap (X)",
    fields: [
      { id: "selisihteganganantarsadapan", label: "Selisih Tegangan Antar Sadapan (ΔVtm)" },
      { id: "tegangankeluarantrafopadasisiteganganrendah", label: "Tegangan Keluaran Trafo Pada Sisi Tegangan Rendah (Vtr)" }
    ]
  },
  2: {
    title: "Jumlah Lilitan Sekunder (Ns)",
    fields: [
      { id: "jumlahlilitanantartap", label: "Jumlah Lilitan Antar Tap (Aft)" },
      { id: "rasioteganganantartap", label: "Rasio Tegangan Antar Tap (X)" }
    ]
  },
  3: {
    title: "Jumlah Lilitan Primer (Np)",
    fields: [
      { id: "teganganprimer", label: "Tegangan Primer (Vp)" },
      { id: "tegangansekunder", label: "Tegangan Sekunder (Vs)" },
      { id: "lilitansekunder", label: "Lilitan Sekunder (Ns)" }
    ]
  },
  4: {
    title: "Jumlah Lilitan Dalam Satu Lapis (Ny)",
    fields: [
      { id: "tinggicoil", label: "Tinggi Coil (Hc)", satuan: "mm" },
      { id: "lebarringban", label: "Lebar Ring Ban (Wr)", satuan: "mm" },
      { id: "diameterkawatenamel", label: "Diameter Kawat Enamel (Dw)", satuan: "mm" }
    ]
  },
  5: {
    title: "Jumlah Lapisan Lilitan (Nl)",
    fields: [
      { id: "lilitanprimer", label: "Lilitan Primer (Np)" },
      { id: "jumlahlilitandalamsatulapis", label: "Jumlah Lilitan Dalam Satu Lapis (Ny)" }
    ]
  }
};

const hasilRekap = { 1: null, 2: null, 3: null, 4: null, 5: null };

/* =========================================================
   NAVIGASI & TAB RUMUS
   ========================================================= */
const pilihan = document.querySelectorAll(".pilihan");
pilihan.forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.dataset.id;
    pilihan.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    document.getElementById("judulHalaman").textContent = dataPerhitungan[id].title;
    tampilkanForm(id);
  });
});

function tampilkanForm(id) {
  const formInput = document.getElementById("formInput");
  if (!formInput || !dataPerhitungan[id]) return;

  let html = "";
  dataPerhitungan[id].fields.forEach((field) => {
    html += `
      <div class="form-group">
        <label for="${field.id}">${field.label}</label>
        <div class="input-satuan">
          <input type="number" id="${field.id}" placeholder="Masukkan nilai" step="any">
          ${field.satuan ? `<span class="satuan">${field.satuan}</span>` : ""}
        </div>
      </div>
    `;
  });
  formInput.innerHTML = html;
}

/* =========================================================
   LOGIKA PROSES PERHITUNGAN
   ========================================================= */
function hitung() {
  const tombolAktif = document.querySelector(".pilihan.active");
  if (!tombolAktif) { alert("Silakan pilih perhitungan terlebih dahulu."); return; }

  const id = tombolAktif.dataset.id;
  let hasil = 0;

  if (id === "1") {
    const v1 = parseFloat(document.getElementById("selisihteganganantarsadapan")?.value);
    const v2 = parseFloat(document.getElementById("tegangankeluarantrafopadasisiteganganrendah")?.value);
    if (isNaN(v1) || isNaN(v2) || v1 === 0 || v2 === 0) { alert("Data tidak boleh kosong atau bernilai 0."); return; }
    hasil = (v1 / v2) * Math.sqrt(3);
    hasilRekap[1] = hasil.toFixed(4);
  } else if (id === "2") {
    const v1 = parseFloat(document.getElementById("jumlahlilitanantartap")?.value);
    const v2 = parseFloat(document.getElementById("rasioteganganantartap")?.value);
    if (isNaN(v1) || isNaN(v2) || v1 === 0 || v2 === 0) { alert("Data tidak boleh kosong atau bernilai 0."); return; }
    hasil = v1 / v2;
    hasilRekap[2] = Math.round(hasil).toLocaleString("id-ID") + " lilitan";
  } else if (id === "3") {
    const vp = parseFloat(document.getElementById("teganganprimer")?.value);
    const vs = parseFloat(document.getElementById("tegangansekunder")?.value);
    const ns = parseFloat(document.getElementById("lilitansekunder")?.value);
    if (isNaN(vp) || isNaN(vs) || isNaN(ns) || vp === 0 || vs === 0 || ns === 0) { alert("Data tidak boleh kosong atau bernilai 0."); return; }
    hasil = (vp / vs) * ns * Math.sqrt(3);
    hasilRekap[3] = Math.round(hasil).toLocaleString("id-ID") + " lilitan";
  } else if (id === "4") {
    const hc = parseFloat(document.getElementById("tinggicoil")?.value);
    const wr = parseFloat(document.getElementById("lebarringban")?.value);
    const dw = parseFloat(document.getElementById("diameterkawatenamel")?.value);
    if (isNaN(hc) || isNaN(wr) || isNaN(dw) || dw === 0) { alert("Data tidak valid."); return; }
    hasil = (hc - 2 * wr) / (dw + 0.1);
    hasilRekap[4] = Math.round(hasil).toLocaleString("id-ID") + " lilitan";
  } else if (id === "5") {
    const np = parseFloat(document.getElementById("lilitanprimer")?.value);
    const ny = parseFloat(document.getElementById("jumlahlilitandalamsatulapis")?.value);
    if (isNaN(np) || isNaN(ny) || ny === 0) { alert("Data tidak valid."); return; }
    hasil = np / ny;
    hasilRekap[5] = Math.round(hasil).toLocaleString("id-ID") + " lapisan";
  }

  tampilkanHasil(hasilRekap[id]);
  updateRekap();
}

function tampilkanHasil(nilai) {
  const hasilBox = document.getElementById("hasilBox");
  if (hasilBox) {
    hasilBox.innerHTML = `
      <div class="hasil-icon">✓</div>
      <p>Hasil: <strong>${nilai}</strong></p>
    `;
  }
}

function updateRekap() {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`rekap${i}`);
    if (el) el.textContent = hasilRekap[i] || "-";
  }
}

function resetHasil() {
  const hasilBox = document.getElementById("hasilBox");
  if (hasilBox) {
    hasilBox.innerHTML = `<div class="hasil-icon">?</div><p>Hasil perhitungan akan muncul di sini.</p>`;
  }
}

function resetInput() {
  const inputs = document.querySelectorAll("#formInput input");
  inputs.forEach((input) => (input.value = ""));
  resetHasil();
}

function simpanArsipRumus2() {
  const dataTrafo = JSON.parse(localStorage.getItem("data_trafo_rumus2") || "{}");
  const arsipBaru = {
    nama_teknisi: dataTrafo.nama_teknisi || "-",
    no_seri: dataTrafo.no_seri || "-",
    merk: dataTrafo.merk || "-",
    kapasitas: dataTrafo.kapasitas || "-",
    rumus: "2 (Jurnal)",
    tanggal: new Date().toLocaleDateString("id-ID"),
    rekap: { ...hasilRekap }
  };

  const listArsip = JSON.parse(localStorage.getItem("arsip_trafo") || "[]");
  listArsip.unshift(arsipBaru);
  localStorage.setItem("arsip_trafo", JSON.stringify(listArsip));

  alert("Hasil perhitungan Rumus 2 berhasil disimpan ke Arsip!");
  window.location.href = "archive.html";
}

document.addEventListener("DOMContentLoaded", () => {
  tampilkanForm(1);
  updateRekap();
  const btnSimpan = document.getElementById("btn-simpan-arsip");
  if (btnSimpan) btnSimpan.addEventListener("click", simpanArsipRumus2);
});
