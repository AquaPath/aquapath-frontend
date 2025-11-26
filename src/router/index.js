import {createRouter, createWebHistory} from 'vue-router';
const AnalyticsComponent = () => import('../app/analytics/views/analytics.component.vue');
const ReportsComponent = () => import('../app/reports/views/reports.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const DashboardComponent = () => import('../app/dashboard/views/dashboard.component.vue');
const VisualizationComponent = () => import('../app/visualization/views/visualization.component.vue');
const LoginComponent = () => import('../app/auth/views/login.component.vue');

const routes = [

    {path: "/login", name: "login", component: LoginComponent, meta:{title: 'Login'}},
    {path: '/analytics',        name: 'analytics',     component: AnalyticsComponent, meta:{title: 'Analytics'}},
    {path: '/reports',   name: 'reports',    component: ReportsComponent, meta:{title: 'Reports'}},
    {path: '/dashboard', name: 'dashboard', component: DashboardComponent, meta:{title: 'Dashboard'}},
    {path: '/red-visualization', name: 'red-visualization', component: VisualizationComponent, meta:{title: 'Red-Visualization'}},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta:{title: 'Page not found'}},
    {path: "/", redirect: { name: "login" } },


]

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: routes,
    }
)

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'AquaPath';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;