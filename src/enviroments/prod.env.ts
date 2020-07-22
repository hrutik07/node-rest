import { Enviroment } from "./env";

export const ProdEnviroment : Enviroment ={ 

     db_url : 'mongodb+srv://mongodbuser:myuser@cluster0-y9zuu.mongodb.net/<dbname>?retryWrites=true&w=majority',
     jwt_secret:'prodSecret'

};