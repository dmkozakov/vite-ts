import throttle from "lodash/throttle";
import VimeoPlayer, { TimeEvent } from "@vimeo/player";

const STORAGE_KEY = "videoplayer-current-time";

const refs = {
  iframe: document.querySelector("iframe"),
};

const player = new VimeoPlayer(refs.iframe);
const savedTime = Number(JSON.parse(localStorage.getItem(STORAGE_KEY)));
setTime(savedTime);

player.on("timeupdate", throttle(saveCurrentTime, 1000));

localStorage.setItem("test", JSON.stringify(516465454));

function saveCurrentTime(data: TimeEvent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds));
}

function setTime(savedTime: number) {
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
