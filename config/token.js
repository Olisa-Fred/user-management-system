const { sign } = require('jsonwebtoken');

const createAccessToken = (userId, email) => {
    return sign({userId, email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    })
};

// const createRefreshToken = (userId, email) => {
//     return sign({userId, email}, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: '7d',
//     })
// };

module.exports = {
    createAccessToken,
    // createRefreshToken,
}