import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import instituicoesRoutes from './routes/instituicoesRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import atendimentosRoutes from './routes/atendimentosRoutes.js';
import doacoesRoutes from './routes/doacoesRoutes.js';
import recursosRoutes from './routes/recursosRoutes.js';
import voluntariosRoutes from './routes/voluntariosRoutes.js';
import eventosRoutes from './routes/eventosRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/instituicoes', instituicoesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/atendimentos', atendimentosRoutes);
app.use('/doacoes', doacoesRoutes);
app.use('/recursos', recursosRoutes);
app.use('/voluntarios', voluntariosRoutes);
app.use('/eventos', eventosRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('API do Conecta está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
