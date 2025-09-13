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
const quoteSizeInput = document.getElementById('quoteSize');
const authorSizeInput = document.getElementById('authorSize');
const downloadBtn = document.getElementById('download');

// 🔥 contoh warna dasar
const colorOptions = [
  {name:"Hitam", code:"#000000"},
  {name:"Putih", code:"#ffffff"},
  {name:"Merah", code:"#ff0000"},
  {name:"Biru", code:"#2563eb"},
  {name:"Hijau", code:"#16a34a"},
  {name:"Kuning", code:"#ffff00"},
  {name:"Ungu", code:"#7c3aed"},
  {name:"Pink", code:"#ec4899"},
  {name:"Coklat", code:"#8b4513"},
  {name:"Abu-Abu", code:"#808080"},
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
    {val:"image:https://source.unsplash.com/1280x1280/?nature,water",label:"Foto Alam"},
    {val:"image:https://source.unsplash.com/1280x1280/?city,night",label:"Foto Kota Malam"},
    {val:"image:https://source.unsplash.com/1280x1280/?space,galaxy",label:"Foto Galaxy"},
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
  const quoteSize = parseInt(quoteSizeInput.value) || 48;
  const authorSize = parseInt(authorSizeInput.value) || 32;

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
    ctx.font = (isBold ? "bold " : "") + quoteSize + "px " + quoteFont;
    ctx.textAlign = "center";
    wrapText(ctx, '“' + quote + '”', canvas.width/2, 400, 1000, quoteSize + 12);

    ctx.font = authorSize + "px " + authorFont;
    ctx.fillStyle = authorColor;
    ctx.fillText("— " + author, canvas.width/2, 1100);
  }
}

[
  quoteInput, authorInput, bgStyleSelect,
  quoteFontSelect, authorFontSelect,
  quoteColorInput, authorColorInput,
  boldQuoteCheckbox, quoteSizeInput, authorSizeInput
].forEach(el => el.addEventListener('input', drawCanvas));

downloadBtn.addEventListener('click', ()=>{
  const link = document.createElement('a');function drawTextWithEmoji(ctx, text, x, y, fontSize, font, color, maxWidth) {
  let parsed = twemoji.parse(text, { folder: 'svg', ext: '.svg' });

  // Regex untuk split emoji dan text biasa
  const parts = text.split(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu);

  let offsetX = x - maxWidth / 2; // mulai dari kiri agar center
  ctx.font = fontSize + "px " + font;
  ctx.fillStyle = color;

  parts.forEach(part => {
    if (!part) return;

    // Kalau bagian ini emoji
    if (/\p{Emoji}/u.test(part)) {
      let codePoint = twemoji.convert.toCodePoint(part);
      let img = new Image();
      img.src = `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`;
      img.onload = () => {
        ctx.drawImage(img, offsetX, y - fontSize, fontSize, fontSize);
      };
      offsetX += fontSize;
    } else {
      ctx.fillText(part, offsetX, y);
      offsetX += ctx.measureText(part).width;
    }
  });
  }
  link.download = 'quotes.png';
  link.href = canvas.toDataURL();
  link.click();
});

loadBgOptions();
function drawTextWithEmoji(ctx, text, x, y, fontSize, font, color, maxWidth) {
  let parsed = twemoji.parse(text, { folder: 'svg', ext: '.svg' });

  // Regex untuk split emoji dan text biasa
  const parts = text.split(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu);

  let offsetX = x - maxWidth / 2; // mulai dari kiri agar center
  ctx.font = fontSize + "px " + font;
  ctx.fillStyle = color;

  parts.forEach(part => {
    if (!part) return;

    // Kalau bagian ini emoji
    if (/\p{Emoji}/u.test(part)) {
      let codePoint = twemoji.convert.toCodePoint(part);
      let img = new Image();
      img.src = `https://twemoji.maxcdn.com/v/latest/svg/${codePoint}.svg`;
      img.onload = () => {
        ctx.drawImage(img, offsetX, y - fontSize, fontSize, fontSize);
      };
      offsetX += fontSize;
    } else {
      ctx.fillText(part, offsetX, y);
      offsetX += ctx.measureText(part).width;
    }
  });
}
drawCanvas();
