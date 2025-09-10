import AbstractEmployeesServiceMongo from "./AbstractEmployeesServiceMongo.ts";
import { registerEmployeesService } from "./registry.ts";
const DEFAULT_DB_NAME = "employees_db";
const DEFAULT_COLLECTION_NAME ="employees"
class EmployeesServiceMongo extends AbstractEmployeesServiceMongo {
    constructor(uri:string, dbName: string, collectionName: string) {
        super(uri, dbName, collectionName);
    }
}
registerEmployeesService("mongodb", async () => {
    const instance = new EmployeesServiceMongo(process.env.MONGO_URI,
         process.env.MONGO_DB_NAME || DEFAULT_DB_NAME,
          process.env.MONGO_COLLECTION_NAME || DEFAULT_COLLECTION_NAME);
     await instance.init();
     return instance;     
})