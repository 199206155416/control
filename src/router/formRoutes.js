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
    },
    {
        path: '/previewImage',
        name: 'previewImage',
        component: () => import( /* webpackChunkName: "previewImage" */ '@/views/form/previewImage.vue')
    },
]
export default formRoutes