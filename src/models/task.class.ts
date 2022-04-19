export class Task {
    title!: string;
    date!: number;
    category!: string;
    urgency!: string;
    description!: string;
    assignedTo!: string;

    public constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }

    public toJSON() {
        return {
            title: this.title,
            date: this.date,
            category: this.category,
            urgency: this.urgency,
            description: this.description,
            assignedTo: this.assignedTo
        }
    }
}