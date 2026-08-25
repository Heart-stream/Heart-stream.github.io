const fallbackPoster =
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80";
const adminCode = "heart2026";
const defaultSettings = {
  siteName: "Heart-Stream",
  tagline: "Experience cinema",
  wine: "#6f0618",
  accent: "#e50922",
  gold: "#e7b64b",
  glow: 80,
  modules: {
    platforms: true,
    premiere: true,
    continue: true,
    top: true,
    catalog: true,
    reviews: true,
    decor: true,
  },
};

const starterCatalog = [
  {
    id: "red-orbit",
    title: "Red Orbit",
    type: "Film",
    year: 2026,
    genres: ["Science-fiction", "Thriller"],
    rating: 4.7,
    progress: 68,
    poster:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    description:
      "Une expedition isolee capte un signal impossible au bord d'une planete rouge. Plus l'equipage approche de la source, plus la mission ressemble a un piege ancien.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    featured: true,
  },
  {
    id: "maison-minuit",
    title: "Maison Minuit",
    type: "Serie",
    year: 2025,
    genres: ["Mystere", "Drame"],
    rating: 4.5,
    progress: 34,
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description:
      "Dans une demeure au bord du lac, une famille cache un secret qui recommence chaque nuit a la meme heure. Chaque episode ouvre une piece interdite.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    featured: true,
  },
  {
    id: "golden-ring",
    title: "Golden Ring",
    type: "Anime",
    year: 2024,
    genres: ["Aventure", "Fantastique"],
    rating: 4.8,
    progress: 0,
    poster:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    description:
      "Une apprentie cartographe traverse des cites suspendues pour retrouver un anneau capable de modifier les souvenirs et de reveiller les royaumes perdus.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    featured: true,
  },
  {
    id: "deep-city",
    title: "Deep City",
    type: "Documentaire",
    year: 2023,
    genres: ["Urbain", "Societe"],
    rating: 4.1,
    progress: 21,
    poster:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
    description:
      "Un regard nocturne sur les villes, leurs energies cachees, leurs artistes, leurs quartiers oublies et les histoires qui restent apres minuit.",
    playerUrl: "",
    trailerUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    featured: false,
  },
  {
    id: "blood-vault",
    title: "Blood Vault",
    type: "Film",
    year: 2026,
    genres: ["Action", "Crime"],
    rating: 4.3,
    progress: 0,
    poster:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    description:
      "Un braquage de luxe tourne a la chasse a l'homme quand le coffre vise contient une preuve capable de renverser une dynastie.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    featured: false,
  },
  {
    id: "velvet-code",
    title: "Velvet Code",
    type: "Serie",
    year: 2025,
    genres: ["Espionnage", "Thriller"],
    rating: 4.6,
    progress: 56,
    poster:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    description:
      "Une analyste decouvre un reseau dormant cache dans les archives d'un palace europeen. Les messages semblent dater du futur.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    featured: true,
  },
];

const state = {
  filter: "Tous",
  genre: "Tous",
  query: "",
  favoritesOnly: false,
  selectedId: starterCatalog[0].id,
  editingId: null,
  adminUnlocked: false,
};

const store = {
  get catalog() {
    const saved = JSON.parse(localStorage.getItem("heartStream.catalog") || "null");
    return saved && saved.length ? saved : starterCatalog;
  },
  set catalog(value) {
    localStorage.setItem("heartStream.catalog", JSON.stringify(value));
  },
  get favorites() {
    return JSON.parse(localStorage.getItem("heartStream.favorites") || "[]");
  },
  set favorites(value) {
    localStorage.setItem("heartStream.favorites", JSON.stringify(value));
  },
  get history() {
    return JSON.parse(localStorage.getItem("heartStream.history") || "[]");
  },
  set history(value) {
    localStorage.setItem("heartStream.history", JSON.stringify(value.slice(0, 8)));
  },
  reviewsFor(id) {
    return JSON.parse(localStorage.getItem(`heartStream.reviews.${id}`) || "[]");
  },
  saveReviews(id, reviews) {
    localStorage.setItem(`heartStream.reviews.${id}`, JSON.stringify(reviews));
  },
  get settings() {
    const saved = JSON.parse(localStorage.getItem("heartStream.settings") || "null");
    return mergeSettings(saved);
  },
  set settings(value) {
    localStorage.setItem("heartStream.settings", JSON.stringify(mergeSettings(value)));
  },
};

