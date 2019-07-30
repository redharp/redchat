import { APIGatewayProxyHandler } from "aws-lambda";
import { Logger } from "../utils/Logger";

const logger = new Logger().getLogger("disconnect");

export const disconnect: APIGatewayProxyHandler = async (event, context) => {
    logger.info(`Incoming connect request: ${JSON.stringify(context, undefined, 2)}`);
    logger.info(`Disconnecting for connectionId: ${event.requestContext.connectionId}`);
    return {
        body: "disconnect",
        statusCode: 200
    };
};
