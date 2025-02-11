// Wallpaper data structure
const wallpapers = [];
let currentPage = 1;
const itemsPerPage = 12;

// Generate wallpaper card HTML
function createWallpaperCard({ id, category, resolution }) {
  const card = document.createElement('div');
  card.className = 'wallpaper-card';
  card.innerHTML = `
    <img src="https://picsum.photos/600/400?random=${id}" alt="Wallpaper ${id}" class="wallpaper-image">
    <div class="download-overlay">
      <button class="download-btn" data-id="${id}">Download (0)</button>
      <div class="resolution-info">${resolution} • ${category}</div>
    </div>
  `;
  return card;
}

// Load more wallpapers
function loadWallpapers() {
  const grid = document.querySelector('.wallpaper-grid');
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
    const wallpaper = {
      id: i,
      category: ['Nature', 'Abstract', 'Technology', 'Minimal'][Math.floor(Math.random() * 4)],
      resolution: `${Math.floor(1920 + Math.random() * 2000)}x${Math.floor(1080 + Math.random() * 2000)}`
    };
    
    const card = createWallpaperCard(wallpaper);
    grid.appendChild(card);
  }
  currentPage++;
}

// Search functionality
document.getElementById('wallpaperSearch').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  document.querySelectorAll('.wallpaper-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(searchTerm) ? 'block' : 'none';
  });
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.textContent;
    
    document.querySelectorAll('.wallpaper-card').forEach(card => {
      const category = card.querySelector('.resolution-info').textContent.split('•')[1].trim();
      card.style.display = (filter === 'All' || category === filter) ? 'block' : 'none';
    });
  });
});

// Infinite scroll
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 500) {
    loadWallpapers();
  }
});

// Download tracking
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('download-btn')) {
    const btn = e.target;
    const id = btn.dataset.id;
    let count = localStorage.getItem(`downloads-${id}`) || 0;
    count = parseInt(count) + 1;
    localStorage.setItem(`downloads-${id}`, count);
    btn.textContent = `Download (${count})`;
  }
});

// Initial load
function generateWallpapers() {
  const grid = document.querySelector('.wallpaper-grid');
  grid.innerHTML = '';
  currentPage = 1;
  loadWallpapers();
}

// Initialize
document.addEventListener('DOMContentLoaded', generateWallpapers);