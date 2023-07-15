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

import { ErrorType } from '../models/ErrorType';
import { HttpFile } from '../http/http';

export class ErrorResponse {
    'errType': ErrorType;
    'msg'?: string | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "errType",
            "baseName": "err_type",
            "type": "ErrorType",
            "format": ""
        },
        {
            "name": "msg",
            "baseName": "msg",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ErrorResponse.attributeTypeMap;
    }

    public constructor() {
    }
}