const els = {
  hero: document.querySelector("#hero"),
  heroImage: document.querySelector("#heroImage"),
  heroType: document.querySelector("#heroType"),
  heroYear: document.querySelector("#heroYear"),
  heroRating: document.querySelector("#heroRating"),
  heroTitle: document.querySelector("#heroTitle"),
  heroDescription: document.querySelector("#heroDescription"),
  heroWatch: document.querySelector("#heroWatch"),
  heroTrailer: document.querySelector("#heroTrailer"),
  heroFavorite: document.querySelector("#heroFavorite"),
  statTitles: document.querySelector("#statTitles"),
  statFavorites: document.querySelector("#statFavorites"),
  grid: document.querySelector("#catalogGrid"),
  topRail: document.querySelector("#topRail"),
  continueGrid: document.querySelector("#continueGrid"),
  continueSection: document.querySelector("#continueSection"),
  template: document.querySelector("#cardTemplate"),
  search: document.querySelector("#searchInput"),
  tabs: document.querySelectorAll(".tab"),
  favoritesOnly: document.querySelector("#favoritesOnly"),
  sort: document.querySelector("#sortSelect"),
  count: document.querySelector("#countLabel"),
  title: document.querySelector("#catalogTitle"),
  gridHeading: document.querySelector("#gridHeading"),
  genres: document.querySelector("#genreFilters"),
  drawer: document.querySelector("#detailDrawer"),
  detailBackdrop: document.querySelector("#detailBackdrop"),
  poster: document.querySelector("#detailPoster"),
  detailTitle: document.querySelector("#detailTitle"),
  detailMeta: document.querySelector("#detailMeta"),
  detailDescription: document.querySelector("#detailDescription"),
  detailGenres: document.querySelector("#detailGenres"),
  detailRating: document.querySelector("#detailRating"),
  favoriteBtn: document.querySelector("#favoriteBtn"),
  watchBtn: document.querySelector("#watchBtn"),
  trailerBtn: document.querySelector("#trailerBtn"),
  playerCard: document.querySelector("#playerCard"),
  playerFrame: document.querySelector("#playerFrame"),
  playerTitle: document.querySelector("#playerTitle"),
  closePlayer: document.querySelector("#closePlayer"),
  reviewForm: document.querySelector("#reviewForm"),
  memberName: document.querySelector("#memberName"),
  memberRating: document.querySelector("#memberRating"),
  memberComment: document.querySelector("#memberComment"),
  reviewsList: document.querySelector("#reviewsList"),
  reviewCount: document.querySelector("#reviewCount"),
  openAddPanel: document.querySelector("#openAddPanel"),
  openAdminPanel: document.querySelector("#openAdminPanel"),
  addPanelTitle: document.querySelector("#addPanelTitle"),
  addPanel: document.querySelector("#addPanel"),
  adminGate: document.querySelector("#adminGate"),
  adminGateForm: document.querySelector("#adminGateForm"),
  adminPassword: document.querySelector("#adminPassword"),
  gateError: document.querySelector("#gateError"),
  adminPanel: document.querySelector("#adminPanel"),
  adminTotal: document.querySelector("#adminTotal"),
  adminFavorites: document.querySelector("#adminFavorites"),
  adminReviews: document.querySelector("#adminReviews"),
  adminList: document.querySelector("#adminList"),
  adminJson: document.querySelector("#adminJson"),
  adminAddNew: document.querySelector("#adminAddNew"),
  adminExport: document.querySelector("#adminExport"),
  adminImport: document.querySelector("#adminImport"),
  adminReset: document.querySelector("#adminReset"),
  settingSiteName: document.querySelector("#settingSiteName"),
  settingTagline: document.querySelector("#settingTagline"),
  settingWine: document.querySelector("#settingWine"),
  settingAccent: document.querySelector("#settingAccent"),
  settingGold: document.querySelector("#settingGold"),
  settingGlow: document.querySelector("#settingGlow"),
  modulePlatforms: document.querySelector("#modulePlatforms"),
  modulePremiere: document.querySelector("#modulePremiere"),
  moduleContinue: document.querySelector("#moduleContinue"),
  moduleTop: document.querySelector("#moduleTop"),
  moduleCatalog: document.querySelector("#moduleCatalog"),
  moduleReviews: document.querySelector("#moduleReviews"),
  moduleDecor: document.querySelector("#moduleDecor"),
  adminSaveSettings: document.querySelector("#adminSaveSettings"),
  adminResetSettings: document.querySelector("#adminResetSettings"),
  adminExportSettings: document.querySelector("#adminExportSettings"),
  adminImportSettings: document.querySelector("#adminImportSettings"),
  settingsJson: document.querySelector("#settingsJson"),
  addForm: document.querySelector("#addContentForm"),
};

