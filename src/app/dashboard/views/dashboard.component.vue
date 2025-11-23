<template>
  <div class="dashboard">
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
            <select v-model="algorithm">
              <option value="mst">MST (Kruskal/Prim)</option>
              <option value="dijkstra">Dijkstra + MST</option>
              <option value="dp">Programación Dinámica</option>
              <option value="backtracking">Backtracking + MST</option>
            </select>
          </div>

          <div class="form-group">
            <label>Distrito</label>
            <select v-model="district">
              <option value="all">Todos los distritos</option>
              <option value="barranca">Barranca</option>
              <option value="paramonga">Paramonga</option>
              <option value="pativilca">Pativilca</option>
              <option value="supe">Supe</option>
            </select>
          </div>

          <div class="form-group">
            <label>Tipo de Servicio</label>
            <select v-model="serviceType">
              <option value="all">Todos</option>
              <option value="emergency">Emergencia (70-80%)</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div class="form-group">
            <label>Número de Pozos a Ubicar</label>
            <input type="number" v-model="wellCount" min="1" max="20" />
          </div>

          <div class="form-group">
            <label>Presupuesto Máximo (S/)</label>
            <input type="number" v-model="budget" step="10000" />
          </div>

          <button class="btn-primary" @click="runOptimization" :disabled="isOptimizing">
            {{ isOptimizing ? 'Procesando...' : 'Ejecutar Optimización' }}
          </button>
        </aside>

        <!-- Content Area -->
        <div class="content-area">
          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card">
              <h4>Comunidades Analizadas</h4>
              <div class="value">1,697</div>
              <div class="unit">registros</div>
            </div>
            <div class="stat-card">
              <h4>Costo Estimado</h4>
              <div class="value">S/ 387,500</div>
              <div class="unit">instalación</div>
            </div>
            <div class="stat-card">
              <h4>Cobertura Proyectada</h4>
              <div class="value">94.2%</div>
              <div class="unit">población</div>
            </div>
            <div class="stat-card">
              <h4>Viviendas Beneficiadas</h4>
              <div class="value">12,453</div>
              <div class="unit">hogares</div>
            </div>
          </div>

          <!-- Bottom Grid -->
          <div class="bottom-grid">
            <!-- Map Container -->
            <div class="map-container">
              <h3>Mapa de Optimización - Barranca</h3>
              <div class="map-placeholder">
                <div class="map-content">
                  <span class="map-icon">📍</span>
                  <p>Visualización Geoespacial de Red Hídrica</p>
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
                <button class="tab-btn active">MST (Kruskal)</button>
                <button class="tab-btn">Dijkstra</button>
                <button class="tab-btn">Prog. Dinámica</button>
              </div>

              <div class="result-item">
                <span class="result-label">Costo Total de Instalación</span>
                <span class="result-value">
                  S/ 387,500
                  <span class="badge badge-success">-22%</span>
                </span>
              </div>

              <div class="result-item">
                <span class="result-label">Longitud de Red Óptima</span>
                <span class="result-value">47.3 km</span>
              </div>

              <div class="result-item">
                <span class="result-label">Tiempo de Ejecución</span>
                <span class="result-value">2.4 seg</span>
              </div>

              <div class="result-item">
                <span class="result-label">Eficiencia vs. Tradicional</span>
                <span class="result-value">
                  +34%
                  <span class="badge badge-success">Óptimo</span>
                </span>
              </div>

              <div class="result-item">
                <span class="result-label">Índice de Sostenibilidad</span>
                <span class="result-value">
                  8.7/10
                  <span class="badge badge-warning">Bueno</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  title: "Dashboard",
  data() {
    return {
      algorithm: 'mst',
      district: 'all',
      serviceType: 'all',
      wellCount: 5,
      budget: 500000,
      isOptimizing: false
    }
  },
  methods: {
    runOptimization() {
      this.isOptimizing = true
      setTimeout(() => {
        this.isOptimizing = false
        alert('Optimización completada!\n\nAlgoritmo: ' + this.algorithm.toUpperCase() + '\nComunidades procesadas: 1,697\nCosto optimizado: S/ 387,500')
      }, 2000)
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
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

/* Container */
.container {
  padding: 30px 60px;
  max-width: 1440px;
  margin: 0 auto;
}

/* Hero */
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

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
}

/* Sidebar */
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

/* Content Area */
.content-area {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Stats Grid */
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

/* Bottom Grid */
.bottom-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 30px;
}

/* Map Container */
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

.map-icon {
  font-size: 60px;
  display: block;
  margin-bottom: 15px;
}

.map-content p {
  font-size: 16px;
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

/* Results Section */
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

.badge-warning {
  background: #FFF3CD;
  color: #856404;
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