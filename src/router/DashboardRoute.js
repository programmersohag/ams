
// const DashboardMis = () => import('@/components/dashboard/IndexMis')
const DashboardMis = () => import('@/components/dashboard/DashboardIndex')


//const DashboardAis = () => import('@/components/dashboard/IndexAis')

const DashboardBranchStatusAndBranchTypeDashboard = () => import('@/components/dashboard/branch/BranchStatusAndBranchType')

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

export default [
    {
        path: '/',
        redirect: { name: 'Dashboard' },
        name: 'Home',
        meta: { 
            requiresAuth: true
        },
        component: DefaultContainer,
        children: [
            {
                path: 'mis/dashboard',
                name: 'Dashboard',
                component: DashboardMis
            },
            {
                path: 'mis/dashboard/branch-status-and-branch-type',
                name: 'BranchStatus & BranchType Dashboard',
                component: DashboardBranchStatusAndBranchTypeDashboard
            },

        ]
    }
]
