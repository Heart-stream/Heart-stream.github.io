const adminPassword = "heart2026";
const fallbackImage =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80";

const demoCatalog = [
  {
    id: "red-orbit",
    title: "Red Orbit",
    type: "Film",
    year: 2026,
    genres: ["Science-fiction", "Thriller"],
    rating: 4.7,
    progress: 68,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
    description:
      "Une expedition isolee capte un signal impossible au bord d'une planete rouge. Plus l'equipage approche de la source, plus la mission ressemble a un piege ancien.",
    player: "",
    trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    featured: true,
  },
  {
    id: "velvet-code",
    title: "Velvet Code",
    type: "Serie",
    year: 2025,
    genres: ["Espionnage", "Thriller"],
    rating: 4.6,
    progress: 42,
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=80",
    description:
      "Une analyste decouvre un reseau dormant cache dans les archives d'un palace europeen. Les messages semblent dater du futur.",
    player: "",
    trailer: "https://www.youtube.com/embed/ysz5S6PUM-U",
    featured: false,
  },
  {
    id: "golden-ring",
    title: "Golden Ring",
    type: "Anime",
    year: 2024,
    genres: ["Aventure", "Fantastique"],
    rating: 4.8,
    progress: 0,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80",
    description:
      "Une apprentie cartographe traverse des cites suspendues pour retrouver un anneau capable de modifier les souvenirs.",
    player: "",
    trailer: "https://www.youtube.com/embed/ScMzIvxBSi4",
    featured: false,
  },
  {
    id: "deep-city",
    title: "Deep City",
    type: "Doc",
    year: 2023,
    genres: ["Urbain", "Societe"],
    rating: 4.1,
    progress: 26,
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80",
    description:
      "Un regard nocturne sur les villes, leurs energies cachees, leurs artistes et les histoires qui restent apres minuit.",
    player: "",
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
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
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
    description:
      "Un braquage de luxe tourne a la chasse a l'homme quand le coffre vise contient une preuve capable de renverser une dynastie.",
    player: "",
    trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    featured: false,
  },
  {
    id: "maison-minuit",
    title: "Maison Minuit",
    type: "Serie",
    year: 2025,
    genres: ["Mystere", "Drame"],
    rating: 4.5,
    progress: 61,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    description:
      "Dans une demeure au bord du lac, une famille cache un secret qui recommence chaque nuit a la meme heure.",
    player: "",
    trailer: "https://www.youtube.com/embed/ysz5S6PUM-U",
    featured: false,
  },
];

const defaultSettings = {
  siteName: "Heart-Stream HS",
  logo: "HS",
  tagline: "Cinema prive premium",
  platforms: "Netflix,HBO,Canal+,Prime,Disney+,Apple TV,Anime,Docs",
  wine: "#5d0618",
  red: "#ff1738",
  gold: "#e1b447",
  decor: "squares",
  modules: {
    platforms: true,
    top10: true,
    continue: true,
    genres: true,
    catalog: true,
    reviews: true,
  },
};

