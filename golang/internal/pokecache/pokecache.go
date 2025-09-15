package pokecache

import (
	"time"
	"sync"
)

type cacheEntry struct {
	createdAt time.Time
	val []byte
} 

type Cache struct {
	cache map[string]cacheEntry
	mux *sync.Mutex
}

func NewCache(interval time.Duration) Cache {
	c := Cache{
		cache: make(map[string]cacheEntry),
		mux: &sync.Mutex{},
	}

	go c.ReapLoop(interval)
	return c
}

func (c *Cache) Add (key string, value []byte) {
	entry := cacheEntry{
		createdAt: time.Now().UTC(),
		val: value,
	}
	c.mux.Lock()
	defer c.mux.Unlock()
	c.cache[key] = entry
	return
}

func (c *Cache) Get (key string) ([]byte, bool){
	c.mux.Lock()
	defer c.mux.Unlock()
	value, ok := c.cache[key]
	return value.val, ok
}

func(c *Cache) ReapLoop (interval time.Duration){
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for range ticker.C{
		c.mux.Lock()
		now := time.Now().UTC()
		for k,v := range c.cache {
			if v.createdAt.Before(now.Add(-interval)){
				delete(c.cache, k)
			}
		}
		c.mux.Unlock()
	}
}