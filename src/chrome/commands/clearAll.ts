const clearAll = () => {
	const injectedElements = document.querySelectorAll('.meu-rh-plus-injected');

	injectedElements.forEach((element) => element.remove());
};

export default clearAll;
