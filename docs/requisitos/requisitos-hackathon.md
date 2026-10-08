# Requisitos do hackathon — Front-end

Esta é a referência da entrega acadêmica sem backend. Os documentos em `specs/001-cuida-facil/` descrevem também possibilidades de evolução e não tornam API, banco ou autenticação real obrigatórios nesta entrega. Os requisitos abaixo são compromissos a validar, não uma declaração de implementação concluída.

## 10 requisitos funcionais

| ID | Requisito | Referência no código |
|---|---|---|
| RF01 | O sistema deve apresentar problema, serviços e ação para iniciar. | `LandingPage.tsx` |
| RF02 | O sistema deve permitir escolher Usuário, Tutor ou Parceiro e encaminhar à área correspondente. | `Login.tsx` |
| RF03 | O sistema deve permitir preencher o cadastro e indicar campos obrigatórios inválidos. | `Login.tsx` |
| RF04 | O sistema deve exibir dados demonstrativos do perfil e refletir alterações válidas na interface. | `Profile.tsx` |
| RF05 | O sistema deve exibir opções fictícias, aplicar os filtros oferecidos e permitir selecionar um cuidador. | `FindCaregiver.tsx` |
| RF06 | O sistema deve exibir motoristas fictícios e suas informações de veículo e apoio. | `FindDriver.tsx` |
| RF07 | O sistema deve permitir preencher os dados exigidos na tela de agendamento, revisar e confirmar um pedido simulado. | `Appointment.tsx` |
| RF08 | O sistema deve exibir familiares demonstrativos e informações de acompanhamento na área do Tutor. | `TutorDashboard.tsx` |
| RF09 | O sistema deve permitir consultar e responder às solicitações de vínculo apresentadas na interface. | `ManageTutors.tsx / TutorRequests.tsx` |
| RF10 | O sistema deve permitir consultar e responder aos pedidos demonstrativos na área do Parceiro. | `PartnerRequests.tsx` |

## 10 requisitos não funcionais

| ID | Tema | Critério verificável |
|---|---|---|
| RNF01 | Responsividade | A 360, 768 e 1280 px, os fluxos principais devem permanecer utilizáveis sem rolagem horizontal que esconda ações. |
| RNF02 | Acessibilidade por teclado | Controles principais devem receber foco visível, ser acionáveis por teclado e ter nomes acessíveis; conferir labels de formulários. |
| RNF03 | Privacidade da demonstração | Exemplos e testes devem usar dados fictícios; a documentação deve informar ausência de autenticação segura e de contratação real. |
| RNF04 | Clareza | Mensagens de erro, confirmação e ausência de resultados devem estar em português e indicar a próxima ação possível. |
| RNF05 | Rastreabilidade | Cada RF deve possuir uma história, critérios de aceitação e referência ao componente correspondente. |
| RNF06 | Manutenibilidade | Telas e componentes reutilizáveis devem estar separados em arquivos identificáveis; conferir imports e reutilização no código. |
| RNF07 | Desempenho | Como meta proposta, medir três cargas no Chrome com cache desativado e rede sem limitação, no mesmo equipamento: mediana do LCP até 3 s. Registrar equipamento, versão e resultado; não declarar aprovação sem medição. |
| RNF08 | Compatibilidade | Percorrer os fluxos principais em Chrome, Edge e Firefox, registrando as versões e eventuais falhas impeditivas. |
| RNF09 | Reprodutibilidade | Em cópia limpa com pré-requisitos documentados, npm ci e npm run build devem terminar com sucesso e npm run dev deve servir a aplicação. |
| RNF10 | Acesso público | O endereço entregue deve usar HTTPS e abrir em janela anônima sem exigir login na Vercel; conferir também carregamento dos recursos. |

## Verificação

Registrar os resultados em [validação da entrega](../planejamento/validacao-entrega.md). Referências de arquivos indicam existência de componentes, não aprovação do comportamento. Rastreamento, perfis, pedidos e vínculos são demonstrativos; estado local não garante sincronização entre dispositivos.

Elaborado com auxílio de ChatGPT / Codex; revisão da equipe necessária.
