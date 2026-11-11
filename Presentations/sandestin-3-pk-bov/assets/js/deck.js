/* ==========================================================================
   Grand Boulevard Portfolio — scene-by-scene presentation engine + scenes.
   Content and figures come only from data.js (BOV figures, each tagged with
   its page) and tables.js (exhibits generated from the PDF). Edit those, not
   this file, to change a number.
   ========================================================================== */
(function(){
'use strict';
const B=window.BOV, T=window.BOV_TABLES, V=B.valuation, MK=B.market, HW=B.hwe, ST=B.strategy;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- formatters ---------- */
const n0=v=>Math.round(Math.abs(v)).toLocaleString('en-US');
const usd=v=>(v<0?'(':'')+'$'+n0(v)+(v<0?')':'');
const num=v=>v==null?'—':(v<0?'('+n0(v)+')':n0(v));
const usdM=(v,d=1)=>'$'+(Math.round(v/Math.pow(10,6-d))/Math.pow(10,d)).toFixed(d)+'M';
const pct=(v,d=1)=>v==null?'—':v.toFixed(d)+'%';
const usd2=v=>'$'+v.toFixed(2);
const IMG=n=>`assets/img/${n}.jpg`;
const COLORS={s1:'#3B4FA8',s2:'#5A9A08',s3:'#8E8E8E',navy:'#232C64',scn:'#B4541A'};
const KTAG={hist:'<span class="tag hist">Historical</span>',forecast:'<span class="tag fcst">Forecast</span>',proj:'<span class="tag proj">Projected</span>',scn:'<span class="tag scn">Alternative scenario</span>',calc:'<span class="tag calc">Interactive exploration</span>'};
const ICON={dl:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v8m0 0L3.5 5.5M7 9l3.5-3.5M1 12.5h12" stroke="currentColor" stroke-width="1.7" fill="none"/></svg>',
  open:'<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2h10v10H2zM5 5h4M5 7.5h4M5 10h2.5" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>',
  arrow:'<svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>'};
const hotel=id=>B.hotels.find(h=>h.id===id);
/* team headshots: transparent black-and-white cut-outs framed to one eye line and face size (tools note in README) */
const HS=t=>`assets/img/${t.photo.replace('team-','hs-')}.png`;
const CATS=['2022','2023','2024','2025','T-12 Aug-26','F 2026','Y1 2027','Y2 2028','Y3 2029','Y4 2030','Y5 2031'];
const KINDS=['hist','hist','hist','hist','hist','forecast','proj','proj','proj','proj','proj'];
const cfRow=(k,label)=>[...T.cf[k].historical.rows.find(r=>r.label===label).amt,...T.cf[k].projected.rows.find(r=>r.label===label).amt];

/* ---------- sections (overview grouping and footers follow the BOV) ---------- */
const CH=[
  {n:'',t:'Cover & contents'},
  {n:'3',t:'Hodges Ward Elliott Overview'},
  {n:'12',t:'Sales Strategy'},
  {n:'23',t:'Broker’s Opinion of Value'},
  {n:'54',t:'Market Overview'}
];
const SEC={1:'Hodges Ward Elliott Overview',2:'Sales Strategy',3:'Broker’s Opinion of Value',4:'Market Overview'};

/* ---------- review notes (opt-in from the slide overview; for HWE, not the owner) ---------- */
const FLAGS={};

/* ================= page registry (one slide per BOV page) ================= */
const SC=[];
const add=o=>SC.push(o);
const at=(l,t,w,h)=>`position:absolute;left:${l}px;top:${t}px;${w!=null?`width:${w}px;`:''}${h!=null?`height:${h}px;`:''}`;
const D5=n=>`assets/d05/${n}`;
const MARKS_G=`<div class="marks"><img src="assets/logos/brand-courtyard-green.png" alt="Courtyard" style="height:12.5px"><i></i><img src="assets/logos/brand-residence-green.png" alt="Residence Inn" style="height:15.5px"><i></i><img src="assets/logos/brand-hyatt-green.png" alt="Hyatt Place" style="height:17px"></div>`;
const MARKS_W=(h=1)=>`<div class="marks"><img src="assets/logos/brand-courtyard-white.png" alt="Courtyard" style="height:${14*h}px"><i></i><img src="assets/logos/brand-residence-white.png" alt="Residence Inn" style="height:${17.5*h}px"><i></i><img src="assets/logos/brand-hyatt-white.png" alt="Hyatt Place" style="height:${19.5*h}px"></div>`;
const PHDR={courtyard:['brand-courtyard-white.png','Courtyard',27],hyatt:['brand-hyatt-white.png','Hyatt Place',33],residence:['brand-residence-white.png','Residence Inn',37],tribute:['../d05/logo-tribute.png','Tribute Portfolio',34]};
function hdr(kind){ if(kind==='none') return '';
  if(PHDR[kind]){ const p=PHDR[kind]; return `<div class="pg-phdr"><img src="assets/logos/${p[0]}" alt="${p[1]}" style="height:${p[2]}px"><span>Sandestin at Grand Boulevard</span></div>`; }
  return `<div class="pg-hdr"><div class="bar">Hotel Portfolio at Grand Boulevard Sandestin</div>${MARKS_G}</div>`; }
const plain=t=>t.replace(/<br>/g,' ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&');
const chrome=o=>`<div class="pg-tab"></div><h2 class="pg-title${plain(o.title).length>56?' long':''}">${o.title}</h2>${o.sub?`<p class="pg-sub">${o.sub}</p>`:''}${hdr(o.hdr)}<div class="pg-ft"><div class="no">${o.no}</div><div class="sec">${SEC[o.ch]}</div><img class="hw" src="assets/logos/hwe-white.png" alt="" width="58" height="17"></div>`;
function P(o){ add({id:o.id,no:o.no,ch:o.ch,title:o.t||plain(o.title),cls:'pg '+(o.cls||''),img:o.img,scn:o.scn,html:chrome(o)+`<div class="pg-body">${o.body}</div>`,init:o.init}); }
const LOCK=`<div class="lock"><p class="k a">Broker Selection RFP:</p><div class="rule a d1"></div><h2 class="a d1">Hotel Portfolio at<br>Grand Boulevard<br>Sandestin</h2><div class="rule a d2"></div>${MARKS_W(0.92).replace('class="marks"','class="marks a d2"')}
  <p class="loc a d3">Destin/Miramar Beach</p><p class="st a d3">Florida</p><img class="hw a d4" src="assets/logos/hwe-white.png" alt="Hodges Ward Elliott" width="62" height="24"><div class="pt a d5"><span>Presenting to</span><img src="assets/logos/howard-group-white.png" alt="Howard Group" width="105" height="98"></div></div>`;
function DV(o){ add({id:o.id,no:o.no,ch:o.ch,title:o.cap,cls:'dv',img:o.img,html:`<div class="ph-l"><img class="px" src="${IMG(o.img)}" alt="" decoding="async"></div><p class="dv-cap a d1">${o.cap}</p>${LOCK}`}); }
const GAL_N=13;
const galCaps={courtyard:['Exterior at dusk','Porte-cochère','Aerial','Grounds','Pool','Fire-pit terrace','Lobby lounge','Front desk','The Bistro','Guest room','Balcony room','Guest room','Meeting room'],
  hyatt:['Exterior at dusk','Exterior at night','Entrance','Pool','Pool at dusk','Lobby','Front desk','Dining','Lobby workspace','Suite','Guest room','Meeting room','Fitness center'],
  residence:['Exterior at dusk','Aerial','Exterior','Pool','Courtyard walk','Lobby','Lobby lounge','Breakfast area','Suite living room','Suite kitchen','Guest room','Fireside lounge','Grill area']};
const galList=id=>Array.from({length:GAL_N},(_,i)=>({src:IMG(`gal-${id}-${String(i+1).padStart(2,'0')}`),cap:`${hotel(id).name} · ${galCaps[id][i]}`}));

/* ---------- OPENING ---------- */
add({id:'cover',ch:0,title:'Hotel Portfolio at Grand Boulevard Sandestin',cls:'cover',img:'hero-courtyard',
  html:`<div class="cv">
  <div class="cv-panel">
    <p class="cv-k a">${esc(B.meta.kicker)}:</p>
    <h1 class="a d1">Hotel Portfolio at<br>Grand Boulevard<br>Sandestin</h1>
    <hr class="cv-rule a d2">
    <div class="cv-brands a d2" role="img" aria-label="Courtyard, Residence Inn and Hyatt Place"><img src="assets/logos/brand-courtyard-white.png" alt="" style="height:13px"><i></i><img src="assets/logos/brand-residence-white.png" alt="" style="height:17px"><i></i><img src="assets/logos/brand-hyatt-white.png" alt="" style="height:18px"></div>
    <p class="cv-loc a d3">Destin / Miramar Beach</p><p class="cv-st a d3">Florida</p>
    <div class="cv-foot a d4"><img class="hw" src="assets/logos/hwe-white.png" alt="Hodges Ward Elliott" width="120" height="47">
      <div class="cv-pt"><span>Presenting to</span><img src="assets/logos/howard-group-white.png" alt="Howard Group" width="96" height="90"></div></div>
  </div>
  ${[['cy','hero-courtyard','courtyard','Courtyard Sandestin at Grand Boulevard at dusk',18],['hp','cover-hyatt','hyatt','Hyatt Place Sandestin at Grand Boulevard at dusk',21],['ri','cover-residence','residence','Residence Inn Sandestin at Grand Boulevard at dusk',19]]
    .map((f,i)=>`<figure class="cv-ph cv-${f[0]} a d${i+2}"><img class="px" src="${IMG(f[1])}" alt="${f[3]}" decoding="async"><figcaption><img src="assets/logos/brand-${f[2]}-white.png" alt="${esc(hotel(f[2]).short)}" style="height:${f[4]}px"><span>Sandestin at Grand Boulevard</span></figcaption></figure>`).join('')}
  <div class="cv-band a d5"><span>${esc(B.meta.subtitle)}</span><span>${esc(B.meta.date)}</span></div>
  </div>`});

/* Contents & contacts: mirrors BOV p. 2. Each entry jumps to the matching slide; the BOV page numbers are kept. */
const TOC=[
  {n:'3',a:'Hodges Ward Elliott',b:'Overview',go:'hwe-overview',img:'chapter-hwe',items:[['4–6','Why Hodges Ward Elliott','why-hwe'],['7','Project Team','project-team'],['8','HWE Sales Records, Past 36 Months','sales-records'],['9–11','Representative Florida Hotel Transactions','transactions']]},
  {n:'12',a:'Sales',b:'Strategy',go:'sales-strategy',img:'chapter-strategy',items:[['13–14','Target Buyers','target-buyers'],['15','Marketing Approach','marketing-approach'],['16–19','Investment Highlights','highlights'],['20','Upside Opportunities & Listing Terms','upside-terms'],['21','Marketing Timeline','marketing-timeline'],['22','Proven Process: Client References','client-references']]},
  {n:'23',a:'Broker’s',b:'Opinion of Value',go:'opinion-of-value',img:'chapter-valuation',items:[['24–29','Portfolio (Consolidated) Valuation','valuation-metrics'],['30–35','Courtyard Valuation','courtyard-valuation'],['36–41','Hyatt Place Valuation','hyatt-valuation'],['42–47','Residence Inn Valuation','residence-valuation'],['48–52','Courtyard Conversion to Tribute Portfolio','tribute-valuation',null,true],['53','Sales Comparables','sales-comparables']]},
  {n:'54',a:'Market',b:'Overview',go:'market-overview',img:'chapter-market',items:[['55','Sandestin / South Walton Market Overview','south-walton'],['56','Tourism & Visitor Profile','tourism'],['57','Grand Boulevard','grand-boulevard'],['58','Regional Airlift','regional-airlift'],['59','Submarket Lodging Performance','submarket'],['60','South Walton / Destin New Supply','new-supply']]}];
const TOC_IMG=['gal-hyatt-07','gal-courtyard-07','gal-courtyard-06','gal-residence-05'];
add({id:'contents',ch:0,title:'Contents & exclusive representatives',cls:'contents',img:'gal-hyatt-07',
  html:`<div class="tc">
  <nav class="tc-l" aria-label="Contents">
    <h2 class="tc-h a">Contents</h2>
    ${TOC.map((g,gi)=>`<div class="tc-g a d${gi+1}" data-g="${gi}">
      <a class="tc-gh" href="#${g.go}" data-go="${g.go}"><b>${g.n}</b><span>${esc(g.a)}<strong>${esc(g.b)}</strong></span></a>
      <ul>${g.items.map(it=>`<li><a href="#${it[2]}" data-go="${it[2]}"${it[3]?` data-view="${it[3]}"`:''}><span class="pg">${it[0]}</span><span class="t">${esc(it[1])}${it[4]?' <span class="tag scn">Scenario</span>':''}</span><span class="sl" aria-hidden="true"></span></a></li>`).join('')}</ul></div>`).join('')}
    <p class="tc-note a d5">Numbers are BOV page numbers; each slide carries the same number. Select any entry to open it.</p>
  </nav>
  <div class="tc-m" aria-hidden="true">
    ${TOC_IMG.map((n,i)=>`<figure class="tc-ph tc-ph${i} a d${i+1}"><img class="px" src="${IMG(n)}" alt="" decoding="async"></figure>`).join('')}
    <figure class="tc-pv" id="tcPv"><img alt=""><figcaption><span class="k"></span><b></b></figcaption></figure>
  </div>
  <aside class="tc-r">
    <img class="tc-hwe a" src="assets/logos/hwe-white.png" alt="Hodges Ward Elliott" width="150" height="58">
    <p class="tc-ex a d1">Exclusive Representatives:</p>
    <ul class="tc-reps">${B.team.map((t,i)=>`<li class="a d${Math.min(6,i+2)}"><b>${esc(t.name)}</b><span>${esc(t.title)}</span><span class="em">${t.email}</span></li>`).join('')}</ul>
    <p class="tc-web a d6"><a href="https://hodgeswardelliott.com" target="_blank" rel="noopener">hodgeswardelliott.com</a></p>
  </aside></div>`,
  init(el){
    const idx=id=>SC.findIndex(x=>x.id===id);
    // slide numbers on each entry
    $$('a[data-go]',el).forEach(a=>{ const i=idx(a.dataset.go); const sl=$('.sl',a); if(sl&&i>=0) sl.textContent='Slide '+(i+1); const pg=$('.pg',a), tt=$('.t',a); a.setAttribute('aria-label',(tt?tt.textContent:a.textContent).trim()+(pg?`, BOV page ${pg.textContent}`:'')+(i>=0?`, go to slide ${i+1}`:'')); });
    // hovering or focusing a section previews its chapter photograph over the collage
    const pv=$('#tcPv',el), pimg=$('img',pv);
    const show=g=>{ const G=TOC[g]; if(pimg.dataset.src!==G.img){ pimg.src=IMG(G.img); pimg.dataset.src=G.img; } $('.k',pv).textContent='Section · BOV p. '+G.n; $('b',pv).textContent=G.a+' '+G.b; pv.classList.add('on'); $$('.tc-g',el).forEach(x=>x.classList.toggle('act',+x.dataset.g===g)); };
    const hide=()=>{ pv.classList.remove('on'); $$('.tc-g',el).forEach(x=>x.classList.remove('act')); };
    $$('.tc-g',el).forEach(g=>{ g.addEventListener('mouseenter',()=>show(+g.dataset.g)); g.addEventListener('focusin',()=>show(+g.dataset.g)); });
    $('.tc-l',el).addEventListener('mouseleave',hide); $('.tc-l',el).addEventListener('focusout',e=>{ if(!$('.tc-l',el).contains(e.relatedTarget)) hide(); });
  }});

/* cover photographs open each hotel's gallery */
SC.find(s=>s.id==='cover').init=el=>{ [['cv-cy','courtyard'],['cv-hp','hyatt'],['cv-ri','residence']].forEach(([c,id])=>{ const f=$('.'+c,el); if(!f) return;
  f.setAttribute('role','button'); f.tabIndex=0; f.setAttribute('aria-label',`Open the ${hotel(id).name} photo gallery`); f.style.cursor='zoom-in';
  const open=()=>lbOpen(galList(id),0,f); f.addEventListener('click',open); f.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); } }); }); };

