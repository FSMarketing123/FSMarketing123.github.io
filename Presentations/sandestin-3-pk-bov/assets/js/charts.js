/* Minimal native-SVG chart kit for the BOV site (no dependencies).
   Every chart: responsive (ResizeObserver), hover + keyboard tooltips,
   historical / forecast / projected periods encoded by fill + texture + band labels. */
(function(){
  const NS='http://www.w3.org/2000/svg';
  const tip=()=>document.getElementById('tip');
  const el=(t,a={},p)=>{const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p) p.appendChild(e); return e;};
  const KIND_LABEL={hist:'Historical',forecast:'Forecast',proj:'Projected'};
  function showTip(html,x,y){const t=tip(); t.innerHTML=html; t.classList.add('on');
    const w=t.offsetWidth,h=t.offsetHeight, vw=document.documentElement.clientWidth;
    let left=x+14, top=y-h-12; if(left+w>vw-8) left=x-w-14; if(left<8) left=8; if(top<8) top=y+18;
    t.style.left=left+'px'; t.style.top=top+'px';}
  function hideTip(){tip().classList.remove('on');}
  /* viewport coordinates; the tooltip is position:fixed (works inside scaled / scrolling containers) */
  function pagePos(evt,node){ if(evt&&evt.clientX!=null&&evt.type!=='focus') return [evt.clientX,evt.clientY];
    const r=node.getBoundingClientRect(); return [r.left+r.width/2, r.top+20]; }
  function niceMax(v){ if(v<=0) return 1; const e=Math.pow(10,Math.floor(Math.log10(v))); const n=v/e; return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*e; }
  function ticks(max,n=4){ const s=niceMax(max/n); const out=[]; for(let v=0; v<=max+1e-9; v+=s) out.push(+v.toFixed(10)); return out; }
  function mount(host,draw){ const run=()=>{ host.innerHTML=''; draw(Math.max(280,host.clientWidth)); };
    run(); if('ResizeObserver' in window){ let w=host.clientWidth; new ResizeObserver(()=>{ if(Math.abs(host.clientWidth-w)>4){ w=host.clientWidth; run(); } }).observe(host);} }
  function defs(svg,color,id){ const d=el('defs',{},svg); const p=el('pattern',{id,width:6,height:6,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},d);
    el('rect',{width:6,height:6,fill:'#fff'},p); el('rect',{width:2.4,height:6,fill:color},p); return `url(#${id})`; }
  function bands(g,kinds,x0,bw,top,bottom){ // shaded period bands with labels
    let i=0; while(i<kinds.length){ const k=kinds[i]; let j=i; while(j+1<kinds.length&&kinds[j+1]===k) j++;
      if(k!=='hist'){ el('rect',{x:x0(i),y:top,width:x0(j)+bw-x0(i),height:bottom-top,fill:k==='forecast'?'#FFF8E6':'#F2F8E8'},g);
        if(x0(j)+bw-x0(i)<78){ i=j+1; continue; }
        const t=el('text',{x:x0(i)+6,y:top+14,'font-size':11,'font-weight':600,'letter-spacing':'.12em',fill:k==='forecast'?'#7A5A00':'#3E7300'},g); t.textContent=(KIND_LABEL[k]).toUpperCase(); }
      i=j+1; } }

  /* grouped bar chart */
  function bar(host,o){ mount(host,W=>{
    const rot=o.rotate||((W-66)/o.cats.length<58 && o.cats.some(c=>c.length>4)); o=Object.assign({},o,{rotate:rot});
    const H=o.height||300, m={t:24,r:8,b:o.rotate?62:34,l:o.yw||58}; const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.label||''},host);
    const n=o.cats.length, gw=iw/n, ns=o.series.length, pad=Math.min(.36,0.18+0.05*ns), bw=(gw*(1-pad))/ns;
    const all=o.series.flatMap(s=>s.values).filter(v=>v!=null); const max=niceMax(Math.max(...all)*1.05); const tk=ticks(max,4);
    const y=v=>m.t+ih-(v/max)*ih; const gx=i=>m.l+i*gw;
    const g=el('g',{},svg);
    if(o.kinds) bands(g,o.kinds,gx,gw,m.t-4,m.t+ih);
    const gr=el('g',{class:'grid'},svg); tk.forEach(v=>{ el('line',{x1:m.l,x2:W-m.r,y1:y(v),y2:y(v)},gr); });
    const ax=el('g',{class:'axis'},svg); tk.forEach(v=>{ const t=el('text',{x:m.l-8,y:y(v)+4,'text-anchor':'end'},ax); t.textContent=o.yFmt(v); });
    o.cats.forEach((c,i)=>{ const t=el('text',{x:gx(i)+gw/2,y:H-m.b+18,'text-anchor':o.rotate?'end':'middle',transform:o.rotate?`rotate(-38 ${gx(i)+gw/2} ${H-m.b+18})`:''},ax); t.textContent=c; });
    const pats=o.series.map((s,si)=>defs(svg,s.color,'h'+Math.random().toString(36).slice(2)));
    o.series.forEach((s,si)=>{ s.values.forEach((v,i)=>{ if(v==null) return; const k=o.kinds?o.kinds[i]:'hist';
      const x=gx(i)+gw*pad/2+si*bw, h=Math.max(1,y(0)-y(v)), r=Math.min(4,bw/2);
      const fill=k==='forecast'?pats[si]:(k==='proj'?(s.light||'#B8D98A'):s.color);
      const p=el('path',{d:`M${x+1},${y(0)} V${y(v)+r} q0,-${r} ${r},-${r} H${x+bw-1-r} q${r},0 ${r},${r} V${y(0)} Z`,fill,stroke:k==='hist'?'none':s.color,'stroke-width':k==='hist'?0:1.2,class:'bar-v',style:`--i:${i*ns+si}`},svg);
      if(o.labels&&o.labels(i,si)) { const t=el('text',{x:x+bw/2,y:y(v)-6,'text-anchor':'middle','font-size':11,'font-weight':600,fill:'#3C4360'},svg); t.textContent=o.fmt(v); }
    }); });
    el('line',{x1:m.l,x2:W-m.r,y1:y(0),y2:y(0),stroke:'#9AA0AE'},svg);
    o.cats.forEach((c,i)=>{ const hit=el('rect',{class:'hit',x:gx(i),y:m.t-4,width:gw,height:ih+4,tabindex:0,role:'img'},svg);
      const k=o.kinds?o.kinds[i]:'hist';
      const html=`<span class="k">${c}${o.kinds?' · '+KIND_LABEL[k]:''}</span>`+o.series.map(s=>`<div class="row"><span><i style="background:${s.color}"></i>${s.name}</span><b>${s.values[i]==null?'—':o.fmt(s.values[i])}</b></div>`).join('')+(o.note?`<div style="opacity:.7;margin-top:4px">${o.note(i)||''}</div>`:'');
      hit.setAttribute('aria-label',`${c}${o.kinds?' ('+KIND_LABEL[k]+')':''}: `+o.series.map(s=>`${s.name} ${s.values[i]==null?'n/a':o.fmt(s.values[i])}`).join(', '));
      const on=e=>{ hit.style.fill='rgba(35,44,100,.05)'; const [px,py]=pagePos(e,hit); showTip(html,px,py); };
      hit.addEventListener('mousemove',on); hit.addEventListener('focus',on);
      hit.addEventListener('mouseleave',()=>{hit.style.fill=''; hideTip();}); hit.addEventListener('blur',()=>{hit.style.fill=''; hideTip();});
    });
  }); }

  /* line chart with crosshair */
  function line(host,o){ mount(host,W=>{
    const H=o.height||300, m={t:24,r:12,b:o.rotate?58:34,l:o.yw||58}; const iw=W-m.l-m.r, ih=H-m.t-m.b;
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.label||''},host);
    const n=o.cats.length, step=iw/Math.max(1,n-1), gw=iw/n;
    const all=o.series.flatMap(s=>s.values).filter(v=>v!=null);
    let lo=o.min!=null?o.min:Math.min(...all), hi=Math.max(...all);
    const span=niceMax((hi-lo)/4); lo=Math.floor((lo-span*.25)/span)*span; if(o.min!=null) lo=o.min; hi=Math.ceil((hi+span*.15)/span)*span;
    const y=v=>m.t+ih-(v-lo)/(hi-lo)*ih; const x=i=>m.l+(n===1?iw/2:i*step);
    if(o.kinds){ const g=el('g',{},svg); bands(g,o.kinds,i=>x(i)-(i===0?0:step/2),step,m.t-4,m.t+ih); }
    const gr=el('g',{class:'grid'},svg), ax=el('g',{class:'axis'},svg);
    for(let v=lo; v<=hi+1e-9; v+=span){ el('line',{x1:m.l,x2:W-m.r,y1:y(v),y2:y(v)},gr); const t=el('text',{x:m.l-8,y:y(v)+4,'text-anchor':'end'},ax); t.textContent=o.yFmt(v); }
    const every=Math.ceil(n/(W/(o.rotate?36:64)));
    o.cats.forEach((c,i)=>{ if(i%every&&i!==n-1) return; const t=el('text',{x:x(i),y:H-m.b+18,'text-anchor':o.rotate?'end':'middle',transform:o.rotate?`rotate(-38 ${x(i)} ${H-m.b+18})`:''},ax); t.textContent=c; });
    o.series.forEach(s=>{ let d='',dd=''; s.values.forEach((v,i)=>{ if(v==null) return; const k=o.kinds?o.kinds[i]:'hist';
        const seg=(k==='hist')?'d':'dd'; });
      // solid for hist, dashed for forecast/proj; join at boundary
      const pts=s.values.map((v,i)=>v==null?null:[x(i),y(v),o.kinds?o.kinds[i]:'hist']);
      let solid='',dash=''; pts.forEach((p,i)=>{ if(!p) return; const prev=pts[i-1];
        if(p[2]==='hist'){ solid+=(prev&&prev[2]==='hist'?'L':'M')+p[0]+','+p[1]; }
        else { dash+=(prev?('M'+prev[0]+','+prev[1]+'L'):'M')+p[0]+','+p[1]; } });
      if(solid) el('path',{d:solid,fill:'none',stroke:s.color,'stroke-width':2.2,'stroke-linejoin':'round'},svg);
      if(dash) el('path',{d:dash,fill:'none',stroke:s.color,'stroke-width':2.2,'stroke-dasharray':'5 4'},svg);
      pts.forEach((p,i)=>{ if(!p) return; if(n<=16||i===n-1) el('circle',{cx:p[0],cy:p[1],r:3.6,fill:p[2]==='hist'?s.color:'#fff',stroke:s.color,'stroke-width':2},svg); });
      if(o.endLabels){ const last=pts.filter(Boolean).pop(); const t=el('text',{x:Math.min(last[0]+6,W-4),y:last[1]-8,'text-anchor':'end','font-size':11.5,'font-weight':600,fill:'#3C4360'},svg); t.textContent=s.name; }
    });
    const cross=el('line',{y1:m.t,y2:m.t+ih,stroke:'#646B83','stroke-dasharray':'2 3',opacity:0},svg);
    o.cats.forEach((c,i)=>{ const hit=el('rect',{class:'hit',x:x(i)-step/2,y:m.t-4,width:step,height:ih+4,tabindex:0,role:'img'},svg);
      const k=o.kinds?o.kinds[i]:'hist';
      const html=`<span class="k">${c}${o.kinds?' · '+KIND_LABEL[k]:''}</span>`+o.series.map(s=>`<div class="row"><span><i style="background:${s.color}"></i>${s.name}</span><b>${s.values[i]==null?'—':o.fmt(s.values[i])}</b></div>`).join('');
      hit.setAttribute('aria-label',`${c}${o.kinds?' ('+KIND_LABEL[k]+')':''}: `+o.series.map(s=>`${s.name} ${s.values[i]==null?'n/a':o.fmt(s.values[i])}`).join(', '));
      const on=e=>{ cross.setAttribute('x1',x(i)); cross.setAttribute('x2',x(i)); cross.setAttribute('opacity',1); const [px,py]=pagePos(e,hit); showTip(html,px,py); };
      const off=()=>{ cross.setAttribute('opacity',0); hideTip(); };
      hit.addEventListener('mousemove',on); hit.addEventListener('focus',on); hit.addEventListener('mouseleave',off); hit.addEventListener('blur',off);
    });
  }); }

  /* donut: segments sweep in one after another when the slide opens; hovering, focusing or selecting
     a segment (or its legend row) lifts it out and shows its share in the centre */
  function donut(host,items,colors,opt={}){ mount(host,()=>{
    const S=200, RM=72, SW=28, C=2*Math.PI*RM, tot=items.reduce((s,i)=>s+i[1],0), GAP=1.6;
    const svg=el('svg',{viewBox:`0 0 ${S} ${S}`,class:'dn',role:'group','aria-label':'Sold deals by buyer type: '+items.map(i=>i[0]+' '+i[1].toFixed(1)+'%').join(', ')},host);
    el('circle',{cx:S/2,cy:S/2,r:RM,fill:'none',stroke:'#EEF0F4','stroke-width':SW},svg);
    const g=el('g',{transform:`rotate(-90 ${S/2} ${S/2})`},svg);
    const ct=el('text',{x:S/2,y:S/2+4,'text-anchor':'middle',class:'dn-v'},svg), cl=el('text',{x:S/2,y:S/2+24,'text-anchor':'middle',class:'dn-l'},svg);
    const label=i=>{ ct.textContent=items[i][1].toFixed(1)+'%'; cl.textContent=items[i][0].replace(/ (owners|firms|investors)$/,'').toUpperCase(); };
    let acc=0, pinned=-1; const segs=[], rows=opt.legend?[...opt.legend.children]:[];
    items.forEach((it,k)=>{ const len=it[1]/tot*C, mid=(acc+len/2)/C*2*Math.PI;
      const c=el('circle',{cx:S/2,cy:S/2,r:RM,fill:'none',stroke:colors[k],'stroke-width':SW,class:'dn-seg hit',tabindex:0,role:'button','aria-label':`${it[0]}: ${it[1].toFixed(1)}%`,
        'stroke-dasharray':`${Math.max(.6,len-GAP)} ${C}`,'stroke-dashoffset':-acc},g);
      c.style.stroke=colors[k]; c.style.setProperty('--len',Math.max(.6,len-GAP)); c.style.setProperty('--d',(0.25+k*0.32)+'s');
      c.style.setProperty('--dx',(Math.cos(mid)*7).toFixed(2)+'px'); c.style.setProperty('--dy',(Math.sin(mid)*7).toFixed(2)+'px');
      segs.push(c); acc+=len; });
    const act=i=>{ segs.forEach((c,k)=>{ c.classList.toggle('on',k===i); c.classList.toggle('dim',i>=0&&k!==i); });
      rows.forEach((r,k)=>{ r.classList.toggle('on',k===i); r.classList.toggle('dim',i>=0&&k!==i); }); label(i>=0?i:0); };
    const enter=(i,e,node)=>{ act(i); const [px,py]=pagePos(e,node); showTip(`<span class="k">Sold deals by buyer type</span><div class="row"><span>${items[i][0]}</span><b>${items[i][1].toFixed(1)}%</b></div>`,px,py); };
    const leave=()=>{ hideTip(); act(pinned); };
    const pick=i=>{ pinned=pinned===i?-1:i; segs.forEach((c,k)=>c.setAttribute('aria-pressed',k===pinned)); act(pinned); };
    segs.forEach((c,i)=>{ c.addEventListener('mousemove',e=>enter(i,e,c)); c.addEventListener('focus',e=>enter(i,e,c)); c.addEventListener('mouseleave',leave); c.addEventListener('blur',leave);
      c.addEventListener('click',()=>pick(i)); c.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(i); } }); });
    rows.forEach((r,i)=>{ r.addEventListener('mouseenter',()=>act(i)); r.addEventListener('mouseleave',()=>act(pinned)); r.addEventListener('click',()=>pick(i)); });
    label(0);
  }); }

  /* horizontal bars */
  function hbar(host,o){ mount(host,W=>{
    const rowH=38, H=o.items.length*rowH+26, lw=Math.min(120,W*.3), m={l:lw,r:56};
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.items.map(i=>i[0]+' '+o.fmt(i[1])).join(', ')},host);
    const max=o.max||niceMax(Math.max(...o.items.map(i=>i[1]))); const x=v=>m.l+(v/max)*(W-m.l-m.r);
    const gr=el('g',{class:'grid'},svg), ax=el('g',{class:'axis'},svg);
    ticks(max,3).forEach(v=>{ el('line',{x1:x(v),x2:x(v),y1:0,y2:H-22},gr); const t=el('text',{x:x(v),y:H-6,'text-anchor':'middle'},ax); t.textContent=o.fmt(v); });
    o.items.forEach((it,i)=>{ const yy=i*rowH+8; const l=el('text',{x:m.l-10,y:yy+15,'text-anchor':'end','font-size':13.5,fill:'#1A1F36'},svg); l.textContent=it[0];
      el('path',{d:`M${m.l},${yy+4} H${x(it[1])-4} q4,0 4,4 V${yy+18} q0,4 -4,4 H${m.l} Z`,fill:o.color,class:'bar-h',style:`--i:${i}`},svg);
      const v=el('text',{x:x(it[1])+8,y:yy+17,'font-size':13,'font-weight':600,fill:'#3C4360',class:'bar-t',style:`--i:${i}`},svg); v.textContent=o.fmt(it[1]); });
  }); }

  /* distance strip: projects by drive distance */
  function dist(host,o){ mount(host,W=>{
    const H=W<560?300:250, m={t:30,r:24,b:40,l:24}; const iw=W-m.l-m.r;
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Pipeline projects by drive distance from Grand Boulevard'},host);
    const max=24, x=d=>m.l+(d/max)*iw, base=H-m.b;
    // competitive market zone (<= 11.4 mi per BOV text) vs outside (18–22 mi)
    el('rect',{x:x(0),y:m.t-10,width:x(12)-x(0),height:base-m.t+10,fill:'#F2F4FA'},svg);
    const zl=el('text',{x:x(0)+8,y:m.t+4,'font-size':11,'font-weight':600,'letter-spacing':'.1em',fill:'#232C64'},svg); zl.textContent=W<700?'COMPETITIVE PIPELINE':'DESTIN · MIRAMAR BEACH · GRAYTON BEACH PIPELINE';
    el('rect',{x:x(17.5),y:m.t-10,width:x(22.6)-x(17.5),height:base-m.t+10,fill:'#F7F7F8'},svg);
    const zl2=el('text',{x:W-m.r,y:m.t+4,'text-anchor':'end','font-size':11,'font-weight':600,'letter-spacing':'.1em',fill:'#646B83'},svg); zl2.textContent=W<700?'OUTSIDE':'FREEPORT · FWB · SHALIMAR — OUTSIDE COMPETITIVE MARKET';
    const ax=el('g',{class:'axis'},svg); el('line',{x1:m.l,x2:W-m.r,y1:base,y2:base,stroke:'#9AA0AE'},svg);
    for(let d=0; d<=max; d+=4){ el('line',{x1:x(d),x2:x(d),y1:base,y2:base+5,stroke:'#9AA0AE'},svg); const t=el('text',{x:x(d),y:base+20,'text-anchor':'middle'},ax); t.textContent=d+' mi'; }
    // origin
    el('circle',{cx:x(0),cy:base,r:7,fill:'#64A70B',stroke:'#fff','stroke-width':2},svg);
    const ol=el('text',{x:x(0)+2,y:base-14,'font-size':11.5,'font-weight':700,fill:'#3E7300'},svg); ol.textContent='Grand Boulevard';
    const stacks={};
    o.rows.forEach((r,i)=>{ const key=r[4].toFixed(1); stacks[key]=(stacks[key]||0)+1; const lvl=stacks[key]-1;
      const rad=4+Math.sqrt(r[1])*0.75; const cy=base-30-lvl*(rad*2+4)-(r[4]<5? (i%2)*18:0); const cx=x(r[4]);
      const c=el('circle',{cx,cy,r:rad,fill:o.colors[r[2]],stroke:'#fff','stroke-width':2,tabindex:0,class:'hit','aria-label':`${r[0]}: ${r[1]} keys, ${r[2]}, ${r[4]} miles, ${r[3]}`},svg); c.style.fill=o.colors[r[2]];
      el('line',{x1:cx,x2:cx,y1:cy+rad,y2:base,stroke:o.colors[r[2]],'stroke-width':1,opacity:.5},svg);
      const on=e=>{const [px,py]=pagePos(e,c); showTip(`<span class="k">${r[4]} mi · ${r[2]}</span><b>${r[0]}</b><div>${r[1]} keys · ${r[3]}</div>`,px,py);};
      c.addEventListener('mousemove',on); c.addEventListener('focus',on); c.addEventListener('mouseleave',hideTip); c.addEventListener('blur',hideTip);
    });
  }); }

  window.Charts={bar,line,donut,hbar,dist,hideTip};
})();
