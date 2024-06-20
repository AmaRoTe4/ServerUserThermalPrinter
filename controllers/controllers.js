import escpos from "escpos";
import EscposUSB from "escpos-usb";

export const use_basic_printer = (req, res) => {
  const device = new EscposUSB();
  const printer = new escpos.Printer(device);
  const { header, items, footer } = req.body;

  try {
    device.open(() => {
      // Configuración inicial común
      printer.font("a").align("ct").style("normal");

      // Imprimir título y fecha con tamaño de letra reducido y fino
      printer
        .size(0.05, 0.05) // Tamaño más pequeño y fino
        .text(header.title)
        .text(header.date)
        .text("--------------------------");

      // Imprimir cada artículo con tamaño de letra reducido y fino
      items.forEach((item) => {
        printer
          .align("lt")
          .size(0.05, 0.05) // Tamaño más pequeño y fino
          .text(`${item.name} x${item.quantity} - $${item.price}`);
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
