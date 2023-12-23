import { ISymbolService } from './isymbol.service';
import { Observable } from 'rxjs';
import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { ISymbolRepository } from '../repositories/isymbol.repository';
import { IAsset } from '../models';

@injectable()
export class SymbolService implements ISymbolService {

    @inject(IDENTIFIERS.ISYMBOL_REPOSITORY) private readonly symbolRepository!: ISymbolRepository;

    public findMany(query: string): Observable<IAsset[]> {
        return this.symbolRepository.findMany(query);
    }
}