const express=require('express');
const app=express();

const mongoose=require('mongoose');

const User=require('./model/userSchema');
const Admission=require('./model/AdmissionSchema');

require('./db/conn')

app.use(express.json())//to use the json in project and store the data in json format
//we link the router file to make our route easy
app.use(require('./router/auth'));

// var instance =new Razorpay({
//     Key_id:'rzp_test_S8yIpMTkLamkWo',
//     key_secret:'ERVVQa53PAOiDUjqCc6hW5Zb',
// });


app.get('/contact',(req,res)=>{
    res.send("hello")
});


// app.post('/create/orderId',(req,res)=>{
//     console.log("create orderId request",req.body);
//     var options={
//         amount:33333,
//         currency:"INR",
//         receipt:"order_rcptid_11"
//     };
//     instance.orders.create(options,function(err,order){
//         console.log(order);
//         res.send({orderId:order.id});
//     });
// })
app.get('/signin',(req,res)=>{
    res.send("llo")
});
app.get('/signup',(req,res)=>{
    res.send("hello")
});



app.listen(5000,()=>{
    console.log(`listining on port no 5000`);
});


