import { ICalendar } from "./icalendar.model";

export class Calendar implements ICalendar {
    public sessionOpen!: Date;
    public sessionClose!: Date;
    public tradingOpen!: Date;
    public tradingClose!: Date;
    public date!: Date;

    public constructor(data: Record<string, string | Date | boolean | undefined>) {
        this.sessionOpen = new Date((data.session as any).openEst as string);
        this.sessionClose = new Date((data.session as any).closeEst as string);
        this.tradingOpen = new Date((data.trading as any).openEst as string);
        this.tradingClose = new Date((data.trading as any).closeEst as string);
        this.date = new Date(data.tradingDate as string);
    }
}