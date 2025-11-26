<template>
  <div class="dashboard">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <h1>Sistema de Optimización de Pozos y Reservorios</h1>
        <p>Plataforma de análisis algorítmico para la ubicación estratégica de infraestructura hídrica en comunidades de Barranca, Lima</p>
      </div>

      <!-- Main Grid -->
      <div class="main-grid">
        <!-- Sidebar -->
        <aside class="sidebar">
          <h3>Parámetros de Optimización</h3>

          <div class="form-group">
            <label>Algoritmo de Optimización</label>
            <select v-model="params.algorithm">
              <option value="mst">MST (Kruskal/Prim)</option>
              <option value="dijkstra">Dijkstra + MST</option>
              <option value="dp">Programación Dinámica</option>
              <option value="backtracking">Backtracking + MST</option>
            </select>
          </div>

          <div class="form-group">
            <label>Distrito</label>
            <select v-model="params.district">
              <option value="all">Todos los distritos</option>
              <option value="barranca">Barranca</option>
              <option value="paramonga">Paramonga</option>
              <option value="pativilca">Pativilca</option>
              <option value="supe">Supe</option>
            </select>
          </div>

          <div class="form-group">
            <label>Tipo de Servicio</label>
            <select v-model="params.serviceType">
              <option value="all">Todos</option>
              <option value="emergency">Emergencia (70-80%)</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div class="form-group">
            <label>Número de Pozos a Ubicar</label>
            <input type="number" v-model.number="params.wellCount" min="1" max="20" />
          </div>

          <div class="form-group">
            <label>Presupuesto Máximo (S/)</label>
            <input type="number" v-model.number="params.budget" step="10000" />
          </div>

          <button
              class="btn-primary"
              @click="runOptimization"
              :disabled="isOptimizing"
          >
            <span v-if="isOptimizing">
              <i class="pi pi-spin pi-spinner"></i> Procesando...
            </span>
            <span v-else>Ejecutar Optimización</span>
          </button>
        </aside>

        <!-- Content Area -->
        <div class="content-area">
          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card">
              <h4>Comunidades Analizadas</h4>
              <div class="value">{{ stats.communities_analyzed?.toLocaleString() || '0' }}</div>
              <div class="unit">registros</div>
            </div>
            <div class="stat-card">
              <h4>Costo Estimado</h4>
              <div class="value">S/ {{ formatNumber(stats.total_cost) }}</div>
              <div class="unit">instalación</div>
            </div>
            <div class="stat-card">
              <h4>Cobertura Proyectada</h4>
              <div class="value">{{ stats.coverage_percentage?.toFixed(1) || '0' }}%</div>
              <div class="unit">población</div>
            </div>
            <div class="stat-card">
              <h4>Viviendas Beneficiadas</h4>
              <div class="value">{{ stats.households?.toLocaleString() || '0' }}</div>
              <div class="unit">hogares</div>
            </div>
          </div>

          <!-- Bottom Grid -->
          <div class="bottom-grid">
            <!-- Map Container -->
            <div class="map-container">
              <h3>Mapa de Optimización - Barranca</h3>
              <div class="map-placeholder">
                <div class="map-content" v-if="!optimizationResult">
                  <span class="map-icon">📍</span>
                  <p>Ejecuta una optimización para ver el mapa</p>
                </div>
                <div v-else class="map-content success-state">
                  <span class="map-icon">✅</span>
                  <p><strong>Red optimizada generada</strong></p>
                  <p style="font-size: 14px; margin-top: 10px;">
                    <strong>{{ optimizationResult.stats.nodes }}</strong> nodos,
                    <strong>{{ optimizationResult.stats.edges }}</strong> aristas
                  </p>
                  <button
                      class="btn-view-graph"
                      @click="viewGraph"
                      style="margin-top: 15px;"
                  >
                    Ver Grafo Completo
                  </button>
                </div>
                <div class="legend">
                  <h4>Leyenda</h4>
                  <div class="legend-item">
                    <span class="color-box" style="background: #4CAF50;"></span>
                    <span>Pozos Propuestos</span>
                  </div>
                  <div class="legend-item">
                    <span class="color-box" style="background: #2196F3;"></span>
                    <span>Reservorios Existentes</span>
                  </div>
                  <div class="legend-item">
                    <span class="color-box" style="background: #FF9800;"></span>
                    <span>Comunidades Prioritarias</span>
                  </div>
                  <div class="legend-item">
                    <span class="color-box" style="background: #9C27B0;"></span>
                    <span>Red de Distribución</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Results Section -->
            <div class="results-section">
              <h3>Resultados de Optimización</h3>

              <div class="tabs">
                <button
                    class="tab-btn"
                    :class="{ active: params.algorithm === 'mst' }"
                    @click="params.algorithm = 'mst'"
                >
                  MST (Kruskal)
                </button>
                <button
                    class="tab-btn"
                    :class="{ active: params.algorithm === 'dijkstra' }"
                    @click="params.algorithm = 'dijkstra'"
                >
                  Dijkstra
                </button>
                <button
                    class="tab-btn"
                    :class="{ active: params.algorithm === 'dp' }"
                    @click="params.algorithm = 'dp'"
                >
                  Prog. Dinámica
                </button>
              </div>

              <div v-if="optimizationResult" class="results-content">
                <div class="result-item">
                  <span class="result-label">Algoritmo Ejecutado</span>
                  <span class="result-value">
                    <strong>{{ optimizationResult.algorithm }}</strong>
                  </span>
                </div>

                <div class="result-item">
                  <span class="result-label">Costo Total de Instalación</span>
                  <span class="result-value">
                    S/ {{ formatNumber(optimizationResult.stats.total_cost) }}
                    <span class="badge badge-success">-{{ optimizationResult.stats.efficiency.toFixed(1) }}%</span>
                  </span>
                </div>

                <div class="result-item">
                  <span class="result-label">Longitud de Red Óptima</span>
                  <span class="result-value">{{ optimizationResult.stats.total_distance.toFixed(2) }} km</span>
                </div>

                <div class="result-item">
                  <span class="result-label">Tiempo de Ejecución</span>
                  <span class="result-value">{{ optimizationResult.stats.execution_time.toFixed(4) }} seg</span>
                </div>

                <div class="result-item">
                  <span class="result-label">Pozos Utilizados</span>
                  <span class="result-value">
                    {{ optimizationResult.stats.wells_used }}
                    <span class="badge badge-info">de {{ params.wellCount }}</span>
                  </span>
                </div>

                <div class="result-item">
                  <span class="result-label">Comunidades Conectadas</span>
                  <span class="result-value">
                    {{ optimizationResult.stats.communities_connected }}
                    <span class="badge badge-success">
                      {{ optimizationResult.stats.coverage_percentage.toFixed(1) }}%
                    </span>
                  </span>
                </div>

                <div class="result-item">
                  <span class="result-label">Complejidad Algorítmica</span>
                  <span class="result-value">
                    {{ optimizationResult.stats.complexity }}
                  </span>
                </div>

                <div class="result-item">
                  <span class="result-label">Costo Promedio por km</span>
                  <span class="result-value">
                    S/ {{ formatNumber(optimizationResult.stats.avg_cost_per_km) }}
                  </span>
                </div>
              </div>

              <div v-else class="no-results">
                <p>No hay resultados aún. Ejecuta una optimización para ver los resultados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../../shared/services/http.instance.js';

