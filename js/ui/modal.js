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

function populateSpecies(species) {
  const select = document.getElementById("input-species");
  species.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });
}
