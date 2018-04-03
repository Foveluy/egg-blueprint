interface Decorator {
    (target: any, propertyKey: string): void
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
}

interface Initor {
    (app: any): void
}

export const bp: blueprint
export const Blueprint: Initor
