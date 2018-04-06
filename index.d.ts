import { Controller, Context } from 'egg'

interface Decorator {
    (target: any, propertyKey: string): void
}

interface bpItem {
    httpMethod: string
    constructor: Function
    handler: string
}

interface BeforeFunction {
    (ctx: Context, instance: Controller): Boolean | undefined
}

export interface blueprint {
    /**
     * http post method
     * @param url
     */
    post(url: string, before?: BeforeFunction): Decorator

    /**
     * http get method
     * @param url
     */
    get(url: string, before?: BeforeFunction): Decorator
    patch(url: string, before?: BeforeFunction): Decorator
    del(url: string, before?: BeforeFunction): Decorator
    options(url: string, before?: BeforeFunction): Decorator
    put(url: string, before?: BeforeFunction): Decorator

    restfulClass(url: string, before?: BeforeFunction): any

    prefix(url:string,controllerName:string):any

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
