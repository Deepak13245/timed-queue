"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimedQueue = /** @class */ (function () {
    function TimedQueue() {
        this.queue = [];
        this.tHandle = null;
        this.done = true;
        this.observers = [];
    }
    TimedQueue.prototype.addTask = function (callback, time) {
        if (!this.done)
            throw new Error('Job is under process');
        return this.queue.push({
            callback: callback,
            time: time
        });
    };
    TimedQueue.prototype.removeTask = function (job) {
        if (!this.done)
            throw new Error('Job is under process');
        var index = this.queue.indexOf(job);
        if (index == -1)
            throw new Error('Job not found');
        this.queue.splice(index, 1);
    };
    TimedQueue.prototype.start = function () {
        var _this = this;
        if (!this.done)
            throw new Error('Job already started');
        if (this.queue.length == 0)
            throw new Error('Job Queue is empty');
        this.done = false;
        this.tHandle = setTimeout(function () { _this.next(); }, 0);
    };
    TimedQueue.prototype.next = function () {
        var _this = this;
        if (this.queue.length == 0) {
            this.done = true;
            this.finish();
            return;
        }
        var job = this.queue.shift();
        job.callback.call(null);
        this.tHandle = setTimeout(function () { _this.next(); }, job.time);
    };
    TimedQueue.prototype.finish = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.call(null);
        }
    };
    TimedQueue.prototype.isCompleted = function () {
        return this.done;
    };
    TimedQueue.prototype.stop = function () {
        if (!this.done)
            throw new Error('Queue is not started');
        clearTimeout(this.tHandle);
    };
    TimedQueue.prototype.subscribe = function (callback) {
        this.observers.push(callback);
    };
    TimedQueue.prototype.reset = function () {
        clearTimeout(this.tHandle);
        this.tHandle = null;
        this.done = true;
        if (this.queue.length > 0)
            this.queue.splice(0, this.queue.length);
    };
    return TimedQueue;
}());
exports.TimedQueue = TimedQueue;

//# sourceMappingURL=TimedQueue.js.map
