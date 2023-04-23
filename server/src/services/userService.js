import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already
                // compare password

                let user = await db.User.findOne({
                    attributes: ['email', 'isAdmin', 'password','firstName','lastName'],
                    where: { email: email },
                    // raw: true   // user này sẽ trả ngay ra một object luôn => cái này đã được cấu hình trong config.json rồi
                });
                if (user) {
                    // compare password
                    let check = bcrypt.compareSync(password, user.password);
                   
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;  // Xóa đi một thuộc tính trong đối tượng
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong Password';
                    }
                } else {
                    //error
                    userData.errCode = 2;
                    userData.errMessage = `User's is not found`;
                }
            } else {
                //error
                userData.errCode = 1;
                userData.errMessage = `Email is not registered. Please check again!`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            // Tìm tất cả người dùng
            if (userId === 'ALL') {        
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']    // không trả ra password nữa
                    }
                })
            }
            
            //Tìm tất cả các tài khoản của Customer (tức là isAdmin == 0)
            if(userId === 'Customer'){
                users = await db.User.findAll({
                    where: {isAdmin: 0},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }

            //Tìm tất cả các tài khoản của Admin (tức là isAdmin == 1)
            if(userId === 'Admin'){
                users = await db.User.findAll({
                    where: {isAdmin: 1},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }

            // Tìm 1 người dùng với id xác định
            if (userId && userId !== 'ALL' && userId !== 'Customer' && userId !== 'Admin') {
                users = await db.User.findOne({   
                    where: { id: userId },  //  id truyền vào phải bằng cái id trong db
                    attributes: {
                        exclude: ['password']    // không trả ra password nữa
                    }
                })
            }
            
            // trường hợp else sẽ trả về userId là undefined vì thế cần phải tách ra 2 cái if
            // Nếu userId không có thì trả về user= '';
            resolve(users);

        } catch (error) {
            reject(error);
        }
    });
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist? (kiểm tra email đã tồn tại chưa)
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists. Please try another email'
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender, // với kiểu boolean cho is Admin    === '1' ? true : false,
                    birthday: data.birthday,
                    phone: data.phone,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    //avatar: avatar,
                    company: data.company,
                    website: data.website,
                    address: data.address,
                    //createdAt: new Date(),
                    //updatedAt: new Date()
                })
                
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }


        } catch (error) {
            reject(error);
        }

    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            message: `The user is deleted`
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.gender = data.gender;
                user.birthday = data.birthday;
                user.phone = data.phone;
                user.email = data.email;
                user.password = data.password;
                user.avatar = data.avatar;
                user.company = data.company;
                user.website = data.website;
                user.address = data.address;


                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }
        } catch (error) {

        }
    })
}

let getAllcodeByType = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }else{
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput},
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let cate = await db.Category.findAll({
                attributes:{
                    exclude: ['createdAt','updatedAt']
                }
            });
            res.errCode = 0;
            res.data = cate;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

let getCollections = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let cate = await db.Collection.findAll({
                attributes:{
                    exclude: ['createdAt','updatedAt']
                }
            });
            res.errCode = 0;
            res.data = cate;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

let getConnects = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let cate = await db.Connect.findAll({
                attributes:{
                    exclude: ['createdAt','updatedAt']
                }
            });
            res.errCode = 0;
            res.data = cate;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllcodeByType:getAllcodeByType,
    getCategories:getCategories,
    getCollections:getCollections,
    getConnects:getConnects
}