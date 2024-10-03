# Dijkstra algorithm implementation
# https://youtu.be/XB4MIexjvY0?si=vRmQGEb_GJIPdl5x

import heapq


def dijkstra(grafo, inicio):
    # Garante que todos os nós do grafo, incluindo aqueles sem arestas de saída, sejam considerados
    distancias = {no: float('inf') for no in grafo}
    
    # Verifica se há nós que só aparecem como destinos e não como fontes
    for no in grafo.values():
        for vizinho in no:
            if vizinho not in distancias:
                distancias[vizinho] = float('inf')
    
    distancias[inicio] = 0  # A distância do nó inicial é 0
    pq = [(0, inicio)]  # Fila de prioridades, armazenando (distância, nó)

    while pq:
        dist_atual, no_atual = heapq.heappop(pq)  # Extrai o nó com a menor distância

        if dist_atual > distancias[no_atual]:
            continue

        # Para cada vizinho do nó atual
        for vizinho, peso in grafo.get(no_atual, {}).items():
            distancia = dist_atual + peso

            if distancia < distancias[vizinho]:
                distancias[vizinho] = distancia
                heapq.heappush(pq, (distancia, vizinho))

    return distancias


grafo = {
  1: {2: 2, 3: 4},
  2: {3: 1, 4: 7},
  3: {5: 3},
  4: {6: 1},
  5: {4: 2, 6: 5},
}
assert dijkstra(grafo, 1) == {1: 0, 2: 2, 3: 3, 4: 8, 5: 6, 6: 9}