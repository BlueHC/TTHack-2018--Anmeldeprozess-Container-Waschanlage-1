import * as Bluebird from "bluebird";

export interface app {
    listen(): Bluebird<void>;
    shutdown(): void;
}