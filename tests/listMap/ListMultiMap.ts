import * as chai from 'chai';
import {TestUser} from "./TestUser";
import ListMultiMap from "../../lib/types/ListMultiMap";

const expect = chai.expect;

describe('ListMultiMap 测试', () => {
    it('测试From生成', () => {
        const number = 10;
        let userList = TestUser.generate(1, number);
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.length).to.equal(number);
    });

    it('测试From生成, Map数据正确 - 1', () => {
        const number = 10;
        let userList = TestUser.generate(1, number);
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.getMapKeys("seat").length).to.equal(number);
    });

    it('测试From生成, Map数据正确 - 2', () => {
        const number = 10;
        let userList = TestUser.generate(1, number);
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.getMapKeys("id").length).to.equal(number);
    });

    it('测试From生成后, List中的内容正确', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))

        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let listMapSeatString = listMultiMap.map(ele => ele.seat).sort((A, B) => B - A).join("-");
        let seatString = seatList.sort((A, B) => B - A).join("-")
        expect(listMapSeatString).to.equal(seatString);
    });

    it('测试 ListMultiMap 功能 - getFromList', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        const index = 3;
        expect(listMultiMap.getFromList(index).seat).to.equal(seatList[index]);
    });

    it('测试 ListMultiMap 功能 - getFromMap - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        const seat = 3;

        expect(listMultiMap.getFromMap("seat", seat).seat).to.equal(seat);
    });

    it('测试 ListMultiMap 功能 - getFromMap - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.getFromMap("id", "id_1").seat).to.equal(1);
    });


    it('测试 ListMultiMap 功能 - hasFromMap - 1 - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.hasFromMap("seat", 3)).to.equal(true);
    });

    it('测试 ListMultiMap 功能 - hasFromMap - 1 - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.hasFromMap("seat", 5)).to.equal(false);
    });

    it('测试 ListMultiMap 功能 - hasFromMap - 2 - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.hasFromMap("id", "id_1")).to.equal(true);
    });

    it('测试 ListMultiMap 功能 - hasFromMap - 2 - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.hasFromMap("id", "id_5")).to.equal(false);
    });


    it('测试 ListMultiMap 功能 - getMapKeys - 1', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal(seatList.join("-"));
    });

    it('测试 ListMultiMap 功能 - getMapKeys - 2', () => {
        let seatList = [1, 2, 3, 4];
        let idList = seatList.map(ele => `id_${ele}`)

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.getMapKeys("id").join("-")).to.equal(idList.join("-"));
    });


    it('测试 ListMultiMap 功能 - push - 1', () => {
        let seatList = [1, 2, 3, 4];
        let idList = seatList.map(ele => `id_${ele}`)

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.push(new TestUser(5), new TestUser(6))
        expect(listMultiMap.length).to.equal(6);
    });
    it('测试 ListMultiMap 功能 - push - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.push(new TestUser(5), new TestUser(6))
        expect(listMultiMap.getFromList(4).seat).to.equal(5);
    });
    it('测试 ListMultiMap 功能 - push - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.push(new TestUser(5), new TestUser(6))
        expect(listMultiMap.getFromMap("seat", 5).id).to.equal("id_5");
    });
    it('测试 ListMultiMap 功能 - push - 4', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.push(new TestUser(5), new TestUser(6))
        expect(listMultiMap.getFromMap("id", "id_6").seat).to.equal(6);
    });


    it('测试 ListMultiMap 功能 - unshift - 1', () => {
        let seatList = [1, 2, 3, 4];
        let idList = seatList.map(ele => `id_${ele}`)

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.unshift(new TestUser(5), new TestUser(6))
        expect(listMultiMap.length).to.equal(6);
    });
    it('测试 ListMultiMap 功能 - unshift - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.unshift(new TestUser(5), new TestUser(6))
        expect(listMultiMap.getFromList(1).seat).to.equal(6);
    });
    it('测试 ListMultiMap 功能 - unshift - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.unshift(new TestUser(5), new TestUser(6))
        expect(listMultiMap.getFromMap("seat", 5).id).to.equal("id_5");
    });
    it('测试 ListMultiMap 功能 - unshift - 4', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.unshift(new TestUser(5), new TestUser(6))
        expect(listMultiMap.getFromMap("id", "id_6").seat).to.equal(6);
    });


    it('测试 ListMultiMap 功能 - shift - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.shift()
        expect(res.seat).to.equal(1);
    });
    it('测试 ListMultiMap 功能 - shift - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.shift()
        expect(listMultiMap.length).to.equal(seatList.length - 1);
    });
    it('测试 ListMultiMap 功能 - shift - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.shift()
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([2, 3, 4].join("-"));
    });


    it('测试 ListMultiMap 功能 - pop - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.pop()
        expect(res.seat).to.equal(4);
    });
    it('测试 ListMultiMap 功能 - pop - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.pop()
        expect(listMultiMap.length).to.equal(seatList.length - 1);
    });
    it('测试 ListMultiMap 功能 - pop - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.pop()
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([1, 2, 3].join("-"));
    });


    it('测试 ListMultiMap 功能 - delete - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.delete(userList[2])
        expect(res.seat).to.equal(3);
    });
    it('测试 ListMultiMap 功能 - delete - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.delete(userList[1])
        expect(listMultiMap.length).to.equal(seatList.length - 1);
    });
    it('测试 ListMultiMap 功能 - delete - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.delete(userList[1])
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([1, 3, 4].join("-"));
    });


    it('测试 ListMultiMap 功能 - deleteIndex - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.deleteIndex(2)
        expect(res.seat).to.equal(3);
    });
    it('测试 ListMultiMap 功能 - deleteIndex - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.deleteIndex(1)
        expect(listMultiMap.length).to.equal(seatList.length - 1);
    });
    it('测试 ListMultiMap 功能 - deleteIndex - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.deleteIndex(1)
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([1, 3, 4].join("-"));
    });


    it('测试 ListMultiMap 功能 - deleteKey - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.deleteKey("seat", 2)
        expect(res.seat).to.equal(2);
    });
    it('测试 ListMultiMap 功能 - deleteKey - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.deleteKey("seat", 1)
        expect(listMultiMap.length).to.equal(seatList.length - 1);
    });
    it('测试 ListMultiMap 功能 - deleteKey - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.deleteKey("seat", 1)
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([2, 3, 4].join("-"));
    });


    it('测试 ListMultiMap 功能 - splice - 1', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.splice(1, 2)
        expect(res.map(ele => ele.seat).join("-")).to.equal([2, 3].join("-"));
    });
    it('测试 ListMultiMap 功能 - splice - 2', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.splice(1, 2)
        expect(listMultiMap.length).to.equal(seatList.length - 2);
    });
    it('测试 ListMultiMap 功能 - splice - 3', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.splice(1, 2)
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([1, 4].join("-"));
    });
    it('测试 ListMultiMap 功能 - splice - 4', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.splice(1, 2, new TestUser(2), new TestUser(5));
        expect(listMultiMap.getMapKeys("seat").join("-")).to.equal([1, 4, 2, 5].join("-"));
    });
    it('测试 ListMultiMap 功能 - splice - 5', () => {
        let seatList = [1, 2, 3, 4];

        let userList = seatList.map(ele => new TestUser(ele))
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        listMultiMap.splice(1, 1, new TestUser(2), new TestUser(6));
        expect(listMultiMap.map(ele => ele.seat).join("-")).to.equal([1, 2, 6, 3, 4].join("-"));
    });


    it('测试 ListMultiMap 功能 - indexOf', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.indexOf(user1)).to.equal(0);
    });

    it('测试 ListMultiMap 功能 - includes', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.includes(user1)).to.equal(true);
    });

    it('测试 ListMultiMap 功能 - includes', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let user4 = new TestUser(4);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.includes(user4)).to.equal(false);
    });

    it('测试 ListMultiMap 功能 - slice', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        expect(listMultiMap.slice(1, 3).map(ele => ele.seat).join("-")).to.equal([1, 2].join("-"));
    });

    it('测试 ListMultiMap 功能 - find', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let findRes = listMultiMap.find(ele => ele.seat === 1);
        expect(findRes.seat).to.equal(user1.seat);
    });

    it('测试 ListMultiMap 功能 - filter', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let filterRes = listMultiMap.filter(ele => ele.seat === 1);
        expect(filterRes.length).to.equal(2);
    });


    it('测试 ListMultiMap 功能 - findIndex', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let filterRes = listMultiMap.findIndex(ele => ele.seat === 1);
        expect(filterRes).to.equal(1);
    });

    it('测试 ListMultiMap 功能 - findIndex', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let filterRes = listMultiMap.findIndex(ele => ele.seat === 4);
        expect(filterRes).to.equal(-1);
    });

    it('测试 ListMultiMap 功能 - map', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        expect(listMultiMap.map(ele => ele.seat).join("-")).to.equal([2, 1, 2, 1, 3].join("-"));
    });

    it('测试 ListMultiMap 功能 - forEach', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let seatList = [];
        listMultiMap.forEach(ele => {
            seatList.push(ele.seat);
        })

        expect(seatList.join("-")).to.equal([2, 1, 2, 1, 3].join("-"));
    });

    it('测试 ListMultiMap 功能 - sort', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.sort((A, B) => B.seat - A.seat);
        expect(res.map(ele => ele.seat).join("-")).to.equal([3, 2, 2, 1, 1].join("-"));
    });
    it('测试 ListMultiMap 功能 - sort', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        listMultiMap.sort((A, B) => A.seat - B.seat);
        expect(listMultiMap.map(ele => ele.seat).join("-")).to.equal([1, 1, 2, 2, 3].join("-"));
    });

    it('测试 ListMultiMap 功能 - reverse', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.reverse();
        expect(res.map(ele => ele.seat).join("-")).to.equal([3, 1, 2, 1, 2].join("-"));
    });
    it('测试 ListMultiMap 功能 - reverse', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        listMultiMap.reverse();
        expect(listMultiMap.map(ele => ele.seat).join("-")).to.equal([3, 1, 2, 1, 2].join("-"));
    });

    it('测试 ListMultiMap 功能 - every', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.every(ele => ele.seat === 1);
        expect(res).to.equal(false);
    });
    it('测试 ListMultiMap 功能 - every', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.every(ele => ele.seat <= 3);
        expect(res).to.equal(true);
    });
    it('测试 ListMultiMap 功能 - every', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.every(ele => ele.seat < 3);
        expect(res).to.equal(false);
    });

    it('测试 ListMultiMap 功能 - some', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.some(ele => ele.seat === 3);
        expect(res).to.equal(true);
    });
    it('测试 ListMultiMap 功能 - some', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);
        let res = listMultiMap.some(ele => ele.seat === 4);
        expect(res).to.equal(false);
    });


    it('测试 ListMultiMap 功能 - concat - 1', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.concat(new TestUser(4));
        expect(res.length).to.equal(6);
    });
    it('测试 ListMultiMap 功能 - concat - 2', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.concat(new TestUser(4));
        expect(res.getFromList(5).seat).to.equal(4);
    });
    it('测试 ListMultiMap 功能 - concat - 3', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.concat([new TestUser(4), new TestUser(5)]);
        expect(res.getFromList(6).seat).to.equal(5);
    });
    it('测试 ListMultiMap 功能 - concat - 4', () => {
        let user1 = new TestUser(1);
        let user2 = new TestUser(2);
        let user3 = new TestUser(3);
        let userList = [user2, user1, user3];
        let listMultiMap: ListMultiMap<TestUser> = ListMultiMap.from(userList, ["seat", "id"]);

        let res = listMultiMap.concat(listMultiMap);
        expect(res.map(ele => ele.seat).join("-")).to.equal([2, 1, 3, 2, 1, 3].join("-"));
    });


})