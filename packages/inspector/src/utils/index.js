"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabize = void 0;
const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
exports.kebabize = kebabize;
//# sourceMappingURL=index.js.map