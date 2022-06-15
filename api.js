const client = require('./connection.js')
const express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');
const app = express();
var fs = require('fs')
var js2xml = require('js2xml').Js2Xml
var xmlparser = require('express-xml-bodyparser');
// const xml2js =require('xml2js');
// const util = require('util');
// const parser = new xml2js.Parser();
app.use(xmlparser());
app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})
client.connect();
app.post('/interaction', (req, res)=> {
    console.log(req.body);
    const interact = req.body
    // console.log(interact.request.drugcode[0])
    // console.log(interact.request.diseasecode[0])
    // console.log(interact.request.type[0])
    let selectQuery = `select * from interactions where 
     drug_code = '${interact.request.drugcode[0]}' 
    and disease_code = '${interact.request.diseasecode[0]}' and type = '${interact.request.type[0]}'`
    
    client.query(selectQuery, (err, result)=>{
        if(!err){
           
            if(result.rowCount==0){
                
                console.log("not found")
                res.send("not found")
            }
            else{
            var convertToJS2xml = new js2xml("response",result.rows)
            res.send(convertToJS2xml.toString());
            console.log(convertToJS2xml.toString())
            }
        }
        else{
            console.log(err.message)
    }
    })
    client.end;
})



