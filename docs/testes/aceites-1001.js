// Aceites da rodada 01/10/2026 (card 86ah19vv5, pedido da Mari de 30/09), medidos no DOM via Playwright/Chromium.
// Uso: node docs/testes/aceites-1001.js [url]      (padrao http://127.0.0.1:8765/)
// 1. hero sem o anel dourado (borda do .hero::before = 0 em todas as larguras)
// 2. form: sem eyebrow "Acesso profissional", sem kicker "STIIM x ILIKIA", titulo novo, sem o subtitulo
// 3. form intacto: mesmos ids/names/endpoint (so comparamos ids e names com a lista fixa abaixo)
const {chromium}=require(process.env.HOME+'/.npm-global/lib/node_modules/playwright');
const URL=process.argv[2]||'http://127.0.0.1:8765/';
const WIDTHS=[1440,1280,1024,768,390,360];
const CAMPOS='nome:nome,email:email,tel:telefone,doc:cpf_cnpj,reg:registro';
let falhas=0,total=0;
function ok(w,item,passa,detalhe){total++;if(!passa)falhas++;console.log(`${String(w).padStart(4)}  ${passa?'PASSA':'FALHA'}  ${item}  ${detalhe||''}`)}
(async()=>{
  const b=await chromium.launch();
  for(const w of WIDTHS){
    const ctx=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1});
    const p=await ctx.newPage();
    await p.route(/track-ilikia|facebook|rdstation|rd\.services/,r=>r.abort());
    await p.goto(URL,{waitUntil:'domcontentloaded'});
    const r=await p.evaluate(()=>{
      const cs=getComputedStyle(document.querySelector('.hero'),'::before');
      const contato=document.querySelector('#contato');
      const head=contato.querySelector('.form-heading');
      const txt=contato.innerText;
      const campos=['nome','email','tel','doc','reg'].map(id=>{const e=document.getElementById(id);return e?`${id}:${e.name}`:`${id}:AUSENTE`}).join(',');
      return {
        borda:cs.borderTopWidth+' '+cs.borderTopStyle,
        brilho:cs.backgroundImage.slice(0,40),
        eyebrow:contato.querySelectorAll('.eyebrow').length,
        acesso:/acesso profissional/i.test(txt),
        kicker:!!contato.querySelector('.form-kicker')||/STIIM\s*×\s*ILIKIA/i.test(txt),
        filhos:[...head.children].map(e=>e.tagName+':'+e.textContent.trim()),
        sub:/Receba o conteúdo técnico e fale com a equipe responsável/.test(txt),
        h2:contato.querySelector('.contact-copy h2')?.textContent.trim(),
        campos,
        formId:document.querySelector('#contato form')?.id,
      };
    });
    ok(w,'HERO sem anel dourado (borda 0 no .hero::before)',/^0px/.test(r.borda)||/none/.test(r.borda),`borda=${r.borda}`);
    ok(w,'HERO brilho radial mantido',r.brilho.startsWith('radial-gradient'),r.brilho);
    ok(w,'FORM sem eyebrow "Acesso profissional"',r.eyebrow===0&&!r.acesso,`eyebrows=${r.eyebrow}`);
    ok(w,'FORM sem "STIIM × ILIKIA"',!r.kicker);
    ok(w,'FORM cabecalho = so "Fale com os nossos consultores"',r.filhos.length===1&&r.filhos[0]==='H3:Fale com os nossos consultores',r.filhos.join(' | '));
    ok(w,'FORM sem "Receba o conteúdo técnico..."',!r.sub);
    ok(w,'FORM titulo da coluna mantido',r.h2==='Conheça STIIM em profundidade',r.h2);
    ok(w,'FORM ids/names intactos',r.campos===CAMPOS&&r.formId==='leadForm',`${r.formId} ${r.campos}`);
    await ctx.close();
  }
  await b.close();
  console.log(`\nTOTAL: ${total} medicoes, ${falhas} FALHA(S)`);
  process.exit(falhas?1:0);
})();
