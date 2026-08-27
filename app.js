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
};
const state = { filter: "all", query: "", genre: "Tout", selected: demo[0].id, edit: null };

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
  box.classList.remove("hidden");
  if (!url) box.textContent = "Ajoute un lien Abyss dans le panel admin.";
  else if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) box.innerHTML = `<video src="${esc(url)}" controls></video>`;
  else box.innerHTML = `<iframe src="${esc(url)}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
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
  $("#itemPlayer").value = x.player || "";
  $("#itemTrailer").value = x.trailer || "";
  $("#itemText").value = x.text || "";
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
  render();
});
$("#newItem").addEventListener("click", () => { state.edit = null; $("#contentForm").reset(); });
$("#adminList").addEventListener("click", (e) => {
  const edit = e.target.closest("[data-edit]")?.dataset.edit;
  const del = e.target.closest("[data-delete]")?.dataset.delete;
  if (edit) fillForm(edit);
  if (del && confirm("Supprimer ce titre ?")) { store.items = store.items.filter((x) => x.id !== del); render(); }
});
$("#requestForm").addEventListener("submit", (e) => { e.preventDefault(); if ($("#requestInput").value) store.requests = [$("#requestInput").value, ...store.requests]; $("#requestInput").value = ""; renderAdmin(); });
$("#saveDesign").addEventListener("click", () => {
  document.documentElement.style.setProperty("--accent", $("#accentInput").value);
  $(".brand strong").textContent = $("#siteNameInput").value || "Heart-Stream";
});
$("#resetAll").addEventListener("click", () => { localStorage.removeItem("hs_xs_items"); localStorage.removeItem("hs_xs_favs"); localStorage.removeItem("hs_xs_history"); localStorage.removeItem("hs_xs_requests"); location.reload(); });

render();
