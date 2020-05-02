const customExpress = require('./src/config/customExpress')
const database = require('./src/infraestrutura/conexao')
        
const app = customExpress()

app.listen(3000, () => console.log('Servidor rodando na porta 8002'))

