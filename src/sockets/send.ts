import { ApiGatewayManagementApi } from "aws-sdk";

export class MessageSender {
    private _gwManager: ApiGatewayManagementApi;

    constructor(endpoint: string) {
        this._gwManager = new ApiGatewayManagementApi({
            apiVersion: "2018-11-29",
            endpoint,
        });
    }

    public postMessage(payload: string, connectionId: string) {
        return this._gwManager.postToConnection({ ConnectionId: connectionId, Data: payload }).promise();
    }
}
