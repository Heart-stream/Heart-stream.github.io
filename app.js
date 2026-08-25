const fallbackPoster =
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80";
const adminCode = "heart2026";

const defaultSettings = {
  siteName: "Heart-Stream HS",
  logo: "HS",
  tagline: "Cinema prive premium",
  topTitle: "Top Heart-Stream HS",
  catalogTitle: "Tous les titres",
  wine: "#650619",
  red: "#ff1734",
  gold: "#e7b64b",
  glow: 85,
  floatStyle: "cinema",
  modules: {
    portal: true,
    platforms: true,
    spotlight: true,
    requests: true,
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
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
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
    poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description:
      "Dans une demeure au bord du lac, une famille cache un secret qui recommence chaque nuit a la meme heure.",
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
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    description:
      "Une apprentie cartographe traverse des cites suspendues pour retrouver un anneau capable de modifier les souvenirs.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    featured: true,
  },
  {
    id: "deep-city",
    title: "Deep City",
    type: "Doc",
    year: 2023,
    genres: ["Urbain", "Societe"],
    rating: 4.1,
    progress: 21,
    poster: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
    description:
      "Un regard nocturne sur les villes, leurs energies cachees, leurs artistes et les histoires qui restent apres minuit.",
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
    poster: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
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
    poster: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    description:
      "Une analyste decouvre un reseau dormant cache dans les archives d'un palace europeen. Les messages semblent dater du futur.",
    playerUrl: "",
    trailerUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    featured: true,
  },
];

const state = {
  type: "Tous",
  genre: "Tous",
  query: "",
  favoritesOnly: false,
  selectedId: starterCatalog[0].id,
  editingId: null,
  adminUnlocked: false,
};

