"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_router_1 = require("../module/car/car.router");
const order_router_1 = require("../module/order/order.router");
const user_registation_router_1 = require("../module/useRegistration/user.registation.router");
const blog_router_1 = require("../module/blog/blog.router");
const shop_route_1 = require("../module/shop/shop.route");
const router = (0, express_1.Router)();
const allroute = [
    {
        path: '/cars',
        router: car_router_1.carRouter,
    },
    {
        path: '/orders',
        router: order_router_1.orderRouter,
    },
    {
        path: '/user',
        router: user_registation_router_1.userRegistrationRouter,
    },
    {
        path: '/blog',
        router: blog_router_1.blogRouter,
    },
    {
        path: '/shop',
        router: shop_route_1.shopRouters,
    },
];
allroute.forEach((route) => router.use(route.path, route.router));
exports.default = router;
