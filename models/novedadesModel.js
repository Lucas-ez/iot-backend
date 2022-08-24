var pool = require('./bd');

async function getNovedades() {
    try {
        var query = `SELECT * FROM novedades`;
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function insertNovedad(novedad) {
    try {
        var query = `INSERT INTO novedades SET ?`;
        var rows = await pool.query(query, [novedad]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteNovedadById(id) {
    var query = `DELETE FROM novedades WHERE id = ?`;
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getNovedadById(id) {
    var query = `SELECT * FROM novedades WHERE id = ?`;
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateNovedadById(id, novedad) {
    try {
        var query = `UPDATE novedades SET ? WHERE id = ?`;
        var rows = await pool.query(query, [novedad, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getNovedades, insertNovedad, deleteNovedadById, getNovedadById, updateNovedadById };