//report
//**************************** Register Reports[Start]***********************************************//
const AuditExecution = () => import('@/components/reports/audit_execution_report/audit_execution')
const checkListReports = () => import('@/components/reports/check_list_reports/Index')
const BudgetReport = () => import('@/components/reports/budgets/budget')
const TargetAndAchievementReport = () => import('@/components/reports/target_and_achievements/target_and_achievements')
const FixedAssetsReport = () => import('@/components/reports/fixed_assets/fixed_assets')
const OngoingProgramAveragePositionsReport = () => import('@/components/reports/ongoing_program_average_positions/ongoing_program_average_position')
const CashAndBankBalance = () => import('@/components/reports/cash_and_bank_balances/cash_and_bank_balance')
const StaffPositionReport = () => import('@/components/reports/staff_position/staff_position')
const FoWisePerformanceAnalysisReport = () => import('@/components/reports/fo_wise_performance_analysis/fo-wise-performance-analysis')
const CheckPointExecution = () => import('@/components/reports/check_point_executions/check_point_execution')
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
export default [
  {
    path: '/reports',
    redirect: '',
    name: 'Reports',
    meta: {
      requiresAuth: true
    },
    component: DefaultContainer,
    children: [
      {
        path: 'audit-execution',
        redirect: '',
        name: 'Audit Execution Report',
        component: AuditExecution
      },
      {
        path: 'check-list',
        redirect: '',
        name: 'Check List Report',
        component: checkListReports
      },
      {
        path: 'staff-position',
        redirect: '',
        name: 'Staff Position Report',
        component: StaffPositionReport
      },
      {
        path: 'fo-wise-performance-analysis',
        name: 'Fo Wise Performance Analysis',
        component: FoWisePerformanceAnalysisReport
      },
      {
        path: 'ongoing-program-average-position',
        name: 'Average Position of Ongoing Program Report',
        component: OngoingProgramAveragePositionsReport
      },
      {
        path: 'cash-and-bank-balance',
        name: 'Cash and Bank Balance',
        component: CashAndBankBalance
      },
      {
        path: 'budget',
        redirect: '',
        name: 'Budget Report',
        component: BudgetReport
      },
      {
        path: 'target-and-achievement',
        redirect: '',
        name: 'Target & Achievement Report',
        component: TargetAndAchievementReport
      },
      {
        path: 'fixed-assets',
        redirect: '',
        name: 'Fixed Assets Report',
        component: FixedAssetsReport
      },
      {
        path: 'check-point-execution',
        name: 'Check Point Execution',
        component: CheckPointExecution
      }
    ]
  },


]
