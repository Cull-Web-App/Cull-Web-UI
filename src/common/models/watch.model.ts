import { IWatch } from "./iwatch.model";

export class Watch implements IWatch {
    public symbol: string;
    public position: number;
    public createdAt: Date;

    public constructor(watch: Record<string, string | Date | number | undefined>) {
        this.symbol = watch.symbol as string;
        this.position = watch.position as number;
        this.createdAt = typeof watch.createdAt === 'string' ? new Date(watch.createdAt) : watch.createdAt as Date;
    }
}
