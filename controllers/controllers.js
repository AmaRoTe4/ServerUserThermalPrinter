import escpos from "escpos";
import EscposUSB from "escpos-usb";

export const use_basic_printer = (req, res) => {
  const device = new EscposUSB();
  const printer = new escpos.Printer(device);
  const { header, items, footer } = req.body;

  try {
    device.open(() => {
      // Configuración inicial común
      printer.encode("UTF-8");

      printer.font("a").align("ct").style("normal");

      // Imprimir título y fecha con tamaño de letra reducido y fino
      printer
        .size(0.05, 0.05) // Tamaño más pequeño y fino
        .text(header.title)
        .text(header.date)
        .text(header.table)
        .text("--------------------------");

      // Imprimir cada artículo con tamaño de letra reducido y fino
      items.forEach((item) => {
        printer
          .align("lt")
          .size(0.05, 0.05) // Tamaño más pequeño y fino
          .text(`x${item.quantity} - ${item.name} - $${item.price}`);
      });

      // Imprimir total y mensaje de agradecimiento con tamaño de letra reducido y fino
      printer
        .text("--------------------------")
        .align("rt")
        .size(0.05, 0.05) // Tamaño más pequeño y fino
        .text(`Total: $${footer.total}`)
        .align("ct")
        .text(`Gracias por su compra!`)
        .cut()
        .close();

      res.json({ status: true });
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

// Printer comanda interna
export const use_comanda_printer = (req, res) => {
  const device = new EscposUSB();
  const printer = new escpos.Printer(device);
  const { header, items } = req.body;

  try {
    device.open(() => {
      printer.encode("UTF-8");
      // Configuración inicial común
      printer.font("a").align("ct").style("normal");

      printer
        .size(0.05, 0.05)
        .text(header.table)
        .text("________________________\n");

      items.forEach((item) => {
        printer
          .align("lt")
          .size(0.05, 0.05)
          .text(`x${item.quantity} ${item.name}`)
          .text(`Detalles: ${item.details}`)
          .text(`Mozo: ${item.mozo} - Hora: ${item.time}`)
          .text("__________________________ \n");
      });

      printer.text("\n").cut().close();

      res.json({ status: true });
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

// Printer cuenta client
export const use_check_printer = (req, res) => {
  const device = new EscposUSB();
  const printer = new escpos.Printer(device);
  const { header, items, footer } = req.body;

  try {
    device.open(() => {
      printer.encode("UTF-8");
      // Configuración inicial común
      printer.font("a").align("ct").style("normal");

      // Imprimir título y fecha con tamaño de letra reducido y fino
      printer
        .size(0.05, 0.05) // Tamaño más pequeño y fino
        .text(header.title)
        .text(header.address)
        .text(header.date)
        .text(header.table)
        .text("________________________");

      // Imprimir cada artículo con tamaño de letra reducido y fino
      items.forEach((item) => {
        printer
          .align("lt")
          .size(0.05, 0.05) // Tamaño más pequeño y fino
          .text(`${item.name}`)
          .align("rt")
          .text(`x${item.quantity} $${item.subtotal} _ $${item.total}`);
      });

      // Imprimir total y mensaje de agradecimiento con tamaño de letra reducido y fino
      printer.text("________________________ \n").align("rt").size(0.05, 0.05);

      footer.forEach((item) => {
        printer.text(item);
      });

      printer.align("ct").text(`\n¡Gracias por su visita!`).cut().close();

      res.json({ status: true });
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

// Printer facture client
export const use_facture_printer = (req, res) => {
  const device = new EscposUSB();
  const printer = new escpos.Printer(device);
  const { header, client, monto, footer } = req.body;

  try {
    device.open(() => {
      printer.encode("UTF-8");
      // Configuración inicial común
      printer.font("a").align("ct").style("normal");

      // Imprimir título y fecha con tamaño de letra reducido y fino
      printer
        .size(0.05, 0.05) // Tamaño más pequeño y fino
        .align("lt")
        .text(header.facture)
        .text(header.code)
        .text("_________________________")
        .text(header.people)
        .text(header.cuit)
        .text(header.address)
        .text(header.localidad)
        .text("_________________________ \n")
        .text(client)
        .text(" \n")
        .text(`Total: $${monto}`)
        .text("_________________________ \n")
        .text(`Fecha: ${footer.date}`)
        .text(`Nro.: ${footer.nro}`)
        .text(`CAE: ${footer.cae}`)
        .text(`Vto. CAE: ${footer.vto}`)
        .text("_________________________ \n")
        .cut()
        .close();

      res.json({ status: true });
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};
