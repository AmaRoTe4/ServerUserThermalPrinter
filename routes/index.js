import express from "express";
import vna from "../const/vna.js";
import { validarClave } from "../validations/index.js";
import {
  use_basic_printer,
  use_comanda_printer,
  use_check_printer,
  use_facture_printer
} from "../controllers/controllers.js";

export const router = express.Router();

router.get("/*", validarClave);
router.post("/*", validarClave);

router.post(vna.urls_use.test, (req, res) => {
  res.json({ status: true });
});

router.post(vna.urls_use.printer, use_basic_printer);
router.post(vna.urls_use.comanda, use_comanda_printer);
router.post(vna.urls_use.check, use_check_printer);
router.post(vna.urls_use.facture, use_facture_printer);