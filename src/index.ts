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
  if (!app.server) throw new Error("Elysia instance is required")
  app.listen(app.server.port)
  return app
}

export class ElysiaDynamicRoute<E extends Elysia, const BasePath extends string = '', const NameFN extends string = "road"> {
  app: Elysia<BasePath, false>
  constructor(app: E, public config?: ElysiaConfig<BasePath, false> & ElysiaDynamicRouteConfig<NameFN>) {

    if (!app) throw new Error("Elysia instance is required")

    app.use(new Elysia<BasePath>({ name: "elysia-dynamic-route", ...config })
      .decorate(config?.init ?? "road", {
        add: {
          get<M extends "get">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
            app.get(path, handler, hooks)
            return create(app)
          },
          post<M extends "post">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
            app.get(path, handler, hooks)
            return create(app)
          },
          put<M extends "put">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
            app.get(path, handler, hooks)
            return create(app)
          },
          patch<M extends "patch">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
            app.get(path, handler, hooks)
            return create(app)
          },
          delete<M extends "delete">(path: ElysiaDynamicRouteRode<M>['path'], handler: ElysiaDynamicRouteRode<M>['handler'], hooks?: ElysiaDynamicRouteRode<M>['hooks']) {
            app.get(path, handler, hooks)
            return create(app)
          },
        }
      }
      ))
    this.app = app
  }
}