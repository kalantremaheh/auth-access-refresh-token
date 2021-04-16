const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
    singAccessToken:(userid)=>{
        return new Promise((reslove,reject)=>{
            const payload = {
                name: "mahehs kakaltre"
            }
            const secret = "some secrate"
            const options = {}
            JWT.sign(payload,secret,options,(err,token)=>{
                if(err) reject(err)
                reslove(token)
            })
        })
    }
}