const state = {
  selectedId: "red-orbit",
  heroIndex: 0,
  filter: "all",
  query: "",
  genre: "Tous",
  favoritesOnly: false,
  editId: null,
  adminTab: "site",
  adminUnlocked: false,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
  logoMark: $("#logoMark"),
  searchInput: $("#searchInput"),
  searchForm: $("#searchForm"),
  navLinks: $$(".nav-link[data-filter]"),
  exploreButton: $("#exploreButton"),
  megaMenu: $("#megaMenu"),
  megaGrid: $("#megaGrid"),
  heroImage: $("#heroImage"),
  heroBadges: $("#heroBadges"),
  heroTitle: $("#heroTitle"),
  heroDescription: $("#heroDescription"),
  heroProgress: $("#heroProgress"),
  heroPrev: $("#heroPrev"),
  heroNext: $("#heroNext"),
  heroWatch: $("#heroWatch"),
  heroInfo: $("#heroInfo"),
  heroFav: $("#heroFav"),
  tagline: $("#tagline"),
  statTitles: $("#statTitles"),
  statFavorites: $("#statFavorites"),
  statReviews: $("#statReviews"),
  favoriteButtonTop: $("#favoriteButtonTop"),
  platformGrid: $("#platformGrid"),
  topTen: $("#topTen"),
  continueRow: $("#continueRow"),
  genreWall: $("#genreWall"),
  catalogTitle: $("#catalogTitle"),
  genreSelect: $("#genreSelect"),
  sortSelect: $("#sortSelect"),
  posterGrid: $("#posterGrid"),
  posterTemplate: $("#posterTemplate"),
  detailDrawer: $("#detailDrawer"),
  detailImage: $("#detailImage"),
  detailPoster: $("#detailPoster"),
  detailMeta: $("#detailMeta"),
  detailTitle: $("#detailTitle"),
  detailDescription: $("#detailDescription"),
  detailTags: $("#detailTags"),
  watchNow: $("#watchNow"),
  watchTrailer: $("#watchTrailer"),
  toggleFavorite: $("#toggleFavorite"),
  playerBox: $("#playerBox"),
  playerTitle: $("#playerTitle"),
  playerFrame: $("#playerFrame"),
  closePlayer: $("#closePlayer"),
  reviewForm: $("#reviewForm"),
  reviewName: $("#reviewName"),
  reviewRating: $("#reviewRating"),
  reviewText: $("#reviewText"),
  reviewList: $("#reviewList"),
  adminOpen: $("#adminOpen"),
  adminGate: $("#adminGate"),
  gateForm: $("#gateForm"),
  adminCode: $("#adminCode"),
  gateError: $("#gateError"),
  adminPanel: $("#adminPanel"),
  adminTabs: $("#adminTabs"),
  adminSections: $$(".admin-section"),
  settingName: $("#settingName"),
  settingLogo: $("#settingLogo"),
  settingTagline: $("#settingTagline"),
  settingPlatforms: $("#settingPlatforms"),
  settingWine: $("#settingWine"),
  settingRed: $("#settingRed"),
  settingGold: $("#settingGold"),
  settingDecor: $("#settingDecor"),
  moduleGrid: $("#moduleGrid"),
  saveSettings: $("#saveSettings"),
  resetSettings: $("#resetSettings"),
  contentForm: $("#contentForm"),
  itemTitle: $("#itemTitle"),
  itemType: $("#itemType"),
  itemYear: $("#itemYear"),
  itemGenres: $("#itemGenres"),
  itemPoster: $("#itemPoster"),
  itemPlayer: $("#itemPlayer"),
  itemTrailer: $("#itemTrailer"),
  itemFeatured: $("#itemFeatured"),
  itemDescription: $("#itemDescription"),
  newItem: $("#newItem"),
  adminList: $("#adminList"),
  requestForm: $("#requestForm"),
  requestInput: $("#requestInput"),
  requestList: $("#requestList"),
  exportAll: $("#exportAll"),
  importAll: $("#importAll"),
  resetCatalog: $("#resetCatalog"),
  jsonBox: $("#jsonBox"),
  floatingRequest: $("#floatingRequest"),
};

