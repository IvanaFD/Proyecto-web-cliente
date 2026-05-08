const API_URL = "https://adopt-tracker-api.vercel.app";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) {
    if (res.status >= 500) throw new Error("Error del servidor. Intentá de nuevo.");
    throw new Error(data.error || "Error en la solicitud");
  }
  return data;
}

function getAllPets({ q = "", species = "", sort = "name", order = "desc", page = 1, limit = 10 } = {}) {
  const params = new URLSearchParams({ sort, order, page, limit });
  if (q) params.set("q", q);
  if (species) params.set("species", species);
  return request(`/pets?${params}`);
}

function getPetById(id) {
  return request(`/pets/${id}`);
}

function createPet(formData) {
  return request("/pets", { method: "POST", body: formData });
}

function updatePet(id, formData) {
  return request(`/pets/${id}`, { method: "PUT", body: formData });
}

function deletePet(id) {
  return request(`/pets/${id}`, { method: "DELETE" });
}

function getSpecies() {
  return request("/pets/species");
}
