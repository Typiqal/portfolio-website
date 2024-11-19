console.clear();

// Register plugins
gsap.registerPlugin(Draggable, ScrollToPlugin);


// Function to create draggable track
function createDraggableTrack(containerSelector) {
  const trackContainer = document.querySelector(containerSelector);

  // Initialize the Draggable instance
  const draggableInstance = Draggable.create(trackContainer, {
    type: "x",
    bounds: {
      maxX: 0,
      minX: window.innerWidth - trackContainer.scrollWidth - 50
    },
  })[0]; // Get the instance

  // Add event listener to the .categories links
  const categoryLinks = document.querySelectorAll(`.categories a[data-target="${containerSelector}"]`);
  categoryLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default anchor link behavior

      // Check if the container is the first track
      if (containerSelector === '.container.first-track') {
        // For the first track, simply scroll to the target element
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        target.scrollIntoView({ behavior: 'smooth', block:   
 'start' });

        gsap.to(draggableInstance.target, {
          x: targetPosition,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  });
}

// Select all category anchor links and assign data attributes
document.querySelectorAll('.categories a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
          // Smooth scroll to the target element
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  });
});


// Wait for the page to load fully before initializing
window.addEventListener("load", () => {
  // Initialize each track with a separate selector
  createDraggableTrack('.container.first-track');
  createDraggableTrack('.container.second-track');
  createDraggableTrack('.container.third-track');
});
