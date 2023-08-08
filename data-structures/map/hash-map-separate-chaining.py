# tests:
# 1. um mutex geral para o hash map inteiro
# 2. um mutex para cada bucket

import threading
import timeit


class HashMap():
    def __init__(self):
        self._capacity = 137

        self._bucket = [[] for _ in range(self._capacity)]
        self.size = 0

    def _hash(self, key):
        if (type(key) == int):
            return key * 37 % self._capacity

        if (type(key) == str):
            hash = 0
            for char in key:
                hash = (hash * 37 + ord(char))
            return hash % self._capacity

    def get(self, key):
        hash = self._hash(key)
        for item in self._bucket[hash]:
            if (item[0] == key):
                return item[1]

        return None

    def put(self, key, value):
        hash = self._hash(key)
        for item in self._bucket[hash]:
            if (item[0] == key):
                item[1] = value
                return

        self._bucket[hash].append([key, value])
        self.size += 1


class MutexHashMap():
    def __init__(self):
        self.hash_map = HashMap()
        self.mutex = threading.Lock()

    def get(self, key):
        self.mutex.acquire()
        value = self.hash_map.get(key)
        self.mutex.release()
        return value

    def put(self, key, value):
        self.mutex.acquire()
        self.hash_map.put(key, value)
        self.mutex.release()


if __name__ == "__main__":

    # registrar o tempo de execução
    hmap = MutexHashMap()

    def concurrent_code():
        for i in range(0, random.randint(0, 100000000)):
            hmap.put(i, i)
            print(hmap.get(i))

    threads = [threading.Thread(target=concurrent_code) for _ in range(10)]
    start = timeit.timeit()
    map(lambda thread: thread.start(), threads)
    map(lambda thread: thread.join(), threads)
    end = timeit.timeit()
    print(end - start)
