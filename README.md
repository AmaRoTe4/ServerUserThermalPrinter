# Thermal Printer Server

This repository contains the code for a Node.js server that allows you to print using your default thermal printer through HTTP requests. The functionalities in this project leverage multiple technologies including Node.js, npm, escpos, and Windows.

## Installation

### Printer Setup

The installation steps will vary depending on the printer model. In this example, we use the Xprinter XP-58IIH:

1. **Install the Driver**:

   - Download the driver: [Xprinter XP-58IIH Driver](https://www.xprinterlatam.com/xp-58iih)
   - Watch the explanatory video: [Driver Installation Video](https://youtu.be/k7njIO8aFQU?si=WiUUuhSRqjKbDby1)

2. **Install Windows Executable**:

   - This executable enables certain interpretation functions.
   - Watch the explanatory video: [Windows Executable Installation Video](https://youtu.be/-W9ZnR1G4KI?si=MVatNQ-vmaqo-5SM)

3. **Configure Zadig**:

   - Download Zadig: [Zadig v2.0.1.160](https://sourceforge.net/projects/libwdi/files/zadig/zadig_v2.0.1.160.7z/download)
   - Open Zadig, go to Options, and select "List All Devices".
   - Choose the port where the printer is connected, set the driver to WinUSB v6.1.7600.16385, and configure it.

4. **Use the Repository**:
   - Follow the instructions below to run and use the server.

## Usage Example

### POST Request to Host:Port/api/printer

- **Headers**:

  - `key`: `your_key_here`

- **Body** (Example):
  ```json
  {
    "header": {
      "title": "Business Name",
      "date": "2024-06-20 12:00:00"
    },
    "items": [
      { "name": "Product 1", "quantity": 2, "price": 10.0 },
      { "name": "Product 2", "quantity": 1, "price": 15.0 },
      { "name": "Product 3", "quantity": 1, "price": 15.0 }
    ],
    "footer": {
      "total": 50.0
    }
  }
  ```

### Using the Default Printer on PC

Make sure your default printer is set up and configured correctly on your Windows PC. The server will use this printer for printing receipts.
