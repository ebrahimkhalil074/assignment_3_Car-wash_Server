"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const services_route_1 = require("../modules/services/services.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_route_1.userRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/services",
        route: services_route_1.servicesRoutes
    },
    {
        path: "/slots",
        route: slot_route_1.slotRoutes
    },
    {
        path: "/bookings",
        route: booking_route_1.bookingRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
