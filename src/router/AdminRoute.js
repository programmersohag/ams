const Index = () => import('@/components/admin/manage_user/Index')
const AddUser = () => import('@/components/admin/manage_user/Save')
const EditUser = () => import('@/components/admin/manage_user/Save')
const ChangePassword = () => import('@/components/admin/manage_user/ChangePassword');
//user role
const RoleIndex = () => import('@/components/admin/manage_user_role/Index')
const RoleAdd = () => import('@/components/admin/manage_user_role/Save')
const PriviledgeSave = () => import('@/components/admin/user_role_wise_privileges/SaveBatch')
// Admin Actions Router List
const UserAuditTrailsIndex = () => import('@/components/admin/user_audit_trails/Index')
const UserAuditTrailsView = () => import('@/components/admin/user_audit_trails/View')
const NotificationMessageForHoUsers= () => import('@/components/admin/notification_message_for_ho_users/Save');
const Pomis2FromAdminAction= ()=> import('@/components/admin/admin_actions/Pomis2LoanIdAmount');
const CoronaReport= ()=> import('@/components/admin/admin_actions/CoronaReport');
const UpdateSamityType= ()=> import('@/components/admin/admin_actions/UpdateSamityType');
const AdminAction= ()=> import('@/components/admin/admin_actions/Index');
const AdminActionloanIndex= ()=> import('@/components/admin/admin_actions/loans/AdminIndex');
const ChangeNonPrimaryLoanProducts= ()=> import('@/components/admin/admin_actions/ChangeNonPrimaryLoanProducts');
const ProductChange= ()=> import('@/components/admin/admin_actions/ProductChange');
const ProductConversion= ()=> import('@/components/admin/admin_actions/ProductConversion');
const BranchNotificationIndex = () => import('@/components/admin/branch_notification_message/Index')
const Notifications =() =>import('@/components/admin/notifications/Index')
const ContactList =() => import('@/components/admin/contact/Index')
//const FAQList =()=> import('@/components/admin/help/faq')
const VideoList =() => import('@/components/admin/help/tutorial')


const UpdateLoans= ()=> import('@/components/admin/admin_actions/loans/UpdateLoans');
const DatabaseDownloads= ()=> import('@/components/admin/database_downloads/DatabaseDownload');
const AutoVoucherBatchInsert= ()=> import('@/components/admin/admin_actions/AutoVoucherBatchInsert');
const InvalidRepaymentAmount= ()=> import('@/components/admin/admin_actions/GetInvalidRepaymentAmount');
const UpdateInvalidTransactions= ()=> import('@/components/admin/admin_actions/UpdateInvalidTransactions');
const UpdateNotificationMessage= ()=> import('@/components/admin/admin_actions/UpdateNotificationMessage');
const ChangeMemberPrimaryProductAdminAction= ()=> import('@/components/admin/admin_actions/UpdateMemberProductTransfer');
const CloseLoanInterest= ()=> import('@/components/admin/admin_actions/CloseLoanInterestUpdate.vue');
const FAQList =()=> import('@/components/admin/help/faq')
// const LogoUpload =()=> import('@/components/admin/help/logo')
// const LogoIndex =()=> import('@/components/admin/logo/index')
// const LogoAdd =()=> import('@/components/admin/logo/save')
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