/* ======================= 03–11 HODGES WARD ELLIOTT OVERVIEW ======================= */
DV({id:'hwe-overview',no:3,ch:1,img:'chapter-hwe',cap:'Hodges Ward Elliott Overview'});

P({id:'why-hwe',no:4,ch:1,title:'Why Hodges Ward Elliott',img:'hwe-intro',
  body:`<div class="ph-r fade" style="left:656px"><img class="px" src="${IMG('hwe-intro')}" alt="Hyatt Place Sandestin lobby workspace" decoding="async"></div>
  <p class="a d1" style="${at(50,108,700)}font-size:15.6px;z-index:3">${esc(HW.intro)}</p>
  <div class="a d2" style="${at(50,368,660)}z-index:3">${HW.pillars.map((p,i)=>`<div class="why-row"><img src="${D5(`ic-why-${i+1}.png`)}" alt=""><p>${esc(p)}</p></div>`).join('')}</div>`});

const OFF_LBL={Denver:[329,359,373,375],Dallas:[387,452,432,468],Nashville:[535,389,598,405],Atlanta:[600,435,653,451],Orlando:[644,517,700,533],Tampa:[574,569,616,585],'New York':[720,261,780,277],London:[896,149,945,165]};
P({id:'overview-map',no:5,ch:1,title:'HWE Overview Map',hdr:'none',
  body:`<img class="a d1" src="${D5('map-us.png')}" alt="Map of HWE offices: Denver, Dallas, Nashville, Atlanta, Orlando, Tampa and New York, with London shown in an inset" style="${at(0,177,1010,631)}z-index:2">
  <div class="a d1" style="${at(1025,53,180,260)}border:1px solid #D6D8DE;background:#fff;z-index:2"><img src="${D5('map-uk.png')}" alt="" style="width:100%;height:100%;object-fit:contain"></div>
  ${HW.offices.map(o=>{ const b=OFF_LBL[o.city], k=1600/1267; return `<button type="button" class="mp" data-city="${o.city}" aria-label="${o.city} office: show who is based there" style="${at(Math.round(b[0]*k)-4,Math.round(b[1]*k)-4,Math.round((b[2]-b[0])*k)+8,Math.round((b[3]-b[1])*k)+8)}"></button>`; }).join('')}
  <div class="olst a d2" style="${at(1227,51,336,712)}"><div class="olst-h"><b>William M. Hodges,</b> <i>Co-Founder</i></div>
   ${HW.offices.map(o=>`<div class="olst-g" data-city="${o.city}"><button type="button" class="olst-c" data-city="${o.city}">${o.city}</button><ul>${o.people.map(p=>`<li class="${o.type==='capital'?'cap':''}">${esc(p[0])}, <i>${esc(p[1])}</i></li>`).join('')}</ul></div>`).join('')}</div>`,
  init(el){ const sel=c=>{ $$('.mp',el).forEach(b=>b.classList.toggle('on',b.dataset.city===c)); $$('.olst-g',el).forEach(g=>{ const on=g.dataset.city===c; g.classList.toggle('on',on); if(on) g.scrollIntoView({block:'nearest',behavior:RM.matches?'auto':'smooth'}); }); };
    el.addEventListener('click',e=>{ const b=e.target.closest('[data-city]'); if(b&&(b.classList.contains('mp')||b.classList.contains('olst-c'))) sel(b.dataset.city); }); }});

const SVC_ORDER=[1,2,3,4,5,6,7,8,9,10,11,12];
const AX=['1975','1983','1992','2004','2006','2011','2013','2014','2015','2016','2018','2019','2020','2021','2022','2023','2024','2025','2026 YTD'];
const hy=y=>HW.history.find(h=>h[0]===y);
const EV=[ // [axis index, up/down, history entry, logo, width]
  [0,'up',hy('1975'),'hist-hwa.png',96],[2,'up',null,'hist-hwe.png',70],[4,'up',hy('2006'),'hist-whitelodging.png',112],[6,'up',hy('2013'),'hist-applereit.png',118],
  [9,'up',hy('2016'),null,70],[10,'up',hy('2018'),null,92],[13,'up',hy('2021'),null,64],[14,'up',hy('2022'),'hist-wlt.png',96],[15,'up',HW.history.find(h=>/Tampa/.test(h[1])),null,52],
  [16,'up',HW.history.find(h=>/Denver/.test(h[1])),null,58],[17,'up',hy('2025'),null,74],
  [1,'dn',hy('1983'),null,90],[3,'dn',hy('2004'),'hist-bigben.png',90],[5,'dn',hy('2011'),null,120],[8,'dn',hy('2015'),'hist-ny.png',96],[11,'dn',hy('2019'),null,76],
  [12,'dn',hy('2020'),null,62],[16,'dn',HW.history.find(h=>/Nashville/.test(h[1])),'hist-1hotels-embassy.png',150],[18,'dn',hy('2026 YTD'),'hist-franklin.png',150]];
const bold=t=>esc(t).replace(/(\$[\d.,]+\s?[BM]{1,2}(?: sale| purchase| closed)?|#1 Ranked Hotel Broker|Capital Markets|Mark Elliott|Park Central Hotel|Franklin St\.|W London Hotel|1 Hotel &amp; Embassy Suites Nashville|Brookfield acquisition|London|New York|Dallas|Tampa|Denver)/,'<b>$1</b>');
/* p.6 history timeline: every connector, label and logo placed at its PDF position (points × 1600/1152) */
const TLK=1600/1152, tq=v=>+(v*TLK).toFixed(1);
const TL_UP=[ // [line x, dot x, dot y, text x, text y, text, year, logo, logo box x0,y0,x1,y1]
  [77.1,83.4,410.7,85.6,438.4,'founded in<br>Atlanta, GA','1975','hist-hwa.png',[93,405,171,434]],
  [180.6,186.9,407.8,0,0,'','1992','hist-hwe.png',[193,405.5,243.5,433.5]],
  [286.6,292.9,407.8,298.2,401.2,'HWE executes the<br><b>$1.7B sale</b> of the<br>100-hotel White<br>Lodging Portfolio','2006','hist-whitelodging.png',[298,372.5,368.5,396.5]],
  [405.6,411.9,405.5,419.8,401.2,'HWE advises on the<br><b>$1.2B purchase</b> of<br>Apple REIT Six (66<br>hotels) by Blackstone','2013','hist-applereit.png',[410,377.5,480.5,396]],
  [549.0,555.2,405.5,560.9,401.2,'HWE<br>launches<br>the <b>Capital</b><br><b>Markets</b><br>practice','2016'],
  [630.0,636.2,405.5,640.7,401.2,'HWE Capital<br>Markets closed<br><b>$10B</b> of financings<br>nationally','2018'],
  [752.5,758.7,405.5,765.3,401.2,'<b>#1 Ranked</b><br><b>Hotel</b><br><b>Broker</b> by<br>Total<br>Volume','2021'],
  [819.5,825.8,405.5,830.9,401.2,'HWE advises<br>on the <b>$3.8B</b><br><b>Brookfield</b><br><b>acquisition</b><br>of Watermark<br>Lodging Trust','2022','hist-wlt.png',[831,379,904,394]],
  [902.2,908.5,435.7,911.2,432.3,'<b>Tampa</b><br>office<br>opens','2024'],
  [946.7,953.0,403.5,956.8,398.6,'<b>Denver</b><br>office<br>opens','2024'],
  [1002.9,1009.1,406.7,1013.8,401.2,'HWE Sells<br><b>W London</b><br><b>Hotel</b> for<br>$350MM','2025']];
const TL_DN=[ // [line x, dot x, dot y, text right, text y, text, year, logo, logo box]
  [162.4,156.1,504.4,151.6,496.8,'<b>Mark Elliott</b><br>joins the<br>company','1983'],
  [257.1,250.8,503.6,243.5,495.2,'<b>London</b><br>office opens','2004','hist-bigben.png',[223,512,271.5,569]],
  [372.8,366.6,504.9,360.8,495.2,'HWE sells the<br><b>Park Central Hotel</b><br>(Manhattan) for<br>$400MM','2011'],
  [500.8,494.6,502.6,488.4,495.2,'<b>New York</b><br>office opens','2015','hist-ny.png',[440,520,486,569]],
  [670.9,664.7,502.6,660.3,495.2,'<b>Dallas</b><br>office opens','2019'],
  [751.4,745.3,502.6,740.9,495.2,'<b>$3.7B closed</b><br>in 2020','2020'],
  [943.7,937.5,506.8,933.3,495.2,'HWE sells <b>1 Hotel &amp; Embassy</b><br><b>Suites Nashville</b> for $530MM','2023','hist-1hotels-embassy.png',[840,526,932,587]],
  [1045.5,1039.3,506.8,1034.7,499.2,'HWE merges with<br><b>Franklin St.</b>','2026 YTD','hist-franklin.png',[958,526.5,1075,546.5]]];
function tl2Html(){
  const AXT=471.3, AXB=485.9, img=(l,b)=>l?`<img src="${D5(l)}" alt="" style="${at(tq(b[0]),tq(b[1]),tq(b[2]-b[0]),tq(b[3]-b[1]))}object-fit:contain">`:'';
  const sr=(y,t)=>`<span class="sr-only">${y}: ${t.replace(/<br>/g,' ').replace(/<\/?b>/g,'')||'The firm becomes Hodges Ward Elliott'}</span>`;
  return `<div class="ax" style="${at(tq(75.1),tq(AXT),tq(1065.5-75.1),tq(AXB-AXT))}">${AX.map(y=>`<span>${y}</span>`).join('')}</div>`
  +TL_UP.map(([lx,dx,dy,tx,ty,t,y,l,b])=>`<div class="ev2" role="listitem" style="order:${parseInt(y)}"><i class="cn up" style="${at(tq(lx+.8),tq(dy),tq(dx-lx-.8),tq(AXT-dy))}"></i>${t?`<div class="tx" style="${at(tq(tx),tq(ty-.6))}" aria-hidden="true">${t}</div>`:''}${img(l,b)}${sr(y,t)}</div>`).join('')
  +TL_DN.map(([lx,dx,dy,tr,ty,t,y,l,b])=>`<div class="ev2" role="listitem" style="order:${parseInt(y)}"><i class="cn dn" style="${at(tq(dx),tq(AXB),tq(lx-.8-dx),tq(dy-AXB))}"></i><div class="tx r" style="${at(tq(tr)-260,tq(ty-.6),260)}" aria-hidden="true">${t}</div>${img(l,b)}${sr(y,t)}</div>`).join('');
}
P({id:'services-history',no:6,ch:1,title:'HWE Services / History',
  body:`<div class="pg-bg-grey" style="${at(0,111,1600,360)}"></div>
  <p class="lab" style="${at(50,138,400)}font-size:17px;z-index:2">HWE Services</p>
  <div class="svc a d1" style="${at(50,176,1500)}z-index:2">${HW.services.map((s,i)=>`<div><i><img src="${D5(`ic-svc-${SVC_ORDER[i]}.png`)}" alt=""></i><b>${esc(s)}</b></div>`).join('')}</div>
  <p class="lab" style="${at(50,494,400)}font-size:17px">HWE History</p>
  <div class="tl2 a d2" role="list" aria-label="HWE history timeline">${tl2Html()}</div>`});

P({id:'project-team',no:7,ch:1,title:'Project Team',
  body:`<div class="tm a d1" style="${at(47,112,1508)}">${B.team.map(t=>{ const nm=t.name.split(' '), last=nm.pop(); return `<article class="m">
    <div class="hs tilt" style="width:190px" role="button" tabindex="0" aria-label="Open ${esc(t.name)}’s bio"><span class="dots" aria-hidden="true"></span><img src="${HS(t)}" alt="${esc(t.name)}" loading="lazy"><span class="tm-open" aria-hidden="true">View bio</span></div>
    <p class="bio">${esc(t.bio)}</p>
    <div class="nm"><span class="fn">${esc(nm.join(' '))}</span><span class="ln">${esc(last)}</span><span class="ti">${esc(t.title)}</span><span class="of">${t.office}</span></div></article>`; }).join('')}</div>`,
  init(el){ $$('.tm .hs',el).forEach((h,i)=>{ tilt3d(h,h,{rot:10,move:10}); const open=()=>teamOpen(i,h); h.addEventListener('click',open); h.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); } }); }); }});

/* 3D tilt + parallax: the frame tilts toward the pointer, the dotted background drifts against it and the headshot moves with it */
function tilt3d(area,frame,o){ if(!matchMedia('(hover:hover)').matches) return;
  const set=(x,y)=>{ frame.style.setProperty('--rx',(-y*o.rot).toFixed(2)+'deg'); frame.style.setProperty('--ry',(x*o.rot).toFixed(2)+'deg');
    frame.style.setProperty('--mx',(x*o.move).toFixed(1)+'px'); frame.style.setProperty('--my',(y*o.move).toFixed(1)+'px');
    frame.style.setProperty('--gx',((x+1)*50).toFixed(1)+'%'); frame.style.setProperty('--gy',((y+1)*50).toFixed(1)+'%'); };
  area.addEventListener('pointermove',e=>{ if(RM.matches) return; const r=area.getBoundingClientRect(); frame.classList.add('tilting'); set(((e.clientX-r.left)/r.width)*2-1,((e.clientY-r.top)/r.height)*2-1); });
  area.addEventListener('pointerleave',()=>{ frame.classList.remove('tilting'); set(0,0); }); }

/* team bio card */
const TM={i:0,opener:null,dlg:null};
function teamCard(){ if(TM.dlg) return TM.dlg; const d=document.createElement('dialog'); d.id='tmPop'; d.setAttribute('aria-labelledby','tmName');
  d.innerHTML=`<div class="tmc"><div class="tmc-ph tilt"><span class="dots" aria-hidden="true"></span><img alt=""></div>
    <div class="tmc-tx"><p class="tmc-k">Project Team · HWE</p><h3 id="tmName"><span class="fn"></span> <span class="ln"></span></h3><p class="tmc-ti"></p><p class="tmc-of"></p><p class="tmc-bio"></p><a class="tmc-em"></a></div></div>
    <button class="ib x" type="button" aria-label="Close bio"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" stroke-width="2"/></svg></button>
    <button class="ib pv" type="button" aria-label="Previous team member"><svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true"><path d="M10 2L2 10l8 8" stroke="currentColor" stroke-width="2" fill="none"/></svg></button>
    <button class="ib nx" type="button" aria-label="Next team member"><svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true"><path d="M2 2l8 8-8 8" stroke="currentColor" stroke-width="2" fill="none"/></svg></button>`;
  document.body.appendChild(d); TM.dlg=d;
  const step=k=>{ TM.i=(TM.i+k+B.team.length)%B.team.length; teamShow(true); };
  $('.x',d).onclick=()=>d.close(); $('.pv',d).onclick=()=>step(-1); $('.nx',d).onclick=()=>step(1);
  d.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'){ e.preventDefault(); step(-1);} if(e.key==='ArrowRight'){ e.preventDefault(); step(1);} });
  d.addEventListener('click',e=>{ if(e.target===d) d.close(); }); d.addEventListener('close',()=>{ if(TM.opener) TM.opener.focus(); });
  tilt3d($('.tmc',d),$('.tmc',d),{rot:5,move:16}); return d; }
