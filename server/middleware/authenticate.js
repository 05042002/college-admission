/* const { await } = require('await'); */
const jwt =require('jsonwebtoken');

/* const User=require("../middleware/authenticate"); */
const User=require("../model/userSchema");

// const SECRET_KEY=("./model/userSchema");
const Authenticate =async (req,res,next) =>{
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,SECRET_KEY='MYNAMEISSUNILLALJIGUPTAGANESHCHOWKGHATKOPARWEST');//we are checking the user data after checking wee get the data

        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});

        if(!rootUser){ throw new Error('user not found') }
        req.token=token;
        req.rootUser=rootUser;//using rootUser we get and store all the data in rootUser 
        req.userID=rootUser._id;//by calling id using rootUser we are able to fetch the data from database because all the data is store in rootUser that's why we are useing rootUser

        next();//if token match and data get then call the other function else it will stuck in this middleware
    } catch (err) {
        res.status(401).send('Unauthorized:no token provided');
        console.log(err);
        
    }

}
module.exports = Authenticate;