# ExtensionType

Typescript扩展类型, 提供一些方便简单的扩展类型

# 扩展的类型

* ListMap - Array和Map的混合数组
* 经纬度坐标
* XY二维坐标
* XYZ三维坐标

# 如何使用


### ListMultiMap

ListMap方便在一个Array中再根据属性进行HashMap多重索引.  
常见的例子: 在一场游戏中, 玩家存在于一个Array中,   
但是有的时候又需要通过 id 来索引用户, 有的时候又要根据座位号 seat 索引. 来看看 ListMultiMap 的处理方式吧

````typescript
class User {
    uid: string
    seat: number

    constructor(uid: string, seat: number) {
        this.uid = uid;
        this.seat = seat;
    }
}

const user1 = new User("A", 1)
const user2 = new User("B", 2)
const user3 = new User("C", 3)


import ListMultiMap from "extension-type/lib/types/ListMultiMap";

// 你可以通过两种方式来生命一个ListMap,

// 1. 通过数组直接创建
ListMultiMap.from([user1, user2, user3], ["uid", "seat"])
// 2. 创建一个空的 ListMultiMap, 然后增加
let listMultiMap = new ListMultiMap<User>(["uid", "seat"]);
listMultiMap.push(user1)
listMultiMap.push(user2)
listMultiMap.push(user3)


// 获取数组索引获取玩家对象
listMultiMap.getFromList(0) // user1 实例 uid:A, seat: 1

// 通过uid索引玩家对象
listMultiMap.getFromMap("uid", "A"); // user1 实例  uid:A, seat: 1
// 通过座位号索引玩家对象
listMultiMap.getFromMap("seat", 1); // user1 实例  uid:A, seat: 1

// 判断是否存在
listMultiMap.hasFromMap("uid", "A"); // true
listMultiMap.hasFromMap("seat", 1); // true
listMultiMap.hasFromMap("seat", 4); // false



// Object.keys
listMultiMap.getMapKeys("uid") // [A,B,C]
listMultiMap.getMapKeys("seat") // [1,2,3]

// 从数据中移除
listMultiMap.delete(user1) // 将会删除user1
listMultiMap.deleteIndex(0) // (0是数组的索引) 将会删除user1
listMultiMap.deleteKey("uid", "A") // 将会删除user1
listMultiMap.deleteKey("seat", 1) // 将会删除user1

// 同时你还可以使用很多Array的方法
listMultiMap.map(()=>{})
listMultiMap.forEach(()=>{})
listMultiMap.reverse()
listMultiMap.find(()=>{})
listMultiMap.findIndex(()=>{})
// ... 等等
````


### ListMap
ListMap 是一个简化版本的 ListMultiMap, 只能进行一种索引 

常见的例子: 在一场游戏中, 玩家存在于一个Array中, 但是有的时候又需要通过 id 来索引用户,来看看ListMap如何使用

````typescript
class User {
    uid: string
    seat: number

    constructor(uid: string, seat: number) {
        this.uid = uid;
        this.seat = seat;
    }
}

const user1 = new User("A", 1)
const user2 = new User("B", 2)
const user3 = new User("C", 3)


import ListMap from "extension-type/lib/types/ListMap";

// 你可以通过两种方式来生命一个ListMap,

// 1. 通过数组直接创建
ListMap.from([user1, user2, user3], "uid")
// 2. 创建一个空的 ListMap, 然后增加
let listMap = new ListMap<User>("uid");
listMap.push(user1)
listMap.push(user2)
listMap.push(user3)

// list Map 直接继承于 ListMultiMap 可以使用 ListMultiMap 的所有方法
// 但是因为他的特性, 只能单个Map索引, 系统还提供了以下方法
listMap.index(0) // 等同于 ListMultiMap.getFromList 返回 user1 实例 uid:A, seat: 1
listMap.key("A") // 等同于 listMultiMap.getFromMap("uid", "A");  返回 user1 实例 uid:A, seat: 1
listMap.keys() // 等同于 listMultiMap.getMapKeys("uid");  // 返回 [A,B,C]
listMap.has("A") // 等同于 listMultiMap.hasFromMap("uid", "A");  // 返回 true
````