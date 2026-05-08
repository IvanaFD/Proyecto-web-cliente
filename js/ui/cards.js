function renderPets(pets) {
  const grid = document.getElementById("pets-grid");

  if (!pets.length) {
    grid.innerHTML = `<div class="empty-state"><p>No se encontraron mascotas</p></div>`;
    return;
  }

  grid.innerHTML = pets.map(pet => `
    <div class="pet-card">
      ${pet.image_url
        ? `<img class="pet-card-image" src="${escapeHtml(pet.image_url)}" alt="${escapeHtml(pet.name)}">`
        : `<div class="pet-card-placeholder">Sin imagen</div>`}
      <div class="pet-card-body">
        <div class="pet-card-name">${escapeHtml(pet.name)}</div>
        <div class="pet-card-meta">
          ${escapeHtml(pet.species)}${pet.breed ? ` &middot; ${escapeHtml(pet.breed)}` : ""}${pet.age != null ? ` &middot; ${pet.age} año${pet.age !== 1 ? "s" : ""}` : ""}
        </div>
        ${pet.description ? `<div class="pet-card-description">${escapeHtml(pet.description)}</div>` : ""}
        <span class="status-badge ${pet.status === "Available" ? "status-available" : "status-adopted"}">
          ${pet.status === "Available" ? "Disponible" : "Adoptado"}
        </span>
      </div>
      <div class="pet-card-actions">
        <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${pet.id}">Editar</button>
        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${pet.id}" data-name="${escapeHtml(pet.name)}">Eliminar</button>
      </div>
    </div>
  `).join("");
}
