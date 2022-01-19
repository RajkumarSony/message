const crypto = require('crypto')
const { promisify } = require('util')
const dotenv = require("dotenv");
dotenv.config();
const randomBytes = promisify(crypto.randomBytes)
const scrypt = promisify(crypto.scrypt)

// 32 bytes encoded in hex is 64 chars

const generateUserLicenseToken = async (userId) => {
    const appId=process.env.seald_appId;
    const validationKeyId=process.env.seald_validationKeyId;
    const validationKey=process.env.seald_validationKey;
    const nonce = (await randomBytes(32)).toString('hex') // only a random string
    const token = (await scrypt(
        Buffer.from(`${userId}@${appId}-${validationKey}`, 'utf8'),
        Buffer.from(nonce, 'utf8'),
        64,
        { N: 16384, r: 8, p: 1 }
    )).toString('hex')
    return new Promise((resolve,reject)=>{
        if(appId!==undefined && validationKey!==undefined && validationKeyId!== undefined && nonce!==undefined && token!==undefined && userId!==undefined){
            resolve(`${validationKeyId}:${nonce}:${token}`)
        }else{
            reject("A parameter is not provided")
        }
    }) 
        
}



module.exports = generateUserLicenseToken;