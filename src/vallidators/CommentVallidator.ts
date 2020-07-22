import {body, param} from 'express-validator';
import Post from '../models/Post';
import Comment from '../models/Comment'

export class CommentVallidator{
    static addComment(){
        return [body('content','Content is required').isString(),
        param('id').custom((id,{req})=>{
           return Post.findOne({_id:id}).then((post)=>{
                if(post){
                    req.post = post;
                    return true;
                }else{
                    throw new Error('Post Does Not Exist');
                }
            })
        })]
    }
    static editComment(){
        return [body('content','content is required').isString()]
    }
    static deleteComment(){
        return [param('id').custom((id,{req})=>{
            return Comment.findOne({_id : id}).then((comment)=>{
                if(comment){
                    req.comment = comment;
                    return true;
                }else{
                    throw new Error('comment does not exist');
                }
            })
        })]
    }
}