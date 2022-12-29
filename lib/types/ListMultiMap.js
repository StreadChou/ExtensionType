"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListMultiMap {
    constructor(mapKey) {
        this._list = [];
        this._map = new Map();
        this._mapIndex = [];
        if (typeof mapKey === "string")
            this._mapIndex = [mapKey];
        if (typeof mapKey === "object")
            this._mapIndex = mapKey;
        this._mapIndex.forEach(ele => {
            this._map.set(ele, new Map());
        });
    }
    static from(data, mapKey) {
        const self = new ListMultiMap(mapKey);
        self.push(...data);
        return self;
    }
    /************************
     * 基本的一些获取方法如下:
     ***********************/
    get length() {
        return this._list.length;
    }
    get list() {
        return this._list;
    }
    // 从List中获取一个元素
    getFromList(index) {
        return this._list[index];
    }
    // 从Map中获取一个元素
    getFromMap(index, key) {
        let _map = this.getMap(index);
        if (!_map)
            return undefined;
        return _map.get(key);
    }
    hasFromMap(index, key) {
        let _map = this.getMap(index);
        if (!_map)
            return false;
        return _map.has(key);
    }
    // Object.keys;
    getMapKeys(index) {
        let _map = this.getMap(index);
        if (!_map)
            return [];
        return Array.from(_map.keys());
    }
    // 获取某个索引下的Index
    getMap(index) {
        return this._map.get(index);
    }
    /************************
     * 基本操作方法如下:
     ***********************/
    // Array 基础方法 - push, 在数组后面增加元素
    push(...items) {
        this._setOnlyToMap(items);
        return this._list.push(...items);
    }
    // Array 基础方法 - unshift, 在数组前面增加元素
    unshift(...items) {
        this._setOnlyToMap(items);
        return this._list.unshift(...items);
    }
    // Array 基础方法 - shift, 删除数组的第一个元素并返回删除的元素。
    shift() {
        const ele = this._list.shift();
        if (!ele === undefined)
            return ele;
        this._deleteOnlyFromMap([ele]);
        return ele;
    }
    // Array 基础方法 - pop,  删除数组的最后一个元素并返回删除的元素。
    pop() {
        const ele = this._list.pop();
        if (!ele === undefined)
            return ele;
        this._deleteOnlyFromMap([ele]);
        return ele;
    }
    // 删除一个元素, 返回的是删除的元素
    delete(ele) {
        let temp = this.splice(this.indexOf(ele), 1)[0];
        if (temp)
            this._deleteOnlyFromMap([temp]);
        return temp;
    }
    // 删除一个Index, 返回的是被删除的元素
    deleteIndex(index) {
        if (!this._list[index])
            return undefined;
        const ele = this._list[index];
        if (!ele)
            return undefined;
        this.splice(index, 1);
        this._deleteOnlyFromMap([ele]);
        return ele;
    }
    // 删除一个Key, 返回的是被删除的元素
    deleteKey(index, key) {
        let ele = this.getFromMap(index, key);
        if (!ele)
            return null;
        return this.delete(ele);
    }
    // Array 基础方法 - delete, 删除和新增
    splice(start, deleteCount, ...items) {
        const temp = this._list.splice(start, deleteCount, ...items);
        this._deleteOnlyFromMap(temp);
        this._setOnlyToMap(items);
        return temp;
    }
    /* ********************************************
     *  操作
     * ********************************************/
    // 查询元素的Index, fromIndex 不支持传参, 因为规定了List中不可重复
    indexOf(searchElement) {
        return this._list.indexOf(searchElement);
    }
    // 最后一次出现的地方, 次方法有问题, 等待更新
    // lastIndexOf(searchElement: T, fromIndex?: number): number {
    //     return this._list.lastIndexOf(searchElement, fromIndex);
    // }
    // 查询元素是否包含, fromIndex 不支持传参, 因为规定了List中不可重复
    includes(searchElement) {
        return this._list.includes(searchElement);
    }
    // 获取指定的数组, 左包右不包
    slice(start, end) {
        return this._list.slice(start, end);
    }
    // 按规则查找, 只返回第一个
    find(predicate, thisArg) {
        return this._list.find(predicate, thisArg);
    }
    // 筛选
    filter(predicate, thisArg) {
        return this._list.filter(predicate, thisArg);
    }
    // 按规则查找 Index, 不存在返回 -1
    findIndex(predicate, thisArg) {
        return this._list.findIndex(predicate, thisArg);
    }
    // 根据元素创建一个新数组
    map(callbackFn, thisArg) {
        return this._list.map(callbackFn, thisArg);
    }
    // 遍历
    forEach(callbackFn, thisArg) {
        return this._list.forEach(callbackFn, thisArg);
    }
    // 排序, 会改变原数组
    sort(compareFn) {
        return this._list.sort(compareFn);
    }
    // 颠倒, 会改变原数组
    reverse() {
        return this._list.reverse();
    }
    // 检查数组中的内容是否都满足条件
    every(predicate, thisArg) {
        return this._list.every(predicate, thisArg);
    }
    // 判断是否存在符合某个条件的
    some(predicate, thisArg) {
        return this._list.some(predicate);
    }
    // 组合
    concat(...items) {
        const newType = ListMultiMap.from(this._list, this._mapIndex);
        for (let item of items) {
            if (item instanceof ListMultiMap) {
                newType.push(...item.list);
            }
            else if (Array.isArray(item)) {
                newType.push(...item);
            }
            else {
                newType.push(item);
            }
        }
        return newType;
    }
    /************************
     * 内部方法:
     ***********************/
    // 向Map中Set某个值
    _setOnlyToMap(itemList) {
        for (let _index of this._mapIndex) {
            this._setToWhichMap(_index, itemList);
        }
    }
    // 向某个Map中Set一个值
    _setToWhichMap(index, itemList) {
        let _map = this.getMap(index);
        if (!_map)
            return undefined;
        for (let item of itemList) {
            let key = item[index];
            if (key === undefined || key === null)
                continue;
            _map.set(key, item);
        }
    }
    _deleteOnlyFromMap(itemList) {
        for (let _index of this._mapIndex) {
            this._deleteFromWhichMap(_index, itemList);
        }
    }
    _deleteFromWhichMap(index, itemList) {
        let _map = this.getMap(index);
        if (!_map)
            return undefined;
        for (let item of itemList) {
            let key = item[index];
            if (key === undefined || key === null)
                continue;
            if (_map.has(key))
                _map.delete(key);
        }
    }
}
exports.default = ListMultiMap;
//# sourceMappingURL=ListMultiMap.js.map