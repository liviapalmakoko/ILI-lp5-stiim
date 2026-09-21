// Medidas do DOM do card da modelo, por largura, para docs/testes/modelo-aceites.py.
// Uso: node docs/testes/modelo-medidas.js <url> <rotulo> > docs/testes/modelo-medidas.json
// Tambem salva o print do bloco em docs/shots/modelo-<rotulo>-<w>.png.
const {chromium}=require(process.env.HOME+'/.npm-global/lib/node_modules/playwright');
const path=require('path');
const [url,rotulo]=process.argv.slice(2);
(async()=>{
  const b=await chromium.launch(); const out=[];
  for(const w of [1440,1280,1024,768,390]){
    const ctx=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1});
    const p=await ctx.newPage();
    await p.route(/track-ilikia|facebook|rdstation|rd\.services/,r=>r.abort());
    await p.goto(url,{waitUntil:'domcontentloaded'});
    await p.addStyleTag({content:'*{animation:none!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}.cookie-banner{display:none!important}.site-header{visibility:hidden}'});
    await p.evaluate(()=>document.querySelector('.application-grid').scrollIntoView());
    await p.waitForFunction(()=>[...document.querySelectorAll('.model-card img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:8000}).catch(()=>{});
    await p.waitForTimeout(300);
    const m=await p.evaluate(()=>{
      const r=e=>{const b=e.getBoundingClientRect();return {x:b.left,y:b.top,w:b.width,h:b.height}};
      const card=document.querySelector('.model-card'),word=document.querySelector('.model-card-word'),model=document.querySelector('.model-card-model');
      const cs=getComputedStyle(card);
      return {card:r(card),word:r(word),model:r(model),modelCx:parseFloat(cs.getPropertyValue('--model-cx')),natural:{word:word.naturalWidth+'x'+word.naturalHeight,model:model.naturalWidth+'x'+model.naturalHeight}};
    });
    m.w=w; out.push(m);
    const f=path.join(__dirname,'..','shots',`modelo-${rotulo}-${w}.png`);
    await (await p.$('.application-grid')).screenshot({path:f});
    console.error(w,'->',path.relative(process.cwd(),f),JSON.stringify(m.natural));
    await ctx.close();
  }
  await b.close();
  console.log(JSON.stringify(out,null,1));
})();
