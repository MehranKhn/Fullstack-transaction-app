const mongoose = require('mongoose');
const { mongoURI } = require('./config');
mongoose.connect(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
