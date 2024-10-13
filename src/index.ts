import { Server } from "bun"
import Elysia, { type ElysiaConfig } from "elysia"
const methods = ["get", "post", "put", "delete", "patch"] as const

type _Methods = typeof methods[number]
type ElysiaDynamicRouteConfig<NameFN> = { init?: NameFN }

type ElysiaDynamicRouteRode<Methods extends _Methods> = {
  path: `/${string}`,
  method: Methods,
  handler: Parameters<Elysia[Methods]>[1]
  hooks?: Parameters<Elysia[Methods]>[2]

}

function create(app: Elysia) {
  app.compile()
  return app
}
function isElysia(app: unknown): asserts app is Elysia {
  if (app instanceof Elysia) return
  throw new Error("app is not Elysia")
}

export const ElysiaDynamicRoute = <E extends Elysia, const BasePath extends string = '', const NameFN extends string = "road">(app: E, config?: ElysiaConfig<BasePath, false> & ElysiaDynamicRouteConfig<NameFN>) => {
  const edr = new Elysia({ name: "elysia-dynamic-route", ...config })
    .decorate(config?.init ?? "road", {
      add: {
        get<M extends "get">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
          app.get(path, handler, hooks)
          return create(app)
        },
        post<M extends "post">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
          app.post(path, handler, hooks)
          return create(app)
        },
        put<M extends "put">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
          app.put(path, handler, hooks)
          return create(app)
        },
        patch<M extends "patch">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
          app.patch(path, handler, hooks)
          return create(app)
        },
        delete<M extends "delete">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
          app.delete(path, handler, hooks)
          return create(app)
        },
      }
    }
    )

  app.use(edr)
  return app as unknown as E & typeof edr

}
