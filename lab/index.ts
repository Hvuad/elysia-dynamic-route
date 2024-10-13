class a {

    constructor(public config?: string) { }
    b(a: string) {
        console.log('this.config', this?.config)
    }
    get z() {
        return ""
    }
    set z(a: string) {
        a
    }
}
const { b } = new a()
b()
const c = new a("1234")
c.b("123")

function exec(fn:any){
    return fn()
}
exec(c.b)