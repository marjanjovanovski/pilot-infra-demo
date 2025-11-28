document.addEventListener("DOMContentLoaded", function() {


	
	const rotateCraft = document.getElementById("rotateCraft");
	const rotateStarCluster = document.getElementById("rotateStarCluster");
	const btn_rotation_Right = document.getElementById("btn_rotation_Right");
	const btn_rotation_Left = document.getElementById("btn_rotation_Left");
	
	

	let rotationSpeed = 0.053;
	let angle = 250;
	let direction = 1; // 1 = clockwise, -1 = counter-clockwise
	let animationFrame;
	let isStopped = false; // New flag to track if rotation is stopped
	
	//Start rotation on page load
	
	updateRotation();
	
	
	function updateRotationButtons() {
		
		//rotation right btn
		if(rotationSpeed > 5.5 && direction > 0)
		{
			btn_rotation_Right.classList.add("disabled");
			console.log("G force balancer exceeding operational limits past this speed rotation point");
		}
		else
		{
			btn_rotation_Right.classList.remove("disabled");
		}
		
		//rotation left btn
		if (rotationSpeed > 5.5 && direction < 0) 
		{
			btn_rotation_Left.classList.add("disabled");
			console.log("G force balancer exceeding operational limits past this speed rotation point");
		}
		else 
		{
			btn_rotation_Left.classList.remove("disabled");
		}
		
		
		
	}
	
	
	
	function updateRotation() {
		
		
		angle += rotationSpeed * direction;
		
		rotateCraft.style.transform = `rotate(${angle}deg)`;
		rotateStarCluster.style.transform = `rotate(${angle}deg)`;
		
		animationFrame = requestAnimationFrame(updateRotation);
		
		//console.log(rotationSpeed);
	}

	function stopRotation() {
		//console.log("STOP ANIM");
		isStopped = true; // Mark rotation as stopped
		rotationSpeed = 0;
		cancelAnimationFrame(animationFrame);
		animationFrame = null;
	}

	btn_rotation_Right.addEventListener("click", () => {
		
		if (isStopped) {
			// If previously stopped, reset and start moving right
			isStopped = false;
			direction = 1;
			rotationSpeed = 0.1;
			updateRotation();
		} else if (rotationSpeed > 0 && direction === -1) {
			// If moving left, rotation_dec speed exponentially until 0, then switch to right
			rotationSpeed /= 1.5;
			if (rotationSpeed < 0.05) {
				stopRotation();
			}
		} else {
			// Otherwise, just rotation_inc right rotation exponentially
			rotationSpeed = rotationSpeed === 0 ? 0.5 : rotationSpeed * 1.5;
			direction = 1;
			if (!animationFrame) updateRotation();
		}
		updateRotationButtons();
	});

	btn_rotation_Left.addEventListener("click", () => {
		
		if (isStopped) {
			// If previously stopped, reset and start moving left
			isStopped = false;
			direction = -1;
			rotationSpeed = 0.1;
			updateRotation();
		} else if (rotationSpeed > 0 && direction === 1) {
			// If moving right, rotation_dec speed exponentially until 0, then switch to left
			rotationSpeed /= 1.5;
			if (rotationSpeed < 0.05) {
				stopRotation();
			}
		} else {
			// Otherwise, just rotation_inc left rotation exponentially
			rotationSpeed = rotationSpeed === 0 ? 0.5 : rotationSpeed * 1.5;
			direction = -1;
			if (!animationFrame) updateRotation();
		}
		updateRotationButtons();
	});

});