function teamShow(swap){ const d=TM.dlg, t=B.team[TM.i], nm=t.name.split(' '), last=nm.pop();
  $('.tmc-ph img',d).src=HS(t); $('.tmc-ph img',d).alt=t.name; $('.fn',d).textContent=nm.join(' '); $('.ln',d).textContent=last;
  $('.tmc-ti',d).textContent=t.title; $('.tmc-of',d).textContent=t.office+' office'; $('.tmc-bio',d).textContent=t.bio; const a=$('.tmc-em',d); a.href='mailto:'+t.email; a.textContent=t.email;
  if(swap){ const c=$('.tmc',d); c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap'); } }
function teamOpen(i,opener){ teamCard(); TM.i=i; TM.opener=opener; teamShow(false); TM.dlg.showModal(); $('.x',TM.dlg).focus(); }

const SR=HW.salesRecords;
const BUY_C=['#64A70B','#232C64','#7FD1B9','#B9BDC9'];
P({id:'sales-records',no:8,ch:1,title:'HWE Sales Records - Past 36 Months',
  body:`<div class="rec a d1" style="${at(61,124,1490)}">${SR.items.map((r,i)=>`<div class="cd"><img src="${D5(`ic-rec-${i+1}.png`)}" alt=""><h5>${esc(r[0])}</h5><div class="n"><b>${r[1]}</b><span>${r[2]}</span></div><div class="v">${r[3]}</div></div>`).join('')}</div>
  <div class="nb recent a d2" style="${at(61,466,664,310)}border-radius:12px;border-top:0">
    <img src="${D5('ic-rec-key.png')}" alt="" style="position:absolute;left:24px;top:20px;width:82px;border-radius:10px">
    <p class="rk">Recent Panhandle sale</p><h4 class="rh4">${esc(SR.recent.name)}</h4><p class="rc">${esc(SR.recent.city)}</p>
    <div class="rp">${SR.recent.price}</div><p class="rpl">Sale price</p>
    <div class="rf"><span><b>${SR.recent.keys}</b> Keys</span><span><b>${SR.recent.perKey}</b></span></div></div>
  <div class="a d3" style="${at(777,466,740,320)}">
    <h4 class="bt-h">Sold Deals by Buyer Type</h4><p class="bt-s">Estimated share of sold deals</p>
    <div class="bt-grid"><div class="chart dn-host" id="donut"></div>
    <ul class="bt-l">${SR.buyerTypes.map((b,i)=>`<li><img src="${D5(`ic-buy-${i+1}.png`)}" alt=""><span>${b[0]}</span><b style="color:${BUY_C[i]}">${b[1].toFixed(1)}%</b></li>`).join('')}</ul></div></div>
  <p class="src" style="${at(777,790,760)}margin:0;font-size:11px">${esc(SR.source)} BOV p. 8.</p>`,
  init(el){ Charts.donut($('#donut',el),SR.buyerTypes,BUY_C,{legend:$('.bt-l',el)}); }});

const TXP=[HW.transactions.slice(0,4),HW.transactions.slice(4,8),HW.transactions.slice(8,12)];
TXP.forEach((list,pi)=>P({id:pi?`transactions-${pi+1}`:'transactions',no:9+pi,ch:1,title:'HWE Representative Florida Hotel Transactions',img:list[0][4],t:`HWE Representative Florida Hotel Transactions (${pi+1} of 3)`,
  body:`<div class="txp a d1" style="${at(49,116,1502)}">${list.map(t=>`<article class="txc" data-tx="${t[4]}">
    <button type="button" class="mn" data-i="0" aria-label="Enlarge photo: ${esc(t[0])}"><img src="${D5(`tx/${t[4]}-main.jpg`)}" alt="" loading="lazy"></button>
    <button type="button" class="sm" data-i="1" aria-label="Enlarge interior photo 1: ${esc(t[0])}"><img src="${D5(`tx/${t[4]}-a.jpg`)}" alt="" loading="lazy"></button>
    <button type="button" class="sm" data-i="2" aria-label="Enlarge interior photo 2: ${esc(t[0])}"><img src="${D5(`tx/${t[4]}-b.jpg`)}" alt="" loading="lazy"></button>
    <p class="cap"><b>${esc(t[0])}</b> | <i>${t[1]}</i><small>Keys: ${t[2]} | <i>${t[3]}</i></small></p></article>`).join('')}</div>`,
  init(el){ el.addEventListener('click',e=>{ const b=e.target.closest('.txc button'); if(!b) return; const c=b.closest('.txc'), t=HW.transactions.find(x=>x[4]===c.dataset.tx);
    lbOpen(['main','a','b'].map((s,i)=>({src:D5(`tx/${t[4]}-${s}.jpg`),cap:`${t[0]} · ${t[1]} · ${t[2]} keys · ${t[3]}${i?' · interior':''}`})),+b.dataset.i,b); }); }}));

/* ======================= 12–22 SALES STRATEGY ======================= */
DV({id:'sales-strategy',no:12,ch:2,img:'chapter-strategy',cap:'Sales Strategy'});

P({id:'target-buyers',no:13,ch:2,title:'Target Buyers &amp; Marketing Approach',t:'Target Buyers & Marketing Approach',img:'strategy-boulevard',
  body:`<div class="ph-r" style="left:804px"><img class="px" src="${IMG('strategy-boulevard')}" alt="Grand Boulevard storefronts at dusk" decoding="async"></div>
  <div class="a d1" style="${at(50,118,710)}z-index:2"><p>${esc(ST.intro)}</p>
   <p style="margin:34px 0 18px"><span class="tagbar">Primary Targets</span></p><ul class="dots">${ST.primary.map(p=>`<li>${esc(p[0])}: ${esc(p[1])}</li>`).join('')}</ul>
   <p style="margin:34px 0 18px"><span class="tagbar">Secondary Targets</span></p><ul class="dots">${ST.secondary.map(p=>`<li>${esc(p[0])}: ${esc(p[1])}</li>`).join('')}</ul></div>`});

const g1=[['omega','Omega Hotel Group'],['chimera','Chimera Hospitality'],['sun','SUN Development & Management Corporation'],['jamsan','Jamsan Management'],['artifact-sagelane-bluelotus','Artifact · Sage Lane Partners · Blue Lotus Ventures'],['sparkghc','SparkGHC'],['ad-astra','Ad Astra Capital'],['aam15','AAM15 Real Estate Investment & Management'],['impact','Impact Properties'],['peachtree','Peachtree Group'],['driftwood','Driftwood Capital'],['nexpoint','NexPoint']];
const g2=[['key-international','Key International'],['innisfree','Innisfree'],['baywood','Baywood Hotels'],['noble','Noble'],['prime-group','Prime Group'],['kolter','Kolter'],['apple-reit','Apple Hospitality REIT'],['awh','AWH Partners'],['magna','Magna'],['rreaf','RREAF Holdings'],['oto','oto development']];
const WLOGO={nexpoint:'png',peachtree:'png',aam15:'png','key-international':'png',oto:'png'};
const wlogo=k=>`assets/logos/bov/${k}.png`; /* cut from the BOV p.14 artwork (tools/extract_p14_logos.py) */
const LBOX=k=>{ const b=(window.BOV_LOGO_BOX||{})[k]; return b?` style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%"`:''; };
const logoTiles=(list,grp)=>list.map((g,i)=>`<button type="button" class="lt ${grp}" data-grp="${grp}" data-i="${i}" aria-label="Enlarge logo: ${esc(g[1])}"><img src="${wlogo(g[0])}" alt="${esc(g[1])}" loading="lazy"${LBOX(g[0])}></button>`).join('');
P({id:'likely-investors',no:14,ch:2,title:'Target Buyers &amp; Marketing Approach',t:'Likely investors',cls:'inv',
  body:`<p class="a" style="${at(50,118,1400)}">${esc(ST.buyersNote)}</p>
  <p class="a d1" style="${at(50,177,729)}margin:0"><span class="tagbar">Unique HNW &amp; Owner Operators &amp; DST Buyers</span></p>
  <div class="a d1" style="${at(50,232,729)}"><div class="logos">${logoTiles(g1,'g1')}</div></div>
  <p class="a d2" style="${at(820,177,729)}margin:0"><span class="tagbar" style="background:var(--green)">Usual Suspects</span></p>
  <p class="a d2 inv-note" style="${at(822,212,729)}">(Can use to create competition, but are not winning in this market)</p>
  <div class="a d2" style="${at(820,232,729)}"><div class="logos">${logoTiles(g2,'g2')}</div></div>
  <p class="src" style="${at(50,800,1200)}margin:0;font-size:11px">Source: BOV p. 14. Select a logo to enlarge it.</p>`,
  init(el){ el.addEventListener('click',e=>{ const b=e.target.closest('.lt'); if(b) logoOpen(b.dataset.grp,+b.dataset.i,b); });
    const fit=img=>{ const t=img.closest('.lt'); const r=(img.naturalWidth||1)/(img.naturalHeight||1);
      const maxW=t.clientWidth-30, maxH=t.clientHeight-30, area=Math.min(maxW*maxH*0.36,9000);
      let h=Math.sqrt(area/r), w=h*r; if(h>maxH){ h=maxH; w=h*r; } if(w>maxW){ w=maxW; h=w/r; }
      img.style.width=w.toFixed(1)+'px'; img.style.height=h.toFixed(1)+'px'; };
    const all=$$('.lt img',el).filter(i=>!i.style.left); const run=()=>all.forEach(i=>{ if(i.complete&&i.naturalWidth) fit(i); else i.addEventListener('load',()=>fit(i),{once:true}); });
    all.forEach(i=>i.loading='eager'); run(); addEventListener('resize',run); }});
/* logo viewer: the group's tile colour, a large logo, the group name; arrows step through the group */
const LP={dlg:$('#logoPop'),grp:'g1',i:0,opener:null};
function lpFit(){ const im=$('#lpImg'), st=im.parentElement; if(!im.naturalWidth||!st.clientWidth) return; const r=im.naturalWidth/im.naturalHeight;
  const W=st.clientWidth*0.84, H=st.clientHeight*0.92, area=W*H*0.30; let h=Math.sqrt(area/r), w=h*r; if(w>W){ w=W; h=w/r; } if(h>H){ h=H; w=h*r; }
  im.style.width=w.toFixed(1)+'px'; im.style.height=h.toFixed(1)+'px'; }
$('#lpImg').addEventListener('load',lpFit);
function logoShow(){ const list=LP.grp==='g1'?g1:g2, g=list[LP.i]; LP.dlg.dataset.grp=LP.grp;
  $('#lpImg').style.width=$('#lpImg').style.height='0px'; $('#lpImg').src=wlogo(g[0]); if($('#lpImg').complete) requestAnimationFrame(lpFit); $('#lpImg').alt=g[1]; $('#lpName').textContent=g[1];
  $('#lpGrp').textContent=(LP.grp==='g1'?'Unique HNW & owner operators & DST buyers':'Usual suspects')+` · ${LP.i+1} of ${list.length}`; }
function logoOpen(grp,i,opener){ LP.grp=grp; LP.i=i; LP.opener=opener; LP.dlg.showModal(); logoShow(); $('#lpClose').focus(); }
const logoStep=d=>{ const n=(LP.grp==='g1'?g1:g2).length; LP.i=(LP.i+d+n)%n; logoShow(); };
$('#lpClose').onclick=()=>LP.dlg.close(); $('#lpPrev').onclick=()=>logoStep(-1); $('#lpNext').onclick=()=>logoStep(1);
LP.dlg.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'){ e.preventDefault(); logoStep(-1);} if(e.key==='ArrowRight'){ e.preventDefault(); logoStep(1);} });
LP.dlg.addEventListener('click',e=>{ if(e.target===LP.dlg) LP.dlg.close(); });
LP.dlg.addEventListener('close',()=>{ if(LP.opener) LP.opener.focus(); });

P({id:'marketing-approach',no:15,ch:2,title:'Marketing Approach',img:'strategy-aerial',
  body:`<div class="ph-r fade" style="left:632px"><img class="px" src="${IMG('strategy-aerial')}" alt="South Walton beach at sunset, from above" decoding="async"></div>
  ${ST.approach.map((a,i)=>`<div class="cd apc a d${i+1}" style="${at(61+(i%2)*421,164+Math.floor(i/2)*311,402,292)}"><div class="ap-h"><img src="${D5(`ic-app-${i+1}.png`)}" alt=""><b>${esc(a[0])}</b></div><p>${esc(a[1])}</p></div>`).join('')}`});

const HL=B.highlights;
const NB=(x,y,w,h,big,cap,extra='',cls='')=>`<div class="nb ${cls}" style="${at(x,y,w,h)}">${extra}<div class="nb-in"><div class="big">${big}</div><div class="cap">${cap}</div></div></div>`;
P({id:'highlights',no:16,ch:2,title:'Investment Highlights',t:'Investment highlights: the only hotels within Grand Boulevard',img:'highlight-boulevard',
  body:`<div class="ph-r" style="left:856px"><img class="px" src="${IMG('highlight-boulevard')}" alt="Grand Boulevard at night" decoding="async"></div>
  <p class="kick a" style="${at(50,122,800)}">${esc(HL[0].title)}</p>
  <p class="a" style="${at(50,158,790)}">${esc(HL[0].body)}</p>
  ${HL[0].stats.map((s,i)=>`<div class="gbk a d${i+1}" style="${at(50,284+i*180,257,171)}"><img src="${D5(`ic-gb-${i+1}.png`)}" alt="" style="width:${[104,96,100][i]}px"></div>${NB(316,284+i*180,528,171,esc(s[0]),esc(s[1]),'','a d'+(i+1))}`).join('')}`});

P({id:'highlights-performance',no:17,ch:2,title:'Investment Highlights',t:'Investment highlights: market-leading performance',img:'highlight-performance',
  body:`<div class="ph-r fade" style="left:800px"><img class="px" src="${IMG('highlight-performance')}" alt="Residence Inn suite living room" decoding="async"></div>
  <p class="kick a" style="${at(50,122,800)}">${esc(HL[1].title)}</p>
  <p class="a" style="${at(50,156,790)}">${esc(HL[1].body)}</p>
  <div class="nb a d1" style="${at(50,261,787,184)}"><img src="${D5('ic-trophy.png')}" alt="" style="position:absolute;left:58px;top:18px;width:128px"><p class="nb-sp" style="position:absolute;left:240px;top:22px">Competitive-Set Leaders</p>
    <div class="big" style="position:absolute;left:236px;top:56px;font-size:104px">#1</div><p class="cap" style="position:absolute;left:400px;top:82px;font-size:25px;line-height:1.2">Occupancy ranking<br>all three hotels</p></div>
  ${NB(50,455,387,166,'15%–37%','RevPAR premiums','','a d2')}${NB(451,455,386,166,'137','Residence Inn RevPAR index<br>vs. 110 in 2022','','a d2')}
  ${NB(50,635,387,167,'~76%','Portfolio occupancy','','a d3')}${NB(451,635,386,167,'$114','Portfolio RevPAR','','a d3')}
  <p class="src" style="${at(50,808,780)}margin:0;font-size:10.5px;z-index:3">Occupancy and RevPAR: T-12 ended Aug. 2026 (historical). ~$127 RevPAR by Year Three (2029) is projected.</p>`});

P({id:'highlights-market',no:18,ch:2,title:'Investment Highlights',t:'Investment highlights: high-barrier, affluent market',img:'highlight-market',
  body:`<div class="ph-r fade" style="left:560px;top:225px"><img class="px" src="${IMG('highlight-market')}" alt="South Walton beach from above" decoding="async"></div>
  <p class="kick a" style="${at(50,122,800)}">${esc(HL[2].title)}</p>
  <p class="a" style="${at(50,156,1500)}">${esc(HL[2].body)}</p>
  <div class="nb a d1" style="${at(50,244,787,189)}"><p class="nb-sp" style="position:absolute;left:24px;top:20px">Affluent Visitor Base</p><div class="big" style="position:absolute;left:24px;top:58px;font-size:84px">$197,500</div>
    <p class="cap" style="position:absolute;left:24px;top:150px">Average household income South Walton visitors</p><img src="${D5('ic-family.png')}" alt="" style="position:absolute;right:46px;top:20px;width:150px"></div>
  ${NB(50,443,387,172,'$170,339','Resident household income<br>Miramar Beach','','a d2')}${NB(451,443,386,172,'$89,319','Resident household income<br>Fort Walton Beach · 15 miles west','','a d2')}
  ${NB(50,628,387,174,'1 IN 3','Visitor households earn<br>more than $200,000','','a d3')}${NB(451,628,386,174,'1.3%','Rooms under construction<br>of submarket inventory','','a d3')}`});

P({id:'highlights-assets',no:19,ch:2,title:'Investment Highlights',t:'Investment highlights: renovated assets, brand flexibility',
  body:`<div class="pg-bg-grey" style="${at(13,13,1574,438)}background:#EEEFF1"></div>
  <p class="kick a" style="${at(50,122,800)}">${esc(HL[3].title)}</p>
  <p class="a" style="${at(50,156,790)}">${esc(HL[3].body)}</p>
  <div class="nb a d1" style="${at(50,235,790,191)}"><p class="nb-sp" style="position:absolute;left:24px;top:18px">Renovation Investment</p><div class="big" style="position:absolute;left:24px;top:56px;font-size:84px">~$11.8M</div>
    <p class="cap" style="position:absolute;left:52px;top:154px">Residence Inn &amp; Courtyard 2023–2024</p><img src="${D5('ic-crane.png')}" alt="" style="position:absolute;right:38px;top:16px;width:196px"></div>
  ${NB(878,124,332,141,'2023–2024','Renovations completed<br>Residence Inn &amp; Courtyard','','left mid a d1')}${NB(1221,124,331,141,'2018','Hyatt Place<br>opened','','left mid a d2')}
  ${NB(878,284,332,142,'CONCRETE','Built-to-last construction<br>all three hotels','','left mid a d2')}${NB(1221,284,331,142,'MINIMAL- MODEST','Near-term capital needs<br>modest at Hyatt Place','','left mid sm a d3')}
  <div class="gbk a d3" style="${at(32,474,420,328)}"><img src="${D5('logo-marriott.png')}" alt="Marriott" style="width:206px"></div>
  <div class="gbk a d4" style="${at(468,474,420,328)}"><img src="${D5('logo-hyatt.png')}" alt="Hyatt" style="width:280px"></div>
  <p class="kick a d4" style="${at(919,578,660)}">${esc(HL[4].title)}</p>
  <p class="a d4" style="${at(919,614,630)}">${esc(HL[4].body)}</p>`});

P({id:'upside-terms',no:20,ch:2,title:'Upside Opportunities',t:'Upside opportunities & listing terms',img:'gal-residence-09',
  body:`${B.upside.items.map((t,i)=>`<div class="nb plain a d${i+1}" style="${at(48,124+i*139,122,122)}display:grid;place-items:center"><img src="${D5(`ic-up-${i+1}.png`)}" alt="" style="width:86px"></div>
    <div class="nb plain a d${i+1}" style="${at(186,124+i*139,389,122)}display:flex;align-items:center;padding:0 20px"><p style="color:#fff;font-size:20px;line-height:1.15;margin:0">${esc(t)}</p></div>`).join('')}
  <div class="ph-box" style="${at(635,0,965,594)}"><img class="px" src="${IMG('gal-residence-09')}" alt="Residence Inn suite living room" decoding="async"></div>
  <div class="pg-bg-grey" style="${at(635,594,965,236)}"></div><div style="${at(635,634,34,60)}background:var(--green)"></div>
  <h3 class="a d3" style="${at(686,640,880)}font:700 33px/1.15 var(--title);color:var(--navy)">Listing Agreement &amp; Key Terms</h3>
  <p class="a d4" style="${at(686,724,860)}">${esc(B.listing.text)}</p>
  <p class="src" style="${at(48,820,560)}margin:0;font-size:10.5px;z-index:3"></p>`});

const PH_H=[338,370,402,433,465];
P({id:'marketing-timeline',no:21,ch:2,title:'Marketing Timeline',
  body:`<p class="a" style="${at(50,120,1400)}">${esc(ST.timelineNote)}</p>
  ${[332,627,922,1217].map(x=>`<i class="mt-div" style="${at(x,315,1,487)}"></i>`).join('')}
  <div class="chev mt a d1">${ST.timeline.map((p,i)=>{ const x=Math.round(49+i*294.2), bot=[654,685,717,749,780][i]; return `<div class="mt-c" style="${at(x,0,322,900)}"><p class="h" style="${at(0,163,271)}">${p.dur.toUpperCase()}</p>
    <button type="button" class="ar ${i%2?'g':''}" data-i="${i}" aria-pressed="false" style="${at(0,200,322,104)}"><span>${esc(p.phase).replace(' / ',' /<br>')}</span></button>
    <div class="bx ${i%2?'g':'n'}" style="${at(0,315,271,bot-315)}"><ul>${p.tasks.map(t=>`<li class="${t.startsWith('»')?'sub':''}">${esc(t.replace(/^»\s*/,''))}</li>`).join('')}</ul></div></div>`; }).join('')}</div>`,
  init(el){ const bs=$$('.chev .ar',el); bs.forEach(b=>b.addEventListener('click',()=>{ const on=b.getAttribute('aria-pressed')!=='true';
      bs.forEach(x=>x.setAttribute('aria-pressed',x===b&&on?'true':'false')); $$('.chev > .mt-c',el).forEach((c,i)=>c.style.opacity=on&&i!==+b.dataset.i?'.35':''); })); }});

P({id:'client-references',no:22,ch:2,title:'Proven Process: Client References',img:'references-boulevard',
  body:`<div class="ph-r fade" style="left:520px"><img class="px" src="${IMG('references-boulevard')}" alt="Grand Boulevard arcade" decoding="async"></div>
  <div class="refl a d1" style="${at(50,140,560)}">${HW.references.map(r=>`<div class="refr"><div class="rl">${r[2]?`<img src="assets/logos/${r[2]}.png" alt="${esc(r[0])}">`:`<b>${esc(r[0])}</b>`}</div><div class="rc"><small>Contact:</small><span>${esc(r[1])}</span></div></div>`).join('')}</div>`});

/* ======================= 23–53 BROKER'S OPINION OF VALUE ======================= */
DV({id:'opinion-of-value',no:23,ch:3,img:'chapter-valuation',cap:'Broker’s Opinion of Value'});

/* p.24 pricing curve, drawn to the BOV geometry: $50M / $55M / $60M on a bell of bidders */
function curveSvg(){
  const W=1500, H=470, base=402, peak=82, x=v=>750+(v-55e6)*61e-6, g=v=>Math.exp(-Math.pow((v-55e6)/3.56e6,2)/2), y=v=>base-(base-peak)*g(v);
  let d=`M${x(43e6)},${base}`; for(let v=43e6; v<=67.01e6; v+=0.1e6) d+=`L${x(v).toFixed(1)},${y(v).toFixed(1)}`; d+=`L${x(67e6)},${base}Z`;
  let tail=`M${x(60e6)+3},${y(60e6+0.05e6).toFixed(1)}`; for(let v=60.1e6; v<=67.01e6; v+=0.1e6) tail+=`L${x(v).toFixed(1)},${y(v).toFixed(1)}`;
  const C=V.curve, pts=[['Baseline pricing',C.baseline],['Midpoint',C.mid],['Target pricing',C.target]], SLOT=[50e6,55e6,60e6];
  const SEC=[[0,x(50e6)],[x(50e6),x(60e6)],[x(60e6),W]], T='font-family="Barlow, sans-serif"';
  const lbl=i=>{ const p=pts[i], v=p[1][0], cx=x(SLOT[i]), ty=i===1?18:120; return `<text class="cv-num" x="${cx}" y="${ty}" text-anchor="middle" ${T} font-weight="700" font-size="27" fill="#2A2F45">${usd(v)}</text>
    <text class="cv-num" x="${cx}" y="${ty+22}" text-anchor="middle" ${T} font-size="15" fill="#2A2F45">${usd(p[1][1])} PER KEY</text>
    <line x1="${cx}" x2="${cx}" y1="${ty+34}" y2="${i===1?y(SLOT[i])-14:y(SLOT[i])-8}" stroke="#2A2F45" stroke-dasharray="2 3"/>`; };
  const fill=i=>`<path class="cv-fill" d="${d}" fill="url(#dotp)" clip-path="url(#cvc${i})"/>`;
  const sec=[
    `${fill(0)}${lbl(0)}`,
    `${fill(1)}<g class="cv-tr"><line x1="${x(50.4e6)}" x2="${x(59.6e6)}" y1="${base-38}" y2="${base-38}" stroke="#fff" stroke-width="1.5"/><line x1="${x(50.4e6)}" x2="${x(50.4e6)}" y1="${base-44}" y2="${base-32}" stroke="#fff"/><line x1="${x(59.6e6)}" x2="${x(59.6e6)}" y1="${base-44}" y2="${base-32}" stroke="#fff"/>
      <text x="750" y="${base-50}" text-anchor="middle" ${T} font-weight="700" font-size="20" letter-spacing="3" fill="#fff">TRADE</text><text x="750" y="${base-12}" text-anchor="middle" ${T} font-weight="700" font-size="20" letter-spacing="3" fill="#fff">RANGE</text></g>${lbl(1)}`,
    `<rect x="${x(60e6)+3}" y="${base-131}" width="416" height="99" fill="#DEDFE3"/>${fill(2)}<path d="${tail}" fill="none" stroke="#fff" stroke-width="4"/>
      <g class="cv-tgt"><path d="M${x(60e6)+69},${base-95} H${x(60e6)+336} v-18 L${x(60e6)+408},${base-82} L${x(60e6)+336},${base-51} v-18 H${x(60e6)+69} z" fill="#64A70B"/><text x="${x(60e6)+325}" y="${base-75}" text-anchor="end" ${T} font-weight="700" font-size="20" fill="#fff">TARGET PRICING</text></g>${lbl(2)}`];
  return `<svg class="cv" viewBox="0 0 ${W} ${H}" role="group" aria-label="Illustrative curve of the number of bidders by price: ${pts.map(p=>`${p[0].toLowerCase()} ${usd(p[1][0])} (${usd(p[1][1])} per key)`).join(', ')}; the trade range runs between baseline and target." style="width:100%;height:auto;display:block;overflow:visible">
    <defs><pattern id="dotp" width="11" height="11" patternUnits="userSpaceOnUse"><rect width="11" height="11" fill="#232C64"/><circle cx="5.5" cy="5.5" r="1" fill="rgba(255,255,255,.14)"/></pattern>
      ${SEC.map((r,i)=>`<clipPath id="cvc${i}"><rect x="${r[0]}" y="0" width="${r[1]-r[0]}" height="${H}"/></clipPath>`).join('')}</defs>
    ${sec.map((h,i)=>`<g class="cv-sec" data-s="${i}" tabindex="0" role="img" aria-label="${pts[i][0]}: ${usd(pts[i][1][0])}, ${usd(pts[i][1][1])} per key${i===1?'; the trade range':''}">${h}</g>`).join('')}
    <line x1="${x(50e6)}" x2="${x(50e6)}" y1="${y(50e6)-2}" y2="${base}" stroke="#fff" stroke-width="5" pointer-events="none"/><line x1="${x(60e6)}" x2="${x(60e6)}" y1="${y(60e6)-2}" y2="${base}" stroke="#fff" stroke-width="5" pointer-events="none"/>
    <g class="cv-yax"><line x1="58" x2="58" y1="${base-30}" y2="${peak-6}" stroke="#2A2F45" stroke-width="2"/><path d="M58,${peak-20} l-7,16 h14 z" fill="#2A2F45"/></g>
    <text x="72" y="${base-60}" ${T} font-weight="700" font-size="14" letter-spacing="4" fill="#2A2F45" transform="rotate(-90 72 ${base-60})">NUMBER OF BIDDERS</text>
    <text x="40" y="${base+36}" ${T} font-weight="700" font-size="19" fill="#2A2F45">BASELINE PRICING</text>
    <g class="cv-xax"><line x1="240" x2="1250" y1="${base+29}" y2="${base+29}" stroke="#232C64" stroke-width="2.2"/><path d="M1262,${base+29} l-16,-7 v14 z" fill="#232C64"/></g>
    <text x="1475" y="${base+36}" text-anchor="end" ${T} font-weight="700" font-size="19" fill="#2A2F45">TARGET PRICING</text></svg>`; }
P({id:'valuation-metrics',no:24,ch:3,title:'Valuation Metrics - Consolidated Portfolio',
  body:`<p class="a" style="${at(50,118,1500)}">${esc(V.intro)}</p><div class="a d1" style="${at(50,210,1500)}">${curveSvg()}</div>
  <p class="src" style="${at(50,800,1300)}margin:0;font-size:10.5px">Illustrative pricing curve (vertical axis: number of bidders; not to scale). Per-key values on 376 keys. Source: BOV p. 24.</p>`,
  init(el){ const svg=$('.cv',el), set=i=>{ if(i==null) delete svg.dataset.act; else svg.dataset.act=i; $$('.cv-sec',el).forEach(g=>g.classList.toggle('act',g.dataset.s===String(i))); };
    $$('.cv-sec',el).forEach(g=>{ g.addEventListener('mouseenter',()=>set(g.dataset.s)); g.addEventListener('focus',()=>set(g.dataset.s)); g.addEventListener('mouseleave',()=>set(null)); g.addEventListener('blur',()=>set(null)); }); }});

/* valuation metrics & key assumptions pages (25, 30, 36, 42, 48) */
function VAL(k,no,id,title,sub,hdrKind){ const v=V.views[k], M=v.metrics, tri=!!v.scenario;
  const rows=[['Value:',usd(M.value),1],['Value per room:',usd(M.perKey),1],['Estimated capital &amp; closing costs:',usd(M.capClose)],['All-in acquisition cost:',usd(M.allIn),1],['All-in price per room:',usd(M.allInPerKey),1],
    ['All-in cap rate on TTM NOI:',pct(M.capTTM)],['All-in EBITDA multiple on TTM:',M.ebitdaTTM]]
    .concat(tri?[['All-in cap rate on 2029 (post-conv.):',pct(M.cap2029)],['All-in EBITDA multiple on 2029 (post-conv.):',M.ebitda2029]]:[['All-in cap rate on 2026 forecast:',pct(M.capF26)],['All-in EBITDA multiple on 2026 forecast:',M.ebitdaF26]])
    .concat([['5-year leveraged IRR:',pct(M.lev5)],['10-year unleveraged IRR:',pct(M.unlev10)]]);
  P({id,no,ch:3,title,sub:sub+(tri?` <span class="tag scn" style="margin-left:10px;vertical-align:2px">Alternative scenario · not part of the ${usdM(V.views.portfolio.metrics.value)} portfolio value</span>`:''),hdr:hdrKind,scn:tri,t:`${v.label}: valuation metrics & key assumptions`,
    body:`<div class="vm-panel a d1"><h5>Valuation Metrics</h5>${rows.map(r=>`<div class="vm-row ${r[2]?'g':''}"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}<small>* Metrics recorded at midpoint of value range presented.</small></div>
    <p class="lab a d2" style="${at(653,168,400)}font-size:15px">All-In Price *</p>
    <div class="ap-tbl a d2" style="top:198px"><table><thead><tr>${v.sensHeads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>
      ${v.sens.map((s,i)=>`<tr class="${i===2?'mid':''}"><td>${usd(s[0])}</td><td>${usd(s[1])}</td><td>${pct(s[2])}</td><td>${pct(s[3])}</td></tr>`).join('')}
      <tr class="noi"><td colspan="2">Net Operating Income</td><td>${usd(v.sensNOI[0])}</td><td>${usd(v.sensNOI[1])}</td></tr></tbody></table>
      <p style="font:italic 11px/1 var(--sans);margin:8px 0 0">* Note: Includes Capex &amp; Closing Costs.</p></div>
    <div class="ka a d3"><div class="ka-h"><h5>Key Assumptions</h5><div class="btns"><button type="button" class="mini-btn calc" data-detail="calc:${k}">Cap-rate explorer</button></div></div><ul>${v.assumptions.map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div>`}); }
/* financial exhibit pages */
function SHEET(no,id,k,kind,title,hdrKind){ const v=V.views[k], R=V.returns[k], tri=!!v.scenario;
  let html='', notes=[];
  if(kind==='cfh'){ html=cfTable(T.cf[k].historical,v.sub); notes=V.cfFootnotes.map(esc).concat(k==='portfolio'||k==='hyatt'?['Non-operating income (shown negative within fixed charges) reflects lease income, including the Perla Baking Co. lease at the Hyatt Place.']:[]); }
  if(kind==='cfp'){ html=cfTable(T.cf[k].projected,v.sub,{portfolio:0,hyatt:0,tribute:1}[k]); notes=[(k==='hyatt'||k==='portfolio'?'Year One (2027) is a renovation year at the Hyatt Place. ':'')+(tri?'Year Two (2028) reflects conversion displacement. ':'')+esc(V.disclaimer)]; }
  if(kind==='pen'){ html=penTable(k)+`<div style="margin-top:12px;max-width:640px">${compsetHtml(k)}</div>`; notes=V.penFootnotes.map(esc); }
  if(kind==='lev'){ html=levTables(R,k); notes=[esc(V.disclaimer)].concat(R.sourcesNote?[]:[]); }
  if(kind==='unlev'){ html=unlevTables(R); notes=[esc(V.disclaimer)]; }
  const tags={cfh:KTAG.hist+KTAG.forecast,cfp:KTAG.proj,pen:KTAG.hist+KTAG.forecast+KTAG.proj,lev:KTAG.proj,unlev:KTAG.proj}[kind]+(tri?KTAG.scn:'');
  P({id,no,ch:3,title,hdr:hdrKind,scn:tri,cls:'xs',
    body:`<div class="sheet-tags">${tags}</div><div class="sheet a d1" tabindex="0" role="region" aria-label="${esc(title.replace(/<[^>]+>/g,''))}">${html}<div class="notes">${notes.map(n=>`<p>${n}</p>`).join('')}<p>Source: BOV p. ${no}.</p></div></div>`,
    init(el){ const sh=$('.sheet',el); if(sh.scrollHeight>sh.clientHeight+4){ sh.classList.add('more'); $('.sheet-tags',el).insertAdjacentHTML('beforeend','<span class="scroll-hint">Scroll the exhibit for all rows ↓</span>'); sh.addEventListener('scroll',()=>sh.classList.toggle('more',sh.scrollTop+sh.clientHeight<sh.scrollHeight-4),{passive:true}); }
      const cb=$('input[data-ratio]',el); if(cb){ cb.checked=true; const t=$('#'+cb.dataset.ratio,el); setRatio(t,true); cb.addEventListener('change',()=>setRatio(t,cb.checked)); } }}); }

VAL('portfolio',25,'portfolio-valuation','Valuation Metrics &amp; Key Assumptions - Portfolio (Consolidated)','Consolidation: Howard Group 3 Property Portfolio At Grand Boulevard','port');
SHEET(26,'portfolio-historical','portfolio','cfh','Historical Cash Flow Summary - Portfolio (Consolidated)','port');
SHEET(27,'portfolio-projected','portfolio','cfp','Projected Cash Flow Summary - Portfolio (Consolidated)','port');
SHEET(28,'portfolio-leveraged','portfolio','lev','Projected Leveraged Return Analysis - Portfolio (Consolidated)','port');
SHEET(29,'portfolio-unleveraged','portfolio','unlev','Projected Unleveraged Return Analysis - Portfolio (Consolidated)','port');
[['courtyard',30,'Courtyard','Courtyard Sandestin at Grand Boulevard'],['hyatt',36,'Hyatt Place','Hyatt Place Sandestin at Grand Boulevard'],['residence',42,'Residence Inn','Residence Inn Sandestin at Grand Boulevard']].forEach(([k,n,name,sub])=>{
  VAL(k,n,`${k}-valuation`,'Valuation Metrics &amp; Key Assumptions',sub,k);
  SHEET(n+1,`${k}-historical`,k,'cfh',`Historical Cash Flow Summary – ${name}`,k);
  SHEET(n+2,`${k}-penetration`,k,'pen',`Historical &amp; Projected Penetration Analysis – ${name}`,k);
  SHEET(n+3,`${k}-projected`,k,'cfp',`Projected Cash Flow Summary – ${name}`,k);
  SHEET(n+4,`${k}-leveraged`,k,'lev',`Projected Leveraged Return Analysis – ${name}`,k);
  SHEET(n+5,`${k}-unleveraged`,k,'unlev',`Projected Unleveraged Return Analysis – ${name}`,k); });
VAL('tribute',48,'tribute-valuation','Valuation Metrics &amp; Key Assumptions - Tribute Portfolio Valuation','Courtyard Sandestin at Grand Boulevard - Conversion to Tribute Portfolio','tribute');
SHEET(49,'tribute-historical','tribute','cfh','Historical Cash Flow Summary –<br>Courtyard Conversion to Tribute Portfolio','tribute');
SHEET(50,'tribute-projected','tribute','cfp','Projected Cash Flow Summary –<br>Courtyard Conversion to Tribute Portfolio','tribute');
SHEET(51,'tribute-leveraged','tribute','lev','Projected Leveraged Return Analysis –<br>Courtyard Conversion to Tribute Portfolio','tribute');
SHEET(52,'tribute-unleveraged','tribute','unlev','Projected Unleveraged Return Analysis –<br>Courtyard Conversion to Tribute Portfolio','tribute');

/* cap-rate explorer (opens in the detail panel): reproduces the BOV sensitivity formula
   (cap rate = stated NOI ÷ all-in price; per key = all-in price ÷ keys). Validated by tools/check_deck.js. */
function calcHtml(k){ const v=V.views[k], lo=v.sens[0][0], hi=v.sens[4][0];
  return `<div class="calc" data-calc="${k}"><div class="hd"><h5>Cap-rate explorer · ${esc(v.label)}</h5>${KTAG.calc}</div>
   <p class="small" style="margin:6px 0 0;color:var(--ink-2);font-size:13.5px">Applies the BOV’s formula (stated NOI ÷ all-in price) to any price in the BOV’s range. It is not part of HWE’s underwriting; the five BOV points are marked.</p>
   <div class="range"><label class="sr-only" for="calc-${k}">All-in purchase price</label><input id="calc-${k}" type="range" min="${lo}" max="${hi}" step="25000" value="${v.sens[2][0]}">
   <div class="marks" aria-hidden="true">${v.sens.map(s=>`<span style="left:${((s[0]-lo)/(hi-lo)*100).toFixed(2)}%">${usdM(s[0],1)}</span>`).join('')}</div></div>
   <div class="calc-out" aria-live="polite"></div></div>
   <p class="src">NOI basis: ${v.sensHeads[2].replace('Cap Rate on ','')} ${usd(v.sensNOI[0])} · ${v.sensHeads[3].replace('Cap Rate on ','')} ${usd(v.sensNOI[1])}. ${esc(V.sensNote)}</p>`; }
function wireCalc(host){ $$('[data-calc]',host).forEach(c=>{ const k=c.dataset.calc, v=V.views[k], inp=$('input',c), out=$('.calc-out',c);
  const upd=()=>{ const p=+inp.value, bov=v.sens.find(s=>s[0]===p);
    out.innerHTML=`<div><b>${usd(p)}</b><span>All-in price${bov?' · BOV point':''}</span></div><div><b>${usd(p/v.keys)}</b><span>All-in price per key</span></div><div><b>${pct(v.sensNOI[0]/p*100)}</b><span>${v.sensHeads[2]}</span></div><div><b>${pct(v.sensNOI[1]/p*100)}</b><span>${v.sensHeads[3]}</span></div>`;
    inp.setAttribute('aria-valuetext',`${usd(p)} all-in; ${pct(v.sensNOI[0]/p*100)} and ${pct(v.sensNOI[1]/p*100)} cap rates`); };
  inp.addEventListener('input',()=>{ const p=+inp.value, near=v.sens.find(s=>Math.abs(s[0]-p)<=30000); if(near) inp.value=near[0]; upd(); }); upd(); }); }

const CP=MK.comps;
P({id:'sales-comparables',no:53,ch:3,title:'Sales Comparables',img:'market-panorama',
  body:`<div class="ph-b fade-top" style="top:540px"><img class="px" src="${IMG('market-panorama')}" alt="Miramar Beach coastline" decoding="async" style="object-position:50% 60%"></div>
  <p class="a" style="${at(50,112,1500)}z-index:2">${esc(CP.intro)}</p>
  <div class="cmp a d1" style="${at(50,146,1500)}"><table><thead><tr><th>Date</th><th class="l">Property Name</th><th class="l">City</th><th>Units</th><th>Price ($)</th><th>$/Units</th></tr></thead><tbody>
   ${CP.rows.map(r=>`<tr class="${/Homewood/.test(r[1])?'hl':''}"><td>${r[0]}</td><td class="l">${esc(r[1])}</td><td class="l">${r[2]}</td><td>${r[3]}</td><td>${n0(r[4])}</td><td>${n0(r[5])}</td></tr>`).join('')}</tbody></table></div>`});

/* ======================= 54–61 MARKET OVERVIEW ======================= */
DV({id:'market-overview',no:54,ch:4,img:'chapter-market',cap:'Market Overview'});

const OV=MK.overview;
P({id:'south-walton',no:55,ch:4,title:'Sandestin / South Walton Market Overview',img:'market-overview',
  body:`<div class="ph-b fade-top" style="top:470px"><img class="px" src="${IMG('market-overview')}" alt="Miramar Beach shoreline at sunset, from above" decoding="async" style="object-position:50% 70%"></div>
  <img class="a" src="assets/logos/visit-south-walton.png" alt="Visit South Walton, Florida" style="${at(50,118,330)}height:auto;z-index:2">
  <div class="a d1" style="${at(50,200,600)}z-index:2">${OV.body.map(p=>`<p style="font-size:14.6px;line-height:1.42">${esc(p)}</p>`).join('')}</div>
  ${OV.tiles.concat(OV.growth).map((t,i)=>`<div class="nb tile a d${1+(i%4)}" style="${at(688+(i%4)*221,135+Math.floor(i/4)*196,202,178)}"><div class="tv${/[a-z]{3}/i.test(t[0])?' word':''}">${esc(t[0])}</div><p class="td">${esc(t[1])}</p>${t[2]?`<p class="tf">${esc(t[2])}</p>`:''}</div>`).join('')}`});

const TO=MK.tourism;
P({id:'tourism',no:56,ch:4,title:'South Walton Tourism &amp; Visitor Profile',t:'South Walton tourism & visitor profile',img:'market-tourism',
  body:`<div class="ph-r tour-sky" style="left:732px"><div class="tour-ph"><img class="px" src="${IMG('market-tourism')}" alt="South Walton coastline at sunset" decoding="async"></div></div>
  <div class="tstat a d1" style="${at(842,128,690,350)}">${TO.stats.map((s,i)=>`<div><img src="${D5(`ic-tour-${i+1}.png`)}" alt=""><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
  <div class="a" style="${at(50,112,650)}font-size:14.3px">${TO.body.slice(0,2).map(p=>`<p style="font-size:14.3px;margin:0 0 10px">${esc(p)}</p>`).join('')}</div>
  <div class="nb a d2" style="${at(50,374,200,224)}display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div class="big" style="font-size:66px">${TO.southeast}%</div><p class="cap" style="font-size:14.5px;text-transform:uppercase">Of visitors come<br>from Southeast</p></div>
  <div class="chart a d2" id="origins" style="${at(262,384,440,206)}"></div>
  <div class="a d3" style="${at(50,630,650)}">${TO.body.slice(2).map(p=>`<p style="font-size:14.3px;margin:0 0 10px">${esc(p)}</p>`).join('')}</div>`,
  init(el){ Charts.hbar($('#origins',el),{items:TO.origins,color:'#64A70B',fmt:v=>v.toFixed(1)+'%',max:15}); }});

const GBV=MK.boulevard;
P({id:'grand-boulevard',no:57,ch:4,title:'Grand Boulevard',
  body:`<p class="a gb-txt" style="${at(50,112,725)}"><span style="font-size:14.4px;line-height:1.4">${esc(GBV.body[0])}</span></p>
  <p class="a d1" style="${at(50,244,725)}margin:0"><span class="tagbar">A Curated, Best-in-Class Tenant Roster</span></p>
  <div class="a d1 gb-txt" style="${at(50,282,725)}">${GBV.body.slice(1).map(p=>`<p style="margin:0 0 10px">${esc(p)}</p>`).join('')}</div>
  ${GBV.stats.map((s,i)=>{ const B=[[50,353],[419,353],[50,272],[339,207],[565,207]][i], top=i<2; /* PDF widths; rows span the roster box top to bottom (505-802) */
    return `<div class="nb gbs a d${2+i%3}" style="${at(B[0],top?505:657,B[1],top?138:145)}"><div class="tv">${s[0]}</div><p class="td">${esc(s[1])}</p></div>`; }).join('')}
  <div class="ph-box a d1" style="${at(791,118,373,350)}"><img class="px" src="assets/img/fest-songwriters.jpg" alt="30A Songwriters Festival crowd" loading="lazy"></div>
  <div class="ph-box a d2" style="${at(1179,118,373,350)}"><img class="px" src="assets/img/fest-winefood.jpg" alt="South Walton Beaches Wine &amp; Food Festival" loading="lazy"></div>
  <img class="a d3" src="${D5('tenant-roster.png')}" alt="Grand Boulevard tenant roster: ${GBV.tenants.join(', ')}" style="${at(791,479,761,329)}object-fit:contain">`});

const AL=MK.airlift;
P({id:'regional-airlift',no:58,ch:4,title:'Regional Airlift',
  body:`<p class="a" style="${at(50,118,700)}margin:0"><span class="tagbar">Three commercial airports serve the market:</span></p>
  <ul class="dots a d1" style="${at(50,160,690)}">${AL.bullets.map(b=>`<li style="font-size:14.6px">${esc(b[0])}: ${esc(b[1].replace(/^The closest to Miramar Beach\. /,'the closest to Miramar Beach. '))}</li>`).join('')}</ul>
  <div class="a d2" style="${at(772,140,790,300)}"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font:700 21px/1.1 var(--sans);color:var(--navy)">Regional Airport Passenger Statistics</h4>
    <div class="legend" style="margin:0">${['VPS','ECP','PNS'].map((k,i)=>`<span><i style="background:${['#232C64','#64A70B','#B9BDC9'][i]}"></i>${k}</span>`).join('')}</div></div>
    <p style="font-size:11.5px!important;margin:4px 0 0">Total passengers (millions) · values measured from the BOV chart</p><div class="chart" id="airC"></div></div>
  ${[1,2,3].map(i=>`<div class="ph-box a d${i+1}" style="${at(14+(i-1)*529,450,514,366)}"><img src="${D5(`airport-${i}.jpg`)}" alt="${esc(AL.bullets[i-1][0])}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div>`).join('')}`,
  init(el){ const ac={VPS:'#232C64',ECP:'#64A70B',PNS:'#B9BDC9'};
    Charts.bar($('#airC',el),{cats:AL.years.map(String),series:Object.keys(ac).map(k=>({name:k,color:ac[k],values:AL.series[k]})),fmt:v=>v.toFixed(2)+'M',yFmt:v=>v.toFixed(1),height:250,label:'Regional airport passengers 2018-2025'}); }});

const SMK=MK.submarket;
const subRow=r=>`<tr><td>${r[0]}</td>${r.slice(1).map((x,i)=>i%2===1?`<td class="d">${x==null?'•••':pct(x)}</td>`:`<td>${i===0?pct(x):i===2||i===4?usd2(x):n0(x)}</td>`).join('')}</tr>`;
P({id:'submarket',no:59,ch:4,title:'Fort Walton Beach Submarket Lodging Performance',img:'market-submarket',
  body:`<div class="ph-box" style="${at(0,300,802,530)}"><img class="px" src="${IMG('market-submarket')}" alt="Aerial view of a Florida beachfront" decoding="async"></div>
  <div style="${at(0,0,802,330)}background:linear-gradient(180deg,#fff 70%,rgba(255,255,255,0));z-index:1"></div>
  <p class="a" style="${at(50,118,710)}z-index:2;text-align:justify">${esc(SMK.body)}</p>
  <div class="subt a d1" style="${at(815,118,742)}"><table><thead><tr><th>Year</th>${SMK.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${SMK.rows.map(subRow).join('')}</tbody>
   <tbody class="ytd">${SMK.ytd.map(subRow).join('')}</tbody>
   <tbody class="cagr"><tr class="sp"><td colspan="11"></td></tr><tr class="ch"><th>CAGR</th><th class="avg">Avg.</th><td colspan="9"></td></tr>
    ${SMK.cagr.map((r,i)=>`<tr${i===SMK.cagr.length-1?' class="last"':''}><th>${r[0]}</th><td class="avg">${pct(r[1])}</td><td></td><td></td><td>${pct(r[2])}</td><td></td><td>${pct(r[3])}</td><td></td><td>${pct(r[4])}</td><td></td><td>${pct(r[5])}</td></tr>`).join('')}</tbody></table>
   <p class="src" style="margin:4px 0 0;font-size:10px">CAGR figures sit under the % Δ column of ADR, RevPAR, Supply and Demand; Avg. is average occupancy. The BOV does not name the data provider for this exhibit.</p></div>`});

const SPL=MK.supply;
P({id:'new-supply',no:60,ch:4,title:'South Walton / Destin New Supply',img:'market-supply',
  body:`<div class="ph-r" style="left:1220px"><img class="px" src="${IMG('market-supply')}" alt="Destin coastline from above" decoding="async"></div>
  <p class="a" style="${at(50,118,1135)}">${esc(SPL.body)}</p>
  <div class="cmp sup a d1" style="${at(50,214,1134)}"><table><thead><tr><th class="l">Property</th><th>Keys</th><th class="l">Constr. Status</th><th class="l">Address</th><th>Drive Dist. (mi)</th></tr></thead><tbody>
   ${SPL.rows.map(r=>`<tr class="${/MOXY/.test(r[0])?'hl2':''}"><td class="l">${esc(r[0])}</td><td>${r[1]}</td><td class="l">${r[2]}</td><td class="l">${esc(r[3])}</td><td>${r[4].toFixed(1)}</td></tr>`).join('')}</tbody></table></div>`});

/* p.61 closing: lockup on the sunset photograph, representatives, and the BOV itself */
const DL=[
  {f:'downloads/Sandestin-3-Pk-BOV-November-2026.pdf',name:'Sandestin-3-Pk-BOV-November-2026.pdf',t:'Complete BOV',s:'61 pages · 27.4 MB',full:true},
  {f:'downloads/parts/Sandestin-BOV-pp01-11.pdf',name:'Sandestin-BOV-pp01-11.pdf',t:'pp. 1–11 · HWE overview',s:'10.1 MB'},
  {f:'downloads/parts/Sandestin-BOV-pp12-22.pdf',name:'Sandestin-BOV-pp12-22.pdf',t:'pp. 12–22 · Sales strategy',s:'8.2 MB'},
  {f:'downloads/parts/Sandestin-BOV-pp23-53.pdf',name:'Sandestin-BOV-pp23-53.pdf',t:'pp. 23–53 · Opinion of value',s:'3.4 MB'},
  {f:'downloads/parts/Sandestin-BOV-pp54-61.pdf',name:'Sandestin-BOV-pp54-61.pdf',t:'pp. 54–61 · Market overview',s:'8.3 MB'}];
add({id:'closing',no:61,ch:4,title:'Exclusive representatives',cls:'dv closing',img:'closing-sunset',
  html:`<div class="ph-l" style="width:1095px"><img class="px" src="${IMG('closing-sunset')}" alt="Sunset over the Gulf" decoding="async"></div>
  <div class="cl-lock a d1"><p class="k">Broker Selection RFP:</p><h2>Hotel Portfolio at<br>Grand Boulevard Sandestin</h2><div class="rule"></div>${MARKS_W(1.2)}<p class="loc">Destin/Miramar Beach</p><p class="st">Florida</p>
   <div class="pt"><span>Presenting to</span><img src="assets/logos/howard-group-white.png" alt="Howard Group" width="96" height="90"></div></div>
  <aside class="cl-panel"><img class="hw a" src="assets/logos/hwe-white.png" alt="Hodges Ward Elliott" width="118" height="46">
   <p class="ex a d1">Exclusive Representatives:</p>
   <ul class="reps2">${B.team.map((t,i)=>`<li class="a d${Math.min(6,i+1)}"><b>${esc(t.name)}</b><span>${esc(t.title)}</span><span class="em">${t.email}</span></li>`).join('')}</ul>
   <p class="web a d5"><a href="https://hodgeswardelliott.com" target="_blank" rel="noopener">hodgeswardelliott.com</a></p>
   <div class="dl dl2 a d6" id="dlList">${DL.map((d,i)=>`<a href="${d.f}" download="${d.name}" data-dl="${i}"${d.full?' data-full':''}>${ICON.dl}<span>${esc(d.t)}<small> · ${d.s}</small></span></a>`).join('')}</div><p class="dl-status" id="dlStatus" role="status"></p>
  </aside>`,
  init(el){ wireDownloads(el); }});

/* ================= detail views ================= */
/* column headings worded as in the BOV exhibits */
function cfHead(c,i,reno){ let m; const ORD=['One','Two','Three','Four','Five'];
  if((m=c.match(/^YE (\d{4})$/))) return ['Year Ended','December 31, '+m[1]];
  if((m=c.match(/^T-12 Aug (\d{4})$/))) return ['Trailing Twelve','August 31, '+m[1]];
  if((m=c.match(/^Forecast (\d{4})$/))) return ['Forecast Year Ended','December 31, '+m[1]+'<sup>(3)</sup>'];
  if((m=c.match(/^Year (\d) · (\d{4})$/))) return [m[2]+(reno===i?' Renovation':''),'Year '+ORD[+m[1]-1]];
  return [c]; }
function setRatio(t,on){ $$('.ratio',t).forEach(x=>x.hidden=!on); $$('th.cg',t).forEach(th=>th.colSpan=on?2:1);
  const n=$$('col.am',t).length, w=80/n; $$('col.am',t).forEach(c=>c.style.width=(on?w*0.62:w).toFixed(2)+'%'); $$('col.ra',t).forEach(c=>c.style.width=(w*0.38).toFixed(2)+'%'); t.classList.toggle('no-ratio',!on); }
function cfTable(cf,cap,reno){
  const cols=cf.cols, kinds=cf.kinds, id='t'+Math.random().toString(36).slice(2,7), dollar=new Set(['Net Operating Income','NOI / Key','Average Daily Rate','RevPAR']);
  let html=`<label class="ratio-tg"><input type="checkbox" data-ratio="${id}"> Show ratio columns (% of revenue; departmental expenses as % of departmental revenue)</label>
  <div class="tbl" tabindex="0" role="region" aria-label="${esc(cap)}"><table class="data cf" id="${id}"><caption>${esc(cap)}</caption><colgroup><col class="li" style="width:20%">${cols.map(()=>`<col class="am"><col class="ra ratio">`).join('')}</colgroup><thead>
  <tr class="ph"><th scope="col" rowspan="2" class="li">Line item</th>${cols.map((c,i)=>`<th scope="colgroup" colspan="2" class="${kinds[i]==='forecast'?'fcst':kinds[i]==='proj'?'proj':''} cg">${cfHead(c,i,reno).join('<br>')}</th>`).join('')}</tr>
  <tr class="ar">${cols.map((c,i)=>{ const k=kinds[i]==='forecast'?'fcst':kinds[i]==='proj'?'proj':''; return `<th scope="col" class="${k} am">Amount</th><th scope="col" class="${k} r ratio">Ratio</th>`; }).join('')}</tr></thead><tbody>`;
  let sec=null;
  cf.rows.forEach(r=>{ if(r.section!==sec){ sec=r.section; html+=`<tr class="sec"><td colspan="${cols.length*2+1}">${sec}</td></tr>`; }
    const tot=/^Total|Gross Operating Profit|EBITDA|Income Before/.test(r.label), key=r.label==='Net Operating Income';
    const lab=r.label+(r.label==='Management Fees'&&kinds[0]==='hist'?' ⁽¹⁾':'')+(r.label==='Reserve for Replacement'&&kinds[0]==='hist'?' ⁽²⁾':'');
    html+=`<tr class="${key?'key':tot?'total':''}"><td>${lab}</td>`+r.amt.map((v,i)=>{ const k=kinds[i]==='forecast'?'fcst':kinds[i]==='proj'?'proj':'';
      let s; if(r.label==='Occupancy') s=pct(v); else if(r.label==='Average Daily Rate'||r.label==='RevPAR') s=usd2(v); else if(dollar.has(r.label)||(r.label==='Rooms'&&r.section==='Revenue')) s=usd(v); else s=num(v);
      return `<td class="am ${k} ${v<0?'neg':''}">${s}</td><td class="r ${k} ratio">${r.ratio?pct(r.ratio[i]):''}</td>`; }).join('')+'</tr>'; });
  return html+'</tbody></table></div>';
}
function penTable(pk){
  const P=T.pen[pk], cols=T.pen.chgCols, vmap=[0,1,2,3,4,5,6,8,9,10,11,12,13], kindOf=j=>j===8?'fcst':(j>=9&&j<=13?'proj':'');
  const cell=(lab,v)=> v==null?'—':(/Rate|RevPAR$/.test(lab)&&!/Penetration|%/.test(lab)?usd2(v):pct(v));
  let h=`<div class="tbl" tabindex="0" role="region" aria-label="Penetration analysis"><table class="data"><caption>Historical &amp; projected penetration analysis (STR-based; subject property not included in competitive set)</caption><thead><tr><th scope="col">Metric</th>${cols.map((c,j)=>`<th scope="col" class="${kindOf(j)}">${c}</th>`).join('')}</tr></thead><tbody>`;
  [['subject','Subject property'],['compset','Competitive set (1)']].forEach(([b,lab])=>{ h+=`<tr class="sec"><td colspan="${cols.length+1}">${lab}</td></tr>`;
    P[b].forEach(r=>{ const arr=new Array(cols.length).fill(undefined);
      if(r.label.endsWith('% Change')||r.label==='Rank') r.vals.forEach((v,j)=>arr[j]=v); else r.vals.forEach((v,j)=>arr[vmap[j]]=v);
      const main=!/% Change|Penetration|Rank/.test(r.label);
      h+=`<tr class="${main?'total':''}"><td style="${main?'':'padding-left:26px;color:var(--ink-2)'}">${r.label.replace(/^.* % Change$/,'% Change')}</td>`+arr.map((v,j)=>`<td class="${kindOf(j)}">${v===undefined?'':(r.label==='Rank'?(v||'—'):(r.label.endsWith('% Change')?(v==null?'•••':pct(v)):cell(r.label,v)))}</td>`).join('')+'</tr>'; }); });
  return h+'</tbody></table></div>';
}
function compsetHtml(k){ const c=V.compsets[k]; return `<div class="tbl"><table class="data simple"><caption>Competitive set (subject property not included) · ${c.total} keys</caption><thead><tr><th>Hotel</th><th>Keys</th><th>Open date</th></tr></thead><tbody>${c.members.map(m=>`<tr><td>${esc(m[0])}</td><td>${m[1]}</td><td>${m[2]}</td></tr>`).join('')}</tbody></table></div><p class="src">${esc(V.compsets.supplyAddition)}</p>`; }
/* leveraged return analysis: the BOV's sections, order and wording (pp. 28, 34, 40, 46, 51) */
function levTables(R,k){
  const Y5=['Year One','Year Two','Year Three','Year Four','Year Five'], S=R.sale5, L=R.loan, eq=R.sources.find(s=>/Equity/.test(s[0]))[1], bal=R.debt.balance;
  const td=(v,c='')=>`<td class="${c}">${v}</td>`, row=(lab,cells,c='')=>`<tr class="${c}"><th scope="row">${lab}</th>${cells.join('')}</tr>`;
  const use=R.uses.map((u,i)=>{ const m=u[0].match(/^(.*?)\s*\((\d+\.\d%)\)$/), lab=m?m[1]:u[0], tot=i===R.uses.length-1, f=i===0||tot?usd:num;
    return `<tr class="${tot?'tot':''}"><th scope="row">${lab}</th><td class="pc">${m?m[2]:''}</td><td>${f(u[1])}</td><td>${f(u[2])}</td></tr>`; }).join('');
  const src=R.sources.map((x,i)=>{ const tot=i===R.sources.length-1; return `<tr class="${tot?'tot':''}"><th scope="row">${x[0]}</th><td>${i===0||tot?usd(x[1]):num(x[1])}</td><td class="pc">${x[2]}</td></tr>`; }).join('');
  const note=R.sourcesNote?`<p class="lv-fn">${esc(R.sourcesNote.replace(/\s*\[.*\]\s*$/,''))}</p>`:'';
  const mult=R.multiples.map(m=>row(m[0].replace(/ Room Rev\. Multiple$/,''),[td(m[1]),td(m[2])])).join('');
  const cr=R.capRates, capL=cr.slice(0,7), capR=cr.slice(7), shadeL=[1,1,0,0,2,2,2], shadeR=[1,1,1,0,0,0];
  const capT=(list,sh)=>`<table class="lv-t lv-cap"><tbody>${list.map((c,i)=>`<tr class="${sh[i]?'sh sh'+sh[i]:''}${sh[i]&&sh[i-1]!==sh[i]?' sh-top':''}${sh[i]&&sh[i+1]!==sh[i]?' sh-bot':''}"><th scope="row">${c[0]}</th><td>${c[1]}</td></tr>`).join('')}</tbody></table>`;
  let loan;
  if(L.groups) loan=`<div class="lv-loan3">${L.groups.map(g=>`<div><p class="lv-lh">${g[0]}</p>${g[1].map(p=>`<div class="lv-kv"><span>${p[0]}</span><b>${p[1]}</b></div>`).join('')}</div>`).join('')}</div>`;
  else loan=`<div class="lv-loan1"><div>${L.left.map(p=>`<div class="lv-kv"><span>${p[0]}</span><b>${p[1]}</b></div>`).join('')}</div>${L.right.length?`<div class="lv-box">${L.right.map(p=>`<div class="lv-kv"><span>${p[0]}</span><b>${p[1]}</b></div>`).join('')}</div>`:'<div></div>'}</div>`;
  const rate=L.rates?row('Annual Interest Rate:',L.rates.map(r=>td(r.toFixed(2)+'%')),'rate'):'';
  const sched=`<table class="lv-t lv-yr six"><thead><tr><th></th>${Y5.map(y=>`<th>${y}</th>`).join('')}<th></th></tr></thead><tbody>${rate}
    ${row('Beginning Balance',Y5.map(()=>td(usd(bal))).concat(td('')))}${row('Annual Payment',R.debt.payment.map(v=>td(num(v))).concat(td('')))}
    ${row('Portion to Interest',R.debt.payment.map(v=>td(num(v))).concat(td('')),'ind')}${row('Portion to Principal',Y5.map(()=>td('-')).concat(td('')),'ind ul')}
    ${row('Ending Balance',Y5.map(()=>td(usd(bal))).concat(td('')),'dbl')}</tbody></table>`;
  const cf=`<table class="lv-t lv-yr six"><thead><tr><th></th>${Y5.concat('Year Six').map(y=>`<th>${y}</th>`).join('')}</tr></thead><tbody>
    ${row('Net Operating Income',R.noi.map(v=>td(usd(v))))}${row('First Mortgage Annual Payment',R.debt.payment.map(v=>td(num(v))).concat(td('')),'ul')}
    ${row('Cash Flow after Debt Service',R.cfads.map(v=>td(usd(v))).concat(td('')),'b')}${row('NOI/Key',R.noi.slice(0,5).map(v=>td(usd(Math.round(v/L.rooms)))).concat(td('')))}
    ${row('Debt Yield',R.debtYield.map(v=>td(pct(v))).concat(td('')))}${row('Debt Service Coverage Ratio',R.dscr.map(v=>td(v.toFixed(2))).concat(td('')))}</tbody></table>`;
  const irr=`<table class="lv-t lv-yr six"><thead><tr><th></th><th>Year Zero</th>${Y5.map(y=>`<th>${y}</th>`).join('')}</tr></thead><tbody>
    ${row('Equity',[td('('+n0(eq)+')')].concat(Y5.map(()=>td(''))))}${row('Cash Flow after Debt Service',[td('')].concat(R.cfads.map(v=>td(num(v)))))}
    ${row('Net Sales Price',[td('')].concat(Y5.map((_,i)=>td(i===4?num(S.net):''))))}${row('Remaining Mortgage Balance',[td('')].concat(Y5.map((_,i)=>td(i===4?'('+n0(bal)+')':''))),'ul')}
    ${row('Net Cash Flow',R.netCF.map(v=>td(usd(v))),'b dbl')}${row('Cash-on-Cash Return',[td('')].concat(Y5.map((_,i)=>td(R.coc[i]!=null?pct(R.coc[i]):''))))}</tbody></table>`;
  const gain=`<table class="lv-t lv-cg"><tbody>
    ${row('Sixth Year Net Operating Income',[td(usd(S.noi6))])}${row(S.capLabel,[td(pct(S.cap))],'ul')}${row('Gross Sales Price',[td(usd(S.gross))])}${row('Selling Costs',[td('2.0%')],'ul')}
    ${row('Net Sales Price',[td(usd(S.net))])}${row('Remaining Mortgage Balance',[td(usd(bal))])}${row('Return of Equity',[td(num(eq))],'ul')}${row('',[td('-')])}
    ${row('Capital Gain',[td(usd(S.gain))],'b dbl')}${row('Sales Price per Room',[td(usd(S.perRoom))])}</tbody></table>`;
  return `<div class="lv">
  <div class="lv-main">
    <h6 class="lv-bar">Source and Use of Funds</h6>
    <div class="lv-su"><table class="lv-t lv-use"><thead><tr><th></th><th></th><th></th><th>Per Key</th></tr></thead><tbody>${use}</tbody></table>
      <div><table class="lv-t lv-src"><thead><tr><th></th><th></th><th></th></tr></thead><tbody>${src}</tbody></table>${note}</div></div>
    <div class="lv-su lv-rooms"><table class="lv-t"><tbody><tr class="b"><th scope="row">Number of Rooms</th><td>${L.rooms}</td></tr></tbody></table>
      <div><div class="lv-box lv-dy"><span>YR1 Debt Yield</span><b>${pct(R.debtYield[0])}</b></div></div></div>
    <div class="lv-su lv-mc"><div><table class="lv-t lv-mult"><thead><tr><th>Room Rev. Multiple</th><th>Acquisition</th><th>Total</th></tr></thead><tbody>${mult}</tbody></table>${capT(capL,shadeL)}</div>
      <div class="lv-capr">${capT(capR,shadeR)}</div></div>
    <h6 class="lv-bar">${L.title}</h6>${loan}${sched}
    <h6 class="lv-bar">Yearly Cash Flow Summary</h6>${cf}
    <h6 class="lv-bar">Leveraged IRR Analysis</h6>${irr}
    <div class="lv-box lv-irr"><div class="lv-kv"><span>Five-Year Leveraged IRR</span><b>${pct(R.irr)}</b></div><div class="lv-kv"><span>Equity Multiple</span><b>${R.em}</b></div></div>
  </div>
  <aside class="lv-side"><h6 class="lv-bar">Capital Gain Calculation</h6><div class="lv-shade">${gain}</div></aside>
</div>`;
}
function unlevTables(R){
  const U=R.unlev, yrs=['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven'].map(y=>'Year '+y);
  return `<div class="tbl"><table class="data"><caption>Ten-year unleveraged analysis · net operating income (projected)</caption><thead><tr><th></th>${yrs.map(y=>`<th class="proj">${y}</th>`).join('')}</tr></thead><tbody><tr class="total"><td>Net Operating Income</td>${U.noi.map(v=>`<td class="proj">${usd(v)}</td>`).join('')}</tr></tbody></table></div>
  <div class="g2" style="gap:18px"><div class="tbl"><table class="data simple"><caption>Use of funds</caption><tbody>${R.uses.map((u,i)=>`<tr class="${i===R.uses.length-1?'key':''}"><td>${u[0]}</td><td>${usd(u[1])}</td><td>${usd(u[2])}/key</td></tr>`).join('')}</tbody></table></div>
  <div class="tbl"><table class="data simple"><caption>Residual (sale at end of Year Ten)</caption><tbody><tr><td>Eleventh-year net operating income</td><td>${usd(U.noi[10])}</td></tr><tr><td>${U.capLabel}</td><td>${pct(U.cap)}</td></tr><tr><td>Gross sales price</td><td>${usd(U.gross)}</td></tr><tr><td>Selling costs</td><td>2.0%</td></tr><tr class="total"><td>Net sales price</td><td>${usd(U.net)}</td></tr><tr><td>Return of equity</td><td>${num(R.uses[R.uses.length-1][1])}</td></tr><tr class="key"><td>Capital gain</td><td>${usd(U.gain)}</td></tr><tr><td>Sales price per room</td><td>${usd(U.perRoom)}</td></tr></tbody></table></div></div>
  <div class="tbl"><table class="data"><caption>Net cash flow</caption><thead><tr><th></th><th>Year Zero</th>${yrs.slice(0,10).map(y=>`<th class="proj">${y}</th>`).join('')}</tr></thead><tbody>
  <tr class="key"><td>Net cash flow</td>${U.netCF.map((v,i)=>`<td class="${i?'proj':''}">${usd(v)}</td>`).join('')}</tr>
  <tr><td>Unleveraged cash-on-cash return</td><td></td>${yrs.slice(0,10).map((_,i)=>`<td class="proj">${U.coc[i]!=null?pct(U.coc[i]):''}</td>`).join('')}</tr></tbody></table></div>
  <div class="kp" style="--c:4"><div><b>${pct(U.irr)}</b><span>Ten-year unleveraged IRR</span></div><div><b>${U.em}</b><span>Equity multiple</span></div><div><b>${pct(U.residual)}</b><span>Return from residual</span></div><div><b>${pct(U.cashflow)}</b><span>Return from cash flow</span></div></div>`;
}
const notes=a=>`<div class="notes">${a.map(x=>`<p>${x}</p>`).join('')}</div>`;
function detailFor(key){
  const [t,k]=key.split(':'); const v=k&&V.views[k], R=k&&V.returns[k], scn=v&&v.scenario?KTAG.scn:'';
  switch(t){
    case 'calc': return {eb:`${v.label} · BOV p. ${v.p}`,title:'Cap-rate explorer',tags:KTAG.calc+scn,html:calcHtml(k),after:wireCalc};
    case 'assume': return {eb:`${v.label} · BOV p. ${v.p}`,title:'Key assumptions',tags:scn,html:`<ul class="as">${v.assumptions.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>${notes([esc(V.sensNote)])}`};
    case 'sens': return {eb:`${v.label} · BOV p. ${v.p}`,title:'All-in price sensitivity',tags:scn,html:`<div class="tbl"><table class="data"><thead><tr>${v.sensHeads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${v.sens.map((s,i)=>`<tr${i===2?' class="key"':''}><td>${usd(s[0])}</td><td>${usd(s[1])}</td><td>${pct(s[2])}</td><td>${pct(s[3])}</td></tr>`).join('')}<tr><td>Net operating income</td><td></td><td>${usd(v.sensNOI[0])}</td><td>${usd(v.sensNOI[1])}</td></tr></tbody></table></div>${notes([esc(V.sensNote)])}`};
    case 'lev': return {eb:`${v.label} · BOV p. ${R.p[0]}`,title:'Projected leveraged return analysis · 5 years',tags:KTAG.proj+scn,html:levTables(R,k)+notes([esc(V.disclaimer)])};
    case 'unlev': return {eb:`${v.label} · BOV p. ${R.p[1]}`,title:'Projected unleveraged return analysis · 10 years',tags:KTAG.proj+scn,html:unlevTables(R)+notes([esc(V.disclaimer)])};
    case 'cfh': return {eb:`${v.label} · BOV p. ${T.cf[k].historical.page}`,title:'Historical cash flow summary',tags:KTAG.hist+KTAG.forecast+scn,html:cfTable(T.cf[k].historical,`${v.sub} · years ended Dec. 31, 2022–2025, T-12 ended Aug. 31, 2026, and forecast year ending Dec. 31, 2026`)+notes(V.cfFootnotes.map(esc).concat(k==='portfolio'||k==='hyatt'?['Non-operating income (shown negative within fixed charges) reflects lease income, including the Perla Baking Co. lease at the Hyatt Place.']:[]))};
    case 'cfp': return {eb:`${v.label} · BOV p. ${T.cf[k].projected.page}`,title:`Projected cash flow summary${v.scenario?' · conversion to Tribute Portfolio':''}`,tags:KTAG.proj+scn,html:cfTable(T.cf[k].projected,`${v.sub} · projected Year One (2027) to Year Five (2031)`,{portfolio:0,hyatt:0,tribute:1}[k])+notes([(k==='hyatt'||k==='portfolio'?'Year One (2027) is a renovation year at the Hyatt Place. ':'')+(v.scenario?'Year Two (2028) reflects conversion displacement. ':'')+esc(V.disclaimer)])};
    case 'pen': return {eb:`${v.label} · BOV p. ${T.pen.pages[k]}`,title:'Historical & projected penetration analysis',tags:KTAG.hist+KTAG.forecast+KTAG.proj,html:penTable(k)+compsetHtml(k)+notes(V.penFootnotes.map(esc))};
    case 'sub': return {eb:'Fort Walton Beach submarket · BOV p. 59',title:'Submarket performance, 2000 – TTM Sep 2026',tags:KTAG.hist,html:(()=>{ const row=r=>`<tr><td>${r[0]}</td>${r.slice(1).map((x,i)=>i%2===1?`<td class="r">${x==null?'•••':pct(x)}</td>`:`<td>${i===0?pct(x):i===2||i===4?usd2(x):n0(x)}</td>`).join('')}</tr>`;
      return `<div class="tbl"><table class="data"><thead><tr><th>Year</th>${SM.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${SM.rows.map(row).join('')}<tr class="sec"><td colspan="11">Year to date</td></tr>${SM.ytd.map(row).join('')}</tbody></table></div>
      <div class="tbl"><table class="data simple"><thead><tr>${SM.cagrHeads.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${SM.cagr.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map(x=>`<td>${pct(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${notes(['The BOV does not name the data provider for this exhibit.'])}`; })()};
    case 'supply': return {eb:'South Walton / Destin new supply · BOV p. 60',title:'Pipeline projects',tags:'',html:`<div class="tbl"><table class="data"><thead><tr><th>Property</th><th>Keys</th><th class="l">Status</th><th class="l">Address</th><th>Drive distance (mi)</th></tr></thead><tbody>${SP.rows.map(r=>`<tr class="${/MOXY/.test(r[0])?'hl':''}"><td>${esc(r[0])}</td><td>${r[1]}</td><td class="l">${r[2]}</td><td class="l">${esc(r[3])}</td><td>${r[4].toFixed(1)}</td></tr>`).join('')}</tbody></table></div>${notes(['MOXY Destin (highlighted) is controlled by Howard Group and not expected to open soon (BOV p. 60).'])}`};
  }
}
const dlg=$('#detail'); let dOpener=null;
function openDetail(o,opener){ dOpener=opener||document.activeElement; $('#dEb').textContent=o.eb; $('#dTitle').textContent=o.title; $('#dTags').innerHTML=o.tags||''; const b=$('#dBody'); b.innerHTML=o.html; b.scrollTop=0;
  $$('input[data-ratio]',b).forEach(cb=>{ cb.checked=true; cb.addEventListener('change',()=>setRatio($('#'+cb.dataset.ratio,b),cb.checked)); });
  dlg.showModal(); $('#dClose').focus(); if(o.after) o.after(b); }
$('#dClose').onclick=()=>dlg.close();
dlg.addEventListener('close',()=>{ if(dOpener&&dOpener.focus) dOpener.focus(); });
dlg.addEventListener('click',e=>{ if(e.target===dlg) dlg.close(); });
document.addEventListener('click',e=>{ const b=e.target.closest('[data-detail]'); if(!b||b.closest('#detail')) return; const o=detailFor(b.dataset.detail); if(o) openDetail(o,b); });

/* ================= lightbox ================= */
const LB={list:[],i:0,dlg:$('#lb'),opener:null};
function lbShow(){ const it=LB.list[LB.i], im=$('#lbImg'); im.src=it.src; const hd=hdSrc(it.src); if(hd!==it.src){ const pre=new Image(); pre.onload=()=>{ if(LB.list[LB.i]===it) im.src=hd; }; pre.src=hd; } $('#lbImg').alt=it.cap||''; $('#lbCap').textContent=it.cap||''; $('#lbCount').textContent=`${LB.i+1} / ${LB.list.length}`; const many=LB.list.length>1; $('#lbPrev').hidden=!many; $('#lbNext').hidden=!many; }
function lbOpen(list,i,opener){ LB.list=list; LB.i=i; LB.opener=opener; lbShow(); LB.dlg.showModal(); $('#lbClose').focus(); }
$('#lbClose').onclick=()=>LB.dlg.close();
$('#lbPrev').onclick=()=>{ LB.i=(LB.i-1+LB.list.length)%LB.list.length; lbShow(); };
$('#lbNext').onclick=()=>{ LB.i=(LB.i+1)%LB.list.length; lbShow(); };
LB.dlg.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'){e.preventDefault(); $('#lbPrev').click();} if(e.key==='ArrowRight'){e.preventDefault(); $('#lbNext').click();} });
LB.dlg.addEventListener('click',e=>{ if(e.target===LB.dlg||e.target.classList.contains('stg')) LB.dlg.close(); });
LB.dlg.addEventListener('close',()=>{ if(LB.opener) LB.opener.focus(); });
(function(){ let x0=null; LB.dlg.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true}); LB.dlg.addEventListener('touchend',e=>{ if(x0==null) return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) (dx<0?$('#lbNext'):$('#lbPrev')).click(); x0=null; }); })();


/* ================= photo viewer: every slide photograph opens full-size, with a short caption ================= */
const HD=new Set(); fetch('assets/img/hd/manifest.json').then(r=>r.json()).then(a=>a.forEach(n=>HD.add(n))).catch(()=>{});
function hdSrc(src){ let m=src.match(/assets\/img\/([a-z0-9-]+?)(?:-t)?\.jpg/); if(m&&HD.has(m[1])) return `assets/img/hd/${m[1]}.jpg`;
  m=src.match(/assets\/d05\/tx\/([a-z0-9-]+)\.jpg/); if(m&&HD.has('tx/'+m[1])) return `assets/img/hd/tx/${m[1]}.jpg`;
  m=src.match(/assets\/d05\/(airport-\d)\.jpg/); if(m&&HD.has(m[1])) return `assets/img/hd/${m[1]}.jpg`; return src; }
const PHOTO_CAP={
  'hwe-intro':['Hyatt Place Sandestin at Grand Boulevard','The lobby workspace and gallery wall.'],
  'chapter-hwe':['Residence Inn Sandestin at Grand Boulevard','The guest lounge and common area.'],
  'chapter-strategy':['Hyatt Place Sandestin at Grand Boulevard','The dining and breakfast area.'],
  'chapter-valuation':['Hyatt Place Sandestin at Grand Boulevard','The lobby and guest lounge.'],
  'chapter-market':['Sandestin, Miramar Beach','The resort community around Grand Boulevard.'],
  'strategy-boulevard':['Grand Boulevard','The open-air lifestyle center the three hotels sit within.'],
  'strategy-aerial':['Destin & South Walton','The Emerald Coast shoreline from above.'],
  'highlight-boulevard':['Residence Inn Sandestin at Grand Boulevard','The hotel exterior at night.'],
  'highlight-performance':['Residence Inn Sandestin at Grand Boulevard','A suite living room.'],
  'highlight-market':['Miramar Beach','The white-sand Gulf beaches near Grand Boulevard.'],
  'references-boulevard':['Grand Boulevard','The shaded retail arcade.'],
  'market-panorama':['Sandestin / South Walton','The coastline from above.'],
  'market-overview':['Miramar Beach','The beachfront and dining district.'],
  'market-tourism':['South Walton','The coastline at sunset.'],
  'market-submarket':['Destin / Fort Walton Beach','The submarket around the hotels.'],
  'market-supply':['Fort Walton Beach area','Part of the Destin / Fort Walton Beach lodging market.'],
  'closing-sunset':['Fort Walton Beach','Sunset over the Emerald Coast.'],
  'fest-songwriters':['30A Songwriters Festival','One of the events on Grand Boulevard’s year-round calendar.'],
  'fest-winefood':['South Walton Beaches Wine & Food Festival','One of the events on Grand Boulevard’s year-round calendar.']};
const PHOTO_SEL='.s .ph-r,.s .ph-l,.s .ph-b,.s .ph-box,.s .tour-ph';
function photoOpen(box){ if(box.classList.contains('tour-sky')) box=box.querySelector('.tour-ph')||box; const img=box.querySelector('img'); if(!img) return;
  const src=img.getAttribute('src'), name=(src.match(/([a-z0-9-]+?)(?:-t)?\.jpg$/)||[])[1], c=PHOTO_CAP[name], slide=box.closest('.s'), n=SC.findIndex(x=>x.el===slide)+1;
  const cap=(c?`${c[0]} — ${c[1]}`:(img.alt||'Photograph'))+(n?` · BOV p. ${n}`:'');
  lbOpen([{src,cap}],0,box); }
function photoBind(){ $$(PHOTO_SEL).forEach(b=>{ if(b.dataset.zoom||b.closest('.tour-sky')&&!b.classList.contains('tour-ph')) return; const img=b.querySelector('img'); if(!img) return;
    b.dataset.zoom='1'; b.classList.add('zoomable'); b.tabIndex=0; b.setAttribute('role','button'); b.setAttribute('aria-label','Enlarge photo'+(img.alt?': '+img.alt:''));
    const z=document.createElement('span'); z.className='zoomb'; z.setAttribute('aria-hidden','true'); z.innerHTML='<svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 5V1h4M13 9v4H9M1 1l4.5 4.5M13 13 8.5 8.5" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>View'; b.appendChild(z); }); }
document.addEventListener('click',e=>{ const b=e.target.closest('.zoomable'); if(b&&!e.target.closest('a,button:not(.zoomable),[data-detail]')) photoOpen(b); });
document.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('zoomable')){ e.preventDefault(); photoOpen(e.target); } });

/* ================= stat numbers tally up when their slide opens ================= */
const TALLY_SEL='.nb .big,.nb .mid,.nb.gbs .tv,.nb.tile .tv,.cv-num,.rec .n b,.recent .rp,.tstat b,.vm-row b,.bt-l b';
function tally(el){ if(!motionOn()) return; $$(TALLY_SEL,el).forEach(n=>{ if(n._raf) cancelAnimationFrame(n._raf);
    if(n.dataset.fin==null){ n.dataset.fin=n.innerHTML; if(!n.getAttribute('aria-label')) n.setAttribute('aria-label',n.textContent.trim()); }
    const fin=n.dataset.fin, parts=fin.split(/(<[^>]+>|&[a-z#0-9]+;)/), RE=/\d[\d,]*(?:\.\d+)?/g;
    if(!parts.some((p,i)=>i%2===0&&RE.test(p))){ return; }
    const fmt=(tok,p)=>{ const dec=(tok.split('.')[1]||'').length, v=parseFloat(tok.replace(/,/g,''))*p; const t=v.toFixed(dec); return tok.includes(',')?Number(t).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec}):t; };
    const t0=performance.now()+180, dur=1300;
    const step=now=>{ const k=Math.min(1,Math.max(0,(now-t0)/dur)), p=1-Math.pow(1-k,3);
      n.innerHTML=k>=1?fin:parts.map((x,i)=>i%2?x:x.replace(RE,tok=>fmt(tok,p))).join('');
      if(k<1) n._raf=requestAnimationFrame(step); else n._raf=0; };
    n._raf=requestAnimationFrame(step); }); }

/* ================= tabs helper (roving tabindex, arrow keys) ================= */
function tabs(list,onSelect){
  const btns=$$('[role="tab"]',list);
  const sel=(b,focus)=>{ btns.forEach(x=>{ const on=x===b; x.setAttribute('aria-selected',on); x.tabIndex=on?0:-1; }); if(focus) b.focus(); onSelect(b.dataset.key,b); };
  btns.forEach((b,i)=>{ b.addEventListener('click',()=>sel(b));
    b.addEventListener('keydown',e=>{ let j=null; const vert=list.getAttribute('aria-orientation')==='vertical';
      if(e.key===(vert?'ArrowDown':'ArrowRight')) j=(i+1)%btns.length; if(e.key===(vert?'ArrowUp':'ArrowLeft')) j=(i-1+btns.length)%btns.length;
      if(e.key==='Home') j=0; if(e.key==='End') j=btns.length-1; if(j!=null){ e.preventDefault(); e.stopPropagation(); sel(btns[j],true);} }); });
  return { select:key=>{ const b=btns.find(x=>x.dataset.key===key); if(b) sel(b); } };
}

/* ================= downloads (local link, or the artifact viewer's save prompt) ================= */
function wireDownloads(el){
  const status=$('#dlStatus',el); let cap; const getCap=()=>{ if(cap!==undefined) return Promise.resolve(cap);
    if(!(window.claude&&typeof window.claude.use==='function')) return Promise.resolve(cap=null);
    return Promise.race([window.claude.use('downloads'),new Promise(r=>setTimeout(()=>r(null),4000))]).then(c=>cap=c||null).catch(()=>cap=null); };
  // hide files this host does not serve (the 29 MB complete file is omitted from size-limited hosting)
  DL.forEach((d,i)=>{ if(location.protocol==='file:') return; fetch(d.f,{method:'HEAD'}).then(r=>{ if(!r.ok) $(`[data-dl="${i}"]`,el).hidden=true; }).catch(()=>{}); });
  el.addEventListener('click',async e=>{ const a=e.target.closest('[data-dl]'); if(!a) return; const d=DL[+a.dataset.dl];
    if(!(window.claude&&typeof window.claude.use==='function')) return; // plain browser: let the link download
    e.preventDefault(); status.textContent='Preparing '+d.name+'…';
    const c=await getCap(); if(!c){ status.textContent='Downloads are not available in this view. Ask your HWE contact for the PDF.'; return; }
    try{ const r=await fetch(d.f); if(!r.ok) throw new Error('missing'); const blob=await r.blob(); await c.save({filename:d.name,data:blob}); status.textContent='Saved '+d.name+'.'; }
    catch(err){ status.textContent=err&&err.code==='declined'?'Download cancelled.':(err&&err.code==='rate_limited'?'Another download prompt is open. Try again in a moment.':'This file could not be downloaded here.'); } });
}

/* ================= engine ================= */
const deck=$('#deck'), N=SC.length;
const rh=(s,i)=>(s.cls||'').match(/\b(div|cover|contents|pg|dv)\b/)?'':`<div class="rh" aria-hidden="true"><span class="lg"><img src="assets/logos/${/dark|deep|photo/.test(s.cls)?'hwe-white':'hwe-navy'}.png" alt="" width="46" height="18"></span><span class="r">${s.ch?`${CH[s.ch].n} · ${CH[s.ch].t}`:'Grand Boulevard Portfolio'}<b>${String(i+1).padStart(2,'0')}</b></span></div>`;
SC.forEach((s,i)=>{ const el=document.createElement('section'); el.className='s '+(s.cls||''); el.id=s.id; el.tabIndex=-1;
  el.setAttribute('aria-roledescription','slide'); el.setAttribute('aria-label',`${i+1} of ${N}: ${s.title.replace(/<[^>]+>/g,'')}`);
  el.innerHTML=rh(s,i)+s.html+(FLAGS[s.id]?`<aside class="flag"><b>Review note</b><span>${esc(FLAGS[s.id])}</span></aside>`:'');
  el.inert=true; el.setAttribute('aria-hidden','true'); deck.appendChild(el); s.el=el; });

let cur=-1, fresh=true;
function motionOn(){ return !RM.matches; }
function go(i,opt={}){
  i=Math.max(0,Math.min(N-1,i)); if(i===cur) return; const dir=(cur<0||i>cur)?'fwd':'back'; const prev=SC[cur], next=SC[i];
  const focusIn=prev&&prev.el.contains(document.activeElement);
  if(prev){ const p=prev.el; p.classList.remove('on'); p.classList.add('leaving'); p.dataset.exit=dir; p.inert=true; p.setAttribute('aria-hidden','true'); if(p._close) p._close(); setTimeout(()=>p.classList.remove('leaving'),900); }
  const el=next.el; el.classList.add('go-now'); el.dataset.enter=opt.instant?'none':dir; el.classList.remove('leaving');
  if(!next.inited){ next.inited=true; try{ next.init&&next.init(el); }catch(err){ console.error('scene init',next.id,err); } }
  void el.offsetWidth; el.classList.remove('go-now'); el.classList.add('on'); el.inert=false; el.removeAttribute('aria-hidden'); tally(el); if(!el._zoomed){ el._zoomed=1; photoBind(); }
  if(root.classList.contains('flow')) el.scrollTop=0;
  cur=i;
  if(location.hash.slice(1)!==next.id) history.replaceState(null,'','#'+next.id);
  $('#count').textContent=`${i+1} / ${N}`; $('#bar').style.width=((i+1)/N*100)+'%';
  $('#chapLbl').textContent=next.ch?CH[next.ch].t:'Hotel Portfolio at Grand Boulevard';
  $('#prev').disabled=i===0; $('#next').disabled=i===N-1;
  $('#sr').textContent=`Slide ${i+1} of ${N}: ${next.title}`;
  if(focusIn||opt.focus) el.focus({preventScroll:true});
  Charts.hideTip&&Charts.hideTip();
  if(!fresh) hideHint(); fresh=false;
  document.title=(i?next.title.replace(/<[^>]+>/g,'')+' · ':'')+'Grand Boulevard Hotel Portfolio';
}
const next=()=>go(cur+1), prev=()=>go(cur-1);
const byId=id=>SC.findIndex(s=>s.id===id);
function fromHash(){ const h=decodeURIComponent(location.hash.slice(1)); if(!h) return 0; if(/^\d+$/.test(h)) return Math.min(N,Math.max(1,+h))-1; const i=byId(h); return i<0?0:i; }
addEventListener('hashchange',()=>{ const i=fromHash(); if(i!==cur) go(i); });
$('#prev').onclick=prev; $('#next').onclick=next;

/* in-scene links: roadmap, hotel cards, "see valuation" */
deck.addEventListener('click',e=>{ const g=e.target.closest('[data-go]'); if(g){ e.preventDefault(); const i=byId(g.dataset.go); if(i>=0){ go(i,{focus:true}); if(g.dataset.view){ const s=SC[i]; s.el._tabs&&s.el._tabs.select(g.dataset.view);} } return; }
  const c=e.target.closest('[data-prop]'); if(c){ const i=byId('properties'); go(i,{focus:true}); SC[i].el._tabs.select(c.dataset.prop); } });

/* keyboard */
const typing=t=>t&&(t.closest('input,textarea,select,[contenteditable="true"]'));
document.addEventListener('keydown',e=>{
  if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.altKey) return;
  if($('dialog[open]')) return;
  const t=e.target&&e.target.nodeType===1?e.target:document.body; if(typing(t)) return;
  const inTabs=t.closest&&t.closest('[role=tablist]');
  switch(e.key){
    case 'ArrowRight': case 'PageDown': if(inTabs) return; e.preventDefault(); next(); break;
    case 'ArrowLeft': case 'PageUp': if(inTabs) return; e.preventDefault(); prev(); break;
    case ' ': if(t.closest('button,a,summary')) return; e.preventDefault(); e.shiftKey?prev():next(); break;
    case 'Home': if(inTabs) return; e.preventDefault(); go(0); break;
    case 'End': if(inTabs) return; e.preventDefault(); go(N-1); break;
    case 'g': case 'G': e.preventDefault(); openOv(); break;
    case 'f': case 'F': if(document.fullscreenEnabled){ e.preventDefault(); toggleFs(); } break;
  }
});

/* touch swipe (horizontal only; tables, sliders and tab strips keep their own gestures) */
(function(){ let s=null;
  deck.addEventListener('touchstart',e=>{ if(e.touches.length!==1){ s=null; return; } const t=e.target; if(t.closest('.tbl,.range,input,.tabs,.chart')){ s=null; return; } s={x:e.touches[0].clientX,y:e.touches[0].clientY,t:Date.now()}; },{passive:true});
  deck.addEventListener('touchend',e=>{ if(!s) return; const dx=e.changedTouches[0].clientX-s.x, dy=e.changedTouches[0].clientY-s.y;
    if(Date.now()-s.t<800&&Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.6) (dx<0?next:prev)(); s=null; },{passive:true}); })();

/* fit: scaled 1600×900 stage when there is room, otherwise reflowing scenes */
function fit(){ const W=innerWidth, H=innerHeight, k=Math.min(W/1600,H/900);
  const stage=k>=0.6&&W/H>=1.2; root.classList.toggle('stage',stage); root.classList.toggle('flow',!stage); root.style.setProperty('--k',k.toFixed(4)); }
addEventListener('resize',fit);
function setMotion(){ root.classList.toggle('motion',motionOn()); }
RM.addEventListener&&RM.addEventListener('change',setMotion);

/* subtle pointer parallax on photographic scenes (desktop, motion allowed) */
(function(){ let raf=0, mx=0, my=0;
  deck.addEventListener('mousemove',e=>{ if(!motionOn()||!root.classList.contains('stage')) return; const s=SC[cur]; if(!s||!/photo|div|cover/.test(s.cls)) return;
    mx=(e.clientX/innerWidth-.5)*-14; my=(e.clientY/innerHeight-.5)*-10;
    if(!raf) raf=requestAnimationFrame(()=>{ raf=0; $$('.px',SC[cur].el).forEach(img=>{ img.style.setProperty('--mx',mx.toFixed(1)+'px'); img.style.setProperty('--my',my.toFixed(1)+'px'); }); }); }); })();

/* overview (all slides) */
const ov=$('#ov');
function buildOv(){ let h=''; CH.forEach((c,ci)=>{ const items=SC.map((s,i)=>[s,i]).filter(([s])=>s.ch===ci); if(!items.length) return;
  h+=`<p class="ch">${c.n?c.n+' · ':''}${esc(c.t)}${c.scn?' · alternative scenario':''}</p><div class="grid">`+items.map(([s,i])=>`<button class="th" type="button" data-i="${i}"><span class="t"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="h">${esc(s.title.replace(/<[^>]+>/g,''))}</span>${s.scn||s.ch===6?'<br><span class="tag scn">Scenario</span>':''}</span></button>`).join('')+'</div>'; });
  $('#ovBody').innerHTML=h; }
function openOv(){ if(!$('#ovBody').childElementCount) buildOv(); $$('#ov .th').forEach(b=>b.setAttribute('aria-current',+b.dataset.i===cur?'true':'false')); ov.showModal(); const c=$(`#ov .th[data-i="${cur}"]`); (c||$('#ovClose')).focus(); c&&c.scrollIntoView({block:'center'}); }
$('#ovBtn').onclick=openOv; $('#ovClose').onclick=()=>ov.close();
ov.addEventListener('click',e=>{ const b=e.target.closest('.th'); if(b){ ov.close(); go(+b.dataset.i,{focus:true}); } });
document.addEventListener('click',e=>{ if(e.target.closest('#ovBtn2')) openOv(); });
if($('#reviewTgl')) $('#reviewTgl').addEventListener('change',e=>root.classList.toggle('review',e.target.checked));

/* full screen */
function toggleFs(){ if(document.fullscreenElement) document.exitFullscreen().catch(()=>{}); else root.requestFullscreen().catch(()=>{ $('#fsBtn').hidden=true; }); }
if(document.fullscreenEnabled){ $('#fsBtn').hidden=false; $('#fsBtn').onclick=toggleFs;
  document.addEventListener('fullscreenchange',()=>{ $('#fsBtn').firstChild.textContent=document.fullscreenElement?'Exit full screen':'Full screen'; }); }

/* first-run hint */
let hintT=setTimeout(hideHint,6000);
function hideHint(){ clearTimeout(hintT); $('#hint').classList.add('off'); }
if('ontouchstart' in window) $('#hint').textContent='Swipe or use the arrows to move · Slides for the full list';

/* boot */
fit(); setMotion();
go(fromHash(),{instant:true});
/* presentation mode (?present): a title screen whose Start button enters full screen at slide 1 */
if(new URLSearchParams(location.search).has('present')){
  const p=document.createElement('div'); p.id='present'; p.setAttribute('role','dialog'); p.setAttribute('aria-label','Start presentation');
  p.innerHTML=`<div class="pr-in"><img src="assets/logos/hwe-white.png" alt="Hodges Ward Elliott" class="pr-hwe"><p class="pr-k">Broker’s Opinion of Value · November 2026</p>
    <h1>Hotel Portfolio at Grand Boulevard Sandestin</h1><p class="pr-s">Courtyard · Residence Inn · Hyatt Place · Prepared for Howard Group</p>
    <button type="button" class="pr-go">Start presentation <span aria-hidden="true">→</span></button>
    <p class="pr-h">Full screen · ← → or click Next to move · G for all slides · Esc to exit full screen</p></div>`;
  document.body.appendChild(p); const b=$('.pr-go',p); b.focus();
  b.addEventListener('click',()=>{ (root.requestFullscreen?root.requestFullscreen():Promise.reject()).catch(()=>{}); go(0,{instant:true}); p.classList.add('out'); setTimeout(()=>p.remove(),600); });
}
window.DECK={go,scenes:SC.map(s=>s.id),get current(){return cur;}};
})();
