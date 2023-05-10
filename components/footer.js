class Footer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // Element functionality written in here
    this.innerHTML = `<footer>
        <p>This page was created using HTML, CSS and JavaScript</p>
        </footer>
        `;
    this.setAttribute("role", "contentinfo");
    this.setAttribute("aria-label", "Información de pie de página");
  }
}

customElements.define("custom-footer", Footer);
