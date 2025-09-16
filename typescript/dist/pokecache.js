export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    add(key, value) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: value
        });
    }
    get(key) {
        return this.#cache.get(key)?.val;
    }
    #reap() {
        for (const [key, val] of this.#cache) {
            if (val.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    }
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}
