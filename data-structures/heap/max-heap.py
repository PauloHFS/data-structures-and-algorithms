class MaxHeap():
    def __init__(self):
        self.heap = []
        self.index = -1

    def __left__(self, i):
        return 2 * i + 1

    def __right__(self, i):
        return 2 * i + 2

    def __parent__(self, i):
        return (i - 1) // 2

    def __swap__(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def __heapfy_down__(self, i):
        leftIndex = self.__left__(i)
        rightIndex = self.__right__(i)
        largest = None

        if leftIndex < self.index and self.heap[leftIndex] > self.heap[largest]:
            largest = leftIndex
        else:
            largest = i

        if rightIndex < self.index and self.heap[rightIndex] > self.heap[largest]:
            largest = rightIndex

        if largest != i:
            self.__swap__(i, largest)
            self.__heapfy_down__(largest)
