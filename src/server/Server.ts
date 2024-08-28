import { app } from "./App";
import { router } from "../routes";

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