function mergeSettings(saved) {
  return {
    ...defaultSettings,
    ...(saved || {}),
    modules: {
      ...defaultSettings.modules,
      ...((saved && saved.modules) || {}),
    },
  };
}

function applySettings() {
  const settings = store.settings;
  const root = document.documentElement;
  const glow = Number(settings.glow) || 0;

  root.style.setProperty("--wine", settings.wine);
  root.style.setProperty("--wine-hot", settings.accent);
  root.style.setProperty("--gold", settings.gold);
  root.style.setProperty("--gold-soft", lightenColor(settings.gold, 34));
  root.style.setProperty("--admin-glow", `${Math.max(0, Math.min(glow, 100)) / 100}`);
  document.title = settings.siteName;

  document.querySelectorAll("[data-site-name]").forEach((node) => {
    node.textContent = settings.siteName;
  });
  document.querySelector(".brand-mark").textContent = settings.siteName.trim().charAt(0).toUpperCase() || "H";
  document.querySelector(".billboard-card strong").textContent = settings.tagline || defaultSettings.tagline;

  Object.entries(settings.modules).forEach(([module, enabled]) => {
    document.querySelectorAll(`[data-module="${module}"]`).forEach((node) => {
      node.hidden = !enabled;
    });
  });

  document.body.classList.toggle("decor-off", !settings.modules.decor);
}

function fillSettingsForm() {
  const settings = store.settings;
  els.settingSiteName.value = settings.siteName;
  els.settingTagline.value = settings.tagline;
  els.settingWine.value = settings.wine;
  els.settingAccent.value = settings.accent;
  els.settingGold.value = settings.gold;
  els.settingGlow.value = settings.glow;
  els.modulePlatforms.checked = settings.modules.platforms;
  els.modulePremiere.checked = settings.modules.premiere;
  els.moduleContinue.checked = settings.modules.continue;
  els.moduleTop.checked = settings.modules.top;
  els.moduleCatalog.checked = settings.modules.catalog;
  els.moduleReviews.checked = settings.modules.reviews;
  els.moduleDecor.checked = settings.modules.decor;
}

function readSettingsForm() {
  return mergeSettings({
    siteName: els.settingSiteName.value.trim() || defaultSettings.siteName,
    tagline: els.settingTagline.value.trim() || defaultSettings.tagline,
    wine: els.settingWine.value,
    accent: els.settingAccent.value,
    gold: els.settingGold.value,
    glow: Number(els.settingGlow.value),
    modules: {
      platforms: els.modulePlatforms.checked,
      premiere: els.modulePremiere.checked,
      continue: els.moduleContinue.checked,
      top: els.moduleTop.checked,
      catalog: els.moduleCatalog.checked,
      reviews: els.moduleReviews.checked,
      decor: els.moduleDecor.checked,
    },
  });
}

function saveSettings() {
  store.settings = readSettingsForm();
  applySettings();
  render();
}

function resetSettings() {
  if (!confirm("Remettre le design et les modules par defaut ?")) return;
  localStorage.removeItem("heartStream.settings");
  fillSettingsForm();
  applySettings();
  render();
}

