"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostVallidator = void 0;
const express_validator_1 = require("express-validator");
const Post_1 = require("../models/Post");
class PostVallidator {
    static addPost() {
        return [express_validator_1.body('content', 'Post Content is Required').isString()];
    }
    static getPostById() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { __v: 0, user_id: 0 }).populate('comments').then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('post does not exist');
                    }
                });
            })];
    }
    static editPost() {
        return [express_validator_1.body('content', 'content is required').isString()];
    }
}
exports.PostVallidator = PostVallidator;
