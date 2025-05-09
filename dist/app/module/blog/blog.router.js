"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../utility/auth"));
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const router = (0, express_1.Router)();
router.post('/create-blog', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, blog_controller_1.blogController.createBlog);
router.get('/', blog_controller_1.blogController.allBlog);
router.get('/my-blog', (0, auth_1.default)('admin'), blog_controller_1.blogController.getMyBlog);
router.get('/:id', blog_controller_1.blogController.singleBlog);
router.delete('/:id', (0, auth_1.default)('admin'), blog_controller_1.blogController.deleteBlog);
router.put('/:id', (0, auth_1.default)('admin'), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    console.log(req.user);
    req.body = JSON.parse(req.body.data);
    next();
}, blog_controller_1.blogController.updateBlog);
exports.blogRouter = router;
