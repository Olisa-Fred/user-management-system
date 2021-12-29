const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.header('auth-token');

    try {
        const { userId, exp } = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one"
            });
        }else{
            req.userID = await User.findById(userId);
            next();
        }
        
    } catch (error) {
            res.status(400).send('Invalid token');
            console.log(error);
    }

}
module.exports = auth