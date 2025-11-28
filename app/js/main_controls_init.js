document.addEventListener("DOMContentLoaded", function () 
{
	const hoverSound = document.getElementById("hoverSound");
	const clickSound = document.getElementById("clickSound");
	const backgroundAudio = document.getElementById("backgroundAudio");
	const btn_bgAudio = document.getElementById("btn_bgAudio");
	const i_play_bg_music = document.getElementById("i_play_bg_music");
	const loaderDiv = document.getElementById("div_placeholder");
	
	const btn_main_controls = document.querySelectorAll(".btn_main_controls"); // Replace with actual class or selector
	const menuItems = document.querySelectorAll("li"); // Replace with actual class or selector
	const additionalControlBtn = document.querySelectorAll(".spn_additional_controls"); // Replace with actual class or selector
	

	let userInteracted = false;

	document.addEventListener("click", () => {
		if (!userInteracted) {
			userInteracted = true;
		}
	}, { once: true });

	//Play Sounds
	window.playSoundEnter = playSoundEnter;
	function playSoundEnter()
	{
		if (userInteracted) {
			hoverSound.play().catch(error => console.log("Audio play blocked: ", error));
		}
	}
	
	window.playSoundClick = playSoundClick;
	function playSoundClick()
	{
		clickSound.play().catch(error => console.log("Audio play blocked: ", error));
	}
	
	btn_bgAudio.addEventListener("click", () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
            //change icon;
			i_play_bg_music.classList.replace("fa-circle-play", "fa-circle-pause");
        } else {
            backgroundAudio.pause();
            //change icon;
			i_play_bg_music.classList.replace("fa-circle-pause", "fa-circle-play");
        }
    });
	
	
	
	//END Play Sounds
	
	//Click button animation
	window.btnClickAnimation = btnClickAnimation;
	function btnClickAnimation(button) 
	{
		button.style.opacity = "0.5";
		button.style.transform = "scale(0.95)";
		
		
		setTimeout(() => {
			button.style.opacity = "1";
			//button.classList.add("fade-in");
			button.style.transform = "scale(1)";
			setTimeout(() => button.classList.remove("fade-in"), 50);
			
		}, 100);
	}

	

	btn_main_controls.forEach(button => {
		
		button.addEventListener("click", () => {btnClickAnimation(button); playSoundClick();});
	});
	
	btn_main_controls.forEach(button => {
		
		button.addEventListener("mouseenter", () => playSoundEnter());
	});
	//END Click button animation

	

	menuItems.forEach(button => {
		
		button.addEventListener("click", () => {btnClickAnimation(button); playSoundClick();});
	});
	
	menuItems.forEach(button => {
		
		button.addEventListener("mouseenter", () => playSoundEnter());
	});
	
	additionalControlBtn.forEach(button => {
		
		button.addEventListener("click", () => {btnClickAnimation(button); playSoundClick();});
	});
	additionalControlBtn.forEach(button => {
		
		button.addEventListener("mouseenter", () => playSoundEnter());
	});
	
	
	//close button - html loaded content
	document.addEventListener("click", (event) => {
		if (!(event.target instanceof Element)) return; // Ensure it's an element before using closest
		const button = event.target.closest(".spn_close_content");
		if (button) {
			btnClickAnimation(button);
			playSoundClick();
			//clear the loaded content in the placeholder div_placeholder
			loaderDiv.innerHTML = "";
		}
	});

	document.addEventListener("mouseenter", (event) => {
		if (!(event.target instanceof Element)) return; // Safety check
		const button = event.target.closest(".spn_close_content");
		if (button) {
			playSoundEnter();
		}
	}, true); // Capture phase
	//END close button - html loaded content
	
	
	//sounds for galery buttons
	document.addEventListener("click", function (e) {
		if (!(e.target instanceof Element)) return;

		const button = e.target.closest(".spn_nav_left, .spn_nav_right, .spn_close_modal");
		if (button) {
			const isNav = button.classList.contains("spn_nav_left") || button.classList.contains("spn_nav_right");
			if (!isNav || !button.classList.contains("disabled")) {
				playSoundClick();
			}
		}
	});

	document.addEventListener("mouseenter", function (e) {
		if (!(e.target instanceof Element)) return;

		const button = e.target.closest(".spn_nav_left, .spn_nav_right, .spn_close_modal");
		if (button) {
			const isNav = button.classList.contains("spn_nav_left") || button.classList.contains("spn_nav_right");
			if (!isNav || !button.classList.contains("disabled")) {
				playSoundEnter();
			}
		}
	}, true);
	
});
