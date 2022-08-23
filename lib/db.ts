import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

const executeQuery = async (query: string, values: any): Promise<any> => {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const executeQueryErrorCheck = async (query: string, values: any): Promise<any> => {
    try {
        await db.query(query, [values], function (err, result) {
            if (err) throw err;
            return result;
        });
    } catch (error) {
        console.log(error);
        return error;
    }
}

const executeInsert = async (query: string, values: any): Promise<any> => {
    try {
        const results = await db.transaction().query(query, values).commit();
        await db.end();
        return results;
    } catch (error) {
        return error;
    }
}

export default executeQuery;
export { executeInsert, executeQueryErrorCheck };