import pino from "pino";

export class Logger {
    private _logger: pino.Logger;
    private _children: Map<string, pino.Logger> = new Map();

    constructor() {
        this._logger = pino({
            prettyPrint: {
                levelFirst: true
            }
        });
    }

    public getLogger(name: string): pino.Logger {
        if (this._children.has(name)) {
            return this._children.get(name) as pino.Logger;
        } else {
            const child = this._logger.child({ module: name });
            this._children.set(name, child);
            return child;
        }
    }

}
