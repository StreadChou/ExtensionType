import ListMultiMap from "./ListMultiMap";
export default class ListMap<T> extends ListMultiMap<T> {
    constructor(mapKey?: keyof T & string);
    static from<T>(data: Array<T>, mapKey: keyof T & string): ListMap<T>;
    index(index: number): T | undefined;
    key(key: string | number): T | undefined;
    keys(): Array<string | number>;
    has(key: string | number): boolean;
}
