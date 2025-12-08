const DATA = {
  sabores: [
    "Cheddar",
    "Bacon",
    "Queijo Parmesão",
    "Cebola & Salsa",
    "Churrasco",
    "Picante Mexicano",
    "Limão",
    "Frango Grelhado",
    "Pimenta Jalapeño",
    "Wasabi"
  ],
  texturas: [
    "Crocante",
    "Ondulada",
    "Extra crocante",
    "Puff",
    "Aeração leve",
    "Macia por dentro"
  ],
  formatos: [
    "Triangular",
    "Redondo",
    "Ondinha",
    "Palito",
    "Tubinho",
    "Estrela",
    "Conchinha"
  ],
  cores: [
    {name:"Amarelo", hex:"#F6B21A"},
    {name:"Laranja", hex:"#FF8A3D"},
    {name:"Vermelho", hex:"#FF5E5E"},
    {name:"Verde", hex:"#1FB16B"},
    {name:"Roxo", hex:"#7B61FF"},
    {name:"Azul", hex:"#1E90FF"},
    {name:"Dourado", hex:"#D4AF37"},
    {name:"Preto", hex:"#000000"},
    {name:"Branco", hex:"#FFFFFF"}
  ]
};


let state = {
  step: 1,
  formato: null,
  cor: null,
  textura: null,
  sabor: null
};


const formatsGrid = document.getElementById('formatsGrid');
const colorsGrid = document.getElementById('colorsGrid');
const texturasGrid = document.getElementById('texturasGrid');
const saboresGrid = document.getElementById('saboresGrid');

const previewShape = document.getElementById('previewShape');
const previewInfo = document.getElementById('previewInfo');

const panels = document.querySelectorAll('[data-panel]');
const stepEls = document.querySelectorAll('#stepsRow [data-step]');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const summaryCard = document.getElementById('summaryCard');
const summaryContent = document.getElementById('summaryContent');
const addToCartBtn = document.getElementById('addToCartBtn');
const editBtn = document.getElementById('editBtn');


function createFormatButton(name){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'format-item';
  btn.dataset.value = name;
  btn.innerHTML = `
    <div class="format-icon" aria-hidden="true">${formatIconSVG(name)}</div>
    <div class="format-label">${name}</div>
  `;
  return btn;
}

function createColorItem(color){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'color-item';
  btn.dataset.name = color.name;
  btn.dataset.hex = color.hex;
  btn.innerHTML = `
    <div class="swatch" style="background:${color.hex}"></div>
    <div class="color-label">${color.name}</div>
  `;
  return btn;
}

function createTextureItem(name){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'texture-item';
  btn.dataset.value = name;
  btn.innerHTML = `
    <div class="texture-icon">${textureIconSVG(name)}</div>
    <div class="texture-label">${name}</div>
  `;
  return btn;
}

function createSaborItem(name){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sabor-item';
  btn.dataset.value = name;
  btn.innerHTML = `
    <div class="sabor-icon">${saborIconSVG(name)}</div>
    <div class="sabor-label">${name}</div>
  `;
  return btn;
}

