const fallback = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80";
const demo = [
  ["red-orbit", "Red Orbit", "Film", "Science-fiction,Thriller", "Une expedition isolee capte un signal impossible au bord d'une planete rouge.", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=80"],
  ["maison-minuit", "Maison Minuit", "Serie", "Mystere,Drame", "Une famille cache un secret qui recommence chaque nuit a la meme heure.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80"],
  ["golden-ring", "Golden Ring", "Anime", "Aventure,Animation", "Une apprentie cartographe traverse des cites suspendues.", "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1000&q=80"],
  ["urban-night", "Urban Night", "Film", "Action,Crime", "Une nuit sous tension dans une ville qui ne dort jamais.", "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80"],
  ["kids-moon", "Kids Moon", "Cartoon", "Animation,Comedie", "Une aventure coloree entre amis sur une lune miniature.", "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80"],
  ["plateau-secret", "Plateau Secret", "Emission", "TV,Divertissement", "Une emission evenement avec defis, votes et surprises.", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80"],
].map(([id, title, type, genres, text, image], index) => ({
  id, title, type, genres: genres.split(","), text, image, rating: (4.1 + index / 10).toFixed(1), player: "", trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ"
}));

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const store = {
  get items() { return JSON.parse(localStorage.getItem("hs_xs_items") || "null") || demo; },
  set items(v) { localStorage.setItem("hs_xs_items", JSON.stringify(v)); },
  get favs() { return JSON.parse(localStorage.getItem("hs_xs_favs") || "[]"); },
  set favs(v) { localStorage.setItem("hs_xs_favs", JSON.stringify(v)); },
  get history() { return JSON.parse(localStorage.getItem("hs_xs_history") || "[]"); },
  set history(v) { localStorage.setItem("hs_xs_history", JSON.stringify(v.slice(0, 12))); },
  get requests() { return JSON.parse(localStorage.getItem("hs_xs_requests") || "[]"); },
  set requests(v) { localStorage.setItem("hs_xs_requests", JSON.stringify(v)); },
  get libraries() { return JSON.parse(localStorage.getItem("hs_xs_libraries") || "[]"); },
  set libraries(v) { localStorage.setItem("hs_xs_libraries", JSON.stringify(v)); },
};
const sessionFiles = new Map();
const state = { filter: "all", query: "", genre: "Tout", selected: demo[0].id, edit: null, libraryStep: "type", libraryType: "Film", libraryFiles: [] };

function item(id = state.selected) { return store.items.find((x) => x.id === id) || store.items[0] || demo[0]; }
function esc(v) { return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])); }
function genres() { return ["Tout", ...new Set(store.items.flatMap((x) => x.genres || []))]; }
function filtered() {
  let rows = [...store.items];
  if (state.filter !== "all") rows = rows.filter((x) => x.type === state.filter);
  if (state.genre !== "Tout") rows = rows.filter((x) => x.genres.includes(state.genre));
  if (state.query) rows = rows.filter((x) => [x.title, x.type, x.text, ...x.genres].join(" ").toLowerCase().includes(state.query.toLowerCase()));
  return rows;
}

function renderFilters() {
  $("#genreFilters").innerHTML = genres().map((g) => `<button class="${g === state.genre ? "active" : ""}" data-genre="${esc(g)}">${esc(g)}</button>`).join("");
}
function renderCards() {
  const rows = filtered();
  $("#catalogGrid").innerHTML = "";
  rows.forEach((x) => {
    const node = $("#cardTemplate").content.firstElementChild.cloneNode(true);
    node.querySelector("img").src = x.image || fallback;
    node.querySelector("img").alt = x.title;
    node.querySelector("p").textContent = `${x.type} • ${x.rating}/5`;
    node.querySelector("h3").textContent = x.title;
    node.querySelector("button").addEventListener("click", () => openDetails(x.id));
    $("#catalogGrid").appendChild(node);
  });
  $("#emptyState").classList.toggle("hidden", rows.length > 0);
  $("#catalogTitle").textContent = state.query ? "Recherche" : "A decouvrir";
  $("#favoriteCountMenu").textContent = store.favs.length;
  $("#historyCountMenu").textContent = store.history.length;
}
function renderAdmin() {
  $("#adminList").innerHTML = store.items.map((x) => `
    <article class="admin-row">
      <img src="${x.image || fallback}" alt="">
      <div><h3>${esc(x.title)}</h3><p>${esc(x.type)} • ${esc(x.genres.join(", "))}</p></div>
      <div class="admin-actions">
        <button data-edit="${x.id}">Modifier</button>
        <button data-delete="${x.id}">Supprimer</button>
      </div>
    </article>`).join("");
  $("#requestList").innerHTML = store.requests.length ? store.requests.map((x) => `<article class="admin-row"><div><h3>${esc(x)}</h3><p>Demande membre</p></div></article>`).join("") : "<p>Aucune demande.</p>";
  $("#libraryList").innerHTML = store.libraries.length ? store.libraries.map((x) => `
    <article class="admin-row">
      <div><h3>${esc(x.name)}</h3><p>${esc(x.type)} • ${x.count} fichier(s) • ${esc(x.date)}</p></div>
    </article>`).join("") : "<p>Aucune bibliotheque ajoutee.</p>";
}
function render() { renderFilters(); renderCards(); renderAdmin(); }

