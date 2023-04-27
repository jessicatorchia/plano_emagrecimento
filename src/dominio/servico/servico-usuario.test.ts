import { AppDataSource } from "../../data-source";
import UsuarioDB from "../../entity/usuario";
import { ServicoUsuario } from "./usuario";

let dataSource

describe('ServicoUsuario', ()=>{
    beforeAll(async ()=>{
        dataSource = await AppDataSource.initialize()
    })

    //1:
    describe('calculaIMC', ()=>{
        it('Deve retornar o resultado do imc do aluno passado', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 40
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 2
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const imcUsuario = await servico.calculaIMC('Fulano3')

            expect(imcUsuario).toEqual(18.75)
        })
    })

    //2:
    describe('listaAlunosComOMesmoObjetivo', ()=>{
        it('Deve retornar uma lista com os usuarios com o mesmo objetivo', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 30
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 30
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuarios = await servico.listaAlunosComMesmoObjetivo('ganhar massa muscular')

            expect(usuarios).toEqual([{
                id:usuarioDB.id,
                nome:"Fulano",
                idade: 30,
                altura: 1,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 30,
                altura: 2,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            }])
        })
    })

    //3:
     
     describe('listaNomesAlunosOrdenados', ()=>{
        it('Deve retornar uma lista com os usuarios ordenados pelo nome', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano3'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 30
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano1'
            usuarioDB3.idade = 30
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuarios = await servico.listaNomesAlunosOrdenado()

            expect(usuarios).toEqual([{
                id:usuarioDB3.id,
                nome:"Fulano1",
                idade: 30,
                altura: 3,
                peso: 75,
                objetivo: 'perder peso' 
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 30,
                altura: 2,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB.id,
                nome:"Fulano3",
                idade: 30,
                altura: 1,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            }])
        })
    })   
    
    //4:
    describe('listaAlunosOrdenadosPorIdade', ()=>{
        it('Deve retornar uma lista com os usuarios ordenados pela idade Crescente', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano3'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 20
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuarios = await servico.ordenaAlunosPorIdadeCresc()

            expect(usuarios).toEqual([{
                id:usuarioDB3.id,
                nome:"Fulano3",
                idade: 15,
                altura: 3,
                peso: 75,
                objetivo: 'perder peso' 
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 20,
                altura: 2,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB.id,
                nome:"Fulano3",
                idade: 30,
                altura: 1,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            }])
        })
    })

    //5:
    describe('listaAlunosOrdenadosPorAlturaDecre', ()=>{
        it('Deve retornar uma lista com os usuarios ordenados pela altur decrescente', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 20
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuarios = await servico.listaNomesOrdenadosPelaAltura()

            expect(usuarios).toEqual([{
                id:usuarioDB3.id,
                nome:"Fulano3",
                idade: 15,
                altura: 3,
                peso: 75,
                objetivo: 'perder peso' 
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 20,
                altura: 2,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB.id,
                nome:"Fulano",
                idade: 30,
                altura: 1,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            }])
        })
    })

    //6:
    describe('listaAlunosOrdenadosPorPesoCresc', ()=>{
        it('Deve retornar uma lista com os usuarios ordenados por peso crescente', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 60
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 20
            usuarioDB2.altura = 2
            usuarioDB2.peso = 40
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 30
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuarios = await servico.listaNomesOrdenadoPorPeso()

            expect(usuarios).toEqual([{
                id:usuarioDB3.id,
                nome:"Fulano3",
                idade: 15,
                altura: 3,
                peso: 30,
                objetivo: 'perder peso' 
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 20,
                altura: 2,
                peso: 40,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB.id,
                nome:"Fulano",
                idade: 30,
                altura: 1,
                peso: 60,
                objetivo: 'ganhar massa muscular'
            }])
        })
    })

    //7:
    describe('listaAlunosComObesidade', ()=>{
        it('Deve retornar uma lista com os usuarios com IMC maior que 30', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 2
            usuarioDB.peso = 60
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 20
            usuarioDB2.altura = 1
            usuarioDB2.peso = 150
            usuarioDB2.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 30
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuarios = await servico.listaAlunosComObesidade()

            expect(usuarios).toEqual([{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 20,
                altura: 1,
                peso: 150,
                objetivo: 'perder peso',
                IMC: 150
            }])
        })
    })

    //8:
    describe('calculaMediaIdadeAlunos', ()=>{
        it('Deve retornar o valor da média da idade dos alunos', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 40
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const mediaIdadeUsuarios = await servico.calculaMediaIdadeAlunos()

            expect(mediaIdadeUsuarios).toEqual(28)
        })
    })

    //9:
    describe('calculaMediaAlturaAlunos', ()=>{
        it('Deve retornar o valor da média das alturas dos alunos', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 40
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const mediaAlturaUsuarios = await servico.calculaMediaAlturaAlunos()

            expect(mediaAlturaUsuarios).toEqual(2)
        })
    })

    //10:
    describe('calculaMediaPesoAlunos', ()=>{
        it('Deve retornar o valor da média dos pesos dos alunos', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 65
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 40
            usuarioDB2.altura = 2
            usuarioDB2.peso = 60
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 15
            usuarioDB3.altura = 3
            usuarioDB3.peso = 100
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const mediaAlturaUsuarios = await servico.calculaMediaPesoAlunos()

            expect(mediaAlturaUsuarios).toEqual(75)
        })
    })

    //11:
    describe('listaAlunosParaGanhoDeMassa', ()=>{
        it('Deve retornar os alunos com o objetivo de ganhar massa', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 30
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 30
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)

            const usuariosGanharMassa = await servico.listaAlunosParaGanhoDeMassa()

            expect(usuariosGanharMassa).toEqual([{
                id:usuarioDB.id,
                nome:"Fulano",
                idade: 30,
                altura: 1,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 30,
                altura: 2,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            }])
        })
    })
    
    //12:
    describe('trnasformaParaJSON', ()=>{
        it('Deve trnasformar um array de obj em um arquivo JSON', async()=>{
            const repositorio = dataSource.getRepository(UsuarioDB)
            const servico = new ServicoUsuario(repositorio)

            await repositorio.query(`delete from p_usuario`)

            const usuarioDB = new UsuarioDB()
            usuarioDB.nome = 'Fulano'
            usuarioDB.idade = 30
            usuarioDB.altura = 1
            usuarioDB.peso = 75
            usuarioDB.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB)

            const usuarioDB2 = new UsuarioDB()
            usuarioDB2.nome = 'Fulano2'
            usuarioDB2.idade = 30
            usuarioDB2.altura = 2
            usuarioDB2.peso = 75
            usuarioDB2.objetivo = 'ganhar massa muscular' 
            await repositorio.save(usuarioDB2)

            const usuarioDB3 = new UsuarioDB()
            usuarioDB3.nome = 'Fulano3'
            usuarioDB3.idade = 30
            usuarioDB3.altura = 3
            usuarioDB3.peso = 75
            usuarioDB3.objetivo = 'perder peso' 
            await repositorio.save(usuarioDB3)


            const arquivoJSON = await servico.transformaParaJSON('./usuarios.json')

            expect(arquivoJSON).toEqual([{
                id:usuarioDB.id,
                nome:"Fulano",
                idade: 30,
                altura: 1,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB2.id,
                nome:"Fulano2",
                idade: 30,
                altura: 2,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            },{
                id:usuarioDB3.id,
                nome:"Fulano3",
                idade: 30,
                altura: 3,
                peso: 75,
                objetivo: 'perder peso' 
            }])
        })
    })
    
})