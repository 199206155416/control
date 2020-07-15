import formEdit from '@/views/form/formEdit'
const formRoutes = [
    {
        path: '/',
        name: 'formEdit',
        component: formEdit
    },
    {
        path: '/formShow',
        name: 'formShow',
        component: () => import( /* webpackChunkName: "formShow" */ '@/views/form/formShow.vue'),
        meta: {
            keepAlive: true,
            scrollTop: 0,
        }
    }
]
export default formRoutes