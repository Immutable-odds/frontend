export const animateDisplay = (target:any, animationClass:any, displayType:any, timeout:any) => {
	// timeout should be longer than css transition
	let doneTimedDisplay = false,
		displaying = false;

	target.addEventListener('transitionend', () => {
		if (!target.classList.contains('show')) {
			target.style.display = 'none';
		}
		doneTimedDisplay = true;
	});
	if (!target.style.display || target.style.display === 'none') {
		displaying = true;
		target.style.display = displayType;
	} else {
		displaying = false;
	}

	setTimeout(() => {
		target.classList.toggle(animationClass);
		doneTimedDisplay = false;
	}, 10);

	if (!displaying) {
		setTimeout(() => {
			// failsafe for transitioned not firing
			if (!doneTimedDisplay) {
				target.style.display = 'none';
			}
			doneTimedDisplay = true;
		}, timeout);
	}
};
