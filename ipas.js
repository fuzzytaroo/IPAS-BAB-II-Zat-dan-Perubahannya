(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach(e => { if (!e.closest('.hero')) io.observe(e); });

  const loader = $('#loader'), bar = $('#loaderBar'), num = $('#loaderNum');
  let n = 0, finished = false;
  const iv = setInterval(() => {
    n = Math.min(n + Math.random() * 9 + 3, 92);
    bar.style.width = n + '%';
    num.textContent = String(Math.floor(n)).padStart(2, '0');
  }, 100);
  function finish() {
    if (finished) return;
    finished = true; clearInterval(iv);
    bar.style.width = '100%'; num.textContent = '100';
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.classList.remove('is-loading');
      $$('.hero .rv').forEach(e => io.observe(e));
      $('.hero-title').classList.add('in');
    }, 350);
  }
  if (document.readyState === 'complete') finish(); else addEventListener('load', finish);
  setTimeout(finish, 4000);

  const menu = $('#menu'), burger = $('#burger');
  burger.onclick = () => burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
  $$('a', menu).forEach(a => a.onclick = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
  const links = $$('a', menu);
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-35% 0px -55% 0px' });
  $$('main section[id]').forEach(s => so.observe(s));

  $$('.strip-track').forEach(t => t.innerHTML += t.innerHTML);
  const stripAnims = $$('.strip-track').map(t => t.getAnimations()[0]).filter(Boolean);
  const kin = $$('.kin-row').map(el => ({ el, html: el.innerHTML, w: 1, x: 0, d: el.dataset.dir === 'r' ? 1 : -1 }));
  function buildKin() {
    kin.forEach(k => {
      k.el.innerHTML = k.html;
      k.w = k.el.scrollWidth || 1;
      k.el.innerHTML = k.html.repeat(Math.ceil(innerWidth / k.w) + 2);
    });
  }
  buildKin();
  if (document.fonts) document.fonts.ready.then(buildKin);
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(buildKin, 200); });

  const progress = $('#progress'), nav = $('#nav'), kinEl = $('.kin');
  const par = $$('[data-p]');
  let last = scrollY, vel = 0, kinVis = true;
  new IntersectionObserver(([e]) => kinVis = e.isIntersecting).observe(kinEl);

  /* ----- Atom di hero ----- */
  const atomEl=$('#atom'),orbSvg=$('.orbits',atomEl),orbs=$$('.orb',atomEl);
  const OR=[{p:0,a:0,s:.00034},{p:2.1,a:Math.PI/3,s:-.00029},{p:4.2,a:2*Math.PI/3,s:.00024}];
  let aT=0,aLast=0,hold=false,heroVis=true;
  new IntersectionObserver(([e])=>heroVis=e.isIntersecting).observe($('.hero'));
  $('.hero-stage').addEventListener('mouseenter',()=>hold=true);
  $('.hero-stage').addEventListener('mouseleave',()=>hold=false);
  function atomTick(t){
    const dt=Math.min(aLast?t-aLast:16,50);aLast=t;
    if(!heroVis)return;
    if(!hold&&!RM)aT+=dt;
    const A=orbSvg.getBoundingClientRect().width/2,B=A*.346;
    orbs.forEach((o,i)=>{
      const r=OR[i],th=r.p+aT*r.s,x0=A*Math.cos(th),y0=B*Math.sin(th),z=Math.sin(th);
      const c=Math.cos(r.a),sn=Math.sin(r.a);
      o.style.transform=`translate(${x0*c-y0*sn}px,${x0*sn+y0*c}px) scale(${.82+.1*(z+1)}) rotate(${z*5}deg)`;
      o.style.zIndex=z>0?3:0;
    });
  }

  /* ----- Tabel periodik, scroll horizontal ----- */
  const hs=$('#unsur'),hsPin=$('.hs-pin'),hsTrack=$('.hs-track'),hsBar=$('.hs-bar');
  let hsMax=0;
  if(RM)hs.classList.add('hs-native');
  const EL='H Hidrogen n|He Helium g|Li Litium a|Be Berilium e|B Boron m|C Karbon n|N Nitrogen n|O Oksigen n|F Fluor h|Ne Neon g|Na Natrium a|Mg Magnesium e|Al Aluminium p|Si Silikon m|P Fosfor n|S Belerang n|Cl Klorin h|Ar Argon g|K Kalium a|Ca Kalsium e|Sc Skandium t|Ti Titanium t|V Vanadium t|Cr Kromium t|Mn Mangan t|Fe Besi t|Co Kobalt t|Ni Nikel t|Cu Tembaga t|Zn Seng t|Ga Galium p|Ge Germanium m|As Arsen m|Se Selenium n|Br Bromin h|Kr Kripton g|Rb Rubidium a|Sr Stronsium e|Y Itrium t|Zr Zirkonium t|Nb Niobium t|Mo Molibdenum t|Tc Teknesium t|Ru Rutenium t|Rh Rodium t|Pd Paladium t|Ag Perak t|Cd Kadmium t|In Indium p|Sn Timah p|Sb Antimon m|Te Telurium m|I Iodin h|Xe Xenon g|Cs Sesium a|Ba Barium e|La Lantanum l|Ce Serium l|Pr Praseodimium l|Nd Neodimium l|Pm Prometium l|Sm Samarium l|Eu Europium l|Gd Gadolinium l|Tb Terbium l|Dy Disprosium l|Ho Holmium l|Er Erbium l|Tm Tulium l|Yb Iterbium l|Lu Lutesium l|Hf Hafnium t|Ta Tantalum t|W Wolfram t|Re Renium t|Os Osmium t|Ir Iridium t|Pt Platina t|Au Emas t|Hg Raksa t|Tl Talium p|Pb Timbal p|Bi Bismut p|Po Polonium p|At Astatin h|Rn Radon g|Fr Fransium a|Ra Radium e|Ac Aktinium k|Th Torium k|Pa Protaktinium k|U Uranium k|Np Neptunium k|Pu Plutonium k|Am Amerisium k|Cm Kurium k|Bk Berkelium k|Cf Kalifornium k|Es Einsteinium k|Fm Fermium k|Md Mendelevium k|No Nobelium k|Lr Lawrensium k|Rf Rutherfordium t|Db Dubnium t|Sg Seaborgium t|Bh Bohrium t|Hs Hasium t|Mt Meitnerium t|Ds Darmstadtium t|Rg Roentgenium t|Cn Kopernikium t|Nh Nihonium p|Fl Flerovium p|Mc Moskovium p|Lv Livermorium p|Ts Tenesin h|Og Oganeson g'.split('|').map(x=>x.split(' '));
  const CATN={a:'Logam alkali',e:'Logam alkali tanah',t:'Logam transisi',p:'Logam pasca-transisi',m:'Metaloid',n:'Nonlogam',h:'Halogen',g:'Gas mulia',l:'Lantanida',k:'Aktinida'};
  const FACT={H:'Unsur paling ringan. Bersama oksigen membentuk air.',He:'Gas mulia yang sangat ringan, dipakai mengisi balon udara.',C:'Penyusun arang, grafit, dan berlian, serta dasar makhluk hidup.',N:'Sekitar 78% udara adalah nitrogen.',O:'Sekitar 21% udara. Dibutuhkan untuk bernapas dan pembakaran.',Na:'Logam lunak yang sangat reaktif. Bersama klorin menjadi garam dapur.',Cl:'Gas beracun, tetapi dalam garam dapur (NaCl) aman dimakan.',Al:'Logam ringan untuk kaleng dan kerangka pesawat.',Si:'Bahan dasar kaca dan chip komputer.',Ca:'Penyusun tulang dan gigi.',Fe:'Logam kuat untuk bangunan. Berkarat jika bereaksi dengan oksigen dan air.',Cu:'Penghantar listrik yang baik, dipakai untuk kabel.',Zn:'Dipakai melapisi besi agar tidak berkarat.',Ag:'Logam mengkilap untuk perhiasan dan peralatan makan.',Au:'Emas tidak berkarat, jadi selalu mengkilap.',Hg:'Satu-satunya logam yang cair pada suhu kamar.',Pb:'Logam berat yang beracun, dulu dipakai untuk pipa.',S:'Belerang berwarna kuning, ada di sekitar gunung berapi.',Ne:'Gas mulia yang menyala oranye kemerahan di lampu neon.',U:'Unsur radioaktif, bahan bakar reaktor nuklir.'};
  const ptPos=z=>z==1?[1,1]:z==2?[1,18]:z<=4?[2,z-2]:z<=10?[2,z+8]:z<=12?[3,z-10]:z<=18?[3,z]:z<=36?[4,z-18]:z<=54?[5,z-36]:z<=56?[6,z-54]:z<=71?[9,z-54]:z<=86?[6,z-68]:z<=88?[7,z-86]:z<=103?[10,z-86]:[7,z-100];
  const pt=$('#pt'),legend=$('#legend');
  pt.insertAdjacentHTML('beforeend','<div class="gp" style="grid-area:6/3">57–71</div><div class="gp" style="grid-area:7/3">89–103</div>'+
    EL.map((e,i)=>{const z=i+1,[r,c]=ptPos(z);return `<button class="el k-${e[2]}" style="grid-area:${r}/${c}" data-z="${z}" aria-label="${e[1]}, nomor atom ${z}"><small>${z}</small>${e[0]}</button>`}).join(''));
  legend.innerHTML=Object.keys(CATN).map(k=>`<button class="lg k-${k}" data-k="${k}" aria-pressed="false"><i></i>${CATN[k]}</button>`).join('');
  const els=$$('.el',pt);let selEl=null;
  function pick(z){
    const e=EL[z-1];
    if(selEl)selEl.classList.remove('sel');
    selEl=els[z-1];selEl.classList.add('sel');
    $('#edSym').textContent=e[0];$('#edSym').className='sym k-'+e[2];
    $('#edCat').textContent='No. '+z+' · '+CATN[e[2]];
    $('#edName').textContent=e[1];
    $('#edText').textContent=FACT[e[0]]||('Nomor atom '+z+', termasuk '+CATN[e[2]].toLowerCase()+'.');
  }
  pt.addEventListener('click',ev=>{const b=ev.target.closest('.el');if(b)pick(+b.dataset.z)});
  if(matchMedia('(hover:hover)').matches)pt.addEventListener('mouseover',ev=>{const b=ev.target.closest('.el');if(b)pick(+b.dataset.z)});
  legend.addEventListener('click',ev=>{
    const b=ev.target.closest('.lg');if(!b)return;
    const on=!b.classList.contains('on');
    $$('.lg',legend).forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false')});
    if(on){b.classList.add('on');b.setAttribute('aria-pressed','true')}
    els.forEach(x=>x.classList.toggle('dim',on&&!x.classList.contains('k-'+b.dataset.k)));
  });
  pick(26);
  function hsSize(){if(RM)return;hsPin.style.height=innerHeight+'px';hsMax=Math.max(0,hsTrack.offsetWidth-innerWidth);hs.style.height=(hsMax+innerHeight)+'px'}
  hsSize();
  addEventListener('load',hsSize);if(document.fonts)document.fonts.ready.then(hsSize);
  let ht;addEventListener('resize',()=>{clearTimeout(ht);ht=setTimeout(hsSize,150)});
  let hsP=0,hsT=performance.now();
  function hsTick(){
    if(RM)return;
    const now=performance.now(),dt=Math.min(now-hsT,64);hsT=now;
    const r=hs.getBoundingClientRect();
    const p=Math.max(0,Math.min(1,-r.top/(hsMax||1)));
    if(r.bottom<-50||r.top>innerHeight+50){hsP=p;return}
    hsP+=(p-hsP)*(1-Math.exp(-dt/140));
    if(Math.abs(p-hsP)<.0002)hsP=p;
    const sk=Math.max(-3,Math.min(3,(hsP-p)*hsMax*.015));
    hsTrack.style.transform=`translate3d(${-hsP*hsMax}px,0,0) skewX(${sk.toFixed(2)}deg)`;
    hsBar.style.transform=`scaleX(${hsP})`;
  }

  /* ----- Pembantu demo ----- */
  const at=(e,o)=>{for(const k in o)e.setAttribute(k,String(o[k]))};
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
  const NS='http://www.w3.org/2000/svg';
  function player(range,btn,ms){
    let raf=0,run=false;
    const stop=()=>{run=false;cancelAnimationFrame(raf);btn.textContent='Putar'};
    btn.addEventListener('click',()=>{
      if(run){stop();return}
      const a=+range.min,b=+range.max;if(+range.value>=b)range.value=a;
      run=true;btn.textContent='Jeda';let last=performance.now();
      const step=now=>{
        if(!run)return;
        const dt=now-last;last=now;
        range.value=Math.min(b,+range.value+(b-a)*dt/ms);
        range.dispatchEvent(new Event('input'));
        if(+range.value>=b)stop();else raf=requestAnimationFrame(step);
      };
      raf=requestAnimationFrame(step);
    });
    range.addEventListener('pointerdown',stop);
    return stop;
  }
  const tabs=(root,fn)=>$$('.dm-tabs button',root).forEach(b=>b.addEventListener('click',()=>{
    $$('.dm-tabs button',root).forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
    fn(b.dataset.m);
  }));

  /* ----- Demo fisika: es mencair ----- */
  (()=>{
    const r=$('#fRange'),ice=$('#fIce'),hi=$('#fHi'),pud=$('#fPud'),drops=$$('#dmFis .dm-drop');
    function render(){
      const T=+r.value,m=clamp(T/25),w=110-34*m,h=110*(1-.92*m),melting=m>0&&m<.98;
      at(ice,{x:200-w/2,y:192-h,width:w,height:h});
      at(hi,{x:200-w/2+10,y:192-h+10,width:10,height:Math.max(0,h*.4)});
      at(pud,{rx:m>0?14+110*m:0,ry:m>0?3+16*m:0});
      drops.forEach((d,i)=>{at(d,{cx:200+(i-1)*w/3,cy:192-h*.25});d.classList.toggle('on',melting)});
      $('#fTemp').textContent=T+'°C';
      $('#fBadge').textContent=T<=0?'PADAT':m<.98?'MENCAIR':'CAIR';
      $('#fNote').textContent=T<=0?'Es adalah air dalam wujud padat. Rumus kimianya H₂O. Naikkan suhunya.':m<.98?'Es menyerap panas dan mencair. Wujudnya berubah, tetapi rumus kimianya tetap H₂O.':'Semua es sudah menjadi air. Turunkan suhu di bawah 0°C: air membeku lagi. Itu ciri perubahan fisika.';
    }
    r.addEventListener('input',render);player(r,$('#fPlay'),6000);render();
  })();

  /* ----- Demo kimia: karat dan kertas terbakar ----- */
  (()=>{
    const root=$('#dmKim'),svg=$('.dm-svg',root),r=$('#kRange'),stop=player(r,$('#kPlay'),7000);
    const spots=$$('#kSpots circle'),flames=$('#pFlame'),smoke=$('#pSmoke'),smokeC=$$('circle',smoke),paper=$('#pPaper'),char=$('#pChar'),ash=$('#pAsh');
    let mode='A';
    function render(){
      const p=+r.value/100;let badge,note;
      if(mode==='A'){
        $('#kRust').setAttribute('opacity',(p*.95).toFixed(2));
        spots.forEach((c,i)=>c.setAttribute('opacity',(clamp((p-i*.1)*3)*.9).toFixed(2)));
        $('#kVal').textContent=Math.round(p*30)+' hari';
        badge=p<.04?'BESI':p<.85?'BERKARAT':'KARAT';
        note=p<.04?'Besi masih murni. Geser waktunya untuk melihat apa yang terjadi di udara lembap.':p<.85?'Besi bereaksi dengan oksigen dan uap air. Muncul zat baru berwarna cokelat kemerahan.':'Karat adalah besi oksida, zat baru yang rapuh dan sifatnya beda dari besi.';
      }else{
        const h=150*(1-p),burn=p>.01&&p<.995;
        at(paper,{height:Math.max(0,h)});paper.style.display=h<1?'none':'';
        at(char,{y:40+h-Math.min(10,h),height:Math.max(0,Math.min(10,h))});char.style.display=burn?'':'none';
        flames.style.display=burn?'':'none';flames.setAttribute('transform','translate(200 '+(40+h)+')');
        smoke.style.display=burn?'':'none';smokeC.forEach((c,i)=>at(c,{cx:185+i*15,cy:40+h-18}));
        at(ash,{rx:p>.02?10+62*p:0,ry:p>.02?2+15*p:0});
        $('#kVal').textContent=Math.round(p*100)+'%';
        badge=p<.03?'KERTAS':p<.97?'TERBAKAR':'ABU';
        note=p<.03?'Kertas tersusun dari selulosa. Geser untuk membakarnya.':p<.97?'Selulosa bereaksi dengan oksigen. Terbentuk abu, asap, dan gas.':'Abu dan gas adalah zat baru. Tidak bisa disatukan lagi menjadi kertas.';
      }
      $('#kBadge').textContent=badge;$('#kNote').textContent=note;
    }
    r.addEventListener('input',render);
    tabs(root,m=>{mode=m;stop();r.value=0;$('#kA').style.display=m==='A'?'':'none';$('#kB').style.display=m==='B'?'':'none';$('#kLab').textContent=m==='A'?'Waktu':'Pembakaran';render()});
    $('#kBack').addEventListener('click',()=>{
      if(+r.value<5){$('#kNote').textContent='Geser dulu, lalu coba kembalikan.';return}
      $('#kNote').textContent='Tidak bisa. '+(mode==='A'?'Karat adalah zat baru, bukan besi lagi.':'Abu dan gas adalah zat baru, bukan kertas lagi.')+' Inilah ciri perubahan kimia.';
      svg.classList.remove('dm-shake');void svg.getBoundingClientRect();svg.classList.add('dm-shake');
    });
    render();
  })();

  /* ----- Demo pemisahan campuran ----- */
  (()=>{
    const root=$('#dmSep'),r=$('#sRange'),stop=player(r,$('#sPlay'),9000);
    const mk=(g,rad,fill)=>{const c=document.createElementNS(NS,'circle');c.setAttribute('r',rad);c.setAttribute('fill',fill);g.appendChild(c);return c};
    const fp=[],gF=$('#sfPart');
    for(let i=0;i<14;i++){const y0=48+rnd()*52,hw=90-.65*(y0-30)-8,x0=200+(rnd()*2-1)*hw,x1=200+(x0-200)*.3,y1=112+rnd()*9;fp.push({c:mk(gF,4.5,'#c98b4e'),x0,y0,x1,y1})}
    const dp=[],gD=$('#sdPart');
    for(let i=0;i<20;i++){dp.push({c:mk(gD,4,'#c98b4e'),x0:110+rnd()*92,y0:102+rnd()*116,y1:224-Math.floor(i/8)*8-rnd()*3})}
    const cr=[],gC=$('#skCr');
    for(let i=0;i<16;i++){const q=document.createElementNS(NS,'rect');at(q,{x:-4,y:-4,width:8,height:8,fill:'#fff',stroke:'#c8d6ff'});gC.appendChild(q);cr.push({q,x:172+rnd()*56,y:180+rnd()*12,a:rnd()*90})}
    const INFO={
      F:['Penyaringan','Dasar: ukuran partikel. Partikel besar tertahan sebagai residu, cairan yang lolos disebut filtrat.'],
      D:['Pengendapan, lalu dituang','Dasar: massa jenis. Padatan mengendap dulu, lalu cairan bening dituang perlahan.'],
      K:['Penguapan','Dasar: penguapan. Air menguap, zat padat terlarut tertinggal sebagai kristal, misalnya garam dari air laut.'],
      E:['Lama diseduh','Dasar: kelarutan. Zat warna dan rasa larut ke air panas, ampasnya tertahan di kantong.']
    };
    let mode='F';
    const G={F:$('#sF'),D:$('#sD'),K:$('#sK'),E:$('#sE')};
    function render(){
      const p=+r.value/100;
      if(mode==='F'){
        const y=36+p*76,e=clamp(p*1.15),h=60*p,burn=p>.02&&p<.98;
        at($('#sfLiq'),{y,height:130-y});
        fp.forEach(o=>at(o.c,{cx:lerp(o.x0,o.x1,e),cy:lerp(o.y0,o.y1,e)}));
        at($('#sfOut'),{y:248-h,height:h});$('#sfDrop').classList.toggle('on',burn);
      }else if(mode==='D'){
        const set=clamp(p/.5),e=1-(1-set)*(1-set),tilt=clamp((p-.55)/.45),th=28*tilt*Math.PI/180,h=62*tilt;
        dp.forEach(o=>at(o.c,{cx:o.x0,cy:lerp(o.y0,o.y1,e)}));
        $('#sdA').setAttribute('transform','rotate('+(28*tilt).toFixed(1)+' 210 230)');
        at($('#sdLiq'),{y:100+70*tilt,height:130-70*tilt});
        at($('#sdOut'),{y:228-h,height:h});
        const lx=210+140*Math.sin(th),ly=230-140*Math.cos(th);
        $('#sdStream').setAttribute('d',tilt>.06&&tilt<.995?'M'+lx+' '+ly+' Q'+(lx+32)+' '+(ly+12)+' 312 '+(226-h):'');
      }else if(mode==='K'){
        const y=152+p*40;
        at($('#skLiq'),{y,height:205-y});
        $('#skSteam').setAttribute('opacity',p>.01&&p<.98?(Math.sin(Math.PI*p)*.85).toFixed(2):0);
        cr.forEach((o,i)=>o.q.setAttribute('transform','translate('+o.x+' '+o.y+') rotate('+o.a+') scale('+clamp((p-.3-i*.035)*6)+')'));
      }else{
        const c=[0,1,2].map(i=>Math.round(lerp([191,233,255][i],[160,80,28][i],p)));
        $('#seLiq').setAttribute('fill','rgb('+c.join(',')+')');
        $('#seSw').setAttribute('opacity',p.toFixed(2));
      }
      $('#sVal').textContent=Math.round(p*100)+'%';
      $('#sBadge').textContent=p<.03?'MULAI':p<.97?'BERLANGSUNG':'SELESAI';
      $('#sNote').textContent=INFO[mode][1];
    }
    r.addEventListener('input',render);
    tabs(root,m=>{mode=m;stop();r.value=0;for(const k in G)G[k].style.display=k===m?'':'none';$('#sLab').textContent=INFO[m][0];render()});
    render();
  })();

  /* ----- Kursor, paralaks judul ----- */
  let cur=null,cx=-100,cy=-100,tx=-100,ty=-100;
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!RM){
    cur=document.createElement('div');cur.className='cur';cur.setAttribute('aria-hidden','true');document.body.appendChild(cur);
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cur.classList.add('on');cur.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,.el,.flip,.panel-head')))});
    document.documentElement.addEventListener('mouseleave',()=>cur.classList.remove('on'));
  }
  function curTick(){if(!cur)return;cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)'}
  const heads=$$('.head .h2');
  function hdTick(){
    if(RM)return;
    heads.forEach((h,i)=>{const r=h.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;h.style.translate=((innerHeight*.5-r.top)*.05*(i%2?1:-1)).toFixed(1)+'px 0'});
  }

  /* ----- Loop utama ----- */
  function frame(t) {
    const y = scrollY;
    vel += ((y - last) - vel) * .1; last = y;
    progress.style.transform = `scaleX(${y / ((document.documentElement.scrollHeight - innerHeight) || 1)})`;
    nav.classList.toggle('solid', y > 40);
    if (!RM) {
      par.forEach(e => {
        const r = e.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        e.style.translate = `0 ${(r.top + r.height / 2 - innerHeight / 2) * e.dataset.p}px`;
      });
      stripAnims.forEach(a => a.playbackRate = 1 + Math.min(Math.abs(vel) * .25, 6));
      if (kinVis) {
        const skew = Math.max(-16, Math.min(16, vel * .7));
        const stretch = 1 + Math.min(Math.abs(vel) * .012, .2);
        kin.forEach((k, i) => {
          k.x += k.d * (.7 + Math.abs(vel) * .5);
          if (k.x <= -k.w) k.x += k.w;
          if (k.x >= 0) k.x -= k.w;
          const wave = Math.sin(t * .0014 + i * 2.2) * 4;
          k.el.style.transform = `translate3d(${k.x}px,0,0) skewX(${skew + wave}deg) scaleX(${stretch})`;
        });
      }
    }
    atomTick(t);
    hsTick();
    hdTick();
    curTick();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ----- Kartu balik ----- */
  $$('.flip').forEach(b => b.onclick = () => b.setAttribute('aria-pressed', b.classList.toggle('is-flipped')));

  /* ----- Akordeon pemisahan ----- */
  const panels = $$('.panel');
  panels.forEach(p => $('.panel-head', p).onclick = () => panels.forEach(q => {
    const o = q === p;
    q.classList.toggle('open', o);
    $('.panel-head', q).setAttribute('aria-expanded', o);
  }));

  /* ----- Simulasi wujud zat ----- */
  const cv = $('#mol');
  if (cv) {
    const cx = cv.getContext('2d'), N = 30;
    const info = {
      padat: 'Partikel rapat dan teratur, hanya bergetar di tempat. Bentuk dan volume tetap. Contoh: besi, kayu, batu.',
      cair: 'Partikel berdekatan tetapi bergerak bebas. Volume tetap, bentuk mengikuti wadah. Contoh: air, minyak, alkohol.',
      gas: 'Partikel berjauhan dan bergerak cepat ke segala arah. Bentuk dan volume berubah-ubah. Contoh: oksigen, uap air.'
    };
    let W, H, S = 'padat', ps = [], vis = true;
    const text = $('#molText');
    function size() {
      const d = devicePixelRatio || 1;
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
      const c = 6, gx = W / (c + 1), gy = (H * .5) / (Math.ceil(N / c) + 1);
      ps = Array.from({ length: N }, (_, i) => {
        const hx = gx * (i % c + 1), hy = H * .4 + gy * (Math.floor(i / c) + 1);
        return { hx, hy, x: hx, y: hy, vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, ph: Math.random() * 6.28 };
      });
    }
    function step(t) {
      cx.clearRect(0, 0, W, H);
      const top = S === 'gas' ? 8 : H * .38, sp = S === 'gas' ? 2.4 : .9;
      cx.fillStyle = '#fff'; cx.beginPath();
      ps.forEach(p => {
        if (S === 'padat') {
          p.x += (p.hx + Math.sin(t / 90 + p.ph) * 2 - p.x) * .12;
          p.y += (p.hy + Math.cos(t / 110 + p.ph) * 2 - p.y) * .12;
        } else {
          p.x += p.vx * sp; p.y += p.vy * sp;
          if (p.x < 8 || p.x > W - 8) p.vx *= -1;
          if (p.y < top || p.y > H - 8) p.vy *= -1;
          p.x = Math.max(8, Math.min(W - 8, p.x));
          p.y = Math.max(top, Math.min(H - 8, p.y));
        }
        cx.moveTo(p.x + 5, p.y); cx.arc(p.x, p.y, 5, 0, 6.283);
      });
      cx.fill();
    }
    $$('.tabs button').forEach(b => b.onclick = () => {
      S = b.dataset.s; text.textContent = info[S];
      $$('.tabs button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      if (RM) step(0);
    });
    new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(cv);
    addEventListener('resize', size);
    size(); text.textContent = info.padat;
    (function loop(t) { if (vis && !RM) step(t); requestAnimationFrame(loop); })(0);
    if (RM) step(0);
  }

  /* ----- Peta konsep ----- */
  const MAP = [
    { n: '01', t: 'Konsep Dasar Zat', d: 'Zat memiliki massa dan menempati ruang. Zat dikenali lewat sifat fisis dan sifat kimia, serta dikelompokkan menurut wujud dan komposisinya.', c: [
      ['Pengertian', 'Zat (materi) adalah segala sesuatu yang memiliki massa dan menempati ruang (memiliki volume).'],
      ['Sifat Fisis', 'Dapat diamati dan diukur tanpa mengubah susunan kimia zat: wujud, warna, bau, titik didih, titik leleh, dan massa jenis.'],
      ['Sifat Kimia', 'Berkaitan dengan kemampuan zat bereaksi membentuk zat baru: mudah terbakar, berkarat (korosif), membusuk, dan beracun.'],
      ['Wujud Zat', 'Padat: bentuk dan volume tetap. Cair: volume tetap, bentuk mengikuti wadah. Gas: bentuk dan volume berubah-ubah.'],
      ['Komposisi', 'Zat tunggal terdiri atas unsur dan senyawa. Campuran terdiri atas larutan (homogen), koloid, dan suspensi (heterogen).']] },
    { n: '02', t: 'Perubahan Zat', d: 'Perubahan zat dibedakan menjadi perubahan fisika, yang tidak menghasilkan zat baru, dan perubahan kimia, yang menghasilkan zat baru.', c: [
      ['Perubahan Fisika', 'Tidak terbentuk zat baru; hanya wujud, ukuran, atau bentuk yang berubah dan umumnya dapat kembali (reversible). Contoh: es mencair, gula larut, beras digiling.'],
      ['Perubahan Kimia', 'Terbentuk zat baru dengan sifat berbeda, ditandai perubahan warna atau suhu, gas, atau endapan, dan umumnya tidak dapat kembali (irreversible). Contoh: besi berkarat, kertas dibakar, nasi basi, fotosintesis.']] },
    { n: '03', t: 'Pemisahan Campuran', d: 'Komponen campuran dipisahkan berdasarkan perbedaan sifat fisiknya, dengan metode filtrasi, kristalisasi, dekantasi, dan ekstraksi.', c: [
      ['Filtrasi', 'Memisahkan berdasarkan ukuran partikel dengan media berpori. Contoh: menyaring santan dari parutan kelapa.'],
      ['Kristalisasi', 'Menguapkan pelarut sampai terbentuk kristal. Contoh: pembuatan garam dari air laut.'],
      ['Dekantasi', 'Mendiamkan campuran sampai padatan mengendap, lalu menuang cairan di atasnya. Contoh: memisahkan air dari endapan lumpur.'],
      ['Ekstraksi', 'Menarik komponen tertentu dengan pelarut yang sesuai. Contoh: menyeduh teh dengan air panas.']] }
  ];
  const mp = $('#branches');
  if (mp) {
    const detail = $('#detail'), dT = $('#dTitle'), dX = $('#dText');
    mp.innerHTML = MAP.map((b, i) => `<article class="branch b${i}">
      <button class="node" aria-expanded="true" data-i="${i}"><span class="n">${b.n}</span><span class="t">${b.t}</span><span class="ar">↓</span></button>
      <div class="subs"><div>${b.c.map((c, j) => `<button class="chip" data-i="${i}" data-j="${j}">${c[0]}</button>`).join('')}</div></div>
    </article>`).join('');
    const show = (t, x, btn) => {
      $$('.chip.on', mp).forEach(c => c.classList.remove('on'));
      if (btn) btn.classList.add('on');
      dT.textContent = t; dX.textContent = x;
      detail.classList.remove('flash'); void detail.offsetWidth; detail.classList.add('flash');
    };
    mp.addEventListener('click', e => {
      const nd = e.target.closest('.node'), ch = e.target.closest('.chip');
      if (nd) {
        const shut = nd.parentElement.classList.toggle('shut');
        nd.setAttribute('aria-expanded', !shut);
        show(MAP[nd.dataset.i].t, MAP[nd.dataset.i].d);
      } else if (ch) {
        const c = MAP[ch.dataset.i].c[ch.dataset.j];
        show(c[0], c[1], ch);
      }
    });
    const setAll = open => $$('.branch', mp).forEach(b => {
      b.classList.toggle('shut', !open);
      $('.node', b).setAttribute('aria-expanded', open);
    });
    $('#openAll').onclick = () => setAll(true);
    $('#closeAll').onclick = () => setAll(false);
    show(MAP[0].t, MAP[0].d);
  }
})();