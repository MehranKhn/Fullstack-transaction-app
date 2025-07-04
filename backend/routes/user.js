const express = require("express");
const jwt = require("jsonwebtoken");
const key = require("../config");
const { User,Account } = require("../db"); // assuming db.js exports { User }
const userRouter = express.Router();
const z = require("zod");
const bcrypt=require('bcrypt');
const authMiddleware=require('../middleware');

// Zod schema
const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5).max(10),
});

// User validator
function ValidateUser(name, email, password) {
  const result = signupSchema.safeParse({ name, email, password });
  return result.success ? true : result.error.errors;
}

// Signup route
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  const isValid = ValidateUser(name, email, password);
  if (isValid === true) {
       const hashedPassword=await bcrypt.hash(password,10);
     
      const user=await User.create({name, email, password:hashedPassword})

       await Account.create({
        userId:user._id,
        balance:Math.floor(1+Math.random()*10000)
      })
      res.json({
        msg:"User created Successfully,navigating to the Login Page",
    });
    
  } 
      else {
        res.status(400).json({ error: "error ha chui baaya" });
      }
    }
    catch (e) {
      res.status(500).json({ error: e.message });
    } 
});

//SIGNIN ROUTE

userRouter.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    
    const user= await User.findOne({email});
    if(!user){
       return res.status(404).json({ msg: "User not found" })
    }

   const validatePassword=await bcrypt.compare(password,user.password);

   if(!validatePassword){
    return res.status(403).json({
        msg:"Invalid password"
    })
   }

    const token=jwt.sign({userId:user._id},key,{expiresIn:'3m'});
    res.status(200).json({
      userId:user._id,
      token:token
    });
})

// UPDTAE YOUR PASSWORD OR NAME  
  const updateBody=z.object({
    name:z.string().optional(),
    password:z.string().optional()
  })
  userRouter.put('/update',authMiddleware,async(req,res)=>{
        
         const {success}=updateBody.safeParse(req.body);
         if(!success){
            return res.status(411).json({
                msg:"Error while updating information"
            })
         }
         
         if(req.body.password){
              req.body.password=await bcrypt.hash(req.body.password,10);
         }

         const user= await User.findByIdAndUpdate(req.userId,req.body,{new:true})
           
           res.status(200).json({msg:"Updated Succesfully"});
         })


      //filter through the DataBase and return the matched doc's

         userRouter.get('/bulk',async(req,res)=>{
             const filter=req.query.filter||''
             const userId=req.query.userId
           try{
               const users=await User.find({
                 _id:{
                       $ne:userId
                 },
                 name:{
                   $regex:filter,
                   $options:'i'
                 }
               })
  
          res.json({
             users:users.map(user=>({
                    email:user.email,
                    name:user.name,
                    _id:user._id
              }))
          })
        }
        catch(e){
          res.status(404).json({msg:e.errors})
      }
  })

  userRouter.get('/me',authMiddleware,(req,res)=>{
         res.status(200).json({success:true});
  })
          
module.exports = userRouter;
