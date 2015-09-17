/**
 * A stop watch.
 */
export class StopWatch {
  constructor() {
    this.startTime = 0.0;
    this.previousTime = 0.0;
    this.isRunning = true;
  }

  start(): void {
    this.startTime = this.previousTime = performance.now();
    this.isRunning = true;
  }

  stop(): void {
    let totalTime = performance.now() - this.startTime;
    this.startTime = this.previousTime = 0.0;
    this.isRunning = false;
    return totalTime;
  }

  getElapsedMilliseconds(): number {
    return performance.now() - this.startTime;
  }

  getDelta(): number {
    let currentTime = performance.now();
    let delta = currentTime - this.previousTime;
    this.previousTime = currentTime;
    return delta;
  }
}
