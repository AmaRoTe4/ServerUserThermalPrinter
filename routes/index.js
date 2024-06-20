import express from "express";
import vna from "../const/vna.js";
import { validarClave } from "../validations/index.js";
import { use_basic_printer } from "../controllers/controllers.js";

export const router = express.Router();

router.get("/*", validarClave);
router.post("/*", validarClave);

router.post(vna.urls_use.test, (req, res) => {
  res.json({ status: true });
});

router.post(vna.urls_use.printer, use_basic_printer);
