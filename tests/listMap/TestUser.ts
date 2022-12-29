export class TestUser {
    id: string;
    seat: number;

    constructor(num: number) {
        this.id = `id_${num}`
        this.seat = num;
    }

    // 从seat为start开始生成 number个用户
    static generate(start: number, number: number): Array<TestUser> {
        let reply: Array<TestUser> = []
        for (let i = 0; i < number; i++) {
            reply.push(new TestUser(start + i))
        }
        return reply;
    }

    isId(num: number): boolean {
        return this.id === `id_${num}`
    }


}