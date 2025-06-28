const { default: mongoose } = require("mongoose");
const Like = require("../model/Like");
const { get } = require("http");

const like_controller = {
    add_like: async (req, res) => {
        try {
            const userId = req.params.id;
            const { likeId } = req.body;

            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(likeId)) {
                return res.status(400).json({ success: false, msg: "Invalid userId or likedUserId" });
            }

            const addedlike = await Like.findOneAndUpdate(
                { user: userId }, { $addToSet: { like: new mongoose.Types.ObjectId(likeId) } }, { new: true, upsert: true }).populate('like');

            res.status(200).json({ success: true, addedlike });
        } catch (e) {
            res.status(500).json({ success: false, msg: `Internal Server Error` + e });
        }
    },
    getlike:async(req,res)=>{
      try{
          const userId=req.params.id;

        const get_likes=await Like.findById(userId).populate('like');

        res.status(200).json({success:true,msg:get_likes});
      }catch(e){
        return res.status(500).json({success:false,msg:`Internal Server Error!`+e});
      }
    },
    remove_like: async (req, res) => {
        try {
            const userId = req.params.id;
            const {likeId} = req.body;

            const exist_like=await Like.findById(userId);

            if(!exist_like){
                return res.status(404).json({success:false,msg:'Like list is Empty!'});
            }

            const remove_like = await Like.findOneAndUpdate({ _id: userId }, {$pull:{like:new mongoose.Types.ObjectId(likeId)}}, { new: true, upsert: true });

            res.status(200).json({ success: true,remove_like,msg: "Unlike" });

        } catch (e) {
            return res.status(500).json({ success: true, msg: `Internal Server Error` + e });
        }

    },
};

module.exports = like_controller;