let dbquery = require('./dbquery');
let pool = require('../../../config/constant');

try {
    pool.connect()
}
catch(err) {
    console.log('database connection error', err)
}

module.exports.registerUser = async (postdata) => {
    try {
        let {user_name,user_email,user_password} = postdata;
        let newdata = await pool.query(dbquery.getRole, ["staff"]);
        if(newdata.rows.length > 0) {
            let role_id = newdata.rows[0].role_id;
            let params = [user_name,user_email,user_password,role_id];
            let newdata1 = await pool.query(dbquery.registerUser,params);
            return newdata1.rows;
        }
    }
    catch(e) {
        throw e;
    }
}

module.exports.getAllUsers = async () => {
    try{
        let newdata = await pool.query(dbquery.getAllUsers);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.getLoginData = async (email) => {
    try{
        let newdata = await pool.query(dbquery.getLoginData,[email]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.checkForEmailValidity = async (email) => {
     try{
        let newdata = await pool.query(dbquery.getLoginData,[email]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.checkOtpValidity = async (otp,user_id) => {
    try {
        let newdata = await pool.query(dbquery.checkOtpValidity,[otp,user_id]);
        if(newdata.rows.length > 0) {
            newdata =  newdata.rows;
        }
        else {
            let newdata1 = await pool.query(dbquery.addOtp,[user_id,otp]);
            newdata =  newdata1.rows;
        }
        return newdata;
    }
    catch(e) {
        throw e;
    }
}

module.exports.checkOtpSession = async (postdata) => {
    try {
        let {otp} = postdata;
        let newdata = await pool.query(dbquery.checkOtpSession, [otp]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.resetPassword = async (postdata) => {
    try {
        let {user_id,user_password} = postdata;
        let newdata = await pool.query(dbquery.resetPassword, [user_password,user_id]);
        if(newdata.rows.length > 0) {
            let newdata1 = await pool.query(dbquery.updatePasswordReset, [user_id]);
            return newdata1.rows;
        }
    }
    catch(e) {
        throw e;
    }
}

module.exports.deleteUser = async (postdata) => {
    try {
        let {user_id} = postdata;
        let newdata = await pool.query(dbquery.deleteUser, [user_id]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}