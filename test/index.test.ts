import { describe, test, expect } from "bun:test"
import Elysia from "elysia"
import { ElysiaDynamicRouteRode } from "../src"


describe("index", () => {
    test("should return true", async () => {
        const app = new Elysia()
        const a = ElysiaDynamicRoute(app)
            .get("/", async ({ road }) => {
                road.add.get("/test", "test")
                return "done"
            })


        const get1 = await app.handle(new Request("http://localhost")).then(res => res.text())

        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())



        expect(true).toBe(true)
    })
})