const {chromium,webkit}=require('playwright');
const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url'),assert=require('assert/strict');
(async()=>{
 const browser=process.env.LUXDER_WEBKIT?await webkit.launch({headless:true}):await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const click=async(a,v)=>page.locator(`[data-action="${a}"]${v===undefined?'':`[data-value="${v}"]`}`).first().click();
 const ev=async(expr)=>page.evaluate(e=>window.eval(e),expr);
 const goMenu=async()=>{await click('home');await click('test');};
 const check=async(label)=>{assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow: '+label);assert(!/undefined|NaN/.test(await page.locator('#app').innerText()),'Bad value: '+label)};
 const shot=async(label)=>{await check(label);await page.screenshot({path:`qa/v2-${process.env.LUXDER_WEBKIT?'webkit':'edge'}-${label}.png`,fullPage:true})};
 fs.mkdirSync('qa',{recursive:true});
 for(const file of ['index-v2.html','talao-v2.html']){
  await page.goto(pathToFileURL(path.resolve(file)).href);
  assert.equal(await ev('convincePrompts.length'),100);assert.equal(await ev('new Set(convincePrompts.map(p=>p[0])).size'),100);assert.equal(await ev('new Set(convincePrompts.map(p=>p[1])).size'),100);
  assert.equal(await ev("new Set(Array.from({length:10},()=>drawIds('testbag',100,10)).flat()).size"),100);
  assert.equal(await ev('questions.length'),20);assert.equal(await ev('challenges.length'),30);assert.equal(await ev('grillBank.length'),20);
  await shot(file+'-home');await click('no');await click('home');await click('test');assert.equal(await page.locator('.mode-card').count(),4);await shot(file+'-menu');
  for(const language of ['pt','en']){
   await click('lang',language);await click('quiz-start');await click('romance-count',4);await click('romance-begin');
   for(let who=0;who<4;who++){await click('quiz-ready');for(let q=0;q<5;q++)await click('quiz-answer',who===3?1:0)}
   assert.equal(await ev('screen'),'quiz-result');assert.equal(await page.locator('.match-card').count(),6);assert.equal(await page.locator('.avatar-card').count(),4);
   assert.equal(await ev('pairMatch(0,1).percent'),100);assert.equal(await ev('pairMatch(0,3).percent'),0);assert(await ev('pairMatch(0,1).match'));assert(!await ev('pairMatch(0,3).match'));
   await shot(file+'-love-'+language);await click('quiz-prize');await check('love prize');await goMenu();
   await click('convince-start');await click('convince-count',3);await click('convince-begin');
   assert.equal(await ev('new Set(convince.ids).size'),10);const firstIds=await ev('convince.ids');
   for(let i=0;i<10;i++){
    if(i===0){await shot(file+'-convince-'+language);await click('convince-timer');assert(await ev('running'));await click('lang',language==='pt'?'en':'pt');assert(await ev('running'));await click('lang',language);await click('convince-delegate');}
    await click('convince-rate',['yes','no','skip'][i%3]);assert(!await ev('running'));await click('convince-next');
   }
   assert.equal(await ev('screen'),'convince-end');assert.equal(await ev('convince.results.length'),10);await click('convince-begin');const secondIds=await ev('convince.ids');assert(firstIds.every(i=>!secondIds.includes(i)));
   await click('convince-timer');await click('modes');assert(!await ev('running'));await click('grill-start');await click('grill-begin');
   for(let i=0;i<6;i++){
    if(i===5){await click('grill-skip');continue}
    await click('grill-guess',0);await click('grill-confirm',i%3);
    const expected=await ev('t(...grillBank[grill.ids[grill.index]][5+grill.actual])');assert((await page.locator('#app').innerText()).includes(expected));
    if(i===0)await shot(file+'-grill-'+language);await click('grill-next');
   }
   assert.equal(await ev('screen'),'grill-end');assert.equal(await ev('grill.results.length'),5);assert.equal(await ev('grill.skipped'),1);await click('social-prize');await check('grill prize');await goMenu();
  }
  // Original modes still work, including unequal teams, voting, timers, and rematch.
  await click('tester');await click('animal',2);await click('penalty');await click('penalty');await click('penalty');assert.equal(await ev('tester.bugs'),3);await goMenu();
  for(const [count,format] of [[2,'solo'],[3,'solo'],[3,'teams'],[4,'solo'],[4,'teams']]){
   await click('setup');await click('count',count);await click('format',format);await click('length',3);await click('start-game');const units=await ev('game.units.length');
   for(let i=0;i<units;i++){await click('question');await click('answer',i%3)}await click('vote-start');
   for(let r=0;r<3;r++){
    for(let i=0;i<count;i++){await click('vote-ready');await click('cast-vote',0)}await click('next-round');
    if(r<2)for(let i=0;i<units;i++)await click('challenge-done');
   }
   assert.equal(await ev('screen'),'prize');assert.equal(await ev('game.units[0].score'),3);await click('start-game');assert(await ev('game.units.every(u=>u.score===0)'));await goMenu();
  }
  await page.setViewportSize({width:320,height:740});await check('320 menu');
  for(const [action,kind] of [['quiz-start','love'],['convince-start','convince'],['grill-start','grill'],['setup','game']]){await click(action);await check('320 '+kind);await click('modes')}
  await page.setViewportSize({width:390,height:844});
  console.log(file+': 100 unique bilingual prompts; all 4 modes PT/EN; all 6 pairings; adaptive grill; 10-turn persuasion; no-repeat replay; timer cancellation; original formats; 320px PASS');
 }
 assert.deepEqual(errors,[]);console.log('0 JavaScript errors');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
