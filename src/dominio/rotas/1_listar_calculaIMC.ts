import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const calculaIMCUsuario = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/:nome/imc', async (req, res)=>{
        try{
            const usuarios = await servico.calculaIMC(req.params.nome) 
            res.send(usuarios)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}