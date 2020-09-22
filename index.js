// =====================
// Load Data
// =====================

let loadData = function () {
  for (let item of DATA) {
    createTweet(item);
  }
};

let printTweet = function () {
  let textArea = document.querySelector("#tweet-text-area");
  let arr = {
    user: "Park",
    message: textArea.value,
    created_at: "2019-01-03 12:30:20",
  };
  DATA.push(arr);
  createTweet(arr);
  textArea.value = "";
};

let createTweet = function (data) {
  const { user, message, created_at } = data;
  //input-List
  // tweet-list
  let mainDiv = document.createElement("div");
  mainDiv.classList = "tweet-list";

  // =======================
  // profile-image
  // =======================
  let imgDiv = document.createElement("div");
  imgDiv.classList = "tweet-profile-image";
  let profileImg = document.createElement("img");
  profileImg.id = "tweet-user-profile-img";
  profileImg.src = "./static/Logo.png";
  profileImg.alt = "user-profile-image";
  imgDiv.appendChild(profileImg);

  // ====================
  // tweet-text-content
  // =====================
  let tweetTextContentDiv = document.createElement("div");
  tweetTextContentDiv.classList = "tweet-text-content";

  // ====================
  // TWEET-INFO-DOM
  // =====================
  let infoDiv = document.createElement("div");
  infoDiv.classList = "tweet-info";

  let nickNameSpan = document.createElement("span");
  nickNameSpan.id = "user-nickName";
  nickNameSpan.innerText = user;
  infoDiv.appendChild(nickNameSpan);

  let tagSpan = document.createElement("span");
  tagSpan.id = "user-tag";
  tagSpan.innerText = "@DarkMysticNight";
  infoDiv.appendChild(tagSpan);

  let timeSpan = document.createElement("span");
  timeSpan.id = "tweet-update-time";
  timeSpan.innerText = created_at;
  infoDiv.appendChild(timeSpan);

  tweetTextContentDiv.appendChild(infoDiv);

  let tweetTextDiv = document.createElement("div");
  tweetTextDiv.classList = "tweet-text";
  tweetTextDiv.innerText = message;
  tweetTextContentDiv.appendChild(tweetTextDiv);

  // =======================
  // Icon-DON
  // =======================

  let icon = document.createElement("div");
  icon.classList = "tweet-icon";
  let iconArr = [
    "far fa-comment",
    "fas fa-recycle",
    "far fa-heart",
    "fas fa-download",
  ];
  for (let item of iconArr) {
    let iconDiv = document.createElement("i");
    iconDiv.classList = item;
    icon.append(iconDiv);

    tweetTextContentDiv.appendChild(icon);
  }

  // =======================
  // append-area
  // =======================
  mainDiv.appendChild(imgDiv);
  mainDiv.appendChild(tweetTextContentDiv);
  let list = document.querySelector(".list");
  list.append(mainDiv);
};

let tweetBtn = document.querySelector(".tweet-button");
tweetBtn.addEventListener("click", printTweet);

loadData();

let findUser = (element) => {
  console.log(element.innerText);
};

let nickName = document.querySelectorAll("#user-nickName");

nickName.forEach((element) => {
  element.addEventListener("click", function () {
    findUser(element);
  });
});
