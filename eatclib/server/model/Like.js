const {Schema,model} = require('mongoose');

const like_schema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    like:[
        {
            likes:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
            }
        }
    ]
});

const Like=model("Like",like_schema);
module.exports=Like;