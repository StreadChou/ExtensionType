export default class ListMultiMap<T> {
    protected _list: Array<T>;
    protected _map: Map<keyof T & string, Map<string | number, T>>;
    protected _mapIndex: Array<keyof T & string>;
    constructor(mapKey?: keyof T & string | Array<keyof T & string>);
    static from<T>(data: Array<T>, mapKey?: keyof T & string | Array<keyof T & string>): ListMultiMap<T>;
    /************************
     * 基本的一些获取方法如下:
     ***********************/
    get length(): number;
    get list(): Array<T>;
    getFromList(index: number): T | undefined;
    getFromMap(index: keyof T & string, key: string | number): T | undefined;
    hasFromMap(index: keyof T & string, key: string | number): boolean;
    getMapKeys(index: keyof T & string): Array<string | number>;
    getMap(index: keyof T & string): Map<string | number, T> | undefined;
    /************************
     * 基本操作方法如下:
     ***********************/
    push(...items: Array<T>): number;
    unshift(...items: T[]): number;
    shift(): T | undefined;
    pop(): T | undefined;
    delete(ele: T): T;
    deleteIndex(index: number): undefined | T;
    deleteKey(index: keyof T & string, key: string | number): undefined | T;
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    indexOf(searchElement: T): number;
    includes(searchElement: T): boolean;
    slice(start?: number, end?: number): T[];
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
    map<U>(callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    forEach(callbackFn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    sort(compareFn?: (a: T, b: T) => number): T[];
    reverse(): T[];
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    concat(...items: Array<ListMultiMap<T> | T | Array<T>>): ListMultiMap<T>;
    /************************
     * 内部方法:
     ***********************/
    protected _setOnlyToMap(itemList: Array<T>): void;
    protected _setToWhichMap(index: keyof T & string, itemList: Array<T>): void;
    protected _deleteOnlyFromMap(itemList: Array<T>): void;
    protected _deleteFromWhichMap(index: keyof T & string, itemList: Array<T>): any;
}
