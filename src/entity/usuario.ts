import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('p_usuario')
export default class UsuarioDB {

    @PrimaryGeneratedColumn()
        id: number

    @Column()
        nome: string

    @Column()
        idade: number

    @Column()
        altura: number

    @Column()
        peso: number

    @Column()
        objetivo: string
}