var pool = require('./bd');
var md5 = require('md5');

async function getUserByUserAndPassword(user, password) {
    try {
        var query = `SELECT * FROM usuarios WHERE user = ? AND password = ?`;
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserByUserAndPassword };