export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, value: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: value
        })
    }
  get<T>(key: string) {
    return this.#cache.get(key)?.val
  }
  #reap(){
    for (const [key, val] of this.#cache){
        if (val.createdAt < Date.now() - this.#interval){
            this.#cache.delete(key)
        }
    }
  }
  #startReapLoop(){
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval)
  }
  constructor(interval: number){
    this.#interval = interval;
    this.#startReapLoop()
  }
  stopReapLoop(){
    if (this.#reapIntervalId){
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined
    }
  }
}
