/* tslint:disable */
/* eslint-disable */
/**
 * leviathan
 * lolprodle API server
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Region } from './Region';
import {
    RegionFromJSON,
    RegionFromJSONTyped,
    RegionToJSON,
} from './Region';

/**
 * 
 * @export
 * @interface CheckGuessRequest
 */
export interface CheckGuessRequest {
    /**
     * 
     * @type {string}
     * @memberof CheckGuessRequest
     */
    playerId: string;
    /**
     * 
     * @type {Region}
     * @memberof CheckGuessRequest
     */
    region: Region;
}

/**
 * Check if a given object implements the CheckGuessRequest interface.
 */
export function instanceOfCheckGuessRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "playerId" in value;
    isInstance = isInstance && "region" in value;

    return isInstance;
}

export function CheckGuessRequestFromJSON(json: any): CheckGuessRequest {
    return CheckGuessRequestFromJSONTyped(json, false);
}

export function CheckGuessRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CheckGuessRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'playerId': json['player_id'],
        'region': RegionFromJSON(json['region']),
    };
}

export function CheckGuessRequestToJSON(value?: CheckGuessRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'player_id': value.playerId,
        'region': RegionToJSON(value.region),
    };
}

