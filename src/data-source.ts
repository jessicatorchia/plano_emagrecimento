import 'reflect-metadata'
import { DataSource } from 'typeorm'
import UsuarioDB from './entity/usuario'
import { CriarTabelaUsuario1682542394848 } from './migration/1682542394848-CriarTabelaUsuario'



export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    username: 'example',
    password: 'example',
    database: 'postgres',
    synchronize: false,
    logging: true,


    entities: [UsuarioDB
    ],


    migrations: [CriarTabelaUsuario1682542394848
    ],


    
    subscribers: [],
})
