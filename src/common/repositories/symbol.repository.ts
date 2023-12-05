import { ISymbolRepository } from './isymbol.repository';
import { injectable, inject } from 'inversify';
import { Observable, map } from 'rxjs';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IHttpRepository } from './ihttp.repository';

@injectable()
export class SymbolRepository implements ISymbolRepository {
    private readonly url = 'http://localhost:8080/symbols';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public findAll(): Observable<string[]> {
        return this.httpRepository.get<string[]>(this.url).pipe(
            map(d => d.data as string[])
        );
    }
}