function exportSettings() {
  els.settingsJson.value = JSON.stringify(store.settings, null, 2);
  els.settingsJson.focus();
  els.settingsJson.select();
}

function importSettings() {
  try {
    const imported = JSON.parse(els.settingsJson.value);
    store.settings = imported;
    fillSettingsForm();
    applySettings();
    render();
  } catch (error) {
    alert("Import impossible : colle une configuration JSON valide.");
  }
}

function lightenColor(hex, amount) {
  const clean = String(hex || defaultSettings.gold).replace("#", "");
  const number = parseInt(clean.length === 3 ? clean.replace(/(.)/g, "$1$1") : clean, 16);
  const r = Math.min(255, ((number >> 16) & 255) + amount);
  const g = Math.min(255, ((number >> 8) & 255) + amount);
  const b = Math.min(255, (number & 255) + amount);
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function selectedItem() {
  return store.catalog.find((item) => item.id === state.selectedId) || store.catalog[0];
}

function heroItem() {
  return store.catalog.find((item) => item.featured) || store.catalog[0];
}

function setHero(item = heroItem()) {
  state.selectedId = item.id;
  els.heroImage.src = item.poster || fallbackPoster;
  els.heroImage.alt = "";
  els.heroType.textContent = item.type;
  els.heroYear.textContent = item.year;
  els.heroRating.textContent = `${computedRating(item)}/5`;
  els.heroTitle.textContent = item.title;
  els.heroDescription.textContent = item.description;
  els.heroFavorite.textContent = store.favorites.includes(item.id) ? "Retirer favori" : "Ajouter favori";
}

function allGenres() {
  const genres = new Set(["Tous"]);
  store.catalog.forEach((item) => item.genres.forEach((genre) => genres.add(genre)));
  return [...genres];
}

function renderGenreFilters() {
  els.genres.innerHTML = "";
  allGenres().forEach((genre) => {
    const button = document.createElement("button");
    button.className = `tab ${state.genre === genre ? "is-active" : ""}`;
    button.textContent = genre;
    button.addEventListener("click", () => {
      state.genre = genre;
      render();
    });
    els.genres.appendChild(button);
  });
}

function filteredCatalog() {
  let items = [...store.catalog];
  const favorites = store.favorites;
  if (state.filter !== "Tous") items = items.filter((item) => item.type === state.filter);
  if (state.genre !== "Tous") items = items.filter((item) => item.genres.includes(state.genre));
  if (state.query) {
    const query = state.query.toLowerCase();
    items = items.filter((item) =>
      [item.title, item.type, item.year, item.description, ...item.genres]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }
  if (state.favoritesOnly) items = items.filter((item) => favorites.includes(item.id));

  const sortMode = els.sort.value;
  if (sortMode === "rating") items.sort((a, b) => Number(computedRating(b)) - Number(computedRating(a)));
  if (sortMode === "recent") items.sort((a, b) => b.year - a.year);
  if (sortMode === "title") items.sort((a, b) => a.title.localeCompare(b.title));
  if (sortMode === "featured") items.sort((a, b) => Number(b.featured) - Number(a.featured));
  return items;
}

function makeCard(item, compact = false) {
  const card = els.template.content.firstElementChild.cloneNode(true);
  const posterButton = card.querySelector(".poster-button");
  const img = card.querySelector(".poster");
  const type = card.querySelector(".type");
  const heart = card.querySelector(".heart");
  const title = card.querySelector("h3");
  const description = card.querySelector("p");
  const score = card.querySelector(".score");
  const favorites = store.favorites;

  img.src = item.poster || fallbackPoster;
  img.alt = `Affiche ${item.title}`;
  type.textContent = `${item.type} • ${item.year}`;
  score.textContent = computedRating(item);
  title.textContent = item.title;
  description.textContent = compact ? item.type : item.genres.join(", ");
  heart.classList.toggle("is-on", favorites.includes(item.id));
  heart.textContent = favorites.includes(item.id) ? "♥" : "♡";

  posterButton.addEventListener("click", () => openDetail(item.id));
  heart.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(item.id);
  });
  return card;
}

