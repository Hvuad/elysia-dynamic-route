import { Server } from "bun"
import Elysia, { type ElysiaConfig } from "elysia"
const methods = ["get", "post", "put", "delete", "patch"] as const

type _Methods = typeof methods[number]
type ElysiaDynamicRouteConfig<NameFN> = { init?: NameFN }

type ElysiaDynamicRoute<Methods extends _Methods> = {
  path: `/${string}`,
  method: Methods,
  handler: Parameters<Elysia[Methods]>[1]
  hooks?: Parameters<Elysia[Methods]>[2]

}

function create(app: Elysia) {
  if (!app.server) throw new Error("Elysia instance is required")
  app.listen(app.server.port)
  return app
}

export const ElysiaDynamicRoute = <E extends Elysia, const BasePath extends string = '', const NameFN extends string = "road">(app: E, config?: ElysiaConfig<BasePath, false> & ElysiaDynamicRouteConfig<NameFN>) => {

  if (!app) throw new Error("Elysia instance is required")

  return app.use(new Elysia<BasePath>({ name: "elysia-dynamic-route", ...config })
    .decorate(config?.init ?? "road", {
      add: {
        get<M extends "get">(path: ElysiaDynamicRoute<M>['path'], handler: ElysiaDynamicRoute<M>['handler'], hooks?: ElysiaDynamicRoute<M>['hooks']) {
          app.get(path, handler, hooks)
          return create(app)
        },
        post<M extends "post">(path: ElysiaDynamicRoute<M>['path'], handler: ElysiaDynamicRoute<M>['handler'], hooks?: ElysiaDynamicRoute<M>['hooks']) {
          app.get(path, handler, hooks)
          return create(app)
        },
        put<M extends "put">(path: ElysiaDynamicRoute<M>['path'], handler: ElysiaDynamicRoute<M>['handler'], hooks?: ElysiaDynamicRoute<M>['hooks']) {
          app.get(path, handler, hooks)
          return create(app)
        },
        patch<M extends "patch">(path: ElysiaDynamicRoute<M>['path'], handler: ElysiaDynamicRoute<M>['handler'], hooks?: ElysiaDynamicRoute<M>['hooks']) {
          app.get(path, handler, hooks)
          return create(app)
        },
        delete<M extends "delete">(path: ElysiaDynamicRoute<M>['path'], handler: ElysiaDynamicRoute<M>['handler'], hooks?: ElysiaDynamicRoute<M>['hooks']) {
          app.get(path, handler, hooks)
          return create(app)
        },
      }
    }
    ))
}
