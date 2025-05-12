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
exports.blogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const blog_model_1 = require("./blog.model");
const appError_1 = __importDefault(require("../../Error/appError"));
const user_registration_model_1 = require("../useRegistration/user.registration.model");
const sendImageToCloudinary_1 = require("../../utility/sendImageToCloudinary");
const builder_1 = __importDefault(require("../../builder/builder"));
const searchParams = ['title', 'excerpt', 'category', 'slug'];
const createBlog = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const { id } = user;
    payload.id = id;
    const isExistUser = yield user_registration_model_1.UserModel.findById(id);
    if (!isExistUser) {
        return new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // @ts-expect-error user
    payload.authorId = isExistUser._id;
    if (file) {
        const path = file === null || file === void 0 ? void 0 : file.buffer;
        const name = isExistUser.firstName.replace(/\s+/g, '_').toLowerCase();
        const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, path));
        if (!secure_url) {
            return new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Image not found');
        }
        payload.imageUrl = secure_url;
    }
    const result = yield blog_model_1.BlogPost.create(payload);
    return result;
});
const myBlogIntoDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    console.log(user.id);
    const newUser = new builder_1.default(blog_model_1.BlogPost.find({ id: user.id }).populate('authorId'), query)
        .search(searchParams)
        .sort()
        .fields()
        .filter();
    const meta = yield newUser.countTotal();
    const data = yield newUser.modelQuery;
    return { meta, data };
});
const allBlogIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new builder_1.default(blog_model_1.BlogPost.find().populate('authorId'), query)
        .sort()
        .fields()
        .filter();
    const meta = yield newUser.countTotal();
    const data = yield newUser.modelQuery;
    return { meta, data };
});
const singleBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield blog_model_1.BlogPost.findById(id).populate('authorId');
    return newUser;
});
const deleteBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const newUser = yield blog_model_1.BlogPost.findByIdAndDelete(id);
    return newUser;
});
const updateBlog = (payload, file, user, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    console.log(payload, file, user, blogId);
    const isExistUser = yield user_registration_model_1.UserModel.findById(id);
    if (!isExistUser) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (file) {
        const path = file.buffer;
        const name = isExistUser.firstName.replace(/\s+/g, '_').toLowerCase();
        const { secure_url } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, path));
        if (!secure_url) {
            throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Image upload failed');
        }
        payload.imageUrl = secure_url;
    }
    const updatedBlog = yield blog_model_1.BlogPost.findByIdAndUpdate(blogId, payload, {
        new: true,
    });
    if (!updatedBlog) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    return updatedBlog;
});
exports.blogServices = {
    createBlog,
    myBlogIntoDB,
    allBlogIntoDB,
    singleBlogIntoDB,
    deleteBlogIntoDB,
    updateBlog,
};
