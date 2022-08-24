var pool = require('./bd');

async function getDispositivos() {
    try {
        var query = `SELECT * FROM dispositivos`;
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getDispositivos };