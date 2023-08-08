import threading


class ConcurrentArrayBasedList:
    def __init__(self):
        self.array = []

    def add(self, item):
        self.array.append(item)

    def get(self, index):
        return self.array[index]

    def __str__(self) -> str:
        return str(self.array)


if __name__ == "__main__":

    lista = ConcurrentArrayBasedList()

    def concurrent_code():
        lista.add(1)
        lista.add(2)
        print(lista)

    thread1 = threading.Thread(target=concurrent_code)
    thread2 = threading.Thread(target=concurrent_code)

    thread1.start()
    thread2.start()
