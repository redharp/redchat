import { Handler } from "aws-lambda";
import { Logger } from "../utils/Logger";

const logger = new Logger().getLogger("connect");

export const connect: Handler = (event, context) => {
    logger.info(`Incoming connect request: ${context}`);

};
