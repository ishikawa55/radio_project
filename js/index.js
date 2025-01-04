document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();
});

let favoritesVisible = true; // お気に入り表示状態の管理

// お気に入りデータを読み込んで表示
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  const favoritesList = document.getElementById("favorites-list");
  favoritesList.innerHTML = ""; // リストをリセット

  for (const [id, title] of Object.entries(favorites)) {
    const listItem = document.createElement("li");
    listItem.textContent = title;
    listItem.addEventListener("click", () => {
      location.href = `html/${id}.html`;
    });
    favoritesList.appendChild(listItem);
  }

  updateToggleButton(favorites);
}

// お気に入りの表示・非表示を切り替え
function toggleFavorites() {
  favoritesVisible = !favoritesVisible;
  const favoritesList = document.getElementById("favorites-list");
  const toggleButton = document.getElementById("toggle-favorites");

  if (favoritesVisible) {
    favoritesList.style.display = "block";
    toggleButton.textContent = "お気に入りを非表示";
  } else {
    favoritesList.style.display = "none";
    toggleButton.textContent = "お気に入りを表示";
  }
}

// ボタンの状態を更新（お気に入りが空の場合は非表示に）
function updateToggleButton(favorites) {
  const toggleButton = document.getElementById("toggle-favorites");
  if (Object.keys(favorites).length === 0) {
    toggleButton.style.display = "none"; // ボタンを非表示
  } else {
    toggleButton.style.display = "inline-block"; // ボタンを表示
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





// すべての項目を表示
function showAllItems() {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.style.display = "block";
  });
}





// メニューの表示・非表示を切り替える関数
function toggleMenu() {
  const menu = document.getElementById('menu_bar');
  menu.classList.toggle('active');
}