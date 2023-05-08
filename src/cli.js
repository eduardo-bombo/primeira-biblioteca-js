// argv = valores de argumento
// argumento é como chamamos a informação que a gente passa através da linha de comando pra dentro do programa

import fs from 'fs';
import chalk from 'chalk';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(
            chalk.yellow('Lista validada'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou diretório não existe.'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}

processaTexto(caminho);