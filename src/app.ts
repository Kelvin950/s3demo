import express, { NextFunction , Request , Response } from 'express';
import multer from 'multer';
import { S3Client , PutObjectCommand , GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config" ; 
import mongoose, { Schema }  from 'mongoose';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const app  = express();


const storage =  multer.memoryStorage();
const upload =  multer({storage:storage}) ;



const post= new Schema({
  name:String , 

  image:String
}) ;

const POST = mongoose.model("POST" , post) ; 

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS!,
    secretAccessKey: process.env.s3_SECRET!,
  },
  region:process.env.BUCKET_REGION!
});

app.use(express.json());
app.use(express.urlencoded({extended:true})) ; 

app.get("/api/post/:id" ,async (req:Request , res:Response)=>{

const post = await  POST.findById(req.params.id);

  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME!,
    Key: post?.image ,
      
  };

const command = new GetObjectCommand(getObjectParams);
const url = await getSignedUrl(s3 , command, { expiresIn: 3600 });

res.send({
  post , imageURL:url
})

}) 


app.post("/api/post" , upload.single("image") ,async (req:Request , res:Response)=>{
   
 console.log(req.body)
console.log(req.file)

const params = {
  Bucket: process.env.BUCKET_NAME!,
  Key: req.file?.originalname + new Date().toLocaleDateString("en-GB"),
  Body: req.file?.buffer,
  ContentType: req.file?.mimetype,
};

const command =  new PutObjectCommand(params) ; 
 await s3.send(command)
 

 const newPost = new POST({
   image: req.file?.originalname + new Date().toLocaleDateString("en-GB"),
   name: req.body.name
 });
 

 await newPost.save();
 res.send({
  newPost
 })
}) ;

app.delete("/api/post/:id" ,async (req:Request , res:Response)=>{

  const post = await POST.findById(req.params.id) 
   const getObjectParams = {
     Bucket: process.env.BUCKET_NAME!,
     Key: post?.image,
   };

   const command= new  DeleteObjectCommand(getObjectParams);
  await s3.send(command) ; 

  await  POST.findByIdAndDelete(req.params.id);

  res.send("deleted");


})


app.use((err:any , req:Request , res:Response , next:NextFunction)=>{


    res.status(500).send({
        error:err
    })

})


export {app};