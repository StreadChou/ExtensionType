import * as chai from 'chai';
import ListMap from "../../lib/types/ListMap";
import {TestUser} from "./TestUser";

const expect = chai.expect;

describe('ListMap测试', () => {

    it('测试From生成', () => {
        const number = 10;
        let userList = TestUser.generate(1, number);
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");
        expect(listMap.length).to.equal(number);
    });

    it('测试From生成, Map数据正确', () => {
        const number = 10;
        let userList = TestUser.generate(1, number);
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");
        expect(listMap.keys().length).to.equal(number);
    });

    it('测试From生成后, List中的内容正确', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))

        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");
        let listMapSeatString = listMap.map(ele => ele.seat).sort((A, B) => B - A).join("-");

        let seatString = seatList.sort((A, B) => B - A).join("-")

        expect(listMapSeatString).to.equal(seatString);
    });

    it('测试 ListMap 私有功能 - index', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");

        const index = 3;
        expect(listMap.index(index).seat).to.equal(seatList[index]);
    });

    it('测试 ListMap 私有功能 - key', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");

        const seat = 2;

        const testUser = listMap.key(seat)
        expect(testUser.seat).to.equal(seat);
    });

    it('测试 ListMap 私有功能 - keys', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");

        const mapSeatList = listMap.keys()
        expect(seatList.join("-")).to.equal(mapSeatList.join("-"));
    });

    it('测试 ListMap 私有功能 - has - true', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");

        expect(listMap.has(4)).to.equal(true);
    });


    it('测试 ListMap 私有功能 - has - false', () => {
        let seatList = [1, 2, 3, 4];
        let userList = seatList.map(ele => new TestUser(ele))
        let listMap: ListMap<TestUser> = ListMap.from(userList, "seat");

        expect(listMap.has(5)).to.equal(false);
    });

});
