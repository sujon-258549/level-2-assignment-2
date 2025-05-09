"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const mongoose_1 = require("mongoose");
const blogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    id: { type: String, required: true },
    date: { type: String, required: true },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
exports.BlogPost = (0, mongoose_1.model)('BlogPost', blogPostSchema);
