import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const ordenaAlunosPorIdadeCresc = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/idade-ordenada', async (req, res)=>{
        try{
            const usuarios = await servico.ordenaAlunosPorIdadeCresc() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}