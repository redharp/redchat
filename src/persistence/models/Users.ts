import moment from "moment";
import { v4 } from "uuid";

export interface IUser {
    [x: string]: string;
    userId: string;
    userName: string;
    connectionId: string;
    ts: string;
}

export class User {
    private _id: string;
    private _name: string;
    private _connectionId: string;
    private _ts: string;

    constructor(name: string, connId: string) {
        this._name = name;
        this._connectionId = connId;
        this._id = v4();
        this._ts = moment().format();
    }

    public build(): IUser {
        return {
            userId: this._id,
            userName: this._name,
            connectionId: this._connectionId,
            ts: this._ts
        };
    }

    public toDynamo(user: IUser) {

    }

}
