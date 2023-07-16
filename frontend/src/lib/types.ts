export enum ToastStatus {
    Info,
    Success,
    Error
}

export class Toast {
    readonly status: ToastStatus;
    readonly message: string;
    readonly durationMillis: number; // unix time for when to hide

    constructor(status: ToastStatus, message: string, durationMillis: number) {
        this.status = status;
        this.message = message;
        this.durationMillis = durationMillis;
    }
}

export class Duration {
    static secs(secs: number): number {
        return secs * 1000;
    }

    static mins(mins: number): number {
        return mins * this.secs(60);
    }
}

export enum DataFetchState {
    Loading,
    Fetched,
    Error
}
