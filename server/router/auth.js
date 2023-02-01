const jwt =require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const User=require("../model/userSchema")


const Admission=require("../model/AdmissionSchema")

router.get('/',(req,res)=>{
    res.send(`hello  world router from auth file`);
});


//************************************using promise**************************
// router.post('/register', (req,res)=>{

//     const {name,email,phone,work,password,cpassword}=req.body;//get the usser insert data from the website
    
//     if(!name||!email||!phone||!work||!password||!cpassword){
//         return res.status(422).json({error:"plz filled all the detail"})
//     }
//     // console.log(req.body);
//     // res.json({message:req.body});
//     User.findOne({email:email}).then((userExist)=>{//to check the email is already exis or not
//         if(userExist){
//             return res.status(422).json({error:"emal already exist "});
//         }

//         const user=new User({name,email,phone,work,password,cpassword});//to save all the value
//         user.save().then(()=>{
//             res.status(201).json({message:"user register successfully"});
//         }).catch((err)=>{
//             res.status(500).json({error:"register failed"})//database error 
//         })
//     }).catch(err=>{
//         console.log(err);
//     });

router.post('/register', async (req,res)=>{

    const {name,email,phone,work,password,cpassword}=req.body;//get the user insert data from the website
    //get data
    
    if(!name||!email||!phone||!work||!password||!cpassword){//useStateto check validation
        return res.status(422).json({error:"plz filled all the detail"})
    }

    try{

        const userExist =await User.findOne({email:email});//to check the email is already exis or not
            if(userExist){
                return res.status(422).json({error:"emal already exist "});
            }else if(password!=cpassword){
                return res.status(422).json({error:"password are not matching"});

            }else{
                const user=new User({name,email,phone,work,password,cpassword});//if user is new so get the data from web page
                //password hashing code  here

                await user.save();//to save all the new value in database
                res.status(201).json({message:"user register succssfully"});
            }  
    }catch(err){
        console.log(err);
    }
});


// router.post('/register', async (req,res)=>{

//     const {name,email,phone}=req.body;//get the user insert data from the website
//     //get data
    
//     if(!name||!email||!phone){//useStateto check validation
//         return res.status(422).json({error:"plz filled all the detail"})
//     }

//     try{

//         const userExist =await Admission.findOne({email:email});//to check the email is already exis or not
//             if(userExist){
//                 return res.status(422).json({error:"emal already exist "});
//             }else if(password!=cpassword){
//                 return res.status(422).json({error:"password are not matching"});

//             }else{
//                 const user=new Admission({name,email,phone});//if user is new so get the data from web page
//                 //password hashing code  here

//                 await user.save();//to save all the new value in database
//                 res.status(201).json({message:"user register succssfully"});
//             }  
//     }catch(err){
//         console.log(err);
//     }
// });



//admission detail

router.post('/admission', async (req,res)=>{

    const {name,email,phone}=req.body;//get the user insert data from the website
    //get data
    
    if(!name||!email||!phone){//useState to check validation
        return res.status(422).json({error:"plz filled all the detail"})
    }

    try{

        const userExist =await Admission.findOne({email:email});//to check the email is already exis or not
            if(userExist){
                return res.status(422).json({error:"emal already exist "});           

            }else{
                const detail=new Admission({name,email,phone});//if user is new so get the data from web page
                //password hashing code  here

                await detail.save();//to save all the new value in database
                res.status(201).json({message:"user register succssfully"});
            }  
    }catch(err){
        console.log(err);
    }
});

//login route

router.post('/signin', async (req,res)=>{

    try{
        let token;
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({error:"plz filled the data"});

        }
        const  userLogin= await User.findOne({email:email});
        // console.log(userLogin); 
        if(userLogin){
            //code to match the user enter password with data base record for login
        const  isMatch=await bcrypt.compare(password,userLogin.password)//to check the userlogin is same as user enter ppassword

        //to genertae authentication token using jwt
        token=await userLogin.generateAuthToken();

        console.log(token);

        res.cookie("jwtoken",token,{
            expires:new Date(Date.now() + 252920000),
            httpOnly:true
        });

        if(!isMatch){
            res.status(400).json({error:"user error"});

        }else{

          res. json({message:"user signin successfully"});
        }

        }else{
            res.status(400).json({error:"user error"});
        }

        
    }catch(err){
        console.log(err);
    }
});

//about us page location 
router.get('/about',authenticate ,(req,res) => {
    res.send(req.rootUser);
    // res.send("ho")
});


// get user data for contact us and home page
router.get('/getdata',authenticate,(req,res)=>{
    console.log(hello)
    res.send(req.rootUser);
})




module.exports=router;