const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Mehrankhan:Sahil12$@cluster0.fie9jfc.mongodb.net/paytm');

const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
});

const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    balance:{
        type:Number,
        required:true
    }
})
const User=mongoose.model('User',usersSchema);
const Account= mongoose.model('Account',accountSchema)

module.exports={
    User,
    Account
}