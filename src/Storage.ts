type StorageType = Map<any, any> | Set<any>
interface IStorage {
    readonly _storage: StorageType
    add(key: any, value?: any): StorageType
    get?(key: any): any
    has(key: any): boolean
    delete(key: any): boolean
    clear(): void
    size(): number
    keys(): IterableIterator<any>
    values(): IterableIterator<any>
    forEach(callback: (value: any) => void): void
    getAndDelete?(key: any): any
}

class SetStorage implements IStorage {
    readonly _storage: Set<any>
    constructor() {
        this._storage = new Set()
    }
    public add(key: any): Set<any> {
        return this._storage.add(key)
    }
    public has(key: any): boolean {
        return this._storage.has(key)
    }
    public delete(key: any): boolean {
        return this._storage.delete(key)
    }
    public clear(): void {
        this._storage.clear()
    }
    public size(): number {
        return this._storage.size
    }
    public keys(): IterableIterator<any> {
        return this._storage.keys()
    }
    public values(): IterableIterator<any> {
        return this._storage.values()
    }
    public forEach(callback: (value: any) => void): void {
        return this._storage.forEach(callback)
    }
}

class MapStorage implements IStorage {
    readonly _storage: Map<any, any>
    constructor() {
        this._storage = new Map()
    }
    public add(key: any, value: any): Map<any, any> {
        return this._storage.set(key, value)
    }
    public get(key: any): any {
        return this._storage.get(key)
    }
    public has(key: any): boolean {
        return this._storage.has(key)
    }
    public delete(key: any): boolean {
        return this._storage.delete(key)
    }
    public clear(): void {
        this._storage.clear()
    }
    public size(): number {
        return this._storage.size
    }
    public keys(): IterableIterator<any> {
        return this._storage.keys()
    }
    public values(): IterableIterator<any> {
        return this._storage.values()
    }
    public forEach(callback: (value: any) => void): void {
        return this._storage.forEach(callback)
    }
    public getAndDelete(key: any): any {
        const value = this.get(key)
        this.delete(key)
        return value
    }
}
