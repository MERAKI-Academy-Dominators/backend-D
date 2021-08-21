const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
    fullName: { type: String , required: true},
    email: { type: String , required: true, unique: true  },
    password:{type:String , required: true } , 
    age: { type: Number , required: true },
    address: { type: String , required: true },
    phoneNumber : {type:String , reqired:true},
    bloodType : { type: String , required: true },
    location : { type: String , required: true },
    image : {type : String}
});


users.pre("save", async function () {
    // `this` refers to the newly created user before saving
    const salt = 10 ;
    this.email = await this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password,salt);
    /*this.password = hashedPassword*/
})




module.exports = mongoose.model("User" , users )