export default [
    {
        path: '/admin',
        redirect: '/admin/user-roles',
        name: 'Admin',
        component: DefaultContainer,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'user-roles',
                redirect: '',
                name: 'User Role',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'index',
                        name: 'User Role',
                        component: RoleIndex
                    },
                    {
                        path: 'add',
                        name: 'Add User Role',
                        component: RoleAdd

                    }, {
                        path: 'edit',
                        name: 'Edit User Role',
                        component: RoleAdd
                    }
                ]
            },
            {
                path: 'user-role-wise-privileges',
                redirect: '',
                name: 'Role Wise Privileges',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'index/:role_id',
                        name: 'Role Wise Privileges',
                        component: PriviledgeSave
                    }
                ]
            },
            {
                path: 'users',
                redirect: 'users/index',
                name: 'Users',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'index',
                        name: 'Manage User',
                        component: Index
                    },
                    {
                        path: 'add',
                        name: 'AddUser',
                        component: AddUser
                    },
                    {
                        path: 'edit',
                        name: 'EditUser',
                        component: EditUser
                    },
                    {
                        path: 'change-password',
                        name: 'Change Password',
                        component: ChangePassword
                    }

                ]

            },
            {
                path: 'branch-notification-messeges',
                redirect: '',
                name: 'branch-notification-messeges',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'index',
                        name: 'Branch Notification Messages Index',
                        component: BranchNotificationIndex
                    }

                ]
            },

            {

                path: 'notifications',
                redirect: '',
                name: 'notification',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'index',
                        name: 'Notification',
                        component: Notifications
                    }

                ]
            },

          {
            path: 'contact',
            redirect: '',
            name: 'contact',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'index',
                name: 'Contact',
                component: ContactList
              }
            ]
          },

          // {
          //   path: 'help',
          //   redirect: '',
          //   component: {
          //     render(c) { return c('router-view') }
          //   },
          //   children: [
          //     {
          //       path: 'faq',
          //       name: 'FAQ',
          //       component: FAQList
          //     }
          //
          //   ]
          // },
          {
            path: 'help',
            redirect: '',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'tutorial',
                name: 'Tutorial',
                component: VideoList
              }

            ]
          },


            {
                path: 'database-downloads',
                redirect: '',
                name: 'Database-Downloads',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'index',
                        name: 'Database List',
                        component: DatabaseDownloads
                    }
                ]
            },
            {
                path: 'user-audit-trails',
                redirect: '',
                name: 'User Audit Trails',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'index',
                        name: 'User Audit Trails',
                        component: UserAuditTrailsIndex
                    },
                    {
                        path: 'view',
                        name: 'View',
                        component: UserAuditTrailsView
                    }
                ]
            },
            {
                path: 'notification-message-for-ho-users',
                redirect: '/admin/notification-message-for-ho-users/index',
                name: 'Notification Message For Head Office Users',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'index',
                        name: 'Index',
                        component: NotificationMessageForHoUsers
                    }
                ]
            },
            {
                path: 'admin-actions',
                redirect: 'admin-actions/index',
                name: 'Index',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'index',
                        name: 'Index',
                        component: AdminAction
                    },
                    {
                        path: 'admin-index',
                        name: 'admin index',
                        component: AdminActionloanIndex
                    },
                    {
                        path: 'pomis-2-new-due-list',
                        name: 'POMIS-2A New Due Loan',
                        component: Pomis2FromAdminAction
                    },
                    {
                        path: 'corona-report',
                        name: 'Corona Report ',
                        component: CoronaReport
                    },
                    {
                        path: 'update-loans',
                        name: 'Update Loan and Loan Transactions',
                        component: UpdateLoans
                    },

                    {
                        path: 'auto-voucher-batch-insert-new',
                        name: 'Auto Voucher Batch Insert',
                        component: AutoVoucherBatchInsert
                    },
                    {
                        path: 'update-samity-type',
                        name: 'Update Samity Type',
                        component: UpdateSamityType
                    },
                    {
                        path: 'get-invalid-repayment-amount',
                        name: 'Invalid Repayment Amount',
                        component: InvalidRepaymentAmount
                    },
                    {
                        path: 'update-invalid-transactions',
                        name: 'Update Invalid Transactions',
                        component: UpdateInvalidTransactions
                    },
                    {
                        path: 'update-notification-message',
                        name: 'Update Notification Message',
                        component: UpdateNotificationMessage
                    },
                    {
                        path: 'member-product-transfer',
                        name: 'Update Primary Product',
                        component: ChangeMemberPrimaryProductAdminAction
                    },
                    {
                        path: 'change-non-primary-loan-products',
                        name: 'Change Non Primary Loan Products',
                        component: ChangeNonPrimaryLoanProducts
                    },
                    {
                        path: 'product-change',
                        name: 'Product Change',
                        component: ProductChange
                    },
                    {
                        path: 'product-conversion',
                        name: 'Product Conversion',
                        component: ProductConversion
                    }
                ]
            },
          {
            path: 'daily-basis-admin-actions',
            redirect: 'admin-actions/index',
            children: [
              {
                path: 'closed-loan-interest-provision-update',
                name: 'closed-loan-interest-provision-update',
                component: CloseLoanInterest
              },
            ]
          },

            {
                path: 'help',
                redirect: '',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'faq',
                        name: 'FAQ',
                        component: FAQList
                    }

                ]
            },

            // Logo Full
            // {
            //     path: 'logo',
            //     redirect: '',
            //     name: 'Logo',
            //     component: {
            //         render(c) { return c('router-view') }
            //     },
            //     children: [
            //         {
            //             path: 'index',
            //             name: 'index',
            //             component: LogoIndex
            //         },
            //         {
            //             path: 'save',
            //             name: 'save',
            //             component: LogoAdd
            //         }
            //     ]
            // },
        ]
    }
];
