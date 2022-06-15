const client = require('./connection.js');
const express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})
client.connect();

app.post('/interaction', (req, res)=> {
    let insertQuery=`insert into interactions(description, drug_code, disease_code, type)
    select md5(random()::text),
           (random() * 999 + 1)::text,
           (random() * 49 + 1)::text, 
           (random() + 1)::int
    from generate_series(1,500000)`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})