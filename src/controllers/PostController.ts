import Post from "../models/Post";
import e = require("express");

export class PostController{
    static addPost(req,res,next){
        const userId = req.user.user_id;
        const content = req.body.content;
        const post = new Post({
            user_id : userId,
            content : content,
            created_at : new Date(),
            updated_at : new Date()
        });
        post.save().then((post)=>{
            res.send(post);
        }).catch(err=>{
            next(err);
        })
    }
    static async getPostByUser(req,res,next){
        console.log('hello')
        const userId = req.user.user_id;
        const page = parseInt(req.query.page) || 1;
        const perPage = 2;
        let currentPage = page;
        let prevPage = page ===1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages ;
        try{
            const postCount = await Post.countDocuments({user_id:userId});
            totalPages = Math.ceil(postCount/perPage);
            if(totalPages === page || totalPages === 0){
                pageToken = null ;

            }if(page > totalPages){
                throw Error('No more posts to show')
            }
            const posts:any = await Post.find({user_id : userId},{__v:0,user_id:0})
            .populate('comments').skip((perPage*page)-perPage).limit(perPage);
            console.log(posts[0].commentCount);
            console.log('hi')
        res.json({
            post : posts,
            pageToken : pageToken,
            totalPages : totalPages,
            currentPage : currentPage,
            prevPage : prevPage,
            count : posts[0].commentCount
        })
        }catch(e){
            next(e);
        }
    }
    static async getAllPosts(req,res,next){
        const userId = req.user.user_id;
        const page = parseInt(req.query.page) || 1;
        const perPage = 2;
        let currentPage = page;
        let prevPage = page ===1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
       
       
        try{
            const postCount = await Post.estimatedDocumentCount();
            totalPages = Math.ceil(postCount/perPage);
            if(totalPages === page || totalPages === 0){
                pageToken = null ;

            }
            if(page > totalPages){
                throw Error('No more posts to show')
            }
            const posts = await Post.find({},{__v:0,user_id:0})
            .populate('comments').skip((perPage*page)-perPage).limit(perPage);
        res.json({
            post : posts,
            pageToken : pageToken,
            totalPages : totalPages,
            currentPage : currentPage,
            prevPage : prevPage
        })
        }catch(e){
            next(e);
        }
    }
    static async getPostById(req,res,next){
        res.json({
            post : req.post,
            commentCount : req.post.commentCount
        })        
    }
    static async editPost(req,res,next){
        const content = req.body.content;
        const postId = req.params.id;
        try{
            const updatedPost = await (await Post.findOneAndUpdate(
                {_id:postId},
                {content : content,updated_at : new Date()},{new : true})).populate('comments');
                console.log(updatedPost)
            if(updatedPost){
                res.send(updatedPost)
            }else{
                throw new Error('Post Does Not Exist')
            }
        }catch(e){
           // console.log(updatedPost)

            console.log('im in catch')
            next(e);
        }
    }
}