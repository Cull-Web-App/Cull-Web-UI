export class Watch {
    public symbol: string;
    public createdAt: Date;

    public constructor(watch: Record<string, string | Date | undefined>) {
        this.symbol = watch.symbol as string;
        this.createdAt = typeof watch.createdAt === 'string' ? new Date(watch.createdAt) : watch.createdAt as Date;
    }
}
