# Bellman-Ford algorithm
# https://www.youtube.com/watch?v=FtN3BYH2Zes
# Single-source shortest path algorithm

def bellman_ford(grafo, source):
  dist = {node: float('infinity') for node in grafo}
  dist[source] = 0

  for _ in range(len(grafo) - 1):
    for u in grafo:
      for v in grafo[u]:
        if dist[v] > dist[u] + grafo[u][v]:
          dist[v] = dist[u] + grafo[u][v]

  return dist

grafo = {
  1: {2: 6, 3: 5, 4: 5},
  2: {5: -1},
  3: {2: -2, 5: 1},
  4: {3: -2, 6: -1},
  5: {7: 3},
  6: {7: 3},
  7: {} 
}
assert bellman_ford(grafo, 1) == {1: 0, 2: 1, 3: 3, 4: 5, 5: 0, 6: 4, 7: 3}

grafo = {
  1: {2: 4, 4: 5},
  2: {},
  3: {2: -10},
  4: {3: 3},
}
assert bellman_ford(grafo, 1) == {1: 0, 2: -2, 3: 8, 4: 5}