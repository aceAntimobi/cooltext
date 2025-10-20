import { categories, library, typeLabels } from '../data/library.js';

const MAX_RECENT = 20;
const FAVORITES_KEY = 'cooltext:favorites';
const RECENTS_KEY = 'cooltext:recents';
const SIDEBAR_TRANSITION_MS = 200;

const state = {
  selectedType: 'emoji',
  selectedCategory: 'all',
  searchTerm: '',
  favorites: readStoredArray(FAVORITES_KEY),
  recents: readStoredArray(RECENTS_KEY),
  detailId: null
};

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');
const menuButton = document.getElementById('menuButton');
const typeTabs = document.getElementById('typeTabs');
const categoryList = document.getElementById('categoryList');
const searchInput = document.getElementById('searchInput');
const favoritesSection = document.getElementById('favoritesSection');
const favoritesList = document.getElementById('favoritesList');
const clearFavoritesButton = document.getElementById('clearFavorites');
const recentsSection = document.getElementById('recentsSection');
const recentsList = document.getElementById('recentsList');
const clearRecentsButton = document.getElementById('clearRecents');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const resultsGrid = document.getElementById('resultsGrid');
const emptyState = document.getElementById('emptyState');
const toast = document.getElementById('toast');

const detailModal = document.getElementById('detailModal');
const modalClose = document.getElementById('modalClose');
const modalCharacter = document.getElementById('modalCharacter');
const modalName = document.getElementById('modalName');
const modalDescription = document.getElementById('modalDescription');
const modalType = document.getElementById('modalType');
const modalCategory = document.getElementById('modalCategory');
const modalKeywords = document.getElementById('modalKeywords');
const modalVariantsRow = document.getElementById('modalVariantsRow');
const modalVariants = document.getElementById('modalVariants');
const modalCopyButton = document.getElementById('modalCopyButton');
const modalFavoriteButton = document.getElementById('modalFavoriteButton');

const categoryLabelMap = buildCategoryLabelMap();
const itemMap = new Map(library.map((item) => [item.id, item]));
let toastTimeout;
let toastHideTimeout;

initialRender();
attachEventHandlers();

function initialRender() {
  if (searchInput) {
    searchInput.value = state.searchTerm;
  }
  renderTypeTabs();
  renderCategories();
  renderFavorites();
  renderRecents();
  renderResults();
}

function attachEventHandlers() {
  menuButton?.addEventListener('click', toggleSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  sidebarOverlay?.addEventListener('click', closeSidebar);

  typeTabs?.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-type]');
    if (!button) return;
    const type = button.dataset.type;
    if (type && type !== state.selectedType) {
      state.selectedType = type;
      state.selectedCategory = 'all';
      closeSidebar();
      renderTypeTabs();
      renderCategories();
      renderResults();
    }
  });

  categoryList?.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-category]');
    if (!button) return;
    const category = button.dataset.category;
    if (category && category !== state.selectedCategory) {
      state.selectedCategory = category;
      closeSidebar();
      renderCategories();
      renderResults();
    }
  });

  searchInput?.addEventListener('input', (event) => {
    state.searchTerm = event.target.value;
    renderResults();
  });

  clearFavoritesButton?.addEventListener('click', () => {
    setFavorites([]);
  });

  clearRecentsButton?.addEventListener('click', () => {
    setRecents([]);
  });

  resultsGrid?.addEventListener('click', handleItemAction);
  favoritesList?.addEventListener('click', handleItemAction);
  recentsList?.addEventListener('click', handleItemAction);

  modalClose?.addEventListener('click', closeDetailModal);
  detailModal?.addEventListener('click', (event) => {
    if (event.target === detailModal) {
      closeDetailModal();
    }
  });
  modalCopyButton?.addEventListener('click', async () => {
    if (!state.detailId) return;
    const item = findItemById(state.detailId);
    if (item) {
      await copyItem(item);
    }
  });
  modalFavoriteButton?.addEventListener('click', () => {
    if (!state.detailId) return;
    const item = findItemById(state.detailId);
    if (item) {
      toggleFavorite(item);
      updateModalFavorite(item);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!detailModal?.hasAttribute('hidden')) {
        closeDetailModal();
      }
      if (sidebar?.classList.contains('open')) {
        closeSidebar();
      }
    }
  });
}

function handleItemAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;
  if (!id || !action) return;
  const item = findItemById(id);
  if (!item) return;

  switch (action) {
    case 'copy':
      copyItem(item);
      break;
    case 'favorite':
      toggleFavorite(item);
      break;
    case 'detail':
      openDetailModal(item);
      break;
    default:
      break;
  }
}

function renderTypeTabs() {
  if (!typeTabs) return;
  typeTabs.innerHTML = '';
  Object.keys(typeLabels).forEach((type) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `type-tab${state.selectedType === type ? ' active' : ''}`;
    button.dataset.type = type;
    button.textContent = typeLabels[type];
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(state.selectedType === type));
    typeTabs.appendChild(button);
  });
}

