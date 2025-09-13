const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const quoteInput = document.getElementById('quote');
const authorInput = document.getElementById('author');
const bgStyleSelect = document.getElementById('bgStyle');
const quoteFontSelect = document.getElementById('quoteFont');
const authorFontSelect = document.getElementById('authorFont');
const boldQuoteCheckbox = document.getElementById('boldQuote');
const quoteSizeInput = document.getElementById('quoteSize');
const authorSizeInput = document.getElementById('authorSize');
const quoteColorInput = document.getElementById('quoteColor');
const authorColorInput = document.getElementById('authorColor');
const downloadBtn = document.getElementById('download');

// === Background Options ===
const solidColors = [
  "solid:#1e293b","solid:#2563eb","solid:#dc2626","solid:#16a34a","solid:#9333ea",
  "solid:#ea580c","solid:#eab308","solid:#0d9488","solid:#0284c7","solid:#64748b"
];
const gradients = [
  "gradient:linear, #ff7e5f, #feb47b",
  "gradient:linear, #4facfe, #00f2fe",
  "gradient:linear, #43e97b, #38f9d7",
  "gradient:linear, #fa709a, #fee140",
  "gradient:linear, #a18cd1, #fbc2eb"
];
const images = [
  "image:https://picsum.photos/id/1003/1280/1280",
  "image:https://picsum.photos/id/1015/1280/1280",
  "image:https://picsum.photos/id/1025/1280/1280"
];

[...solidColors, ...gradients, ...images].forEach(style=>{
  let opt=document.createElement('option');
  opt.value=style;
  opt.textContent=style;
  bgStyleSelect.appendChild(opt);
});
bgStyleSelect.value=solidColors[0];

// === Fungsi Twemoji Draw ===
function drawTextWithEmoji(ctx, text, x, y, fontSize, font, color, maxWidth) {
  const parts = text.split(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu);
  let offsetX = x - maxWidth/2;
  ctx.font = fontSize + "px " + font;
  ctx.fillStyle = color;

  parts.forEach(part => {
    if (!part) return;
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

// === Render Text ===
function renderText(quote, author, quoteFont, authorFont, quoteColor, authorColor, isBold, quoteSize, authorSize){
  ctx.textAlign = "left"; // biar offsetX manual bisa dipakai
  drawTextWithEmoji(ctx, '“' + quote + '”', canvas.width/2, 400, quoteSize, (isBold?"bold ":"") + quoteFont, quoteColor, 1000);
  drawTextWithEmoji(ctx, "— " + author, canvas.width/2, 1100, authorSize, authorFont, authorColor, 1000);
}

// === Draw Canvas ===
function drawCanvas(){
  const quote = quoteInput.value.trim() || "Tulis quotes di sini...";  
  const author = authorInput.value.trim() || "Anonim";  
  const bgStyle = bgStyleSelect.value;  
  const quoteFont = quoteFontSelect.value;  
  const authorFont = authorFontSelect.value;  
  const quoteColor = quoteColorInput.value;  
  const authorColor = authorColorInput.value;  
  const isBold = boldQuoteCheckbox.checked;  
  const quoteSize = parseInt(quoteSizeInput.value);  
  const authorSize = parseInt(authorSizeInput.value);  

  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(bgStyle.startsWith("solid:")){
    ctx.fillStyle = bgStyle.split(":")[1];
    ctx.fillRect(0,0,canvas.width,canvas.height);
    renderText(quote, author, quoteFont, authorFont, quoteColor, authorColor, isBold, quoteSize, authorSize);
  } else if(bgStyle.startsWith("gradient:")){
    let colors = bgStyle.split(",");
    let grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grad.addColorStop(0, colors[1]);
    grad.addColorStop(1, colors[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    renderText(quote, author, quoteFont, authorFont, quoteColor, authorColor, isBold, quoteSize, authorSize);
  } else if(bgStyle.startsWith("image:")){
    const imgUrl = bgStyle.split(":")[1];
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;
    img.onload = ()=> {
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      renderText(quote, author, quoteFont, authorFont, quoteColor, authorColor, isBold, quoteSize, authorSize);
    }
    return;
  }
}

// === Live Preview ===
[quoteInput, authorInput, bgStyleSelect, quoteFontSelect, authorFontSelect, boldQuoteCheckbox, quoteSizeInput, authorSizeInput, quoteColorInput, authorColorInput]
.forEach(el=> el.addEventListener("input", drawCanvas));

downloadBtn.addEventListener("click", ()=>{
  const link = document.createElement('a');
  link.download = 'quotes.png';
  link.href = canvas.toDataURL();
  link.click();
});

drawCanvas(); // init
