import csv
import os
import random
import statistics
import threading
import time

from concurrent_array_based_list import ConcurrentArrayBasedList

'''
    Benchmarking ConcurrentArrayBasedList

    ! THIS CODE IS BUGGED, DO NOT USE IT AS A REFERENCE !
    
    - Add 1000000 items randomly
    - Get 1000000 items from random positions

'''

MAX_RANGE = 100
N_THREADS = 5
N_TESTS = 2
ranges = [[i, i+(MAX_RANGE//N_THREADS)]
          for i in range(0, MAX_RANGE, MAX_RANGE//N_THREADS)]


def test():
    tests_result = []

    def test_thread():
        lista = ConcurrentArrayBasedList(MAX_RANGE)

        def segment_test_thread(lista, start, end):
            for _ in range(start, end):
                lista.add(random.randrange(start, end))
            for _ in range(start, end):
                index = random.randrange(start, end)
                r = lista.get(index)
                if r is None:
                    print(
                        f'Thread {threading.get_ident()}: index {index} out of range, array size is {len(lista.array)}, range is {start} to {end}')

        segment_threads = []
        time_start = time.perf_counter_ns()
        for i in range(0, N_THREADS):
            t = threading.Thread(target=segment_test_thread, args=(
                lista, ranges[i][0], ranges[i][1]))
            segment_threads.append(t)
            t.start()
        for thread in segment_threads:
            thread.join()
        time_end = time.perf_counter_ns()

        tests_result.append(time_end - time_start)

    test_threads = []
    for _ in range(0, N_TESTS):
        t = threading.Thread(target=test_thread)
        test_threads.append(t)
        t.start()

    for thread in test_threads:
        thread.join()

    return tests_result


def nsToMs(ns):
    return ns / 1000000


if __name__ == "__main__":
    print(f"Running {N_TESTS} tests with {N_THREADS} threads each...")
    test_start_time = time.perf_counter()
    tests_result = test()

    print(f"\nResults: {tests_result}")

    print('\nStatistics:\n')
    print(f"mean: {sum(tests_result)/len(tests_result):.0f} ns | {nsToMs(sum(tests_result)/len(tests_result)):.2f} ms ")
    print(
        f'std: {statistics.stdev(tests_result):.0f} ns | {nsToMs(statistics.stdev(tests_result)):.2f} ms')
    print(f"min: {min(tests_result)} ns | {nsToMs(min(tests_result)):.2f} ms ")
    print(f"max: {max(tests_result)} ns | {nsToMs(max(tests_result)):.2f} ms")

    timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

    file_name = f'{os.path.basename(__file__).split(".")[0]}-{timestamp}.csv'

    print(f'\nSaving results to ./{file_name}')

    with open(file_name, mode='w') as csv_file:
        fieldnames = ['test', 'time_ns', 'time_ms']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        writer.writeheader()
        for i in range(0, len(tests_result)):
            writer.writerow(
                {'test': i+1, 'time_ns': tests_result[i], 'time_ms': nsToMs(tests_result[i])})

    test_end_time = time.perf_counter()

    print(f"\nDone in {test_end_time - test_start_time:.2f}s.")
