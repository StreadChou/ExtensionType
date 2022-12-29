import ListMultiMap from "./ListMultiMap";

export default class ListMap<T> extends ListMultiMap<T> {

    constructor(mapKey?: keyof T & string) {
        super(mapKey);
    }

    static from<T>(data: Array<T>, mapKey: keyof T & string): ListMap<T> {
        const self: ListMap<T> = new ListMap<T>(mapKey);
        self.push(...data)
        return self;
    }


    index(index: number): T | undefined {
        return this._list[index]
    }

    key(key: string | number): T | undefined {
        const _mapIndex = this._mapIndex[0];
        return this.getFromMap(_mapIndex, key);
    }

    keys(): Array<string | number> {
        const _mapIndex = this._mapIndex[0];
        return this.getMapKeys(_mapIndex)
    }

    has(key: string | number): boolean {
        const _mapIndex = this._mapIndex[0];
        return this.hasFromMap(_mapIndex, key)
    }
}