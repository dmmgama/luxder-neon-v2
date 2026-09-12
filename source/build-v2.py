from pathlib import Path

base = Path('index.html').read_text(encoding='utf-8')
start = base.index('function quizView()')
end = base.index('const pairings=', start)
base = base[:start] + base[end:]
content = Path('content-v2.js').read_text(encoding='utf-8')
modes = Path('modes-v2.js').read_text(encoding='utf-8')
css = Path('modes-v2.css').read_text(encoding='utf-8')
base = base.replace('</style>', css + '\n</style>', 1)
base = base.replace('const pairings=', content + '\n' + modes + '\nconst pairings=', 1)
base = base.replace("const color=['#ddff00','#ff8ac4'][index]", "const color=['#ddff00','#ff8ac4','#a6dce8','#ffd69c'][index]")
base = base.replace("function render(){", "function render(){\n applyMode();")
base = base.replace("html=quizView();", "html=romanceView();")
base = base.replace(" $('#app').innerHTML=html;", """
 if(screen==='home')html=homeV2();
 if(screen==='modes')html=modesView();
 if(screen==='romance-setup')html=romanceSetupView();
 if(screen==='convince-setup')html=convinceSetupView();
 if(screen==='convince')html=convinceView();
 if(screen==='convince-reaction')html=convinceReaction();
 if(screen==='convince-end')html=convinceEndView();
 if(screen==='grill-intro')html=grillIntroView();
 if(['grill-guess','grill-confirm','grill-follow'].includes(screen))html=grillView();
 if(screen==='grill-end')html=grillEndView();
 $('#app').innerHTML=html;
""")
base = base.replace("buzz();switch(action){", "buzz();if(extraAction(action,v))return;switch(action){")
base = base.replace("case 'test':tester=", "case 'test':go('modes');break;\ncase 'tester':tester=")
base = base.replace("case 'home':quiz=", "case 'home':setMode('home');convince=null;grill=null;quiz=")
base = base.replace("case 'leave':quiz=", "case 'leave':setMode('home');convince=null;grill=null;quiz=")
base = base.replace("case 'setup':go('setup');", "case 'setup':setMode('game');go('setup');")
base = base.replace("if(quiz.q===3)", "if(quiz.q===quiz.questions.length)")
base = base.replace("quiz.turn===2?", "quiz.turn===quiz.count?")
base = base.replace("if(quiz.turn===2)", "if(quiz.turn===quiz.count)")
base = base.replace("t('As duas cobaias','Both volunteers')", "t('As cobaias do amor','The love lab volunteers')")
base = base.replace(":t('A tester','The tester');return", ":prizeOwner==='group'?t('Toda a gente','Everybody'):t('A tester','The tester');return")
base = base.replace("question:Math.floor(Math.random()*questions.length),challenge:Math.floor(Math.random()*challenges.length),pitch:Math.floor(Math.random()*pitches.length)", "question:drawIds('questions',questions.length,1)[0],challengeIds:drawIds('challenges',challenges.length,members.length),pitch:drawIds('pitches',pitches.length,1)[0]")
base = base.replace("challenges[(game.challenge+game.turn)%challenges.length]", "challenges[game.challengeIds[game.turn]]")
base = base.replace("p.style.width=(remaining/8*100)+'%'", "p.style.width=(remaining/(activeMode==='convince'?10:8)*100)+'%'")
base = base.replace("${back()}${eyebrow('O jogo da bicicleta'", "${back()}${modeArt('game')}${eyebrow('O jogo da bicicleta'")
# Mode navigation is an explicit action, alongside the always-available exit.
base = base.replace("<span class=\"pill\">${t('zero dados','zero data')}</span></div>`}", "<button class=\"exit\" data-action=\"modes\">${t('Modos ↗','Modes ↗')}</button></div>`}")
base = base.replace('<title>Luxder — Neon Playground</title>', '<title>Luxder v2 — Quatro maneiras de meter conversa</title>')
base = base.replace('id="other" href="talao.html"', 'id="other" href="talao-v2.html"')
Path('index-v2.html').write_text(base, encoding='utf-8')
receipt = base.replace('<body class="neon">', '<body class="receipt">').replace("const theme='neon';", "const theme='receipt';").replace('id="other" href="talao-v2.html"', 'id="other" href="index-v2.html"').replace('<title>Luxder v2 — Quatro maneiras de meter conversa</title>', '<title>Luxder v2 — Talão de Bar</title>')
Path('talao-v2.html').write_text(receipt, encoding='utf-8')
print('Built two standalone v2 HTML apps. V1 files untouched.')
