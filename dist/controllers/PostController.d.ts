export declare class PostController {
    static addPost(req: any, res: any, next: any): void;
    static getPostByUser(req: any, res: any, next: any): Promise<void>;
    static getAllPosts(req: any, res: any, next: any): Promise<void>;
    static getPostById(req: any, res: any, next: any): Promise<void>;
    static editPost(req: any, res: any, next: any): Promise<void>;
}
