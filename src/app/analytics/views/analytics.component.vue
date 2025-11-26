<template>
  <div class="analytics-container">
    <div class="analytics-header">
      <h1>📊 Análisis y Comparación de Algoritmos</h1>
      <p>Evaluación del rendimiento de los algoritmos de optimización implementados</p>
    </div>

    <div class="analytics-content">
      <!-- Comparación de Algoritmos -->
      <div class="comparison-section">
        <h2>Comparación de Algoritmos</h2>

        <div v-if="loading" class="loading-state">
          <i class="pi pi-spin pi-spinner" style="font-size: 36px;"></i>
          <p>Cargando datos de comparación...</p>
        </div>

        <div v-else-if="comparisonData.length === 0" class="empty-state">
          <p>No hay datos de comparación disponibles.</p>
          <p>Ejecuta algunas optimizaciones primero en el Dashboard.</p>
        </div>

        <div v-else class="comparison-grid">
          <div
              v-for="algo in comparisonData"
              :key="algo.algoritmo"
              class="algo-card"
          >
            <div class="algo-header">
              <h3>{{ algo.algoritmo }}</h3>
              <span class="algo-badge">{{ algo.ejecuciones }} ejecuciones</span>
            </div>

            <div class="algo-metrics">
              <div class="metric-item">
                <span class="metric-label">Costo Promedio</span>
                <span class="metric-value success">
                  S/ {{ formatNumber(algo.costo_promedio) }}
                </span>
              </div>

              <div class="metric-item">
                <span class="metric-label">Tiempo Promedio</span>
                <span class="metric-value">
                  {{ Number(algo.tiempo_promedio).toFixed(4) }} seg
                </span>
              </div>

              <div class="metric-item">
                <span class="metric-label">Eficiencia Promedio</span>
                <span class="metric-value info">
                  {{ Number(algo.eficiencia_promedio).toFixed(1) }}%
                </span>
              </div>

              <div class="metric-item">
                <span class="metric-label">Mejor Costo</span>
                <span class="metric-value success">
                  S/ {{ formatNumber(algo.mejor_costo) }}
                </span>
              </div>

              <div class="metric-item">
                <span class="metric-label">Peor Costo</span>
                <span class="metric-value warning">
                  S/ {{ formatNumber(algo.peor_costo) }}
                </span>
              </div>
            </div>

            <div class="algo-rank">
              <span v-if="algo.ranking === 1" class="rank-badge gold">
                🥇 Más Eficiente
              </span>
              <span v-else-if="algo.ranking === 2" class="rank-badge silver">
                🥈 Segundo Lugar
              </span>
              <span v-else class="rank-badge bronze">
                🥉 Tercer Lugar
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Historial de Optimizaciones -->
      <div class="history-section">
        <div class="section-header">
          <h2>Historial de Optimizaciones</h2>
          <button class="btn-refresh" @click="loadData">
            🔄 Actualizar
          </button>
        </div>

        <div v-if="history.length === 0" class="empty-state">
          <p>No hay historial de optimizaciones.</p>
        </div>

        <div v-else class="history-table">
          <table>
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Algoritmo</th>
              <th>Distrito</th>
              <th>Costo Total</th>
              <th>Distancia</th>
              <th>Tiempo</th>
              <th>Eficiencia</th>
              <th>Comunidades</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="opt in history"
                :key="opt.id"
                @click="viewDetails(opt.id)"
                class="history-row"
            >
              <td>{{ formatDate(opt.fecha) }}</td>
              <td>
                <span class="algo-tag">{{ opt.algoritmo }}</span>
              </td>
              <td>{{ opt.distrito || 'Todos' }}</td>
              <td class="cost-cell">S/ {{ formatNumber(opt.costo_total) }}</td>
              <td>{{ Number(opt.distancia_total).toFixed(2) }} km</td>
              <td>{{ Number(opt.tiempo_ejecucion).toFixed(4) }} s</td>
              <td>
                  <span class="efficiency-badge">
                    {{ Number(opt.eficiencia).toFixed(1) }}%
                  </span>
              </td>
              <td>{{ opt.comunidades_conectadas }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Estadísticas por Distrito -->
      <div class="districts-section">
        <h2>Estadísticas por Distrito</h2>

        <div v-if="districtStats.length === 0" class="empty-state">
          <p>No hay estadísticas por distrito disponibles.</p>
        </div>

        <div v-else class="districts-grid">
          <div
              v-for="district in districtStats"
              :key="district.distrito"
              class="district-card"
          >
            <h3>{{ district.distrito }}</h3>
            <div class="district-metrics">
              <div class="district-metric">
                <span class="label">Comunidades</span>
                <span class="value">{{ district.comunidades }}</span>
              </div>
              <div class="district-metric">
                <span class="label">Demanda Total</span>
                <span class="value">{{ Number(district.demanda_total).toFixed(0) }} m³</span>
              </div>
              <div class="district-metric">
                <span class="label">Viviendas</span>
                <span class="value">{{ district.viviendas_total }}</span>
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
  name: 'analytics',

  data() {
    return {
      loading: true,
      comparisonData: [],
      history: [],
      districtStats: []
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    /**
     * Cargar todos los datos
     */
    async loadData() {
      this.loading = true;

      try {
        await Promise.all([
          this.loadComparison(),
          this.loadHistory(),
          this.loadDistrictStats()
        ]);
      } catch (error) {
        console.error('Error loading analytics data:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Cargar comparación de algoritmos
     */
    async loadComparison() {
      try {
        const response = await http.get('/api/analytics/comparison');

        if (response.data.success) {
          // Ordenar por eficiencia y agregar ranking
          this.comparisonData = response.data.algorithms
              .sort((a, b) => b.eficiencia_promedio - a.eficiencia_promedio)
              .map((algo, index) => ({
                ...algo,
                ranking: index + 1
              }));

          console.log('✅ Comparación de algoritmos cargada:', this.comparisonData);
        }
      } catch (error) {
        console.error('Error loading comparison:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la comparación de algoritmos',
          life: 3000
        });
      }
    },

    /**
     * Cargar historial de optimizaciones
     */
    async loadHistory() {
      try {
        const response = await http.get('/api/optimizations?limit=20');

        if (response.data.success) {
          this.history = response.data.optimizations;
          console.log('✅ Historial cargado:', this.history.length, 'registros');
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    },

    /**
     * Cargar estadísticas por distrito
     */
    async loadDistrictStats() {
      try {
        const response = await http.get('/api/stats/districts');

        if (response.data.success) {
          this.districtStats = response.data.districts;
          console.log('✅ Estadísticas por distrito cargadas:', this.districtStats);
        }
      } catch (error) {
        console.error('Error loading district stats:', error);
      }
    },

    /**
     * Ver detalles de optimización
     */
    viewDetails(optimizationId) {
      this.$router.push({
        name: 'red-visualization',
        params: { optimizationId }
      });
    },

    /**
     * Formatear fecha
     */
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    /**
     * Formatear números
     */
    formatNumber(num) {
      if (!num) return '0';
      return Number(num).toLocaleString('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
}
</script>

<style scoped>
.analytics-container {
  min-height: 100vh;
  background: #F0F4F8;
  padding: 30px;
}

.analytics-header {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.analytics-header h1 {
  color: #1E3C72;
  font-size: 28px;
  margin-bottom: 10px;
}

.analytics-header p {
  color: #666;
  font-size: 14px;
}

.analytics-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Comparación de Algoritmos */
.comparison-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comparison-section h2 {
  color: #1E3C72;
  font-size: 20px;
  margin-bottom: 20px;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.loading-state i {
  margin-bottom: 15px;
  color: #2A5298;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.algo-card {
  background: #F8F9FA;
  border-radius: 8px;
  padding: 20px;
  border: 2px solid #E0E0E0;
  transition: all 0.3s;
}

.algo-card:hover {
  border-color: #2A5298;
  box-shadow: 0 4px 12px rgba(42, 82, 152, 0.1);
}

.algo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid #E0E0E0;
}

.algo-header h3 {
  color: #1E3C72;
  font-size: 16px;
}

.algo-badge {
  background: #E3F2FD;
  color: #1976D2;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.algo-metrics {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 12px;
  color: #666;
}

.metric-value {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.metric-value.success {
  color: #4CAF50;
}

.metric-value.info {
  color: #2196F3;
}

.metric-value.warning {
  color: #FF9800;
}

.algo-rank {
  text-align: center;
  margin-top: 15px;
}

.rank-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.rank-badge.gold {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #fff;
}

.rank-badge.silver {
  background: linear-gradient(135deg, #C0C0C0, #808080);
  color: #fff;
}

.rank-badge.bronze {
  background: linear-gradient(135deg, #CD7F32, #8B4513);
  color: #fff;
}

/* Historial */
.history-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: #1E3C72;
  font-size: 20px;
}

.btn-refresh {
  padding: 8px 16px;
  background: #2A5298;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-refresh:hover {
  background: #1E3C72;
}

.history-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #F8F9FA;
}

th {
  padding: 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  border-bottom: 2px solid #E0E0E0;
}

.history-row {
  cursor: pointer;
  transition: all 0.3s;
}

.history-row:hover {
  background: #F8F9FA;
}

td {
  padding: 12px;
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #E0E0E0;
}

.algo-tag {
  display: inline-block;
  background: #E3F2FD;
  color: #1976D2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.cost-cell {
  font-weight: 600;
  color: #4CAF50;
}

.efficiency-badge {
  display: inline-block;
  background: #D4EDDA;
  color: #155724;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

/* Distritos */
.districts-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.districts-section h2 {
  color: #1E3C72;
  font-size: 20px;
  margin-bottom: 20px;
}

.districts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.district-card {
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  border-radius: 8px;
  padding: 20px;
  color: white;
}

.district-card h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.district-metrics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.district-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.district-metric .label {
  font-size: 12px;
  opacity: 0.9;
}

.district-metric .value {
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .comparison-grid,
  .districts-grid {
    grid-template-columns: 1fr;
  }

  .history-table {
    font-size: 11px;
  }

  th, td {
    padding: 8px;
  }
}
</style>