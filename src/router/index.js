import {createRouter, createWebHistory} from 'vue-router';
const AnalyticsComponent = () => import('../app/analytics/views/analytics.component.vue');
const ReportsComponent = () => import('../app/reports/views/reports.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const DashboardComponent = () => import('../app/dashboard/views/dashboard.component.vue');

const routes = [
    {path: '/analytics',        name: 'analytics',     component: AnalyticsComponent, meta:{title: 'Analytics'}},
    {path: '/reports',   name: 'reports',    component: ReportsComponent, meta:{title: 'Reports'}},
    {path: '/dashboard', name: 'dashboard', component: DashboardComponent, meta:{title: 'Dashboard'}},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta:{title: 'Page not found'}},
    {path: '/', name : 'default', redirect: {name: 'dashboard'}},
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
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;