/* small SVG/icon generators (simple, lightweight visuals) */
function formatIconSVG(name){
  // simple shapes
  switch(name.toLowerCase()){
    case 'triangular':
    case 'triangular': return `<svg width="48" height="36" viewBox="0 0 100 80"><path d="M50 6 L92 72 H8 Z" fill="#b3001b"/></svg>`;
    case 'redondo': return `<svg width="48" height="36" viewBox="0 0 100 80"><circle cx="50" cy="40" r="28" fill="#b3001b"/></svg>`;
    case 'ondinha': return `<svg width="48" height="36" viewBox="0 0 100 80"><path d="M5 50 q15 -40 30 0 t30 0 t30 0" stroke="#b3001b" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
    case 'palito': return `<svg width="48" height="36" viewBox="0 0 100 80"><rect x="42" y="6" width="16" height="68" rx="8" fill="#b3001b"/></svg>`;
    case 'tubinho': return `<svg width="48" height="36" viewBox="0 0 100 80"><ellipse cx="50" cy="40" rx="22" ry="10" fill="#b3001b"/></svg>`;
    case 'estrela': return `<svg width="48" height="36" viewBox="0 0 100 80"><path d="M50 8 L61 36 L92 36 L67 54 L76 82 L50 64 L24 82 L33 54 L8 36 L39 36 Z" fill="#b3001b"/></svg>`;
    case 'conchinha': return `<svg width="48" height="36" viewBox="0 0 100 80"><path d="M50 10 C28 10 12 30 12 50 C12 66 28 74 50 74 C72 74 88 66 88 50 C88 30 72 10 50 10 Z" fill="#b3001b"/></svg>`;
    default: return `<svg width="48" height="36" viewBox="0 0 100 80"><rect x="10" y="10" width="80" height="60" rx="10" fill="#b3001b"/></svg>`;
  }
}

function textureIconSVG(name){
  // tiny pattern suggestions
  const n = name.toLowerCase();
  if(n.includes('puff')) return `<svg width="40" height="24" viewBox="0 0 100 40"><circle cx="20" cy="20" r="8" fill="#b3001b"/><circle cx="40" cy="18" r="6" fill="#b3001b"/><circle cx="60" cy="22" r="7" fill="#b3001b"/></svg>`;
  if(n.includes('ond') || n.includes('ondulada')) return `<svg width="40" height="24" viewBox="0 0 100 40"><path d="M0 24 Q20 8 40 24 T80 24 T120 24" stroke="#b3001b" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
  if(n.includes('extra') || n.includes('crocante')) return `<svg width="40" height="24" viewBox="0 0 100 40"><rect x="6" y="8" width="12" height="12" rx="3" fill="#b3001b"/><rect x="28" y="8" width="12" height="12" rx="3" fill="#b3001b"/><rect x="50" y="8" width="12" height="12" rx="3" fill="#b3001b"/></svg>`;
  if(n.includes('aeração') || n.includes('macia')) return `<svg width="40" height="24" viewBox="0 0 100 40"><circle cx="18" cy="20" r="6" fill="#b3001b"/><circle cx="36" cy="12" r="3" fill="#b3001b"/><circle cx="60" cy="22" r="5" fill="#b3001b"/></svg>`;
  return `<svg width="40" height="24" viewBox="0 0 100 40"><path d="M10 30 L30 10 L50 30 L70 10" stroke="#b3001b" stroke-width="5" fill="none"/></svg>`;
}

function saborIconSVG(name){
  const n = name.toLowerCase();
  if(n.includes('cheddar')) return `<svg width="40" height="32" viewBox="0 0 100 80"><rect x="12" y="22" width="76" height="36" rx="6" fill="#ffbd3a"/></svg>`;
  if(n.includes('bacon')) return `<svg width="40" height="32" viewBox="0 0 100 80"><path d="M10 40 q20 -20 40 0 t40 0" fill="#b3001b"/></svg>`;
  if(n.includes('queijo')) return `<svg width="40" height="32" viewBox="0 0 100 80"><polygon points="10,60 50,10 90,60" fill="#f0c85a"/></svg>`;
  if(n.includes('cebola')||n.includes('salsa')) return `<svg width="40" height="32" viewBox="0 0 100 80"><circle cx="30" cy="40" r="10" fill="#e6d3b3"/><circle cx="70" cy="40" r="6" fill="#1fb16b"/></svg>`;
  if(n.includes('churrasco')) return `<svg width="40" height="32" viewBox="0 0 100 80"><rect x="10" y="30" width="80" height="20" rx="6" fill="#8b3a2a"/></svg>`;
  if(n.includes('picante')||n.includes('jalapeño')||n.includes('pimenta')) return `<svg width="40" height="32" viewBox="0 0 100 80"><path d="M50 10 q20 10 10 30 q-10 25 -30 10 q-10 -10 10 -50" fill="#d12b2b"/></svg>`;
  if(n.includes('limão')) return `<svg width="40" height="32" viewBox="0 0 100 80"><circle cx="40" cy="40" r="14" fill="#d4f483"/><path d="M40 26 L40 54" stroke="#9dcf2b" stroke-width="2"/></svg>`;
  if(n.includes('frango')) return `<svg width="40" height="32" viewBox="0 0 100 80"><ellipse cx="50" cy="40" rx="24" ry="14" fill="#f4d6b0"/></svg>`;
  if(n.includes('wasabi')) return `<svg width="40" height="32" viewBox="0 0 100 80"><path d="M20 50 q30 -40 60 0 q-30 20 -60 0" fill="#7bbf4a"/></svg>`;
  return `<svg width="40" height="32" viewBox="0 0 100 80"><rect x="18" y="18" width="64" height="28" rx="6" fill="#b3001b"/></svg>`;
}

/* render preview shape based on format + color + texture */
function renderPreview(){
 const f = state.formato;
 const c = state.cor ? state.cor.hex : '#f6e3c9';
 const t = state.textura;
 let shapeSvg = '';

 // Esconde o summary card ao interagir com a preview (boa prática)
 summaryCard.hidden = true; 

 if(!f){
  previewShape.innerHTML = `<div class="placeholder-shape">Escolha uma forma →</div>`;
 } else {
  // 1. Gere o SVG da forma principal
  switch(f.toLowerCase()){
   // ... código completo do switch case para as formas ...
   case 'triangular':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid meet"><path d="M100 10 L190 150 L10 150 Z" fill="${c}"/></svg>`;
    break;
   case 'redondo':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><circle cx="100" cy="80" r="58" fill="${c}"/></svg>`;
    break;
   case 'ondinha':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><path d="M10 90 q30 -60 60 0 t60 0 t60 0" stroke="${c}" stroke-width="18" stroke-linecap="round" fill="none"/></svg>`;
    break;
   case 'palito':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><rect x="92" y="6" width="16" height="148" rx="8" fill="${c}"/></rect></svg>`;
    break;
   case 'tubinho':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><ellipse cx="100" cy="80" rx="62" ry="30" fill="${c}"/></ellipse></svg>`;
    break;
   case 'estrela':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><path d="M100 18 L120 70 L176 72 L132 104 L148 152 L100 126 L52 152 L68 104 L24 72 L80 70 Z" fill="${c}"/></path></svg>`;
    break;
   case 'conchinha':
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><path d="M100 20 C70 20 45 50 45 80 C45 104 64 124 100 124 C136 124 155 104 155 80 C155 50 130 20 100 20 Z" fill="${c}"/></path></svg>`;
    break;
   default:
    shapeSvg = `<svg class="shape-svg" viewBox="0 0 200 160"><rect x="30" y="20" width="140" height="120" rx="16" fill="${c}"/></rect></svg>`;
  }

  // 2. Gere o SVG da textura (overlay)
  let textureSvg = '';
  if(t){
   textureSvg = `<svg class="texture-overlay" viewBox="0 0 200 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
         <pattern id="p" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M0 4 L8 4" stroke="#00000022" stroke-width="1"/>
         </pattern>
        </defs>
        <rect x="0" y="0" width="200" height="160" fill="url(#p)" opacity="${t.toLowerCase().includes('extra')?0.18:0.08}"/>
       </svg>`;
  }

  // 3. Combine-os em um container e injete no DOM
  previewShape.innerHTML = `
   <div class="shape-container">
    ${shapeSvg}
    ${textureSvg}
   </div>
  `;
 }

 // update preview info
 previewInfo.innerHTML = `
  <div><strong>Forma:</strong> ${state.formato || '—'}</div>
  <div><strong>Cor:</strong> ${state.cor ? state.cor.name : '—'}</div>
  <div><strong>Textura:</strong> ${state.textura || '—'}</div>
  <div><strong>Sabor:</strong> ${state.sabor || '—'}</div>
 `;
}

/* update active step UI */
function goToStep(n){
  state.step = n;
  panels.forEach(p => p.hidden = Number(p.dataset.panel) !== n);
  stepEls.forEach(el => {
    const s = Number(el.dataset.step);
    if(s === n) {
      el.classList.add('f-active');
      el.classList.remove('f');
    } else {
      el.classList.remove('f-active');
      el.classList.add('f');
    }
  });

  // show/hide prev/next
  prevBtn.style.visibility = n === 1 ? 'hidden' : 'visible';
  nextBtn.textContent = n === 3 ? 'Finalizar' : 'Próximo';
}

/* =========================
   INIT: populate UI elements
   ========================= */

function init(){
  // formats
  DATA.formatos.forEach(f => {
    const btn = createFormatButton(f);
    formatsGrid.appendChild(btn);
  });

  // colors
  DATA.cores.forEach(c => {
    const btn = createColorItem(c);
    colorsGrid.appendChild(btn);
  });

  // textures
  DATA.texturas.forEach(t => {
    const btn = createTextureItem(t);
    texturasGrid.appendChild(btn);
  });

  // sabores
  DATA.sabores.forEach(s => {
    const btn = createSaborItem(s);
    saboresGrid.appendChild(btn);
  });

  // initial visibility
  goToStep(1);
  renderPreview();
}

init();

/* =========================
   EVENTS: delegation for dynamic lists
   ========================= */

// formats click (single select)
formatsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.format-item');
  if(!btn) return;
  // mark selection
  formatsGrid.querySelectorAll('.format-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.formato = btn.dataset.value;
  renderPreview();
});

