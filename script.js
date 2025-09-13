const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const quoteInput = document.getElementById('quote');
const authorInput = document.getElementById('author');
const bgStyleSelect = document.getElementById('bgStyle');
const quoteFontSelect = document.getElementById('quoteFont');
const authorFontSelect = document.getElementById('authorFont');
const quoteColorInput = document.getElementById('quoteColor');
const authorColorInput = document.getElementById('authorColor');
const boldQuoteCheckbox = document.getElementById('boldQuote');
const downloadBtn = document.getElementById('download');

// 🔥 100 warna dengan nama
const colorOptions = [
  {name:"Hitam", code:"#000000"},
  {name:"Abu-Abu", code:"#808080"},
  {name:"Putih", code:"#ffffff"},
  {name:"Merah", code:"#ff0000"},
  {name:"Merah Tua", code:"#b91c1c"},
  {name:"Jingga", code:"#ff7f00"},
  {name:"Oranye", code:"#f97316"},
  {name:"Coklat", code:"#8b4513"},
  {name:"Emas", code:"#f59e0b"},
  {name:"Kuning", code:"#ffff00"},
  {name:"Kuning Tua", code:"#facc15"},
  {name:"Hijau Muda", code:"#a3e635"},
  {name:"Hijau", code:"#16a34a"},
  {name:"Hijau Tua", code:"#065f46"},
  {name:"Hijau Toska", code:"#14b8a6"},
  {name:"Biru Muda", code:"#38bdf8"},
  {name:"Biru", code:"#2563eb"},
  {name:"Biru Laut", code:"#1e3a8a"},
  {name:"Navy", code:"#0f172a"},
  {name:"Ungu", code:"#7c3aed"},
  {name:"Ungu Muda", code:"#a78bfa"},
  {name:"Magenta", code:"#d946ef"},
  {name:"Pink", code:"#ec4899"},
  {name:"Merah Muda", code:"#f9a8d4"},
  {name:"Burgundy", code:"#7f1d1d"},
  {name:"Coral", code:"#fb7185"},
  {name:"Lavender", code:"#c4b5fd"},
  {name:"Cyan", code:"#06b6d4"},
  {name:"Teal", code:"#0d9488"},
  {name:"Indigo", code:"#4f46e5"},
  {name:"Sky", code:"#0ea5e9"},
  {name:"Emerald", code:"#059669"},
  {name:"Lime", code:"#84cc16"},
  {name:"Olive", code:"#3f6212"},
  {name:"Chocolate", code:"#78350f"},
  {name:"Amber", code:"#fbbf24"},
  {name:"Bronze", code:"#b45309"},
  {name:"Perak", code:"#94a3b8"},
  {name:"Platinum", code:"#e5e7eb"},
  {name:"Ivory", code:"#fafaf9"},
  {name:"Mint", code:"#6ee7b7"},
  {name:"Peach", code:"#fed7aa"},
  {name:"Apricot", code:"#fcd34d"},
  {name:"Salmon", code:"#fca5a5"},
  {name:"Ruby", code:"#ef4444"},
  {name:"Rose", code:"#f43f5e"},
  {name:"Scarlet", code:"#dc2626"},
  {name:"Crimson", code:"#991b1b"},
  {name:"Charcoal", code:"#334155"},
  {name:"Slate", code:"#64748b"},
  {name:"Stone", code:"#94a3b8"},
  {name:"Ash", code:"#cbd5e1"},
  {name:"Sand", code:"#f5f5dc"},
  {name:"Beige", code:"#f5f5dc"},
  {name:"Tan", code:"#d2b48c"},
  {name:"Khaki", code:"#f0e68c"},
  {name:"Mustard", code:"#d97706"},
  {name:"Copper", code:"#b87333"},
  {name:"Claret", code:"#7b2cbf"},
  {name:"Plum", code:"#701a75"},
  {name:"Mulberry", code:"#6d28d9"},
  {name:"Wine", code:"#581845"},
  {name:"Eggplant", code:"#3b0764"},
  {name:"Midnight Blue", code:"#082f49"},
  {name:"Ocean", code:"#075985"},
  {name:"Turquoise", code:"#40e0d0"},
  {name:"Aqua", code:"#00ffff"},
  {name:"Azure", code:"#007fff"},
  {name:"Denim", code:"#1d4ed8"},
  {name:"Steel Blue", code:"#4682b4"},
  {name:"Royal Blue", code:"#4169e1"},
  {name:"Dodger Blue", code:"#1e90ff"},
  {name:"Cornflower", code:"#6495ed"},
  {name:"Powder Blue", code:"#b0e0e6"},
  {name:"Ice Blue", code:"#e0f2fe"},
  {name:"Celeste", code:"#bae6fd"},
  {name:"Teal Blue", code:"#0d9488"},
  {name:"Forest Green", code:"#228b22"},
  {name:"Sea Green", code:"#2e8b57"},
  {name:"Pine Green", code:"#134e4a"},
  {name:"Moss Green", code:"#3f6212"},
  {name:"Lime Green", code:"#32cd32"},
  {name:"Chartreuse", code:"#7fff00"},
  {name:"Honeydew", code:"#f0fff0"},
  {name:"Spring Green", code:"#00ff7f"},
  {name:"Pastel Pink", code:"#fbcfe8"},
  {name:"Hot Pink", code:"#ff69b4"},
  {name:"Deep Pink", code:"#ff1493"},
  {name:"Orchid", code:"#da70d6"},
  {name:"Thistle", code:"#d8bfd8"},
  {name:"Lavender Blush", code:"#fff0f5"},
  {name:"Mauve", code:"#e0b0ff"},
  {name:"Violet", code:"#8b5cf6"},
  {name:"Fuchsia", code:"#ff00ff"},
  {name:"Gold", code:"#ffd700"},
  {name:"Sunset", code:"#fdba74"},
  {name:"Firebrick", code:"#b22222"},
  {name:"Maroon", code:"#800000"},
  {name:"Dark Olive", code:"#556b2f"},
  {name:"Dark Slate", code:"#2f4f4f"}
];

