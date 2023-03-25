class Footer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // Element functionality written in here
    this.innerHTML = `<footer>
        <ul>
        <li><a>About</a></li>
        <li><a>Contact</a></li>
        </ul>
        </footer>
        `;
    this.setAttribute("role", "contentinfo");
    this.setAttribute("aria-label", "Información de pie de página");
  }
}

customElements.define("custom-footer", Footer);
