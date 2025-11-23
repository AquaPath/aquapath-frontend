<template>
  <div class="analisis">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">💧 AquaOptimize Barranca</div>
      <ul class="nav-links">
        <li><a href="#" @click="$router.push('/')">Dashboard</a></li>
        <li><a href="#" class="active">Análisis</a></li>
        <li><a href="#" @click="$router.push('/reportes')">Reportes</a></li>
      </ul>
    </nav>

    <div class="container">
      <!-- Title Section -->
      <div class="title-section">
        <h1>Análisis de Algoritmos de Optimización</h1>
        <p>Comparativa de rendimiento y eficiencia entre diferentes métodos algorítmicos</p>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-section">
        <h2>Comparativa de Algoritmos</h2>

        <div class="table-container">
          <table class="comparison-table">
            <thead>
            <tr>
              <th>Algoritmo</th>
              <th>Costo (S/)</th>
              <th>Tiempo (seg)</th>
              <th>Cobertura (%)</th>
              <th>Complejidad</th>
              <th>Estado</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <div class="algo-name">MST (Kruskal)</div>
                <div class="algo-desc">Árbol Expansión Mínima</div>
              </td>
              <td class="cost">387,500</td>
              <td>2.4</td>
              <td>94.2</td>
              <td><code>O(E log E)</code></td>
              <td><span class="badge badge-success">Óptimo</span></td>
            </tr>
            <tr>
              <td>
                <div class="algo-name">MST (Prim)</div>
                <div class="algo-desc">Árbol Expansión Mínima</div>
              </td>
              <td class="cost">387,500</td>
              <td>3.1</td>
              <td>94.2</td>
              <td><code>O(E log V)</code></td>
              <td><span class="badge badge-success">Óptimo</span></td>
            </tr>
            <tr>
              <td>
                <div class="algo-name">Dijkstra + MST</div>
                <div class="algo-desc">Rutas cortas + Expansión</div>
              </td>
              <td class="cost">395,200</td>
              <td>4.7</td>
              <td>96.1</td>
              <td><code>O(V² log V)</code></td>
              <td><span class="badge badge-warning">Bueno</span></td>
            </tr>
            <tr>
              <td>
                <div class="algo-name">Prog. Dinámica</div>
                <div class="algo-desc">Ubicación óptima K pozos</div>
              </td>
              <td class="cost">389,800</td>
              <td>8.3</td>
              <td>95.4</td>
              <td><code>O(K·N²)</code></td>
              <td><span class="badge badge-warning">Bueno</span></td>
            </tr>
            <tr>
              <td>
                <div class="algo-name">Backtracking</div>
                <div class="algo-desc">Exploración exhaustiva</div>
              </td>
              <td class="cost">385,100</td>
              <td>45.2</td>
              <td>97.8</td>
              <td><code>O(2^N)</code></td>
              <td><span class="badge badge-error">Lento</span></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="note">
          <span class="note-icon">ℹ️</span>
          <span>Recomendación: MST (Kruskal) ofrece el mejor balance entre costo, tiempo y cobertura para este dataset.</span>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-grid">
        <!-- Performance Chart -->
        <div class="chart-card">
          <h3>Gráfico de Rendimiento</h3>
          <div class="bar-chart">
            <div class="bar-item">
              <div class="bar" style="height: 85%; background: #4CAF50;"></div>
              <span class="bar-label">MST-K</span>
            </div>
            <div class="bar-item">
              <div class="bar" style="height: 80%; background: #4CAF50;"></div>
              <span class="bar-label">MST-P</span>
            </div>
            <div class="bar-item">
              <div class="bar" style="height: 70%; background: #FF9800;"></div>
              <span class="bar-label">Dijkstra</span>
            </div>
            <div class="bar-item">
              <div class="bar" style="height: 72%; background: #FF9800;"></div>
              <span class="bar-label">Prog.Din</span>
            </div>
            <div class="bar-item">
              <div class="bar" style="height: 40%; background: #F44336;"></div>
              <span class="bar-label">Backtr.</span>
            </div>
          </div>
          <p class="chart-note">Puntuación de eficiencia (0-100)</p>
        </div>

        <!-- Cost Analysis -->
        <div class="chart-card">
          <h3>Análisis de Costos por Distrito</h3>
          <div class="cost-analysis">
            <div class="cost-item">
              <div class="cost-header">
                <span class="district-name">Barranca</span>
                <span class="cost-value">S/ 156,200</span>
              </div>
              <div class="progress-bar">
                <div class="progress" style="width: 85%; background: #4CAF50;"></div>
              </div>
            </div>
            <div class="cost-item">
              <div class="cost-header">
                <span class="district-name">Paramonga</span>
                <span class="cost-value">S/ 98,300</span>
              </div>
              <div class="progress-bar">
                <div class="progress" style="width: 64%; background: #2196F3;"></div>
              </div>
            </div>
            <div class="cost-item">
              <div class="cost-header">
                <span class="district-name">Pativilca</span>
                <span class="cost-value">S/ 87,500</span>
              </div>
              <div class="progress-bar">
                <div class="progress" style="width: 57%; background: #FF9800;"></div>
              </div>
            </div>
            <div class="cost-item">
              <div class="cost-header">
                <span class="district-name">Supe</span>
                <span class="cost-value">S/ 45,500</span>
              </div>
              <div class="progress-bar">
                <div class="progress" style="width: 30%; background: #9C27B0;"></div>
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
  name: 'analytics'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.analytics {
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
  transition: opacity 0.3s;
}

.nav-links a.active {
  color: white;
  font-weight: 600;
}

.nav-links a:hover {
  opacity: 1;
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
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title-section h1 {
  color: #1E3C72;
  font-size: 24px;
  margin-bottom: 10px;
}

.title-section p {
  color: #666;
  font-size: 13px;
}

/* Comparison Section */
.comparison-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comparison-section h2 {
  color: #1E3C72;
  font-size: 20px;
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table thead {
  background: #F8F9FA;
}

.comparison-table th {
  padding: 15px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #E0E0E0;
}

.comparison-table td {
  padding: 20px 15px;
  border-bottom: 1px solid #E0E0E0;
  font-size: 13px;
  color: #666;
}

.comparison-table tbody tr:hover {
  background: #F8F9FA;
}

.algo-name {
  font-size: 14px;
  font-weight: 600;
  color: #1E3C72;
  margin-bottom: 4px;
}

.algo-desc {
  font-size: 11px;
  color: #999;
}

.cost {
  font-weight: 600;
  color: #2A5298;
  font-size: 14px;
}

code {
  background: #F0F0F0;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #666;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 11px;
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

.badge-error {
  background: #F8D7DA;
  color: #721C24;
}

.note {
  margin-top: 20px;
  padding: 15px;
  background: #E8F4F8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #1E3C72;
}

.note-icon {
  font-size: 20px;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  color: #1E3C72;
  font-size: 16px;
  margin-bottom: 20px;
}

/* Bar Chart */
.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  margin-bottom: 15px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.bar {
  width: 60%;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
}

.bar-item:hover .bar {
  opacity: 0.8;
}

.bar-label {
  margin-top: 10px;
  font-size: 10px;
  color: #666;
  text-align: center;
}

.chart-note {
  font-size: 11px;
  color: #999;
  text-align: center;
}

/* Cost Analysis */
.cost-analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cost-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cost-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.district-name {
  font-size: 13px;
  color: #333;
}

.cost-value {
  font-size: 13px;
  font-weight: 600;
  color: #2A5298;
}

.progress-bar {
  width: 100%;
  height: 16px;
  background: #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 8px;
  transition: width 0.5s ease;
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>