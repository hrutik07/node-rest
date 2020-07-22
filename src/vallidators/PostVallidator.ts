import { body, query, param } from 'express-validator';
import Post from '../models/Post';
export class PostVallidator {
    static addPost() {
        return [body('content', 'Post Content is Required').isString()];
    }
    static getPostById() {
        return [param('id').custom((id, { req }) => {
            return Post.findOne({ _id: id }, { __v: 0, user_id: 0 }).populate('comments').then((post) => {
                if (post) {
                    req.post = post;
                    return true;
                } else {
                    throw new Error('post does not exist')
                }
            })
        })]
    }

    static editPost(){
        return [body('content','content is required').isString()]
    }

}