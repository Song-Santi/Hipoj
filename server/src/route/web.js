import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.post('/api/login', userController.handLogin);
    router.get('/api/get-all-users', userController.handGetAllUser);
    router.post('/api/create-new-user', userController.handCreateNewUser);
    router.put('/api/edit-user', userController.handEditUser);
    router.delete('/api/delete-user', userController.handDeleteUser);

    router.get('/api/get-allcode-by-type', userController.handGetAllcodeByType);
    router.get('/api/get-categories', userController.handGetCategories);
    router.get('/api/get-collections', userController.handGetCollections);
    router.get('/api/get-connects', userController.handGetConnects);
    //router.get('/api/get-connects', userController.handGetConnects);


    return app.use("/", router);
}

module.exports = initWebRoutes;
