const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
app.use(express.json())
// const mongoose = require(mongoose)

const Article = require("./models/Article")

mongoose.connect("mongodb+srv://mongoOne1:mongoOne1@mongoone11.ws8lhk3.mongodb.net/?appName=mongoOne11").then(()=>{
   console.log('Connected Successfully')
}).catch((error)=>{
 console.log('Error with connection with the DB',error)
})

app.get('/hello',(req,res)=>{
    res.send("Helo World")

})


app.get('/numbers/:number1/:number2',(req , res)=>{
   const num1=req.params.number1
    const num2=req.params.number2
    // console.log(req.params)
    console.log(num1+num2)
    const total = Number(num1)+Number(num2)
    res.send(`Total ${total}`)
})


app.get('/sayhello',(req , res)=>{
    console.log(req.body)
    // localhost:3000/sayhello?age=12
    console.log(req.query)

    res.json({
        name:req.body.name,
        Age:req.query.age,
        language:"Arabic",
    })

    res.send(`my name is :${req.body.name},${req.query.age}`)
})


app.get('/hi',(req,res)=>{
    // res.sendFile(__dirname +"/Views/test.html")
    res.render("test.ejs",{
        name:"othmane",
    })

})


app.post('/article', async (req,res)=>{
    const newArticle = new Article()
    newArticle.title=req.body.title;
    newArticle.body=req.body.body;
    newArticle.numberOfLikes=100000;
    await newArticle.save();
    res.json(newArticle);
})

app.get('/article',async(req,res)=>{
    let article = await Article.find()
    res.json(article)
    
})


app.get("/article/:articleId", async (req,res)=>{
    let id = req.params.articleId
    // try{
    const article = await Article.findById(id);
    res.json(article)
    // }catch(error){
    //     res.json('error',id)

    // }
})
app.delete("/article/:articleId", async (req,res)=>{
    let id = req.params.articleId
    // try{
    const article = await Article.findOneAndDelete(id);
    res.json(article)
    // }catch(error){
    //     res.json('error',id)
    // }
})

app.get("/allArticle", async(req,res)=>{
    let article =await Article.find()
    res.render("test.ejs",{
        Allarticle:article,
    })

})

app.listen(3000,()=>{
    console.log('Hi Im Posrt 3000')
})