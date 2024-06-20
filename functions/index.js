export function generarConsultaUpdate(tabla, valores, condicion) {
  if (Object.keys(valores).length === 0) {
    throw new Error(
      "El objeto de valores está vacío. No hay datos para actualizar."
    );
  }

  const sets = Object.keys(valores)
    .map((campo) => `${campo} = ?`)
    .join(", ");

  const updateQuery = `UPDATE ${tabla} SET ${sets} WHERE ${condicion}`;
  const updateValues = Object.values(valores);

  return { query: updateQuery, values: updateValues };
}

export function generarConsultaUpdateMany(tabla, datos) {
  if (!Array.isArray(datos) || datos.length === 0) {
    console.error(
      "El segundo argumento debe ser un array no vacío de objetos."
    );
    return { query: "", values: [] };
  }

  let query = `UPDATE ${tabla} SET`;
  const values = [];

  datos.forEach((objeto, index) => {
    if (typeof objeto !== "object" || !objeto.id) {
      console.error(`El objeto en el índice ${index} no tiene un ID válido.`);
      return;
    }

    // Construir la parte SET de la consulta
    for (let clave in objeto) {
      if (clave !== "id") {
        query += ` ${clave} = CASE WHEN id = ? THEN ? ELSE ${clave} END,`;
        values.push(objeto.id, objeto[clave]);
      }
    }
  });

  // Eliminar la coma final y agregar un punto y coma
  query = query.slice(0, -1) + ";";

  return { query, values };
}

export function generarConsultaCreate(tabla, valores) {
  if (Object.keys(valores).length === 0) {
    throw new Error(
      "El objeto de valores está vacío. No hay datos para crear un nuevo registro."
    );
  }

  const columnas = Object.keys(valores).join(", ");
  const marcadores = Object.values(valores)
    .map(() => "?")
    .join(", ");

  const insertQuery = `INSERT INTO ${tabla} (${columnas}) VALUES (${marcadores})`;
  const insertValues = Object.values(valores);

  return { query: insertQuery, values: insertValues };
}

export function generarConsultaCreateMany(tabla, registros) {
  if (!registros || registros.length === 0) {
    throw new Error(
      "El array de registros está vacío. No hay datos para crear nuevos registros."
    );
  }

  const columnas = Object.keys(registros[0]).join(", ");
  const marcadores = registros
    .map(
      () =>
        `(${Object.values(registros[0])
          .map(() => "?")
          .join(", ")})`
    )
    .join(", ");

  const insertQuery = `INSERT INTO ${tabla} (${columnas}) VALUES ${marcadores}`;
  const insertValues = registros.flatMap((registro) => Object.values(registro));

  return { query: insertQuery, values: insertValues };
}

export function generarConsultaLowLogicMany(table, idsToUpdate) {
  if (!idsToUpdate || idsToUpdate.length === 0) {
    throw new Error(
      "El array de IDs está vacío. No hay datos para actualizar."
    );
  }

  const cases = idsToUpdate.map((id) => `WHEN id = ? THEN 0`).join(" ");

  const updateQuery = `UPDATE ${table} SET state = CASE ${cases} ELSE state END WHERE id IN (${idsToUpdate
    .map(() => "?")
    .join(", ")})`;

  return { query: updateQuery, values: [...idsToUpdate, ...idsToUpdate] };
}
