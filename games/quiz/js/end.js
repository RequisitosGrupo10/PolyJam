document.addEventListener('DOMContentLoaded', () => {

    const mostRecentScore = localStorage.getItem('mostRecentScore');

    document.dispatchEvent(new CustomEvent("end", {
        bubbles: true,
        detail: { score: mostRecentScore }
    }));
})