const store = {
  get catalog() {
    const saved = readJson("hs.catalog", null);
    return Array.isArray(saved) && saved.length ? saved : demoCatalog;
  },
  set catalog(value) {
    localStorage.setItem("hs.catalog", JSON.stringify(value));
  },
  get settings() {
    return mergeSettings(readJson("hs.settings", null));
  },
  set settings(value) {
    localStorage.setItem("hs.settings", JSON.stringify(mergeSettings(value)));
  },
  get favorites() {
    return readJson("hs.favorites", []);
  },
  set favorites(value) {
    localStorage.setItem("hs.favorites", JSON.stringify(value));
  },
  get history() {
    return readJson("hs.history", []);
  },
  set history(value) {
    localStorage.setItem("hs.history", JSON.stringify(value.slice(0, 10)));
  },
  get requests() {
    return readJson("hs.requests", []);
  },
  set requests(value) {
    localStorage.setItem("hs.requests", JSON.stringify(value.slice(0, 50)));
  },
  reviews(id) {
    return readJson(`hs.reviews.${id}`, []);
  },
  saveReviews(id, value) {
    localStorage.setItem(`hs.reviews.${id}`, JSON.stringify(value));
  },
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function mergeSettings(settings) {
  return {
    ...defaultSettings,
    ...(settings || {}),
    siteName: settings?.siteName || defaultSettings.siteName,
    logo: settings?.logo || defaultSettings.logo,
    modules: { ...defaultSettings.modules, ...(settings?.modules || {}) },
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function catalog() {
  return store.catalog;
}

function selectedItem() {
  return catalog().find((item) => item.id === state.selectedId) || catalog()[0] || demoCatalog[0];
}

function heroItems() {
  const featured = catalog().filter((item) => item.featured);
  return (featured.length ? featured : catalog()).slice(0, 6);
}

function rating(item) {
  const reviews = store.reviews(item.id);
  if (!reviews.length) return Number(item.rating || 4).toFixed(1);
  return (reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length).toFixed(1);
}

function allGenres() {
  const genres = new Set(["Tous"]);
  catalog().forEach((item) => (item.genres || []).forEach((genre) => genres.add(genre)));
  return [...genres];
}

function filteredCatalog() {
  let items = [...catalog()];
  const query = state.query.toLowerCase().trim();
  if (state.filter !== "all") items = items.filter((item) => item.type === state.filter);
  if (state.genre !== "Tous") items = items.filter((item) => (item.genres || []).includes(state.genre));
  if (state.favoritesOnly) items = items.filter((item) => store.favorites.includes(item.id));
  if (query) {
    items = items.filter((item) =>
      [item.title, item.type, item.year, item.description, ...(item.genres || [])].join(" ").toLowerCase().includes(query)
    );
  }
  const sort = els.sortSelect.value;
  if (sort === "featured") items.sort((a, b) => Number(b.featured) - Number(a.featured));
  if (sort === "rating") items.sort((a, b) => Number(rating(b)) - Number(rating(a)));
  if (sort === "recent") items.sort((a, b) => Number(b.year) - Number(a.year));
  if (sort === "az") items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}

function applySettings() {
  const settings = store.settings;
  document.documentElement.style.setProperty("--wine", settings.wine);
  document.documentElement.style.setProperty("--red", settings.red);
  document.documentElement.style.setProperty("--gold", settings.gold);
  document.body.dataset.decor = settings.decor;
  document.title = settings.siteName;
  els.logoMark.textContent = settings.logo.toUpperCase();
  els.tagline.textContent = settings.tagline;
  $$("[data-site-name]").forEach((node) => {
    node.textContent = settings.siteName;
  });
  $$(".module[data-module]").forEach((node) => {
    node.hidden = settings.modules[node.dataset.module] === false;
  });
}

function renderHero() {
  const item = selectedItem();
  els.heroImage.src = item.image || fallbackImage;
  els.heroImage.alt = item.title;
  els.heroTitle.textContent = item.title;
  els.heroDescription.textContent = item.description || "";
  els.heroBadges.innerHTML = [item.type, item.year, `${rating(item)}/5`, ...(item.genres || []).slice(0, 2)]
    .map((value) => `<span>${escapeHtml(value)}</span>`)
    .join("");
  els.heroFav.textContent = store.favorites.includes(item.id) ? "Retirer favori" : "Favori";
  els.heroProgress.innerHTML = heroItems()
    .map((hero, index) => `<button class="${hero.id === item.id ? "is-active" : ""}" data-hero="${index}" type="button"></button>`)
    .join("");
}

function moveHero(step) {
  const items = heroItems();
  if (!items.length) return;
  state.heroIndex = (state.heroIndex + step + items.length) % items.length;
  state.selectedId = items[state.heroIndex].id;
  render();
}

function renderMega() {
  const cards = [
    ["Films", "Longs metrages", "Film"],
    ["Series", "Episodes et saisons", "Serie"],
    ["Animes", "Animation et manga", "Anime"],
    ["Top 10", "Classement populaire", "top"],
    ["Favoris", "Ta liste", "favorites"],
    ["Demandes", "Suggestions membres", "requests"],
    ["Lecteur", "Abyss integre par fiche", "player"],
    ["Admin", "Gestion globale", "admin"],
  ];
  els.megaGrid.innerHTML = cards
    .map(
      ([title, text, action]) => `
        <button class="mega-card" data-mega="${action}" type="button">
          <span>${escapeHtml(title)}</span>
          <strong>${escapeHtml(text)}</strong>
          <p>Ouvrir cette section</p>
        </button>
      `
    )
    .join("");
}

function renderPlatforms() {
  const names = store.settings.platforms.split(",").map((name) => name.trim()).filter(Boolean).slice(0, 8);
  els.platformGrid.innerHTML = names
    .map((name, index) => {
      const item = catalog()[index % catalog().length] || demoCatalog[0];
      return `
        <button class="platform-card" data-open="${item.id}" type="button">
          <span>${escapeHtml(name.slice(0, 2).toUpperCase())}</span>
          <strong>${escapeHtml(name)}</strong>
          <em>${escapeHtml(item.title)}</em>
        </button>
      `;
    })
    .join("");
}

function renderTopTen() {
  els.topTen.innerHTML = [...catalog()]
    .sort((a, b) => Number(rating(b)) - Number(rating(a)))
    .slice(0, 10)
    .map(
      (item, index) => `
        <button class="rank-card" data-open="${item.id}" type="button">
          <img src="${item.image || fallbackImage}" alt="">
          <b>${index + 1}</b>
          <strong>${escapeHtml(item.title)}</strong>
        </button>
      `
    )
    .join("");
}

function renderContinue() {
  const history = store.history.map((id) => catalog().find((item) => item.id === id)).filter(Boolean);
  const items = history.length ? history : catalog().filter((item) => Number(item.progress) > 0);
  els.continueRow.innerHTML = items
    .slice(0, 8)
    .map(
      (item) => `
        <button class="wide-card" data-open="${item.id}" type="button">
          <img src="${item.image || fallbackImage}" alt="">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.type)} • ${escapeHtml((item.genres || []).join(", "))}</p>
            <div class="bar"><span style="width:${Number(item.progress) || 22}%"></span></div>
          </div>
        </button>
      `
    )
    .join("");
}

function renderGenres() {
  const genres = allGenres().filter((genre) => genre !== "Tous").slice(0, 12);
  els.genreWall.innerHTML = genres
    .map((genre) => {
      const count = catalog().filter((item) => (item.genres || []).includes(genre)).length;
      return `
        <button class="genre-tile" data-genre="${escapeHtml(genre)}" type="button">
          <span>${count} titre${count > 1 ? "s" : ""}</span>
          <strong>${escapeHtml(genre)}</strong>
        </button>
      `;
    })
    .join("");
  els.genreSelect.innerHTML = allGenres()
    .map((genre) => `<option value="${escapeHtml(genre)}">${escapeHtml(genre)}</option>`)
    .join("");
  els.genreSelect.value = state.genre;
}

function createPoster(item) {
  const card = els.posterTemplate.content.firstElementChild.cloneNode(true);
  const button = card.querySelector(".poster-open");
  const image = card.querySelector("img");
  const meta = card.querySelector("p");
  const title = card.querySelector("h3");
  image.src = item.image || fallbackImage;
  image.alt = item.title;
  meta.textContent = `${item.type} • ${item.year} • ${rating(item)}/5`;
  title.textContent = item.title;
  button.addEventListener("click", () => openDetail(item.id));
  return card;
}

function renderCatalog() {
  const items = filteredCatalog();
  els.catalogTitle.textContent = state.favoritesOnly ? "Mes favoris" : state.query ? "Resultats" : "Tous les titres";
  els.posterGrid.innerHTML = "";
  items.forEach((item) => els.posterGrid.appendChild(createPoster(item)));
}

function renderStats() {
  els.statTitles.textContent = catalog().length;
  els.statFavorites.textContent = store.favorites.length;
  els.statReviews.textContent = catalog().reduce((total, item) => total + store.reviews(item.id).length, 0);
}

function render() {
  applySettings();
  renderHero();
  renderMega();
  renderPlatforms();
  renderTopTen();
  renderContinue();
  renderGenres();
  renderCatalog();
  renderStats();
}

function openDetail(id) {
  state.selectedId = id;
  const item = selectedItem();
  store.history = [id, ...store.history.filter((entry) => entry !== id)];
  els.detailImage.src = item.image || fallbackImage;
  els.detailPoster.src = item.image || fallbackImage;
  els.detailMeta.textContent = `${item.type} • ${item.year} • ${rating(item)}/5`;
  els.detailTitle.textContent = item.title;
  els.detailDescription.textContent = item.description || "";
  els.detailTags.innerHTML = (item.genres || []).map((genre) => `<span>${escapeHtml(genre)}</span>`).join("");
  els.toggleFavorite.textContent = store.favorites.includes(id) ? "Retirer favori" : "Ajouter favori";
  closePlayer();
  renderReviews();
  openPanel(els.detailDrawer);
  render();
}

function normalizeEmbed(url) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
  return url;
}

function openPlayer(mode) {
  const item = selectedItem();
  const url = normalizeEmbed(mode === "trailer" ? item.trailer : item.player);
  els.playerBox.classList.add("is-open");
  els.playerTitle.textContent = mode === "trailer" ? "Bande-annonce" : "Lecteur Abyss";
  if (!url) {
    els.playerFrame.textContent = "Ajoute un lien Abyss ou une bande-annonce dans le panel admin.";
  } else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    els.playerFrame.innerHTML = `<video src="${escapeHtml(url)}" controls playsinline></video>`;
  } else {
    els.playerFrame.innerHTML = `<iframe src="${escapeHtml(url)}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
  }
  els.playerBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closePlayer() {
  els.playerBox.classList.remove("is-open");
  els.playerFrame.textContent = "Ajoute un lien Abyss dans le panel admin.";
}

function toggleFavorite(id = state.selectedId) {
  store.favorites = store.favorites.includes(id)
    ? store.favorites.filter((itemId) => itemId !== id)
    : [...store.favorites, id];
  render();
  if (els.detailDrawer.classList.contains("is-open")) {
    els.toggleFavorite.textContent = store.favorites.includes(id) ? "Retirer favori" : "Ajouter favori";
  }
}

function renderReviews() {
  const item = selectedItem();
  const reviews = store.reviews(item.id);
  els.reviewList.innerHTML = reviews.length
    ? reviews
        .map(
          (review) => `
            <article class="review-item">
              <strong>${escapeHtml(review.name)} • ${review.rating}/5</strong>
              <p>${escapeHtml(review.text)}</p>
            </article>
          `
        )
        .join("")
    : `<article class="review-item"><strong>Aucun avis</strong><p>Le premier avis apparaitra ici.</p></article>`;
}

function openPanel(panel) {
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
}

function closePanel(panel) {
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
}

function openAdmin() {
  if (!state.adminUnlocked) {
    els.adminCode.value = "";
    els.gateError.textContent = "";
    openPanel(els.adminGate);
    return;
  }
  fillSettings();
  renderAdmin();
  openPanel(els.adminPanel);
}

function fillSettings() {
  const settings = store.settings;
  els.settingName.value = settings.siteName;
  els.settingLogo.value = settings.logo;
  els.settingTagline.value = settings.tagline;
  els.settingPlatforms.value = settings.platforms;
  els.settingWine.value = settings.wine;
  els.settingRed.value = settings.red;
  els.settingGold.value = settings.gold;
  els.settingDecor.value = settings.decor;
  els.moduleGrid.innerHTML = Object.entries(settings.modules)
    .map(
      ([key, value]) => `
        <label><input type="checkbox" data-module-key="${key}" ${value ? "checked" : ""}> ${moduleLabel(key)}</label>
      `
    )
    .join("");
}

function moduleLabel(key) {
  return {
    platforms: "Plateformes",
    top10: "Top 10",
    continue: "Continuer a regarder",
    genres: "Genres",
    catalog: "Catalogue",
    reviews: "Avis membres",
  }[key] || key;
}

function readSettings() {
  const modules = {};
  $$("[data-module-key]").forEach((input) => {
    modules[input.dataset.moduleKey] = input.checked;
  });
  return mergeSettings({
    siteName: els.settingName.value.trim(),
    logo: els.settingLogo.value.trim(),
    tagline: els.settingTagline.value.trim(),
    platforms: els.settingPlatforms.value.trim(),
    wine: els.settingWine.value,
    red: els.settingRed.value,
    gold: els.settingGold.value,
    decor: els.settingDecor.value,
    modules,
  });
}

function renderAdmin() {
  els.adminTabs.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === state.adminTab);
  });
  els.adminSections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.section === state.adminTab);
  });
  els.adminList.innerHTML = catalog()
    .map(
      (item) => `
        <article class="admin-row">
          <img src="${item.image || fallbackImage}" alt="">
          <div>
            <h3>${escapeHtml(item.title)}${item.featured ? " • Hero" : ""}</h3>
            <p>${escapeHtml(item.type)} • ${item.year} • ${escapeHtml((item.genres || []).join(", "))}</p>
          </div>
          <div class="admin-actions">
            <button class="glass-button" data-view="${item.id}" type="button">Voir</button>
            <button class="glass-button" data-edit="${item.id}" type="button">Modifier</button>
            <button class="glass-button" data-feature="${item.id}" type="button">Hero</button>
            <button class="danger-button" data-delete="${item.id}" type="button">Supprimer</button>
          </div>
        </article>
      `
    )
    .join("");
  els.requestList.innerHTML = store.requests.length
    ? store.requests
        .map((request) => `<article class="request-row"><strong>${escapeHtml(request.title)}</strong><span>${escapeHtml(request.date)}</span></article>`)
        .join("")
    : `<article class="request-row"><strong>Aucune demande</strong><span>Les demandes seront listees ici.</span></article>`;
}

function clearEditor() {
  state.editId = null;
  els.contentForm.reset();
  els.itemYear.value = new Date().getFullYear();
}

function fillEditor(id) {
  const item = catalog().find((entry) => entry.id === id);
  if (!item) return;
  state.editId = id;
  els.itemTitle.value = item.title;
  els.itemType.value = item.type;
  els.itemYear.value = item.year;
  els.itemGenres.value = (item.genres || []).join(", ");
  els.itemPoster.value = item.image || "";
  els.itemPlayer.value = item.player || "";
  els.itemTrailer.value = item.trailer || "";
  els.itemFeatured.checked = Boolean(item.featured);
  els.itemDescription.value = item.description || "";
  els.contentForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function saveItem(event) {
  event.preventDefault();
  const title = els.itemTitle.value.trim();
  const current = catalog().find((item) => item.id === state.editId);
  const item = {
    id: current?.id || `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title,
    type: els.itemType.value,
    year: Number(els.itemYear.value) || new Date().getFullYear(),
    genres: els.itemGenres.value.split(",").map((genre) => genre.trim()).filter(Boolean),
    rating: current?.rating || 4.2,
    progress: current?.progress || 0,
    image: els.itemPoster.value.trim() || fallbackImage,
    player: els.itemPlayer.value.trim(),
    trailer: els.itemTrailer.value.trim(),
    description: els.itemDescription.value.trim(),
    featured: els.itemFeatured.checked,
  };
  if (!item.genres.length) item.genres = ["Nouveau"];
  const next = current ? catalog().map((entry) => (entry.id === current.id ? item : entry)) : [item, ...catalog()];
  store.catalog = item.featured ? next.map((entry) => ({ ...entry, featured: entry.id === item.id })) : next;
  state.selectedId = item.id;
  clearEditor();
  render();
  renderAdmin();
}

function exportAll() {
  els.jsonBox.value = JSON.stringify(
    {
      settings: store.settings,
      catalog: store.catalog,
      favorites: store.favorites,
      requests: store.requests,
    },
    null,
    2
  );
  els.jsonBox.select();
}

function importAll() {
  try {
    const data = JSON.parse(els.jsonBox.value);
    if (Array.isArray(data.catalog)) store.catalog = data.catalog;
    if (data.settings) store.settings = data.settings;
    if (Array.isArray(data.favorites)) store.favorites = data.favorites;
    if (Array.isArray(data.requests)) store.requests = data.requests;
    state.selectedId = catalog()[0]?.id || demoCatalog[0].id;
    fillSettings();
    render();
    renderAdmin();
  } catch {
    alert("JSON invalide.");
  }
}

function deleteItem(id) {
  const item = catalog().find((entry) => entry.id === id);
  if (!item || !confirm(`Supprimer "${item.title}" ?`)) return;
  store.catalog = catalog().filter((entry) => entry.id !== id);
  store.favorites = store.favorites.filter((entry) => entry !== id);
  store.history = store.history.filter((entry) => entry !== id);
  state.selectedId = catalog()[0]?.id || demoCatalog[0].id;
  render();
  renderAdmin();
}

function bindEvents() {
  els.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      state.filter = link.dataset.filter;
      state.favoritesOnly = false;
      els.navLinks.forEach((node) => node.classList.toggle("is-active", node === link));
      render();
    });
  });
  els.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = els.searchInput.value;
    render();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  });
  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value;
    renderCatalog();
  });
  els.favoriteButtonTop.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    render();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  });
  els.exploreButton.addEventListener("click", () => {
    els.megaMenu.classList.toggle("is-open");
    els.megaMenu.setAttribute("aria-hidden", String(!els.megaMenu.classList.contains("is-open")));
  });
  els.megaGrid.addEventListener("click", (event) => {
    const action = event.target.closest("[data-mega]")?.dataset.mega;
    if (!action) return;
    els.megaMenu.classList.remove("is-open");
    if (["Film", "Serie", "Anime"].includes(action)) state.filter = action;
    if (action === "favorites") state.favoritesOnly = true;
    if (action === "admin") openAdmin();
    if (action === "requests") els.floatingRequest.click();
    if (action === "top") $(".top-ten")?.scrollIntoView({ behavior: "smooth" });
    if (["Film", "Serie", "Anime", "favorites"].includes(action)) $("#catalog").scrollIntoView({ behavior: "smooth" });
    render();
  });
  els.heroPrev.addEventListener("click", () => moveHero(-1));
  els.heroNext.addEventListener("click", () => moveHero(1));
  els.heroProgress.addEventListener("click", (event) => {
    const index = event.target.closest("[data-hero]")?.dataset.hero;
    if (index === undefined) return;
    const item = heroItems()[Number(index)];
    if (!item) return;
    state.heroIndex = Number(index);
    state.selectedId = item.id;
    render();
  });
  els.heroWatch.addEventListener("click", () => openDetail(state.selectedId));
  els.heroInfo.addEventListener("click", () => openDetail(state.selectedId));
  els.heroFav.addEventListener("click", () => toggleFavorite(state.selectedId));
  document.addEventListener("click", (event) => {
    const id = event.target.closest("[data-open]")?.dataset.open;
    if (id) openDetail(id);
  });
  els.genreWall.addEventListener("click", (event) => {
    const genre = event.target.closest("[data-genre]")?.dataset.genre;
    if (!genre) return;
    state.genre = genre;
    render();
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  });
  els.genreSelect.addEventListener("change", () => {
    state.genre = els.genreSelect.value;
    renderCatalog();
  });
  els.sortSelect.addEventListener("change", renderCatalog);
  $$("[data-close-detail]").forEach((button) => button.addEventListener("click", () => closePanel(els.detailDrawer)));
  els.watchNow.addEventListener("click", () => openPlayer("watch"));
  els.watchTrailer.addEventListener("click", () => openPlayer("trailer"));
  els.closePlayer.addEventListener("click", closePlayer);
  els.toggleFavorite.addEventListener("click", () => toggleFavorite(state.selectedId));
  els.reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = selectedItem();
    store.saveReviews(item.id, [
      { name: els.reviewName.value.trim(), rating: els.reviewRating.value, text: els.reviewText.value.trim() },
      ...store.reviews(item.id),
    ]);
    els.reviewForm.reset();
    renderReviews();
    renderStats();
  });
  els.adminOpen.addEventListener("click", openAdmin);
  $$("[data-close-admin-gate]").forEach((button) => button.addEventListener("click", () => closePanel(els.adminGate)));
  $$("[data-close-admin]").forEach((button) => button.addEventListener("click", () => closePanel(els.adminPanel)));
  els.gateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (els.adminCode.value !== adminPassword) {
      els.gateError.textContent = "Code incorrect.";
      return;
    }
    state.adminUnlocked = true;
    closePanel(els.adminGate);
    openAdmin();
  });
  els.adminTabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]")?.dataset.tab;
    if (!tab) return;
    state.adminTab = tab;
    renderAdmin();
  });
  els.saveSettings.addEventListener("click", () => {
    store.settings = readSettings();
    fillSettings();
    render();
    renderAdmin();
  });
  els.resetSettings.addEventListener("click", () => {
    if (!confirm("Remettre le design par defaut ?")) return;
    localStorage.removeItem("hs.settings");
    fillSettings();
    render();
    renderAdmin();
  });
  els.moduleGrid.addEventListener("input", () => {
    store.settings = readSettings();
    render();
    renderAdmin();
  });
  [els.settingName, els.settingLogo, els.settingTagline, els.settingPlatforms, els.settingWine, els.settingRed, els.settingGold, els.settingDecor].forEach(
    (input) => input.addEventListener("input", () => {
      store.settings = readSettings();
      render();
      renderAdmin();
    })
  );
  els.contentForm.addEventListener("submit", saveItem);
  els.newItem.addEventListener("click", clearEditor);
  els.adminList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.view) openDetail(button.dataset.view);
    if (button.dataset.edit) fillEditor(button.dataset.edit);
    if (button.dataset.feature) {
      store.catalog = catalog().map((item) => ({ ...item, featured: item.id === button.dataset.feature }));
      state.selectedId = button.dataset.feature;
      render();
      renderAdmin();
    }
    if (button.dataset.delete) deleteItem(button.dataset.delete);
  });
  els.requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    store.requests = [{ title: els.requestInput.value.trim(), date: new Date().toLocaleDateString("fr-FR") }, ...store.requests];
    els.requestForm.reset();
    renderAdmin();
  });
  els.floatingRequest.addEventListener("click", () => {
    if (!state.adminUnlocked) {
      store.requests = [{ title: "Nouvelle suggestion membre", date: new Date().toLocaleDateString("fr-FR") }, ...store.requests];
      alert("Suggestion ajoutee en exemple. Le detail se gere dans le panel admin.");
      return;
    }
    state.adminTab = "requests";
    openAdmin();
  });
  els.exportAll.addEventListener("click", exportAll);
  els.importAll.addEventListener("click", importAll);
  els.resetCatalog.addEventListener("click", () => {
    if (!confirm("Remettre le catalogue de demo ?")) return;
    localStorage.removeItem("hs.catalog");
    state.selectedId = demoCatalog[0].id;
    render();
    renderAdmin();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closePanel(els.detailDrawer);
    closePanel(els.adminGate);
    closePanel(els.adminPanel);
    els.megaMenu.classList.remove("is-open");
  });
}

bindEvents();
fillSettings();
state.selectedId = heroItems()[0]?.id || demoCatalog[0].id;
render();

setInterval(() => {
  if (document.hidden || els.detailDrawer.classList.contains("is-open") || els.adminPanel.classList.contains("is-open")) return;
  moveHero(1);
}, 7000);
