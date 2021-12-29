const User = require('../models/User');



const authenticateRoles = (roleArray=[]) => {

        return async (req, res, next) => {
            const user = await User.findOne({_id: req.userID});
            const user_role = user.role;
            
            let requiredRole = roleArray.includes(user_role);
            
                if ( !requiredRole ) {

                    return res.status(401).json({
                        status: false,
                        message: 'Unauthorized',
                    })
                    
                }
                else{
                    req.user_ID = user.id;
                    return next();
                }
                
                
            
        }
    
    
}

module.exports = authenticateRoles;
