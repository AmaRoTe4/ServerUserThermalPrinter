EXAMPLE USE:

POST PETICION TO HOTS:PORT/API/PRINTER ->
HEADER
CLAVE: CLAVE
BODY (EXAMPLE):
{
"header": {
"title": "Nombre del Negocio",
"date": "2024-06-20 12:00:00"
},
"items": [
{ "name": "Producto 1", "quantity": 2, "price": 10.00 },
{ "name": "Producto 2", "quantity": 1, "price": 15.00 },
{ "name": "Producto 3", "quantity": 1, "price": 15.00 }
],
"footer": {
"total": 50.00
}
}

ANOTHER:
USE THE DEFAULT PRINTER TO PC