function renderCategories() {
  if (!categoryList) return;
  categoryList.innerHTML = '';
  const list = categories[state.selectedType] ?? [];
  list.forEach((category) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `category-button${state.selectedCategory === category.id ? ' active' : ''}`;
    button.dataset.category = category.id;
    button.textContent = category.label;
    li.appendChild(button);
    categoryList.appendChild(li);
  });
}

function renderFavorites() {
  if (!favoritesSection || !favoritesList) return;
  const items = state.favorites.map((id) => findItemById(id)).filter(Boolean);
  if (items.length === 0) {
    favoritesSection.hidden = true;
    favoritesList.innerHTML = '';
    return;
  }

  favoritesSection.hidden = false;
  favoritesList.innerHTML = '';
  items.forEach((item) => {
    favoritesList.appendChild(createInlineCard(item, true));
  });
}

function renderRecents() {
  if (!recentsSection || !recentsList) return;
  const items = state.recents.map((id) => findItemById(id)).filter(Boolean);
  if (items.length === 0) {
    recentsSection.hidden = true;
    recentsList.innerHTML = '';
    return;
  }

  recentsSection.hidden = false;
  recentsList.innerHTML = '';
  items.forEach((item) => {
    recentsList.appendChild(createInlineCard(item, false));
  });
}

function renderResults() {
  if (!resultsGrid || !resultsTitle || !resultsCount || !emptyState) return;
  const items = computeFilteredItems();
  resultsTitle.textContent = `${typeLabels[state.selectedType]} Library`;
  resultsCount.textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;

  resultsGrid.innerHTML = '';
  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  items.forEach((item) => {
    resultsGrid.appendChild(createItemCard(item));
  });
}

function computeFilteredItems() {
  const normalized = state.searchTerm.trim().toLowerCase();
  const trimmed = state.searchTerm.trim();
  return library.filter((item) => {
    if (item.type !== state.selectedType) return false;
    if (state.selectedCategory !== 'all' && item.category !== state.selectedCategory) return false;
    if (!normalized) return true;

    if (item.name.toLowerCase().includes(normalized)) return true;
    if (item.keywords.some((keyword) => keyword.toLowerCase().includes(normalized))) return true;
    if (trimmed && item.character.includes(trimmed)) return true;
    return false;
  });
}

function createItemCard(item) {
  const article = document.createElement('article');
  article.className = 'item-card';
  article.setAttribute('role', 'listitem');

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'item-character-button';
  copyButton.dataset.action = 'copy';
  copyButton.dataset.id = item.id;
  copyButton.setAttribute('aria-label', `Copy ${item.name}`);
  const characterSpan = document.createElement('span');
  characterSpan.className = 'item-character';
  characterSpan.textContent = item.character;
  copyButton.appendChild(characterSpan);

  const textContainer = document.createElement('div');
  textContainer.className = 'item-text';
  const nameEl = document.createElement('h3');
  nameEl.className = 'item-name';
  nameEl.textContent = item.name;
  const metaEl = document.createElement('p');
  metaEl.className = 'item-meta';
  metaEl.textContent = formatCategoryLabel(item);
  textContainer.appendChild(nameEl);
  textContainer.appendChild(metaEl);

  const actions = document.createElement('div');
  actions.className = 'item-actions';
  const favoriteButton = document.createElement('button');
  favoriteButton.type = 'button';
  favoriteButton.className = 'favorite-button';
  favoriteButton.dataset.action = 'favorite';
  favoriteButton.dataset.id = item.id;
  const isFavorite = state.favorites.includes(item.id);
  favoriteButton.textContent = isFavorite ? '♥' : '♡';
  favoriteButton.setAttribute('aria-pressed', String(isFavorite));
  favoriteButton.setAttribute('aria-label', isFavorite ? 'Remove from favorites' : 'Add to favorites');
  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.className = 'detail-button';
  detailButton.dataset.action = 'detail';
  detailButton.dataset.id = item.id;
  detailButton.textContent = 'Details';

  actions.appendChild(favoriteButton);
  actions.appendChild(detailButton);

  article.appendChild(copyButton);
  article.appendChild(textContainer);
  article.appendChild(actions);

  return article;
}

