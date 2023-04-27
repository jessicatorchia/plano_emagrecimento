import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const listaAlunosComObesidade = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/obesidade', async (req, res)=>{
        try{
            const usuarios = await servico.listaAlunosComObesidade() 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}