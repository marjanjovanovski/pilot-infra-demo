document.addEventListener("DOMContentLoaded", function () 
{
	const loaderDiv = document.getElementById("div_placeholder");
	
	const div_menu = document.getElementById("div_menu");
	const ul_menu = document.getElementById("ul_menu");
    const btn_burger_menu = document.getElementById("btn_burger_menu");
	
    const pilot = document.getElementById("10_pilot");
    
    const meetme = document.getElementById("30_meetme");
    const carryons = document.getElementById("40_carryons");
    
    
    
    const portfolio = document.getElementById("71_portfolio");
	
    //const inspiredby = document.getElementById("80_inspiredby");
	//const credits = document.getElementById("90_credits");
	
	const btn_bgAudio = document.getElementById("btn_bgAudio");
	

	
	//loadContent("res/content/inspiredby.html", loaderDiv);
	loadContent("res/content/71_portfolio.html", loaderDiv);
	//loadContent("res/content/designercraving.html", loaderDiv);
    
	//Load content dynamically
    function loadContent(url, targetElement, hash = "") {
    const bustingUrl = `${url}?v=${Date.now()}`;

		fetch(bustingUrl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text();
			})
			.then(data => {
				// Empty any content
				loaderDiv.innerHTML = "";

				// Load new content
				targetElement.innerHTML = data;

				// Scroll to anchor if there was a hash in the URL
				//const hash = window.location.hash;
				//console.log(hash);
				if (typeof hash === "string" && hash.startsWith("#")) {
					// Delay to ensure DOM is fully updated before scrolling
					setTimeout(() => {
						const target = targetElement.querySelector(hash);
						if (target) {
							target.scrollIntoView({ behavior: "smooth" });
							
							//animate bg color of the element to grab user focus
							target.classList.add("highlight_flash");
							setTimeout(() => {
								target.classList.remove("highlight_flash");
							}, 5000); // Match with CSS animation duration
						}
					}, 0);
				}
			})
			.catch(error => {
				console.error("Error loading content:", error);
				targetElement.innerHTML = "<p>Error loading content.</p>";
			});
	}
	
	//external linked navigation
	document.addEventListener("click", function (e) {
		const target = e.target.closest("[data-load-content]");
		if (target) {
			e.preventDefault(); // prevents "#" apear in URL
			
			//add click animation changed to CSS
			//btnClickAnimation(target);
			
			//exclude a from having a click sound
			/*if (target.tagName.toLowerCase() !== "a") {
				playSoundClick();
			}*/
			
			playSoundClick();
			
			const url = target.getAttribute("data-load-content");
			// Extract hash from href if present (e.g. href="#emr")
			let hash = "";
			const href = target.getAttribute("href");
			if (href && href.includes("#")) {
				hash = href.substring(href.indexOf("#"));
			}
			setTimeout(() => {
				loadContent(url, loaderDiv, hash);
			}, 100); 
			//loadContent(url, loaderDiv, hash);
		}
	});
	
	
	//add sounds to button/div and a dynamically
	let lastHovered = null;

	document.addEventListener("mouseover", function (e) {
		const button = e.target.closest(".next_step_button");
		const link = e.target.closest("a");

		const hovered = button || link;

		if (
			hovered &&
			hovered !== lastHovered &&
			
			(!e.relatedTarget || !hovered.contains(e.relatedTarget))
		) {
			lastHovered = hovered;
			playSoundEnter();
		}
	});

	document.addEventListener("mouseout", function (e) {
		const leftElement = e.target.closest(".next_step_button, a");
		if (leftElement && leftElement === lastHovered) {
			lastHovered = null;
		}
	});
	
	document.addEventListener("click", function (e) {
		const link = e.target.closest("a");

		// Make sure it's not a data-load-content link (already handled above)
		if (link && !link.hasAttribute("data-load-content")) {
			playSoundClick();
		}
	});


    
    //10
	pilot.addEventListener("click", function () {
		
        loadContent("res/content/10_pilot.html", loaderDiv);
    });	
	
	
	//30
	meetme.addEventListener("click", function () {
		
        loadContent("res/content/30_meetme.html", loaderDiv);
    });	
	
	
	//40
	carryons.addEventListener("click", function () {
		
        loadContent("res/content/40_carryons.html", loaderDiv);
    });	
	
	
	
	
	
	
	//71
	
	portfolio.addEventListener("click", function () {
		
        loadContent("res/content/71_portfolio.html", loaderDiv);
    });
	
	//80
	/*
	inspiredby.addEventListener("click", function () {
		
        loadContent("res/content/80_inspiredby.html", loaderDiv);
    });
	*/
	
	//90
	/*
	credits.addEventListener("click", function () {
		
        loadContent("res/content/90_credits.html", loaderDiv);
    });
	*/
	
	

    

    // Ensure menu starts hidden on page load
    div_menu.classList.add("hidden");

    btn_burger_menu.addEventListener("click", function (event) {		
        div_menu.classList.toggle("hidden");

        if (!div_menu.classList.contains("hidden")) {
			ul_menu.classList.remove("hide_ul");
			btn_bgAudio.classList.remove("hide_bg_audio_icon");
            div_menu.style.opacity = "1";
            div_menu.style.transform = "translateX(-50%) translateY(0)";
        } else {
			hideMenu();
        }
		
    });

    document.addEventListener("click", function (event) {
        if (!div_menu.contains(event.target) && !btn_burger_menu.contains(event.target)) {
            hideMenu();
        }
    });

    document.querySelectorAll(".menu li").forEach(item => {
        item.addEventListener("click", function () {
            hideMenu();
        });
    });
	
	function hideMenu()
	{
		div_menu.classList.add("hidden");
		ul_menu.classList.add("hide_ul");
		btn_bgAudio.classList.add("hide_bg_audio_icon");
		div_menu.style.opacity = "0";
		div_menu.style.transform = "translateX(-50%) translateY(100%)";
	}

	
});
