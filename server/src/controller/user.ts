import fs = require('fs');
import path = require('path');

export const getUserData = (req:any,res:any)=>{
    const p = path.join(
        path.dirname(Object.keys(require.cache)[0]),'../data.json');
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            res.status(404).json({message:"User Data not Found"})
        }else{
            const data = fileContent.toString()
            res.status(202).json(JSON.parse(data));
        }
    })
}