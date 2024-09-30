"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const services_controller_1 = require("./services.controller");
const services_validation_1 = require("./services.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/create-services', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(services_validation_1.servicesValidations.createServicesValidationSchema), services_controller_1.servicesController.createServices);
// router.post('/slots',servicesController.createServices)
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), services_controller_1.servicesController.getAllServices);
router.get("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), services_controller_1.servicesController.getSingleServices);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), services_controller_1.servicesController.updateServices);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), services_controller_1.servicesController.deleteServices);
exports.servicesRoutes = router;
