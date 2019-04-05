import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as services from "./server";

let app = express()
let port = 3000

//Server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
http.createServer(
app).listen(port, ()=>{
    console.log('Server Ok')
});

//Routes
app.post('/create-rule', (req, res) => {
    console.log(req);
    services.createRule(req, res);
});
app.get('/list-rule', (req, res) => {
    services.listRules(req, res);
});
app.delete('/delete-rule/:id', (req, res) => {
    services.deleteRule(req, res);
})
app.get('/get-rules', (req, res) =>{
    services.getIntervals(req, res);
})