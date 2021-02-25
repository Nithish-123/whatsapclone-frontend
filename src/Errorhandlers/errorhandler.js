const errorhandler = (error, auth = true, classname = ".heading_name") => {
	const Removerror = document.querySelector(".error_message");
	const Adderror = document.querySelector(classname);
	if (Removerror) Removerror.remove();
	if (auth) {
		const html = `<h4 class="error_message">${error}</h4>`;
		Adderror.insertAdjacentHTML("beforebegin", html);
	}
};
export default errorhandler;
