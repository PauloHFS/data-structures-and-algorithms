import csv
import os
import random
import statistics
import time

from array_based_list import ArrayBasedList

'''
    Benchmarking ArrayBasedList

    - Add 1000000 items randomly
    - Get 1000000 items from random positions

'''


def nsToMs(ns):
    return ns / 1000000


def test(MAX=1000000):
    tests_result = []

    for i in range(0, 5):
        print(f"Running test {i+1}... ", end='')
        lista = ArrayBasedList()

        start_time = time.perf_counter_ns()
        for i in range(0, MAX):
            lista.add(random.randrange(0, MAX))

        for i in range(0, MAX):
            lista.get(random.randrange(0, MAX))
        end_time = time.perf_counter_ns()

        tests_result.append(end_time - start_time)

        print(f"done! ({end_time - start_time} ns)")

    return tests_result


if __name__ == "__main__":
    test_start_time = time.perf_counter()
    MAX = 1000000
    tests_result = test(MAX)

    print('\nStatistics:\n')
    print(f"mean: {sum(tests_result)/len(tests_result):.0f} ns | {nsToMs(sum(tests_result)/len(tests_result)):.2f} ms ")
    print(
        f'std: {statistics.stdev(tests_result):.0f} ns | {nsToMs(statistics.stdev(tests_result)):.2f} ms')
    print(f"min: {min(tests_result)} ns | {nsToMs(min(tests_result)):.2f} ms ")
    print(f"max: {max(tests_result)} ns | {nsToMs(max(tests_result)):.2f} ms")

    timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

    file_name = f'array_based_list-benchmark-{timestamp}.csv'

    print(f'\nSaving results to ./{file_name}')

    with open(f'array_based_list-benchmark-{timestamp}.csv', mode='w') as csv_file:
        fieldnames = ['test', 'time_ns', 'time_ms']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        writer.writeheader()
        for i in range(0, len(tests_result)):
            writer.writerow(
                {'test': i+1, 'time_ns': tests_result[i], 'time_ms': nsToMs(tests_result[i])})

    test_end_time = time.perf_counter()

    print(f"\nDone in {test_end_time - test_start_time:.2f}s.")
