let pool = require('./constant');

try {
    pool.connect()
}
catch(err) {
    console.log('database connection error', err)
}

module.exports.expireOtp = async () => {
    try {
        let sql1 = `update tbl_password_reset_auth 
        set status = false 
        where expDate <= CURRENT_TIMESTAMP`;

        let newdata = await pool.query(sql1);
        return newdata;

    }
    catch(e) {
        console.log({'error':`server error: ${e}`});
    }
    
}