import userService from "../services/userService";
let handLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    // check email exist
    // compare password
    // return userInfor
    // access_token: JWT json web token
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handGetAllUser = async (req, res) => {
    let id = req.query.id;  //ALL or SIGN => lấy tất cả hoặc lấy 1 người dùng
    //req.body là không truyền tham số còn req.body là truyền tham số vd ?id= là tham số
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok',
            users: []
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }

    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}


module.exports = {
    handLogin: handLogin,
    handGetAllUser: handGetAllUser,
    handCreateNewUser: handCreateNewUser,
    handDeleteUser: handDeleteUser,
    handEditUser: handEditUser
}