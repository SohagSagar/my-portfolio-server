const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors =require('cors');
require('dotenv').config();
const port= process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());
//user:my-portfolio
//pass:mdcHbMGRKg2WVpQF

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s5jet.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run =async()=>{
    try{
        await client.connect();
        console.log('db connected');
        const projectCollection = client.db('my-portfolio').collection('projects');

        app.get('/project-info',async(req,res)=>{
            const result=await projectCollection.find().toArray();
            res.send(result);
        })

        app.post('/project-info',async(req,res)=>{
            const data=req.body;
            const result= await projectCollection.insertOne(data);
            res.send(result);
        })

        app.get('/project-info/:id',async(req,res)=>{
            const id=req.params.id;
            const result=await projectCollection.findOne({_id:ObjectId(id)})
            res.send(result)
        })


    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('portfolio server is running')
});

app.listen(port,()=>{
    console.log('Portfolio server is running at', port);
})
