import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { CheckGuessRequest } from '../models/CheckGuessRequest';
import { CheckGuessResponse } from '../models/CheckGuessResponse';
import { ErrorResponse } from '../models/ErrorResponse';
import { ErrorType } from '../models/ErrorType';
import { Guess } from '../models/Guess';
import { GuessCategory } from '../models/GuessCategory';
import { GuessCategoryResult } from '../models/GuessCategoryResult';
import { Player } from '../models/Player';
import { PreviousPlayerResponse } from '../models/PreviousPlayerResponse';
import { Region } from '../models/Region';
import { ResetTimeResponse } from '../models/ResetTimeResponse';

import { GuessApiRequestFactory, GuessApiResponseProcessor} from "../apis/GuessApi";
export class ObservableGuessApi {
    private requestFactory: GuessApiRequestFactory;
    private responseProcessor: GuessApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: GuessApiRequestFactory,
        responseProcessor?: GuessApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new GuessApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new GuessApiResponseProcessor();
    }

    /**
     * @param checkGuessRequest 
     */
    public checkGuess(checkGuessRequest: CheckGuessRequest, _options?: Configuration): Observable<CheckGuessResponse> {
        const requestContextPromise = this.requestFactory.checkGuess(checkGuessRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.checkGuess(rsp)));
            }));
    }

    /**
     */
    public index(_options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.index(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.index(rsp)));
            }));
    }

    /**
     * @param region The region name. Refer to the Region schema.
     */
    public players(region: string, _options?: Configuration): Observable<Array<string>> {
        const requestContextPromise = this.requestFactory.players(region, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.players(rsp)));
            }));
    }

    /**
     * @param region The region name. Refer to the Region schema.
     */
    public previousPlayer(region: string, _options?: Configuration): Observable<PreviousPlayerResponse> {
        const requestContextPromise = this.requestFactory.previousPlayer(region, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.previousPlayer(rsp)));
            }));
    }

    /**
     */
    public resetTime(_options?: Configuration): Observable<ResetTimeResponse> {
        const requestContextPromise = this.requestFactory.resetTime(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.resetTime(rsp)));
            }));
    }

}
