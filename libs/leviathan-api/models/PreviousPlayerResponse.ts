/**
 * leviathan
 * lolprodle API server
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Player } from '../models/Player';
import { HttpFile } from '../http/http';

export class PreviousPlayerResponse {
    'player': Player;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "player",
            "baseName": "player",
            "type": "Player",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return PreviousPlayerResponse.attributeTypeMap;
    }

    public constructor() {
    }
}

