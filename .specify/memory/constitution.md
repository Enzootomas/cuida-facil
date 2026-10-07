# Constituição do CuidaFácil

## Princípios fundamentais

### I. Autonomia, dignidade e bem-estar
O produto deve promover a autonomia, a segurança, o bem-estar e o acesso simplificado a serviços de apoio, respeitando a dignidade e as necessidades de pessoas idosas e de pessoas que necessitam de auxílio. As funcionalidades devem estar alinhadas ao ODS 3 — Saúde e Bem-Estar e ao escopo do produto: apoio por cuidadores, transporte e acompanhamento de saúde.

### II. Acessibilidade e clareza como requisitos
A experiência deve priorizar pessoas idosas: textos legíveis, hierarquia visual clara, alvos de interação grandes e baixa complexidade cognitiva. A interface deve ser responsiva em desktop, tablet e dispositivos móveis. Ações devem fornecer feedback visual compreensível para sucesso, erro, carregamento e confirmação. Formulários devem apresentar labels explícitos, campos obrigatórios identificados e mensagens de validação claras.

### III. Privacidade, segurança e controle por perfil
Autenticação e autorização devem respeitar os perfis e suas permissões: Usuário, Tutor e Parceiro. O Usuário controla quais informações podem ser vistas pelo Tutor; a visualização e o acompanhamento pelo Tutor devem limitar-se às informações autorizadas. Informações de saúde são dados sensíveis e nunca podem ser expostas sem autorização. Senhas nunca podem ser armazenadas em texto puro. Erros técnicos não devem ser apresentados diretamente ao usuário final.

### IV. Limites claros para informações de saúde
O CuidaFácil não realiza diagnósticos médicos nem deve apresentar prestação de serviços, acompanhamento ou informação como recomendação médica. A interface e os fluxos devem manter essa distinção explícita. Funcionalidades relacionadas à saúde devem respeitar as permissões e os limites de acesso definidos pelo Usuário.

### V. Validação e confiabilidade
Entradas devem ser validadas no frontend e no backend. CPF, e-mail, telefone e demais dados pessoais devem receber validação adequada ao tipo de dado. Falhas e estados de validação devem ser comunicados com clareza, sem revelar detalhes técnicos internos nem tratar entradas inválidas como sucesso.

### VI. Modularidade, testabilidade e rastreabilidade
O código deve ser modular, legível e testável. Funcionalidades críticas devem possuir testes automatizados. Cada funcionalidade deve ser rastreável desde seu requisito até a implementação e os testes correspondentes. Mudanças devem preservar comportamentos existentes, salvo quando uma alteração de produto tiver sido esclarecida e registrada.

### VII. MVP e escopo justificado
O desenvolvimento deve priorizar um MVP funcional antes de funcionalidades secundárias. Não adicionar funcionalidades sem justificativa no produto. Quando houver uma decisão de produto que não esteja clara na especificação, não inventar uma solução: registrar a questão para esclarecimento em `/speckit.clarify` antes de assumir ou implementar o comportamento.

## Requisitos de qualidade

Toda especificação, implementação e revisão deve considerar acessibilidade, segurança, responsividade, manutenibilidade, testabilidade, desempenho adequado e clareza da experiência do usuário. Esses requisitos devem ser verificados nas superfícies afetadas por cada mudança, com testes proporcionais ao risco e à criticidade.

## Perfis e limites do produto

- **Usuário:** pessoa idosa ou pessoa que necessita de auxílio; pode solicitar serviços relacionados a cuidadores, transporte e acompanhamento de saúde.
- **Tutor:** familiar ou responsável; acompanha um ou mais Usuários e só pode visualizar informações autorizadas, acompanhar solicitações e auxiliar no uso dos serviços dentro dessas permissões.
- **Parceiro:** profissional ou prestador cadastrado que pode atuar como cuidador ou motorista de transporte adaptado.

Esses perfis e capacidades definem os limites conhecidos do produto. Detalhes de fluxos, regras de negócio ou permissões não determinados pela especificação devem ser esclarecidos em `/speckit.clarify`, não presumidos.

## Fluxo de desenvolvimento e critérios de conformidade

1. Relacionar cada mudança aos requisitos do produto e identificar os perfis e dados envolvidos.
2. Antes de implementar uma decisão de produto ambígua ou não especificada, registrar a questão para `/speckit.clarify` e aguardar esclarecimento.
3. Implementar primeiro o escopo necessário ao MVP, mantendo modularidade e evitando funcionalidades não justificadas.
4. Validar entradas nas camadas frontend e backend; revisar autorização, privacidade e feedback em todos os fluxos afetados.
5. Criar ou atualizar testes automatizados para funcionalidades críticas e manter a rastreabilidade entre requisito, implementação e teste.
6. Revisar acessibilidade, responsividade, clareza, tratamento de erros e desempenho adequado antes de considerar a mudança concluída.

## Governança

Esta constituição orienta especificações, implementação, testes e revisões do CuidaFácil. Em caso de conflito, os princípios de acessibilidade, privacidade, segurança, limites de saúde e controle de permissões não podem ser enfraquecidos por conveniência de implementação. Exceções e alterações de produto devem ser justificadas e registradas; questões de produto não especificadas devem seguir `/speckit.clarify`. Alterações nesta constituição devem atualizar sua versão e as datas abaixo.

**Versão**: 1.0.0 | **Ratificada**: 2026-10-07 | **Última alteração**: 2026-10-07
