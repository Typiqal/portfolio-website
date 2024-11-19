console.clear();

// Register plugins
gsap.registerPlugin(Draggable, ScrollToPlugin);

// Function to create draggable track
function createDraggableTrack(containerSelector) {
  const trackContainer = document.querySelector(containerSelector);

  if (!trackContainer) return; // Guard clause to avoid errors if container is missing

  Draggable.create(trackContainer, {
    type: "x",
    bounds: {
      maxX: 0,
      minX: window.innerWidth - trackContainer.scrollWidth - 50
    },
  });
}

// Function to handle smooth scrolling for .categories links
function initializeCategoryLinks() {
  document.querySelectorAll('.categories a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor link behavior

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        // Smooth scroll to the target element
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize draggable tracks and category links
function initializeApp() {
  const tracks = [
    '.container.first-track',
    '.container.second-track',
    '.container.third-track',
  ];

  tracks.forEach(createDraggableTrack);
  initializeCategoryLinks();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);
