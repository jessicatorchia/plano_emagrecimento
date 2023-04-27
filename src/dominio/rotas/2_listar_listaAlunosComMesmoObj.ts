import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const listaAlunosComMesmoObjetivo = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/:objetivo/comum', async (req, res)=>{
        try{
            const usuarios = await servico.listaAlunosComMesmoObjetivo(req.params.objetivo) 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}