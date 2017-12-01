# Timed Queue

Create a queue of functions to be executed in queue

Example : 
```typescript
    //Import TimedQueue
    import { TimedQueue } from 'timed-queue-js';
    //Create new instance
    let queue = new TimedQueue();
    queue.add(() => {
        alert('3 seconds later')
    }, 3000);

    //3+2=5 seconds later
    queue.add(() => {
        alert('5 seconds later')
    }, 2000);

    //Execute the queue
    queue.start();

    //Notify when job is completed
    queue.subscribe(()=>{
        alert('Job Done');
    });

```

[Website](http://dbuddy.in)