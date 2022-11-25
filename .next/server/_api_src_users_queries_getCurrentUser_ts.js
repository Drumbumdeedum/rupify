"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_api_src_users_queries_getCurrentUser_ts";
exports.ids = ["_api_src_users_queries_getCurrentUser_ts"];
exports.modules = {

/***/ "(api)/./src/users/queries/getCurrentUser.ts":
/*!*********************************************!*\
  !*** ./src/users/queries/getCurrentUser.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! db */ \"(api)/./db/index.ts\");\n\nconst __internal_rpcHandler = async function getCurrentUser(_ = null, { session  }) {\n    if (!session.userId) return null;\n    const user = await db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findFirst({\n        where: {\n            id: session.userId\n        },\n        select: {\n            id: true,\n            name: true,\n            email: true,\n            role: true\n        }\n    });\n    return user;\n};\n__internal_rpcHandler._resolverName = \"getCurrentUser\";\n__internal_rpcHandler._resolverType = \"query\";\n__internal_rpcHandler._routePath = \"/api/rpc/getCurrentUser\";\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__internal_rpcHandler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXNlcnMvcXVlcmllcy9nZXRDdXJyZW50VXNlci50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUNtQjtBQUVuQixNQUFNQyxxQkFBcUIsR0FBRyxlQUFlQyxjQUFjLENBQUNDLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRUMsT0FBTyxHQUFPLEVBQUU7SUFDdEYsSUFBSSxDQUFDQSxPQUFPLENBQUNDLE1BQU0sRUFBRSxPQUFPLElBQUk7SUFFaEMsTUFBTUMsSUFBSSxHQUFHLE1BQU1OLHlEQUFpQixDQUFDO1FBQ25DUSxLQUFLLEVBQUU7WUFBRUMsRUFBRSxFQUFFTCxPQUFPLENBQUNDLE1BQU07U0FBRTtRQUM3QkssTUFBTSxFQUFFO1lBQUVELEVBQUUsRUFBRSxJQUFJO1lBQUVFLElBQUksRUFBRSxJQUFJO1lBQUVDLEtBQUssRUFBRSxJQUFJO1lBQUVDLElBQUksRUFBRSxJQUFJO1NBQUU7S0FDMUQsQ0FBQztJQUVGLE9BQU9QLElBQUk7Q0FDWjtBQUdETCxxQkFBcUIsQ0FBQ2EsYUFBYSxHQUFHLGdCQUFnQjtBQUN0RGIscUJBQXFCLENBQUNjLGFBQWEsR0FBRyxPQUFPO0FBQzdDZCxxQkFBcUIsQ0FBQ2UsVUFBVSxHQUFHLHlCQUF5QjtBQUU1RCxpRUFBZWYscUJBQXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnVwaWZ5Ly4vc3JjL3VzZXJzL3F1ZXJpZXMvZ2V0Q3VycmVudFVzZXIudHM/YTMyYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdHggfSBmcm9tIFwiYmxpdHpcIlxuaW1wb3J0IGRiIGZyb20gXCJkYlwiXG5cbmNvbnN0IF9faW50ZXJuYWxfcnBjSGFuZGxlciA9IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKF8gPSBudWxsLCB7IHNlc3Npb24gfTogQ3R4KSB7XG4gIGlmICghc2Vzc2lvbi51c2VySWQpIHJldHVybiBudWxsXG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZEZpcnN0KHtcbiAgICB3aGVyZTogeyBpZDogc2Vzc2lvbi51c2VySWQgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIG5hbWU6IHRydWUsIGVtYWlsOiB0cnVlLCByb2xlOiB0cnVlIH0sXG4gIH0pXG5cbiAgcmV0dXJuIHVzZXJcbn1cblxuXG5fX2ludGVybmFsX3JwY0hhbmRsZXIuX3Jlc29sdmVyTmFtZSA9ICdnZXRDdXJyZW50VXNlcidcbl9faW50ZXJuYWxfcnBjSGFuZGxlci5fcmVzb2x2ZXJUeXBlID0gJ3F1ZXJ5J1xuX19pbnRlcm5hbF9ycGNIYW5kbGVyLl9yb3V0ZVBhdGggPSAnL2FwaS9ycGMvZ2V0Q3VycmVudFVzZXInXG5cbmV4cG9ydCBkZWZhdWx0IF9faW50ZXJuYWxfcnBjSGFuZGxlciJdLCJuYW1lcyI6WyJkYiIsIl9faW50ZXJuYWxfcnBjSGFuZGxlciIsImdldEN1cnJlbnRVc2VyIiwiXyIsInNlc3Npb24iLCJ1c2VySWQiLCJ1c2VyIiwiZmluZEZpcnN0Iiwid2hlcmUiLCJpZCIsInNlbGVjdCIsIm5hbWUiLCJlbWFpbCIsInJvbGUiLCJfcmVzb2x2ZXJOYW1lIiwiX3Jlc29sdmVyVHlwZSIsIl9yb3V0ZVBhdGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/users/queries/getCurrentUser.ts\n");

/***/ })

};
;