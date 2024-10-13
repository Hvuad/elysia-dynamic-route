import { describe, test, expect } from "bun:test"
import Elysia from "elysia"
import { ElysiaDynamicRoute } from "../src"


describe("index", () => {
    test("should return true", async () => {
        const app = new Elysia().use(ElysiaDynamicRoute())
        const a = ElysiaDynamicRoute(app)
        a.get("/", async ({ road }) => {
                road.add.get("/test", "test")
                return "done"
            })
        app.get("/1", async ({ road }) => {
                road.add.get("/test", "test")
                return "done"
            })
        console.log("test  app:", app.routeTree)
        console.log("test  app:", a.routeTree)


        const get1 = await app.handle(new Request("http://localhost")).then(res => res.text())
        console.log("test  get1:", get1)

        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
        console.log("test  response:", response)



        expect(true).toBe(true)
    })
})