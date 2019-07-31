import { APIGatewayProxyHandler } from "aws-lambda";
import { Logger } from "../utils/Logger";
import { AWSURL } from "../config/constants";
import { User } from "../persistence/models/Users";
import { addUser, getConnected } from "../persistence/dynamodb";
import { MessageSender } from "../sockets/send";

const logger = new Logger().getLogger("defaultHandler");
const currentSession: Set<string> = new Set();
let ms: MessageSender;

export const defaultHandler: APIGatewayProxyHandler = async (event, context) => {
    const { body } = event;
    const { connectionId, apiId, stage } = event.requestContext;
    const user = new User("test", connectionId as string).build();
    const saveResult = await addUser(user);
    if (saveResult) {
        logger.info(`Saved successfully`);
        logger.info(JSON.stringify(saveResult, undefined, 2));
    }

    const users = await getConnected();

    logger.info(`Incoming message from ${connectionId}: ${body}`);

    currentSession.add(connectionId as string);

    const endpoint: string = AWSURL(apiId, stage);

    if (!ms) ms = new MessageSender(endpoint);

    if (users) {
        const { Items } = users;
        const values = Items || [];
        // tslint:disable-next-line: no-shadowed-variable
        values.map(async ({ connectionId }) => {
            await ms.postMessage(`Hi ${connectionId}`, connectionId);
        });
    }

    return {
        body: "default",
        statusCode: 200
    };
};
