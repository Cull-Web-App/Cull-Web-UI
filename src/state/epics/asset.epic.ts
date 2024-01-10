import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    initializeAssets,
    initializeAssetsSuccess,
    initializeAssetsError,
    findManyAssetsWithQuery,
    findManyAssetsWithQuerySuccess,
    findManyAssetsWithQueryError,
    clearSearch,
    clearSearchSuccess,
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { container } from '../../common/ioc/container.ioc';
import { IAssetService as IAssetService } from '../../common';
import { BaseEpic } from './base.epic';

export class AssetEpic extends BaseEpic {
    private readonly assetService!: IAssetService;

    public constructor() {
        super();
        this.assetService = container.get<IAssetService>(IDENTIFIERS.IASSET_SERVICE);
        this.addEpics([this.initializeAssets$, this.findManyWithFilter$, this.clearSearch$]);
    }

    public initializeAssets$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(initializeAssets),
        switchMap(() => {
            return this.assetService.findMany('').pipe(
                map(assets => initializeAssetsSuccess({ assets })),
                catchError(error => [
                    initializeAssetsError(error)
                ])
            );
        })
    );

    public findManyWithFilter$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(findManyAssetsWithQuery),
        switchMap(({ payload: { query } }: { payload: { query: string } }) => {
            return this.assetService.findMany(query).pipe(
                map(assets => findManyAssetsWithQuerySuccess({ assets })),
                catchError(error => [
                    findManyAssetsWithQueryError(error)
                ])
            );
        })
    );

    public clearSearch$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(clearSearch),
        map(() => clearSearchSuccess())
    );
}
