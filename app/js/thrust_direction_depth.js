document.addEventListener("DOMContentLoaded", function () {
    
	const div_VelikaSystemDirectionMove = document.getElementById("div_VelikaSystemDirectionMove");
    const divId_VelikaSystemContainer = document.getElementById("divId_VelikaSystemContainer");
	
	const moveStarCluster = document.getElementById("divId_StarClusterMileContainer");
    
    const btn_slide_up = document.getElementById("btn_slide_up");
    const btn_slide_right = document.getElementById("btn_slide_right");
    const btn_slide_down = document.getElementById("btn_slide_down");
    const btn_slide_left = document.getElementById("btn_slide_left");
	const btn_recenter = document.getElementById("btn_recenter");
	
	
	const screenWidth = document.documentElement.clientWidth;
	const screenHeight = document.documentElement.clientHeight;
	

	

    let widthDiv = 0; 
    const originWidthDiv = divId_VelikaSystemContainer.offsetWidth;
    const originWidthDiv1 = div_VelikaSystemDirectionMove.offsetWidth;


    let targetDirX = 0;
    let targetDirY = 0;

    let currentX = 0;
    let currentY = 0;
    const maxMove = 5000;
	
	
	
	//X axis offset to the left
	let startPositionX = (originWidthDiv-screenWidth)/2;
	//console.log("Computed startPositionX:", startPositionX);
	//correct position but its not operating on the center screen, wrong div is moved
	//divId_VelikaSystemContainer.style.left=startPositionX+"px";
	
	let temp=-startPositionX-screenWidth;
	
	div_VelikaSystemDirectionMove.style.transform = `translate(${temp}px, -50%)`;
	
	//smoothMove(temp,0);
	const rect = div_VelikaSystemDirectionMove.getBoundingClientRect();
	
	
	/*
	console.log(`div_VelikaSystemDirectionMove: ${rect.left}, Top: ${rect.top}`);
	console.log("currentX:", currentX);
	console.log("currentY:", currentY);
		
	console.log("currentX:", currentX);
	console.log("currentY:", currentY);
	
	*/
	//working but to left
	//divId_VelikaSystemContainer.style.transform = `translate(${-startPositionX}px, -50%)`;
	
	
	//div_VelikaSystemDirectionMove.style.transform = `translate(${-startPositionX}px, -50%)`;
	//div_VelikaSystemDirectionMove.style.transform = `translate(${startPositionX}px, -50%)`;


	/*
	console.log("originWidthDiv1:", originWidthDiv1);
	console.log("screenWidth:", screenWidth);
	console.log("Computed startPositionX:", startPositionX);
	console.log(`Screen resolution: ${screenWidth}x${screenHeight}`);
	*/


	
	//div_VelikaSystemDirectionMove.style.left="10px";
    
	
	/*
	console.log(`divId_VelikaSystemContainer: ${rect.left}, Top: ${rect.top}`);
	console.log(`div_VelikaSystemDirectionMove: ${rect1.left}, Top: ${rect1.top}`);
	*/
	
	
    function updateMoveButtons() {
        btn_slide_left.disabled = (currentX <= -maxMove);
        btn_slide_right.disabled = (currentX >= maxMove);
    }

    function smoothMove(targetX, targetY) {
        
		//console.log(targetX, targetY)
		div_VelikaSystemDirectionMove.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px))`;
		moveStarCluster.style.transform = `translate(calc(-50% + ${targetX/7}px), calc(-50% + ${targetY/7}px))`;
        
		

        setTimeout(() => {
            currentX = targetX;
            currentY = targetY;
            updateMoveButtons();
        }, 500); // Match the transition duration (0.5s)
    }

    function getSlideRatio() {
        widthDiv = div_VelikaSystemDirectionMove.offsetWidth;
        let slideRatio = widthDiv / originWidthDiv;
        
        // Ensure a minimum step ratio (prevent too small movements)
        return Math.max(slideRatio, 0.1); // 0.1 ensures it's never too small
    }

    btn_slide_right.addEventListener("click", () => {
        let slideRatio = getSlideRatio();
        targetDirX += 500 * slideRatio; // Adjust right movement
        smoothMove(targetDirX, targetDirY);
    });

    btn_slide_left.addEventListener("click", () => {
        let slideRatio = getSlideRatio();
        targetDirX -= 500 * slideRatio; // Adjust left movement
        smoothMove(targetDirX, targetDirY);
    });

    btn_slide_up.addEventListener("click", () => {
        let slideRatio = getSlideRatio();
        targetDirY -= 500 * slideRatio; // Adjust upward movement
        smoothMove(targetDirX, targetDirY);
    });

    btn_slide_down.addEventListener("click", () => {
        let slideRatio = getSlideRatio();
        targetDirY += 500 * slideRatio; // Adjust downward movement
        smoothMove(targetDirX, targetDirY);
    });
	
	btn_recenter.addEventListener("click", () => {
        //console.log(screenWidth, screenHeight)
        //console.log(divId_VelikaSystemContainer.offsetWidth, divId_VelikaSystemContainer.offsetHeight)
        //console.log(divId_VelikaSystemContainer.style.left, divId_VelikaSystemContainer.style.top)
		
		
		const rect = divId_VelikaSystemContainer.getBoundingClientRect();
		const rect1 = div_VelikaSystemDirectionMove.getBoundingClientRect();
		//console.log(`divId_VelikaSystemContainer: ${rect.left}, Top: ${rect.top}`);
		//console.log(`div_VelikaSystemDirectionMove: ${rect1.left}, Top: ${rect1.top}`);
		
		div_VelikaSystemDirectionMove.style.left = "50%";
		div_VelikaSystemDirectionMove.style.top = "50%";
		div_VelikaSystemDirectionMove.style.transform = "translate(-50%, -50%)"; // Center the div perfectly
		
		moveStarCluster.style.left = "50%";
		moveStarCluster.style.top = "50%";
		moveStarCluster.style.transform = "translate(-50%, -50%)"; // Center the div perfectly
		
		targetDirX = 0;
		targetDirY = 0;

		currentX = 0;
		currentY = 0;
		
		smoothZoom(5900, 1900);
    });	

    updateMoveButtons();
	
	
	//DIRECTION END
	
	//DEPTH ZOOM BEGINS
	
	
	const divId_StarClusterMileContainer = document.getElementById("divId_StarClusterMileContainer");
	
	//initialize width hight to be less than 5000
	divId_StarClusterMileContainer.style.width = `3000px`;
	divId_StarClusterMileContainer.style.height = `3000px`;
	
	
	const btn_zoom_in = document.getElementById("btn_zoom_in");
	const btn_zoom_out = document.getElementById("btn_zoom_out");
	
	
	
	//const width = divId_VelikaSystemContainer.offsetWidth;
	//console.log(width);

	//let currentWidth = 5900;
	//let currentHeight = 1900;
	
	let currentWidth = divId_VelikaSystemContainer.offsetWidth;
	let currentHeight = divId_VelikaSystemContainer.offsetHeight;
	
	const maxZoomSize = 10000;
	const minZoomSize = 100;
	const zoomFactor = 1.5; //zoom factor
	

	function updateZoomButtons() {
		
		
		if(currentWidth <= minZoomSize)
		{
			btn_zoom_out.classList.add("disabled");
		}
		else
		{
			btn_zoom_out.classList.remove("disabled");
		}
		
		if(currentWidth >= maxZoomSize)
		{
			btn_zoom_in.classList.add("disabled");
		}
		else
		{
			btn_zoom_in.classList.remove("disabled");
		}
		//btn_zoom_out.classList.add("disabled");
	}

	
	//upon load reduced Velica's sector resolution by 3500x1231
	//resolution ration 0.35
	//smoothZoom(currentWidth-3500,currentHeight-1231);
	
	
	
	function smoothZoom(targetWidth, targetHeight) {
		
		
		divId_VelikaSystemContainer.style.width = `${targetWidth}px`;
		divId_VelikaSystemContainer.style.height = `${targetHeight}px`;

		setTimeout(() => {
			currentWidth = targetWidth;
			currentHeight = targetHeight;
			updateZoomButtons();
		}, 500); // Match the transition duration (0.5s)
		
		let X = divId_VelikaSystemContainer.getBoundingClientRect().x;
		let Y = divId_VelikaSystemContainer.getBoundingClientRect().y;
		
		
		
		//console.log("DImenzii",targetWidth, targetHeight);
		//document.getElementById("divId_VelikaSystemContainer").getBoundingClientRect();
		
		//console.log(X);
		//console.log(Y);
		
		//div_VelikaSystemDirectionMove.style.transform = `translate(calc(-50% + ${targetX}px), -50%)`;
	}

	btn_zoom_in.addEventListener("click", () => {
		
		if (currentWidth < maxZoomSize) {
			let targetWidth = Math.min(currentWidth * zoomFactor, maxZoomSize);
			let targetHeight = Math.min(currentHeight * zoomFactor, maxZoomSize);
			smoothZoom(targetWidth, targetHeight);
		}
	});

	btn_zoom_out.addEventListener("click", () => {
		if (currentWidth > minZoomSize) {
			let targetWidth = Math.max(currentWidth / zoomFactor, minZoomSize);
			let targetHeight = Math.max(currentHeight / zoomFactor, minZoomSize);
			smoothZoom(targetWidth, targetHeight);
		}
	});

	updateZoomButtons(); 
});
