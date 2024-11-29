let continueButton = document.getElementById('continue');
let continueButton2 = document.getElementById('continue2');
let options = document.getElementById('options');
let backBtn = document.getElementById('back');
let musicBtn = document.getElementById('music');
let homeBtn = document.getElementById('home_button');
let timer = document.getElementById('timer');
let note = document.getElementById('note');
const sound = new Audio('./song1.mp3');
const buttonSound = new Audio('./buttonSound.mp3');
buttonSound.volume = 0.45;
sound.loop = true; // Enable looping

sound.volume = 0.09;
let music = true;

musicBtn.onclick = function () {
    buttonSound.play();
    if (music) {
        music = false;
        sound.muted = true;
        this.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    } else {
        music = true;
        sound.muted = false;
        this.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;

    }

}

continueButton.onclick = function () {
    buttonSound.play();
    timer.style.opacity = '0';

    // Play the sound
    sound.play();

    // Use setTimeout to wait for the transition to finish before hiding it completely
    setTimeout(function () {
        timer.style.display = 'none'; // Hide the element completely
    }, 1000);

}

continueButton2.onclick = function () {
    buttonSound.play();
    note.style.opacity = '0';


    setTimeout(function () {
        note.style.display = 'none';
    }, 1200);

    //map = document.getElementById('map');

    //map.classList.add('animate__animated', 'animate__backInRight','animate__slow');
    //options.classList.add('animate__animated', 'animate__backInLeft','animate__slow');

}


backBtn.onclick = function () {
    buttonSound.play();
    timer.style.opacity = '1';

    sound.pause();
    sound.currentTime = 0; // Reset to the beginning

    timer.style.display = '';

}

homeBtn.onclick = function () {
    buttonSound.play();
    sound.pause();
    sound.currentTime = 0; 
    timer.style.opacity = '1';
    timer.style.display = '';
    note.style.opacity = '1';
    note.style.display =''
   

}

function updateTime() {
    const now = new Date();

    // Set the target date (January 8 at 00:00:00)
    const targetDate = new Date(now.getFullYear() + 1, 0, 8, 0, 0, 0); // year/month/hour/minutes/seconds

    // Calculate the difference in milliseconds
    const diff = targetDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Format the output
    const timeString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left until <span style="color: rgba(255, 213, 122, 0.74);">our anniversary</span>.`;


    // Display the time

    time.innerHTML = timeString;
}

// Update time immediately on page load
updateTime();
// Update the time every second
setInterval(updateTime, 1000);