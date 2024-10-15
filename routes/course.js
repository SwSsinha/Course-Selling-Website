const { Router } = require("express");
const { courseModel , purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
const jwt = require("jsonwebtoken");


const courseRouter = Router();


    courseRouter.post ("/purchase" ,userMiddleware, async (req,res)=>{

        const userId = req.userId;
        const courseId = req.body.courseId;
        await purchaseModel.create ({
            userId,
            courseId
        })
        res.json({
            message: "you have successfully bought the course"
        })
    })
    courseRouter.get("/preview" ,async (req,res)=>{

        const courses = await courseModel.find({});
        res.json({
            message: "All available courses",
            courses
        })
    })


module.exports = {
    courseRouter:courseRouter
}