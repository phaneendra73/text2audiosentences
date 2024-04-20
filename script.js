const question = document.querySelector("#question");

const button = document.querySelector("#Button");

const playListDiv = document.querySelector("#playlist");


const key = "YczRhQgZO9";

button.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(question.value);
  const apiUrl = `https://voicecup.com/api?q=${question.value}&key=1Oo7UJDxqt&l=en&from=10&size=15&length_min=15&length_max=50&duration_min=5&duration_max=25&format=jsonp`;
  fetchData(apiUrl);
});

async function getdata(proxiedUrl) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: proxiedUrl,
      data: {
        q: "hi",
        key: "1Oo7UJDxqt",
        l: "en",
        from: 10,
        size: 15,
        length_min: 15,
        length_max: 50,
        duration_min: 5,
        duration_max: 25,
        format: "jsonp",
      },
      dataType: "jsonp",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        reject(new Error(status + ": " + error));
      },
    });
  });
}

async function fetchData(apiUrl) {
  try {
    const response = await getdata(apiUrl);
    console.log(response);
    let playlistHTML = "";
    if (response.hits_total > 0) {
      for (let index = 0; index < response.hits.length; index++) {
        const audioItem = response.hits[index];
        if (audioItem.duration > 5) {
          playlistHTML += `
        <div class="audio-item">
          <p class="audio-title">${audioItem.title}</p>
          <p class="audio-description">${audioItem.body}</p>
          <audio controls preload="auto" controlsList="nodownload">
            <source src="https://voicecup.com/play?key=${key}&filename=${audioItem.filename_audio}&filetype=mp4&start=${audioItem.start}&duration=${audioItem.duration}&subs_id=${audioItem.id}" type="audio/mp4">
            Your browser does not support the audio element.
          </audio>
        </div>
      `;
        }
      }
    } else {
      console.log(response.errors);
      playlistHTML = `<div id="not-found">
  <img src="https://emojicdn.elk.sh/😔" alt=" Emoji">
  <p>Oops! Sentences not found.</p>
</div>
`;
    }
    playListDiv.innerHTML = playlistHTML;
    console.log(lstaudios);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
