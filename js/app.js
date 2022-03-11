let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
    likedPostsId.push(id); 
    showPosts(posts);
};

const reportPost = (id) => {
    reportedPostsId.push(id);
    const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    showPosts(remainingPosts);

};

const displayContent = (text) => {
    return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
        showQuectionAnswer();
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";

        displayReportedPosts();
    }
};

const createPost = (post) => {
    const image = post.image;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${post.userImage}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${post.comments[0]?.user}
                      </a>
                      ${post.comments[0]?.text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
};

const displayLikedPosts = () => {
  document.getElementById('qucetion-answer').innerHTML = "";
  document.getElementById( "liked" ).innerHTML = "";
    const likedPosts = getLikedPosts();
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
  document.getElementById('qucetion-answer').innerHTML = "";
  document.getElementById( "reported" ).innerHTML = "";
    const reportedPosts = getReportedPosts();
    reportedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "reported" ).appendChild(div);
    });
};

const loadPosts = async () =>{
  let data = await fetch('../data/posts.json');
  posts = await data.json();
  showPosts(posts);
  console.log(posts);
}

loadPosts();

const showQuectionAnswer = () =>{
  const conteiner = document.getElementById('qucetion-answer');
  conteiner.innerHTML =`
  <div>
                <h1 class="text-center my-4">Answer</h1>
           <div class="row">
            <div class="col-md-6 col-12">
                <h3 class="text-center mb-4">
                Javascript কিভাবে কাজ করে?
                </h3>
                <p>Javascript একটি  progamming Language, javascript কে আবার EcmaScript ও বলে। Javascript web  এর মাতৃভাষা বলা হয়। JavaScript খুব সহজে শিক্ষা যায়। javascript high level language. Interactive কাজ গুলো করা জন্য JavaScript ব্যবহার করা হয়,আমাদের প্রোগ্রামিং ভাষা গুলো লেখি, লেখা গুলো সাহায্যে Machine এর  সাথে communica করতে পারি,
                JavaScript Machine থেকে অনেক দূরে থাকে যার কারণে মাঝখানে যে complex-city, যে ব্যাপার গুলো যে ক্ষেত্রে JavaScript অনেক সহজ হয়ে যায়,যার কারণে programer জন্য  code লেখতে সহজ হয়.
                Javascript multiline কাজে ব্যবহার করা হয়।  Javascript Web Application হিসাবে কাজ করে। আবার যে কোনো Application এ  ব্যবহার করা হয়। যেমন : Client Site, Server site, Mobile application  এমন কি Cloud Base   কে কোনো Application Developed করা যায়। </p>
            </div>
            <div class="col-md-6 col-12">
                <h3 class="text-center mb-4">
                Javascript এর Event Loop টা কি কাজ করে?
                </h3>
                <p>JavaScript event revent asyenchronous way তে কাজ করে, অনেক ক্ষেত্রে, Asyenchronous code নিয়ে যখন কাজ করতে যায়, কোনটার পর কোনটা কাজ করবে, এ ক্ষেত্রে ২ ধরনের জিনিস আছে (১) Stack (2) Queue. 
                কোনটা পর কোনটা code টা Syynchronously ভাবে কাজ করে সেইটা হলো Stack. আর Asynchronously ভাবে কাজ করে সেইটা হলো Queue. Event Loop 
                first Stack কে চালায় তারপর Stack execute করা শেষ হলে Queue কে Exceute করে।
                Full জিনিসটা javascript নিজেই loop এর মত করে চালায়,আর এইটাকে বলে Event Loop.</p>
            </div>
           </div>
            </div>
  `
}

showQuectionAnswer();