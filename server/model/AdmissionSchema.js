const mongoose=require('mongoose');

const AdmissionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
    

})

const Admission =mongoose.model('Admission',AdmissionSchema);

module.exports=Admission;

