class CommentSection extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <section id="commentSection">
        <div class="card my-2" style="background-color: #cfd8dc">
          <h2 class="h3 text-center mt-2">Comments</h2>
          <div class="container my-1 py-1 text-dark" id="mainCommentContainer">
            <div class="row d-flex justify-content-center">
              <div class="col-md-11 col-lg-11 col-xl-11" id="parentDiv">
                <div class="d-flex flex-start mb-4 commentDiv">
                  <div class="card w-100">
                    <div class="card-body p-4">
                      <article class="">
                        <strong class="h4">Johny Cash</strong>
                        <p class="small updatedTimestamp">3 hours ago</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </article>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-start mb-4 commentDiv">
                  <div class="card w-100">
                    <div class="card-body p-4">
                      <article class="">
                        <strong class="h4">Mindy Campbell</strong>
                        <p class="small updatedTimestamp">5 hours ago</p>
                        <p>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </p>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-end">
              <button type="button" class="btn btn-primary my-2 me-3" id="addCommentBtn">
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </section>
        `;

    this.setAttribute("role", "comment section");
    this.setAttribute("aria-label", "User comments");
  }
}
customElements.define("custom-comment-section", CommentSection);
