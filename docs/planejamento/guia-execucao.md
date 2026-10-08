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

## Orientação para publicação

Ao configurar hospedagem de site estático:
- Diretório da aplicação: cuida-facil-project.
- Instalação: npm ci.
- Build: npm run build.
- Saída relativa ao diretório da aplicação: dist.

A plataforma e a URL pública ainda precisam ser confirmadas pela equipe. Confira navegação e carregamento de recursos no endereço publicado.

## Problemas comuns

| Sintoma | Conferência |
|---|---|
| npm não é reconhecido | Conferir instalação do Node.js e reabrir o terminal. |
| package.json não encontrado | Entrar em cuida-facil-project antes de executar npm. |
| Branch develop não encontrada localmente | Executar git fetch origin e tentar git switch develop. |
| Porta ocupada | Usar o endereço alternativo que o Vite exibir. |
| Falha de dependências ou build | Registrar a mensagem completa e conferir versões e lockfile. |
| Recurso figma:asset não encontrado | Conferir o arquivo referenciado em src/assets; existe um resolvedor para esse prefixo no vite.config.ts. |

## Validação deste guia

Comandos conferidos por leitura do package.json e vite.config.ts. A instalação, a execução e o build não foram executados na elaboração deste documento.

Registro a completar pela equipe:
- Sistema operacional:
- Versão do Node e npm:
- Data e responsável:
- Resultado da instalação:
- Resultado do build:
- Resultado da navegação local:

## Uso de IA

Documento elaborado com auxílio de ChatGPT / Codex, com base nos arquivos do repositório.
