let dbquery = require('./dbquery');
let pool = require('../../../config/constant');

try {
    pool.connect()
}
catch(err) {
    console.log('database connection error', err)
}

module.exports.getAllCards = async () => {
    try {
        let newdata = await pool.query(dbquery.getAllCards);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.deleteCard = async (postdata) => {
    try {
        let {card_id} = postdata;
        let newdata = await pool.query(dbquery.deleteCard, [card_id]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}
