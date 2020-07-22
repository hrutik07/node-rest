import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { CommentVallidator } from "../vallidators/CommentVallidator";
import { CommentController } from "../controllers/CommentController";

class CommentRouter{
   public router :Router;
   
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
     
    }
    postRoutes(){
      this.router.post('/add/:id',GlobalMiddleware.authenticate,CommentVallidator.addComment(),GlobalMiddleware.checkError,CommentController.addComment)
    }
    patchRoutes(){
      this.router.patch('/edit/:id',GlobalMiddleware.authenticate,CommentVallidator.editComment(),GlobalMiddleware.checkError,CommentController.editComment)
    }
    deleteRoutes(){
      this.router.delete('/delete/:id',GlobalMiddleware.authenticate,CommentVallidator.deleteComment(),GlobalMiddleware.checkError,CommentController.deleteComment)
   // this.router.delete('/delete/:id')
    }

}

export default new CommentRouter().router;