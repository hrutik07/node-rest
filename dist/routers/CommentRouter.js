"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleware_1 = require("../middleware/GlobalMiddleware");
const CommentVallidator_1 = require("../vallidators/CommentVallidator");
const CommentController_1 = require("../controllers/CommentController");
class CommentRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post('/add/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, CommentVallidator_1.CommentVallidator.addComment(), GlobalMiddleware_1.GlobalMiddleware.checkError, CommentController_1.CommentController.addComment);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, CommentVallidator_1.CommentVallidator.editComment(), GlobalMiddleware_1.GlobalMiddleware.checkError, CommentController_1.CommentController.editComment);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleware_1.GlobalMiddleware.authenticate, CommentVallidator_1.CommentVallidator.deleteComment(), GlobalMiddleware_1.GlobalMiddleware.checkError, CommentController_1.CommentController.deleteComment);
        // this.router.delete('/delete/:id')
    }
}
exports.default = new CommentRouter().router;
