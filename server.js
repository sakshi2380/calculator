console.log("heello");
const express= require("express")
const mongose = require("mongoose")
const Product = require("./models/productModel")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/',(req,res)=>{
    res.send("hello ")
})
app.get('/i',(req,res)=>{
    res.send("hello blog ")
})
app.get('/product',async(req,res)=>{
    try {
        const product = await Product.find({})
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.get('/product/:id',async(req,res)=>{
    try {
        const{id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/product',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.put('/product/:id',async(req,res)=>{
try {
    const{id} = req.params
    const products = await Product.findByIdAndUpdate(id,req.body)
    if(!products){
        return res.status(404).json({message: `cannot find any product with ID ${id}`})
    }
    const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

} catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
}
})
app.delete('/product/:id',async(req,res)=>{
    try {
        const{id} = req.params
        const products = await Product.findByIdAndDelete(id)
        if(!products){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message}) 
    }
})

mongose.set("strictQuery",false)
mongose.connect('mongodb+srv://root:root@nodeapi.yai8srs.mongodb.net/node-api?retryWrites=true&w=majority')
.then((data)=>{
    console.log("connected db");
    console.log(`Mongodb connected with server: ${data.connection.host}`);
    app.listen(3000,()=>{
        console.log("node api is running");
    })
})
.catch((err)=>{
    console.log(err);
})
