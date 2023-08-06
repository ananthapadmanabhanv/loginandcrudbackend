import "reflect-metadata"
import { DataSource } from "typeorm"
import { Registration } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3031,
    username: "root",
    password: "ambuHB58",
    database: "registration",
    synchronize: true,
    logging: false,
    entities: [Registration],
    migrations: [],
    subscribers: [],
})
