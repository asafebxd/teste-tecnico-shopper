import { app } from "./server/App";

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000!")
);
