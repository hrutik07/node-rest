"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const Comment_1 = require("../models/Comment");
class CommentController {
    static addComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = req.body.content;
            const post = req.post;
            try {
                const comment = new Comment_1.default({
                    content: content,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                post.comments.push(comment);
                Promise.all([comment.save(), post.save()]);
                res.send(comment);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = req.body.content;
            const commentId = req.params.id;
            try {
                const updatedComment = yield Comment_1.default.findByIdAndUpdate({ _id: commentId }, {
                    content: content,
                    updated_at: new Date()
                }, { new: true });
                if (updatedComment) {
                    res.send(updatedComment);
                }
                else {
                    throw new Error('Comment Does Not Exist');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = req.comment;
            try {
                comment.remove();
                res.send(comment);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.CommentController = CommentController;
