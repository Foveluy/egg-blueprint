interface Decorator {
    (target: any, propertyKey: string): void
}

interface bpItem {
    httpMethod: string
    constructor: Function
    handler: string
}

export interface blueprint {
    /**
     * http post method
     * @param url
     */
    post(url: string): Decorator

    /**
     * http get method
     * @param url
     */
    get(url: string): Decorator
    patch(url: string): Decorator
    del(url: string): Decorator
    options(url: string): Decorator
    put(url: string): Decorator

    restfulClass(url: string): any

    getRoute(): any

    setRouter(urls: string, bp: bpItem): void
    scanController(): void
}

interface RouterOptions {
    prefix: string
}

interface Initor {
    (app: any, options?: RouterOptions): void
}

export const bp: blueprint
export const Blueprint: Initor
