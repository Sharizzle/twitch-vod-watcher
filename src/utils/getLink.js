const getTimeStampFromResponse = async (channel, id) => {
  // Send Get Request
  const data = await fetch(
    `https://twitchtracker.com/${channel}/streams/${id}`
  );
  const text = await data.text();

  // Get Timestamp
  const index = text.indexOf("stream on ") + 10;
  const timestamp = text.substring(index, index + 19);

  return new Promise(function (resolve, reject) {
    if (timestamp) {
      resolve(timestamp);
    } else {
      reject("Time Stamp Not Found");
    }
  });
};

const getUnixTime = (date) => {
  const time = date + " UTC";
  return new Date(time).getTime() / 1000;
};

const hashAndTruncate = (str) => {
  return sha1(str).substring(0, 20);
};

const getFile = async (name, vodID, domains, fileChunk, date) => {
  let timestamp = getUnixTime(date);
  const baseString = name + "_" + vodID.toString() + "_" + timestamp.toString();
  try {
    let hash = hashAndTruncate(baseString);
    let finalString = hash + "_" + baseString;

    let links = [];
    domains.forEach((element) => {
      links.push(element + "/" + finalString + fileChunk);
    });
    const useableLinks = [];
    UIkit.notification({
      message: "Loading Video from Twitch...",
      status: "danger",
      pos: "top-center",
      timeout: 20000,
    });

    document.querySelector(".uk-container-small").style.opacity = 0.6;
    document.querySelector(".uk-heading-line").style.opacity = 0.6;

    document.querySelector(".uk-notification-close").style.opacity = 1;

    for (element of links) {
      try {
        const data = await fetch(element);
        const text = await data.text();
        if (text.includes("EXTINF")) {
          useableLinks.push(element);
          break;
        }
      } catch {
        console.log("error");
      }
    }

    return new Promise(function (resolve, reject) {
      if (useableLinks.length >= 1) {
        document.querySelector(".uk-container-small").style.opacity = 1;
        document.querySelector(".uk-heading-line").style.opacity = 1;
        UIkit.notification.closeAll();
        resolve(useableLinks[0]);
      } else {
        // UIkit.notification.closeAll();
        UIkit.notification({
          message: "An Error has Occured! Please try again!",
          status: "danger",
          pos: "top-center",
        });
        document.querySelector(".uk-container-small").style.opacity = 1;
        document.querySelector(".uk-heading-line").style.opacity = 1;
        reject("Link Not Found");
      }
    });
  } catch {
    // console.log("An Error has occured");
  }
};

const getLink = async (channel, id, domains, filechunk) => {
  const timestamp = await getTimeStampFromResponse(channel, id);
  const link = await getFile(channel, id, domains, filechunk, timestamp);
  return link;
};

// module.exports = { getLink };
