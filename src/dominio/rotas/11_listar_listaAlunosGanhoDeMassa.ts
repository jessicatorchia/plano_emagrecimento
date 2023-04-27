import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const listaAlunosParaGanhoDeMassa = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/ganho-massa', async (req, res)=>{
        try{
            const usuarios = await servico.listaAlunosParaGanhoDeMassa() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}