function renderRails(items) {
  els.topRail.innerHTML = "";
  [...store.catalog]
    .sort((a, b) => Number(computedRating(b)) - Number(computedRating(a)))
    .slice(0, 8)
    .forEach((item) => els.topRail.appendChild(makeCard(item, true)));

  const historyIds = store.history;
  const historyItems = historyIds
    .map((id) => store.catalog.find((item) => item.id === id))
    .filter(Boolean);
  const fallback = store.catalog.filter((item) => item.progress > 0).slice(0, 3);
  const rows = historyItems.length ? historyItems : fallback;
  els.continueSection.style.display = rows.length ? "" : "none";
  els.continueGrid.innerHTML = "";
  rows.forEach((item) => els.continueGrid.appendChild(makeContinueCard(item)));

  els.count.textContent = `${items.length} titre${items.length > 1 ? "s" : ""}`;
}

function makeContinueCard(item) {
  const card = document.createElement("button");
  card.className = "continue-card";
  card.innerHTML = `
    <img src="${item.poster || fallbackPoster}" alt="">
    <div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.type)} • ${escapeHtml(item.genres.join(", "))}</p>
      <div class="progress"><span style="width:${item.progress || 18}%"></span></div>
    </div>
  `;
  card.addEventListener("click", () => openDetail(item.id));
  return card;
}

function renderCatalog(items) {
  els.grid.innerHTML = "";
  items.forEach((item) => els.grid.appendChild(makeCard(item)));
}

function render() {
  renderGenreFilters();
  const items = filteredCatalog();
  els.title.textContent = state.favoritesOnly ? "Mes favoris" : state.filter === "Tous" ? "A decouvrir" : state.filter;
  els.gridHeading.textContent = state.query ? "Resultats de recherche" : "Tous les titres";
  els.statTitles.textContent = store.catalog.length;
  els.statFavorites.textContent = store.favorites.length;
  renderRails(items);
  renderCatalog(items);
  setHero(selectedItem() || heroItem());
}

function openDetail(id) {
  state.selectedId = id;
  const item = selectedItem();
  const favorites = store.favorites;
  const nextHistory = [id, ...store.history.filter((itemId) => itemId !== id)];
  store.history = nextHistory;

  els.detailBackdrop.src = item.poster || fallbackPoster;
  els.poster.src = item.poster || fallbackPoster;
  els.poster.alt = `Affiche ${item.title}`;
  els.detailMeta.textContent = `${item.type} • ${item.year} • ${item.rating}/5`;
  els.detailTitle.textContent = item.title;
  els.detailDescription.textContent = item.description;
  els.detailRating.textContent = `Note moyenne: ${computedRating(item)}/5`;
  els.detailGenres.innerHTML = item.genres.map((genre) => `<span class="chip">${escapeHtml(genre)}</span>`).join("");
  els.favoriteBtn.textContent = favorites.includes(item.id) ? "Retirer des favoris" : "Ajouter aux favoris";
  closePlayer();
  renderReviews();
  els.drawer.classList.add("is-open");
  els.drawer.setAttribute("aria-hidden", "false");
  render();
}

function closeDetail() {
  els.drawer.classList.remove("is-open");
  els.drawer.setAttribute("aria-hidden", "true");
  closePlayer();
}

function toggleFavorite(id) {
  const favorites = store.favorites;
  store.favorites = favorites.includes(id) ? favorites.filter((itemId) => itemId !== id) : [...favorites, id];
  if (els.drawer.classList.contains("is-open")) {
    const item = selectedItem();
    els.favoriteBtn.textContent = store.favorites.includes(item.id) ? "Retirer des favoris" : "Ajouter aux favoris";
  }
  render();
}

function embedUrl(url) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
  return url;
}

