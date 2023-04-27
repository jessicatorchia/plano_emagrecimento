import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const calculaMediaAlturaAlunos = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/media-altura', async (req, res)=>{
        try{
            const usuarios = await servico.calculaMediaAlturaAlunos() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}