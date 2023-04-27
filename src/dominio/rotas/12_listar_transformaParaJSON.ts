import { Express } from 'express'
import { ServicoUsuario } from '../servico/usuario'


export const transformaParaJSON = (site: Express, servico: ServicoUsuario)=>{
    site.get('/usuario/:nomeArquivo', async (req, res)=>{
        try{
            const conteudo = await servico.transformaParaJSON(req.params.nomeArquivo) 
            res.send(conteudo)
        } catch(erro){
            console.error(erro)
            res.status(500)
            res.send(erro.message)
        }
    })
}