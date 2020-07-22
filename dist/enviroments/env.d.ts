export interface Enviroment {
    db_url: string;
    jwt_secret: string;
}
export declare function getEnviromentVariables(): Enviroment;
