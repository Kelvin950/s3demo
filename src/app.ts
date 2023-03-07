import express, { NextFunction , Request , Response } from 'express';
import multer from 'multer';
const app  = express();


const storage =  multer.memoryStorage();
const upload =  multer({storage:storage}) ;


upload.single("image")

app.use(express.json());
app.use(express.urlencoded({extended:true})) ; 

app.get("/api/post/:id" , (req:Request , res:Response)=>{


}) 


app.post("/api/post" , (req:Request , res:Response)=>{
   
 console.log(req.body)

 res.end()
}) ;

app.delete("/api/post/:id" , (req:Request , res:Response)=>{


})


app.use((err:any , req:Request , res:Response , next:NextFunction)=>{


    res.status(500).send({
        error:err
    })

})


export {app};