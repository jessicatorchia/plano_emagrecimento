import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const listaNomesOrdenadoPorPeso = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/peso-ordenado', async (req, res)=>{
        try{
            const usuarios = await servico.listaNomesOrdenadoPorPeso() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}