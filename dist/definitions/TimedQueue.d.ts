import { TimedJob } from "./TimedJob";
export declare class TimedQueue {
    private queue;
    private tHandle;
    private done;
    private observers;
    constructor();
    addTask(callback: Function, time: number): number;
    removeTask(job: TimedJob): void;
    start(): void;
    private next();
    private finish();
    isCompleted(): boolean;
    stop(): void;
    subscribe(callback: Function): void;
    reset(): void;
}
