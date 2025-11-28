document.addEventListener("DOMContentLoaded", function () 
{
	//const btn_settings = document.getElementById("btn_settings");
	const audio = document.getElementById("backgroundAudio");
    
	userInteracted = false;

    // Unlock audio on first interaction (click/tap)
    
	function unlockAudio() {
		if (!userInteracted) {
            audio.play().then(() => {
                userInteracted = true;
            }).catch(error => console.log("Auto-play blocked:", error));

            document.removeEventListener("click", unlockAudio);
            document.removeEventListener("touchstart", unlockAudio);
        }
    }

    //document.addEventListener("click", unlockAudio);
    //document.addEventListener("touchstart", unlockAudio); // Mobile support
	
	
	
});
