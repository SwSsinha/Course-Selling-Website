const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middlewares/admin");



const adminRouter = Router();

adminRouter.post("/signup", async (req,res)=>{

    const {email,password,firstName,lastName} = req.body;
            // todo zod validation
            const hashedPassword = await bcrypt.hash(password , 10);
            try{
                await adminModel.create({
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
            message: "Admin signed up successfully"
        })
})

adminRouter.post("/signin", async(req,res)=>{
    const { email , password } = req.body;
    const admin = await adminModel.findOne({
        email : email,
    });
    const passwordMatch = bcrypt.compare(password , admin.password);

    if(admin && passwordMatch){
        const token = jwt.sign({
            id : admin._id.toString(),
        }, JWT_ADMIN_PASSWORD);
    // todo cookie logic here

        res.json({
            token : token,
            message: "admin signed in successfully"
        })
    }else{
        res.status(403).json({
            message: "admin not found"
        })
    }
})

adminRouter.post("/createCourse",adminMiddleware, async (req,res)=>{
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;
    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    res.json({
        message: "Course created successfully",
        courseId : course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware, async (req,res)=>{

    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        message: "Here are all of your courses",
        courses
    })
})

adminRouter.put("/course/update",adminMiddleware, async (req,res)=>{

    const adminId = req.userId;
    const { title, description, price, imageUrl, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId : adminId
    },{
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    res.json({
        message: "Content updated successfully",
        courseId : course._id
    })
})
module.exports = {
    adminRouter: adminRouter
}