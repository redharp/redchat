import { DynamoDB } from "aws-sdk";
import { IUser } from "./models/Users";

const ddb = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME || "",
    Item: {}
};

export async function addUser(user: IUser) {
    params.Item = user;
    return ddb.put(params).promise();
}

export async function getConnected() {
    const p: DynamoDB.ScanInput = {
        TableName: params.TableName,
        ProjectionExpression: "connectionId",
    };

    return ddb.scan(p).promise();
}
