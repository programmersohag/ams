const DefaultContainer = () => import('@/containers/DefaultContainer');
const AuditReview = () => import('@/components/process/audit_review/Index');
const ReviewPageForGI = () => import('@/components/process/audit_review/Review_GI');
const ReviewPageForSP = () => import('@/components/process/audit_review/Review_SP');
const ReviewPageForFOWPA = () => import('@/components/process/audit_review/Review_FOWPA');
const ReviewPageForOPAP = () => import('@/components/process/audit_review/Review_OPAP');
const ReviewPageForCABB = () => import('@/components/process/audit_review/Review_CABB');
const ReviewPageForPBB = () => import('@/components/process/audit_review/Review_PB');
const ReviewPageForBudget = () => import('@/components/process/audit_review/Review_Budget');
const ReviewPageForTAA = () => import('@/components/process/audit_review/Review_TAA');
const ReviewPageForFA = () => import('@/components/process/audit_review/Review_FA');
const ReviewPageForCP = () => import('@/components/process/audit_review/Review_CP');
const AuditReply = () => import('@/components/process/audit_reply/Index');
const ReplyPageForGI = () => import('@/components/process/audit_reply/Reply_GI');
const ReplyPageForSP = () => import('@/components/process/audit_reply/Reply_SP');
const ReplyPageForFOWPA = () => import('@/components/process/audit_reply/Reply_FOWPA');
const ReplyPageForOPAP = () => import('@/components/process/audit_reply/Reply_OPAP');
const ReplyPageForCABB = () => import('@/components/process/audit_reply/Reply_CABB');
const ReplyPageForPBB = () => import('@/components/process/audit_reply/Reply_PB');
const ReplyPageForBudget = () => import('@/components/process/audit_reply/Reply_Budget');
const ReplyPageForTAA = () => import('@/components/process/audit_reply/Reply_TAA');
const ReplyPageForFA = () => import('@/components/process/audit_reply/Reply_FA');
const ReplyPageForCP = () => import('@/components/process/audit_reply/Reply_CP');

const CorrectiveActionToolsSchedule = () => import('@/components/process/corrective_action_tools/Index_Schedule');
const CorrectiveActionToolsExecution = () => import('@/components/process/corrective_action_tools/Index_Execution');
const CorrectiveActionToolsPageForGI = () => import('@/components/process/corrective_action_tools/cat_GI');
const CorrectiveActionToolsPageForSP = () => import('@/components/process/corrective_action_tools/cat_SP');
const CorrectiveActionToolsPageForFOWPA = () => import('@/components/process/corrective_action_tools/cat_FOWPA');
const CorrectiveActionToolsPageForOPAP = () => import('@/components/process/corrective_action_tools/cat_OPAP');
const CorrectiveActionToolsPageForCABB = () => import('@/components/process/corrective_action_tools/cat_CABB');
const CorrectiveActionToolsPageForPBB = () => import('@/components/process/corrective_action_tools/cat_PBB');
const CorrectiveActionToolsPageForBudget = () => import('@/components/process/corrective_action_tools/cat_Budget');
const CorrectiveActionToolsPageForTAA = () => import('@/components/process/corrective_action_tools/cat_TAA');
const CorrectiveActionToolsPageForFA = () => import('@/components/process/corrective_action_tools/cat_FA');
const CorrectiveActionToolsPageForCP = () => import('@/components/process/corrective_action_tools/cat_CP');

