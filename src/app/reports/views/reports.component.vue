<template>

  <div class="reportes">
    <!-- Navbar
    <nav class="navbar">
      <div class="logo">💧 AquaOptimize Barranca</div>
      <ul class="nav-links">
        <li><a href="#" @click="$router.push('/')">Dashboard</a></li>
        <li><a href="#" @click="$router.push('/analisis')">Análisis</a></li>
        <li><a href="#" class="active">Reportes</a></li>
      </ul>
    </nav>
    -->
    <div class="container">
      <!-- Header -->
      <div class="header-section">
        <div class="title-block">
          <h1>Reporte de Optimización de Infraestructura Hídrica</h1>
          <p>Provincia de Barranca, Lima - Análisis completo de 1,697 registros</p>
          <span class="date">Generado: 05 de Octubre, 2025 | Algoritmo: MST (Kruskal)</span>
        </div>
        <div class="actions">
          <button class="btn-export">Exportar</button>
          <button class="btn-print">Imprimir</button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Executive Summary -->
        <div class="summary-card">
          <h2>Resumen Ejecutivo</h2>

          <h3>Objetivo del Análisis</h3>
          <p>Determinar la ubicación óptima de 5 pozos de agua en comunidades de Barranca para minimizar costos de instalación y maximizar cobertura del servicio.</p>

          <h3>Resultados Principales</h3>
          <ul class="results-list">
            <li>Reducción de costos: 22% vs. método tradicional</li>
            <li>Cobertura alcanzada: 94.2% de la población objetivo</li>
            <li>Viviendas beneficiadas: 12,453 hogares</li>
            <li>Longitud de red optimizada: 47.3 km de tuberías</li>
          </ul>
        </div>

        <!-- Recommendations -->
        <div class="recommendations-card">
          <h2>Recomendaciones Técnicas</h2>

          <div class="rec-item rec-success">
            <div class="rec-number">1</div>
            <div class="rec-content">
              <h4>Implementación Prioritaria</h4>
              <p>Iniciar instalación en Zona Norte (Barranca Centro) por mayor densidad poblacional y menor costo por vivienda atendida.</p>
            </div>
          </div>

          <div class="rec-item rec-warning">
            <div class="rec-number">2</div>
            <div class="rec-content">
              <h4>Consideraciones Hidrogeológicas</h4>
              <p>Verificar estudios de napa freática en zonas identificadas antes de proceder con perforación de pozos profundos.</p>
            </div>
          </div>

          <div class="rec-item rec-info">
            <div class="rec-number">3</div>
            <div class="rec-content">
              <h4>Sostenibilidad del Proyecto</h4>
              <p>Establecer plan de monitoreo trimestral de calidad de agua y mantenimiento preventivo de infraestructura instalada.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cost Breakdown -->
      <div class="cost-breakdown">
        <h2>Desglose de Costos</h2>

        <table class="cost-table">
          <thead>
          <tr>
            <th>Concepto</th>
            <th>Costo (S/)</th>
            <th>%</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Perforación de pozos (5 unidades)</td>
            <td class="amount">175,000</td>
            <td>45.2%</td>
          </tr>
          <tr>
            <td>Instalación de tuberías (47.3 km)</td>
            <td class="amount">132,500</td>
            <td>34.2%</td>
          </tr>
          <tr>
            <td>Equipamiento y bombeo</td>
            <td class="amount">48,000</td>
            <td>12.4%</td>
          </tr>
          <tr>
            <td>Sistemas de control y monitoreo</td>
            <td class="amount">18,500</td>
            <td>4.8%</td>
          </tr>
          <tr>
            <td>Mano de obra especializada</td>
            <td class="amount">13,500</td>
            <td>3.4%</td>
          </tr>
          </tbody>
          <tfoot>
          <tr class="total-row">
            <td>COSTO TOTAL DE INVERSIÓN</td>
            <td class="amount">387,500</td>
            <td>100%</td>
          </tr>
          </tfoot>
        </table>

        <div class="roi-card">
          <strong>Retorno de Inversión Estimado</strong>
          <p>Período de recuperación: 6.2 años | Ahorro anual proyectado: S/ 62,500</p>
        </div>
      </div>

      <!-- Technical Specs -->
      <div class="tech-specs">
        <h2>Especificaciones Técnicas del Proyecto</h2>

        <div class="specs-grid">
          <div class="spec-card">
            <h4>Pozos Proyectados</h4>
            <div class="spec-value">5</div>
            <p>Profundidad: 80-120m</p>
          </div>
          <div class="spec-card">
            <h4>Capacidad Total</h4>
            <div class="spec-value">850 m³/día</div>
            <p>Almacenamiento</p>
          </div>
          <div class="spec-card">
            <h4>Red de Distribución</h4>
            <div class="spec-value">47.3 km</div>
            <p>Tubería PVC Ø4"-6"</p>
          </div>
          <div class="spec-card">
            <h4>Población Beneficiada</h4>
            <div class="spec-value">52,340</div>
            <p>habitantes (94.2%)</p>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline-section">
        <h2>Cronograma de Implementación</h2>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker marker-green"></div>
            <div class="timeline-content">
              <h4>Fase 1: Perforación y Equipamiento</h4>
              <p>Duración: 3-4 meses | Costo: S/ 223,000</p>
              <span class="timeline-date">Trimestre 1-2</span>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker marker-blue"></div>
            <div class="timeline-content">
              <h4>Fase 2: Instalación de Red</h4>
              <p>Duración: 4-5 meses | Costo: S/ 132,500</p>
              <span class="timeline-date">Trimestre 2-3</span>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker marker-orange"></div>
            <div class="timeline-content">
              <h4>Fase 3: Pruebas y Puesta en Marcha</h4>
              <p>Duración: 1-2 meses | Costo: S/ 32,000</p>
              <span class="timeline-date">Trimestre 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reports'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.reports {
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

