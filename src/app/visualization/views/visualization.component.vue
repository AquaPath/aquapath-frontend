<template>
  <div class="visualization-container">
    <div class="visualization-header">
      <h1>Visualización de Red de Distribución - {{ algorithmName }}</h1>
      <p>Árbol de expansión mínima conectando pozos con comunidades de Barranca</p>
    </div>

    <div class="visualization-grid">
      <!-- Panel de Control -->
      <aside class="control-panel">
        <h3>Panel de Control</h3>

        <!-- Estadísticas -->
        <div class="control-section">
          <label>Estadísticas de Red</label>
          <div class="stat-mini">
            <span class="stat-label">Nodos Totales</span>
            <span class="stat-value">{{ stats.nodes }}</span>
          </div>
          <div class="stat-mini">
            <span class="stat-label">Aristas</span>
            <span class="stat-value">{{ stats.edges }}</span>
          </div>
          <div class="stat-mini">
            <span class="stat-label">Pozos</span>
            <span class="stat-value">{{ stats.wells }}</span>
          </div>
          <div class="stat-mini">
            <span class="stat-label">Comunidades</span>
            <span class="stat-value">{{ stats.communities }}</span>
          </div>
          <div class="stat-mini">
            <span class="stat-label">Longitud Total</span>
            <span class="stat-value">{{ stats.total_distance?.toFixed(2) }} km</span>
          </div>
          <div class="stat-mini">
            <span class="stat-label">Costo Total</span>
            <span class="stat-value">S/ {{ formatNumber(stats.total_cost) }}</span>
          </div>
        </div>

        <!-- Controles de Visualización -->
        <div class="control-section">
          <label>Controles de Vista</label>
          <button class="control-btn" @click="fitGraph">
            📐 Ajustar a Pantalla
          </button>
          <button class="control-btn" @click="centerGraph">
            🎯 Centrar Grafo
          </button>
          <button class="control-btn" @click="resetZoom">
            🔍 Reset Zoom
          </button>
        </div>

        <!-- Filtros de Capas -->
        <div class="control-section">
          <label>Capas Visibles</label>
          <div class="toggle-list">
            <div class="toggle-item">
              <input type="checkbox" id="show-wells" v-model="layers.wells" @change="updateLayers" />
              <label for="show-wells">Pozos</label>
              <span class="toggle-color" style="background: #4CAF50;"></span>
            </div>
            <div class="toggle-item">
              <input type="checkbox" id="show-communities" v-model="layers.communities" @change="updateLayers" />
              <label for="show-communities">Comunidades</label>
              <span class="toggle-color" style="background: #FF9800;"></span>
            </div>
            <div class="toggle-item">
              <input type="checkbox" id="show-edges" v-model="layers.edges" @change="updateLayers" />
              <label for="show-edges">Tuberías</label>
              <span class="toggle-color" style="background: #9C27B0;"></span>
            </div>
          </div>
        </div>

        <!-- Información del Algoritmo -->
        <div class="control-section algo-info">
          <label>Información del Algoritmo</label>
          <div class="algo-details">
            <h4>{{ algorithmName }}</h4>
            <p><strong>Complejidad:</strong> {{ stats.complexity }}</p>
            <p><strong>Tiempo:</strong> {{ stats.execution_time?.toFixed(4) }} seg</p>
            <p><strong>Eficiencia:</strong> {{ stats.efficiency?.toFixed(1) }}%</p>
          </div>
        </div>

        <!-- Botones de Acción -->
        <button class="btn-back" @click="goBack">
          ← Volver al Dashboard
        </button>
      </aside>

      <!-- Área de Visualización del Grafo -->
      <div class="graph-container">
        <div v-if="!graphData" class="loading-state">
          <i class="pi pi-spin pi-spinner" style="font-size: 48px;"></i>
          <p>Cargando datos del grafo...</p>
        </div>

        <div
            v-else
            id="cy"
            class="cytoscape-container"
        ></div>

        <!-- Leyenda flotante -->
        <div v-if="graphData" class="graph-legend">
          <h4>Leyenda</h4>
          <div class="legend-item">
            <div class="legend-node" style="background: #4CAF50;"></div>
            <span>Pozos ({{ stats.wells }})</span>
          </div>
          <div class="legend-item">
            <div class="legend-node" style="background: #FF9800;"></div>
            <span>Comunidades ({{ stats.communities }})</span>
          </div>
          <div class="legend-item">
            <div class="legend-edge"></div>
            <span>Tuberías ({{ stats.edges }})</span>
          </div>
        </div>

        <!-- Información del nodo seleccionado -->
        <div v-if="selectedNode" class="node-info">
          <h4>{{ selectedNode.type === 'well' ? '💧 Pozo' : '🏘️ Comunidad' }}</h4>
          <p><strong>ID:</strong> {{ selectedNode.id }}</p>
          <p v-if="selectedNode.type === 'well'">
            <strong>Caudal:</strong> {{ selectedNode.caudal?.toFixed(2) }} L/s
          </p>
          <p v-if="selectedNode.type === 'community'">
            <strong>Demanda:</strong> {{ selectedNode.demanda }} m³
          </p>
          <p v-if="selectedNode.type === 'community'">
            <strong>Viviendas:</strong> {{ selectedNode.viviendas }}
          </p>
          <button class="btn-close" @click="selectedNode = null">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../../shared/services/http.instance.js';
