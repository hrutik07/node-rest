import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { PostVallidator } from "../vallidators/PostVallidator";
import { PostController } from "../controllers/PostController";
console.log('im in post Routes')

class PostRouter{
    public router:Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
      this.router.get('/me',GlobalMiddleware.authenticate,PostController.getPostByUser)
      this.router.get('/all',GlobalMiddleware.authenticate,PostController.getAllPosts)
      this.router.get('/:id',GlobalMiddleware.authenticate,PostVallidator.getPostById(),GlobalMiddleware.checkError,PostController.getPostById)
    }
    postRoutes(){
      this.router.post('/add',GlobalMiddleware.authenticate,PostVallidator.addPost(),GlobalMiddleware.checkError,PostController.addPost)
    }
    patchRoutes(){
        this.router.patch('/edit/:id',GlobalMiddleware.authenticate,PostVallidator.editPost(),GlobalMiddleware.checkError,PostController.editPost)
    }
    deleteRoutes(){

    }


}







export default new PostRouter().router;