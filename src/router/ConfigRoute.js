// config
const Departments = () => import('@/components/configs/departments/Index')
const checkListCategory = () => import('@/components/configs/check_list_category/Index')
const TeamType = () => import('@/components/configs/team_types/Index')
const CheckList = () => import('@/components/configs/check_lists/Index')
const Locations = () => import('@/components/configs/locations/Index')
const Projects = () => import('@/components/configs/projects/Index')

const ConfigGenerals = () => import('@/components/configs/config_generals/View')
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
// Help
const FaqDetails = () => import('@/components/configs/help/faq_details/index');
const TutorialDetails = () => import('@/components/configs/help/tutorial_details/index')

export default [
  {
    path: '/config',
    redirect: 'config/config-generals/view',
    name: 'Config',
    meta: {
      requiresAuth: true
    },
    component: DefaultContainer,
    children: [
      {
        path: 'config-generals/view',
        name: 'General Config',
        component: ConfigGenerals
      },
      {
        path: 'projects/Index',
        name: 'Projects',
        component: Projects
      },
      {
        path: 'departments/index',
        name: 'Departments',
        component: Departments
      },
      {
        path: 'check_list_category/index',
        name: 'checkListCategory',
        component: checkListCategory
      },
      {
        path: 'team_types/index',
        name: 'TeamType',
        component: TeamType
      },
      {
        path: 'check_lists/index',
        name: 'Check List',
        component: CheckList
      },
      {
        path: 'locations/index',
        name: 'Locations',
        component: Locations
      },
      {
        path: 'org-divisions',
        redirect: '/org-divisions/index',
        name: 'Org Divisions',
        component: {
          render(c) {
            return c('router-view')
          }
        },
      },
      {
        path: 'help',
        redirect: '',
        name: 'Help',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'faq_details/index',
            name: 'Index',
            component: FaqDetails
          },
          {
            path: 'tutorial_details/index',
            name: 'Index',
            component: TutorialDetails
          },

        ]
      }
    ]
  },

]
