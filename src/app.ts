import express, { NextFunction , Request , Response } from 'express';
const app  = express();


app.use(express.json());
app.use(express.urlencoded({extended:true})) ; 

app.get("/api/post/:id" , (req:Request , res:Response)=>{


}) 


app.post("/api/post" , (req:Request , res:Response)=>{

}) ;

app.delete("/api/post/:id" , (req:Request , res:Response)=>{

    
})


app.use((err:any , req:Request , res:Response , next:NextFunction)=>{


    res.status(500).send({
        error:err
    })

})