const store = {
  get catalog() {
    const saved = readJson("heartStream.catalog", null);
    return Array.isArray(saved) && saved.length ? saved : starterCatalog;
  },
  set catalog(value) {
    localStorage.setItem("heartStream.catalog", JSON.stringify(value));
  },
  get settings() {
    return mergeSettings(readJson("heartStream.settings", null));
  },
  set settings(value) {
    localStorage.setItem("heartStream.settings", JSON.stringify(mergeSettings(value)));
  },
  get favorites() {
    return readJson("heartStream.favorites", []);
  },
  set favorites(value) {
    localStorage.setItem("heartStream.favorites", JSON.stringify(value));
  },
  get history() {
    return readJson("heartStream.history", []);
  },
  set history(value) {
    localStorage.setItem("heartStream.history", JSON.stringify(value.slice(0, 8)));
  },
  get requests() {
    return readJson("heartStream.requests", []);
  },
  set requests(value) {
    localStorage.setItem("heartStream.requests", JSON.stringify(value.slice(0, 30)));
  },
  reviews(id) {
    return readJson(`heartStream.reviews.${id}`, []);
  },
  saveReviews(id, value) {
    localStorage.setItem(`heartStream.reviews.${id}`, JSON.stringify(value));
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
  brandLogo: $("#brandLogo"),
  searchInput: $("#searchInput"),
  favoritesToggle: $("#favoritesToggle"),
  adminButton: $("#adminButton"),
  navItems: $$(".nav-item"),
  heroImage: $("#heroImage"),
  heroMeta: $("#heroMeta"),
  heroTitle: $("#heroTitle"),
  heroText: $("#heroText"),
  heroTagline: $("#heroTagline"),
  heroWatch: $("#heroWatch"),
  heroTrailer: $("#heroTrailer"),
  heroFavorite: $("#heroFavorite"),
  statTitles: $("#statTitles"),
  currentView: $("#currentView"),
  genreChips: $("#genreChips"),
  sortSelect: $("#sortSelect"),
  portalTitle: $("#portalTitle"),
  portalText: $("#portalText"),
  portalMeta: $("#portalMeta"),
  portalWatch: $("#portalWatch"),
  portalTrailer: $("#portalTrailer"),
  quickTop: $("#quickTop"),
  spotlightGrid: $("#spotlightGrid"),
  requestForm: $("#requestForm"),
  requestInput: $("#requestInput"),
  continueSection: $("#continueSection"),
  continueGrid: $("#continueGrid"),
  topTitle: $("#topTitle"),
  countLabel: $("#countLabel"),
  topRail: $("#topRail"),
  catalogTitle: $("#catalogTitle"),
  catalogGrid: $("#catalogGrid"),
  cardTemplate: $("#cardTemplate"),
  details: $("#details"),
  detailBackdrop: $("#detailBackdrop"),
  detailPoster: $("#detailPoster"),
  detailMeta: $("#detailMeta"),
  detailTitle: $("#detailTitle"),
  detailText: $("#detailText"),
  detailGenres: $("#detailGenres"),
  watchButton: $("#watchButton"),
  trailerButton: $("#trailerButton"),
  favoriteButton: $("#favoriteButton"),
  playerBox: $("#playerBox"),
  playerTitle: $("#playerTitle"),
  playerFrame: $("#playerFrame"),
  closePlayer: $("#closePlayer"),
  reviewForm: $("#reviewForm"),
  reviewName: $("#reviewName"),
  reviewRating: $("#reviewRating"),
  reviewText: $("#reviewText"),
  reviewCount: $("#reviewCount"),
  reviewsList: $("#reviewsList"),
  adminGate: $("#adminGate"),
  gateForm: $("#gateForm"),
  adminPassword: $("#adminPassword"),
  gateError: $("#gateError"),
  adminPanel: $("#adminPanel"),
  adminTotal: $("#adminTotal"),
  adminFavorites: $("#adminFavorites"),
  adminReviews: $("#adminReviews"),
  adminRequests: $("#adminRequests"),
  settingName: $("#settingName"),
  settingLogo: $("#settingLogo"),
  settingTagline: $("#settingTagline"),
  settingTopTitle: $("#settingTopTitle"),
  settingCatalogTitle: $("#settingCatalogTitle"),
  settingFloatStyle: $("#settingFloatStyle"),
  settingWine: $("#settingWine"),
  settingRed: $("#settingRed"),
  settingGold: $("#settingGold"),
  settingGlow: $("#settingGlow"),
  modulePortal: $("#modulePortal"),
  modulePlatforms: $("#modulePlatforms"),
  moduleSpotlight: $("#moduleSpotlight"),
  moduleRequests: $("#moduleRequests"),
  moduleContinue: $("#moduleContinue"),
  moduleTop: $("#moduleTop"),
  moduleCatalog: $("#moduleCatalog"),
  moduleReviews: $("#moduleReviews"),
  moduleDecor: $("#moduleDecor"),
  saveSettings: $("#saveSettings"),
  resetSettings: $("#resetSettings"),
  exportSettings: $("#exportSettings"),
  importSettings: $("#importSettings"),
  settingsJson: $("#settingsJson"),
  newItem: $("#newItem"),
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
  adminList: $("#adminList"),
  exportCatalog: $("#exportCatalog"),
  importCatalog: $("#importCatalog"),
  resetCatalog: $("#resetCatalog"),
  catalogJson: $("#catalogJson"),
  adminRequestList: $("#adminRequestList"),
  clearRequests: $("#clearRequests"),
};

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function mergeSettings(settings) {
  return {
    ...defaultSettings,
    ...(settings || {}),
    siteName:
      settings?.siteName && settings.siteName !== "Heart-Stream" ? settings.siteName : defaultSettings.siteName,
    logo: settings?.logo && settings.logo !== "H" ? settings.logo : defaultSettings.logo,
    modules: {
      ...defaultSettings.modules,
      ...(settings?.modules || {}),
    },
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

function lighten(hex, amount) {
  const clean = String(hex || defaultSettings.gold).replace("#", "");
  const value = parseInt(clean.length === 3 ? clean.replace(/(.)/g, "$1$1") : clean, 16);
  const r = Math.min(255, ((value >> 16) & 255) + amount);
  const g = Math.min(255, ((value >> 8) & 255) + amount);
  const b = Math.min(255, (value & 255) + amount);
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

function selectedItem() {
  return store.catalog.find((item) => item.id === state.selectedId) || store.catalog[0] || starterCatalog[0];
}

function featuredItem() {
  return store.catalog.find((item) => item.featured) || store.catalog[0] || starterCatalog[0];
}

function computedRating(item) {
  const reviews = store.reviews(item.id);
  if (!reviews.length) return Number(item.rating || 4).toFixed(1);
  return (reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length).toFixed(1);
}

function applySettings() {
  const settings = store.settings;
  const root = document.documentElement;
  root.style.setProperty("--wine", settings.wine);
  root.style.setProperty("--red", settings.red);
  root.style.setProperty("--gold", settings.gold);
  root.style.setProperty("--gold-soft", lighten(settings.gold, 38));
  root.style.setProperty("--glow", String(Math.max(0, Math.min(Number(settings.glow) || 0, 100)) / 100));
  document.body.classList.toggle("decor-off", !settings.modules.decor);
  document.body.dataset.floatStyle = settings.floatStyle;
  document.title = settings.siteName;
  els.brandLogo.textContent = settings.logo.toUpperCase();
  $$("[data-site-name]").forEach((node) => {
    node.textContent = settings.siteName;
  });
  els.heroTagline.textContent = settings.tagline;
  els.topTitle.textContent = settings.topTitle;
  $$(".module").forEach((node) => {
    const moduleName = node.dataset.module;
    if (!moduleName) return;
    node.hidden = settings.modules[moduleName] === false;
  });
}

function fillSettingsForm() {
  const settings = store.settings;
  els.settingName.value = settings.siteName;
  els.settingLogo.value = settings.logo;
  els.settingTagline.value = settings.tagline;
  els.settingTopTitle.value = settings.topTitle;
  els.settingCatalogTitle.value = settings.catalogTitle;
  els.settingFloatStyle.value = settings.floatStyle;
  els.settingWine.value = settings.wine;
  els.settingRed.value = settings.red;
  els.settingGold.value = settings.gold;
  els.settingGlow.value = settings.glow;
  els.modulePortal.checked = settings.modules.portal;
  els.modulePlatforms.checked = settings.modules.platforms;
  els.moduleSpotlight.checked = settings.modules.spotlight;
  els.moduleRequests.checked = settings.modules.requests;
  els.moduleContinue.checked = settings.modules.continue;
  els.moduleTop.checked = settings.modules.top;
  els.moduleCatalog.checked = settings.modules.catalog;
  els.moduleReviews.checked = settings.modules.reviews;
  els.moduleDecor.checked = settings.modules.decor;
}

function readSettingsForm() {
  return mergeSettings({
    siteName: els.settingName.value.trim() || defaultSettings.siteName,
    logo: els.settingLogo.value.trim() || defaultSettings.logo,
    tagline: els.settingTagline.value.trim() || defaultSettings.tagline,
    topTitle: els.settingTopTitle.value.trim() || defaultSettings.topTitle,
    catalogTitle: els.settingCatalogTitle.value.trim() || defaultSettings.catalogTitle,
    floatStyle: els.settingFloatStyle.value,
    wine: els.settingWine.value,
    red: els.settingRed.value,
    gold: els.settingGold.value,
    glow: Number(els.settingGlow.value),
    modules: {
      portal: els.modulePortal.checked,
      platforms: els.modulePlatforms.checked,
      spotlight: els.moduleSpotlight.checked,
      requests: els.moduleRequests.checked,
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
  if (!confirm("Remettre l'apparence par defaut ?")) return;
  localStorage.removeItem("heartStream.settings");
  fillSettingsForm();
  applySettings();
  render();
}

function allGenres() {
  const genres = new Set(["Tous"]);
  store.catalog.forEach((item) => (item.genres || []).forEach((genre) => genres.add(genre)));
  return [...genres];
}

function filteredCatalog() {
  let items = [...store.catalog];
  const query = state.query.toLowerCase().trim();
  if (state.type !== "Tous") items = items.filter((item) => item.type === state.type);
  if (state.genre !== "Tous") items = items.filter((item) => (item.genres || []).includes(state.genre));
  if (query) {
    items = items.filter((item) =>
      [item.title, item.type, item.year, item.description, ...(item.genres || [])]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }
  if (state.favoritesOnly) items = items.filter((item) => store.favorites.includes(item.id));
  const sort = els.sortSelect.value;
  if (sort === "featured") items.sort((a, b) => Number(b.featured) - Number(a.featured));
  if (sort === "rating") items.sort((a, b) => Number(computedRating(b)) - Number(computedRating(a)));
  if (sort === "recent") items.sort((a, b) => Number(b.year) - Number(a.year));
  if (sort === "title") items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}

function renderHero(item = selectedItem()) {
  els.heroImage.src = item.poster || fallbackPoster;
  els.heroTitle.textContent = item.title;
  els.heroText.textContent = item.description;
  els.heroMeta.innerHTML = [item.type, item.year, `${computedRating(item)}/5`, ...(item.genres || []).slice(0, 2)]
    .map((value) => `<span>${escapeHtml(value)}</span>`)
    .join("");
  els.heroFavorite.textContent = store.favorites.includes(item.id) ? "Retirer favori" : "Ajouter favori";
}

function renderGenreChips() {
  els.genreChips.innerHTML = allGenres()
    .map((genre) => `<button class="chip ${state.genre === genre ? "is-active" : ""}" data-genre="${escapeHtml(genre)}">${escapeHtml(genre)}</button>`)
    .join("");
}

function makeCard(item) {
  const card = els.cardTemplate.content.firstElementChild.cloneNode(true);
  const posterButton = card.querySelector(".poster-button");
  const img = card.querySelector(".poster-img");
  const play = card.querySelector(".poster-play");
  const score = card.querySelector(".poster-score");
  const type = card.querySelector(".poster-type");
  const title = card.querySelector("h3");
  const heart = card.querySelector(".heart-button");
  img.src = item.poster || fallbackPoster;
  img.alt = `Affiche ${item.title}`;
  play.textContent = "Regarder";
  score.textContent = computedRating(item);
  type.textContent = `${item.type} • ${item.year}`;
  title.textContent = item.title;
  heart.textContent = store.favorites.includes(item.id) ? "♥" : "+";
  heart.classList.toggle("is-on", store.favorites.includes(item.id));
  posterButton.addEventListener("click", () => openDetails(item.id));
  heart.addEventListener("click", () => toggleFavorite(item.id));
  return card;
}

function renderPortal() {
  const item = selectedItem();
  els.portalTitle.textContent = item.title;
  els.portalText.textContent = item.description;
  els.portalMeta.innerHTML = [item.type, item.year, `${computedRating(item)}/5`, ...(item.genres || []).slice(0, 3)]
    .map((value) => `<span>${escapeHtml(value)}</span>`)
    .join("");
  els.quickTop.innerHTML = [...store.catalog]
    .sort((a, b) => Number(computedRating(b)) - Number(computedRating(a)))
    .slice(0, 5)
    .map(
      (item, index) => `
        <button class="quick-item" data-open="${item.id}" type="button">
          <strong>${index + 1}</strong>
          <span>${escapeHtml(item.title)}</span>
          <em>${computedRating(item)}</em>
        </button>
      `
    )
    .join("");
}

function renderSpotlight() {
  els.spotlightGrid.innerHTML = [...store.catalog]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.year) - Number(a.year))
    .slice(0, 5)
    .map(
      (item) => `
        <button class="spotlight-card" data-open="${item.id}" type="button">
          <img src="${item.poster || fallbackPoster}" alt="">
          <div>
            <span>${escapeHtml(item.type)} • ${item.year}</span>
            <strong>${escapeHtml(item.title)}</strong>
          </div>
        </button>
      `
    )
    .join("");
}

function renderRails(items) {
  els.topRail.innerHTML = "";
  [...store.catalog]
    .sort((a, b) => Number(computedRating(b)) - Number(computedRating(a)))
    .slice(0, 10)
    .forEach((item) => els.topRail.appendChild(makeCard(item)));

  const historyItems = store.history.map((id) => store.catalog.find((item) => item.id === id)).filter(Boolean);
  const fallback = store.catalog.filter((item) => item.progress > 0).slice(0, 4);
  const rows = historyItems.length ? historyItems : fallback;
  els.continueSection.hidden = !rows.length || store.settings.modules.continue === false;
  els.continueGrid.innerHTML = rows
    .map(
      (item) => `
        <button class="continue-card" data-open="${item.id}" type="button">
          <img src="${item.poster || fallbackPoster}" alt="">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.type)} • ${escapeHtml((item.genres || []).join(", "))}</p>
            <div class="progress"><span style="width:${Number(item.progress) || 18}%"></span></div>
          </div>
        </button>
      `
    )
    .join("");

  els.countLabel.textContent = `${items.length} titre${items.length > 1 ? "s" : ""}`;
}

function renderCatalog(items) {
  els.catalogGrid.innerHTML = "";
  items.forEach((item) => els.catalogGrid.appendChild(makeCard(item)));
}

function render() {
  const settings = store.settings;
  applySettings();
  renderGenreChips();
  const items = filteredCatalog();
  els.currentView.textContent = state.favoritesOnly ? "Mes favoris" : state.type === "Tous" ? "A decouvrir" : state.type;
  els.catalogTitle.textContent = state.query ? "Resultats de recherche" : settings.catalogTitle;
  els.statTitles.textContent = store.catalog.length;
  renderHero(selectedItem());
  renderPortal();
  renderSpotlight();
  renderRails(items);
  renderCatalog(items);
}

function openDetails(id) {
  state.selectedId = id;
  const item = selectedItem();
  store.history = [id, ...store.history.filter((entry) => entry !== id)];
  els.detailBackdrop.src = item.poster || fallbackPoster;
  els.detailPoster.src = item.poster || fallbackPoster;
  els.detailPoster.alt = `Affiche ${item.title}`;
  els.detailMeta.textContent = `${item.type} • ${item.year} • ${computedRating(item)}/5`;
  els.detailTitle.textContent = item.title;
  els.detailText.textContent = item.description;
  els.detailGenres.innerHTML = (item.genres || []).map((genre) => `<span>${escapeHtml(genre)}</span>`).join("");
  els.favoriteButton.textContent = store.favorites.includes(id) ? "Retirer favori" : "Ajouter favori";
  closePlayer();
  renderReviews();
  openDrawer(els.details);
  render();
}

function closeDetails() {
  closeDrawer(els.details);
  closePlayer();
}

function toggleFavorite(id) {
  store.favorites = store.favorites.includes(id)
    ? store.favorites.filter((itemId) => itemId !== id)
    : [...store.favorites, id];
  render();
  if (els.details.classList.contains("is-open")) {
    els.favoriteButton.textContent = store.favorites.includes(state.selectedId) ? "Retirer favori" : "Ajouter favori";
  }
}

function normalizeEmbed(url) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
  return url;
}

function openPlayer(mode) {
  const item = selectedItem();
  const url = normalizeEmbed(mode === "trailer" ? item.trailerUrl : item.playerUrl);
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
  els.playerFrame.textContent = "Le lecteur apparait ici.";
}

function renderReviews() {
  const item = selectedItem();
  const reviews = store.reviews(item.id);
  els.reviewCount.textContent = `${reviews.length} avis`;
  els.reviewsList.innerHTML = reviews.length
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
    : `<article class="review-item"><strong>Aucun avis</strong><p>Sois le premier a donner ton avis.</p></article>`;
}

function openDrawer(drawer) {
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer(drawer) {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
}

function openAdmin() {
  if (!state.adminUnlocked) {
    els.gateError.textContent = "";
    els.adminPassword.value = "";
    openDrawer(els.adminGate);
    setTimeout(() => els.adminPassword.focus(), 50);
    return;
  }
  renderAdmin();
  openDrawer(els.adminPanel);
}

function unlockAdmin(event) {
  event.preventDefault();
  if (els.adminPassword.value !== adminCode) {
    els.gateError.textContent = "Code incorrect.";
    return;
  }
  state.adminUnlocked = true;
  closeDrawer(els.adminGate);
  openAdmin();
}

function clearContentForm() {
  state.editingId = null;
  els.contentForm.reset();
  els.itemYear.value = new Date().getFullYear();
}

function fillContentForm(id) {
  const item = store.catalog.find((entry) => entry.id === id);
  if (!item) return;
  state.editingId = id;
  els.itemTitle.value = item.title;
  els.itemType.value = item.type;
  els.itemYear.value = item.year;
  els.itemGenres.value = (item.genres || []).join(", ");
  els.itemPoster.value = item.poster || "";
  els.itemPlayer.value = item.playerUrl || "";
  els.itemTrailer.value = item.trailerUrl || "";
  els.itemFeatured.checked = Boolean(item.featured);
  els.itemDescription.value = item.description || "";
  els.contentForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function saveContent(event) {
  event.preventDefault();
  const title = els.itemTitle.value.trim();
  const current = state.editingId ? store.catalog.find((item) => item.id === state.editingId) : null;
  const item = {
    id: current?.id || `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title,
    type: els.itemType.value,
    year: Number(els.itemYear.value) || new Date().getFullYear(),
    genres: els.itemGenres.value.split(",").map((genre) => genre.trim()).filter(Boolean),
    rating: current?.rating || 4,
    progress: current?.progress || 0,
    poster: els.itemPoster.value.trim() || fallbackPoster,
    playerUrl: els.itemPlayer.value.trim(),
    trailerUrl: els.itemTrailer.value.trim(),
    description: els.itemDescription.value.trim(),
    featured: els.itemFeatured.checked,
  };
  if (!item.genres.length) item.genres = ["Nouveau"];
  store.catalog = current
    ? store.catalog.map((entry) => (entry.id === current.id ? item : entry))
    : [item, ...store.catalog];
  if (item.featured) {
    store.catalog = store.catalog.map((entry) => ({ ...entry, featured: entry.id === item.id }));
  }
  state.selectedId = item.id;
  clearContentForm();
  render();
  renderAdmin();
}

function renderAdmin() {
  const catalog = store.catalog;
  const requests = store.requests;
  fillSettingsForm();
  els.adminTotal.textContent = catalog.length;
  els.adminFavorites.textContent = store.favorites.length;
  els.adminReviews.textContent = catalog.reduce((total, item) => total + store.reviews(item.id).length, 0);
  els.adminRequests.textContent = requests.length;
  els.adminList.innerHTML = catalog
    .map(
      (item) => `
        <article class="admin-row">
          <img src="${item.poster || fallbackPoster}" alt="">
          <div>
            <h3>${escapeHtml(item.title)} ${item.featured ? "• En avant" : ""}</h3>
            <p>${escapeHtml(item.type)} • ${item.year} • ${escapeHtml((item.genres || []).join(", "))}</p>
          </div>
          <div class="admin-actions">
            <button class="ghost-button" data-view="${item.id}" type="button">Voir</button>
            <button class="ghost-button" data-edit="${item.id}" type="button">Modifier</button>
            <button class="ghost-button" data-feature="${item.id}" type="button">Avant</button>
            <button class="danger-button" data-delete="${item.id}" type="button">Supprimer</button>
          </div>
        </article>
      `
    )
    .join("");
  els.adminRequestList.innerHTML = requests.length
    ? requests
        .map((request) => `<article class="request-row"><strong>${escapeHtml(request.title)}</strong><span>${escapeHtml(request.date)}</span></article>`)
        .join("")
    : `<article class="request-row"><strong>Aucune demande</strong><span>Les demandes apparaitront ici.</span></article>`;
}

function deleteItem(id) {
  const item = store.catalog.find((entry) => entry.id === id);
  if (!item || !confirm(`Supprimer "${item.title}" ?`)) return;
  store.catalog = store.catalog.filter((entry) => entry.id !== id);
  store.favorites = store.favorites.filter((entryId) => entryId !== id);
  store.history = store.history.filter((entryId) => entryId !== id);
  state.selectedId = store.catalog[0]?.id || starterCatalog[0].id;
  render();
  renderAdmin();
}

function setFeatured(id) {
  store.catalog = store.catalog.map((item) => ({ ...item, featured: item.id === id }));
  state.selectedId = id;
  render();
  renderAdmin();
}

function exportSettings() {
  els.settingsJson.value = JSON.stringify(store.settings, null, 2);
  els.settingsJson.select();
}

function importSettings() {
  try {
    store.settings = JSON.parse(els.settingsJson.value);
    fillSettingsForm();
    render();
  } catch {
    alert("Configuration JSON invalide.");
  }
}

function exportCatalog() {
  els.catalogJson.value = JSON.stringify(store.catalog, null, 2);
  els.catalogJson.select();
}

function importCatalog() {
  try {
    const next = JSON.parse(els.catalogJson.value);
    if (!Array.isArray(next)) throw new Error("Invalid");
    store.catalog = next;
    state.selectedId = store.catalog[0]?.id || starterCatalog[0].id;
    render();
    renderAdmin();
  } catch {
    alert("Catalogue JSON invalide.");
  }
}

function resetCatalog() {
  if (!confirm("Remettre le catalogue de demo ?")) return;
  localStorage.removeItem("heartStream.catalog");
  state.selectedId = starterCatalog[0].id;
  render();
  renderAdmin();
}

function goHome() {
  state.type = "Tous";
  state.genre = "Tous";
  state.query = "";
  state.favoritesOnly = false;
  state.selectedId = featuredItem().id;
  els.searchInput.value = "";
  els.navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.type === "Tous"));
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$("#homeButton").addEventListener("click", goHome);
els.navItems.forEach((button) => {
  button.addEventListener("click", () => {
    els.navItems.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.type = button.dataset.type;
    render();
  });
});
els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});
els.favoritesToggle.addEventListener("click", () => {
  state.favoritesOnly = !state.favoritesOnly;
  els.favoritesToggle.classList.toggle("gold-button", state.favoritesOnly);
  render();
});
els.sortSelect.addEventListener("change", render);
els.genreChips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-genre]");
  if (!button) return;
  state.genre = button.dataset.genre;
  render();
});
document.addEventListener("click", (event) => {
  const openId = event.target.closest("[data-open]")?.dataset.open;
  if (openId) openDetails(openId);
});
els.heroWatch.addEventListener("click", () => openDetails(state.selectedId));
els.heroTrailer.addEventListener("click", () => {
  openDetails(state.selectedId);
  openPlayer("trailer");
});
els.heroFavorite.addEventListener("click", () => toggleFavorite(state.selectedId));
els.portalWatch.addEventListener("click", () => openDetails(state.selectedId));
els.portalTrailer.addEventListener("click", () => {
  openDetails(state.selectedId);
  openPlayer("trailer");
});
els.watchButton.addEventListener("click", () => openPlayer("watch"));
els.trailerButton.addEventListener("click", () => openPlayer("trailer"));
els.favoriteButton.addEventListener("click", () => toggleFavorite(state.selectedId));
els.closePlayer.addEventListener("click", closePlayer);
els.reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = selectedItem();
  const reviews = store.reviews(item.id);
  reviews.unshift({
    name: els.reviewName.value.trim(),
    rating: els.reviewRating.value,
    text: els.reviewText.value.trim(),
  });
  store.saveReviews(item.id, reviews);
  els.reviewForm.reset();
  renderReviews();
  render();
});
els.requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  store.requests = [
    { title: els.requestInput.value.trim(), date: new Date().toLocaleDateString("fr-FR") },
    ...store.requests,
  ];
  els.requestForm.reset();
  alert("Demande envoyee.");
});
els.adminButton.addEventListener("click", openAdmin);
els.gateForm.addEventListener("submit", unlockAdmin);
$$("[data-close]").forEach((button) => button.addEventListener("click", closeDetails));
$$("[data-gate-close]").forEach((button) => button.addEventListener("click", () => closeDrawer(els.adminGate)));
$$("[data-admin-close]").forEach((button) => button.addEventListener("click", () => closeDrawer(els.adminPanel)));
[
  els.settingName,
  els.settingLogo,
  els.settingTagline,
  els.settingTopTitle,
  els.settingCatalogTitle,
  els.settingFloatStyle,
  els.settingWine,
  els.settingRed,
  els.settingGold,
  els.settingGlow,
  els.modulePortal,
  els.modulePlatforms,
  els.moduleSpotlight,
  els.moduleRequests,
  els.moduleContinue,
  els.moduleTop,
  els.moduleCatalog,
  els.moduleReviews,
  els.moduleDecor,
].forEach((control) => control.addEventListener("input", saveSettings));
els.saveSettings.addEventListener("click", saveSettings);
els.resetSettings.addEventListener("click", resetSettings);
els.exportSettings.addEventListener("click", exportSettings);
els.importSettings.addEventListener("click", importSettings);
els.newItem.addEventListener("click", clearContentForm);
els.contentForm.addEventListener("submit", saveContent);
els.adminList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.view) {
    closeDrawer(els.adminPanel);
    openDetails(button.dataset.view);
  }
  if (button.dataset.edit) fillContentForm(button.dataset.edit);
  if (button.dataset.feature) setFeatured(button.dataset.feature);
  if (button.dataset.delete) deleteItem(button.dataset.delete);
});
els.exportCatalog.addEventListener("click", exportCatalog);
els.importCatalog.addEventListener("click", importCatalog);
els.resetCatalog.addEventListener("click", resetCatalog);
els.clearRequests.addEventListener("click", () => {
  if (!confirm("Vider les demandes ?")) return;
  store.requests = [];
  renderAdmin();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeDetails();
  closeDrawer(els.adminGate);
  closeDrawer(els.adminPanel);
});

applySettings();
fillSettingsForm();
state.selectedId = featuredItem().id;
render();
