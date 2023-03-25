class Navbar extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
      this.current = window.location.pathname;
      console.log(this.current);
    }

    connectedCallback()
    {
      const links = [
        { url: "/", label: "Inicio" },
        { url: "/games/matchPairs/matchPairs.html", label: "Match Pairs" },
        { url: "/games/quiz/quiz.html", label: "Quiz" },
        { url: "/games/minesweeper/minesweeper.html", label: "MineSweeper" }
      ];
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">PolyJam</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
          ${links.map(link => `
              <li class="nav-item">
                <a href="${link.url}" ${this.current === link.url ? 'aria-current="page" class="nav-link active"' : ' class="nav-link"'}>
                  ${link.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </nav>
      `;
      this.appendChild(document.createElement("span"))
      this.setAttribute('role', 'navigation');
      this.setAttribute('aria-label', 'Navegación de la página');
    }
  }

customElements.define("custom-navbar", Navbar);