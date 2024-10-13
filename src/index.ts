import { Server } from "bun"
import Elysia, { type ElysiaConfig } from "elysia"
const methods = ["get", "post", "put", "delete", "patch"] as const

type _Methods = typeof methods[number]
type ElysiaDynamicRouteConfig<NameFN extends string = "road"> = { name?: NameFN }

type ElysiaDynamicRouteRode<Methods extends _Methods> = {
  path: `/${string}`,
  method: Methods,
  handler: Parameters<Elysia[Methods]>[1]
  hooks?: Parameters<Elysia[Methods]>[2]

}

function compile(app: Elysia) {
  app.compile()
  app.version
  return app
}

export class ElysiaDynamicRoute<E extends Elysia, const BasePath extends string = '', const NameFN extends string = "road"> {

  constructor(public config?: ElysiaConfig<BasePath, false> & ElysiaDynamicRouteConfig<NameFN>) { }

  get elysia() {
    return (app: E) => {
      const edr = new Elysia({ name: "elysia-dynamic-route", ...(this?.config ?? {}) })
        .decorate(this?.config?.name ?? "road", {
          add: {
            get<M extends "get">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
              app.get(path, handler, hooks)
              console.log("ElysiaDynamicRoute<E  return  app:", app)
              return compile(app)
            },
            post<M extends "post">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
              app.post(path, handler, hooks)
              return compile(app)
            },
            put<M extends "put">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
              app.put(path, handler, hooks)
              return compile(app)
            },
            patch<M extends "patch">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
              app.patch(path, handler, hooks)
              return compile(app)
            },
            delete<M extends "delete">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
              app.delete(path, handler, hooks)
              return compile(app)
            },
          }
        }
        )
      app.use(edr)
      return app as unknown as E & typeof edr
    }
  }
}