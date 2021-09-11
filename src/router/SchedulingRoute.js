const DefaultContainer = () => import('@/containers/DefaultContainer');
const Teams = () => import('@/components/schedules/schedule_team/Index');
const Schedules = () => import('@/components/schedules/schedule/Index');
const ScheduleApprove = () => import('@/components/schedules/schedule_approve/Index');

export default [
  {
    path: '/scheduling',
    redirect: '',
    name: 'Scheduling',
    meta: {
      requiresAuth: true
    },
    component: DefaultContainer,
    children: [
      {
        path: 'teams/index',
        name: 'Teams',
        component: Teams
      },
      {
        path: 'schedule/index',
        name: 'Schedule',
        component: Schedules
      },
      {
        path: 'approve/index',
        name: 'Schedule Approve',
        component: ScheduleApprove
      }
    ]
  },

]
