"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
});
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});
exports.default = mongoose_1.model('posts', postSchema);
