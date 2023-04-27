import { Usuario } from "../servico/dominio";
import UsuarioDB from "../../entity/usuario";
import { Repository } from "typeorm";

const fs = require('fs')

interface UsuarioComIMC{
    id?: number
    nome: string
    idade: number
    altura: number
    peso: number
    objetivo: string
    IMC: number
}

export class ServicoUsuario {
    repositorioUsuario: Repository<UsuarioDB>

    constructor(repositorioUsuario: Repository<UsuarioDB>) {
        this.repositorioUsuario = repositorioUsuario
    }

    async ordenaCresc(coluna: string): Promise<Usuario[]> {
        const usuariosDB = await this.repositorioUsuario.find()

        return [...usuariosDB].sort(function (item1, item2) {
            if (item1[coluna] < item2[coluna]) {
                return -1
            }
            if (item1[coluna] > item2[coluna]) {
                return 1
            }
            return 0;
        })
    }

    async ordenaDecre(coluna: string): Promise<Usuario[]> {
        const usuariosDB = await this.repositorioUsuario.find()

        return [...usuariosDB].sort(function (item1, item2) {
            if (item1[coluna] < item2[coluna]) {
                return 1
            }
            if (item1[coluna] > item2[coluna]) {
                return -1
            }
            return 0;
        })
    }

    //1:
    async calculaIMC(nome: string): Promise<number> {
        const usuarioDB = await this.repositorioUsuario.findOne({
            where: {
                nome: nome,
            }
        })

        if (!usuarioDB) {
            throw new Error('Usuario não encontrado')
        }

        if (usuarioDB.nome === nome) {
            return Number(((usuarioDB.peso / (usuarioDB.altura) ** 2)).toFixed(2))
        }
    }

    //2:
    async listaAlunosComMesmoObjetivo(objetivo: string): Promise<Usuario[]> {
        const usuariosDB = await this.repositorioUsuario.find()

        const usuariosComMesmoObjetivo: Usuario[] = []

        for (let i = 0; i < usuariosDB.length; i++) {
            const usuarioAtual = usuariosDB[i]
            if (usuarioAtual.objetivo === objetivo) {
                usuariosComMesmoObjetivo.push(usuarioAtual)
            }
        }
        return usuariosComMesmoObjetivo

    }

    //3:


    async listaNomesAlunosOrdenado(): Promise<Usuario[]> {

        const usuariosOrdenados = await this.ordenaCresc('nome')
        const nomesUsuariosOrdenados = []

        for (let i = 0; i < usuariosOrdenados.length; i++) {
            const usuarioAtual = usuariosOrdenados[i]
            nomesUsuariosOrdenados.push(usuarioAtual)
        }
        return nomesUsuariosOrdenados
    }

    //4:
    async ordenaAlunosPorIdadeCresc(): Promise<Usuario[]> {

        const usuariosOrdenadosPorIdade = await this.ordenaCresc('idade')
        const nomesUsuariosOrdenadosPorIdade = []

        for (let i = 0; i < usuariosOrdenadosPorIdade.length; i++) {
            const usuarioAtual = usuariosOrdenadosPorIdade[i]

            nomesUsuariosOrdenadosPorIdade.push(usuarioAtual)
        }
        return nomesUsuariosOrdenadosPorIdade
    }

    //5:
    async listaNomesOrdenadosPelaAltura(): Promise<Usuario[]> {
        const usuariosOrdenadosPorAltura = await this.ordenaDecre('altura')

        const nomesUsuariosOrdenados = []

        for (let i = 0; i < usuariosOrdenadosPorAltura.length; i++) {
            const usuarioAtual = usuariosOrdenadosPorAltura[i]
            nomesUsuariosOrdenados.push(usuarioAtual)
        }
        return nomesUsuariosOrdenados
    }

