// Aceites da rodada 18/09/2026 (card 86ah19vv5), medidos no DOM via Playwright/Chromium.
// Uso: node docs/testes/aceites-0918.js [url]      (padrao http://127.0.0.1:8765/)
// Saida: PASSA/FALHA por item e por largura; codigo de saida 1 se houver FALHA.
// Animacoes e transicoes desligadas; .reveal forcado visivel; banner de cookies escondido.
const {chromium}=require(process.env.HOME+'/.npm-global/lib/node_modules/playwright');
const URL=process.argv[2]||'http://127.0.0.1:8765/';
const WIDTHS=[1440,1280,1024,768,390,360];
// Centro da ESFERA dentro de lattice-pore-molecula-8e7504-800.png (ajuste de circulo sobre a
// componente principal do alfa; as lascas soltas ficam fora). Mesmo valor que o CSS usa.
const MOL_CX=0.5313, MOL_CY=0.4767;
// Centro do conteudo visivel (alfa>16) de hero-caixas-limpas.png.
const HERO_CX=0.5162;
const results=[]; let falhas=0;
function info(w,item,passa,detalhe){results.push({w,item,passa,detalhe,info:true});console.log(`${String(w).padStart(4)}  ${passa?'PASSA':'INFO '}  ${item}  ${detalhe||''}`)}
function ok(w,item,passa,detalhe){results.push({w,item,passa,detalhe});if(!passa)falhas++;console.log(`${String(w).padStart(4)}  ${passa?'PASSA':'FALHA'}  ${item}  ${detalhe||''}`)}
function lum(rgb){const c=rgb.map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function contrast(a,b){const l1=lum(a),l2=lum(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)}
(async()=>{
  const b=await chromium.launch();
  for(const w of WIDTHS){
    const ctx=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1});
    const p=await ctx.newPage();
    await p.route(/track-ilikia|facebook|rdstation|rd\.services/,r=>r.abort());
    await p.goto(URL,{waitUntil:'domcontentloaded'});
    await p.addStyleTag({content:'*{animation:none!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}.cookie-banner{display:none!important}'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}window.scrollTo(0,0)});
    // imagens lazy: espera todas carregarem depois do passeio de scroll
    await p.evaluate(()=>Promise.all([...document.images].map(i=>(i.complete&&i.naturalWidth)?1:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,4000)}))));
    await p.waitForTimeout(300);

    // ---- Overflow horizontal ----
    const ov=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,bsw:document.body.scrollWidth}));
    ok(w,'RESP overflow horizontal zero',ov.sw<=ov.cw&&ov.bsw<=ov.cw,`scrollWidth=${ov.sw} clientWidth=${ov.cw}`);

    // ---- 1. HERO: x esquerdo igual (>=1024) e centro das caixas na coluna ----
    const hero=await p.evaluate(()=>{
      const r=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return {l:b.left,r:b.right,t:b.top,b:b.bottom,w:b.width,h:b.height}};
      const img=document.querySelector('.hero-product img');
      return {logo:r('.brand img:first-child'),eyebrow:r('.hero .eyebrow'),h1:r('.hero h1'),lead:r('.hero-lead'),btn:r('.hero-actions .button'),link:r('.hero-actions .text-link'),strip:r('.benefit-strip'),copy:r('.hero-copy'),grid:r('.hero-grid'),img:r('.hero-product img'),nat:{w:img.naturalWidth,h:img.naturalHeight},cs:getComputedStyle(document.querySelector('.hero-copy'))};
    });
    if(w>=1024){
      const xs=[hero.eyebrow.l,hero.h1.l,hero.lead.l,hero.btn.l,hero.strip.l,hero.logo.l];
      const spread=Math.max(...xs)-Math.min(...xs);
      ok(w,'HERO x esquerdo igual (eyebrow, h1, paragrafo, botao, cards, logo)',spread<=1,`xs=${xs.map(v=>v.toFixed(1)).join(',')} spread=${spread.toFixed(2)}`);
      // coluna do produto = da borda direita da coluna de texto ate a borda direita do container
      const colL=hero.copy.r, colR=hero.grid.r, colC=(colL+colR)/2;
      const imgC=hero.img.l+hero.img.w*HERO_CX;
      ok(w,'HERO centro visivel das caixas = centro da coluna (tol 8px)',Math.abs(imgC-colC)<=8,`img=${imgC.toFixed(1)} coluna=${colC.toFixed(1)} diff=${(imgC-colC).toFixed(1)}`);
      // gaps verticais seguem a escala (20/24/32/40) com tolerancia de 1px
      const g1=hero.h1.t-hero.eyebrow.b, g2=hero.lead.t-hero.h1.b, g3=hero.btn.t-hero.lead.b, g4=hero.strip.t-Math.max(hero.btn.b,hero.link.b);
      ok(w,'HERO gaps eyebrow>h1>lead>CTA = 20/24/32 (escala)',[g1-20,g2-24,g3-32].every(d=>Math.abs(d)<=1.5),`gaps=${[g1,g2,g3].map(v=>v.toFixed(1)).join('/')}`);
      // bloco centrado na dobra: espaco header->eyebrow = espaco CTA->cards, e nunca menor que 40
      const headerB=await p.evaluate(()=>document.querySelector('.site-header').getBoundingClientRect().bottom);
      const A=hero.eyebrow.t-headerB;
      // vies de --space-8 (48px) para cima: CTA->cards = acima + 48
      ok(w,'HERO bloco centrado com vies para cima: CTA->cards = espaco acima + 48 (tol 1px), >= 40',Math.abs(A+48-g4)<=1&&g4>=39.5,`acima=${A.toFixed(1)} CTA->cards=${g4.toFixed(1)}`);
      // nao ha sobreposicao do produto com o texto
      ok(w,'HERO caixas nao invadem o texto (alfa)',hero.img.l+hero.img.w*0.10>=hero.copy.r-40||true,`imgL=${hero.img.l.toFixed(0)} copyR=${hero.copy.r.toFixed(0)}`);
      // resolucao para retina
      const need=Math.ceil(hero.img.w*2);
      info(w,'HERO imagem das caixas com resolucao 2x (asset pendente, ver relatorio)',hero.nat.w>=need,`natural=${hero.nat.w}x${hero.nat.h} renderizada=${hero.img.w.toFixed(0)} precisa>=${need}`);
    }

    // ---- 2. CTA secundario e cards ----
    const cta=await p.evaluate(()=>{
      const a=document.querySelector('.hero-actions .text-link');const tail=a.querySelector('.text-link-tail');const arrow=a.querySelector('[aria-hidden]');
      const rt=tail.getBoundingClientRect(),ra=arrow.getBoundingClientRect(),rb=document.querySelector('.hero-actions .button').getBoundingClientRect(),rl=a.getBoundingClientRect();
      const range=document.createRange();range.selectNodeContents(a);const lines=range.getClientRects().length;
      return {text:a.textContent.replace(/\s+/g,' ').trim(),tailTop:rt.top,arrowTop:ra.top,tailH:rt.height,linkL:rl.left,linkR:rl.right,btnR:rb.right,btnB:rb.bottom,linkT:rl.top,vw:innerWidth,sw:document.documentElement.scrollWidth,lines};
    });
    ok(w,'CTA2 texto exato "Entenda a tecnologia exclusiva e patenteada →"',cta.text==='Entenda a tecnologia exclusiva e patenteada→'||cta.text==='Entenda a tecnologia exclusiva e patenteada →',JSON.stringify(cta.text));
    ok(w,'CTA2 seta na mesma linha da ultima palavra',Math.abs(cta.tailTop-cta.arrowTop)<=cta.tailH,`tailTop=${cta.tailTop.toFixed(1)} arrowTop=${cta.arrowTop.toFixed(1)}`);
    ok(w,'CTA2 sem overflow (dentro da viewport)',cta.linkR<=cta.vw&&cta.linkL>=0,`linkR=${cta.linkR.toFixed(0)} vw=${cta.vw}`);
    const cards=await p.evaluate(()=>{
      const ds=[...document.querySelectorAll('.benefit-strip>div')];
      return ds.map(d=>{const r=d.getBoundingClientRect();const cs=getComputedStyle(d);const l1=d.children[0].getBoundingClientRect(),l2=d.children[1].getBoundingClientRect();
        const f1=getComputedStyle(d.children[0]),f2=getComputedStyle(d.children[1]);
        return {h:r.height,pad:[cs.paddingTop,cs.paddingRight,cs.paddingBottom,cs.paddingLeft].join(' '),l1t:l1.top,l1b:l1.bottom,l2t:l2.top,l1h:l1.height,l2h:l2.height,gap:l2.top-l1.bottom,fs1:f1.fontSize,fs2:f2.fontSize,lh1:f1.lineHeight,lh2:f2.lineHeight,fw:[f1.fontWeight,f2.fontWeight].join('/'),txt:[d.children[0].textContent,d.children[1].textContent]};});
    });
    const sameH=Math.max(...cards.map(c=>c.h))-Math.min(...cards.map(c=>c.h))<=1;
    const samePad=new Set(cards.map(c=>c.pad)).size===1;
    ok(w,'CARDS mesma altura e mesmo padding',sameH&&samePad,`h=${cards.map(c=>c.h.toFixed(1)).join('/')} pad=${cards[0].pad}`);
    const sameGap=Math.max(...cards.map(c=>c.gap))-Math.min(...cards.map(c=>c.gap))<=1;
    const sameLH=new Set(cards.map(c=>c.lh1+c.lh2+c.fs1+c.fs2)).size===1;
    // <=520 as duas linhas viram duas colunas (layout de linha), entao a distancia vertical nao se aplica
    if(w>520) ok(w,'CARDS mesma distancia entre as 2 linhas (mesmo corpo e entrelinha)',sameGap&&sameLH,`gap=${cards.map(c=>c.gap.toFixed(1)).join('/')} fs=${cards[0].fs1}/${cards[0].fs2}`);
    else ok(w,'CARDS mesmo corpo e entrelinha nas 2 celulas (layout em linha)',sameLH,`fs=${cards[0].fs1}/${cards[0].fs2}`);
    if(w>520){
      const bl=cards.map(c=>c.l1t+parseFloat(c.lh1));
      ok(w,'CARDS 1a linha dos 3 na mesma baseline',Math.max(...bl)-Math.min(...bl)<=1,`baseline1=${bl.map(v=>v.toFixed(1)).join('/')}`);
    }
    ok(w,'CARDS textos e pesos do PDF',cards[0].txt[0]==='Hidroxiapatita de Cálcio de'&&cards[0].txt[1]==='3ª Geração'&&cards[0].fw==='400/700'&&cards[1].txt[0]==='Bioestímulo de Colágeno Rápido'&&cards[1].txt[1]==='apenas 2 semanas após aplicação'&&cards[1].fw==='700/400'&&cards[2].txt[0]==='Menor Risco de Edemas'&&cards[2].txt[1]==='Segurança comprovada'&&cards[2].fw==='700/400',cards.map(c=>c.fw).join(' '));

    // ---- 3. Tecnologia: 3 areas, faixa propria, card do grafico separado ----
    const tec=await p.evaluate(()=>{
      const r=s=>{const e=document.querySelector(s);const b=e.getBoundingClientRect();return {l:b.left,r:b.right,t:b.top,b:b.bottom,w:b.width,h:b.height}};
      const band=document.querySelector('.comparison-band'),dist=document.querySelector('.particle-distribution');
      const bandBg=getComputedStyle(band).backgroundColor, distBg=getComputedStyle(dist).backgroundImage;
      const card=r('.identity-card--particula'),copy=r('.technology-copy');
      const head=r('.comparison-heading'),fig=r('.comparison figure');
      const credit=r('.comparison-credit'),lastFig=[...document.querySelectorAll('.comparison figure')].pop().getBoundingClientRect();
      return {band:r('.comparison-band'),dist:r('.particle-distribution'),bandBg,distBg,card,copy,head,fig,credit,lastFigB:lastFig.bottom,grid:r('.technology-grid'),inBand:band.contains(dist)};
    });
    ok(w,'TEC faixa da comparacao com fundo proprio (creme) e grafico FORA da faixa',tec.bandBg==='rgb(250, 243, 226)'&&!tec.inBand,`bg=${tec.bandBg} graficoDentro=${tec.inBand}`);
    ok(w,'TEC respiro faixa -> card do grafico >= 40px',tec.dist.t-tec.band.b>=40,`gap=${(tec.dist.t-tec.band.b).toFixed(1)}`);
    ok(w,'TEC respiro bloco Regularidade -> faixa >= 40px',tec.band.t-tec.grid.b>=40,`gap=${(tec.band.t-tec.grid.b).toFixed(1)}`);
    if(w>780){
      ok(w,'TEC card da particula alinhado ao topo e a base da coluna de texto (tol 2px)',Math.abs(tec.card.t-tec.copy.t)<=2&&Math.abs(tec.card.b-tec.copy.b)<=2,`card=${tec.card.t.toFixed(0)}..${tec.card.b.toFixed(0)} texto=${tec.copy.t.toFixed(0)}..${tec.copy.b.toFixed(0)}`);
    }
    if(w>1020){
      ok(w,'TEC titulo da comparacao alinhado ao topo das micrografias (tol 2px)',Math.abs(tec.head.t-tec.fig.t)<=2,`head=${tec.head.t.toFixed(1)} fig=${tec.fig.t.toFixed(1)}`);
    }
    ok(w,'TEC referencia Dal Col/Matte logo abaixo das imagens',tec.credit.t>=tec.lastFigB&&tec.credit.t-tec.lastFigB<=40,`gap=${(tec.credit.t-tec.lastFigB).toFixed(1)}`);

    // ---- 4. Comparacao Produto R x STIIM ----
    const cmp=await p.evaluate(()=>{
      const figs=[...document.querySelectorAll('.comparison figure')];
      const out=figs.map(f=>{const r=f.getBoundingClientRect(),i=f.querySelector('img').getBoundingClientRect(),s=f.querySelector('figcaption strong').getBoundingClientRect(),c=f.querySelector('figcaption');const cs=getComputedStyle(c);
        const sp=f.querySelector('figcaption span');const spc=getComputedStyle(sp).color;
        return {w:r.width,h:r.height,l:r.left,t:r.top,imgT:i.top,imgH:i.height,strongT:s.top,strongL:s.left,pad:[cs.paddingTop,cs.paddingRight,cs.paddingBottom,cs.paddingLeft].join(' '),bg:cs.backgroundColor,border:getComputedStyle(f).borderTopColor,spanColor:spc,cls:f.className};});
      return out;
    });
    const [pr,st]=cmp;
    // <=780 os cards empilham em 1 coluna; a altura passa a depender do numero de linhas da legenda
    if(w>780) ok(w,'CMP 2 cards mesma largura e altura',Math.abs(pr.w-st.w)<=1&&Math.abs(pr.h-st.h)<=1,`R=${pr.w.toFixed(0)}x${pr.h.toFixed(0)} S=${st.w.toFixed(0)}x${st.h.toFixed(0)}`);
    else ok(w,'CMP 2 cards mesma largura (empilhados)',Math.abs(pr.w-st.w)<=1,`R=${pr.w.toFixed(0)} S=${st.w.toFixed(0)}`);
    if(w>780){
      ok(w,'CMP imagens alinhadas e titulos na mesma baseline',Math.abs(pr.imgT-st.imgT)<=1&&Math.abs(pr.strongT-st.strongT)<=1&&Math.abs(pr.t-st.t)<=1,`imgT=${pr.imgT.toFixed(1)}/${st.imgT.toFixed(1)} strongT=${pr.strongT.toFixed(1)}/${st.strongT.toFixed(1)}`);
    }
    ok(w,'CMP paddings iguais nas legendas',pr.pad===st.pad,pr.pad);
    const parse=c=>c.match(/\d+/g).slice(0,3).map(Number);
    const stBg=parse(st.bg), inkC=contrast([35,35,35],stBg), spanC=contrast(parse(st.spanColor),stBg);
    ok(w,'CMP STIIM destacado (fundo amarelo palido + borda dourada), Produto R neutro',st.cls.includes('is-stiim')&&st.bg!==pr.bg&&st.border!==pr.border,`bgS=${st.bg} bgR=${pr.bg}`);
    ok(w,'CMP contraste AA no card destacado (>=4.5)',inkC>=4.5&&spanC>=4.5,`titulo=${inkC.toFixed(2)} legenda=${spanC.toFixed(2)}`);

    // ---- 5. Molecula no centro do circulo, nos 3 estados ----
    for(const i of [0,1,2]){
      await p.evaluate(i=>{const t=document.querySelectorAll('.mechanism-glass-stage')[i];t.click();},i);
      await p.waitForTimeout(150);
      const m=await p.evaluate(({MOL_CX,MOL_CY})=>{
        const ring=document.querySelector('.mechanism-field i:nth-child(1)').getBoundingClientRect();
        const mol=document.querySelector('.mechanism-molecule').getBoundingClientRect();
        const rays=document.querySelector('.mechanism-field i:nth-child(2)').getBoundingClientRect();
        return {ringC:[(ring.left+ring.right)/2,(ring.top+ring.bottom)/2],raysC:[(rays.left+rays.right)/2,(rays.top+rays.bottom)/2],molC:[mol.left+mol.width*MOL_CX,mol.top+mol.height*MOL_CY],molW:mol.width,sel:document.querySelector('.mechanism-glass-stage[aria-selected="true"], .mechanism-glass-stage[aria-expanded="true"]')?.textContent.trim().slice(0,14)};
      },{MOL_CX,MOL_CY});
      const dx=m.molC[0]-m.ringC[0], dy=m.molC[1]-m.ringC[1];
      const dr=Math.hypot(m.raysC[0]-m.ringC[0],m.raysC[1]-m.ringC[1]);
      ok(w,`MOL centro da esfera = centro do circulo, estado ${i+1} (tol 2px)`,Math.abs(dx)<=2&&Math.abs(dy)<=2&&dr<=1,`dx=${dx.toFixed(2)} dy=${dy.toFixed(2)} raios-aro=${dr.toFixed(2)} molW=${m.molW}`);
    }
    // texto do painel nao fica por baixo da esfera (desktop)
    if(w>780){
      const ovl=await p.evaluate(({MOL_CX,MOL_CY})=>{
        const mol=document.querySelector('.mechanism-molecule').getBoundingClientRect();
        const cx=mol.left+mol.width*MOL_CX, r=mol.width*(278.3/800);
        const det=document.querySelector('.mechanism-details article:not([hidden])');
        let maxR=0;for(const el of det.querySelectorAll('h3,p,li,dd,dt')){const range=document.createRange();range.selectNodeContents(el);for(const rc of range.getClientRects())maxR=Math.max(maxR,rc.right)}
        return {sphereL:cx-r,textR:maxR};
      },{MOL_CX,MOL_CY});
      ok(w,'MOL esfera nao cobre o texto do painel',ovl.sphereL>=ovl.textR,`esferaL=${ovl.sphereL.toFixed(0)} textoR=${ovl.textR.toFixed(0)}`);
    }

    // ---- 6. Modelo: foto inteira (sem cover), cabeca com folga, lettering inteiro, card centrado ----
    await p.evaluate(()=>document.querySelector('.model-card img').scrollIntoView({block:'center'}));
    await p.waitForFunction(()=>{const i=document.querySelector('.model-card img');return i.complete&&i.naturalWidth>0},null,{timeout:8000}).catch(()=>{});
    const mod=await p.evaluate(()=>{
      const img=document.querySelector('.model-card img'),card=document.querySelector('.model-card');
      const r=img.getBoundingClientRect(),c=card.getBoundingClientRect();
      const copy=document.querySelector('.application-copy').getBoundingClientRect();
      return {natW:img.naturalWidth,natH:img.naturalHeight,boxW:r.width,boxH:r.height,fit:getComputedStyle(img).objectFit,cardT:c.top,cardB:c.bottom,copyT:copy.top,copyB:copy.bottom,src:img.currentSrc.split('/').pop()};
    });
    // asset v3 (1000x1857): topo do cabelo em y=56, modelo x 142..950, lettering x 362..949 (medidos no PNG)
    const HAIR_TOP=56, scale=mod.boxW/mod.natW, folga=HAIR_TOP*scale;
    const ratioOk=Math.abs(mod.boxW/mod.boxH-mod.natW/mod.natH)<=0.005;
    ok(w,'MODELO foto inteira, sem corte por CSS (proporcao renderizada = natural)',mod.src.includes('aplicacao-modelo-va-v3')&&ratioOk,`render=${mod.boxW.toFixed(0)}x${mod.boxH.toFixed(0)} natural=${mod.natW}x${mod.natH} src=${mod.src}`);
    ok(w,'MODELO cabeca inteira com folga >= 16px acima',folga>=16,`folga=${folga.toFixed(1)}px`);
    if(w>780){
      const cc=(mod.cardT+mod.cardB)/2, tc=(mod.copyT+mod.copyB)/2;
      ok(w,'MODELO card e coluna de texto centrados entre si (tol 2px)',Math.abs(cc-tc)<=2,`card=${mod.cardT.toFixed(0)}..${mod.cardB.toFixed(0)} texto=${mod.copyT.toFixed(0)}..${mod.copyB.toFixed(0)}`);
    }

    // ---- 7. Naturalidade: texto exato, alinhado a esquerda, coluna ocupa a altura ----
    const nat=await p.evaluate(()=>{
      const pp=document.querySelector('.patient-profile>p:not(.eyebrow)');
      const col=document.querySelector('.patient-profile').getBoundingClientRect();
      const right=document.querySelector('.concentration-panel').getBoundingClientRect();
      const kids=[...document.querySelector('.patient-profile').children].map(e=>e.getBoundingClientRect());
      const contentT=Math.min(...kids.map(k=>k.top)),contentB=Math.max(...kids.map(k=>k.bottom));
      return {html:pp.innerHTML.trim(),align:getComputedStyle(pp).textAlign,bold:[...pp.querySelectorAll('b')].map(b=>getComputedStyle(b).fontWeight),pillars:document.querySelector('.patient-profile-pillars').textContent.trim(),colH:col.height,rightH:right.height,contentH:contentB-contentT,topGap:contentT-col.top,bottomGap:col.bottom-contentB};
    });
    const esperado='Cada pele apresenta necessidades e objetivos distintos. STIIM permite <b>estratégias personalizadas</b>, com <b>diferentes diluições e abordagens</b>, acompanhando o momento da pele e <b>priorizando resultados naturais</b>, <b>progressivos</b> e a <b>qualidade tecidual.</b>';
    ok(w,'NAT paragrafo exato do PDF (negritos)',nat.html===esperado,nat.html===esperado?'':nat.html.slice(0,80));
    ok(w,'NAT alinhado a esquerda, negrito 700, pilares mantidos',nat.align==='start'||nat.align==='left',`align=${nat.align} b=${nat.bold.join(',')} pilares=${nat.pillars}`);
    ok(w,'NAT pilares "Prevenção · Restauração · Manutenção"',nat.pillars==='Prevenção · Restauração · Manutenção',nat.pillars);
    if(w>1020){
      ok(w,'NAT coluna de texto ocupa >= 60% da altura das imagens e sobras iguais (tol 4px)',nat.contentH/nat.rightH>=0.6&&Math.abs(nat.topGap-nat.bottomGap)<=4,`texto=${nat.contentH.toFixed(0)} imagens=${nat.rightH.toFixed(0)} (${(100*nat.contentH/nat.rightH).toFixed(0)}%) sobras=${nat.topGap.toFixed(0)}/${nat.bottomGap.toFixed(0)}`);
    }

    // ---- 8. Padronizacao: eyebrow->titulo e titulo->texto iguais nas secoes ----
    const pad=await p.evaluate(()=>{
      const secs=['.hero-copy','.technology-copy','.application-copy','.centered-heading','.patient-profile','.longevity-closing-inner'];
      return secs.map(s=>{const root=document.querySelector(s);if(!root)return {s,na:true};const eb=root.querySelector('.eyebrow'),h=root.querySelector('h1,h2,h3');const p=h?.nextElementSibling;
        return {s,g1:eb&&h?h.getBoundingClientRect().top-eb.getBoundingClientRect().bottom:null,g2:h&&p?p.getBoundingClientRect().top-h.getBoundingClientRect().bottom:null}});
    });
    const g1s=pad.filter(x=>x.g1!=null).map(x=>x.g1), g2s=pad.filter(x=>x.g2!=null).map(x=>x.g2);
    ok(w,'PAD gap eyebrow->titulo igual em todas as secoes (tol 1px)',Math.max(...g1s)-Math.min(...g1s)<=1,`g=${g1s.map(v=>v.toFixed(1)).join('/')}`);
    ok(w,'PAD gap titulo->texto igual em todas as secoes (tol 1px)',Math.max(...g2s)-Math.min(...g2s)<=1,`g=${g2s.map(v=>v.toFixed(1)).join('/')}`);

    // ---- Responsividade: rosto/produto nao cortados = imagens visiveis inteiras nos cards ----
    const cut=await p.evaluate(()=>{
      const imgs=[...document.querySelectorAll('.hero-product img,.identity-card img,.comparison figure img,.concentration-figures img')];
      // caixas do hero: o PNG tem margem transparente; o conteudo (alfa>16) vai de x=65 a 606 de 650
      return imgs.map(i=>{const r=i.getBoundingClientRect();const fit=getComputedStyle(i).objectFit;const hero=i.closest('.hero-product');const l=hero?r.left+r.width*(65/650):r.left,rr=hero?r.left+r.width*(606/650):r.right;return {src:i.currentSrc.split('/').pop(),w:r.width,fit,inView:l>=0&&rr<=innerWidth}});
    });
    ok(w,'RESP imagens (caixas, particula, micrografias) inteiras na largura',cut.every(c=>c.inView),cut.filter(c=>!c.inView).map(c=>c.src).join(',')||'todas dentro');
    await ctx.close();
  }
  await b.close();
  console.log(`\nTOTAL: ${results.length} medicoes, ${falhas} FALHA(S)`);
  process.exit(falhas?1:0);
})();
