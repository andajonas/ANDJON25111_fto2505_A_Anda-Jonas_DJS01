const podcasts = [
    {
      title: "Podcast Title",
      seasons: 3,
      genres: ["Technology", "Business"],
      updated: "2025-01-15",
      cover: "https://via.placeholder.com/300x200",
      description: "Join us every week as we dive into the latest technology trends, innovations, and industry insights. From artificial intelligence and machine learning to startup culture and digital transformation, we explore the forces shaping our digital future. Each episode features expert interviews, case studies, and actionable insights for professionals and enthusiasts alike.",
      seasonList: [
        { name: "Season 1: Getting Started", desc: "Introduction to the fundamentals", episodes: 12 },
        { name: "Season 2: Advanced Topics", desc: "Deep dives into complex subjects", episodes: 15 },
        { name: "Season 1: Getting Started", desc: "Introduction to the fundamentals", episodes: 12 },
      ]
    },
    {
      title: "Podcast Title",
      seasons: 2,
      genres: ["Comedy", "Entertainment"],
      updated: "2025-01-10",
      cover: "https://via.placeholder.com/300x200",
      description: "Laugh with comedians from around the world.",
      seasonList: [
        { name: "Season 1: Fun Times", desc: "Best jokes", episodes: 10 },
        { name: "Season 2: More Laughs", desc: "Comedy specials", episodes: 8 }
      ]
    },
    {
      title: "Podcast Title",
      seasons: 4,
      genres: ["Business", "Entrepreneurship"],
      updated: "2025-01-12",
      cover: "https://via.placeholder.com/300x200",
      description: "Interviews and insights from successful entrepreneurs.",
      seasonList: [
        { name: "Season 1: Startups", desc: "New ventures", episodes: 14 },
        { name: "Season 2: Scaling", desc: "Growth strategies", episodes: 16 }
      ]
    },
    {
      title: "Podcast Title",
      seasons: 5,
      genres: ["True Crime", "Mystery"],
      updated: "2025-01-05",
      cover: "https://via.placeholder.com/300x200",
      description: "Unsolved mysteries and chilling true crime stories.",
      seasonList: [
        { name: "Season 1: Cold Cases", desc: "Unresolved crimes", episodes: 12 },
        { name: "Season 2: Criminal Minds", desc: "Profiles and stories", episodes: 13 }
      ]
    },
    {
      title: "Podcast Title",
      seasons: 6,
      genres: ["Health", "Lifestyle"],
      updated: "2025-01-14",
      cover: "https://via.placeholder.com/300x200",
      description: "Tips and discussions on wellness, fitness, and healthy eating.",
      seasonList: [
        { name: "Season 1: Nutrition", desc: "Eating right", episodes: 10 },
        { name: "Season 2: Fitness", desc: "Exercise routines", episodes: 12 }
      ]
    },
    {
      title:"Podcast Title",
      seasons: 7,
      genres: ["History", "Education"],
      updated: "2025-01-09",
      cover: "https://via.placeholder.com/300x200",
      description: "Exploring fascinating stories from history.",
      seasonList: [
        { name: "Season 1: Ancient Times", desc: "Civilizations", episodes: 11 },
        { name: "Season 2: Modern History", desc: "World events", episodes: 14 }
      ]
    },
    {
      title: "Podcast Title",
      seasons: 8,
      genres: ["Sports", "News"],
      updated: "2025-01-07",
      cover: "https://via.placeholder.com/300x200",
      description: "Weekly sports analysis, interviews, and news updates.",
      seasonList: [
        { name: "Season 1: Football", desc: "Game highlights", episodes: 20 },
        { name: "Season 2: Global Sports", desc: "Around the world", episodes: 18 }
      ]
    },
    {
      title: "Podcast Title",
      seasons: 3,
      genres: ["Science", "Nature"],
      updated: "2025-01-06",
      cover: "https://via.placeholder.com/300x200",
      description: "Conversations about the environment, animals, and natural wonders.",
      seasonList: [
        { name: "Season 1: Wildlife", desc: "Animal world", episodes: 12 },
        { name: "Season 2: Oceans", desc: "Life underwater", episodes: 10 }
      ]
    }
  ];
  
  // Elements
  const grid = document.getElementById("podcastGrid");
  const modal = document.getElementById("podcastModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.querySelector(".close");
  const genreFilter = document.getElementById("genreFilter");
  const sortFilter = document.getElementById("sortFilter");
  
  // Render podcast cards
  function renderGrid(list) {
    grid.innerHTML = "";
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.cover}" alt="cover">
        <div class="title">${p.title}</div>
        <div>${p.seasons} seasons</div>
        <div class="tags">${p.genres.map(g => `<span class="tag">${g}</span>`).join("")}</div>
        <small>Updated: ${new Date(p.updated).toDateString()}</small>
      `;
      card.onclick = () => openModal(p);
      grid.appendChild(card);
    });
  }
  
  function openModal(p) {
    modal.classList.remove("hidden");
    modalBody.innerHTML = `
      <div class="modal-header">
        <img src="${p.cover}" alt="cover">
        <div class="modal-details">
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          <div class="tags">${p.genres.map(g => `<span class="tag">${g}</span>`).join("")}</div>
          <div class="updated">📅 Last updated: ${new Date(p.updated).toDateString()}</div>
        </div>
      </div>
  
      <div class="seasons">
        <h3>Seasons</h3>
        ${p.seasonList.map(s => `
          <div class="season-item">
            <div class="season-info">
              <h4>${s.name}</h4>
              <p>${s.desc}</p>
            </div>
            <div class="season-episodes">${s.episodes} episodes</div>
          </div>
        `).join("")}
      </div>
    `;
  }
  
  
  // Close modal
  closeBtn.onclick = () => modal.classList.add("hidden");
  modal.onclick = e => { if (e.target === modal) modal.classList.add("hidden"); };
  
  // Filters
  function applyFilters() {
    let filtered = [...podcasts];
    const genre = genreFilter.value;
    const sort = sortFilter.value;
  
    if (genre !== "all") {
      filtered = filtered.filter(p => p.genres.includes(genre));
    }
  
    if (sort === "recent") {
      filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sort === "seasons") {
      filtered.sort((a, b) => b.seasons - a.seasons);
    }
  
    renderGrid(filtered);
  }
  
  genreFilter.onchange = applyFilters;
  sortFilter.onchange = applyFilters;
  
  // Init
  applyFilters();
  