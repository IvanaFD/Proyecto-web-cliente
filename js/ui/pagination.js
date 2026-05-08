function renderPagination(total, page, limit) {
  const totalPages = Math.ceil(total / limit);
  const pagination = document.getElementById("pagination");

  if (totalPages <= 1) {
    pagination.innerHTML = `<span class="pagination-info">${total} resultado${total !== 1 ? "s" : ""}</span>`;
    return;
  }

  let html = `<button class="pagination-btn" ${page <= 1 ? "disabled" : ""} data-page="${page - 1}">← Anterior</button>`;

  for (let i = 1; i <= totalPages; i++) {
    const nearCurrent = Math.abs(i - page) <= 1;
    const isEdge = i === 1 || i === totalPages;
    if (!nearCurrent && !isEdge) {
      if (i === 2 || i === totalPages - 1) html += `<span class="pagination-info">...</span>`;
      continue;
    }
    html += `<button class="pagination-btn ${i === page ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  html += `<button class="pagination-btn" ${page >= totalPages ? "disabled" : ""} data-page="${page + 1}">Siguiente →</button>`;
  html += `<span class="pagination-info">${total} resultado${total !== 1 ? "s" : ""}</span>`;

  pagination.innerHTML = html;
}
