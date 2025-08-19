document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("allResources");

  const basePath = window.location.hostname.includes("github.io") 
    ? "/new-life-foundation" 
    : "";

  fetch(`${basePath}/assets/resources.json`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      const resources = [];

      if (data.news && Array.isArray(data.news)) {
        data.news.forEach(item => resources.push({ ...item, type: "news" }));
      }
      if (data.worshipedia && Array.isArray(data.worshipedia)) {
        data.worshipedia.forEach(item => resources.push({ ...item, type: "worshipedia" }));
      }

      // urutkan berdasarkan tanggal (opsional)
      resources.sort((a, b) => new Date(b.date) - new Date(a.date));

      function getSummary(item) {
        if (item.summary) return item.summary;
        if (Array.isArray(item.content) && item.content.length > 0) {
          return item.content[0].substring(0, 100) + "...";
        }
        if (typeof item.content === "string") {
          return item.content.substring(0, 100) + "...";
        }
        return "";
      }

      resources.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            ${item.image ? `<img src="${item.image}" class="card-img-top" alt="${item.title}">` : ""}
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${getSummary(item)}</p>
              <a href="${item.type}.html?type=${item.type}&id=${item.id}" 
                 class="btn btn-outline-primary stretched-link">Baca Selengkapnya</a>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch(err => {
      container.innerHTML = `<p class="text-danger text-center">Gagal memuat resources.</p>`;
      console.error("Error load resources:", err);
    });
});
