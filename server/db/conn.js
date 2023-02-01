const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/mernstack").then(()=>{
    console.log(`connection successfully`);
}).catch((err)=> console.log(`no connection`));