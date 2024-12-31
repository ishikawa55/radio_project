// お気に入りの状態を保持するオブジェクト
const favorites = {};

// 要素を取得
const searchBar = document.getElementById("search-bar");
const menuList = document.getElementById("menu-list");
// const menuItems = menuList.getElementsByClassName("menu-item");
const favoriteToggle = document.getElementById("favorite-toggle");
const favoriteIcons = document.querySelectorAll(".favorite-icon");

// お気に入りのみ表示する状態
let showOnlyFavorites = false;

// 検索バーの入力イベントを監視
searchBar.addEventListener("input", filterMenu);

// お気に入りのみ表示ボタンのクリックイベントを監視
favoriteToggle.addEventListener("click", () => {
    showOnlyFavorites = !showOnlyFavorites;
    favoriteToggle.textContent = showOnlyFavorites ? "全て表示" : "お気に入りのみ";
    filterMenu();
});

// 星アイコンをクリックしたときのお気に入り切り替え機能
favoriteIcons.forEach(icon => {
    icon.addEventListener("click", (event) => {
        event.stopPropagation(); // 親のクリックイベントを防ぐ
        const id = icon.getAttribute("data-id"); // クリックされたアイコンのIDを取得
        toggleFavorite(id); // お気に入りの状態を切り替える
    });
});

// お気に入りの状態を切り替える
function toggleFavorite(id) {
    favorites[id] = !favorites[id]; // お気に入り状態を反転
    updateFavorites();
    filterMenu(); // 状態変更後に再度フィルタリングを実行
}

// お気に入りアイコンの状態を更新
function updateFavorites() {
    document.querySelectorAll(".favorite-icon").forEach(icon => {
        const id = icon.getAttribute("data-id");
        if (favorites[id]) {
            icon.classList.remove("not-favorite");
            icon.classList.add("favorite");
        } else {
            icon.classList.remove("favorite");
            icon.classList.add("not-favorite");
        }
    });
}

// メニューをフィルタリング
function filterMenu() {
    const query = searchBar.value.toLowerCase();
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const id = item.querySelector(".favorite-icon").getAttribute("data-id");
        const isFavorite = favorites[id];
        const matchesSearch = text.includes(query);
        const matchesFavorite = showOnlyFavorites ? isFavorite : true;
        if (matchesSearch && matchesFavorite) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

