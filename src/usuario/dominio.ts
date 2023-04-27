export class Usuario{
    id?: number
    nome: string
    idade: number
    altura: number
    peso: number
    objetivo: string

    constructor(id:number|undefined, nome: string, idade: number, altura: number, peso: number, objetivo: string){
        this.id = id
        this.nome = nome
        this.idade =idade
        this.altura = altura
        this.peso = peso
        this.objetivo = objetivo

        if(!nome){
            throw new Error('Usuario precisa de nome')
        }
        if(!idade){
            throw new Error('Usuario precisa de idade')
        }
        if(!altura){
            throw new Error('Usuario precisa de altura')
        }
        if(!peso){
            throw new Error('Usuario precisa de peso')
        }
        if(!objetivo){
            throw new Error('Usuario precisa de objetivo')
        }
    }
}