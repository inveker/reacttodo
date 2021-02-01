import express from 'express';
import path from "path";
import api from './api';
import db from "./db";
import bodyParser from "body-parser";



//Config
const PORT = 8000;
const APP_DIR = path.resolve(__dirname, '../../client/build/')
 
db().then(() => {
    const app = express();

    //Static host
    app.use(express.static(APP_DIR));

    //Body encoders
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Api
    app.use('/api', api);

    app.all('*', function(req, res){
        res.sendFile(APP_DIR+"/index.html");
    });


    //Run server
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});


