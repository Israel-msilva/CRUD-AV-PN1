const express = require('express');
//const { MongoClient } = require('mongodb');
const app = express();
const ObjectId = require('mongodb-legacy').ObjectId
const {MongoClient}= require('mongodb-legacy')
const uri = "mongodb+srv://dbUser:dbUser@cluster0.uucfqzh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("teste-db");
const collection = db.collection('crud');


 app.listen(3000, function(){
    console.log('o nosso servidor esta rodando na porta 3000')
 }) 

app.get('/',(req, res)=>{
    res.render('index.ejs')
})
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.post('/show',(req, res)=>{
   db.collection('crud').insertOne(req.body,(err,result)=>{
    if(err) return console.log(err)
    console.log("salvou no banco de dados mongodb")
    res.redirect('/show')
    db.collection('crud').find().toArray((err,results)=>{
        console.log(results)
    })
   })
})

//renderizar e retornar o conteúdo do nosso banco
app.get('/', (req, res) => {
    let cursor = db.collection('crud').find()
})

//renderizar e retornar o conteúdo do nosso banco
app.get('/show', (req, res) => {
    collection.find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', {crud: results})
    })
})

//criando a nossa rota e comandos para editar
app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    collection.find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('edit.ejs', {crud: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    collection.updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('Banco de dados atualizado')


    })
})
 app.route('/delete/:id')
 .get((req,res)=>{
    var id= req.params.id
    db.collection('crud').deleteOne({_id: ObjectId(id)}, (err, result)=>{
        if(err) return res.send(500,err)
        console.log('Deletando do nosso banco de dados!')
        res.redirect('/show')
    })
 })



