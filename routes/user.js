const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middlewares/user");



const userRouter = Router();


        userRouter.post("/signup" , async (req,res)=>{
            const {email,password,firstName,lastName} = req.body;
            // todo zod validation
            const hashedPassword = await bcrypt.hash(password , 10);
            try{
                await userModel.create({
                    email : email,
                    password : hashedPassword,
                    firstName : firstName,
                    lastName : lastName
                })
            }catch(e){
                res.status(400).json({
                    message: "User already exists"
                })
            }
            res.json({
                message: "User signed up successfully"
            })
        })
        userRouter.post("/signin" , async (req,res)=>{

            const { email , password } = req.body;
            const user = await userModel.findOne({
                email : email,
            });
            const passwordMatch = bcrypt.compare(password , user.password);

            if(user && passwordMatch){
                const token = jwt.sign({
                    id : user._id.toString(),
                }, JWT_USER_PASSWORD);
            // todo cookie logic here

                res.json({
                    token : token,
                    message: "User signed in successfully"
                })
            }else{
                res.status(403).json({
                    message: "User not found"
                })
            }


        })
        userRouter.post("/purchases" ,userMiddleware, async(req,res)=>{

            const userId = req.userId;
            const purchases = await purchaseModel.find({
                userId
            })
            const courseData = await courseModel.find({
                _id : {$in : purchases.map(x => x.courseId)}
            })
            res.json({
                purchases,
                courseData
            })
        })


module.exports  = {
    userRouter:userRouter
}