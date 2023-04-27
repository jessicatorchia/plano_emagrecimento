import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const calculaMediaIdadeAlunos = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/media-idade', async (req, res)=>{
        try{
            const usuarios = await servico.calculaMediaIdadeAlunos() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}