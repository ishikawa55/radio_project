let showOnlyFavorites = false; // お気に入りフィルタの状態管理

// ページ読み込み時の初期化処理
document.addEventListener("DOMContentLoaded", () => {
  restoreFavorites();
  if (showOnlyFavorites) {
    applyFavoriteFilter();
  }
});

// お気に入りのトグル
function toggleFavorite(id, event) {
  event.stopPropagation(); // 親ボタンへのクリックイベントを防止
  const icon = document.querySelector(`.favorite-icon[data-id="${id}"]`);
  const isFavorite = icon.classList.contains("favorite");

  if (isFavorite) {
    icon.classList.remove("favorite");
    icon.classList.add("not-favorite");
    updateFavoriteInStorage(id, false);
  } else {
    icon.classList.remove("not-favorite");
    icon.classList.add("favorite");
    updateFavoriteInStorage(id, true);
  }
}

// ローカルストレージにお気に入り状態を保存
function updateFavoriteInStorage(id, isFavorite) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  favorites[id] = isFavorite;
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// お気に入り状態を復元
function restoreFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  for (const [id, isFavorite] of Object.entries(favorites)) {
    const icon = document.querySelector(`.favorite-icon[data-id="${id}"]`);
    if (icon) {
      if (isFavorite) {
        icon.classList.add("favorite");
        icon.classList.remove("not-favorite");
      } else {
        icon.classList.add("not-favorite");
        icon.classList.remove("favorite");
      }
    }
  }
}

// 「お気に入りのみ」をトグル
function toggleFavoriteFilter() {
  showOnlyFavorites = !showOnlyFavorites;
  const filterButton = document.getElementById("favorite-filter");

  if (showOnlyFavorites) {
    filterButton.textContent = "すべて表示";
    applyFavoriteFilter();
  } else {
    filterButton.textContent = "お気に入りのみ";
    showAllItems();
  }
}

// お気に入りフィルタを適用
function applyFavoriteFilter() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const favoriteIcon = item.querySelector(".favorite-icon");
    const id = favoriteIcon.getAttribute("data-id");

    if (favorites[id]) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// すべての項目を表示
function showAllItems() {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.style.display = "block";
  });
}

// 検索バーのフィルタリング
function filterBySearch() {
  const searchText = document.getElementById("search-bar").value.toLowerCase();
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const menuText = item.querySelector(".menu-text").textContent.toLowerCase();

    if (menuText.includes(searchText)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  // 「お気に入りのみ」が有効の場合は再適用
  if (showOnlyFavorites) {
    applyFavoriteFilter();
  }
}
