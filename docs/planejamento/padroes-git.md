# Padrões básicos de Git — Cuida Fácil

## Branches

| Branch | Uso |
|---|---|
| main | Versão final. Não recebe alterações diretas durante o trabalho. |
| develop | Integração das entregas da equipe. |
| feature/nome-da-tarefa | Nova funcionalidade. Exemplo: feature/solicitar-corrida. |
| fix/nome-da-correcao | Correção. Exemplo: fix/validacao-destino. |
| docs/nome-do-documento | Documentação. Exemplo: docs/requisitos. |

Use letras minúsculas, sem espaços ou acentos, e separe palavras com hífen.
Crie as branches de tarefa a partir da develop. Uma tarefa deve ter um responsável para reduzir conflitos.

## Commits

Formato: `tipo: descricao curta`.

| Tipo | Quando usar | Exemplo |
|---|---|---|
| feat | Nova funcionalidade | feat: adiciona selecao de acompanhante |
| fix | Correção de erro | fix: impede envio sem destino |
| style | Ajuste visual | style: ajusta formulario no celular |
| docs | Documentação | docs: adiciona requisitos funcionais |
| chore | Configuração ou organização | chore: configura projeto frontend |

Faça commits quando concluir uma alteração coerente e verificável.
Não use mensagens vagas como "alterações" ou "atualização".
Não crie commits vazios, repetidos ou mudanças artificiais para atingir a quantidade mínima.
O mínimo de 30 commits é da equipe, conforme o enunciado fornecido. A validade na avaliação depende das regras do período do hackathon.

## Identificação de cada integrante

Cada pessoa deve trabalhar com sua própria conta.
Antes de commitar pelo terminal, configure a identidade neste repositório:

```bash
git config user.name "Seu nome"
git config user.email "Seu email associado ao GitHub"
```

É possível usar o endereço noreply exibido nas configurações de e-mail do GitHub.
Não copie a identidade de outro integrante.

Confira a configuração:

```bash
git config user.name
git config user.email
git log -1 --format=fuller
```

Ao editar pelo site, o GitHub registra o commit usando a conta conectada.
Abrir um Pull Request não torna a pessoa autora dos commits de outros integrantes.

## Fluxo de trabalho

Com o repositório já clonado e sem alterações locais pendentes:

```bash
git switch develop
git pull origin develop
git switch -c feature/solicitar-corrida
```

Após realizar e verificar sua alteração, adicione somente os arquivos da tarefa:

```bash
git status
git add caminho/do/arquivo
git commit -m "feat: adiciona formulario de corrida"
git push -u origin feature/solicitar-corrida
```

Substitua o nome da branch, o caminho e a mensagem pelos dados da sua tarefa.

1. Abra um Pull Request da branch de tarefa para develop.
2. Descreva o que mudou, como foi verificado e o card relacionado.
3. Peça a outro integrante para revisar.
4. Após a revisão, integre usando merge commit para preservar os commits individuais.
5. Atualize o card no Projects conforme o andamento.

Não use squash se a intenção for preservar todos os commits individuais da tarefa.
Não use force push nas branches compartilhadas.

## Revisão simples

Antes de integrar, confirme:
- A alteração funciona e não quebra a navegação existente.
- O comportamento corresponde à tarefa e aos requisitos aplicáveis.
- A interface foi conferida em celular e desktop, quando relevante.
- Não há senhas, tokens ou dados pessoais reais nos arquivos.
- A documentação foi atualizada quando necessário.

## Entrega final

A integração de develop na main será feita por Pull Request quando a equipe decidir publicar a versão final.
A proteção da main precisa ser configurada no GitHub; este documento, sozinho, não bloqueia alterações.

## Uso de IA

Este guia foi elaborado com auxílio de ChatGPT / Codex e deve ser revisado pela equipe.
