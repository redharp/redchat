import { APIGatewayProxyHandler } from "aws-lambda";
import { Logger } from "../utils/Logger";

const logger = new Logger().getLogger("connect");

export const connect: APIGatewayProxyHandler = async (event, context) => {
    logger.info(`Incoming connect request: ${JSON.stringify(context, undefined, 2)}`);
    logger.info(`Hello to user: ${event.requestContext.connectionId}`);
    return {
        body: "hello",
        statusCode: 200
    };
};
