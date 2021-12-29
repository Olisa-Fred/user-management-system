// // server/roles.js
// const AccessControl = require("accesscontrol");
// const ac = new AccessControl();

// exports.roles = (function() {
// ac.grant("USER")
//  .readAny("post")
 
// ac.grant("ADMIN")
//  .extend("USER")
//  .createAny("post")
//  .updateAny("post")
//  .readAny("post")

// ac.grant("SUPER-ADMIN")
//  .extend("USER")
//  .extend("ADMIN")
//  .deleteAny("post")

// return ac;
// })();