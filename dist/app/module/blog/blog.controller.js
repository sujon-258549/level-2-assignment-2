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
exports.blogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const blog_services_1 = require("./blog.services");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendSuccess_1 = require("../../utility/sendSuccess");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.createBlog(req.body, req.file, req.user);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Contact Blog successfully',
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_services_1.blogServices.updateBlog(req.body, req.file, req.user, id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Blog update successfully',
        data: result,
    });
}));
const allBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_services_1.blogServices.allBlogIntoDB(req.query);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'All Blog retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getMyBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    const user = req.user;
    const result = yield blog_services_1.blogServices.myBlogIntoDB(user, req.query);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'My Blog retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const singleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_services_1.blogServices.singleBlogIntoDB(id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Blog retrieved successfully',
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_services_1.blogServices.deleteBlogIntoDB(id);
    (0, sendSuccess_1.sendSuccess)(res, {
        statusCod: http_status_1.default.OK,
        success: true,
        message: 'Blog delete successfully',
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    getMyBlog,
    allBlog,
    singleBlog,
    deleteBlog,
    updateBlog,
};
