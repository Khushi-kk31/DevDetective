const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector(".button-container");
const nameBlock = document.querySelector("#name");
const userBlock = document.querySelector("#username");
const timeBlock = document.querySelector("#date");
const profileImg = document.querySelector("#profile-img");
const url = `https://api.github.com/users/`
const bio = document.querySelector("#bio");
const repo = document.querySelector("#repo");
const follower = document.querySelector("#follower");
const following = document.querySelector("#following");
const place = document.querySelector("#location");
const link = document.querySelector("#link");
const x = document.querySelector("#x");
const company = document.querySelector("#company");
const root = document.documentElement.style;
const lightMode = document.querySelector(".light-mode");
const darkBtn = document.querySelector(".dark-mode");
const darkText = document.querySelector("#dark-text");
const darkImg = document.querySelector("#dark-img");
let darkMode = false;


async function fetchDetail(url){

    await fetch(url)
    .then((data) => data.json())
    .then((data) => updateProfile(data))
    .catch((err) => {
        throw err;
    });

}

function updateProfile(data){

   if(data.message !== "Not Found"){
     function checkNull(arg1){
        if(arg1 === "" || arg1 === null ){
            return false;
        }else{
            return true;
        }
    }

    nameBlock.innerText = data.name;
    userBlock.innerText = "@" + data.login;
    userBlock.href = data.html_url;

    const isoString = data.created_at.toString();
    const dateObject = new Date(isoString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'  // Important: specify UTC to match the 'Z' in the input string
    }

    const formattedDate = dateObject.toLocaleDateString('en-GB', options);
    timeBlock.innerText = "Joined " + formattedDate;
    profileImg.src = `${data.avatar_url}`;
    console.log(profileImg);

    bio.innerText = checkNull(data.bio) ? data.bio: "Not Available" ;;
    repo.innerText = data.public_repos;
    follower.innerText = data.followers;
    following.innerText = data.following;
    place.innerText = checkNull(data.location) ? data.location: "Not Available" ;;
    link.innerText = checkNull(data.blog) ? data.blog: "Not Available" ;
    link.href = data.blog;
    if(checkNull(data.twitter_username)){
        x.href = "https://x.com/" + data.twitter_username 
        x.innerText = data.twitter_username;
        x.classList.remove('isDisabled');
    }else{
        x.classList.add('isDisabled');
        x.innerText = "Not Available";
        x.style.opacity = "0.6";
    }
    
    checkNull(data.company) ? company.innerText = data.company : company.innerText = "Not Available", company.style.opacity = "0.6";

   }
   else{
    searchBar.value = "User Not Found";
    searchBar.value.style.color = "red";
   }

}


function execution(){
    if(searchBar.value)
        fetchDetail(url + searchBar.value);
    else{
        searchBar.value = "Not Found";
    }
}
searchButton.addEventListener('click', execution);

//keyup work on search bar not on search button(personal comment)
searchBar.addEventListener('keyup', function(event){
    if(event.key === 'Enter' || event.keyCode === 13){
        event.preventDefault(); // Prevent potential form submission
        execution();
    }
})

function lightModeProperties(){
    root.setProperty('--primary-color', '#4B6A9B');
    root.setProperty('--background-color', '#F6F8FF');
    root.setProperty('--info-color', '#2B3442');
    root.setProperty('--content-color', '#fff');

    darkText.innerText = "DARK";
    darkMode = false;
}

function darkModeProperties(){
    root.setProperty("--content-color", "#1E2A47");
    root.setProperty("--background-color", "#141D2F");
    root.setProperty("--primary-color", "#fff");
    root.setProperty("--info-color", "#fff");
    darkText.innerText = "LIGHT";
    darkMode = true;
}

darkBtn.addEventListener('click', function(){
    if(darkMode == false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
})

fetchDetail(url + "khushi-kk31");