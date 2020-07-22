"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleware_1 = require("../middleware/GlobalMiddleware");
const PostVallidator_1 = require("../vallidators/PostVallidator");
const PostController_1 = require("../controllers/PostController");
console.log('im in post Routes');
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/me', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostController_1.PostController.getPostByUser);
        this.router.get('/all', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostController_1.PostController.getAllPosts);
        this.router.get('/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostVallidator_1.PostVallidator.getPostById(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.getPostById);
    }
    postRoutes() {
        this.router.post('/add', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostVallidator_1.PostVallidator.addPost(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.addPost);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, PostVallidator_1.PostVallidator.editPost(), GlobalMiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.editPost);
    }
    deleteRoutes() {
    }
}
exports.default = new PostRouter().router;
