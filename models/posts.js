const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(()=> console.log("connection successful"))
    .catch((err)=> console.log(err));

async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
} 

const userSchema = new Schema({
    username : String,
    email : String 
});

const postSchema = new Schema({
    content : String,
    likes: Number,
    user: {
               type: Schema.Types.ObjectId,
                ref: 'User' 
           }
});

const  User = mongoose.model("User",  userSchema);
const Post = mongoose.model("Post", postSchema);
/*
const addData = async ()=>{
    // let user1 = new User({
    //     username : "karanVerma",
    //     email  : "nothpy00@gmail.com",
    // });
    // dobara se user1 create karane ki jarurat nhi hai kyoki vo database me already store hai . hum usko keval find karenge
    let user = await User.findOne({username:"karanVerma"});

    // let post1 = new Post({
    //     content : "Hello world!",
    //     likes : 7,
    // });
    let post2 = new Post({
        content : "Each post references a user by their ObjectId, and the goal is to fetch a post along with the full details of the user who created it.",
        likes : 400,
    });

    // post2.user = user1;
    post2.user = user;

    // await user1.save();
    await post2.save();
};

addData();  */

// find all data of post from user 
const getData = async ()=>{
    // let result = await Post.find({}).populate("user");
    // let result = await Post.findOne({}).populate("user");
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);

};
getData();