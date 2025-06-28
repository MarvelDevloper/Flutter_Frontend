const User = require("../model/User");

const filterController = {
    get_matches: async (req, res) => {
        try {
            const query = {};
            const { age, location, habbits, income, hobbies,marital_status,gender} = req.body;

            if (age) query.age = { $lte: age };
            if (location) query.location = location;
            if (gender) query.gender = gender;
            if (income) {
                query.income = { $gte: income };
            }
            if(marital_status) query.marital_status=marital_status;
            if (habbits) {
                if (Array.isArray(habbits)) {
                    query.habbits = { $in: habbits };
                } else {
                    query.habbits = { $in: [habbits] };
                }
            }
             if (hobbies) {
                if (Array.isArray(hobbies)) {
                    query.hobbies = { $in: hobbies };
                } else {
                    query.hobbies = { $in: [hobbies] };
                }
            }
            const result_matches = await User.find(query);

            if (!result_matches) {
                return res.status(404).json({ success: false, msg: "No Matches Found!" });
            }
            res.status(200).json({ success: true, msg: result_matches });
        } catch (e) {
            return res.status(500).json({ success: false, msg: `Internal Server Error` + e });
        }
    },
};


module.exports = filterController;