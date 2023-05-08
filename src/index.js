import fs from 'fs'; //lib fs (File System ou sistema de arquivos) nativa do Node
import chalk from 'chalk';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo.';
}
// para acessar o índice de um array e utilizar o valor como chave de um objeto (como em "captura[1]"), precisa englobar em colchetes
// para diferenciar as chaves {} de função para objeto, precisa englobar em parênteses

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório.'));
}

// promises com then()
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('Operação concluída.'));
    }
}

export default pegaArquivo;