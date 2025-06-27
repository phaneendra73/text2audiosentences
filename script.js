const question = document.querySelector("#question");
const button = document.querySelector("#search-btn");
const playListDiv = document.querySelector("#playlist");
const spinner = document.querySelector("#spinner");

const key = "YczRhQgZO9";

button.addEventListener("click", () => {
  const word = question.value.trim();
  if (!word) return;

  const apiUrl = `https://voicecup.com/api?q=${encodeURIComponent(word)}&key=1Oo7UJDxqt&l=en&from=10&size=15&length_min=15&length_max=50&duration_min=5&duration_max=25&format=jsonp`;
  fetchData(apiUrl);
});

function getData(proxiedUrl) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: proxiedUrl,
      dataType: "jsonp",
      success: resolve,
      error: reject
    });
  });
}

async function fetchData(apiUrl) {
  playListDiv.innerHTML = "";
  spinner.style.display = "block";

  try {
    const response = await getData(apiUrl);
    spinner.style.display = "none";

    if (response.hits_total > 0) {
      renderPlaylist(response.hits);
    } else {
      showNotFound();
    }
  } catch (error) {
    spinner.style.display = "none";
    showNotFound();
  }
}

function renderPlaylist(hits) {
  let content = "";
  hits.forEach(item => {
    if (item.duration > 5) {
      content += `
        <div class="audio-item">
          <p class="audio-title">${item.title}</p>
          <p class="audio-description">${item.body}</p>
          <audio controls preload="auto" controlsList="nodownload">
            <source src="https://voicecup.com/play?key=${key}&filename=${item.filename_audio}&filetype=mp4&start=${item.start}&duration=${item.duration}&subs_id=${item.id}" type="audio/mp4">
            Your browser does not support the audio element.
          </audio>
        </div>
      `;
    }
  });
  playListDiv.innerHTML = content || showNotFound();
}

function showNotFound() {
  playListDiv.innerHTML = `
    <div id="not-found">
      <p>😔 Oops! No sentences found.</p>
    </div>
  `;
}
