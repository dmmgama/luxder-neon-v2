const { chromium, webkit } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');
const assert = require('assert/strict');
(async()=>{
 const browser=process.env.LUXDER_WEBKIT ? await webkit.launch({headless:true}) : await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const click=async(a,v)=>page.locator(`[data-action="${a}"]${v===undefined?'':`[data-value="${v}"]`}`).first().click();
 const screen=async()=>page.evaluate(()=>window.eval('screen'));
 const choose=async(a,v)=>{await click(a,v)};
 const state=async()=>page.evaluate(()=>JSON.parse(JSON.stringify(window.eval('({screen,game,quiz,setup,running})'))));
 const overflow=async(label)=>{const dims=await page.evaluate(()=>({w:innerWidth,s:document.documentElement.scrollWidth}));assert(dims.s<=dims.w,`${label}: overflow ${JSON.stringify(dims)}`)};
 const vote=async(count)=>{for(let i=0;i<count;i++){await click('vote-ready');await click('cast-vote',0)}};
 fs.mkdirSync('qa',{recursive:true});
 for(const file of ['index.html','talao.html']){
  await page.goto(pathToFileURL(path.resolve(file)).href);
  await overflow('home '+file);await page.screenshot({path:`qa/${file}-home.png`,fullPage:true});
  await click('no');assert.equal(await screen(),'no');await click('home');
  await click('test');await click('animal',1);assert.equal(await screen(),'verdict');
  for(let i=0;i<5;i++)await click('penalty');assert.equal(await page.evaluate(()=>window.eval('tester.bugs')),5);
  await click('report');await click('tester-prize');assert.equal(await screen(),'prize');await click('home');
  for(const language of ['pt','en']){
   await click('lang',language);await click('quiz-start');
   for(let p=0;p<2;p++){await click('quiz-ready');for(let q=0;q<3;q++)await click('quiz-answer',(q+p)%3)}
   assert.equal(await screen(),'quiz-result');await overflow('quiz '+language+file);await page.screenshot({path:`qa/${file}-quiz-${language}.png`,fullPage:true});
   assert.equal((await state()).quiz.answers[0].length,3);await click('quiz-prize');assert.match(await page.locator('#app').innerText(),language==='pt'?/duas cobaias/i:/Both volunteers/i);await click('home');
  }
  for(const count of [2,3,4])for(const format of count===2?['solo']:['solo','teams']){
   await click('setup');await click('count',count);await click('format',format);await click('length',3);await overflow('setup');await click('start-game');
   const units=(await state()).game.units.length;
   for(let i=0;i<units;i++){await click('question');await click('answer',i%3)}
   await click('vote-start');await vote(count);assert.equal(await screen(),'round-result');
   for(let r=1;r<3;r++){
    await click('next-round');for(let i=0;i<units;i++){
     if(i===0&&r===1){await click('timer');await click('lang','pt');assert((await state()).running);await click('delegate');}
     await click('challenge-done');
    }
    await vote(count);assert.equal(await screen(),'round-result');
   }
   await click('next-round');assert.equal(await screen(),'prize');assert.equal((await state()).game.units[0].score,3);await overflow('prize');
   await click('start-game');assert((await state()).game.units.every(u=>u.score===0));await click('home');
  }
  await click('setup');await click('count',4);await click('format','teams');await click('pair',2);await click('length',1);await click('start-game');
  assert.deepEqual((await state()).game.units.map(x=>x.members),[[0,3],[1,2]]);
  for(let i=0;i<2;i++){await click('question');await click('answer',0)}await click('vote-start');
  for(let i=0;i<4;i++){await click('vote-ready');await click('cast-vote',i%2)}
  assert.equal((await state()).game.lastWinners.length,2);await click('next-round');await page.screenshot({path:`qa/${file}-prize.png`,fullPage:true});await click('home');
  for(const width of [320,375,430]){await page.setViewportSize({width,height:812});await overflow(file+' '+width);await click('setup');await overflow(file+' setup '+width);await click('home');}
  await page.setViewportSize({width:390,height:844});
  console.log(`${file}: PT/EN, tester, 5 penalty levels, questionnaire, all 2–4-player formats, 3 rounds, timer exit, teams, ties, replay, 320–430px PASS`);
 }
 assert.deepEqual(errors,[]);console.log('Browser errors: 0');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});