    //6:
    async listaNomesOrdenadoPorPeso(): Promise<Usuario[]> {
        const ordenaUsuariosPorPesoCresc = await this.ordenaCresc('peso')

        const nomesUsuariosOrdenados = []

        for (let i = 0; i < ordenaUsuariosPorPesoCresc.length; i++) {
            const alunoAtual = ordenaUsuariosPorPesoCresc[i]
            nomesUsuariosOrdenados.push(alunoAtual)
        }
        return nomesUsuariosOrdenados
    }
    //7:

    async listaAlunosEIMC(): Promise<UsuarioComIMC[]> {
        const usuariosDB = await this.repositorioUsuario.find()

        const usuariosEIMC = []
        for (let i = 0; i < usuariosDB.length; i++) {
            const usuarioAtual = usuariosDB[i]
            const imc = Number(((usuarioAtual.peso / (usuarioAtual.altura) ** 2)).toFixed(2))
            usuariosEIMC.push({
                id: usuarioAtual.id,
                nome: usuarioAtual.nome,
                idade: usuarioAtual.idade,
                altura: usuarioAtual.altura,
                peso: usuarioAtual.peso,
                objetivo: usuarioAtual.objetivo,
                IMC: imc
            })
        }
        return usuariosEIMC
    }

    async listaAlunosComObesidade(): Promise<UsuarioComIMC[]> {

        const usuariosComIMC = await this.listaAlunosEIMC()

        const usuariosObesos = []
        for (let i = 0; i < usuariosComIMC.length; i++) {
            const usuarioAtual = usuariosComIMC[i]
            const IMCUsuarioAtual = usuariosComIMC[i].IMC
            if (IMCUsuarioAtual >= 30) {
                usuariosObesos.push(usuarioAtual)
            }
        }
        return usuariosObesos
    }

    //8:
    async calculaMediaIdadeAlunos(): Promise<number> {
        const usuariosDB = await this.repositorioUsuario.find()

        let somatorioDasIdades = 0

        for (let i = 0; i < usuariosDB.length; i++) {
            const idadeAtual = usuariosDB[i].idade
            somatorioDasIdades = somatorioDasIdades + idadeAtual
        }

        return Number((somatorioDasIdades / (usuariosDB.length)).toFixed(0))
    }

    //9:
    async calculaMediaAlturaAlunos(): Promise<number> {
        const usuariosDB = await this.repositorioUsuario.find()

        let somatorioDasAlturas = 0

        for (let i = 0; i < usuariosDB.length; i++) {
            const alturaAtual = usuariosDB[i].altura
            somatorioDasAlturas = somatorioDasAlturas + alturaAtual
        }

        return Number((somatorioDasAlturas / (usuariosDB.length)).toFixed(2))
    }

    //10:
    async calculaMediaPesoAlunos(): Promise<number> {
        const usuariosDB = await this.repositorioUsuario.find()

        let somatorioDosPesos = 0

        for (let i = 0; i < usuariosDB.length; i++) {
            const pesoAtual = usuariosDB[i].peso
            somatorioDosPesos = somatorioDosPesos + pesoAtual
        }

        return Number((somatorioDosPesos / (usuariosDB.length)).toFixed(2))
    }

    //11:
    async listaAlunosParaGanhoDeMassa(): Promise<Usuario[]> {
        const usuariosDB = await this.repositorioUsuario.find()

        const usuariosParaGanhoDeMassa: Usuario[] = []

        for (let i = 0; i < usuariosDB.length; i++) {
            const usuarioAtual = usuariosDB[i]
            if (usuarioAtual.objetivo === "ganhar massa muscular") {
                usuariosParaGanhoDeMassa.push(usuarioAtual)
            }
        }
        return usuariosParaGanhoDeMassa
    }

    //12: 
    async transformaParaJSON(nomeArquivo: string): Promise<void>{
        const usuariosDB = await this.repositorioUsuario.find()

        fs.writeFileSync(nomeArquivo, JSON.stringify(usuariosDB, null,2))
        const leArquivo = fs.readFileSync(nomeArquivo, 'utf-8')
        const conteudo = JSON.parse(leArquivo)
    
        return conteudo
    }
}