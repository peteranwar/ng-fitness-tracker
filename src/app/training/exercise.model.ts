export  interface Exercise {
    duration: number,
    payload: any;
    id: string,
    name: string,
    calories: number,
    date?: Date,
    state?: 'completed' | 'cancelled' | null
}