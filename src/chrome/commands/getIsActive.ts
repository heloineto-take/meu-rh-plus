const getIsActive = () => {
	const hasInjectedElement = document.querySelector('.meu-rh-plus-injected') !== null;

	return hasInjectedElement;
};

export default getIsActive;
