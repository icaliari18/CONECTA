
import conexao from './database/conexao.js';

try {
    const [resultado] = await conexao.query('SELECT 1');

    console.log('Conexão com o MySQL realizada com sucesso!');
    console.log(resultado);

} catch (erro) {
    console.error('Erro ao conectar com o MySQL:', erro.message);

} finally {
    await conexao.end();
}