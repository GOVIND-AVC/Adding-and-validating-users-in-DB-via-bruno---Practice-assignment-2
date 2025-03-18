const express=require('express')
const mongoose=require('mongoose')
const port = 6000
const app=express()
const User=require('./model/schema')
const bcrypt=require('bcrypt')


app.use(express.json())

mongoose.connect('mongodb://localhost:27017/brunotest')
.then(()=>console.log("connected db"))
.catch(err=>console.log(err))



app.post('/create',async(req,res)=>{
    const{username,email,password}=req.body

    if(!email || !password){
        return res.status(400).json("all fields should be entered")
    }

    const hashedpassword= await bcrypt.hash(password,10)

    const newuser=new User({username,email,password:hashedpassword})
    await newuser.save()

})


app.post('/login',async(req,res)=>{
    const{email,password}=req.body

    if(!email || !password){
        return res.status(400).json("all fields should be entered")
    }
    
    const user=await User.findOne({email})

    const ismatch=await bcrypt.compare(password,user.password)

    if(ismatch){
        res.status(200).json("login successfull")
    }
    else{
        res.status(400).json("wrong password")
    }


})











// app.post('/create',async(req,res)=>{
//     const{username,email,password}=req.body

//     if(!email || !username || !password){
//         return res.status(400).json("these fields are required")
//     }

//     const hashedpassword = await bcrypt.hash(password,10)



//     const newuser= new User({username,email,password:hashedpassword})
//     await newuser.save()

//     return res.status(200).json("created successfully")

// })










// app.post('/login',async(req,res)=>{
//     const{email,password}=req.body

//     if(!email|| !password){
//         return res.status(400).json({message:"email and passsword required"})
//     }

//     const user=await User.findOne({email});
//     if(!user){
//         return res.status(400).json({message:"email not registered"})
//     }


//     const ismatch=await bcrypt.compare(password,user.password)

//     if(ismatch){
//         res.status(200).json({message:"login successfull"})
//     }else{
//         res.status(400).json({message:"Invalid password"})
//     }
// })


app.listen(port,()=>{
    console.log(`app listnening at ${port}`)
})