import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const calculaMediaPesoAlunos = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/media-peso', async (req, res)=>{
        try{
            const usuarios = await servico.calculaMediaPesoAlunos() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}