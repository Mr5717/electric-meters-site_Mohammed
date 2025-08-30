/* ========== بيانات الأجهزة ========== */
const DEVICES = [
  {
    id:"meter-pro",  title:"جهاز 1",
    desc:"عداد احترافي بدقة قياس عالية واستهلاك منخفض للطاقة.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"Meter Pro يناسب المنشآت الكبيرة ويقدم تقارير استهلاك لحظية، مع دعم تصحيح معامل CT وخيارات اتصال حديثة."
  },
  {
    id:"smart-blue", title:"جهاز 2",
    desc:"عداد ذكي للمنزل مع تتبّع يومي وفواتير مبسطة.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"واجهة ذكية عبر الجوال، تنبيهات عند تجاوز الاستهلاك، ومزايا أمان متقدمة."
  },
  {
    id:"indus-max",  title:"جهاز 3",
    desc:"حل صناعي لتحمل الأحمال العالية والتقلبات.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"مناسب للمناطق الصناعية، يدعم نطاقات تيار واسعة وخوارزميات تعويض الانحراف."
  },
  {
    id:"compact-lite", title:"جهاز 4",
    desc:"تصميم صغير وكفاءة استخدام للمساحات المحدودة.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"سهل التركيب والصيانة، خيار مثالي للوحدات السكنية الصغيرة."
  },
  {
    id:"solar-sync", title:"جهاز 5",
    desc:"متوافق مع أنظمة الطاقة الشمسية وتتبع الإنتاج.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"قياس ثنائي الاتجاه مع تقارير مخصصة لإجمالي الطاقة المولدة والمستهلكة."
  },
  {
    id:"grid-guard", title:"جهاز 6",
    desc:"أمان الشبكة ومراقبة الجودة اللحظية.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"يحلل جودة الجهد، التوافقيات، ويوفّر سجل أحداث مفصل."
  },
  {
    id:"aqua-proof", title:"جهاز 7",
    desc:"مقاوم للماء والغبار للاستخدام الخارجي القاسي.",
    thumb:"assets/images/slide.jpg",
    hero :"assets/images/slide.jpg",
    details:"هيكل IP67 مع حساسات حرارة لضمان الاستقرار في البيئات المفتوحة."
  },
];

/* ========== أدوات مساعدة للروابط النسبية ========== */
const inDevices = location.pathname.includes("/devices/");
const ROOT = inDevices ? "../../" : "./";

/* ========== دالة إغلاق كل القوائم المنسدلة ========== */
function closeAllDropdowns(){
  document.querySelectorAll(".dropdown.open").forEach(el=>{
    el.classList.remove("open");
    el.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded","false");
  });
}

/* ========== بناء قائمة الهيدر مع Dropdown (toggle صحيح) ========== */
(function buildHeader(){
  const ul = document.getElementById("devicesMenu");
  if (!ul) return;
  ul.innerHTML = "";

  DEVICES.forEach(d=>{
    const li = document.createElement("li");
    li.className = "dropdown";
    li.innerHTML = `
      <button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">${d.title}</button>
      <div class="dropdown-menu" role="menu">
        <a href="${ROOT}devices/${d.id}/index.html" role="menuitem">تفاصيل</a>
        <a href="${ROOT}devices/${d.id}/calc.html" role="menuitem">حساب</a>
      </div>`;

    const btn = li.querySelector(".dropdown-toggle");
    btn.addEventListener("click",(e)=>{
      e.stopPropagation();
      const wasOpen = li.classList.contains("open");
      closeAllDropdowns();                         // أقفل الكل
      if (!wasOpen){                               // إن كانت مقفولة افتحها
        li.classList.add("open");
        btn.setAttribute("aria-expanded","true");
      } else {                                     // إن كانت مفتوحة أقفلها (لا شيء)
        btn.setAttribute("aria-expanded","false");
      }
    });

    ul.appendChild(li);
  });

  // شعار/اسم الموقع يرجّع للرئيسية الصحيحة
  document.querySelectorAll(".brand").forEach(a=>a.setAttribute("href", ROOT + "index.html"));

  // الضغط خارج القوائم أو Esc يقفلها
  document.addEventListener("click", closeAllDropdowns);
  document.addEventListener("keydown", (e)=>{ if (e.key === "Escape") closeAllDropdowns(); });
})();

