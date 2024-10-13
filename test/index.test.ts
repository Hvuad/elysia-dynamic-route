import { describe, test, expect } from "bun:test"
import Elysia from "elysia"
import { ElysiaDynamicRoute } from "../src"


describe("index", () => {
    test("should return true", async () => {
        const { app } = new ElysiaDynamicRoute()
        app.get("/", async ({ road }) => {
            road.add.get("/test", "test")
            return "done"
        })
        app.listen(80)

        console.log('app', app.routeTree)


        const get1 = await app.handle(new Request("http://localhost")).then(res => res.text())
        console.log("test  get1:", get1)
        expect(get1).toBe("done")

        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
        console.log("test  response:", response)
        expect(response).toBe("test")



        expect(true).toBe(true)
    })
    test("should return true wrap", async () => {
        const a = new Elysia().listen(80)
        const { app } = new ElysiaDynamicRoute(a)
        app.get("/", async ({ road }) => {
            road.add.get("/test", "test")
            return "done"
        })

        a.get("/123", ({ road }) => "123")

        console.log('app', a.routeTree)
        console.log('app', app.routeTree)

        const get1 = await app.handle(new Request("http://localhost")).then(res => res.text())
        console.log("test  get1:", get1)
        expect(get1).toBe("done")
        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
        console.log("test  response:", response)
        expect(response).toBe("test")
    })

    test("should return true use", async () => {
        const { EDR } = new ElysiaDynamicRoute()
        const app = new Elysia().use(EDR)
        app.get("/", async ({ road }) => {
            road.add.get("/test", "test")
            return "done"
        })
        app.listen(80)
        console.log('app', app.routeTree)

        const get1 = await app.handle(new Request("http://localhost")).then(res => res.text())
        console.log("test  get1:", get1)
        expect(get1).toBe("done")
        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
        console.log("test  response:", response)
        expect(response).toBe("test")
    })

})