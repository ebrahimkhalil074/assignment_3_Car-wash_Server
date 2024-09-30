"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const services_constn_1 = require("./services.constn");
const services_model_1 = require("./services.model");
const createServicesIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistingServices = yield services_model_1.Services.findOne({ name: payload.name });
    if (isExistingServices) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'service is already existing');
    }
    const result = yield services_model_1.Services.create(payload);
    return result;
});
// const createSlotIntoDB=async(payload)=>{
//    console.log(payload);
//    const result =await Services.create(payload);
//    return result;
// }
const getAllServicesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const servicesQuery = new QueryBuilder_1.default(services_model_1.Services.find(), query).search(services_constn_1.servicesSerchableFields).filter().sort().paginate().fields();
    const result = yield servicesQuery.modelQuery;
    return result;
});
const getSingleServicesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_model_1.Services.findById(id);
    return result;
});
const updateServicesFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExsitServices = yield services_model_1.Services.findById(id);
    if (!isExsitServices) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'service not found');
    }
    const result = yield services_model_1.Services.findByIdAndUpdate(id, Object.assign({}, payload), {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteServicesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExsitServices = yield services_model_1.Services.findById(id);
    if (!isExsitServices) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'service not found');
    }
    const result = yield services_model_1.Services.findByIdAndUpdate(id, {
        isDeleted: true,
        new: true,
        runValidators: true,
    });
    return result;
});
exports.servicesServices = {
    createServicesIntoDB,
    // createSlotIntoDB,
    getAllServicesFromDB,
    getSingleServicesFromDB,
    updateServicesFromDB,
    deleteServicesFromDB,
};
