"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const routes_1 = require("../routes");
App_1.app.use(routes_1.router);
const PORT = process.env.PORT || 3000;
App_1.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