function createInlineCard(item, includeFavoriteToggle) {
  const card = document.createElement('div');
  card.className = 'inline-card';
  card.setAttribute('role', 'listitem');

  const character = document.createElement('div');
  character.className = 'item-character';
  character.textContent = item.character;

  const name = document.createElement('div');
  name.className = 'item-meta';
  name.textContent = item.name;

  const actions = document.createElement('div');
  actions.className = 'inline-actions';

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.dataset.action = 'copy';
  copyButton.dataset.id = item.id;
  copyButton.textContent = 'Copy';

  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.dataset.action = 'detail';
  detailButton.dataset.id = item.id;
  detailButton.textContent = 'Details';

  actions.appendChild(copyButton);
  actions.appendChild(detailButton);

  if (includeFavoriteToggle) {
    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.dataset.action = 'favorite';
    favoriteButton.dataset.id = item.id;
    const isFavorite = state.favorites.includes(item.id);
    favoriteButton.textContent = isFavorite ? 'Remove' : 'Favorite';
    favoriteButton.setAttribute('aria-pressed', String(isFavorite));
    favoriteButton.setAttribute('aria-label', isFavorite ? 'Remove from favorites' : 'Add to favorites');
    actions.appendChild(favoriteButton);
  }

  card.appendChild(character);
  card.appendChild(name);
  card.appendChild(actions);
  return card;
}

function toggleFavorite(item) {
  if (state.favorites.includes(item.id)) {
    setFavorites(state.favorites.filter((id) => id !== item.id));
  } else {
    setFavorites([...state.favorites, item.id]);
    showToast(`${item.character} saved to favorites`);
  }
}

function setFavorites(next) {
  state.favorites = Array.from(new Set(next));
  writeStoredArray(FAVORITES_KEY, state.favorites);
  renderFavorites();
  renderResults();
  if (state.detailId) {
    const detailItem = findItemById(state.detailId);
    if (detailItem) {
      updateModalFavorite(detailItem);
    }
  }
}

function setRecents(next) {
  state.recents = next;
  writeStoredArray(RECENTS_KEY, state.recents);
  renderRecents();
}

async function copyItem(item) {
  const success = await copyToClipboard(item.character);
  if (success) {
    showToast(`${item.character} copied to clipboard`);
    const deduped = state.recents.filter((id) => id !== item.id);
    setRecents([item.id, ...deduped].slice(0, MAX_RECENT));
  } else {
    showToast('Copy failed. Please try again.');
  }
}

function openDetailModal(item) {
  state.detailId = item.id;
  if (!detailModal) return;
  detailModal.hidden = false;
  document.body.classList.add('modal-open');

  modalCharacter.textContent = item.character;
  modalName.textContent = item.name;
  modalDescription.textContent = item.description ?? 'No description available for this item.';
  modalType.textContent = typeLabels[item.type] ?? item.type;
  modalCategory.textContent = formatCategoryLabel(item);
  modalKeywords.textContent = item.keywords.join(', ');
  modalVariantsRow.hidden = !(item.variants && item.variants.length > 0);
  modalVariants.textContent = item.variants ? item.variants.join(' · ') : '';
  modalCopyButton.dataset.id = item.id;
  modalFavoriteButton.dataset.id = item.id;
  updateModalFavorite(item);
}

function closeDetailModal() {
  state.detailId = null;
  if (!detailModal) return;
  detailModal.hidden = true;
  document.body.classList.remove('modal-open');
}

function updateModalFavorite(item) {
  if (!modalFavoriteButton) return;
  const isFavorite = state.favorites.includes(item.id);
  modalFavoriteButton.textContent = isFavorite ? 'Remove from favorites' : 'Add to favorites';
  modalFavoriteButton.setAttribute('aria-pressed', String(isFavorite));
}

function toggleSidebar() {
  if (!sidebar || !sidebarOverlay) return;
  const willOpen = !sidebar.classList.contains('open');
  if (willOpen) {
    sidebar.classList.add('open');
    sidebarOverlay.hidden = false;
    requestAnimationFrame(() => sidebarOverlay.classList.add('visible'));
  } else {
    closeSidebar();
  }
}

function closeSidebar() {
  if (!sidebar || !sidebarOverlay) return;
  sidebar.classList.remove('open');
  if (!sidebarOverlay.hidden) {
    sidebarOverlay.classList.remove('visible');
    setTimeout(() => {
      sidebarOverlay.hidden = true;
    }, SIDEBAR_TRANSITION_MS);
  } else {
    sidebarOverlay.classList.remove('visible');
    sidebarOverlay.hidden = true;
  }
}

function buildCategoryLabelMap() {
  const map = new Map();
  Object.entries(categories).forEach(([type, list]) => {
    list.forEach((category) => {
      map.set(`${type}:${category.id}`, category.label);
    });
  });
  return map;
}

function formatCategoryLabel(item) {
  return categoryLabelMap.get(`${item.type}:${item.category}`) ?? item.category;
}

function findItemById(id) {
  return itemMap.get(id) ?? null;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', 'true');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch (fallbackError) {
      console.error('Copy failed', fallbackError);
      return false;
    }
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  clearTimeout(toastHideTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
    toastHideTimeout = setTimeout(() => {
      toast.hidden = true;
    }, 200);
  }, 1800);
}

function readStoredArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeStoredArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore storage failures (e.g., Safari private mode)
  }
}
