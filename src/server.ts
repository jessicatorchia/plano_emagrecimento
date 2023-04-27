import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { AppDataSource } from './data-source'
import UsuarioDB from './entity/usuario'
import { ServicoUsuario } from './dominio/servico/usuario'
import { calculaIMCUsuario } from './dominio/rotas/1_listar_calculaIMC'
import { listaAlunosComMesmoObjetivo } from './dominio/rotas/2_listar_listaAlunosComMesmoObj'
import { listaNomesAlunosOrdenado } from './dominio/rotas/3_listar_listaNomesAlunosOrdenados'
import { listaNomesOrdenadosPelaAltura } from './dominio/rotas/5_listar_listaAlunosAlturaOrdenada'
import { ordenaAlunosPorIdadeCresc } from './dominio/rotas/4_listar_listaAlunosPorIdadeCresc'
import { listaNomesOrdenadoPorPeso } from './dominio/rotas/6_listar_listaAlunosPesoOrdenado'
import { listaAlunosComObesidade } from './dominio/rotas/7_listar_listaAlunosComObesidade'
import { calculaMediaIdadeAlunos } from './dominio/rotas/8_listar_calculaMediaIdadeAlunos'
import { calculaMediaAlturaAlunos } from './dominio/rotas/9_listar_calculaMediaAlturaAlunos'
import { calculaMediaPesoAlunos } from './dominio/rotas/10_listar_calculaMediaPesoAlunos'
import { listaAlunosParaGanhoDeMassa } from './dominio/rotas/11_listar_listaAlunosGanhoDeMassa'


export async function createServer() {
    const site = express()                      
    site.use(bodyParser.json())    
    const port = 3000  

    const dataSource = await AppDataSource.initialize()
    const repositorioUsuario = dataSource.getRepository(UsuarioDB)
    const servicoUsuario = new ServicoUsuario(repositorioUsuario)
        
    calculaIMCUsuario(site, servicoUsuario)
    listaAlunosComMesmoObjetivo(site, servicoUsuario)
    listaNomesAlunosOrdenado(site, servicoUsuario)
    ordenaAlunosPorIdadeCresc(site, servicoUsuario)
    listaNomesOrdenadosPelaAltura(site, servicoUsuario)
    listaNomesOrdenadoPorPeso(site, servicoUsuario)
    listaAlunosComObesidade(site, servicoUsuario)
    calculaMediaIdadeAlunos(site, servicoUsuario)
    calculaMediaAlturaAlunos(site, servicoUsuario)
    calculaMediaPesoAlunos(site, servicoUsuario)
    listaAlunosParaGanhoDeMassa(site, servicoUsuario)
    listaAlunosParaGanhoDeMassa(site, servicoUsuario)

    const server = site.listen(port, () =>{
        console.log(`Example app listening on port ${port}`)
    })

    return { site, server }
}