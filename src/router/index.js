import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter(to, from, next) {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
            next();
            // ...
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
            import ("@/views/Cabinet.vue"),
        beforeEnter(to, from, next) {
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
            next();
            // ...
        },
        redirect: "/dashboard/mintnft",
        children: [{
            path: "/",
            name: "Index",
            component: () =>
                import ("@/views/Cabinet/Index.vue"),
            beforeEnter(to, from, next) {
                window.scrollTo({
                    top: 0,
                    behavior: "instant",
                });
                next();
                // ...
            },
            children: [{
                    path: "mintnft",
                    name: "MintNFT",
                    component: () =>
                        import ("../views/Cabinet/Tabs/MintNFT.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "mintlootbox",
                    name: "MintLootbox",
                    component: () =>
                        import ("../views/Cabinet/Tabs/MintLootbox.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "inventory",
                    name: "Inventory",
                    component: () =>
                        import ("../views/Cabinet/Tabs/Inventory.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "staking",
                    name: "Staking",
                    component: () =>
                        import ("../views/Cabinet/Tabs/Staking.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "yourstake",
                    name: "YourStake",
                    component: () =>
                        import ("../views/Cabinet/Tabs/YourStake.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "boosts",
                    name: "Boosts",
                    component: () =>
                        import ("../views/Cabinet/Tabs/Boosts.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "program",
                    name: "Program",
                    component: () =>
                        import ("../views/Cabinet/Tabs/Program.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "Portal",
                    name: "Portal",
                    component: () =>
                        import ("../views/Cabinet/Tabs/Portal.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
                {
                    path: "airdrop",
                    name: "Airdrop",
                    component: () =>
                        import ("../views/Cabinet/Tabs/Airdrop.vue"),
                    beforeEnter(to, from, next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        next();
                        // ...
                    },
                },
            ],
        }, ],
    },
    {
        path: "/:notFound(.*)",
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;