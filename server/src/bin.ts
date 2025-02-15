import {connect} from "./config/db";
import app from "./server";

connect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
