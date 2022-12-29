"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListMultiMap_1 = require("./ListMultiMap");
class ListMap extends ListMultiMap_1.default {
    constructor(mapKey) {
        super(mapKey);
    }
    static from(data, mapKey) {
        const self = new ListMap(mapKey);
        self.push(...data);
        return self;
    }
    index(index) {
        return this._list[index];
    }
    key(key) {
        const _mapIndex = this._mapIndex[0];
        return this.getFromMap(_mapIndex, key);
    }
    keys() {
        const _mapIndex = this._mapIndex[0];
        return this.getMapKeys(_mapIndex);
    }
    has(key) {
        const _mapIndex = this._mapIndex[0];
        return this.hasFromMap(_mapIndex, key);
    }
}
exports.default = ListMap;
//# sourceMappingURL=ListMap.js.map