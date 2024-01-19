import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { IMarketMakerMoveRepository } from "../repositories";
import { IMarketMakerMoveService } from "./imarket-maker-move.service";
import { MarketMakerMove } from "../models";

@injectable()
export class MarketMakerMoveService implements IMarketMakerMoveService {
    @inject(IDENTIFIERS.IMARKET_MAKER_MOVE_REPOSITORY) private readonly marketMakerMoveRepository!: IMarketMakerMoveRepository;
    
    public connect(): Observable<void> {
        return this.marketMakerMoveRepository.connect();
    }

    public disconnect(): Observable<void> {
        return this.marketMakerMoveRepository.disconnect();
    }

    public registerAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        this.marketMakerMoveRepository.registerAll(new Map<string, (...args: any[]) => void>([
            ['ReceiveMarketMakerMove', (move: Record<string, string | number | Date>) => registrationMap.get('ReceiveMarketMakerMove')!(new MarketMakerMove(move))]
        ]));
    }

    public deregisterAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        this.marketMakerMoveRepository.deregisterAll(new Map<string, (...args: any[]) => void>([
            ['ReceiveMarketMakerMove', () => registrationMap.get('ReceiveMarketMakerMove')!()]
        ]));
    }

    public subscribe(symbol: string): Observable<void> {
        return this.marketMakerMoveRepository.invoke('Subscribe', symbol);
    }

    public unsubscribe(symbol: string): Observable<void> {
        return this.marketMakerMoveRepository.invoke('Unsubscribe', symbol);
    }
}