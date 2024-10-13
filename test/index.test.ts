import { describe, test, expect } from "bun:test"
import Elysia from "elysia"
import { ElysiaDynamicRoute } from "../src"
import { sleep } from "bun"

const edr = new ElysiaDynamicRoute()
const app = new Elysia().use(edr.elysia).get("/home", "home")
describe("index", () => {

    // test("should create success", async () => {
    //     app.get("/", async ({ road }) => {
    //         road.add.get("/test", "test")
    //         return "done"
    //     })
    //     const createRoad = await app.handle(new Request("http://localhost")).then(res => res.text())
    //     expect(createRoad).toBe("done")

    // })

    // test("should access new route test", async () => {
    //     const response = await app.handle(new Request("http://localhost/test")).then(res => res.text())
    //     expect(response).toBe("test")

    // })


    // test("group should work", async () => {
    //     app.group("/a", (v) => v.get("/", ({ road }) => {
    //         road.add.get("/a/test", "test")
    //         return "done"
    //     }))

    //     const createRoad = await app.handle(new Request("http://localhost/a")).then(res => res.text())
    //     expect(createRoad).toBe("done")
    //     const response = await app.handle(new Request("http://localhost/a/test")).then(res => res.text())
    //     expect(response).toBe("test")
    // })

    test("group with prefix should work", async () => {
        const edr = new ElysiaDynamicRoute({ name: "xxx" })
        const users = new Elysia({ prefix: '/b' })
            .use(edr.elysia)
            .get("/add", ({ xxx }) => {
                expect(xxx).toBeDefined()
                return "done"
            })

        const main = new Elysia()
            .use(users)
            .get('/', "home")

        const createRoad = await main.handle(new Request("http://localhost/b/add")).then(res => res.text())
        expect(createRoad).toBe("done")
        const response = await main.handle(new Request("http://localhost//b/test")).then(res => res.text())
        expect(response).toBe("test")
    })
})