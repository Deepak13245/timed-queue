class TimedQueue {
    private queue: Array<TimedJob> = [];
    private tHandle: any = null;
    private done: boolean = true;
    private observers: Array<Function> = [];
    constructor() {
    }

    addTask(callback: Function, time: number): number {
        if (!this.done)
            throw new Error('Job is under process');
        return this.queue.push({
            callback: callback,
            time: time
        });
    }

    removeTask(job: TimedJob) {
        if (!this.done)
            throw new Error('Job is under process');
        let index = this.queue.indexOf(job);
        if (index == -1)
            throw new Error('Job not found');
        this.queue.splice(index, 1);
    }

    start() {
        if (!this.done)
            throw new Error('Job already started');
        if (this.queue.length == 0)
            throw new Error('Job Queue is empty');
        this.done = false;
        this.tHandle = setTimeout(() => { this.next() }, 0);
    }

    private next() {
        if (this.queue.length == 0) {
            this.done = true;
            this.finish();
            return;
        }
        let job: TimedJob = this.queue.shift();
        job.callback.call(null);
        this.tHandle = setTimeout(() => { this.next() }, job.time);
    }

    private finish() {
        for (let observer of this.observers)
            observer.call(null);
    }

    isCompleted() {
        return this.done;
    }

    stop() {
        if (!this.done)
            throw new Error('Queue is not started');
        clearTimeout(this.tHandle);
    }

    subscribe(callback: Function) {
        this.observers.push(callback);
    }

    reset() {
        clearTimeout(this.tHandle);
        this.tHandle = null;
        this.done = true;
        if (this.queue.length > 0)
            this.queue.splice(0, this.queue.length);
    }
}