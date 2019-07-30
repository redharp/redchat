import { APIGatewayProxyHandler } from "aws-lambda";
import { Logger } from "../utils/Logger";
import { AWSURL } from "../config/constants";
import { MessageSender } from "../sockets/send";

const logger = new Logger().getLogger("defaultHandler");

export const defaultHandler: APIGatewayProxyHandler = async (event, context) => {
    const { body } = event;
    const { connectionId, apiId, stage } = event.requestContext;

    logger.info(`Incoming message from ${connectionId}: ${body}`);
    const endpoint: string = AWSURL(apiId, stage);
    const ms: MessageSender = new MessageSender(endpoint);
    await ms.postMessage("Hello there!", connectionId as string);

    return {
        body: "default",
        statusCode: 200
    };
};
