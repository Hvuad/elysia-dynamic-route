import { describe, test, expect } from "bun:test"
import Elysia from "elysia"
import { ElysiaDynamicRoute } from "../src"
import { sleep } from "bun"


const app = new Elysia().use(app => ElysiaDynamicRoute(app))
describe("index", () => {
    test("should create success", async () => {
        app.get("/", async ({ road }) => {
            road.add.get("/test", "test")
            return "done"
        })

        const createRoad = await app.handle(new Request("http://localhost")).then(res => res.text())
        expect(createRoad).toBe("done")




    })
    test("should access new route test", async () => {
        const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
        expect(response).toBe("test")

    })
})