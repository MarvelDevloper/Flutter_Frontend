const { Schema, model } = require('mongoose');

const match_schema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    match: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    ]
});

const Match = model("Match", match_schema);

module.exports = Match;