const Error404=()=>import('@/components/ErrorView/Error404');
const Error403=()=>import('@/components/ErrorView/Error403');
const UnderConstruction=()=>import('@/components/ErrorView/UnderConstruction');
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

export default [
    {
        path: '*',
        redirect: '/error/404',
        meta: { 
            requiresAuth: true
        },
        component: DefaultContainer,
    },
    {
        path: '/error',
        redirect: '/error',
        name: 'Error',
        component: DefaultContainer,
        children: [
            {
                path: '404',
                name: '404',
                component: Error404
            },
            {
                path: '403',
                name: '403',
                component: Error403
            },
            {
                path: 'under-construction',
                name: 'Under Construction',
                component: UnderConstruction
            },
        ]
    },
]
