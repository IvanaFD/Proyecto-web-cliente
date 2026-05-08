const state = {
  page: 1,
  limit: 10,
  sort: "name",
  order: "desc",
  q: "",
};

let searchTimeout = null;

async function loadPets() {
  const grid = document.getElementById("pets-grid");
  grid.innerHTML = `<div class="loading">Cargando...</div>`;
  try {
    const result = await getAllPets(state);
    renderPets(result.data);
    renderPagination(result.total, state.page, state.limit);
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><p>Error al cargar mascotas: ${escapeHtml(err.message)}</p></div>`;
  }
}

async function handleEdit(id) {
  try {
    const pet = await getPetById(id);
    showPetModal(pet);
  } catch {
    showToast("Error al cargar la mascota", "error");
  }
}

async function handleDelete(id) {
  const btn = document.getElementById("btn-delete-confirm");
  btn.disabled = true;
  btn.textContent = "Eliminando...";
  try {
    await deletePet(id);
    showToast("Mascota eliminada");
    hideDeleteModal();
    loadPets();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Eliminar";
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("pet-id").value;
  const formData = new FormData();
  formData.append("name", document.getElementById("input-name").value.trim());
  formData.append("species", document.getElementById("input-species").value);
  formData.append("breed", document.getElementById("input-breed").value.trim());
  formData.append("age", document.getElementById("input-age").value);
  formData.append("status", document.getElementById("input-status").value);
  formData.append("description", document.getElementById("input-description").value.trim());

  const imageFile = document.getElementById("input-image").files[0];
  if (imageFile) formData.append("image", imageFile);

  const btn = document.getElementById("btn-save");
  btn.disabled = true;
  btn.textContent = "Guardando...";

  try {
    if (id) {
      await updatePet(id, formData);
      showToast("Mascota actualizada");
    } else {
      await createPet(formData);
      showToast("Mascota creada");
    }
    hidePetModal();
    loadPets();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Guardar";
  }
}

async function handleExportCSV() {
  try {
    const result = await getAllPets({ ...state, page: 1, limit: 9999 });
    if (!result.data.length) {
      showToast("No hay datos para exportar", "error");
      return;
    }
    exportToCSV(result.data);
    showToast("CSV exportado correctamente");
  } catch {
    showToast("Error al exportar", "error");
  }
}

function setupEvents() {
  document.getElementById("btn-add").addEventListener("click", () => showPetModal());

  document.getElementById("search").addEventListener("input", e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.q = e.target.value.trim();
      state.page = 1;
      loadPets();
    }, 400);
  });

  document.getElementById("sort").addEventListener("change", e => {
    state.sort = e.target.value;
    state.page = 1;
    loadPets();
  });

  document.getElementById("order").addEventListener("change", e => {
    state.order = e.target.value;
    state.page = 1;
    loadPets();
  });

  document.getElementById("btn-csv").addEventListener("click", handleExportCSV);

  // Modal crear/editar
  document.getElementById("modal-close").addEventListener("click", hidePetModal);
  document.getElementById("btn-cancel").addEventListener("click", hidePetModal);
  document.getElementById("modal-overlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) hidePetModal();
  });
  document.getElementById("pet-form").addEventListener("submit", handleFormSubmit);

  // Preview de imagen
  document.getElementById("input-image").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById("preview-img").src = ev.target.result;
      document.getElementById("image-preview").classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });

  // Modal eliminar
  document.getElementById("btn-delete-cancel").addEventListener("click", hideDeleteModal);
  document.getElementById("delete-overlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) hideDeleteModal();
  });
  document.getElementById("btn-delete-confirm").addEventListener("click", e => {
    handleDelete(e.target.dataset.id);
  });

  // Delegación de eventos en tarjetas y paginación
  document.getElementById("pets-grid").addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    if (btn.dataset.action === "edit") handleEdit(btn.dataset.id);
    if (btn.dataset.action === "delete") showDeleteModal(btn.dataset.id, btn.dataset.name);
  });

  document.getElementById("pagination").addEventListener("click", e => {
    const btn = e.target.closest("[data-page]");
    if (!btn || btn.disabled) return;
    state.page = Number(btn.dataset.page);
    loadPets();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

async function init() {
  try {
    const species = await getSpecies();
    populateSpecies(species);
  } catch (err) {
    console.error("Error cargando especies:", err);
  }
  await loadPets();
  setupEvents();
}

document.addEventListener("DOMContentLoaded", init);
