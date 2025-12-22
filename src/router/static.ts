
// 可用路由
export  const staticRouter = [
    {
        // path: '/t-model',
        path: '/', // home page
        component: () => import('@/views/t-model/index.vue'),
        meta: { title: 'T形件全过程曲线计算器', unNeedAuth: true },
    },

]
