const DefaultContainer = () => import('@/containers/DefaultContainer');
const fixedAsset = () => import('@/components/audit_executions/fixed_assets/Index');
const checkPointExecution = () => import('@/components/audit_executions/check_point_executions/Index')
const checkPointExecutionAdd = () => import('@/components/audit_executions/check_point_executions/Add')
const checkPointExecutionView = () => import('@/components/audit_executions/check_point_executions/View')
const generalInfo = () => import('@/components/audit_executions/general_info/Index')
const StaffPosition = () => import('@/components/audit_executions/staff_positions/Index')
const StaffPositionAdd = () => import('@/components/audit_executions/staff_positions/Add')
const StaffPositionView = () => import('@/components/audit_executions/staff_positions/View')
const FieldOfficerWisePerformanceAnalysis = () => import('@/components/audit_executions/field_officer_wise_performance_analysis/Index')
const FieldOfficerWisePerformanceAnalysisAdd = () => import('@/components/audit_executions/field_officer_wise_performance_analysis/Add')
const FieldOfficerWisePerformanceAnalysisView = () => import('@/components/audit_executions/field_officer_wise_performance_analysis/View')
const OngoingProgramAveragePosition = () => import('@/components/audit_executions/ongoing_program_average_positions/Index')
const OngoingProgramAveragePositionAdd = () => import('@/components/audit_executions/ongoing_program_average_positions/Add')
const OngoingProgramAveragePositionEdit = () => import('@/components/audit_executions/ongoing_program_average_positions/Edit')
const OngoingProgramAveragePositionView = () => import('@/components/audit_executions/ongoing_program_average_positions/View')
const CashAndBankBalance = () => import('@/components/audit_executions/cash_and_bank_balances/Index')
const CashAndBankBalanceAdd = () => import('@/components/audit_executions/cash_and_bank_balances/Add')
const CashAndBankBalanceView = () => import('@/components/audit_executions/cash_and_bank_balances/View')
const Budgets = () => import('@/components/audit_executions/budgets/Index')
const BudgetsAdd = () => import('@/components/audit_executions/budgets/Add')
const BudgetsView = () => import('@/components/audit_executions/budgets/View')
const PassbookBalance = () => import('@/components/audit_executions/passbook_balances/Index')
const PassbookBalanceAdd = () => import('@/components/audit_executions/passbook_balances/Add')
const PassbookBalanceView = () => import('@/components/audit_executions/passbook_balances/View')
const TargetAndAchievements = () => import('@/components/audit_executions/target_and_achievements/Index')
const TargetAndAchievementsAdd = () => import('@/components/audit_executions/target_and_achievements/Add')
const TargetAndAchievementsView = () => import('@/components/audit_executions/target_and_achievements/View')


export default [
  {
    path: '/audit-execution',
    redirect: '',
    name: 'Audi Execution',
    meta: {
      requiresAuth: true
    },
    component: DefaultContainer,
    children: [
      {
        path: 'general-info/Index',
        name: 'General Info',
        component: generalInfo
      },
      {
        path: 'staff-positions/index',
        name: 'Staff Position: Index',
        component: StaffPosition
      },
      {
        path: 'staff-positions/add/:auditExecutionMastersId',
        name: 'Staff Position: Add',
        component: StaffPositionAdd
      },
      {
        path: 'staff-positions/view',
        name: 'Staff Position: View',
        component: StaffPositionView
      },
      {
        path: 'field-officer-wise-performance-analysis/index',
        name: 'FieldOfficerWisePerformanceAnalysisIndex',
        component: FieldOfficerWisePerformanceAnalysis
      },
      {
        path: 'field-officer-wise-performance-analysis/add/:auditExecutionMastersId',
        name: 'Field Officer wise Performance Analysis: Add',
        component: FieldOfficerWisePerformanceAnalysisAdd
      },
      {
        path: 'field-officer-wise-performance-analysis/view',
        name: 'Field Officer wise Performance Analysis: View',
        component: FieldOfficerWisePerformanceAnalysisView
      },
      {
        path: 'ongoing-program-average-positions/index',
        name: 'Ongoing Program Average Position: Index',
        component: OngoingProgramAveragePosition
      },
      {
        path: 'ongoing-program-average-positions/add',
        name: 'Ongoing Program Average Position: Add',
        component: OngoingProgramAveragePositionAdd
      },
      {
        path: 'ongoing-program-average-positions/edit',
        name: 'Ongoing Program Average Position: Edit',
        component: OngoingProgramAveragePositionEdit
      },
      {
        path: 'ongoing-program-average-positions/view',
        name: 'Ongoing Program Average Position: View',
        component: OngoingProgramAveragePositionView
      },
      {
        path: 'cash-and-bank-balances/index',
        name: 'Cash & Bank Balance: Index',
        component: CashAndBankBalance
      },
      {
        path: 'cash-and-bank-balances/add',
        name: 'Cash & Bank Balance: Add',
        component: CashAndBankBalanceAdd
      },
      {
        path: 'cash-and-bank-balances/edit',
        name: 'Cash & Bank Balance: Edit',
        component: CashAndBankBalanceAdd
      },
      {
        path: 'cash-and-bank-balances/view',
        name: 'Cash & Bank Balance: View',
        component: CashAndBankBalanceView
      },
      {
        path: 'budgets/index',
        name: 'Budgets: Index',
        component: Budgets
      },
      {
        path: 'budgets/add',
        name: 'Budgets: Add',
        component: BudgetsAdd
      },
      {
        path: 'budgets/view',
        name: 'Budgets: View',
        component: BudgetsView
      },
      {
        path: 'target-and-achievements/index',
        name: 'Target & Achievements: Index',
        component: TargetAndAchievements
      },
      {
        path: 'target-and-achievements/add',
        name: 'Target & Achievements: Add',
        component: TargetAndAchievementsAdd
      },
      {
        path: 'target-and-achievements/view',
        name: 'Target & Achievements: View',
        component: TargetAndAchievementsView
      },
      {
        path: 'fixed-assets/index',
        name: 'Fixed Assets',
        component: fixedAsset
      },
      {
        path: 'check-point-executions/index',
        name: 'Check Point Execution: Index',
        component: checkPointExecution
      },
      {
        path: 'check-point-executions/add/:auditExecutionMastersId',
        name: 'Check Point Execution: Add',
        component: checkPointExecutionAdd
      },
      {
        path: 'check-point-executions/view',
        name: 'Check Point Execution: View',
        component: checkPointExecutionView
      },
      {
        path: 'passbook-balances',
        redirect: '/passbook-balances/index',
        name: 'Passbook Balance',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: 'index',
            name: 'index',
            component: PassbookBalance
          },
          {
            path: 'add/:auditExecutionMastersId',
            name: 'Add',
            component: PassbookBalanceAdd
          },
          {
            path: 'view',
            name: 'View',
            component: PassbookBalanceView
          }
        ]
      }
    ]
  },

]
