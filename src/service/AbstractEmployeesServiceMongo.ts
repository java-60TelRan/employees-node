import { Collection, Db, MongoClient } from "mongodb";
import { Employee } from "../model/dto-types/Employee.ts";
import EmployeesService from "./EmployeesService.ts";
import { EmployeeNotFoundError } from "../model/error-types/employee-error.ts";
export default abstract class AbstractEmployeesServiceMongo implements EmployeesService {
    client: MongoClient;
    db: Db;
    collection: Collection<Employee>;
    constructor(uri: string, private dbName: string, private collectionName: string) {
        this.client = new MongoClient(uri);
    }
    async init(): Promise<void> {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection(this.collectionName);
        this.collection.createIndex({id: 1},{unique: true});
        this.collection.createIndex({department: "hashed"})
    }
    addEmployee(empl: Employee): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    async getAll(department?: string): Promise<Employee[]> {
        const filter = department ? {department}: {};
        return await this.collection.find(filter).toArray()
    }
    updateEmployee(id: string, empl: Partial<Employee>): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    deleteEmployee(id: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    async getEmployee(id: string): Promise<Employee> {
        const empl =  await this.collection.findOne({id});
        if (!empl) {
            throw new EmployeeNotFoundError(id);
        }
        return empl;
    }
    async save(): Promise<void> {
        await this.client.close()
    }

}