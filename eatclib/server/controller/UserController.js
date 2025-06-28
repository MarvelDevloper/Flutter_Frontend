const User = require("../model/User");
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');


const UserController = {
    signup:async(req,res)=>{
        try{
        const { name,email,password,location,gender,age,income,state,marital_status,bio,hobbies,habbits} = req.body;

        const exist_user=await User.findOne({email});
        
        if(exist_user){
        res.status(404).json({success:false,msg:'Account Already Presented'});
        }

        const query={};

        if(name) query.name=name;
        if(email) query.email=email;
        if(age) query.age=age;
        if(password) query.password=password;
        if(location) query.location=location;
        if(gender) query.gender=gender;
        if(habbits) query.habbits=habbits;
        if(hobbies) query.hobbies=hobbies;
        if(state) query.state=state;
        if(income) query.income=income;
        if(marital_status) query.marital_status=marital_status;
        if(bio) query.bio=bio;
        const user= new User(
            query
        );

        await user.save();
        res.status(200).json({success:true,user,msg:'Account Created Successfully'});
        }catch(e){
        res.status(500).json({success:false,msg:'Internal Server Error'+e});
        }
    },
    login:async(req,res)=>{
        try{
        const {email,password} = req.body;

        const exist_user=await User.findOne({email});

        if(!exist_user){
        return res.status(404).json({success:false,msg:'Invalid Mail'});
        }

        const ismatch=await bcryptjs.compare(password,exist_user.password);
        
        if(!ismatch){
        return res.status(200).json({success:false,msg:'Invalid Password'});
        }

        const tokendata = jwt.sign({id:exist_user._id,name:exist_user.name},"secretKey",{'expiresIn':'1h'});

        res.status(200).json({success:true,token:tokendata});
        }catch(e){
                res.status(500).json({success:false,msg:'Internal Server Error'+e});
        }
    },
    profile:async(req,res)=>{
        try{
        
        const id = req.params.id;

        const exist_user=await User.findById({_id:id});

        if(!exist_user){
        return res.status(404).json({success:false,msg:'Account Not Found'});
        }
        res.status(200).json({success:true,msg:exist_user});
        }catch(e){
        res.status(500).json({success:false,msg:'Internal Server Error'});   
        }
    },
    update_profile:async(req,res)=>{
       try{
        const id = req.params.id;
       const update = req.body;
       const exist_user = await User.findById({_id:id});

       if(!exist_user){
        return res.status(404).json({success:false,msg:'Account Not Found'});
       }

       const updatedProfile= await User.findByIdAndUpdate({_id:id},update,{new:true});

        res.status(200).json({success:true,msg:updatedProfile});
       }catch(e){
        res.status(500).json({success:false,msg:'Internal Server Error'});
       }
    },
    update_bio:async(req,res)=>{
        try{
            const id=req.params.id;
            const bio=req.body;
            const update_bio=await User.findByIdAndUpdate(id,bio,{new:true});

            res.status(200).json({success:true,msg:update_bio});
        }catch(e){
            return res.status(500).json({success:true,msg:`Internal Server Error`});
        }
    },
    delete_account:async(req,res)=>{
       try{
         const id = req.params.id;

        const exist_user = await User.findById({_id:id});

       if(!exist_user){
        return res.status(404).json({success:false,msg:'Account Not Found'});
       }

       await User.findByIdAndDelete({_id:id});
        res.status(200).json({success:true,msg:'Account Successfully Deleted'});
       }catch(e){
           res.status(500).json({success:false,msg:'Internal Server Error'+e});
       }
    },
    recommendate_matches:async(req,res)=>{
        const query={};
        const {income,location,age} = req.body;
        
        try{
        const id=req.params.id;
        const this_account=await User.findById(id);
        if(income) query.income={$gte:income};
        if(age) query.age={$lte:age};
        if(location) query.location=location;
        if(this_account.gender=="male") query.gender='female';
        if(this_account.gender=="female") query.gender='male';
            const default_matches=await User.find(query);
            res.status(200).json({success:true,msg:default_matches});
        }catch(e){
            return res.status(500).json({success:false,msg:`Internal Server Error`+e});
        }
    },
};



module.exports=UserController;