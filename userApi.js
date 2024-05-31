//create router to handle user api reqs
const exp=require('express');
const { ObjectId } = require('mongodb');
const userApp=exp.Router()

const expressAsyncHandler=require('express-async-handler')
//import bcryptjs for hashing password
const bcryptjs=require("bcryptjs")

//import jsonwebtoken for creating token
const jwt=require("jsonwebtoken")

require("dotenv").config()

// to extract body of request object
userApp.use(exp.json())

//create route to handle '/getusers' path
userApp.get('/getusers',expressAsyncHandler(async(request,response)=>{
     //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get all users
    let users=await userCollectionObject.find().toArray()
    //send response
    response.send({message:"Users list",payload:users})
}))

//create route to handle '/login' path
userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get userCredObj from client
    let userCredObj=request.body;
    //search for user by username
    let userOfDB= await userCollectionObject.findOne({username:userCredObj.username})
    //if user not existed
    if(userOfDB==null)
    {
        response.send({message:"Invalid User"})
    }
    //if user existed
    else
    {
        //compare passwords
        let status=await bcryptjs.compare(userCredObj.password,userOfDB.password)
        //if passwords not matched
        if(status==false)
        {
            response.send({message:"Invalid Password"})
        }
        //if passwords matched
        else{
            //create token
            let token= jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:60})
            //send response
            response.send({message:"success",payload:token,userObj:userOfDB})
        }
    }
}))


//create route to create user
userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get userObj from client
    let newUserObj=request.body;
    //search for user by username
    let userOfDB= await userCollectionObject.findOne({username:newUserObj.username})
    //if user existed
    if(userOfDB!=null)
    {
        response.send({message:"Username has already taken... choose another"})
    }
    //if user not existed
    else
    {
        //hash password
        let hashedPassword=await bcryptjs.hash(newUserObj.password,6)
        //replace plain password with hashed password in newUserObj
        newUserObj.password=hashedPassword;
        //insert newUser
        await userCollectionObject.insertOne(newUserObj)
        //send response
        response.send({message:"New User created"})
    }
}))

//route to update user
userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get modified obj
    let modifiedUser=request.body
    //update
    let hp=await bcryptjs.hash(modifiedUser.password,6)
    await userCollectionObject.updateOne({username:modifiedUser.username},{$set:{password:hp}})
    //send response
    response.send({message:"user modified"})
}))

//route to delete a user by username
userApp.delete('/remove-user/:uname',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get username from url param
    let un=(request.params.uname);
    
    //delete
    let user=await userCollectionObject.deleteOne({username:un})
    console.log(user)
    //if user not existed with given username
    if(user==null)
    {
        response.send({message:"user with given username not existed"})
    }
    else{
        response.send({message:"user deleted"})
    }
}))

//***********Todo API Calls ************/
// Route to add new todo item
userApp.post('/add-todo',expressAsyncHandler(async(request,response) => {
    try {
        let todoCollectionObject = request.app.get("todoCollectionObject");
        let newTodoObj = request.body;
        let todoOfDB = await todoCollectionObject.findOne({text:newTodoObj.text, username:newTodoObj.username});
        if (todoOfDB != null) {
            response.send({message:2});
        } else {
            await todoCollectionObject.insertOne(newTodoObj);
            response.send({message:1});
        }
    } catch (error) {
        response.send({message:0});
        console.error('Error adding todo item:', error);
    }
}))

// Route to fetch todo items
userApp.get('/gettodos/:uid',expressAsyncHandler(async(request,response) => {
    try {
        let todoCollectionObject = request.app.get("todoCollectionObject");
        let todosList = await todoCollectionObject.find({username: request.params.uid}).toArray();
        response.send({message:"Todo list", todos:todosList});
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}))

// Route to update a todo item
userApp.post('/update-todo/:id',expressAsyncHandler(async(request,response) => {
    try {
        let todoCollectionObject = request.app.get("todoCollectionObject");
        const objectIdToUpdate = new ObjectId(request.params.id);
        const result = await todoCollectionObject.updateOne({ _id: objectIdToUpdate}, {$set:request.body});
        // console.log(`Updated ${uid} document(s).`);
        console.log(`Updated ${result.modifiedCount} document(s).`);
        response.send({message:"Updated todo item"});
    } catch (error) {
        console.error('Error updating document:', error);
    }
}))

// Route to delete a todo item
userApp.delete('/delete-todo/:id',expressAsyncHandler(async(request,response) => {
    try {
        let todoCollectionObject = request.app.get("todoCollectionObject");
        const objectIdToDelete = new ObjectId(request.params.id);
        const todo = await todoCollectionObject.deleteOne({ _id: objectIdToDelete });
        // console.log(`Deleted ${todo.deletedCount} document(s).`);
        // const result = await todoCollectionObject.deleteMany({});
        // console.log(`Deleted ${result.deletedCount} document(s).`);
        response.send({message:"Todo item deleted"});
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}))

//export userApp
module.exports=userApp;