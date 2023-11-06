
export class TodoEntity {
    public constructor (
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ) {}

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(obj: {[key: string]: any}): TodoEntity {
        const { id, text, completedAt } = obj;
        if(!id) throw new Error('id is required');
        if(!text) throw new Error('text is required');
        let newComplatedAt;
        if(completedAt) {
            newComplatedAt = new Date(completedAt);
            if(isNaN(newComplatedAt.getTime())) throw new Error('completedAt is not a valid date');
        }

        return new TodoEntity(id, text, newComplatedAt);
    }
}