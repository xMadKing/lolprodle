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

import { ObservableGuessApi } from "./ObservableAPI";
import { GuessApiRequestFactory, GuessApiResponseProcessor} from "../apis/GuessApi";

export interface GuessApiCheckGuessRequest {
    /**
     * 
     * @type CheckGuessRequest
     * @memberof GuessApicheckGuess
     */
    checkGuessRequest: CheckGuessRequest
}

export interface GuessApiIndexRequest {
}

export interface GuessApiPlayersRequest {
    /**
     * The region name. Refer to the Region schema.
     * @type string
     * @memberof GuessApiplayers
     */
    region: string
}

export interface GuessApiPreviousPlayerRequest {
    /**
     * The region name. Refer to the Region schema.
     * @type string
     * @memberof GuessApipreviousPlayer
     */
    region: string
}

export interface GuessApiResetTimeRequest {
}

export class ObjectGuessApi {
    private api: ObservableGuessApi

    public constructor(configuration: Configuration, requestFactory?: GuessApiRequestFactory, responseProcessor?: GuessApiResponseProcessor) {
        this.api = new ObservableGuessApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public checkGuess(param: GuessApiCheckGuessRequest, options?: Configuration): Promise<CheckGuessResponse> {
        return this.api.checkGuess(param.checkGuessRequest,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public index(param: GuessApiIndexRequest = {}, options?: Configuration): Promise<void> {
        return this.api.index( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public players(param: GuessApiPlayersRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.players(param.region,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public previousPlayer(param: GuessApiPreviousPlayerRequest, options?: Configuration): Promise<PreviousPlayerResponse> {
        return this.api.previousPlayer(param.region,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public resetTime(param: GuessApiResetTimeRequest = {}, options?: Configuration): Promise<ResetTimeResponse> {
        return this.api.resetTime( options).toPromise();
    }

}
