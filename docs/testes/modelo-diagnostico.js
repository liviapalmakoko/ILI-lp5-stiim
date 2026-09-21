// Diagnostico e prints do bloco "Um unico produto, multiplas possibilidades" (card da modelo).
// Uso: node docs/testes/modelo-diagnostico.js <url> <rotulo antes|depois> [hairTopFrac] [letras json]
// Sai: docs/shots/modelo-<rotulo>-<w>.png e medidas por largura (object-fit/position, card, respiro).
const {chromium}=require(process.env.HOME+'/.npm-global/lib/node_modules/playwright');
const path=require('path');
const [url,rotulo,hairFracArg]=process.argv.slice(2);
const HAIR_FRAC=hairFracArg?parseFloat(hairFracArg):null; // topo do cabelo / altura natural da imagem
(async()=>{
  const b=await chromium.launch();
  for(const w of [1440,1280,1024,768,390]){
    const ctx=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1});
    const p=await ctx.newPage();
    await p.route(/track-ilikia|facebook|rdstation|rd\.services/,r=>r.abort());
    await p.goto(url,{waitUntil:'domcontentloaded'});
    await p.addStyleTag({content:'*{animation:none!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}.cookie-banner{display:none!important}.site-header{visibility:hidden}'});
    await p.evaluate(()=>document.querySelector('.application-grid').scrollIntoView());
    await p.waitForFunction(()=>[...document.querySelectorAll('.model-card img')].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:8000}).catch(()=>{});
    await p.waitForTimeout(300);
    const m=await p.evaluate(HAIR_FRAC=>{
      const card=document.querySelector('.model-card'),img=document.querySelector('.model-card img');
      const c=card.getBoundingClientRect(),r=img.getBoundingClientRect(),cs=getComputedStyle(img);
      // janela visivel da imagem natural dentro do box (object-fit cover/contain/fill)
      const nw=img.naturalWidth,nh=img.naturalHeight; let s,visW,visH,offX=0,offY=0;
      if(cs.objectFit==='cover'){s=Math.max(r.width/nw,r.height/nh);visW=r.width/s;visH=r.height/s;
        const [px,py]=cs.objectPosition.split(' ').map(v=>parseFloat(v)/100);offX=(nw-visW)*px;offY=(nh-visH)*py;}
      else{s=r.width/nw;visW=nw;visH=nh;}
      const hairTop=HAIR_FRAC!=null?(HAIR_FRAC*nh-offY)*s:null;
      return {objectFit:cs.objectFit,objectPosition:cs.objectPosition,card:{w:+c.width.toFixed(0),h:+c.height.toFixed(0)},img:{w:+r.width.toFixed(0),h:+r.height.toFixed(0),nat:nw+'x'+nh},janela:{x0:+offX.toFixed(0),y0:+offY.toFixed(0),w:+visW.toFixed(0),h:+visH.toFixed(0)},escala:+s.toFixed(4),respiroCabeca:hairTop!=null?+hairTop.toFixed(1):null,src:img.currentSrc.split('/').pop()};
    },HAIR_FRAC);
    const f=path.join(__dirname,'..','shots',`modelo-${rotulo}-${w}.png`);
    await (await p.$('.application-grid')).screenshot({path:f});
    console.log(w,JSON.stringify(m),'->',path.relative(process.cwd(),f));
    await ctx.close();
  }
  await b.close();
})();
