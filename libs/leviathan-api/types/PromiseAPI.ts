import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'

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
import { ObservableGuessApi } from './ObservableAPI';

import { GuessApiRequestFactory, GuessApiResponseProcessor} from "../apis/GuessApi";
export class PromiseGuessApi {
    private api: ObservableGuessApi

    public constructor(
        configuration: Configuration,
        requestFactory?: GuessApiRequestFactory,
        responseProcessor?: GuessApiResponseProcessor
    ) {
        this.api = new ObservableGuessApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param checkGuessRequest 
     */
    public checkGuess(checkGuessRequest: CheckGuessRequest, _options?: Configuration): Promise<CheckGuessResponse> {
        const result = this.api.checkGuess(checkGuessRequest, _options);
        return result.toPromise();
    }

    /**
     */
    public index(_options?: Configuration): Promise<void> {
        const result = this.api.index(_options);
        return result.toPromise();
    }

    /**
     * @param region The region name. Refer to the Region schema.
     */
    public players(region: string, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.players(region, _options);
        return result.toPromise();
    }

    /**
     * @param region The region name. Refer to the Region schema.
     */
    public previousPlayer(region: string, _options?: Configuration): Promise<PreviousPlayerResponse> {
        const result = this.api.previousPlayer(region, _options);
        return result.toPromise();
    }

    /**
     */
    public resetTime(_options?: Configuration): Promise<ResetTimeResponse> {
        const result = this.api.resetTime(_options);
        return result.toPromise();
    }


}