function loadBgOptions(){
  colorOptions.forEach(c=>{
    let opt = document.createElement("option");
    opt.value = "solid:"+c.code;
    opt.textContent = c.name;
    bgStyleSelect.appendChild(opt);
  });
  let gradients = [
    {val:"gradient:blue-purple",label:"Gradient Biru → Ungu"},
    {val:"gradient:orange-pink",label:"Gradient Oranye → Pink"},
    {val:"gradient:green-teal",label:"Gradient Hijau → Toska"},
  ];
  gradients.forEach(g=>{
    let opt = document.createElement("option");
    opt.value = g.val; opt.textContent = g.label;
    bgStyleSelect.appendChild(opt);
  });
  let images = [
    {val:"image:https://source.unsplash.com/800x600/?nature,water",label:"Foto Alam"},
    {val:"image:https://source.unsplash.com/800x600/?city,night",label:"Foto Kota Malam"},
    {val:"image:https://source.unsplash.com/800x600/?space,galaxy",label:"Foto Galaxy"},
  ];
  images.forEach(img=>{
    let opt = document.createElement("option");
    opt.value = img.val; opt.textContent = img.label;
    bgStyleSelect.appendChild(opt);
  });
  bgStyleSelect.selectedIndex = 0;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '', lines = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  lines.forEach((l,k)=>context.fillText(l, x, y + (k * lineHeight)));
}

function drawCanvas(){
  const quote = quoteInput.value.trim() || "Tulis quotes di sini...";
  const author = authorInput.value.trim() || "Anonim";
  const bgStyle = bgStyleSelect.value;
  const quoteFont = quoteFontSelect.value;
  const authorFont = authorFontSelect.value;
  const quoteColor = quoteColorInput.value;
  const authorColor = authorColorInput.value;
  const isBold = boldQuoteCheckbox.checked;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(bgStyle.startsWith("solid:")){
    ctx.fillStyle = bgStyle.split(":")[1];
    ctx.fillRect(0,0,canvas.width,canvas.height);
    renderText();
  } else if(bgStyle.startsWith("gradient:")){
    let type = bgStyle.split(":")[1];
    let grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    if(type==="blue-purple"){grad.addColorStop(0,"#2563eb");grad.addColorStop(1,"#7c3aed");}
    if(type==="orange-pink"){grad.addColorStop(0,"#f97316");grad.addColorStop(1,"#ec4899");}
    if(type==="green-teal"){grad.addColorStop(0,"#16a34a");grad.addColorStop(1,"#14b8a6");}
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    renderText();
  } else if(bgStyle.startsWith("image:")){
    const imgUrl = bgStyle.split(":")[1];
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.onload = ()=>{ctx.drawImage(img,0,0,canvas.width,canvas.height);renderText();};
    return;
  }

  function renderText(){
    ctx.fillStyle = quoteColor;
    ctx.font = (isBold ? "bold " : "") + "28px " + quoteFont;
    ctx.textAlign = "center";
    wrapText(ctx, '“' + quote + '”', canvas.width/2, 200, 700, 40);
    ctx.font = "22px " + authorFont;
    ctx.fillStyle = authorColor;
    ctx.fillText("— " + author, canvas.width/2, 500);
  }
}

[quoteInput, authorInput, bgStyleSelect, quoteFontSelect, authorFontSelect, quoteColorInput, authorColorInput, boldQuoteCheckbox]
  .forEach(el => el.addEventListener('input', drawCanvas));

downloadBtn.addEventListener('click', ()=>{
  const link = document.createElement('a');
  link.download = 'quotes.png';
  link.href = canvas.toDataURL();
  link.click();
});

loadBgOptions();
drawCanvas();