// colors click (single select)
colorsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.color-item');
  if(!btn) return;
  colorsGrid.querySelectorAll('.color-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const hex = btn.dataset.hex;
  const name = btn.dataset.name;
  state.cor = {name, hex};
  renderPreview();
});

// textures click (single select)
texturasGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.texture-item');
  if(!btn) return;
  texturasGrid.querySelectorAll('.texture-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.textura = btn.dataset.value;
  renderPreview();
});

// sabores click (single select)
saboresGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.sabor-item');
  if(!btn) return;
  saboresGrid.querySelectorAll('.sabor-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.sabor = btn.dataset.value;
  renderPreview();
});

/* navigation */
nextBtn.addEventListener('click', () => {
  if(state.step < 3){
    // simple validation: require a choice before advancing
    if(state.step === 1 && !state.formato){
      alert('Escolha um formato antes de continuar.');
      return;
    }
    if(state.step === 2 && !state.cor){
      alert('Escolha uma cor antes de continuar.');
      return;
    }
    goToStep(state.step + 1);
  } else {
    // finalize — show summary inside the preview area (option A)
    showSummary();
  }
});

prevBtn.addEventListener('click', () => {
  if(state.step > 1) goToStep(state.step - 1);
});

/* summary / cart */
function showSummary(){
  // hide panels, keep preview visible — but show the summary card
  summaryCard.hidden = false;
  const html = `
    <p><strong>Forma:</strong> ${state.formato || '—'}</p>
    <p><strong>Cor:</strong> ${state.cor ? state.cor.name : '—'}</p>
    <p><strong>Textura:</strong> ${state.textura || '—'}</p>
    <p><strong>Sabor:</strong> ${state.sabor || '—'}</p>
  `;
  summaryContent.innerHTML = html;
  // scroll to summary
  summaryCard.scrollIntoView({behavior:'smooth', block:'center'});
}

/* edit -> go back to step 1 */
editBtn.addEventListener('click', () => {
  summaryCard.hidden = true;
  goToStep(1);
});

/* add to cart (placeholder) */
addToCartBtn.addEventListener('click', () => {
  // placeholder action: emit payload
  const payload = {
    formato: state.formato,
    cor: state.cor ? state.cor.name : null,
    corHex: state.cor ? state.cor.hex : null,
    textura: state.textura,
    sabor: state.sabor
  };
  // TODO: integrar com backend (fetch POST /cart)
  alert('Adicionado ao carrinho:\n' + JSON.stringify(payload, null, 2));
});

prevBtn.style.visibility = 'hidden';