require('dotenv').config();


import express from 'express';
import cors from 'cors';
import './socket';
import {routes} from "./routes";
import {DataSource} from "typeorm"
import exp from "node:constants";


const dataSource = new DataSource({
    type: 'mariadb',
    host: process.env.HOST,
    port: 23306,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [
        "src/entities/*.ts"
    ],
    logging: false,
    synchronize: true

});

dataSource.initialize().then(() => {
        const app = express();
        app.use(express.json());
        app.use(cors({
            origin: ['http://localhost:3000',
                'http://localhost:4200',
                'http://localhost:5000',
                'http://localhost:5173'
            ]
        }))

        routes(app);

        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    }
)

