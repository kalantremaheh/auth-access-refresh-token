const { func } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        console.log('----------------------##################-----------------');
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword

        console.log(this.email,this.password)
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('user',UserSchema)
module.exports = User