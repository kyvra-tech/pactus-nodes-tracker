const toggleMenu = document.querySelector(
    "[data-toggle-nav]"
) as HTMLButtonElement;
const navbar = document.querySelector("[data-navbar]") as HTMLDivElement;
const overlayNav = document.querySelector(
    "[data-nav-overlay]"
) as HTMLDivElement;
if (toggleMenu) {
    toggleMenu.addEventListener("click", (e) => {
    e.preventDefault();
    if (toggleMenu.getAttribute("data-open-nav") === "false") {
        toggleMenu.setAttribute("data-open-nav", "true");
        overlayNav.setAttribute("data-is-visible", "true");
        document.body.classList.add("!overflow-y-hidden");
        navbar.style.height = `${navbar.scrollHeight}px`;
    } else {
        toggleMenu.setAttribute("data-open-nav", "false");
        overlayNav.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        navbar.style.height = "0px";
    }
    });

    navbar.addEventListener("click", () => {
    toggleMenu.setAttribute("data-open-nav", "false");
    overlayNav.setAttribute("data-is-visible", "false");
    document.body.classList.remove("!overflow-y-hidden");
    navbar.style.height = "0px";
    });

    overlayNav.addEventListener("click", () => {
    toggleMenu.setAttribute("data-open-nav", "false");
    overlayNav.setAttribute("data-is-visible", "false");
    document.body.classList.remove("!overflow-y-hidden");
    navbar.style.height = "0px";
    });
}
