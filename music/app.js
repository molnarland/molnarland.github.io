const LIBRARY_FILE_NAME = "library.json";
const genres = {
  dnb: "Drum and Bass",
  dubstep: "Dubstep",
  halftime: "Halftime",
  drumstep: "Drumstep",
};

(async () => {
  const library = await fetch("library.json").then((response) =>
    response.json()
  );

  addMarkup(getMarkup(library));

  addCopyToClipboard();
  addTooltips();

  search(library);
})();

/**
 * @param {Object} library
 */
function search(library) {
  const searchInput = document.getElementById("search");

  searchInput.value = '';

  searchInput.addEventListener("keyup", (event) => {
    console.log(library);
    event.preventDefault();

    const searchText = event.target.value.trim().toLowerCase();
    if (searchText.length < 3) {
      addMarkup(getMarkup(library));
      return;
    }

    const filteredLibrary = JSON.parse(JSON.stringify(library));
    for (const genre in filteredLibrary) {
      for (const year in filteredLibrary[genre]) {
        filteredLibrary[genre][year] = filteredLibrary[genre][year].filter(
          ({ title, artist }) => {
            const content = `${artist} - ${title}`.toLowerCase();
            return content.includes(searchText);
          }
        );
      }
    }

    addMarkup(getMarkup(filteredLibrary));
  });
}

function addCopyToClipboard() {
  new ClipboardJS(".title");
}

function addTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
    const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
      title: 'Copied to clipboard!',
      placement: "auto",
      trigger: "click",
    });

    tooltipTriggerEl.addEventListener("shown.bs.tooltip", () => {
      setTimeout(() => tooltip.hide(), 1500);
    });
  });
}

/**
 * @param {{other: string, dnb: string, dubstep: string}} markup
 */
function addMarkup(markup) {
  for (const section of Object.keys(markup)) {
    document.getElementById(section).innerHTML = markup[section];
  }
}

/**
 * @param {Object} library
 * @return {{other: string, dnb: string, dubstep: string}}
 */
function getMarkup(library) {
  const markup = {
    dnb: "",
    dubstep: "",
    other: "",
  };

  for (const genre in library) {
    const section = getSectionName(genre);
    markup[section] += `<div class="genre"><h3>${genre}</h3>`;

    for (const year in library[genre]) {
      if (!library[genre][year].length) continue;

      markup[section] += `<ul class="list-group year"><h5>${year}</h5>`;

      for (const { title, artist } of library[genre][year]) {
        const content = `${artist} - ${title}`;
        const cssClass = `class="list-group-item list-group-item-action title"`;
        const dataClipBoardText = `data-clipboard-text="!music ${content}"`;
        const tooltips = `data-bs-toggle="tooltip"`;

        markup[
          section
        ] += `<li ${cssClass} ${dataClipBoardText} ${tooltips}>${content}</li>`;
      }

      markup[section] += "</ul>";
    }

    markup[section] += "</div>";
  }

  return markup;
}

/**
 * @param {string} genre
 * @return {string}
 */
function getSectionName(genre) {
  switch (genre) {
    case genres.dnb:
      return "dnb";
    case genres.dubstep:
      return "dubstep";
    default:
      return "other";
  }
}
