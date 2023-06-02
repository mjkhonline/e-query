export function isBrowser(): boolean {
    try {
        return typeof window !== 'undefined' && typeof window.document !== 'undefined'
    } catch (e) {
        return false
    }
}

export function isPromise(value: any): boolean {
    return value && typeof value.then === 'function'
}
