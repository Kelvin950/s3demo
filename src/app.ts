import express, { NextFunction , Request , Response } from 'express';
import multer from 'multer';
import { S3Client , PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config"
const app  = express();


const storage =  multer.memoryStorage();
const upload =  multer({storage:storage}) ;


const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS!,
    secretAccessKey: process.env.s3_SECRET!,
  },
  region:process.env.BUCKET_REGION!
});

app.use(express.json());
app.use(express.urlencoded({extended:true})) ; 

app.get("/api/post/:id" , (req:Request , res:Response)=>{


}) 


app.post("/api/post" , upload.single("image") ,async (req:Request , res:Response)=>{
   
 console.log(req.body)
console.log(req.file)

const params = {
    Bucket:process.env.BUCKET_NAME!,
    Key:req.file?.originalname , 
    Body:req.file?.buffer ,
    ContentType:req.file?.mimetype
}

const command =  new PutObjectCommand(params) ; 
 await s3.send(command)
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