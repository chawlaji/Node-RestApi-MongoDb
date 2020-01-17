const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);


encryptLoc = (text) => {
    let hash = bcrypt.hashSync(text, salt);
    return hash;
}

module.exports = {

    encrypt: encryptLoc,

    decrypt: (text, hashText) => {
        return bcrypt.compareSync(text, hashText);

    }
}