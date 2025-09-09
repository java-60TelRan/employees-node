import { Knex } from "knex";
import AbstractEmployeesServiceSql from "./AbstractEmployeesServiceSql.ts";
import { registerEmployeesService } from "./registry.ts";
// SQL_PASSWORD=12345.com
class EmployeesServiceSql extends AbstractEmployeesServiceSql {
    constructor(config: Knex.Config) {
        super(config)
    }
}
registerEmployeesService("sql", async () => {
    const host = process.env.SQL_HOST;
    const user = process.env.SQL_USER;
    const database = process.env.SQL_DB_NAME;
    const port = process.env.SQL_PORT ?? 5432;
    const client = process.env.SQL_CLIENT;
    const password = process.env.SQL_PASSWORD;
    const serviceInstance = new EmployeesServiceSql({
        client,
        connection: {
            host, user, database, port: +port,password
        }
    })
    await serviceInstance.createTable();
    return serviceInstance;

})