function openPlayer(mode) {
  const item = selectedItem();
  const url = mode === "trailer" ? item.trailerUrl : item.playerUrl;
  els.playerCard.classList.add("is-open");
  els.playerTitle.textContent = mode === "trailer" ? "Bande-annonce" : "Lecteur Abyss";

  if (!url) {
    els.playerFrame.innerHTML =
      "<p>Ajoute un lien Abyss ou une bande-annonce dans le panneau Ajouter.</p>";
    return;
  }

  const normalized = embedUrl(url);
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(normalized)) {
    els.playerFrame.innerHTML = `<video src="${normalized}" controls playsinline></video>`;
  } else {
    els.playerFrame.innerHTML = `<iframe src="${normalized}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
  }
  els.playerCard.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closePlayer() {
  els.playerCard.classList.remove("is-open");
  els.playerFrame.innerHTML = "<p>Le lecteur apparait ici.</p>";
}

function computedRating(item) {
  const reviews = store.reviewsFor(item.id);
  if (!reviews.length) return Number(item.rating).toFixed(1);
  const total = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
  return (total / reviews.length).toFixed(1);
}

function renderReviews() {
  const item = selectedItem();
  const reviews = store.reviewsFor(item.id);
  els.reviewCount.textContent = `${reviews.length} avis`;
  els.reviewsList.innerHTML = reviews.length
    ? reviews
        .map(
          (review) => `
            <article class="review">
              <strong>${escapeHtml(review.name)} • ${review.rating}/5</strong>
              <p>${escapeHtml(review.comment)}</p>
            </article>
          `
        )
        .join("")
    : `<article class="review"><strong>Aucun avis pour le moment</strong><p>Sois le premier membre a donner ton avis.</p></article>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function addContent(event) {
  event.preventDefault();
  const title = document.querySelector("#newTitle").value.trim();
  const genres = document
    .querySelector("#newGenres")
    .value.split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);

  const current = state.editingId ? store.catalog.find((item) => item.id === state.editingId) : null;
  const item = {
    id: current ? current.id : `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title,
    type: document.querySelector("#newType").value,
    year: current ? current.year : new Date().getFullYear(),
    genres: genres.length ? genres : ["Nouveau"],
    rating: current ? current.rating : 4.0,
    progress: current ? current.progress : 0,
    poster: document.querySelector("#newPoster").value.trim() || fallbackPoster,
    description: document.querySelector("#newDescription").value.trim(),
    playerUrl: document.querySelector("#newPlayer").value.trim(),
    trailerUrl: document.querySelector("#newTrailer").value.trim(),
    featured: current ? current.featured : false,
  };

  store.catalog = current
    ? store.catalog.map((entry) => (entry.id === current.id ? item : entry))
    : [item, ...store.catalog];
  state.editingId = null;
  els.addPanelTitle.textContent = "Ajouter un contenu";
  els.addForm.reset();
  closeAddPanel();
  render();
  renderAdminPanel();
  openDetail(item.id);
}

function openAddPanel() {
  if (!state.editingId) {
    els.addPanelTitle.textContent = "Ajouter un contenu";
  }
  els.addPanel.classList.add("is-open");
  els.addPanel.setAttribute("aria-hidden", "false");
}

function closeAddPanel() {
  state.editingId = null;
  els.addPanelTitle.textContent = "Ajouter un contenu";
  els.addPanel.classList.remove("is-open");
  els.addPanel.setAttribute("aria-hidden", "true");
}

function openAdminPanel() {
  if (!state.adminUnlocked) {
    openAdminGate();
    return;
  }
  renderAdminPanel();
  els.adminPanel.classList.add("is-open");
  els.adminPanel.setAttribute("aria-hidden", "false");
}

function closeAdminPanel() {
  els.adminPanel.classList.remove("is-open");
  els.adminPanel.setAttribute("aria-hidden", "true");
}

function openAdminGate() {
  els.gateError.textContent = "";
  els.adminPassword.value = "";
  els.adminGate.classList.add("is-open");
  els.adminGate.setAttribute("aria-hidden", "false");
  setTimeout(() => els.adminPassword.focus(), 60);
}

function closeAdminGate() {
  els.adminGate.classList.remove("is-open");
  els.adminGate.setAttribute("aria-hidden", "true");
}

function unlockAdmin(event) {
  event.preventDefault();
  if (els.adminPassword.value === adminCode) {
    state.adminUnlocked = true;
    closeAdminGate();
    openAdminPanel();
    return;
  }
  els.gateError.textContent = "Code incorrect.";
}

function renderAdminPanel() {
  const catalog = store.catalog;
  fillSettingsForm();
  els.adminTotal.textContent = catalog.length;
  els.adminFavorites.textContent = store.favorites.length;
  els.adminReviews.textContent = catalog.reduce((total, item) => total + store.reviewsFor(item.id).length, 0);
  els.adminList.innerHTML = catalog
    .map(
      (item) => `
        <article class="admin-row">
          <img src="${item.poster || fallbackPoster}" alt="">
          <div>
            <h3>${escapeHtml(item.title)} ${item.featured ? "• En avant" : ""}</h3>
            <p>${escapeHtml(item.type)} • ${item.year} • ${escapeHtml(item.genres.join(", "))}</p>
          </div>
          <div class="admin-actions">
            <button class="glass-button" data-admin-view="${item.id}">Voir</button>
            <button class="glass-button" data-admin-edit="${item.id}">Modifier</button>
            <button class="glass-button" data-admin-feature="${item.id}">Mettre en avant</button>
            <button class="danger-button" data-admin-delete="${item.id}">Supprimer</button>
          </div>
        </article>
      `
    )
    .join("");
}

function editItem(id) {
  const item = store.catalog.find((entry) => entry.id === id);
  if (!item) return;
  state.editingId = id;
  document.querySelector("#newTitle").value = item.title;
  document.querySelector("#newType").value = item.type;
  document.querySelector("#newGenres").value = item.genres.join(", ");
  document.querySelector("#newPoster").value = item.poster || "";
  document.querySelector("#newPlayer").value = item.playerUrl || "";
  document.querySelector("#newTrailer").value = item.trailerUrl || "";
  document.querySelector("#newDescription").value = item.description || "";
  els.addPanelTitle.textContent = `Modifier ${item.title}`;
  closeAdminPanel();
  openAddPanel();
}

function deleteItem(id) {
  const item = store.catalog.find((entry) => entry.id === id);
  if (!item) return;
  if (!confirm(`Supprimer "${item.title}" du catalogue ?`)) return;
  store.catalog = store.catalog.filter((entry) => entry.id !== id);
  store.favorites = store.favorites.filter((entryId) => entryId !== id);
  store.history = store.history.filter((entryId) => entryId !== id);
  if (state.selectedId === id) state.selectedId = store.catalog[0]?.id || starterCatalog[0].id;
  render();
  renderAdminPanel();
}

function setFeatured(id) {
  store.catalog = store.catalog.map((item) => ({ ...item, featured: item.id === id }));
  state.selectedId = id;
  render();
  renderAdminPanel();
}

function exportCatalog() {
  els.adminJson.value = JSON.stringify(store.catalog, null, 2);
  els.adminJson.focus();
  els.adminJson.select();
}

function importCatalog() {
  try {
    const next = JSON.parse(els.adminJson.value);
    if (!Array.isArray(next)) throw new Error("Format invalide");
    store.catalog = next.map((item, index) => ({
      id: item.id || `${Date.now()}-${index}`,
      title: item.title || "Sans titre",
      type: item.type || "Film",
      year: Number(item.year) || new Date().getFullYear(),
      genres: Array.isArray(item.genres) && item.genres.length ? item.genres : ["Nouveau"],
      rating: Number(item.rating) || 4,
      progress: Number(item.progress) || 0,
      poster: item.poster || fallbackPoster,
      description: item.description || "",
      playerUrl: item.playerUrl || "",
      trailerUrl: item.trailerUrl || "",
      featured: Boolean(item.featured),
    }));
    state.selectedId = store.catalog[0]?.id || starterCatalog[0].id;
    render();
    renderAdminPanel();
  } catch (error) {
    alert("Import impossible : colle un JSON de catalogue valide.");
  }
}

function resetCatalog() {
  if (!confirm("Remettre le catalogue de demo et effacer tes titres ajoutes ?")) return;
  localStorage.removeItem("heartStream.catalog");
  localStorage.removeItem("heartStream.favorites");
  localStorage.removeItem("heartStream.history");
  state.selectedId = starterCatalog[0].id;
  render();
  renderAdminPanel();
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    els.tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    state.filter = tab.dataset.filter;
    render();
  });
});

document.querySelector("[data-home]").addEventListener("click", () => {
  state.filter = "Tous";
  state.genre = "Tous";
  state.query = "";
  els.search.value = "";
  els.tabs.forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "Tous"));
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

els.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

els.favoritesOnly.addEventListener("click", () => {
  state.favoritesOnly = !state.favoritesOnly;
  els.favoritesOnly.classList.toggle("gold-button", state.favoritesOnly);
  render();
});

els.sort.addEventListener("change", render);
els.favoriteBtn.addEventListener("click", () => toggleFavorite(state.selectedId));
els.watchBtn.addEventListener("click", () => openPlayer("watch"));
els.trailerBtn.addEventListener("click", () => openPlayer("trailer"));
els.heroWatch.addEventListener("click", () => openDetail(state.selectedId));
els.heroTrailer.addEventListener("click", () => {
  openDetail(state.selectedId);
  openPlayer("trailer");
});
els.heroFavorite.addEventListener("click", () => toggleFavorite(state.selectedId));
els.closePlayer.addEventListener("click", closePlayer);
els.openAdminPanel.addEventListener("click", openAdminPanel);
els.adminGateForm.addEventListener("submit", unlockAdmin);
els.adminAddNew.addEventListener("click", () => {
  state.editingId = null;
  closeAdminPanel();
  openAddPanel();
});
els.adminExport.addEventListener("click", exportCatalog);
els.adminImport.addEventListener("click", importCatalog);
els.adminReset.addEventListener("click", resetCatalog);
els.adminSaveSettings.addEventListener("click", saveSettings);
els.adminResetSettings.addEventListener("click", resetSettings);
els.adminExportSettings.addEventListener("click", exportSettings);
els.adminImportSettings.addEventListener("click", importSettings);
[
  els.settingSiteName,
  els.settingTagline,
  els.settingWine,
  els.settingAccent,
  els.settingGold,
  els.settingGlow,
  els.modulePlatforms,
  els.modulePremiere,
  els.moduleContinue,
  els.moduleTop,
  els.moduleCatalog,
  els.moduleReviews,
  els.moduleDecor,
].forEach((control) => control.addEventListener("input", saveSettings));
els.adminList.addEventListener("click", (event) => {
  const viewId = event.target.dataset.adminView;
  const editId = event.target.dataset.adminEdit;
  const featureId = event.target.dataset.adminFeature;
  const deleteId = event.target.dataset.adminDelete;
  if (viewId) {
    closeAdminPanel();
    openDetail(viewId);
  }
  if (editId) editItem(editId);
  if (featureId) setFeatured(featureId);
  if (deleteId) deleteItem(deleteId);
});
els.addForm.addEventListener("submit", addContent);

els.reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = selectedItem();
  const reviews = store.reviewsFor(item.id);
  reviews.unshift({
    name: els.memberName.value.trim(),
    rating: els.memberRating.value,
    comment: els.memberComment.value.trim(),
  });
  store.saveReviews(item.id, reviews);
  els.reviewForm.reset();
  renderReviews();
  els.detailRating.textContent = `Note moyenne: ${computedRating(item)}/5`;
  render();
});

document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeDetail));
document.querySelectorAll("[data-add-close]").forEach((button) => button.addEventListener("click", closeAddPanel));
document.querySelectorAll("[data-admin-close]").forEach((button) => button.addEventListener("click", closeAdminPanel));
document.querySelectorAll("[data-gate-close]").forEach((button) => button.addEventListener("click", closeAdminGate));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetail();
    closeAddPanel();
    closeAdminPanel();
    closeAdminGate();
  }
});

applySettings();
fillSettingsForm();
setHero();
render();
