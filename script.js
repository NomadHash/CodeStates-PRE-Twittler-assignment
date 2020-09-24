const list = document.querySelector(".list");
const textArea = document.querySelector("#tweet-text-area");
const nameInput = document.querySelector(".name-input");
const tweetForm = document.querySelector(".post-tweet-form");

// ====================================
// LOAD_TWEET_DATA_FROM_LOCAL_STORAGE
// ====================================

const loadData = function () {
  if (!localStorage.getItem("DATA")) {
    localStorage.setItem("DATA", JSON.stringify(DATA));
  }
  let localData = JSON.parse(localStorage.getItem("DATA"));
  for (let item of localData) {
    list.append(createTweet(item));
  }
};

// ===================
// CREATE_TWEET
// ===================

const createTweet = function (data) {
  const { user, message, created_at } = data;

  let mainDiv = document.createElement("div");
  mainDiv.classList = "tweet-list";

  // ===================
  // DOM-PROFILE-IMAGE
  // ===================

  const imgDiv = document.createElement("div");
  imgDiv.classList = "tweet-profile-image";

  const profileImg = document.createElement("img");
  profileImg.id = "tweet-user-profile-img";
  profileImg.src = "./static/profile.png";
  profileImg.alt = "user-profile-image";

  imgDiv.appendChild(profileImg);

  // ======================
  // DOM-TWEET-TEXT-CONTENT
  // ======================

  const tweetTextContentDiv = document.createElement("div");
  tweetTextContentDiv.classList = "tweet-text-content";

  // ======================
  // DOM-TWEET-USER-DATA
  // ======================

  const infoDiv = document.createElement("div");
  infoDiv.classList = "tweet-info";

  const userNameSpan = document.createElement("span");
  userNameSpan.id = "user-nickName";
  userNameSpan.innerText = user;
  userNameSpan.addEventListener("click", function () {
    findUser(userNameSpan);
  });

  infoDiv.appendChild(userNameSpan);

  const tagSpan = document.createElement("span");
  tagSpan.id = "user-tag";
  tagSpan.innerText = "@코드스테이츠";
  infoDiv.appendChild(tagSpan);

  const timeSpan = document.createElement("span");
  timeSpan.id = "tweet-update-time";
  timeSpan.innerText = moment(created_at, "YYYY.MM.DD.HH.mm").fromNow();

  infoDiv.appendChild(timeSpan);

  tweetTextContentDiv.appendChild(infoDiv);

  const tweetTextDiv = document.createElement("div");
  tweetTextDiv.classList = "tweet-text";
  tweetTextDiv.innerText = message;

  tweetTextContentDiv.appendChild(tweetTextDiv);

  // ======================
  // DOM-ICON-AREA
  // ======================

  const iconDiv = document.createElement("div");
  iconDiv.classList = "tweet-icon";

  const iconArray = [
    "far fa-comment",
    "fas fa-recycle",
    "far fa-heart",
    "fas fa-download",
  ];

  for (let item of iconArray) {
    let icon = document.createElement("i");
    icon.classList = item;
    iconDiv.append(icon);
  }
  tweetTextContentDiv.appendChild(iconDiv);

  // ======================
  // APPEND-AREA
  // ======================
  mainDiv.appendChild(imgDiv);
  mainDiv.appendChild(tweetTextContentDiv);

  return mainDiv;
};

loadData();

// ======================
// PRINT_TWEET
// ======================
const printTweet = function (event) {
  event.preventDefault();
  let obj = {
    user: nameInput.value,
    message: textArea.value,
    created_at: new Date().format(),
  };
  DATA.unshift(obj);
  list.prepend(createTweet(obj));
  const localData = JSON.parse(localStorage.getItem("DATA"));
  localStorage.setItem("DATA", JSON.stringify([{ ...obj }, ...localData]));

  textArea.value = "";
  nameInput.value = "";
  console.log(DATA);
};

tweetForm.addEventListener("submit", printTweet);

// ======================
// FIND_USER
// ======================

const findUser = function (element) {
  const localData = JSON.parse(localStorage.getItem("DATA"));
  let userName = element.innerText;

  let search = localData.filter(function (tweet) {
    return tweet.user === userName;
  });

  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }

  let button = document.createElement("button");
  button.addEventListener("click", function () {
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    loadData();
  });
  button.classList = "callBack-button";

  button.textContent = "뒤로가기";

  list.appendChild(button);

  for (let tweet of search) {
    list.appendChild(createTweet(tweet));
  }
};

// DATA는 이미 작성된 트윗을 표시합니다.
// console.log(DATA);

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
// console.log(generateNewTweet());
