/** External Modules */
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from "cors";
import * as helmet from  'helmet';

import  dbConnection from "./db/config";

import { userLogger } from './utils/logger';

// impor routes
import authRouter from "./routes/auth";

dotenv.config();

dbConnection();

/** App Variables */
if(!process.env.PORT) {
    process.exit(1);
}

const app = express();

const PORT:number = parseInt(process.env.PORT as string, 10) || 4000;


/** App Configuration */
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

/** Server Activation */

app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
});