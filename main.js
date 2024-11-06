console.clear();
// Register plugins
gsap.registerPlugin(Draggable, ScrollToPlugin);

// Function to create draggable track with debugging
function createDraggableTrack(containerSelector) {
  const trackContainer = document.querySelector(containerSelector);

  // Debugging step: Check if the container is found
  if (!trackContainer) {
    console.error(`Container ${containerSelector} not found!`);
    return;
  }

  const cards = gsap.utils.toArray(`${containerSelector} .card`);
  const snapPoints = cards.map((card, i) => -(card.clientWidth + 50) * i);
  const mySnap = gsap.utils.snap(snapPoints);

  // Debugging step: Log the snap points to ensure they are calculated
  console.log(`Snap points for ${containerSelector}:`, snapPoints);

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

      const index = Array.from(categoryLinks).indexOf(link); // Get the index of the clicked link
      const targetPosition = snapPoints[index]; // Get the target snap point

      // Move the draggable track to the target position
      gsap.to(draggableInstance.target, {
        x: targetPosition,
        duration: 0.5,
        ease: "power2.out"
      });
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
