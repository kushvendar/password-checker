import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port=3000;
const app=express();
var pass="";
var userIsAuthorised = false;
app.use(bodyParser.urlencoded({extended:true}))

function passCheck(req,res,next){
pass=req.body["password"];
if(pass==="ILoveProgramming"){
    userIsAuthorised = true; 
}
next();
}

app.use(passCheck)

app.post("/check",(req,res)=>{
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
      } else {
        res.sendFile(__dirname + "/public/index.html");
        //Alternatively res.redirect("/");
      }
  
})

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/public/index.html");
    
  })

app.listen(port,()=>{
    console.log(`${port} busy on http request`)
})