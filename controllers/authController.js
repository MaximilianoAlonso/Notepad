const db = require("../database/models")

module.exports = {
    loginGoogle: async (req,res)=>{
        const { provider,
            _json: {sub:googleId, name},
        } = req.session.passport.user; 
        
        try{
        const [{id}] = await db.user.findOrCreate({
            where:{
                socialId: googleId
            },
            defaults:{
                name,
                socialId: googleId,
                socialProvider: provider,
           
            },
        });
        req.session.userLogin = {
            id,
            name,
            socialId: googleId,
           
            
            
        };
       

        res.redirect('/user')
    }catch(error){
        console.log(error)
    } 
},
};
