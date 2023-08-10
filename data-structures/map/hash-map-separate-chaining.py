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
