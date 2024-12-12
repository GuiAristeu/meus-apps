## Requisitos

#### Operações básicas

1. Um programa deve ter as seguintes propriedades básicas:
   - Nome
   - Site
   - Descrição
   - Categoria
   - Gratuito
   - Comentários (opcional)
2. Um usuário deve conseguir inserir um novo programa com as propriedades básicas
3. Os programas devem ser armazenados em uma estrutura de array salva em memória
4. Ao inserir um programa, este deve receber um ID gerado automaticamente
5. Um usuário deve conseguir obter todos os programas
6. Um usuário deve conseguir obter um programa por Id
7. Um usuário deve conseguir editar um programa
8. Um usuário deve poder excluir um programa

### Outras funcionalidades de input/output

1. Ao inserir um programa, deve ser adicionado neste um campo chamado "inseridoEm" que deve ser preenchido automáticamente com a data de inserção do programa (data atual)
2. Ao inserir um programa, deve ser adicionado neste um campo chamado "idUsuario", que terá sempre o valor 0
3. Ao obter um programa, o campo "inseridoEm" deve ser formatado para exibir a data no formato dia/mes/ano
4. Ao obter um programa, o campo "gratuito" deve ter como valor "Sim" ou "Não"
5. Ao tentar adicionar um software sem uma das 5 propriedades básicas, o usuário deve receber um erro dizendo que a entrada é inválida e listando quais propriedades estão faltando. 
6. As sequintes propriedades de um programa não podem ser editadas e se forem passadas na requisição devem ser desconsideradas:
   - id
   - inseridoEm
   - idUsuario
