import config from "../config/config.js";

const { CLAVE_BACKEND } = config;

export const validarClave = (req, res, next) => {
  const clave = req.header("clave");

  if (clave && clave === CLAVE_BACKEND) {
    next();
  } else {
    res.status(401).send("Clave no válida");
  }
};
