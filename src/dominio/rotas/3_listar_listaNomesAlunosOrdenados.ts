import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const listaNomesAlunosOrdenado = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/nome-ordenado', async (req, res)=>{
        try{
            const usuarios = await servico.listaNomesAlunosOrdenado() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}