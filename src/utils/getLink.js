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

    for (element of links) {
      try {
        const data = await fetch(element);
        const text = await data.text();
        if (text.includes("EXTINF")) {
          useableLinks.push(element);
        }
      } catch {
        console.log("error");
      }
    }

    return new Promise(function (resolve, reject) {
      if (useableLinks) {
        resolve(useableLinks[0]);
      } else {
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
