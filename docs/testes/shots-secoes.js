// Shots recortados por seção. Uso: node docs/testes/shots-secoes.js <url> <rotulo> [larguras]
// Ex.: node docs/testes/shots-secoes.js http://127.0.0.1:8765/ antes 1440,390
// Sai em docs/shots/0918/<secao>-<rotulo>-<w>.png (DPR 1 para economizar contexto).
const {chromium}=require(process.env.HOME+'/.npm-global/lib/node_modules/playwright');
const path=require('path');
const OUT=path.join(__dirname,'..','shots','0918');
const SECOES={
  hero:'.hero',
  tecnologia:'.technology-grid',
  comparacao:'.comparison',
  distribuicao:'.particle-distribution',
  mecanismo:'.mechanism',
  aplicacao:'.application-grid',
  personalizacao:'.application-insights',
};
(async()=>{
  const [url,rotulo,ws]=process.argv.slice(2);
  const widths=(ws||'1440,390').split(',').map(Number);
  const only=process.env.SECOES?process.env.SECOES.split(','):Object.keys(SECOES);
  const b=await chromium.launch();
  for(const w of widths){
    const ctx=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1});
    const p=await ctx.newPage();
    await p.route(/track-ilikia|facebook|rdstation|rd\.services/,r=>r.abort());
    await p.goto(url,{waitUntil:'domcontentloaded'});
    await p.addStyleTag({content:'*{animation:none!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}.cookie-banner{display:none!important}'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)});
    await p.waitForTimeout(800);
    for(const k of only){
      const el=await p.$(SECOES[k]); if(!el){console.log(w,k,'SELETOR NAO ENCONTRADO');continue}
      await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(250);
      // o header fixo entra por cima de qualquer secao rolada; fora do hero ele sai do shot
      await p.evaluate(k=>{document.querySelector('.site-header').style.visibility=k==='hero'?'':'hidden'},k);
      const f=path.join(OUT,`${k}-${rotulo}-${w}.png`);
      await el.screenshot({path:f}); console.log(w,k,'->',path.relative(process.cwd(),f));
    }
    await ctx.close();
  }
  await b.close();
})();
