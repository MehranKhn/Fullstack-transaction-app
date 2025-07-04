const express=require('express');
const authMiddleware = require('../middleware');
const mongoose=require('mongoose');

const {Account}=require('../db');
const app=express()

const router=express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
     try{

         const account=await Account.findOne({userId:req.userId})
     
         if(account){
             res.status(200).json({balance:account.balance});
         }
         else{
            res.status(404).json({msg:"user doesn't exist"})
         }
     }
     catch(e){
        res.status(404).json({msg:"DB error"})
     }
})

router.post('/transfer',authMiddleware,async (req,res)=>{

    const session=await mongoose.startSession();

    session.startTransaction();

    const {to,amount}=req.body;
    try{
        
        const senderAccount=await Account.findOne({userId:req.userId}).session(session);
    
        if(!senderAccount||senderAccount.balance<amount){
            await session.abortTransaction();
           return res.status(404).json({msg:"Insufficient Balance!"})
        }
        
        const receiverAccount=await Account.findOne({userId:to}).session(session);
    
        if(!receiverAccount){
            await session.abortTransaction();
          return res.status(404).json({msg:"Invalid Account!"})
        }
    
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);

        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
        
        await session.commitTransaction();
        await session.endSession();
        res.status(200).json({msg:"Transfer Successfull!"})
    }
    catch(e){
        await session.abortTransaction();
        await session.endSession();
        return res.status(400).json({msg:"DB error"})
    }
})
module.exports=router;

