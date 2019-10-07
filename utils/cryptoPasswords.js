crypto = require('crypto');
const salt = "2323dsd434232332";

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 */
var sha512 = function(password){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        passwordHash:value
    };
};


module.exports = {
    saltHashPassword: function(userpassword){
        var passwordData = sha512(userpassword);
        return passwordData.passwordHash;
    },
    validatePassword: function(userpassword, hashedPassFromDB) {
        var passwordData = sha512(userpassword);
        if (passwordData.passwordHash === hashedPassFromDB) {
            return true;
        }
        return false;
    }
};