function openDetails(id) {
  state.selected = id;
  const x = item();
  store.history = [id, ...store.history.filter((v) => v !== id)];
  $("#detailImage").src = x.image || fallback;
  $("#detailMeta").textContent = `${x.type} • ${x.genres.join(", ")} • ${x.rating}/5`;
  $("#detailTitle").textContent = x.title;
  $("#detailText").textContent = x.text;
  $("#favoriteButton").textContent = store.favs.includes(id) ? "Retirer favori" : "Ajouter favori";
  $("#playerBox").classList.add("hidden");
  $("#detailModal").classList.remove("hidden");
  render();
}
function openPlayer(url) {
  const box = $("#playerBox");
  const source = sessionFiles.get(url) || url;
  box.classList.remove("hidden");
  if (!url) box.textContent = "Ajoute un lien MP4/Abyss dans le panel admin.";
  else if (sessionFiles.has(url) || String(url).match(/\.(mp4|m4v|webm|ogg)(\?.*)?$/i)) {
    box.innerHTML = `
      <div class="hs-player">
        <video class="hs-video" src="${esc(source)}" playsinline preload="metadata"></video>
        <button class="hs-big-play" type="button">▶</button>
        <div class="hs-controls">
          <input class="hs-seek" type="range" min="0" max="1000" value="0" aria-label="Avancement" />
          <div class="hs-row">
            <button class="hs-play" type="button">▶</button>
            <button class="hs-back" type="button">-10s</button>
            <button class="hs-forward" type="button">+10s</button>
            <span class="hs-time">00:00 / 00:00</span>
            <button class="hs-mute" type="button">🔊</button>
            <input class="hs-volume" type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume" />
            <button class="hs-full" type="button">Plein ecran</button>
          </div>
        </div>
      </div>`;
    setupHsPlayer(box);
  }
  else box.innerHTML = `<iframe src="${esc(url)}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
}

function setupHsPlayer(box) {
  const video = box.querySelector(".hs-video");
  const player = box.querySelector(".hs-player");
  const play = box.querySelector(".hs-play");
  const big = box.querySelector(".hs-big-play");
  const seek = box.querySelector(".hs-seek");
  const time = box.querySelector(".hs-time");
  const mute = box.querySelector(".hs-mute");
  const volume = box.querySelector(".hs-volume");
  const format = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };
  const refresh = () => {
    seek.value = video.duration ? String((video.currentTime / video.duration) * 1000) : "0";
    time.textContent = `${format(video.currentTime)} / ${format(video.duration)}`;
    play.textContent = video.paused ? "▶" : "❚❚";
    big.textContent = video.paused ? "▶" : "❚❚";
    mute.textContent = video.muted || video.volume === 0 ? "🔇" : "🔊";
  };
  const toggle = () => (video.paused ? video.play() : video.pause());
  play.addEventListener("click", toggle);
  big.addEventListener("click", toggle);
  video.addEventListener("click", toggle);
  video.addEventListener("timeupdate", refresh);
  video.addEventListener("loadedmetadata", refresh);
  video.addEventListener("play", refresh);
  video.addEventListener("pause", refresh);
  seek.addEventListener("input", () => { if (video.duration) video.currentTime = (Number(seek.value) / 1000) * video.duration; });
  box.querySelector(".hs-back").addEventListener("click", () => { video.currentTime = Math.max(0, video.currentTime - 10); });
  box.querySelector(".hs-forward").addEventListener("click", () => { video.currentTime = Math.min(video.duration || 0, video.currentTime + 10); });
  mute.addEventListener("click", () => { video.muted = !video.muted; refresh(); });
  volume.addEventListener("input", () => { video.volume = Number(volume.value); video.muted = video.volume === 0; refresh(); });
  box.querySelector(".hs-full").addEventListener("click", () => { if (player.requestFullscreen) player.requestFullscreen(); });
  refresh();
}
function toggleFav() {
  const id = state.selected;
  store.favs = store.favs.includes(id) ? store.favs.filter((x) => x !== id) : [...store.favs, id];
  $("#favoriteButton").textContent = store.favs.includes(id) ? "Retirer favori" : "Ajouter favori";
  render();
}
function fillForm(id) {
  const x = item(id);
  state.edit = id;
  $("#itemTitle").value = x.title;
  $("#itemType").value = x.type;
  $("#itemGenres").value = x.genres.join(", ");
  $("#itemImage").value = x.image || "";
  updateImagePreview(x.image || "");
  $("#itemPlayer").value = x.player || "";
  $("#itemTrailer").value = x.trailer || "";
  $("#itemText").value = x.text || "";
}

function updateImagePreview(src = $("#itemImage").value) {
  const preview = $("#imagePreview");
  preview.src = src || "";
  preview.classList.toggle("visible", Boolean(src));
}

function showLibraryStep(step) {
  state.libraryStep = step;
  $$(".library-steps button").forEach((button) => button.classList.toggle("active", button.dataset.libraryStep === step));
  $$(".library-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.libraryPanel === step));
  $("#libraryPrev").disabled = step === "type";
  $("#libraryNext").classList.toggle("hidden", step === "advanced");
  $("#libraryAdd").classList.toggle("hidden", step !== "advanced");
}

function openLibraryModal() {
  $("#libraryModal").classList.remove("hidden");
  $$(".library-types button").forEach((button) => button.classList.toggle("selected", button.dataset.libraryType === state.libraryType));
  showLibraryStep("type");
}

function refreshSelectedFiles() {
  const files = state.libraryFiles;
  $("#selectedFiles").innerHTML = files.length
    ? files.slice(0, 8).map((file) => `<span>${esc(file.webkitRelativePath || file.name)}</span>`).join("")
    : "Aucun fichier choisi.";
}

function addLibrary() {
  const files = state.libraryFiles.filter((file) => file.type.startsWith("video/") || file.name.toLowerCase().endsWith(".mp4"));
  const name = $("#libraryName").value.trim() || `${state.libraryType} Heart-Stream`;
  store.libraries = [{ name, type: state.libraryType, count: files.length, date: new Date().toLocaleDateString("fr-FR") }, ...store.libraries];
  if ($("#libraryAutoAdd").checked && files.length) {
    const additions = files.map((file) => {
      const id = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      sessionFiles.set(id, URL.createObjectURL(file));
      return {
        id,
        title: file.name.replace(/\.[^.]+$/, "").replaceAll(".", " "),
        type: state.libraryType === "Autres videos" ? "Film" : state.libraryType,
        genres: ["Bibliotheque locale"],
        text: `Fichier local: ${file.name}. Lecture conseillee en MP4 H.264 + AAC.`,
        image: fallback,
        rating: "4.5",
        player: id,
        trailer: "",
      };
    });
    store.items = [...additions, ...store.items];
  }
  $("#libraryModal").classList.add("hidden");
  state.libraryFiles = [];
  refreshSelectedFiles();
  render();
}

$("#authForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#loginScreen").classList.add("hidden");
  $("#appScreen").classList.remove("hidden");
  document.body.classList.add("logged-in");
  window.scrollTo({ top: 0, behavior: "instant" });
});
$$("[data-auth-tab]").forEach((b) => b.addEventListener("click", () => {
  $$("[data-auth-tab]").forEach((x) => x.classList.toggle("active", x === b));
  const signup = b.dataset.authTab === "signup";
  $("#authTitle").textContent = signup ? "Creer un compte" : "Bienvenue";
  $("#authSubtitle").textContent = signup ? "Inscris-toi pour rejoindre Heart-Stream." : "Connecte-toi pour continuer sur Heart-Stream.";
  $("#loginButton").textContent = signup ? "S'inscrire" : "Se connecter";
}));
$("#switchAuth").addEventListener("click", () => $$("[data-auth-tab='signup']")[0].click());
$("#profileButton").addEventListener("click", () => $("#profileMenu").classList.toggle("open"));
$("#closeProfile").addEventListener("click", () => $("#profileMenu").classList.remove("open"));
$("#homeButton").addEventListener("click", () => { state.filter = "all"; state.query = ""; $("#searchInput").value = ""; render(); });
$$(".nav button[data-filter]").forEach((b) => b.addEventListener("click", () => {
  $$(".nav button[data-filter]").forEach((x) => x.classList.toggle("active", x === b));
  state.filter = b.dataset.filter;
  render();
}));
$("#searchInput").addEventListener("input", (e) => { state.query = e.target.value; renderCards(); });
$("#genreFilters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-genre]");
  if (!b) return;
  state.genre = b.dataset.genre;
  render();
});
$("#listButton").addEventListener("click", () => alert(store.favs.length ? `Favoris: ${store.favs.join(", ")}` : "Aucun favori."));
$("#libraryButton").addEventListener("click", openLibraryModal);
$("#watchButton").addEventListener("click", () => openPlayer(item().player));
$("#trailerButton").addEventListener("click", () => openPlayer(item().trailer));
$("#favoriteButton").addEventListener("click", toggleFav);
$$("[data-close-modal]").forEach((b) => b.addEventListener("click", () => $("#detailModal").classList.add("hidden")));
$("#requestFab").addEventListener("click", () => {
  const title = prompt("Quel contenu veux-tu demander ?");
  if (title) { store.requests = [title, ...store.requests]; renderAdmin(); alert("Demande ajoutee."); }
});
$("#adminButtonFromMenu");
$("[data-profile='admin']").addEventListener("click", () => { $("#profileMenu").classList.remove("open"); $("#adminModal").classList.remove("hidden"); renderAdmin(); });
$("[data-profile='library']").addEventListener("click", () => { $("#profileMenu").classList.remove("open"); openLibraryModal(); });
$("[data-profile='logout']").addEventListener("click", () => { $("#appScreen").classList.add("hidden"); $("#loginScreen").classList.remove("hidden"); });
$$("[data-close-admin]").forEach((b) => b.addEventListener("click", () => $("#adminModal").classList.add("hidden")));
$(".admin-preview").addEventListener("click", (e) => {
  e.preventDefault();
  $("#loginScreen").classList.add("hidden");
  $("#appScreen").classList.remove("hidden");
  document.body.classList.add("logged-in");
  window.scrollTo({ top: 0, behavior: "instant" });
  $("#adminModal").classList.remove("hidden");
});
$(".admin-tabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-admin-tab]");
  if (!b) return;
  $$(".admin-tabs button").forEach((x) => x.classList.toggle("active", x === b));
  $$(".admin-section").forEach((s) => s.classList.toggle("active", s.dataset.adminSection === b.dataset.adminTab));
});
$("#contentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = state.edit || Date.now().toString();
  const next = { id, title: $("#itemTitle").value, type: $("#itemType").value, genres: $("#itemGenres").value.split(",").map((x) => x.trim()).filter(Boolean), image: $("#itemImage").value || fallback, player: $("#itemPlayer").value, trailer: $("#itemTrailer").value, text: $("#itemText").value, rating: "4.5" };
  store.items = state.edit ? store.items.map((x) => x.id === state.edit ? next : x) : [next, ...store.items];
  state.edit = null;
  $("#contentForm").reset();
  updateImagePreview("");
  render();
});
$("#newItem").addEventListener("click", () => { state.edit = null; $("#contentForm").reset(); updateImagePreview(""); });
$("#itemImage").addEventListener("input", () => updateImagePreview());
$("#imageFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("Choisis une image en JPG, PNG, WEBP ou GIF.");
    e.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    $("#itemImage").value = reader.result;
    updateImagePreview(reader.result);
  });
  reader.readAsDataURL(file);
});
$("#adminList").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-edit]")?.dataset.edit;
  const del = e.target.closest("[data-delete]")?.dataset.delete;
  if (edit) fillForm(edit);
  if (del && confirm("Supprimer ce titre ?")) { store.items = store.items.filter((x) => x.id !== del); render(); }
});
$("#requestForm").addEventListener("submit", (e) => { e.preventDefault(); if ($("#requestInput").value) store.requests = [$("#requestInput").value, ...store.requests]; $("#requestInput").value = ""; renderAdmin(); });
$("#openLibraryFromAdmin").addEventListener("click", openLibraryModal);
$$("[data-close-library]").forEach((b) => b.addEventListener("click", () => $("#libraryModal").classList.add("hidden")));
$(".library-steps").addEventListener("click", (e) => {
  const step = e.target.closest("[data-library-step]")?.dataset.libraryStep;
  if (step) showLibraryStep(step);
});
$(".library-types").addEventListener("click", (e) => {
  const type = e.target.closest("[data-library-type]")?.dataset.libraryType;
  if (!type) return;
  state.libraryType = type;
  $$(".library-types button").forEach((button) => button.classList.toggle("selected", button.dataset.libraryType === type));
  showLibraryStep("folders");
});
$("#folderInput").addEventListener("change", (e) => {
  state.libraryFiles = [...e.target.files];
  refreshSelectedFiles();
});
$("#libraryPrev").addEventListener("click", () => showLibraryStep(state.libraryStep === "advanced" ? "folders" : "type"));
$("#libraryNext").addEventListener("click", () => showLibraryStep(state.libraryStep === "type" ? "folders" : "advanced"));
$("#libraryAdd").addEventListener("click", addLibrary);
$("#saveDesign").addEventListener("click", () => {
  document.documentElement.style.setProperty("--accent", $("#accentInput").value);
  $(".brand strong").textContent = $("#siteNameInput").value || "Heart-Stream";
});
$("#resetAll").addEventListener("click", () => { localStorage.removeItem("hs_xs_items"); localStorage.removeItem("hs_xs_favs"); localStorage.removeItem("hs_xs_history"); localStorage.removeItem("hs_xs_requests"); localStorage.removeItem("hs_xs_libraries"); location.reload(); });

render();
