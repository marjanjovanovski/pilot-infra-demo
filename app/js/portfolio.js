document.addEventListener("DOMContentLoaded", function () 
{
	
	let currentImageList = [];
let currentImageIndex = 0;
let currentFolder = "";

document.addEventListener("click", function (e) {
	const modalTrigger = e.target.closest("a[data-modal-id]");
	if (modalTrigger) {
		e.preventDefault();

		const modalId = modalTrigger.getAttribute("data-modal-id");
		const folderName = modalTrigger.getAttribute("data-folder");
		const modal = document.getElementById(modalId);

		if (modal && folderName) {
			currentFolder = folderName;
			const jsonPath = `res/portfolio/${folderName}/images.json`;

			fetch("res/content/modal.html")
				.then(response => {
					if (!response.ok) throw new Error("Modal template failed to load.");
					return response.text();
				})
				.then(html => {
					modal.innerHTML = html;
					modal.classList.remove("fade-out");
					modal.style.display = "flex";
					void modal.offsetWidth; // force reflow
					modal.classList.add("visible");

					// After modal is ready, fetch the image list
					return fetch(jsonPath);
				})
				.then(response => {
					if (!response.ok) {
						console.warn("Image JSON not found.");
						return null;
					}
					return response.json();
				})
				.then(data => {
					if (!data || !Array.isArray(data.images) || data.images.length === 0) {
						console.warn("No images found or invalid JSON structure.");
						return;
					}
					currentImageList = data.images;
					currentImageIndex = 0;
					displayCurrentImage();
				})
				.catch(error => {
					console.error("Error during modal or image loading:", error);
				});
		}
	}

	// Close icon logic
	const closeIcon = e.target.closest(".spn_close_modal");
	if (closeIcon) {
		const modal = document.getElementById("portfolio_modal");
		if (modal) {
			modal.classList.remove("visible");
			modal.classList.add("fade-out");

			// Wait for transition to finish
			const onTransitionEnd = () => {
				modal.removeEventListener("transitionend", onTransitionEnd);

				modal.style.display = "none";
				modal.innerHTML = "";
				modal.classList.remove("fade-out");

				// Reset state
				currentImageList = [];
				currentImageIndex = 0;
				currentFolder = "";
			};

			modal.addEventListener("transitionend", onTransitionEnd);
		}
	}
});

// Display the image based on current index
function displayCurrentImage() {
	const modal = document.getElementById("portfolio_modal");
	const container = modal.querySelector("#portfolioImageLoader");

	if (!modal || !container || !currentImageList.length) return;

	container.innerHTML = ""; // Clear previous

	const img = document.createElement("img");
	img.src = `res/portfolio/${currentFolder}/${currentImageList[currentImageIndex]}`;
	img.alt = `Image ${currentImageIndex + 1}`;
	img.style.maxWidth = "100%";
	img.style.maxHeight = "100%";
	img.style.objectFit = "contain";

	container.appendChild(img);
}


function displayCurrentImage() {
	const modal = document.getElementById("portfolio_modal");
	const container = modal.querySelector("#portfolioImageLoader");

	if (!modal || !container || !currentImageList.length) return;

	container.innerHTML = ""; // Clear previous

	const wrapper = document.createElement("div");
	wrapper.classList.add("portfolio_image_wrapper");

	const img = document.createElement("img");
	img.src = `res/portfolio/${currentFolder}/${currentImageList[currentImageIndex]}`;
	img.alt = `Image ${currentImageIndex + 1}`;
	img.style.maxWidth = "100%";
	img.style.maxHeight = "100%";
	img.style.objectFit = "contain";
	img.onload = () => img.classList.add("loaded");

	const label = document.createElement("div");
	label.classList.add("portfolio_image_caption");
	label.textContent = `Image ${currentImageIndex + 1} of ${currentImageList.length}`;

	wrapper.appendChild(img);
	wrapper.appendChild(label);
	container.appendChild(wrapper);

	updateNavButtons();
}



function updateNavButtons() {
	const modal = document.getElementById("portfolio_modal");

	const leftArrow = modal.querySelector(".spn_nav_left");
	const rightArrow = modal.querySelector(".spn_nav_right");

	if (!leftArrow || !rightArrow) return;

	if (currentImageList.length <= 1) {
		leftArrow.style.display = "none";
		rightArrow.style.display = "none";
	} else {
		leftArrow.style.display = "block";
		rightArrow.style.display = "block";

		// Enable/Disable states
		if (currentImageIndex === 0) {
			leftArrow.style.opacity = "0.3";
			leftArrow.style.pointerEvents = "none";
		} else {
			leftArrow.style.opacity = "0.8";
			leftArrow.style.pointerEvents = "auto";
		}

		if (currentImageIndex === currentImageList.length - 1) {
			rightArrow.style.opacity = "0.3";
			rightArrow.style.pointerEvents = "none";
		} else {
			rightArrow.style.opacity = "0.8";
			rightArrow.style.pointerEvents = "auto";
		}
	}
}

	
	document.addEventListener("click", function (e) {
	// Next
	if (e.target.closest(".spn_nav_right")) {
		if (currentImageIndex < currentImageList.length - 1) {
			currentImageIndex++;
			displayCurrentImage();
		}
	}

	// Previous
	if (e.target.closest(".spn_nav_left")) {
		if (currentImageIndex > 0) {
			currentImageIndex--;
			displayCurrentImage();
		}
	}
});



});


