export interface VoidContext {
    [key: string]: any;
}

const emptyVoidContext: VoidContext = {};

const handler: ProxyHandler<VoidContext> = {
    get: () => {
        throw new Error('Cannot use context outside of provider');
    },
};

export const createVoidContext = <Ctx>(): Ctx => new Proxy(emptyVoidContext, handler) as Ctx;
