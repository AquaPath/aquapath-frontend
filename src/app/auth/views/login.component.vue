<template>
  <div class="login-page">
    <!-- Background Decorations -->
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
    <div class="decoration decoration-3"></div>
    <div class="decoration decoration-4"></div>

    <div class="login-container">
      <!-- Login Card -->
      <div class="login-card">
        <!-- Logo -->
        <div class="logo-section">
          <div class="logo-circle">💧</div>
          <h1>AquaOptimize</h1>
          <p>Sistema de Optimización Hídrica</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>Usuario</label>
            <input
                type="text"
                v-model="username"
                placeholder="Ingrese su usuario"
                required
            />
            <span class="input-icon">👤</span>
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="••••••••"
                required
            />
            <span class="input-icon eye-icon" @click="showPassword = !showPassword">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </span>
          </div>

          <div class="remember-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" />
              <span>Recordar mi sesión</span>
            </label>
            <a href="#" class="forgot-link">¿Olvidó su contraseña?</a>
          </div>

          <button type="submit" class="btn-login" :disabled="isLoading">
            {{ isLoading ? 'Ingresando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span>o acceder con</span>
        </div>

        <!-- Social Login -->
        <div class="social-login">
          <button class="btn-social btn-google">
            <span class="social-icon">G</span>
            Google
          </button>
          <button class="btn-social btn-microsoft">
            <span class="social-icon">M</span>
            Microsoft
          </button>
        </div>

        <!-- Footer -->
        <div class="login-footer">
          <p>© 2025 AquaOptimize Barranca</p>
          <p>Universidad Peruana de Ciencias Aplicadas</p>
        </div>
      </div>

      <!-- Info Panel -->
      <div class="info-panel">
        <div class="info-content">
          <h2>Optimización</h2>
          <h2>Inteligente de</h2>
          <h2>Recursos Hídricos</h2>

          <p class="info-description">
            Plataforma avanzada para la toma de decisiones estratégicas en infraestructura de agua potable.
          </p>

          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <span>Algoritmos de Optimización Avanzados</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <span>Análisis de 1,697+ Comunidades</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <span>Reducción de Costos hasta 22%</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <span>Visualización Geoespacial en Tiempo Real</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        alert('Por favor complete todos los campos')
        return
      }

      this.isLoading = true

      // Simular login
      setTimeout(() => {
        this.isLoading = false
        this.$toast.add({ severity: 'success', summary: 'Login', detail: 'Acceso exitoso', life: 2000 });
        this.$router.push('/dashboard');

      }, 1500)
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

.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1E3C72 0%, #2A5298 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
}

/* Decorative Circles */
.decoration {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
}

.decoration-1 {
  width: 160px;
  height: 160px;
  top: 10%;
  left: 10%;
}

.decoration-2 {
  width: 240px;
  height: 240px;
  bottom: 10%;
  right: 15%;
}

.decoration-3 {
  width: 120px;
  height: 120px;
  bottom: 15%;
  left: 5%;
}

.decoration-4 {
  width: 180px;
  height: 180px;
  top: 20%;
  right: 8%;
}

/* Login Container */
.login-container {
  display: grid;
  grid-template-columns: 400px 420px;
  gap: 0;
  max-width: 820px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* Login Card */
.login-card {
  background: white;
  border-radius: 16px 0 0 16px;
  padding: 50px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Logo Section */
.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: #1E3C72;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 20px;
}

.logo-section h1 {
  color: #1E3C72;
  font-size: 28px;
  margin-bottom: 8px;
}

.logo-section p {
  color: #666;
  font-size: 14px;
}

/* Login Form */
.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 14px 45px 14px 14px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #2A5298;
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 42px;
  font-size: 16px;
  color: #999;
}

.eye-icon {
  cursor: pointer;
}

.remember-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  cursor: pointer;
}

.forgot-link {
  color: #2A5298;
  font-size: 12px;
  text-decoration: none;
  transition: opacity 0.3s;
}

.forgot-link:hover {
  opacity: 0.8;
}

.btn-login {
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg, #1E3C72 0%, #2A5298 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 30px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #E0E0E0;
}

.divider span {
  position: relative;
  background: white;
  padding: 0 15px;
  font-size: 12px;
  color: #999;
}

/* Social Login */
.social-login {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.btn-social {
  padding: 12px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  background: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-social:hover {
  border-color: #2A5298;
}

.social-icon {
  font-weight: bold;
  font-size: 16px;
}

.btn-google {
  color: #4285F4;
}

.btn-microsoft {
  color: #1877F2;
}

/* Login Footer */
.login-footer {
  text-align: center;
  font-size: 11px;
  color: #999;
}

.login-footer p {
  margin-bottom: 4px;
}

/* Info Panel */
.info-panel {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 16px 16px 0;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
}

.info-content {
  color: white;
}

.info-content h2 {
  font-size: 32px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 5px;
}

.info-description {
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.9;
  margin: 30px 0 40px;
}

/* Features */
.features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.feature-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .login-container {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .login-card {
    border-radius: 16px;
  }

  .info-panel {
    display: none;
  }
}
</style>