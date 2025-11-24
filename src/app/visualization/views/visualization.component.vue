<template>
  <div class="red-visualizacion">
    <!-- Navbar
    <nav class="navbar">
      <div class="logo">💧 AquaOptimize Barranca</div>
      <ul class="nav-links">
        <li><a href="#" @click="$router.push('/')">Dashboard</a></li>
        <li><a href="#" @click="$router.push('/analisis')">Análisis</a></li>
        <li><a href="#" @click="$router.push('/reportes')">Reportes</a></li>
      </ul>
    </nav>
    -->

    <div class="container">
      <!-- Title Section -->
      <div class="title-section">
        <h1>Visualización de Red de Distribución - MST (Kruskal)</h1>
        <p>Árbol de expansión mínima conectando 5 pozos con comunidades de Barranca</p>
      </div>

      <!-- Main Grid -->
      <div class="main-grid">
        <!-- Sidebar Control Panel -->
        <aside class="control-panel">
          <h3>Panel de Control</h3>

          <!-- Zoom Control -->
          <div class="control-section">
            <label>Zoom</label>
            <input type="range" v-model="zoomLevel" min="50" max="150" class="zoom-slider" />
            <span class="zoom-value">{{ zoomLevel }}%</span>
          </div>

          <!-- Layer Toggles -->
          <div class="control-section">
            <label>Capas Visibles</label>
            <div class="toggle-list">
              <div class="toggle-item">
                <input type="checkbox" id="pozos" v-model="layers.pozos" />
                <label for="pozos">Pozos Propuestos</label>
                <span class="toggle-color" style="background: #4CAF50;"></span>
              </div>
              <div class="toggle-item">
                <input type="checkbox" id="reservorios" v-model="layers.reservorios" />
                <label for="reservorios">Reservorios Existentes</label>
                <span class="toggle-color" style="background: #2196F3;"></span>
              </div>
              <div class="toggle-item">
                <input type="checkbox" id="comunidades" v-model="layers.comunidades" />
                <label for="comunidades">Comunidades</label>
                <span class="toggle-color" style="background: #FF9800;"></span>
              </div>
              <div class="toggle-item">
                <input type="checkbox" id="tuberias" v-model="layers.tuberias" />
                <label for="tuberias">Red de Tuberías</label>
                <span class="toggle-color" style="background: #9C27B0;"></span>
              </div>
            </div>
          </div>

          <!-- Network Stats -->
          <!-- Network Stats -->
          <div class="control-section">
            <label>Estadísticas de Red</label>
            <div class="stat-mini">
              <span class="stat-label">Nodos Totales</span>
              <span class="stat-value">{{ stats.nodes.toLocaleString() }}</span>
            </div>
            <div class="stat-mini">
              <span class="stat-label">Aristas (Conexiones)</span>
              <span class="stat-value">{{ stats.edges.toLocaleString() }}</span>
            </div>
            <div class="stat-mini">
              <span class="stat-label">Longitud Total</span>
              <span class="stat-value">{{ stats.total_distance.toFixed(1) }} km</span>
            </div>
            <div class="stat-mini">
              <span class="stat-label">Costo Total</span>
              <span class="stat-value">S/ {{ stats.total_cost.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Algorithm Info -->
          <div class="control-section algo-info">
            <label>Información del Algoritmo</label>
            <div class="algo-details">
              <h4>Kruskal's MST</h4>
              <p>Complejidad: O(E log E)</p>
              <p>Tiempo: {{ stats.execution_time.toFixed(2) }} segundos</p>
              <p>Memoria: 42.3 MB</p>
            </div>
          </div>

          <!-- Export Button -->
          <button class="btn-export">Exportar Visualización</button>
        </aside>

        <!-- Network Visualization Area -->
        <div class="visualization-area">
          <!-- Zoom Indicator -->
          <div class="zoom-indicator">Zoom: {{ zoomLevel }}%</div>

          <!-- Network Canvas -->
          <div class="network-canvas">
            <!-- Grid Background Pattern -->
            <svg class="grid-pattern" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E0E0E0" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <!-- Network Graph Container -->
            <div class="graph-container">
              <!-- Edges (Tuberías) - Capa 1 -->
              <svg class="edges-layer" width="100%" height="100%" v-show="layers.tuberias">
                <line x1="40%" y1="30%" x2="30%" y2="45%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="40%" y1="30%" x2="50%" y2="25%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="40%" y1="30%" x2="35%" y2="50%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="30%" y1="45%" x2="25%" y2="40%" stroke="#9C27B0" stroke-width="2.5" opacity="0.6" />
                <line x1="30%" y1="45%" x2="35%" y2="55%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="60%" y1="50%" x2="50%" y2="55%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="60%" y1="50%" x2="65%" y2="60%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="30%" y1="70%" x2="25%" y2="65%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="30%" y1="70%" x2="35%" y2="80%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="70%" y1="75%" x2="60%" y2="85%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
                <line x1="70%" y1="75%" x2="78%" y2="70%" stroke="#9C27B0" stroke-width="3" opacity="0.7" />
              </svg>

              <!-- Comunidades (pequeños círculos naranjas) - Capa 2 -->
              <div class="layer-comunidades" v-show="layers.comunidades">
                <div class="node node-comunidad" style="left: 30%; top: 25%;"></div>
                <div class="node node-comunidad" style="left: 50%; top: 20%;"></div>
                <div class="node node-comunidad" style="left: 35%; top: 45%;"></div>
                <div class="node node-comunidad" style="left: 25%; top: 38%;"></div>
                <div class="node node-comunidad" style="left: 35%; top: 53%;"></div>
                <div class="node node-comunidad" style="left: 50%; top: 58%;"></div>
                <div class="node node-comunidad" style="left: 65%; top: 62%;"></div>
                <div class="node node-comunidad" style="left: 23%; top: 63%;"></div>
                <div class="node node-comunidad" style="left: 35%; top: 82%;"></div>
                <div class="node node-comunidad" style="left: 60%; top: 87%;"></div>
                <div class="node node-comunidad" style="left: 80%; top: 68%;"></div>
                <div class="node node-comunidad" style="left: 45%; top: 52%;"></div>
              </div>

              <!-- Reservorio (círculo azul mediano) - Capa 3 -->
              <div class="layer-reservorios" v-show="layers.reservorios">
                <div class="node node-reservorio" style="left: 47%; top: 60%;">
                  <span class="node-label">R1</span>
                </div>
              </div>

              <!-- Pozos (círculos verdes grandes) - Capa 4 -->
              <div class="layer-pozos" v-show="layers.pozos">
                <div class="node node-pozo" style="left: 40%; top: 30%;">
                  <span class="node-label">P1</span>
                </div>
                <div class="node node-pozo" style="left: 30%; top: 45%;">
                  <span class="node-label">P2</span>
                </div>
                <div class="node node-pozo" style="left: 60%; top: 50%;">
                  <span class="node-label">P3</span>
                </div>
                <div class="node node-pozo" style="left: 30%; top: 70%;">
                  <span class="node-label">P4</span>
                </div>
                <div class="node node-pozo" style="left: 70%; top: 75%;">
                  <span class="node-label">P5</span>
                </div>
              </div>

              <!-- Cost Labels - Capa 5 -->
              <div class="layer-costs" v-show="layers.tuberias">
                <div class="cost-label" style="left: 45%; top: 52%;">S/12.5k</div>
                <div class="cost-label" style="left: 35%; top: 72%;">S/18.3k</div>
                <div class="cost-label" style="left: 55%; top: 52%;">S/9.7k</div>
              </div>

              <!-- Tooltip Example - Capa 6 -->
              <div class="node-tooltip" style="left: 50%; top: 25%;">
                <h4>Pozo P1 - Barranca Centro</h4>
                <p>Profundidad: 95m</p>
                <p>Capacidad: 180 m³/día</p>
                <p>Conexiones: 4 comunidades</p>
                <p class="tooltip-cost">Costo instalación: S/ 82,300</p>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="legend-panel">
            <h4>Leyenda</h4>
            <div class="legend-item">
              <div class="legend-node" style="background: #4CAF50;"></div>
              <span>Pozos</span>
            </div>
            <div class="legend-item">
              <div class="legend-node" style="background: #2196F3;"></div>
              <span>Reservorio</span>
            </div>
            <div class="legend-item">
              <div class="legend-node small" style="background: #FF9800;"></div>
              <span>Comunidad</span>
            </div>
            <div class="legend-item">
              <div class="legend-line"></div>
              <span>Tubería</span>
            </div>
            <div class="legend-item">
              <div class="legend-cost">S/</div>
              <span>Costo</span>
            </div>
          </div>

          <!-- Scale -->
          <div class="scale-indicator">
            <div class="scale-line"></div>
            <span>5 km</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpInstance from '../../../../src/shared/services/http.instance.js'

export default {
  name: 'red-visualizacion',
  data() {
    return {
      zoomLevel: 100,
      layers: {
        pozos: true,
        reservorios: true,
        comunidades: true,
        tuberias: true
      },
      // Datos reales del backend
      stats: {
        nodes: 1702,
        edges: 1697,
        total_distance: 47.3,
        total_cost: 387500,
        execution_time: 2.4
      }
    }
  },
  mounted() {
    // Cargar datos al iniciar el componente
    this.loadNetworkData()
  },
  methods: {
    async loadNetworkData() {
      try {
        const response = await httpInstance.post('/api/optimize', {
          algorithm: 'mst',
          district: 'all',
          serviceType: 'all'
        })

        // Actualizar stats con datos reales
        if (response.data.success) {
          this.stats = {
            nodes: response.data.stats.communities_analyzed + response.data.stats.wells_used,
            edges: response.data.stats.communities_connected,
            total_distance: response.data.stats.total_distance,
            total_cost: response.data.stats.total_cost,
            execution_time: response.data.stats.execution_time
          }
        }
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.red-visualizacion {
  min-height: 100vh;
  background: #F0F4F8;
}

/* Navbar */
.navbar {
  background: linear-gradient(90deg, #1E3C72 0%, #2A5298 100%);
  color: white;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 50px;
  list-style: none;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
}

/* Container */
.container {
  padding: 30px 60px;
  max-width: 1440px;
  margin: 0 auto;
}

/* Title Section */
.title-section {
  background: white;
  border-radius: 12px;
  padding: 25px 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title-section h1 {
  color: #1E3C72;
  font-size: 24px;
  margin-bottom: 8px;
}

.title-section p {
  color: #666;
  font-size: 13px;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
}

/* Control Panel */
.control-panel {
  background: white;
  border-radius: 12px;
  padding: 25px;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.control-panel h3 {
  color: #1E3C72;
  font-size: 16px;
  margin-bottom: 20px;
}

.control-section {
  margin-bottom: 25px;
}

.control-section label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.zoom-slider {
  width: 100%;
  margin-bottom: 8px;
}

.zoom-value {
  font-size: 12px;
  color: #2A5298;
  font-weight: 600;
}

/* Toggle List */
.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toggle-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #333;
}

.toggle-item input[type="checkbox"] {
  cursor: pointer;
}

.toggle-item label {
  flex: 1;
  cursor: pointer;
  margin: 0;
}

.toggle-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

/* Stats Mini */
.stat-mini {
  background: #F8F9FA;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* Algorithm Info */
.algo-info {
  background: #E8F4F8;
  padding: 15px;
  border-radius: 8px;
}

.algo-details h4 {
  color: #1E3C72;
  font-size: 13px;
  margin-bottom: 8px;
}

.algo-details p {
  font-size: 11px;
  color: #666;
  margin-bottom: 4px;
}

/* Export Button */
.btn-export {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #1E3C72 0%, #2A5298 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
}

/* Visualization Area */
.visualization-area {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.zoom-indicator {
  position: absolute;
  top: 35px;
  left: 35px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 11px;
  color: #666;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Network Canvas */
.network-canvas {
  background: #FAFAFA;
  border-radius: 8px;
  height: 600px;
  position: relative;
  overflow: hidden;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.graph-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

/* CLAVE: Cada capa tiene position: absolute para apilarse */
.edges-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.layer-comunidades {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
}

.layer-reservorios {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}

.layer-pozos {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
}

.layer-costs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 7;
}

/* Nodes */
.node {
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s;
}

.node:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.node-pozo {
  width: 40px;
  height: 40px;
  background: #4CAF50;
  border: 3px solid white;
}

.node-reservorio {
  width: 36px;
  height: 36px;
  background: #2196F3;
  border: 3px solid white;
}

.node-comunidad {
  width: 16px;
  height: 16px;
  background: #FF9800;
  border: 2px solid white;
}

.node-label {
  font-size: 11px;
}

/* Cost Labels */
.cost-label {
  position: absolute;
  background: white;
  border: 1px solid #9C27B0;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 600;
  color: #9C27B0;
  transform: translate(-50%, -50%);
}

/* Tooltip */
.node-tooltip {
  position: absolute;
  background: white;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 200px;
  transform: translate(-50%, -120%);
}

.node-tooltip h4 {
  color: #1E3C72;
  font-size: 11px;
  margin-bottom: 8px;
}

.node-tooltip p {
  font-size: 9px;
  color: #666;
  margin-bottom: 4px;
}

.tooltip-cost {
  color: #2A5298;
  font-weight: 600;
  margin-top: 6px;
}

/* Legend Panel */
.legend-panel {
  position: absolute;
  top: 35px;
  right: 35px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.legend-panel h4 {
  color: #1E3C72;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 10px;
  color: #333;
}

.legend-node {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.legend-node.small {
  width: 12px;
  height: 12px;
}

.legend-line {
  width: 20px;
  height: 3px;
  background: #9C27B0;
  border-radius: 2px;
}

.legend-cost {
  width: 20px;
  height: 14px;
  border: 1px solid #9C27B0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: #9C27B0;
  font-weight: 600;
}

/* Scale Indicator */
.scale-indicator {
  position: absolute;
  bottom: 35px;
  left: 35px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  z-index: 10;
}

.scale-line {
  width: 100px;
  height: 2px;
  background: #333;
  position: relative;
}

.scale-line::before,
.scale-line::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 8px;
  background: #333;
  top: -3px;
}

.scale-line::before {
  left: 0;
}

.scale-line::after {
  right: 0;
}

.scale-indicator span {
  font-size: 10px;
  color: #666;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}
</style>