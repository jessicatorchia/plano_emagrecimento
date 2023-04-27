import { Usuario } from "./dominio"

describe('Usuario', ()=>{
    describe('constructor', ()=>{
        it('Deve construir com sucesso um usuario caso todos os parametros sejam validos', async ()=>{
            const usuario = new Usuario(
                1,
                'Fulano',
                30,
                1.70,
                75,
                'ganhar massa muscular'
            )

            expect(usuario).toEqual({
                id: 1,
                nome: 'Fulano',
                idade: 30,
                altura: 1.70,
                peso: 75,
                objetivo: 'ganhar massa muscular'
            })
        })

        it('deve disparar um erro caso o usuario não receba um nome', ()=>{
            expect.assertions(1)
            try{
                new Usuario(
                    1,
                    undefined,
                    30,
                    1.70,
                    75,
                    ''
                )
            }catch(error){
                expect(error).toEqual(new Error('Usuario precisa de nome'))
            }
        })

        it('deve disparar um erro caso o usuario não receba uma idade', ()=>{
            expect.assertions(1)
            try{
                new Usuario(
                    1,
                    'Fulano',
                    undefined,
                    1.70,
                    75,
                    ''
                )
            }catch(error){
                expect(error).toEqual(new Error('Usuario precisa de idade'))
            }
        })

        it('deve disparar um erro caso o usuario não receba altura', ()=>{
            expect.assertions(1)
            try{
                new Usuario(
                    1,
                    'Fulano',
                    30,
                    undefined,
                    75,
                    ''
                )
            }catch(error){
                expect(error).toEqual(new Error('Usuario precisa de altura'))
            }
        })
       
        it('deve disparar um erro caso o usuario não receba peso', ()=>{
            expect.assertions(1)
            try{
                new Usuario(
                    1,
                    'Fulano',
                    30,
                    1.70,
                    undefined,
                    ''
                )
            }catch(error){
                expect(error).toEqual(new Error('Usuario precisa de peso'))
            }
        })

        it('deve disparar um erro caso o usuario não receba objetivo', ()=>{
            expect.assertions(1)
            try{
                new Usuario(
                    1,
                    'Fulano',
                    30,
                    1.70,
                    75,
                    undefined
                )
            }catch(error){
                expect(error).toEqual(new Error('Usuario precisa de objetivo'))
            }
        })
    })
})