import cytoscape from 'cytoscape';

export default {
  name: 'visualization',

  data() {
    return {
      graphData: null,
      stats: {
        nodes: 0,
        edges: 0,
        wells: 0,
        communities: 0,
        total_distance: 0,
        total_cost: 0,
        execution_time: 0,
        efficiency: 0,
        complexity: ''
      },
      layers: {
        wells: true,
        communities: true,
        edges: true
      },
      cy: null,
      selectedNode: null,
      algorithmName: ''
    }
  },

  mounted() {
    this.loadOptimizationData();
  },

  beforeUnmount() {
    if (this.cy) {
      this.cy.destroy();
    }
  },

  methods: {
    /**
     * Cargar datos de optimización
     */
    async loadOptimizationData() {
      try {
        // Intentar cargar desde localStorage
        const lastOptimization = localStorage.getItem('lastOptimization');

        if (lastOptimization) {
          const data = JSON.parse(lastOptimization);
          this.processOptimizationData(data);
        }
        // O desde params si viene del router
        else if (this.$route.params.optimizationId) {
          const response = await http.get(`/api/optimizations/${this.$route.params.optimizationId}`);
          if (response.data.success) {
            this.processOptimizationData(response.data.optimization);
          }
        }
        // O cargar última optimización desde API
        else {
          const response = await http.get('/api/optimizations?limit=1');
          if (response.data.success && response.data.optimizations.length > 0) {
            const lastOpt = response.data.optimizations[0];
            const detailResponse = await http.get(`/api/optimizations/${lastOpt.id}`);
            if (detailResponse.data.success) {
              this.processOptimizationData(detailResponse.data.optimization);
            }
          }
        }
      } catch (error) {
        console.error('Error loading optimization data:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los datos de optimización',
          life: 3000
        });
      }
    },

    /**
     * Procesar datos de optimización
     */
    processOptimizationData(data) {
      console.log('📊 Procesando datos de optimización:', data);

      this.algorithmName = data.algorithm || data.algoritmo || 'MST';
      this.graphData = data.graph || (data.graph_data ? JSON.parse(data.graph_data) : null);

      // Actualizar stats
      this.stats = {
        nodes: data.stats?.nodes || data.nodos_totales || 0,
        edges: data.stats?.edges || data.aristas_totales || 0,
        wells: data.stats?.wells_used || data.pozos_usados || 0,
        communities: data.stats?.communities_connected || data.comunidades_conectadas || 0,
        total_distance: data.stats?.total_distance || data.distancia_total || 0,
        total_cost: data.stats?.total_cost || data.costo_total || 0,
        execution_time: data.stats?.execution_time || data.tiempo_ejecucion || 0,
        efficiency: data.stats?.efficiency || data.eficiencia || 0,
        complexity: data.stats?.complexity || data.complejidad || 'O(E log E)'
      };

      // Renderizar grafo
      if (this.graphData) {
        this.$nextTick(() => {
          this.renderGraph();
        });
      }
    },

    /**
     * Renderizar grafo con Cytoscape.js
     */
    renderGraph() {
      if (!this.graphData) return;

      const container = document.getElementById('cy');
      if (!container) return;

      try {
        // Preparar elementos del grafo
        const elements = {
          nodes: this.graphData.nodes.map(node => ({
            data: {
              id: node.id,
              label: node.id.substring(0, 10), // Truncar IDs largos
              type: node.type,
              ...node
            }
          })),
          edges: this.graphData.edges.map(edge => ({
            data: {
              id: `${edge.source}-${edge.target}`,
              source: edge.source,
              target: edge.target,
              weight: edge.weight,
              distance: edge.distance,
              label: `${edge.distance.toFixed(2)} km`
            }
          }))
        };

        // Crear instancia de Cytoscape
        this.cy = cytoscape({
          container: container,

          elements: elements,

          style: [
            {
              selector: 'node',
              style: {
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '10px',
                'color': '#fff',
                'text-outline-width': 2,
                'text-outline-color': '#000'
              }
            },
            {
              selector: 'node[type="well"]',
              style: {
                'background-color': '#4CAF50',
                'width': 40,
                'height': 40,
                'border-width': 3,
                'border-color': '#2E7D32'
              }
            },
            {
              selector: 'node[type="community"]',
              style: {
                'background-color': '#FF9800',
                'width': 20,
                'height': 20,
                'border-width': 2,
                'border-color': '#E65100'
              }
            },
            {
              selector: 'edge',
              style: {
                'width': 2,
                'line-color': '#9C27B0',
                'target-arrow-color': '#9C27B0',
                'curve-style': 'bezier',
                'opacity': 0.7
              }
            },
            {
              selector: ':selected',
              style: {
                'border-width': 4,
                'border-color': '#FFD700',
                'z-index': 9999
              }
            }
          ],

          layout: {
            name: 'cose',
            animate: true,
            animationDuration: 500,
            randomize: false,
            nodeRepulsion: 400000,
            idealEdgeLength: 100,
            edgeElasticity: 100,
            nestingFactor: 1.2,
            gravity: 1,
            numIter: 1000,
            initialTemp: 1000,
            coolingFactor: 0.99,
            minTemp: 1.0
          },

          wheelSensitivity: 0.2,
          minZoom: 0.1,
          maxZoom: 3
        });

        // Event listeners
        this.cy.on('tap', 'node', (evt) => {
          const node = evt.target;
          this.selectedNode = node.data();
          console.log('Nodo seleccionado:', this.selectedNode);
        });

        this.cy.on('tap', (evt) => {
          if (evt.target === this.cy) {
            this.selectedNode = null;
          }
        });

        console.log('✅ Grafo renderizado exitosamente');

      } catch (error) {
        console.error('❌ Error renderizando grafo:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al renderizar el grafo',
          life: 3000
        });
      }
    },

    /**
     * Actualizar visibilidad de capas
     */
    updateLayers() {
      if (!this.cy) return;

      // Mostrar/ocultar pozos
      if (this.layers.wells) {
        this.cy.nodes('[type="well"]').style('display', 'element');
      } else {
        this.cy.nodes('[type="well"]').style('display', 'none');
      }

      // Mostrar/ocultar comunidades
      if (this.layers.communities) {
        this.cy.nodes('[type="community"]').style('display', 'element');
      } else {
        this.cy.nodes('[type="community"]').style('display', 'none');
      }

      // Mostrar/ocultar aristas
      if (this.layers.edges) {
        this.cy.edges().style('display', 'element');
      } else {
        this.cy.edges().style('display', 'none');
      }
    },

    /**
     * Ajustar grafo a la pantalla
     */
    fitGraph() {
      if (this.cy) {
        this.cy.fit(null, 50);
      }
    },

    /**
     * Centrar grafo
     */
    centerGraph() {
      if (this.cy) {
        this.cy.center();
      }
    },

    /**
     * Reset zoom
     */
    resetZoom() {
      if (this.cy) {
        this.cy.zoom(1);
        this.cy.center();
      }
    },

    /**
     * Volver al dashboard
     */
    goBack() {
      this.$router.push({ name: 'dashboard' });
    },

    /**
     * Formatear números
     */
    formatNumber(num) {
      if (!num) return '0';
      return num.toLocaleString('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
}
</script>

<style scoped>
.visualization-container {
  min-height: 100vh;
  background: #F0F4F8;
  padding: 30px;
}

.visualization-header {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.visualization-header h1 {
  color: #1E3C72;
  font-size: 24px;
  margin-bottom: 10px;
}

.visualization-header p {
  color: #666;
  font-size: 14px;
}

.visualization-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  height: calc(100vh - 200px);
}

.control-panel {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100%;
}

.control-panel h3 {
  color: #1E3C72;
  font-size: 16px;
  margin-bottom: 20px;
}

.control-section {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E0E0E0;
}

.control-section label {
  display: block;
  font-size: 12px;
  color: #666;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.stat-mini {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #F8F9FA;
  border-radius: 6px;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 11px;
  color: #666;
}

.stat-value {
  font-size: 13px;
  font-weight: 600;
  color: #2A5298;
}

.control-btn {
  width: 100%;
  padding: 10px;
  background: #F0F4F8;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.control-btn:hover {
  background: #E3F2FD;
  border-color: #2196F3;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toggle-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.toggle-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.toggle-item label {
  flex: 1;
  cursor: pointer;
  margin: 0;
  text-transform: none;
}

.toggle-color {
  width: 20px;
  height: 20px;
  border-radius: 3px;
}

.algo-info {
  background: #E3F2FD;
  padding: 15px;
  border-radius: 8px;
}

.algo-details h4 {
  color: #1E3C72;
  font-size: 14px;
  margin-bottom: 10px;
}

.algo-details p {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.btn-back {
  width: 100%;
  padding: 12px;
  background: #1E3C72;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
}

.btn-back:hover {
  background: #2A5298;
}

.graph-container {
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.loading-state p {
  margin-top: 20px;
  font-size: 14px;
}

.cytoscape-container {
  width: 100%;
  height: 100%;
}

.graph-legend {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.graph-legend h4 {
  font-size: 12px;
  color: #1E3C72;
  margin-bottom: 10px;
  font-weight: 600;
}

.graph-legend .legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 11px;
}

.legend-node {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #333;
}

.legend-edge {
  width: 30px;
  height: 2px;
  background: #9C27B0;
}

.node-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  min-width: 200px;
}

.node-info h4 {
  color: #1E3C72;
  font-size: 14px;
  margin-bottom: 10px;
}

.node-info p {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #999;
}

.btn-close:hover {
  color: #333;
}

@media (max-width: 1024px) {
  .visualization-grid {
    grid-template-columns: 1fr;
    height: auto;
  }

  .control-panel {
    height: auto;
  }

  .graph-container {
    height: 600px;
  }
}
</style>