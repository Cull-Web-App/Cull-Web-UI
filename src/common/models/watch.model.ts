import { IWatch } from "./iwatch.model";

export class Watch implements IWatch {
    public symbol: string;
    public position: number;
    public createdAt: Date;

    public constructor(watch: Record<string, string | Date | number | undefined>) {
        this.symbol = watch.symbol as string;
        this.position = watch.position as number;

        if (typeof watch.createdAt === 'string') {
            this.createdAt = new Date(watch.createdAt);
        } else if (typeof watch.createdAt !== 'undefined') {
            this.createdAt = watch.createdAt as Date;
        } else {
            this.createdAt = new Date();
        }
    }
}