.nav-links a.active {
  color: white;
  font-weight: 600;
}

/* Container */
.container {
  padding: 30px 60px;
  max-width: 1440px;
  margin: 0 auto;
}

/* Header Section */
.header-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title-block h1 {
  color: #1E3C72;
  font-size: 24px;
  margin-bottom: 8px;
}

.title-block p {
  color: #666;
  font-size: 13px;
  margin-bottom: 5px;
}

.date {
  font-size: 12px;
  color: #999;
}

.actions {
  display: flex;
  gap: 15px;
}

.btn-export,
.btn-print {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-export {
  background: #4CAF50;
  color: white;
  border: none;
}

.btn-export:hover {
  background: #45a049;
}

.btn-print {
  background: white;
  color: #1E3C72;
  border: 2px solid #E0E0E0;
}

.btn-print:hover {
  border-color: #2A5298;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.summary-card,
.recommendations-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-card h2,
.recommendations-card h2 {
  color: #1E3C72;
  font-size: 18px;
  margin-bottom: 20px;
}

.summary-card h3 {
  color: #333;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 8px;
}

.summary-card p {
  color: #666;
  font-size: 13px;
  line-height: 1.6;
}

.results-list {
  margin: 15px 0;
  padding-left: 20px;
}

.results-list li {
  color: #666;
  font-size: 13px;
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Recommendations */
.rec-item {
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.rec-success {
  background: #E8F5E9;
}

.rec-warning {
  background: #FFF3E0;
}

.rec-info {
  background: #E3F2FD;
}

.rec-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
}

.rec-success .rec-number {
  background: #4CAF50;
  color: white;
}

.rec-warning .rec-number {
  background: #FF9800;
  color: white;
}

.rec-info .rec-number {
  background: #2196F3;
  color: white;
}

.rec-content h4 {
  color: #333;
  font-size: 14px;
  margin-bottom: 6px;
}

.rec-content p {
  color: #666;
  font-size: 12px;
  line-height: 1.5;
}

/* Cost Breakdown */
.cost-breakdown {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cost-breakdown h2 {
  color: #1E3C72;
  font-size: 18px;
  margin-bottom: 20px;
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cost-table thead {
  background: #F8F9FA;
}

.cost-table th {
  padding: 12px 15px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #E0E0E0;
}

.cost-table td {
  padding: 12px 15px;
  font-size: 13px;
  color: #666;
  border-bottom: 1px solid #E0E0E0;
}

.amount {
  font-weight: 600;
  color: #2A5298;
}

.total-row {
  background: #1E3C72;
}

.total-row td {
  color: white;
  font-weight: bold;
  border-bottom: none;
  padding: 15px;
}

.roi-card {
  background: #E8F4F8;
  padding: 15px;
  border-radius: 8px;
}

.roi-card strong {
  color: #1E3C72;
  font-size: 13px;
  display: block;
  margin-bottom: 5px;
}

.roi-card p {
  color: #666;
  font-size: 12px;
}

/* Technical Specs */
.tech-specs {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tech-specs h2 {
  color: #1E3C72;
  font-size: 18px;
  margin-bottom: 20px;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.spec-card {
  background: #F8F9FA;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.spec-card h4 {
  font-size: 11px;
  font-weight: 600;
  color: #666;
  margin-bottom: 10px;
}

.spec-value {
  font-size: 24px;
  font-weight: bold;
  color: #1E3C72;
  margin-bottom: 5px;
}

.spec-card p {
  font-size: 10px;
  color: #999;
}

/* Timeline */
.timeline-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.timeline-section h2 {
  color: #1E3C72;
  font-size: 18px;
  margin-bottom: 25px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
  transition: all 0.3s;
}

.timeline-item:hover {
  border-color: #2A5298;
  box-shadow: 0 2px 8px rgba(42, 82, 152, 0.2);
}

.timeline-marker {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
}

.marker-green {
  background: #4CAF50;
}

.marker-blue {
  background: #2196F3;
}

.marker-orange {
  background: #FF9800;
}

.timeline-content {
  flex: 1;
}

.timeline-content h4 {
  color: #333;
  font-size: 14px;
  margin-bottom: 6px;
}

.timeline-content p {
  color: #666;
  font-size: 12px;
  margin-bottom: 5px;
}

.timeline-date {
  color: #2A5298;
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>