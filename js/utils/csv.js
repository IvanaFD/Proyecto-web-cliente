function exportToCSV(pets) {
  const headers = ["ID", "Nombre", "Especie", "Raza", "Edad", "Estado", "Descripción", "Imagen", "Creado"];

  const rows = pets.map(p => [
    p.id,
    csvCell(p.name),
    csvCell(p.species),
    csvCell(p.breed),
    p.age ?? "",
    p.status ?? "",
    csvCell(p.description),
    p.image_url ?? "",
    p.created_at ?? "",
  ]);

  const content = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "mascotas.csv";
  a.click();

  URL.revokeObjectURL(url);
}

function csvCell(value) {
  if (value == null) return "";
  return `"${String(value).replace(/"/g, '""')}"`;
}
