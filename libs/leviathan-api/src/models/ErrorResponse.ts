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
import type { ErrorType } from './ErrorType';
import {
    ErrorTypeFromJSON,
    ErrorTypeFromJSONTyped,
    ErrorTypeToJSON,
} from './ErrorType';

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {ErrorType}
     * @memberof ErrorResponse
     */
    errType: ErrorType;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    msg?: string | null;
}

/**
 * Check if a given object implements the ErrorResponse interface.
 */
export function instanceOfErrorResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "errType" in value;

    return isInstance;
}

export function ErrorResponseFromJSON(json: any): ErrorResponse {
    return ErrorResponseFromJSONTyped(json, false);
}

export function ErrorResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errType': ErrorTypeFromJSON(json['err_type']),
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
    };
}

export function ErrorResponseToJSON(value?: ErrorResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'err_type': ErrorTypeToJSON(value.errType),
        'msg': value.msg,
    };
}

