class Footer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // Element functionality written in here
    this.innerHTML = `<footer>
<<<<<<< Updated upstream
        <div class="container text-center"><p>This page was created using HTML, CSS and JavaScript</p><div>
=======
        <p>This page was created using HTML, CSS and JavaScript</p>
>>>>>>> Stashed changes
        </footer>
        `;
    this.setAttribute("role", "contentinfo");
    this.setAttribute("aria-label", "Información de pie de página");
  }
}

customElements.define("custom-footer", Footer);
