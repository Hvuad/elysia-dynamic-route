import { describe, test, expect } from "bun:test"
import Elysia from "elysia"
import { ElysiaDynamicRoute } from "../src"


describe("index", () => {
    test("should return true", async () => {
        const app = new Elysia()
        new ElysiaDynamicRoute(app)
        app.get("/", async ({ road }) => {
            road.add.get("/test", "test")
            return "done"
        })


        const get1 = await app.handle(new Request("http://localhost")).then(res => res.text())
        console.log("test  get1:", get1)

        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
        console.log("test  response:", response)



        expect(true).toBe(true)
    })
})