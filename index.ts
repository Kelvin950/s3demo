import  {app} from './src/app'; 
import mongoose from 'mongoose'
import "dotenv/config"



mongoose.connect(process.env.mongo!).then((conn)=>{
    console.log(conn.connection.host) ;


     app.listen(3000, () => {
       console.log("server opened");
     });
}).catch((err)=>{console.log(err)})