
class ArrayBasedList:
    def __init__(self):
        self.array = []

    def add(self, item):
        self.array.append(item)

    def get(self, index):
        return self.array[index]

    def __str__(self) -> str:
        return str(self.array)
