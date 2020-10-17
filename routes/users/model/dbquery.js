module.exports.getRole = `select * from tbl_role 
    where role_name = $1`;

module.exports.registerUser = `insert into tbl_user(user_name,user_email,user_password,role_id)
    values ($1,$2,$3,$4) returning user_id`;

module.exports.getAllUsers = `select * from tbl_role r, tbl_user u 
    where r.role_id = u.role_id and u.status = true`;

module.exports.getLoginData = `select * from tbl_user u, tbl_role r
    where u.role_id = r.role_id 
    and u.status = true 
    and u.user_email = $1`;

module.exports.addOtp = `insert into tbl_password_reset_auth(user_id,otp) 
    values ($1,$2) returning user_id`;

module.exports.checkOtpValidity = `select * from tbl_password_reset_auth 
    where otp = $1 
    and user_id = $2 
    and status = true`;

module.exports.checkOtpSession = `select * from tbl_password_reset_auth 
    where otp = $1 and status = true`;

module.exports.resetPassword = `update tbl_user 
    set user_password = $1 
    where user_id = $2 
    returning user_id`;

module.exports.updatePasswordReset = `update tbl_password_reset_auth 
    set status = false 
    where user_id = $1 
    returning user_id`;

module.exports.deleteUser = `update tbl_user 
    set status = false 
    where user_id = $1 
    returning user_id`;