export default {
  name: 'dashboard',

  data() {
    return {
      params: {
        algorithm: 'mst',
        district: 'all',
        serviceType: 'all',
        wellCount: 5,
        budget: 500000
      },
      stats: {
        communities_analyzed: 0,
        total_cost: 0,
        coverage_percentage: 0,
        households: 0
      },
      isOptimizing: false,
      optimizationResult: null
    }
  },

  mounted() {
    this.loadGeneralStats();
  },

  methods: {
    /**
     * Cargar estadísticas generales del sistema
     */
    async loadGeneralStats() {
      try {
        const response = await http.get('/api/stats');

        if (response.data.success) {
          this.stats = {
            communities_analyzed: response.data.stats.communities_analyzed,
            total_cost: response.data.stats.estimated_cost,
            coverage_percentage: response.data.stats.coverage_percentage,
            households: response.data.stats.total_households
          };
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las estadísticas generales',
          life: 3000
        });
      }
    },

    /**
     * Ejecutar optimización con el backend
     */
    async runOptimization() {
      this.isOptimizing = true;

      try {
        // CORRECCIÓN: Usar this.params en lugar de variables sueltas
        const payload = {
          algorithm: this.params.algorithm,
          district: this.params.district,
          serviceType: this.params.serviceType,
          wellCount: this.params.wellCount,
          budget: this.params.budget || null
        };

        console.log('📤 Enviando optimización:', payload);

        const response = await http.post('/api/optimize', payload);

        if (response.data.success) {
          // Guardar resultado completo
          this.optimizationResult = response.data;

          // Actualizar estadísticas principales
          this.stats = {
            communities_analyzed: response.data.stats.communities_analyzed,
            total_cost: response.data.stats.total_cost,
            coverage_percentage: response.data.stats.coverage_percentage,
            households: response.data.stats.households
          };

          // Guardar en localStorage para visualización
          localStorage.setItem('lastOptimization', JSON.stringify(response.data));

          console.log('✅ Optimización exitosa:', response.data);

          this.$toast.add({
            severity: 'success',
            summary: 'Optimización Exitosa',
            detail: `${response.data.algorithm} - Costo: S/ ${this.formatNumber(response.data.stats.total_cost)}`,
            life: 5000
          });
        }
      } catch (error) {
        console.error('❌ Error running optimization:', error);

        this.$toast.add({
          severity: 'error',
          summary: 'Error en Optimización',
          detail: error.response?.data?.detail || error.message || 'Error ejecutando optimización',
          life: 5000
        });
      } finally {
        this.isOptimizing = false;
      }
    },

    /**
     * Navegar a visualización de grafo
     */
    viewGraph() {
      if (this.optimizationResult) {
        this.$router.push({
          name: 'red-visualization',
          params: {
            optimizationId: this.optimizationResult.optimization_id
          }
        });
      }
    },

    /**
     * Formatear números grandes
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  min-height: 100vh;
  background: #F0F4F8;
}

.container {
  padding: 30px 60px;
  max-width: 1440px;
  margin: 0 auto;
}

.hero {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero h1 {
  color: #1E3C72;
  font-size: 24px;
  margin-bottom: 10px;
}

.hero p {
  color: #666;
  font-size: 13px;
  line-height: 1.6;
}

.main-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

.sidebar {
  background: white;
  border-radius: 12px;
  padding: 30px;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar h3 {
  color: #1E3C72;
  font-size: 16px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #E0E0E0;
  border-radius: 6px;
  font-size: 13px;
  transition: border-color 0.3s;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #2A5298;
}

.btn-primary {
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #1E3C72 0%, #2A5298 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pi-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid #2A5298;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-card h4 {
  font-size: 11px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
  text-transform: uppercase;
}

.stat-card .value {
  font-size: 32px;
  font-weight: bold;
  color: #1E3C72;
  margin-bottom: 5px;
}

.stat-card .unit {
  font-size: 11px;
  color: #999;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 30px;
}

.map-container {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map-container h3 {
  color: #1E3C72;
  font-size: 16px;
  margin-bottom: 15px;
}

.map-placeholder {
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  height: 400px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.map-content {
  text-align: center;
  color: white;
  z-index: 1;
}

.map-content.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-icon {
  font-size: 60px;
  display: block;
  margin-bottom: 15px;
}

.map-content p {
  font-size: 16px;
}

.btn-view-graph {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-view-graph:hover {
  background: white;
  color: #764BA2;
}

.legend {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.legend h4 {
  font-size: 11px;
  font-weight: 600;
  color: #1E3C72;
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

.color-box {
  width: 18px;
  height: 18px;
  border-radius: 3px;
}

.results-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.results-section h3 {
  color: #1E3C72;
  font-size: 16px;
  margin-bottom: 15px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #E0E0E0;
  padding-bottom: 10px;
}

.tab-btn {
  padding: 8px 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #2A5298;
  border-bottom-color: #2A5298;
  font-weight: 600;
}

.results-content {
  max-height: 400px;
  overflow-y: auto;
}

.result-item {
  background: #F8F9FA;
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-label {
  font-size: 12px;
  color: #333;
  font-weight: 500;
}

.result-value {
  font-size: 13px;
  font-weight: 600;
  color: #2A5298;
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
}

.badge-success {
  background: #D4EDDA;
  color: #155724;
}

.badge-info {
  background: #E3F2FD;
  color: #1976D2;
}

.badge-warning {
  background: #FFF3CD;
  color: #856404;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }
}
</style>