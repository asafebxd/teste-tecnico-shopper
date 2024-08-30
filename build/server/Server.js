"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const PORT = process.env.PORT || 5050;
App_1.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
