import dotenv from "dotenv";
import vna from "../const/vna.js";

dotenv.config();

export default process.env.STATUS === vna.status_app.dev
  ? {
      HOST: "localhost",
      PORT: 3000,
      CLAVE_BACKEND: "1234",
    }
  : {
      HOST: process.env.HOST,
      PORT: process.env.PORT,
      CLAVE_BACKEND: process.env.CLAVE_BACKEND,
    };
