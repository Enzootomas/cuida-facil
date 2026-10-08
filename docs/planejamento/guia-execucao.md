# Guia de execução — Cuida Fácil

## Estrutura atual

A aplicação está em `cuida-facil-project/`. A pasta `frontend/` é uma reserva da estrutura inicial e ainda não contém a aplicação.

O package.json declara React 18, Vite 6 e Tailwind CSS 4. Os arquivos de interface utilizam TSX.
Não há backend para iniciar.

## Pré-requisitos

- Git para obter e atualizar o repositório.
- Node.js e npm compatíveis com as dependências do package-lock.json.
- Navegador e, opcionalmente, VS Code.

Confira as ferramentas no terminal:

```bash
git --version
node --version
npm --version
```

A versão de Node efetivamente validada pela equipe deverá ser registrada após a execução local.

## Primeiro acesso

No terminal, dentro da pasta em que deseja baixar o projeto:

```bash
git clone https://github.com/Enzootomas/cuida-facil.git
cd cuida-facil
git switch develop
cd cuida-facil-project
npm ci
npm run dev
```

Abra o endereço Local exibido pelo Vite no terminal. Use o endereço informado, pois a porta pode variar.
Para parar o servidor, pressione Ctrl+C.

O comando npm ci instala as versões do lockfile. Se houver incompatibilidade entre package.json e package-lock.json, registre e resolva a inconsistência com a equipe; não exclua o lockfile apenas para contornar o erro.

## Projeto já clonado

Com o terminal na raiz do repositório e sem alterações locais pendentes:

```bash
git status
git switch develop
git pull origin develop
cd cuida-facil-project
npm ci
npm run dev
```

Se git status mostrar trabalho local, faça um commit na sua branch de tarefa ou preserve as alterações antes de trocar de branch. Não descarte arquivos para atualizar o projeto.

## Build de produção

Na pasta cuida-facil-project:

```bash
npm run build
```

O script chama vite build. A configuração atual não define uma pasta de saída personalizada; a saída esperada é dist/.
A equipe deve conferir o resultado do comando antes do deploy.

Para visualizar o build localmente, após uma compilação bem-sucedida:

```bash
npx --no-install vite preview
```

Abra o endereço exibido no terminal. O package.json atual não possui um script chamado preview.

## Publicação na Vercel

Aplicação publicada: [Cuida Fácil](https://cuida-facil-qckjx199m-enzootomas-projects.vercel.app).

Configuração utilizada:

| Campo | Valor |
|---|---|
| Production Branch | `main` |
| Framework Preset | Vite |
| Root Directory | `cuida-facil-project` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

As tarefas são integradas em `develop`. Para publicar a versão revisada, abra e revise um Pull Request de `develop` para `main`. Confira o resultado do deployment na Vercel depois do merge.

O endereço registrado corresponde a um deployment específico. Prefira o domínio permanente de produção ao compartilhar atualizações futuras, depois de confirmá-lo no projeto.

### Verificação de acesso público

Abra o link em uma janela anônima, sem sessão da Vercel, e confira as telas, a navegação e os recursos. Se aparecer uma solicitação de login, confira **Settings → Deployment Protection** e a opção **Require Log In / Vercel Authentication**. Para esta demonstração pública, desative a proteção aplicável ao endereço compartilhado e salve a configuração.

Em 08/10/2026, o endereço registrado respondeu com HTTP 200 a uma requisição sem autenticação. Essa verificação confirma a disponibilidade do endereço, mas não substitui o teste das funcionalidades no navegador.

## Problemas comuns

| Sintoma | Conferência |
|---|---|
| npm não é reconhecido | Conferir instalação do Node.js e reabrir o terminal. |
| package.json não encontrado | Entrar em cuida-facil-project antes de executar npm. |
| Branch develop não encontrada localmente | Executar git fetch origin e tentar git switch develop. |
| Porta ocupada | Usar o endereço alternativo que o Vite exibir. |
| Falha de dependências ou build | Registrar a mensagem completa e conferir versões e lockfile. |
| Vercel informa que não encontrou a pasta build | Configurar Output Directory como dist e confirmar Root Directory como cuida-facil-project. |
| Link publicado solicita login na Vercel | Conferir Deployment Protection e testar o domínio de produção em janela anônima. |
| Recurso figma:asset não encontrado | Conferir o arquivo referenciado em src/assets; existe um resolvedor para esse prefixo no vite.config.ts. |

## Validação deste guia

Comandos conferidos por leitura do package.json e vite.config.ts. Enzo confirmou pelo terminal no Windows a instalação com npm ci e a inicialização do Vite com npm run dev. O terminal informou zero vulnerabilidades naquele momento. O build local e a navegação completa ainda não foram registrados.

O endereço publicado respondeu com HTTP 200 sem autenticação em 08/10/2026.

Registro a completar pela equipe:
- Sistema operacional: Windows (execução local informada por Enzo).
- Versão do Node e npm:
- Data e responsável:
- Resultado da instalação:
- Resultado do build:
- Resultado da navegação local:

## Uso de IA

Documento elaborado com auxílio de ChatGPT / Codex, com base nos arquivos do repositório.
