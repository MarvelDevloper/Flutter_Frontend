const { default: mongoose } = require("mongoose");
const Match = require('../model/Match');

const matchController = {
    add_matches: async (req, res) => {
        try {
            const userId = req.params.id;
            const { matchId } = req.body;

            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(matchId)) {
                return res.status(400).json({ success: false, msg: "Invalid Id's" });
            }

            const update_match = await Match.findOneAndUpdate({ user: userId }, { $addToSet: { match: new mongoose.Types.ObjectId(matchId) } }, { new: true, upsert: true });

            res.status(200).json({ success: true, match: update_match, msg: "Match Added In Match List" });
        } catch (e) {
            return res.status(500).json({ success: false, msg: `Internal Server Error` + e });
        }
    },
    show_matches: async (req, res) => {
        try {
            const userId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ success: false, msg: "Invalid Id's" });
            }

            const matches_list = await Match.find({ user: userId }).populate('match');

            if (!matches_list) {
                return res.status(404).json({ success: false, msg: "Match List Is Empty!" });
            }

            res.status(200).json({ success: true, msg: matches_list });

        } catch (e) {
            return res.status(500).json({ success: false, msg: `Internal Server Error` + e });
        }
    },
    remove_from_matchlist: async (req, res) => {
        try {
            const userId = req.params.id;
            const {matchId} = req.body;
            
            const matchlist_exist=await Match.find();
            if(matchlist_exist){
                return res.status(404).json({success:false,msg:"Cannot Delete Product from Empty Match List!"});
            }
            const remove_from_matchlist = await Match.findOneAndUpdate({_id:userId} , { $pull: { match: new mongoose.Types.ObjectId(matchId) } }, { new: true, upsert: true }).populate('match');
            res.status(200).json({ success: true, remove_from_matchlist, msg: "User Removed From Matchlist!" });
        } catch (e) {
            return res.status(500).json({ success: false, msg: `Internal Server Error` + e });
        }
    }
};

module.exports = matchController;