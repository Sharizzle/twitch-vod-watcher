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

const getFile = (name, vodID, domain, fileChunk, date) => {
  let timestamp = getUnixTime(date);
  const baseString = name + "_" + vodID.toString() + "_" + timestamp.toString();
  try {
    let hash = hashAndTruncate(baseString);
    let finalString = hash + "_" + baseString;
    return domain + "/" + finalString + fileChunk;
  } catch {
    console.log("An Error has occured");
  }
};

const getLink = async (channel, id, domain, filechunk) => {
  const timestamp = await getTimeStampFromResponse(channel, id);
  const link = getFile(channel, id, domain, filechunk, timestamp);
  return link;
};

// module.exports = { getLink };
