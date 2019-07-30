import { APIGatewayProxyHandler } from "aws-lambda";
import { Logger } from "../utils/Logger";
import { AWSURL } from "../config/constants";
import { MessageSender } from "../sockets/send";

const logger = new Logger().getLogger("defaultHandler");
const currentSession: Set<string> = new Set();

export const defaultHandler: APIGatewayProxyHandler = async (event, context) => {
    const { body } = event;
    const { connectionId, apiId, stage } = event.requestContext;
    currentSession.add(connectionId as string);

    logger.info(`Incoming message from ${connectionId}: ${body}`);
    const endpoint: string = AWSURL(apiId, stage);
    const ms: MessageSender = new MessageSender(endpoint);
    for (const user of currentSession.values()) {
        await ms.postMessage("Hello there!", user);
    }

    return {
        body: "default",
        statusCode: 200
    };
};
