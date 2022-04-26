export class Task {
    public constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
}