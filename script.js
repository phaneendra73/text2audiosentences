const question = document.querySelector("#question");

const button = document.querySelector("#Button");

const audio = document.querySelector("#audioelement");

let lstaudios = "";

const key = "YczRhQgZO9";

button.addEventListener("click", function (event) {
  event.preventDefault();

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  console.log(question.value);
  const apiUrl = `https://voicecup.com/api?key=[YczRhQgZO9]&q=${question.value}`;
  const proxiedUrl = proxyUrl + apiUrl;
  const data = getdata(apiUrl);
});

async function getdata(proxiedUrl) {
  await fetch(proxiedUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let index = 1; index < data.hits.length; index++) {
        lstaudios += `<audio controls="true" preload="auto" controlsList="nodownload" >
<source src="https://voicecup.com/play?key=${key}&filename=${data.hits[index].filename_audio}&filetype=mp4&start=${data.hits[index].start}&duration=${data.hits[index].duration}&subs_id=${data.hits[index].id}" type="audio/mp4">
</audio><br>`;
      }
      audio.innerHTML = lstaudios;
      console.log(lstaudios);
    })

    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
