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
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Post_1 = require("./Post");
const commentSchema = new mongoose.Schema({
    // user_id:{type : mongoose.Types.ObjectId,required: true},
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }]
});
commentSchema.post('remove', ((doc) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = doc;
    const post = yield Post_1.default.findOne({ comments: { $in: [comment._id] } });
    yield Post_1.default.findOneAndUpdate({ _id: post._id }, { $pull: { comments: comment._id } });
})));
exports.default = mongoose_1.model('comments', commentSchema);
