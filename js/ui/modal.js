function showPetModal(pet = null) {
  document.getElementById("modal-title").textContent = pet ? "Editar mascota" : "Agregar mascota";
  document.getElementById("pet-id").value = pet ? pet.id : "";
  document.getElementById("input-name").value = pet ? pet.name : "";
  document.getElementById("input-breed").value = pet && pet.breed ? pet.breed : "";
  document.getElementById("input-age").value = pet && pet.age != null ? pet.age : "";
  document.getElementById("input-status").value = pet ? pet.status : "Available";
  document.getElementById("input-description").value = pet && pet.description ? pet.description : "";
  document.getElementById("input-image").value = "";
  document.getElementById("input-species").value = pet ? pet.species : "";

  const preview = document.getElementById("image-preview");
  const previewImg = document.getElementById("preview-img");
  if (pet && pet.image_url) {
    previewImg.src = pet.image_url;
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
    previewImg.src = "";
  }

  document.getElementById("modal-overlay").classList.remove("hidden");
  document.getElementById("input-name").focus();
}

function hidePetModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
}

function showDeleteModal(id, name) {
  document.getElementById("delete-name").textContent = name;
  document.getElementById("btn-delete-confirm").dataset.id = id;
  document.getElementById("delete-overlay").classList.remove("hidden");
}

function hideDeleteModal() {
  document.getElementById("delete-overlay").classList.add("hidden");
}

function showDetailModal(pet) {
  document.getElementById("detail-name").textContent = pet.name;
  document.getElementById("detail-content").innerHTML = `
    ${pet.image_url ? `<img class="detail-image" src="${escapeHtml(pet.image_url)}" alt="${escapeHtml(pet.name)}">` : ""}
    <div class="detail-info">
      <span class="status-badge ${pet.status === "Available" ? "status-available" : "status-adopted"}">
        ${pet.status === "Available" ? "Disponible" : "Adoptado"}
      </span>
      <div class="detail-row"><span class="detail-label">Especie</span>${escapeHtml(pet.species)}</div>
      ${pet.breed ? `<div class="detail-row"><span class="detail-label">Raza</span>${escapeHtml(pet.breed)}</div>` : ""}
      ${pet.age != null ? `<div class="detail-row"><span class="detail-label">Edad</span>${pet.age} año${pet.age !== 1 ? "s" : ""}</div>` : ""}
      ${pet.description ? `<div class="detail-row detail-description">${escapeHtml(pet.description)}</div>` : ""}
    </div>
  `;
  document.getElementById("detail-overlay").classList.remove("hidden");
}

function hideDetailModal() {
  document.getElementById("detail-overlay").classList.add("hidden");
}

function populateSpecies(species) {
  const select = document.getElementById("input-species");
  species.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });
}
