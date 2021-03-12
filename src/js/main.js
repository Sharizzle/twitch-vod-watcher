const btnEl = document.querySelector("#start-button");
const channelEl = document.querySelector("#channel");
const choiceEl = document.querySelector("#choice");
const idEl = document.querySelector("#vodId");
const videoContainerEl = document.querySelector("#video-container");

const initializeVideo = (videoSrc) => {
  const video = document.getElementById("video");
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
  }
};

const getRadioVal = (form, name) => {
  let val = "";
  // get list of radio buttons with specified name
  let radios = form.elements[name];

  // loop through list of radio buttons
  for (let i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked) {
      val = radios[i].value;
      break;
    }
  }
  return val;
};

btnEl.addEventListener("click", () => {
  const channel = channelEl.value;
  const id = idEl.value;
  const choice = getRadioVal(document.getElementById("main-form"), "choice");

  if (choice === "stream") {
    videoContainerEl.innerHTML = `<video controls id="video"></video>`;
    const link = getLink(channel, id);
    initializeVideo(link);
  }
});