/* ========== الرئيسية: رسم الكروت + البحث ========== */
(function home(){
  const grid = document.getElementById("cardsGrid");
  if (!grid) return; // ليس في الرئيسية

  function render(filter=""){
    const q = filter.trim().toLowerCase();
    const list = DEVICES.filter(d=>d.title.toLowerCase().includes(q));
    grid.innerHTML = "";
    list.forEach(d=>{
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <img class="thumb" src="${ROOT}${d.thumb}" alt="${d.title}">
        <div class="title">${d.title}</div>
        <div class="subtitle">${d.desc}</div>
        <div class="cta">
          <a class="btn ghost"   href="${ROOT}devices/${d.id}/index.html">اعرف المزيد</a>
          <a class="btn primary" href="${ROOT}devices/${d.id}/calc.html">احسب</a>
        </div>`;
      grid.appendChild(el);
    });
    if (list.length===0){
      const p=document.createElement("p");
      p.style.color="#6b7280"; p.textContent="لا توجد أجهزة مطابقة لبحثك.";
      grid.appendChild(p);
    }
  }

  const searchForm = document.getElementById("searchForm");
  const searchInput= document.getElementById("searchInput");
  searchForm?.addEventListener("submit",(e)=>{e.preventDefault(); render(searchInput.value);});
  searchInput?.addEventListener("input",()=> render(searchInput.value));
  render("");
})();

/* ========== صفحات التفاصيل ========== */
(function details(){
  const holder = document.getElementById("detailLayout");
  if (!holder) return;

  const id = holder.dataset.deviceId;
  const d  = DEVICES.find(x => x.id === id);
  if (!d) { holder.innerHTML = "<p>الجهاز غير موجود.</p>"; return; }

  const longText = [
    d.details,
    "يقدّم هذا الجهاز تقارير استهلاك مفصّلة بالساعة واليوم مع تنبيهات ذكية عند تجاوز الحدود المسموح بها، مما يساعد على إدارة الأحمال بكفاءة.",
    "يدعم معايرة CT واكتشاف الانحرافات اللحظية في الجهد والتيار مع سجل أحداث شامل لتحليل الأداء وتسهيل الصيانة الوقائية.",
    "تم تصميمه ليتوافق مع أحدث معايير الأمان والتكامل مع أنظمة الشبكات، ويتيح ربطاً مرناً عبر بروتوكولات اتصال حديثة."
  ].join(" ");

  holder.innerHTML = `
    <div class="detail-card-inner">
      <header class="detail-header">
        <h2 class="detail-title">${d.title}</h2>
      </header>

      <figure class="detail-figure">
        <img src="${ROOT}${(d.hero || d.thumb)}" alt="${d.title}">
      </figure>

      <div class="detail-body">
        <p class="detail-long">${longText}</p>
      </div>
    </div>
  `;
})();

/* ========== صفحات الحساب: حساب + تصدير ========== */
(function calc(){
  const titleEl = document.getElementById("calcTitle");
  if (!titleEl) return;

  const id = titleEl.dataset.deviceId;
  const d  = DEVICES.find(x=>x.id===id);
  titleEl.textContent = d ? `حساب — ${d.title}` : "حساب الجهاز";
  document.title      = d ? `حساب — ${d.title}` : document.title;

  // زر احسب
  document.getElementById("calcBtn")?.addEventListener("click", ()=>{
    const values = getCalcValues();
    const nums = Object.values(values).map(v=>parseFloat(v)).filter(n=>!Number.isNaN(n));
    const sum  = nums.reduce((a,b)=>a+b,0);

    const resultBox = document.getElementById("calcResult");
    if (resultBox){
      resultBox.textContent = nums.length ? `المجموع التقريبي للقيم المدخلة: ${sum}` : "لم يتم إدخال قيم رقمية.";
    }
  });

  // أزرار التصدير
  document.getElementById("exportExcelBtn")?.addEventListener("click", ()=>{
    exportToExcelCSV((d && d.title) || "device");
  });
  document.getElementById("exportPdfBtn")?.addEventListener("click", ()=>{
    exportToPDF((d && d.title) || "device");
  });
})();

function normalizeDigits(s){
  if (!s) return "";
  const map = {'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9',
               '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9',
               '٫':'.','،':'.',',':'.'};
  return String(s).replace(/[٠-٩۰-۹٫،,]/g, ch => map[ch] ?? ch);
}


/* ===== Helpers: تجميع القيم ===== */
function getCalcValues(){
  const val = id => normalizeDigits(document.getElementById(id)?.value || "");
  return {
    Is1: val("is1"),
    Is2: val("is2"),
    K1:  val("k1"),
    K2:  val("k2"),
    CTCorrection: val("ctCorrection"),
    Idmin: val("idmin"),
    "Idmin (coopback)": val("idminCoopback"),
    "Lower slope": val("lowerSlope"),
    "Uper slope": val("uperSlope"),
  };
}

function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* ====== تصدير Excel بشكل عمودي: [الحقل , القيمة] ====== */
function exportToExcelCSV(deviceName = "device"){
  const data = getCalcValues();
  const rows = Object.entries(data).map(([k, v]) => [k, v || "-"]); // [[label,value],..]
  const base = `نتيجة _${deviceName}`;

  if (window.XLSX) {
    const aoa = [["الحقل", "القيمة"], ...rows];
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws["!cols"] = [{ wch: 24 }, { wch: 20 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "النتيجة");
    XLSX.writeFile(wb, `${base}.xlsx`);
    return;
  }

  // CSV بديل (عمودي)
  const header = `"الحقل","القيمة"`;
  const body   = rows
    .map(([k,v]) => `"${String(k).replace(/"/g,'""')}","${String(v).replace(/"/g,'""')}"`)
    .join("\r\n");
  const csv = "\uFEFF" + header + "\r\n" + body;  // BOM + UTF-8
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `${base}.csv`);
}

/* ====== تصدير PDF نظيف بالاسم: "نتيجة _اسم الجهاز" ====== */
/* ====== تصدير PDF نظيف بالاسم: "نتيجة _اسم الجهاز" + تاريخ ====== */
function exportToPDF(deviceName = "device"){
  const baseFile = `نتيجة _${deviceName}`;

  const data = getCalcValues();
  const rowsHtml = Object.entries(data)
    .map(([k, v]) => `<tr><th>${k}</th><td>${v || "-"}</td></tr>`)
    .join("");

  const dateStr = new Date().toLocaleString("ar-SA"); // ✅ التاريخ يرجع

  const wrapper = document.createElement("div");
  wrapper.dir = document.documentElement.dir || "rtl";
  wrapper.style.position = "fixed";
  wrapper.style.left = "-10000px";
  wrapper.innerHTML = `
    <div class="wrap">
      <h1 style="margin:0 0 8px;color:#0b1b34;font-weight:800">نتيجة الحساب — ${deviceName}</h1>
      <p style="color:#6b7280;margin:0 0 12px">تاريخ الإنشاء: ${dateStr}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:8px">
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    .wrap{max-width:800px;margin:0 auto;padding:16px 0;
      font-family:system-ui,"Noto Naskh Arabic",Tahoma,Arial;color:#0f172a}
    th,td{padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right}
    th{width:35%;background:#f8fafc;font-weight:700}
  `;
  wrapper.prepend(style);
  document.body.appendChild(wrapper);

  if (window.html2pdf) {
    const opt = {
      margin: [10,10,10,10],
      filename: `${baseFile}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] }
    };
    html2pdf().from(wrapper).set(opt).save().finally(() => wrapper.remove());
    return;
  }

  const w = window.open("", "_blank");
  w.document.write(`
    <!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
    <title>${baseFile}</title>
    <style>${style.textContent}</style>
    </head><body>${wrapper.innerHTML}
    <script>window.onload=()=>window.print()<\/script>
    </body></html>
  `);
  w.document.close();
  wrapper.remove();
}


/* هيدر الموبايل: فتح/قفل القائمة (بدون تأثيرات إضافية) */
(function mobileHeader(){
  const header = document.querySelector('.site-header');
  const btn    = document.querySelector('.menu-toggle');
  const menu   = document.getElementById('devicesMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    header.classList.toggle('open');
    btn.setAttribute('aria-expanded', header.classList.contains('open'));
  });

  document.addEventListener('click', ()=> {
    header.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
  });

  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 680){
      header.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
})();
