import threading


class ConcurrentArrayBasedList:
    def __init__(self, size=0):
        self.array = []
        self.lock = threading.Lock()

    def add(self, item):
        self.lock.acquire()
        self.array.append(item)
        self.lock.release()

    def get(self, index):
        self.lock.acquire()
        try:
            v = self.array[index]
            print(f'Thread {threading.get_ident()}: {v}, array {self.array}')
            return v
        except IndexError:
            pass
            print(
                f'Thread {threading.get_ident()}: index {index} out of range, array size is {len(self.array)}')
        finally:
            self.lock.release()
        return None

    def __str__(self) -> str:
        return str(self.array)
