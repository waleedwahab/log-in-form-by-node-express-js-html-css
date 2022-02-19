const express = require("express");
const { stat } = require("fs");
const app = express();
const hbs = require("hbs");
const path = require("path");
//this boty will use for getting data from html page i.e form
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const Register =require("./models/registers")
require("./db/conn");
const port = process.env.PORT||3006
const template_path = path.join(__dirname, "../templates/views");
//const static_path = (path.join(__dirname, "../public"));
//console.log(path.join(__dirname, "../public"));
//app.use(express.static( static_path ));  
// we also nedd here to register partials 
const partials_path = path.join(__dirname, "../templates/partails");
hbs.registerPartials(partials_path);
app.set("view engine","hbs");   
app.set("views", template_path);
app.post("/register", async(req, res)=>
{
try{
    const password = req.body.password;
    const cpassword =req.body.cpassword;
    if (password===cpassword)
    {
  const registeremployee= new Register(
      {
        firstname:req.body.fname,
        lastname:req.body.lastname,
        email:req.body.email,
        gender:req.body.gender,
        phone:req.body.phone,
        age:req.body.age,
        password:req.body.password,
        confirmpassword:req.body.cpassword

      }
  )
    
    const registered = await registeremployee.save();
    res.status(201).render("index");
    }
    else
    {
        res.send ("password are not matching");
    }


}
catch(e)
{
res.status(400).send(e);
}
})
app.get("/", (req ,res)=>
{
res.render("index");
});

app.get("/register", (req ,res)=>
{
    res.render("register");
})
app.listen(port,()=>
{
console.log(`server is running at port no ${port}`);
})
