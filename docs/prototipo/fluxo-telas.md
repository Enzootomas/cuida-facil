# Protótipo e fluxo de telas

[Protótipo no Figma](https://www.figma.com/make/AYo2pdm4wNnkSP7RbWTsuI/Mobile-App-for-Caregiver-Matching). O link foi registrado pela equipe. A quantidade de telas e a abertura sem permissão ainda devem ser conferidas no Figma; o inventário abaixo corresponde ao código, não comprova 10 telas no protótipo.

## Inventário de interfaces no código

| Tela | Componente | Papel |
|---|---|---|
| Apresentação | LandingPage | Entrada |
| Identificação e seleção de perfil | Login | Entrada |
| Início do usuário | Home | Usuário |
| Busca de cuidadores | FindCaregiver | Usuário |
| Busca de motoristas | FindDriver | Usuário |
| Agendamento | Appointment | Usuário |
| Perfil | Profile | Usuário |
| Painel do tutor | TutorDashboard | Tutor |
| Perfil do parceiro | PartnerProfile | Parceiro |
| Mensagens | Messages | Perfis demonstrativos |
| Solicitações de tutor | TutorRequests | Tutor |
| Gestão de tutores | ManageTutors | Usuário |
| Pedidos do parceiro | PartnerRequests | Parceiro |

## Fluxo de navegação

Apresentação → identificação/perfil → Home (Usuário), TutorDashboard (Tutor) ou PartnerProfile (Parceiro).

Usuário: Home → busca de cuidador ou motorista → seleção → agendamento. Perfil, mensagens e gestão de tutores complementam a jornada. Tutor e Parceiro possuem suas áreas e solicitações. A seleção de telas é controlada pelo estado do App.tsx; não equivale a rotas independentes por URL.

## Componentes principais

Cards de profissionais, botões, campos, seletores, mensagens de feedback e componentes reutilizáveis em components/ui. O App.tsx conecta as interfaces e passa callbacks para navegação e atualização de estado.

## Adaptação responsiva

Validar a 360, 768 e 1280 px: formulários e cards devem reorganizar-se, textos permanecer legíveis e ações continuar acessíveis. Registrar resultados em ../planejamento/validacao-entrega.md. Não há evidência de validação completa nesta documentação.

## Evidências a concluir

- [ ] Abrir o Figma sem exigir permissão do professor.
- [ ] Identificar pelo menos 10 telas e registrar seus nomes ou capturas.
- [ ] Conferir conexões do fluxo e adaptação responsiva no protótipo.
- [ ] Comparar o protótipo com a versão entregue.

Documento elaborado com auxílio de ChatGPT / Codex a partir do App.tsx e do link registrado pela equipe.