export default [
  {
    path: '/process',
    redirect: '',
    name: 'Process',
    meta: {
      requiresAuth: true
    },
    component: DefaultContainer,
    children: [
      {
        path: 'audit-review/index',
        name: 'Audit Review Index',
        component: AuditReview,
      },
      {
        path: 'audit-review/general-info/:scheduleId/:id',
        name: 'General Info Review',
        component: ReviewPageForGI
      },
      {
        path: 'audit-review/staff-position/:scheduleId/:id',
        name: 'Staff Position Review',
        component: ReviewPageForSP
      },
      {
        path: 'audit-review/field-officer-wise-performance-analysis/:scheduleId/:id',
        name: 'Field Officer Wise Performance Analysis Review',
        component: ReviewPageForFOWPA
      },
      {
        path: 'audit-review/ongoing-program-average-position/:scheduleId/:id',
        name: 'Ongoing Program Average Position Review',
        component: ReviewPageForOPAP
      },
      {
        path: 'audit-review/cash-and-bank-balance/:scheduleId/:id',
        name: 'Cash & Bank Balance Review',
        component: ReviewPageForCABB
      },
      {
        path: 'audit-review/passbook-balance/:scheduleId/:id',
        name: 'Passbook Balance Review',
        component: ReviewPageForPBB
      },
      {
        path: 'audit-review/budget/:scheduleId/:id',
        name: 'Budget Review',
        component: ReviewPageForBudget
      },
      {
        path: 'audit-review/target-and-achievement/:scheduleId/:id',
        name: 'Target & Achievements Review',
        component: ReviewPageForTAA
      },
      {
        path: 'audit-review/fixed-asset/:scheduleId/:id',
        name: 'Fixed Asset Review',
        component: ReviewPageForFA
      },
      {
        path: 'audit-review/check-point-execution/:scheduleId/:id',
        name: 'Check Point Execution Review',
        component: ReviewPageForCP
      },
      {
        path: 'audit-reply/index',
        name: 'Audit Reply Index',
        component: AuditReply,
      },
      {
        path: 'audit-reply/general-info/:scheduleId/:auditExecutionMastersId/:id',
        name: 'General Info Reply',
        component: ReplyPageForGI
      },
      {
        path: 'audit-reply/staff-position/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Staff Position Reply',
        component: ReplyPageForSP
      },
      {
        path: 'audit-reply/field-officer-wise-performance-analysis/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Field officer wise performance analysis Reply',
        component: ReplyPageForFOWPA
      },
      {
        path: 'audit-reply/ongoing-program-average-position/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Average position of ongoing program',
        component: ReplyPageForOPAP
      },
      {
        path: 'audit-reply/cash-and-bank-balance/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Cash & Bank Balance Reply',
        component: ReplyPageForCABB
      },
      {
        path: 'audit-reply/passbook-balance/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Passbook Balancing Reply',
        component: ReplyPageForPBB
      },
      {
        path: 'audit-reply/budget/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Budget Reply',
        component: ReplyPageForBudget
      },
      {
        path: 'audit-reply/target-and-achievement/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Target & Achievement Reply',
        component: ReplyPageForTAA
      },
      {
        path: 'audit-reply/fixed-asset/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Fixed Asset Reply',
        component: ReplyPageForFA
      },
      {
        path: 'audit-reply/check-point-execution/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Check Point Execution Reply',
        component: ReplyPageForCP
      },
      {
        path: 'corrective-action-tools/schedules',
        name: 'Corrective Action Tools: Schedules',
        component: CorrectiveActionToolsSchedule,
      },
      {
        path: 'corrective-action-tools/executions/:id',
        name: 'Corrective Action Tools: Executions',
        component: CorrectiveActionToolsExecution,
      },
      {
        path: 'corrective-action-tools/general-info/:auditExecutionMastersId/:id',
        name: 'General Info Corrective Action Tools',
        component: CorrectiveActionToolsPageForGI
      },
      {
        path: 'corrective-action-tools/staff-position/:auditExecutionMastersId/:id',
        name: 'Staff Position Corrective Action Tools',
        component: CorrectiveActionToolsPageForSP
      },
      {
        path: 'corrective-action-tools/field-officer-wise-performance-analysis/:auditExecutionMastersId/:id',
        name: 'Field officer wise performance analysis Corrective Action Tools',
        component: CorrectiveActionToolsPageForFOWPA
      },
      {
        path: 'corrective-action-tools/ongoing-program-average-position/:auditExecutionMastersId/:id',
        name: 'Average position of ongoing program Corrective Action Tools',
        component: CorrectiveActionToolsPageForOPAP
      },
      {
        path: 'corrective-action-tools/cash-and-bank-balance/:auditExecutionMastersId/:id',
        name: 'Cash & Bank Balance Corrective Action Tools',
        component: CorrectiveActionToolsPageForCABB
      },
      {
        path: 'corrective-action-tools/passbook-balance/:auditExecutionMastersId/:id',
        name: 'Passbook Balancing Corrective Action Tools',
        component: CorrectiveActionToolsPageForPBB
      },
      {
        path: 'corrective-action-tools/budget/:auditExecutionMastersId/:id',
        name: 'Budget Corrective Action Tools',
        component: CorrectiveActionToolsPageForBudget
      },
      {
        path: 'corrective-action-tools/target-and-achievement/:auditExecutionMastersId/:id',
        name: 'Target & Achievement Corrective Action Tools',
        component: CorrectiveActionToolsPageForTAA
      },
      {
        path: 'corrective-action-tools/fixed-asset/:auditExecutionMastersId/:id',
        name: 'Fixed Asset Corrective Action Tools',
        component: CorrectiveActionToolsPageForFA
      },
      {
        path: 'corrective-action-tools/check-point-execution/:scheduleId/:auditExecutionMastersId/:id',
        name: 'Check Point Execution Corrective Action Tools',
        component: CorrectiveActionToolsPageForCP
      },
    ]
  }
]
