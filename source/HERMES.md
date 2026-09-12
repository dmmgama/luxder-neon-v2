# Hermes — continuar a Luxder

## Estado e decisões vigentes

App principal: https://dmmgama.github.io/luxder-neon-v2/ . Repo: https://github.com/dmmgama/luxder-neon-v2 . Manter este endereço; o utilizador pediu uma única app, com seleção de modos e visual no mesmo ecrã. Os outros endereços encaminham para este; consultar `ENDERECOS-LUXDER.md` para a lista e tags de arquivo.

O pedido final para o Grill substitui a primeira implementação: todas as perguntas têm **duas opções de toque**. São uma pergunta inicial e quatro seguimentos por pessoa, com dois participantes à vez. A resposta anterior escolhe o próximo ramo. Os seguimentos nunca exigem fala ou justificação. É possível passar o dossier. As piadas de «app bloqueada» são modais breves, com saída por um toque/Escape, sem perda de estado.

Regras do produto: PT/EN em todos os modos; recusa, saída e passar sem pressão; castigos nos criadores; bicicleta virtual e ciência amorosa explicitamente fictícias. Botões grandes e uso com uma mão. Seletor Néon/Talão preserva a partida. A roda permite escolher jogos elegíveis e confirmar o resultado antes de jogar.

## Editar e construir

Trabalhar em `source/`:

1. Conteúdo dos jogos e 100 prompts: `content-v2.js`.
2. Mecânicas dos quatro modos e visuais: `modes-v2.js`, `modes-v2.css`.
3. App única, seletor visual e roda: `unified.js`, `unified.css`.
4. Grill de dois botões e pausas cómicas: `grill-taps.js`, `grill-taps.css`. Estas funções substituem as funções antigas do Grill durante a geração; editar aqui para alterar o comportamento atual.
5. Executar `python build-v2.py` e depois `python build-unified.py`. O resultado final é `source/luxder.html`; copiar para `index.html` na raiz. Cada HTML final contém todos os recursos necessários.

`source/index.html` é a base histórica da v1 usada pelo gerador, não é a app publicada. `source/index-v2.html` e `source/talao-v2.html` são saídas intermédias. `ENTREGA.md` e `ENTREGA-v2.md` são registos históricos, substituídos por este documento para o estado atual.

## Testar

Dentro de `source/`, com Playwright e os browsers disponíveis, executar `node verify-final.cjs`; repetir com `LUXDER_WEBKIT=1` para WebKit. A instalação local original usava `NODE_PATH=C:\Users\JSJ\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules`.

O teste final cobre PT/EN, quatro modos, pares, pontuação, 100 prompts únicos, cancelamento de temporizadores, todos os quatro resultados da roda, exclusão de modos, troca de língua/visual durante atividade, movimento reduzido, Grill binário e restauro exato do estado após o modal. Critério: zero erros de JavaScript e sem transbordo horizontal a 320 px. As capturas em `qa/` são evidência de browser; não houve teste num iPhone físico.

## Publicar

Atualizar `index.html`, as fontes e documentação na repo principal existente. Fazer commit/push para `main`. Verificar a publicação do GitHub Pages. Se não arrancar automaticamente, `gh api --method POST repos/dmmgama/luxder-neon-v2/pages/builds` solicita uma publicação. Concluir apenas quando o endereço principal devolver HTTP 200 com a nova versão e os três endereços antigos chegarem à mesma app. Preservar as tags de arquivo.

O checkout temporário usado nesta sessão foi `C:\Users\JSJ\AppData\Local\Temp\luxder-neon-v2-publish`. A cópia de trabalho e registo solicitada pelo utilizador é `V:\Hermes-Projects\dating-fun`; não depende da permanência desse checkout temporário.
