/**
 * Represents a podcast season.
 */
class Season {
    /**
     * @param {string} title - The season's title.
     * @param {string} description - A short description of the season.
     * @param {number} episodes - The number of episodes in the season.
     */
    constructor(title, description, episodes) {
      this.title = title;
      this.description = description;
      this.episodes = episodes;
    }
  
    /**
     * Render season information as a DOM element.
     * @returns {HTMLElement} Season card element.
     */
    render() {
      const seasonDiv = document.createElement("div");
      seasonDiv.className = "season-item";
      seasonDiv.innerHTML = `
        <h4>${this.title}</h4>
        <p>${this.description}</p>
        <div class="season-episodes">${this.episodes} episodes</div>
      `;
      return seasonDiv;
    }
  }
  
  /**
   * Represents a podcast show.
   */
  class Podcast {
    /**
     * @param {string} title - The podcast title.
     * @param {string} description - Description of the podcast.
     * @param {string[]} genres - List of genres for the podcast.
     * @param {string} coverImage - URL/path to the cover image.
     * @param {Date} updated - Last updated date.
     * @param {Season[]} seasons - Array of seasons.
     */
    constructor(title, description, genres, coverImage, updated, seasons = []) {
      this.title = title;
      this.description = description;
      this.genres = genres;
      this.coverImage = coverImage;
      this.updated = updated;
      this.seasons = seasons;
    }
  
    /**
     * Render podcast preview card for the grid.
     * @returns {HTMLElement} Podcast card element.
     */
    renderCard() {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${this.coverImage}" alt="${this.title} cover">
        <div class="card-content">
          <h3>${this.title}</h3>
          <p>${this.seasons.length} seasons</p>
          <div class="tags">${this.genres.map(g => `<span>${g}</span>`).join("")}</div>
          <small>Updated ${this.updated.toDateString()}</small>
        </div>
      `;
  
      card.onclick = () => this.openModal();
      return card;
    }
  
    /**
     * Render podcast details inside a modal view.
     */
    openModal() {
      const modal = document.getElementById("modal");
      const modalContent = document.getElementById("modal-content");
  
      modalContent.innerHTML = `
        <div class="modal-header">
          <h2>${this.title}</h2>
          <span class="close-btn" id="modal-close">&times;</span>
        </div>
        <div class="modal-body">
          <img src="${this.coverImage}" alt="${this.title} large cover" class="large-cover">
          <p>${this.description}</p>
          <div class="tags">${this.genres.map(g => `<span>${g}</span>`).join("")}</div>
          <small>Last updated: ${this.updated.toDateString()}</small>
          <h3>Seasons</h3>
          <div class="season-list"></div>
        </div>
      `;
  
      const seasonList = modalContent.querySelector(".season-list");
      this.seasons.forEach(season => seasonList.appendChild(season.render()));
  
      // Open modal
      modal.style.display = "block";
  
      // Close button
      document.getElementById("modal-close").onclick = () => {
        modal.style.display = "none";
      };
      // Close on backdrop click
      modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
      };
    }
  }
  
  /**
   * Render all podcasts on the grid.
   * @param {Podcast[]} podcasts - Array of podcast objects.
   */
  function renderGrid(podcasts) {
    const grid = document.getElementById("podcast-grid");
    grid.innerHTML = "";
    podcasts.forEach(podcast => grid.appendChild(podcast.renderCard()));
  }
  
  // --------------------
  // Example Data
  // --------------------
  const podcasts = [
    new Podcast(
      "TechTalk Weekly",
      "Latest trends and insights in technology and business.",
      ["Technology", "Business", "Innovation", "Entrepreneurship"],
      "cover1.png",
      new Date("2025-01-15"),
      [
        new Season("Season 1: Getting Started", "Introduction to fundamentals", 12),
        new Season("Season 2: Advanced Topics", "Deep dives into complex subjects", 15),
        new Season("Season 3: Industry Insights", "Expert perspectives", 18),
        new Season("Season 4: Future Trends", "What's coming next in tech", 20),
      ]
    ),
    new Podcast(
      "Health Matters",
      "Wellness, fitness, and healthy lifestyle choices.",
      ["Health", "Lifestyle"],
      "cover2.png",
      new Date("2025-01-10"),
      [
        new Season("Season 1: Nutrition", "Healthy eating made simple", 10),
        new Season("Season 2: Mental Wellness", "Mindfulness and stress relief", 8),
      ]
    ),
  ];
  
  // --------------------
  // Initialize
  // --------------------
  document.addEventListener("DOMContentLoaded", () => {
    renderGrid(podcasts);
  });
  