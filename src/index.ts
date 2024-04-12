import s3uploadRouter from "./routes/s3Routes";
import usersRouter from "./routes/userRoutes";
import uploadVideoRouter from "./routes/uploadRoutes";

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use(s3uploadRouter);
app.use(usersRouter);
app.use(uploadVideoRouter);
app.listen(port, () => {
  console.log('server is up on port ' + port)
})
