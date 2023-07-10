
let songName;
let artistName;
let songId;
let songCover;
let isHearted;
let volume;
let objectList = [""];
let songList = [""];
let likedList = [""];

let myAudio = null;
let songObject;
let randomIndex;
let collectrandomIndex;
let isPlaying = null;
let isMute = false;
let isSkip = true;
let currentSliderPosition = 0;
let constantVolume = 0.6;
let depth = 0;
let startTimer;

let getSongCover = document.getElementById("image");
let getsongName = document.getElementById("songName");
let getartistName = document.getElementById("songArtist");
let getVolume = document.querySelector("#volumeSlider");
let getMute = document.getElementById("mute");
let getstartTime = document.getElementById("startTime");
let getpositionSlider = document.getElementById("positionSlider");
let getendTime = document.getElementById("endTime");
let getlikedSongs = document.getElementById("likedSongs");
let getprevSong = document.getElementById("prevSong");
let getplayButton = document.getElementById("playPause");
let getSkip = document.getElementById("skip");
let getautoPlay = document.getElementById("autoPlay");
let getbackdropImg = document.getElementById("backdropImg");

let getplayIcon = getplayButton.querySelector(".fa-play");
let getmuteIcon = getMute.querySelector(".fa-volume-high");
let getautoplayIcon = getautoPlay.querySelector(".fa-shuffle");
let getheartIcon = getlikedSongs.querySelector(".fa-regular");
let gethearticonColor = getlikedSongs.querySelector("#likedSongs .fa-heart");

class AudioPlayer{
    constructor(songName,artistName,songId,songCover,isHearted){
        this.songName = songName;
        this.artistName = artistName;
        this.songId = songId;
        this.songCover = songCover;
        this.isHearted = false;

        objectList.push(this);
    }
}

window.addEventListener("load",()=>{
    window.alert("Click play to start.");
})

function selectSong(){
    randomIndex = Math.floor(Math.random() * objectList.length);
    songList.push(objectList[randomIndex]);
    songObject = objectList[randomIndex];
    let songFile = songObject.songId;
    myAudio = new Audio(songFile);
}

getplayButton.addEventListener("click", async() =>{
    if(myAudio == null){
        selectSong();
        await myAudio.play();
        isPlaying = true;
        getbackdropImg.src = songObject.songCover;
        getplayIcon.classList.replace("fa-play","fa-pause");
        getsongName.innerHTML = songObject.songName;
        getartistName.innerHTML = songObject.artistName;
        getSongCover.src = songObject.songCover;
        startTimer = setInterval(updateTrack,1000);
        depth++;
        console.log(myAudio);
    }
    else if(isPlaying){
        myAudio.pause();
        isPlaying = false
        getplayIcon.classList.replace("fa-pause","fa-play");
        clearInterval(startTimer);
        console.log("played");
    }
    else if(!isPlaying){
        myAudio.play();
        isPlaying = true;
        getplayIcon.classList.replace("fa-play","fa-pause");
        startTimer = setInterval(updateTrack,1000);
        console.log("paused");
    }
})

getSkip.addEventListener("click", async()=>{
    clearInterval(startTimer);
    myAudio.pause();
    depth++
    myAudio = await setnextSong();
    myAudio.play();
    startTimer = setInterval(updateTrack,1000);
    setData();
    console.log(myAudio);
})

async function setnextSong(){
    if (depth == songList.length){
        randomIndex = await Math.floor(Math.random() * objectList.length);
        songList.push(objectList[randomIndex]);
        return await new Audio(objectList[randomIndex].songId); // see if this gets rid of null songs
    }
    else{
        return new Audio(songList[depth].songId);
    }
}

async function setprevSong(){
    if (depth >= 0){
        return new Audio(songList[depth].songId);
    }
    else{
        window.alert("No previous songs.");
        depth = 0;
        return new Audio(songList[depth].songId);
    }
}

getprevSong.addEventListener("click", async()=>{
    clearInterval(startTimer);
    myAudio.pause();
    depth--;
    myAudio = await setprevSong();
    console.log(myAudio)
    myAudio.play();
    startTimer = setInterval(updateTrack,1000);
    setData();
})

getpositionSlider.addEventListener("click", () => {
    currentSliderPosition = getpositionSlider.value;
    myAudio.currentTime = getpositionSlider.value;
})

getVolume.addEventListener("click", ()=>{
    constantVolume = getVolume.value * 0.01;
    myAudio.volume = constantVolume;
    if(myAudio.volume > 0){
        if(isMute){
            isMute = false;
            getmuteIcon.classList.replace("fa-volume-xmark","fa-volume-high");
        }
    }
    else if(myAudio.volume < 0.01){
        isMute = true;
        getmuteIcon.classList.replace("fa-volume-high","fa-volume-xmark")
    }
})

function setData(){
    let currentIndex;
    if(depth == songList.length)
    {
        currentIndex = randomIndex;
    }
    else{
        currentIndex = depth;
    }
    isPlaying = true;
    currentSliderPosition = 0;
    myAudio.currentTime = 0;
    if(!isMute){
        myAudio.volume = constantVolume;
        getVolume.value = constantVolume * 100;
    }
    else{
        myAudio.volume = 0;
        getVolume.value = 0;
    }
    isPlaying = true;
    getbackdropImg.src = songList[currentIndex].songCover;
    getplayIcon.classList.replace("fa-play","fa-pause");
    getsongName.innerHTML = songList[currentIndex].songName;
    getartistName.innerHTML = songList[currentIndex].artistName;
    getSongCover.src = songList[currentIndex].songCover;
    
}

function updateTrack(){
    getpositionSlider.max = myAudio.duration;
    getpositionSlider.min = 0;

    let maxMinute = Math.floor(myAudio.duration / 60);
    let maxSecond = Math.floor(myAudio.duration % 60);
    let minutes = Math.floor(myAudio.currentTime / 60);
    let seconds = Math.floor(myAudio.currentTime % 60);
    maxMinute = pad(maxMinute);
    maxSecond = pad(maxSecond);
    minutes = pad(minutes);
    seconds = pad(seconds);

    getendTime.innerHTML = maxMinute + ":" + maxSecond;
    getstartTime.innerHTML = minutes + ":" + seconds;

    currentSliderPosition++;
    getpositionSlider.value = currentSliderPosition;

    function pad(time){
        return ("0" + time).length > 2 ? time : "0" + time;
    }

    myAudio.addEventListener("ended", async()=>{
        if(isSkip == true){
            await clearInterval(startTimer);
            depth++;
            myAudio.pause();
            myAudio = null;
            if (depth == songList.length){
                randomIndex = Math.floor(Math.random() * objectList.length);
                songList.push(objectList[randomIndex]);
                myAudio = await new Audio(objectList[randomIndex].songId); // see if this gets rid of null songs
            }
            else{
                myAudio = await new Audio(songList[depth].songId);
            }
            myAudio.play();
            startTimer = setInterval(updateTrack,1000);
            setData();
        }
        else{
            currentSliderPosition = 0;
            getpositionSlider.value = 0;
            myAudio.currentTime = 0;
            await myAudio.play(); 
        }
        
    })
}

getMute.addEventListener("click", ()=>{
    if(myAudio.volume > 0){
        myAudio.volume = 0;
        getVolume.value = 0;
        getmuteIcon.classList.replace("fa-volume-high","fa-volume-xmark")
        isMute = true;
    }
    else{
        myAudio.volume = constantVolume;
        getVolume.value = constantVolume * 100;
        getmuteIcon.classList.replace("fa-volume-xmark","fa-volume-high");
        isMute = false;
    }
})

getautoPlay.addEventListener("click",()=>{
    if(isSkip == true){
        getautoplayIcon.classList.replace("fa-shuffle","fa-rotate-left");
        isSkip = false;
    }
    else{
        getautoplayIcon.classList.replace("fa-rotate-left","fa-shuffle");
        isSkip = true;
    }
})

getlikedSongs.addEventListener("click", ()=>{
    if(depth == songList.length){
        if(objectList[randomIndex].isHearted == false){
            objectList[randomIndex].isHearted = true;
            getheartIcon.classList.replace("fa-regular","fa-solid");
            gethearticonColor.style.color = "#3535F3";
            console.log(objectList[randomIndex].isHearted)
            console.log(objectList[randomIndex].songId)
        }
        else{
            objectList[randomIndex].isHearted = false;
            console.log("randomIndex index false")
            getheartIcon.classList.replace("fa-solid","fa-regular");
            gethearticonColor.style.color = "white";
            console.log(objectList[randomIndex].isHearted)
            console.log(objectList[randomIndex].songId)
        }
    }
    else{
        if(songList[depth].isHearted == false) // current index because audio is in past
        {
            songList[depth].isHearted = true;
            getheartIcon.classList.replace("fa-regular","fa-solid");
            gethearticonColor.style.color = "#3535F3";
            console.log("current index true")
        }
        else{
            songList[depth].isHearted = false;
            getheartIcon.classList.replace("fa-solid","fa-regular");
            gethearticonColor.style.color = "white";
            console.log("current index false")
        }
    }
})

let song = new AudioPlayer("Llkd","Dudylo","MusicWebsite/Llkd.mp3","AlbumCovers/artwork (copy 41).jpg");
let song1 = new AudioPlayer("'Letter To My Brother' Bootleg Kev Freestyle","Kyle Richh,Jenn Carter","MusicWebsite/'Letter To My Brother' Bootleg Kev Freestyle.mp3","AlbumCovers/artwork.jpg");
let song2 = new AudioPlayer("300 shots", "Sha Ek","MusicWebsite/300 Shots.mp3","AlbumCovers/artwork (copy 2).jpg");
let song3 = new AudioPlayer("300FLOCKA SHOT","Yus Gz,Sha Gzz,Nesty Gzz","MusicWebsite/300FLOCKA SHOT.mp3","AlbumCovers/artwork (copy 3).jpg");
let song4 = new AudioPlayer("4148 (feat. Edot Babyy)","DD Osama,Edot Babyy,Lawsy","MusicWebsite/4148 (feat. Edot Babyy).mp3","AlbumCovers/artwork (copy 4).jpg");
let song5 = new AudioPlayer("AFRICAN DEMONS PT2","Yus Gz,Scotty 2 Hotty,Nesty Floxks,Ab Da Jet","MusicWebsite/AFRICAN DEMONS PT2.mp3","AlbumCovers/artwork (copy 5).jpg");
let song6 = new AudioPlayer("B-Lovee - Freestyle - Open Mic","B-lovee","MusicWebsite/B-Lovee - Freestyle - Open Mic.mp3","AlbumCovers/artwork (copy 6).jpg");
let song7 = new AudioPlayer("BACKDOOR","Yus Gz","MusicWebsite/BACKDOOR.mp3","AlbumCovers/artwork (copy 7).jpg");
let song8 = new AudioPlayer("Beam","Kyle Richh,Mike Myerzz","","AlbumCovers/artwork (copy 8).jpg");
let song9 = new AudioPlayer("Big Time Rush","BigKayBeezy","MusicWebsite/Big Time Rush.mp3","AlbumCovers/artwork (copy 9).jpg");
let song10 = new AudioPlayer("Box","Sha EK,Defiant Presents","MusicWebsite/Box.mp3","AlbumCovers/artwork (copy 10).jpg");
let song11 = new AudioPlayer("BREAKIN THE CODE","Kyle Richh","MusicWebsite/BREAKIN THE CODE.mp3","AlbumCovers/artwork (copy 11).jpg","AlbumCovers/artwork (copy 11).jpg");
let song12 = new AudioPlayer("Bussin Oota's","Roscoe G,DudeyLo","MusicWebsite/Bussin Oota's.mp3","AlbumCovers/artwork (copy 12).jpg");
let song13 = new AudioPlayer("Catch Up","BBG Steppaa,DD Osama","MusicWebsite/Catch Up.mp3","AlbumCovers/artwork (copy 13).jpg");
let song14 = new AudioPlayer("Chosen Ones","DD Osama,Deon","MusicWebsite/Chosen Ones.mp3","AlbumCovers/artwork (copy 14).jpg");
let song15 = new AudioPlayer("Coe Pt. 2","justn,Sha EK,B-Lovee,150 Entertainment","MusicWebsite/Coe Pt. 2.mp3","AlbumCovers/artwork (copy 15).jpg");
let song16 = new AudioPlayer("Cuz We Did","41,TaTa,Kyle Richh","MusicWebsite/Cuz We Did.mp3","AlbumCovers/artwork (copy 16).jpg");
let song17 = new AudioPlayer("Demon","Nas Ebk,Set Da Trend","MusicWebsite/Demon.mp3","AlbumCovers/artwork (copy 17).jpg");
let song18 = new AudioPlayer("Dreams","Yus Gz","MusicWebsite/Dreams.mp3","AlbumCovers/artwork (copy 18).jpg");
let song19 = new AudioPlayer("Dyin 2 Live Pt 2","Blockwork","MusicWebsite/Dyin 2 Live Pt 2.mp3","AlbumCovers/artwork (copy 19).jpg");
let song20 = new AudioPlayer("EBK","Dudey Lo","MusicWebsite/EBK.mp3","AlbumCovers/artwork (copy 20).jpg");
let song21 = new AudioPlayer("FLOCK AT THE FLOCKAS","SugarHill Keem","MusicWebsite/FLOCK AT THE FLOCKAS.mp3","AlbumCovers/artwork (copy 21).jpg");
let song22 = new AudioPlayer("Fourth To The Duece","Moreno 157,Mdot Ebk,Eddie Gzz","MusicWebsite/Fourth To The Duece.mp3","AlbumCovers/artwork (copy 22).jpg");
let song23 = new AudioPlayer("Freestyle [Open Mic]","Studio Of Legends,Sha EK","MusicWebsite/Freestyle [Open Mic].mp3","AlbumCovers/artwork (copy 23).jpg");
let song24 = new AudioPlayer("FRIENDS OR LOVERS","SpliffHappy","MusicWebsite/FRIENDS OR LOVERS.mp3","AlbumCovers/artwork (copy 24).jpg");
let song25 = new AudioPlayer("Gangsta Love","Dudey Lo","MusicWebsite/Gangsta Love.mp3","AlbumCovers/artwork (copy 25).jpg");
let song26 = new AudioPlayer("Geek","Edot Babyy","MusicWebsite/Geek.mp3","AlbumCovers/artwork (copy 26).jpg");
let song27 = new AudioPlayer("GET BACK","BLOODIE,Roscoe G,41 Heemy,Jaybeez Da OSAMA,Dudey Lo","MusicWebsite/GET BACK.mp3","AlbumCovers/artwork (copy 27).jpg");
let song28 = new AudioPlayer("Gettin Started","DudeyLo,Dj Squad","MusicWebsite/Ghetto Superstars.mp3","AlbumCovers/artwork (copy 28).jpg");
let song29 = new AudioPlayer("Ghetto Superstars","DudeyLo,Young Ja","MusicWebsite/Ghetto Superstars.mp3","AlbumCovers/artwork (copy 29).jpg");
let song30 = new AudioPlayer("GRINCHIN","killmykel,Sdott goo","MusicWebsite/GRINCHIN.mp3","AlbumCovers/artwork (copy 30).jpg");
let song31 = new AudioPlayer("Hazard Lights Freestyle","Jenn Carter","MusicWebsite/Hazard Lights Freestyle.mp3","AlbumCovers/artwork (copy 31).jpg");
let song32 = new AudioPlayer("I Wanna Kno","Dudey Lo","MusicWebsite/I Wanna Kno.mp3","AlbumCovers/artwork (copy 32).jpg");
let song33 = new AudioPlayer("I'm Addicted 2","Jenn Carter, Kyle Richh","MusicWebsite/I'm Addicted 2.mp3","AlbumCovers/artwork (copy 33).jpg");
let song34 = new AudioPlayer("Ice Cream Truck","SugarHill Keem","MusicWebsite/Ice Cream Truck.mp3","AlbumCovers/artwork (copy 34).jpg");
let song35 = new AudioPlayer("It Ain't Over","Blockwork","MusicWebsite/It Ain't Over.mp3","AlbumCovers/artwork (copy 35).jpg");
let song36 = new AudioPlayer("Kan't Lack","Kenzo Balla,FaZe Kaysan","MusicWebsite/Kan't Lack.mp3","AlbumCovers/artwork (copy 36).jpg");
let song37 = new AudioPlayer("Keep It 100","Dougie B","MusicWebsite/Keep It 100.mp3","AlbumCovers/artwork (copy 37).jpg");
let song38 = new AudioPlayer("Let's Do It","Yahhaw,DD Osama ft Dee Play4Keeps","MusicWebsite/Let's Do It.mp3","AlbumCovers/artwork (copy 38).jpg");
let song39 = new AudioPlayer("Lets Get it On","keem gtfm,tg flockaa,yf ty","MusicWebsite/Lets Get it On.mp3","AlbumCovers/artwork (copy 39).jpg");
let song40 = new AudioPlayer("Letter 2 Notti","DD Osama","MusicWebsite/Letter 2 Notti.mp3","AlbumCovers/artwork (copy 40).jpg");
let song41 = new AudioPlayer("Llkd","DudeyLo,Sha EK,41 Heemy","MusicWebsite/Llkd.mp3","AlbumCovers/artwork (copy 41).jpg");
let song42 = new AudioPlayer("Losing Control - pt. 2","Kenzo Balla","MusicWebsite/Losing Control - pt. 2.mp3","AlbumCovers/artwork (copy 42).jpg");
let song43 = new AudioPlayer("Murderer","Nay Benz,SettyB","MusicWebsite/Murderer.mp3","AlbumCovers/artwork (copy 43).jpg");
let song44 = new AudioPlayer("Nasty","Dudey Lo","MusicWebsite/Nasty.mp3","AlbumCovers/artwork (copy 44).jpg");
let song45 = new AudioPlayer("No Respect","Dudey Lo","MusicWebsite/No Respect.mp3","AlbumCovers/artwork (copy 45).jpg");
let song46 = new AudioPlayer("No Secrets","B-Lovee","MusicWebsite/No Secrets.mp3","AlbumCovers/artwork (copy 46).jpg");
let song47 = new AudioPlayer("O Party","Edot Babyy,Sha EK","MusicWebsite/O Party.mp3","AlbumCovers/artwork (copy 47).jpg");
let song48 = new AudioPlayer("On the Radar Freestyle","DudeyLo,Dj Squad","MusicWebsite/On the Radar Freestyle.mp3","AlbumCovers/artwork (copy 48).jpg");
let song49 = new AudioPlayer("Once You Go","DD Osama","MusicWebsite/Once You Go.mp3","AlbumCovers/artwork (copy 49).jpg");
let song50 = new AudioPlayer("OPPS IS BUMS","JayBucks,Chii Wvttz","MusicWebsite/OPPS IS BUMS.mp3","AlbumCovers/artwork (copy 50).jpg");
let song51 = new AudioPlayer("Perspective","YoungBoy Never Broke Again","MusicWebsite/Perspective.mp3","AlbumCovers/artwork (copy 51).jpg");
let song52 = new AudioPlayer("Pop Out","NUNU,Ndotspinalot","MusicWebsite/Pop Out.mp3","AlbumCovers/artwork (copy 52).jpg");
let song53 = new AudioPlayer("Red Lights Freestyle","DD Osama","MusicWebsite/Red Lights Freestyle.mp3","AlbumCovers/artwork (copy 53).jpg");
let song54 = new AudioPlayer("Reverse","41,Jenn Carter,2Rare","MusicWebsite/Reverse.mp3","AlbumCovers/artwork (copy 54).jpg");
let song55 = new AudioPlayer("Riding For You","JStar Balla,Dudeylo","MusicWebsite/Riding For You.mp3","AlbumCovers/artwork (copy 55).jpg");
let song56 = new AudioPlayer("Sha EK Freestyle","Sha EK","MusicWebsite/Sha EK Freestyle.mp3","AlbumCovers/artwork (copy 56).jpg");
let song57 = new AudioPlayer("Slow Motion","Kyle Richh,Jenn Carter,41","MusicWebsite/Slow Motion.mp3","AlbumCovers/artwork (copy 57).jpg");
let song58 = new AudioPlayer("SnapBack","Edot Babyy","MusicWebsite/SnapBack.mp3","AlbumCovers/artwork (copy 58).jpg");
let song59 = new AudioPlayer("STAND OFF","Edot Babyy","MusicWebsite/STAND OFF.mp3","AlbumCovers/artwork (copy 59).jpg");
let song60 = new AudioPlayer("Stressed","Kenzo Balla Archives,Tataaa","MusicWebsite/Stressed.mp3","AlbumCovers/artwork (copy 60).jpg");
let song61 = new AudioPlayer("Stuck In My Ways","Dougie B","MusicWebsite/Stuck In My Ways.mp3","AlbumCovers/artwork (copy 61).jpg");
let song62 = new AudioPlayer("Talk Of the Streets","JStar Balla,DD Osama","MusicWebsite/Talk Of the Streets.mp3","AlbumCovers/artwork (copy 62).jpg");
let song63 = new AudioPlayer("Throw A Few","DJ MotionFetti,Sdot Go.","MusicWebsite/Throw A Few.mp3","AlbumCovers/artwork (copy 63).jpg");
let song64 = new AudioPlayer("Villain","Kenzo Balla","MusicWebsite/Villain.mp3","AlbumCovers/artwork (copy 64).jpg");
let song65 = new AudioPlayer("Wait for You","JayKlickin,DD Osama","MusicWebsite/Wait for You.mp3","AlbumCovers/artwork (copy 65).jpg");
let song66 = new AudioPlayer("Wanna See Me","Say Drilly","MusicWebsite/Wanna See Me.mp3","AlbumCovers/artwork (copy 66).jpg");
let song67 = new AudioPlayer("WHERE ARE YOU NOW","Edot Babyy","MusicWebsite/WHERE ARE YOU NOW.mp3","AlbumCovers/artwork (copy 67).jpg");
let song68 = new AudioPlayer("Who Punchin'","Sha EK","MusicWebsite/Who Punchin'.mp3","AlbumCovers/artwork (copy 68).jpg");
let song69 = new AudioPlayer("Who you","Jb sleeze","MusicWebsite/Who you.mp3","AlbumCovers/artwork (copy 69).jpg");
let song70 = new AudioPlayer("Without You","DD Osama,Notti Osama","MusicWebsite/Without You.mp3","AlbumCovers/artwork (copy 70).jpg");
let song71 = new AudioPlayer("Wonder [OTR FREESTYLE] (feat. Rayy Balla)","MusicWebsite/Wonder [OTR FREESTYLE] (feat. Rayy Balla).mp3","MusicWebsite/Wonder [OTR FREESTYLE] (feat. Rayy Balla).mp3","AlbumCovers/artwork (copy 71).jpg")
let song72 = new AudioPlayer("30","Kyle Rich Billz","MusicWebsite/30.mp3","AlbumCovers/artwork (copy 139).jpg"); // artwork 139 
let song73 = new AudioPlayer("41 Bop","TaTa,Dee Billz,Jenn Carter,Kyle Richh,Jay Gelato,Miah Kenzo","MusicWebsite/41 Bop.mp3","AlbumCovers/artwork (copy 72).jpg");
let song74 = new AudioPlayer("41 CYPHER","TaTa,Jenn Carter,Dee Billz,Jerry West,Jay Gelato,FMB Savo,Kyle Richh","MusicWebsite/41 CYPHER.mp3","AlbumCovers/artwork (copy 73).jpg");

// new songs
let song75 = new AudioPlayer("700 DOAK","Bucky B,Blitz Gz","MusicWebsite/700 DOAK.mp3","AlbumCovers/artwork (copy 117).jpg");
let song76 = new AudioPlayer("Act Bad","B-Lovee,2Rare","MusicWebsite/Act Bad.mp3","AlbumCovers/artwork (copy 118).jpg");
let song77 = new AudioPlayer("AYO BRI REMIX","SugarHill Keem,Oy Quan","MusicWebsite/AYO BRI REMIX.mp3","AlbumCovers/artwork (copy 119).jpg");
let song78 = new AudioPlayer("back to back","DD Osama","MusicWebsite/back to back ddosama.mp3","AlbumCovers/artwork (copy 120).jpg");
let song79 = new AudioPlayer("Beat the Odds","Sha EK","MusicWebsite/Beat the Odds.mp3","AlbumCovers/artwork (copy 121).jpg");
let song80 = new AudioPlayer("Being Honest","Kay Flock","MusicWebsite/Being Honest.mp3","AlbumCovers/artwork (copy 122).jpg");
let song81 = new AudioPlayer("Bestie","Ndotspinalot","MusicWebsite/Bestie.mp3","AlbumCovers/artwork (copy 123).jpg");
let song82 = new AudioPlayer("Better Days","Blockwork","MusicWebsite/Better Days.mp3","AlbumCovers/artwork (copy 124).jpg");
let song83 = new AudioPlayer("Bonnie & Clyde","DD Osama","MusicWebsite/Bonnie & Clyde.mp3","AlbumCovers/artwork (copy 125).jpg");
let song84 = new AudioPlayer("Brotherly Love (Pt. 2) (feat. Dougie B & B-Lovee)","Kay Flock,Dougie B,B-Lovee","MusicWebsite/Brotherly Love (Pt. 2) (feat. Dougie B & B-Lovee).mp3","AlbumCovers/artwork (copy 126).jpg");
let song85 = new AudioPlayer("Cant Go","KALIQ","MusicWebsite/Cant Go.mp3","AlbumCovers/artwork (copy 127).jpg");
let song86 = new AudioPlayer("Da Real Brotherly Love","King Fendi,DD Osama,JStar Balla,JayKlickin","MusicWebsite/Da Real Brotherly Love.mp3","AlbumCovers/artwork (copy 128).jpg");
let song87 = new AudioPlayer("Don’t Panic ft. Cito Blick & Pdot Sav","Kenzo Balla,Cito Blick,Pdot Sav","MusicWebsite/Don’t Panic ft. Cito Blick & Pdot Sav.mp3","AlbumCovers/artwork (copy 129).jpg");
let song88 = new AudioPlayer("DOTTY BOPP","Yus Gz","MusicWebsite/DOTTY BOPP.mp3","AlbumCovers/artwork (copy 130).jpg");
let song89 = new AudioPlayer("E4N","Edot Babyy,Sugarhill Ddot,DD Osama,Dudeylo,Roscoe G,JStar Balla","MusicWebsite/E4N.mp3","AlbumCovers/artwork (copy 131).jpg");
let song91 = new AudioPlayer("Eater","917 Rackz,Sdot Go,Jay Hound","MusicWebsite/Eater.mp3","AlbumCovers/artwork (copy 132).jpg");
let song92 = new AudioPlayer("Feel The Rage","Kenzo Balla","MusicWebsite/Feel The Rage.mp3","AlbumCovers/artwork (copy 133).jpg");
let song93 = new AudioPlayer("Finish The War","Edot Babyy,Sha EK","MusicWebsite/Finish The War.mp3","AlbumCovers/artwork (copy 134).jpg");
let song94 = new AudioPlayer("Flame Em","brennannocap,Jo Bandzz,Kay FIock,Setty B","MusicWebsite/Flame Em.mp3","AlbumCovers/artwork (copy 135).jpg");
let song95 = new AudioPlayer("Free Rico","Q Da Fool","MusicWebsite/Free Rico.mp3","AlbumCovers/artwork (copy 136).jpg");
let song96 = new AudioPlayer("FTH","B-Lovee","MusicWebsite/FTH.mp3","AlbumCovers/artwork (copy 137).jpg");
let song97 = new AudioPlayer("Good riddance","Fr33bandit,Quelly Woo","MusicWebsite/Good riddance.mp3","AlbumCovers/artwork (copy 138).jpg");
// completes loop with music start at 99
let song98 = new AudioPlayer("Hazard Lights","Sdot Go","MusicWebsite/Sdot Go (GOMD).mp3","AlbumCovers/artwork (copy 99).jpg");
let song99 = new AudioPlayer("Heartless (featuring Ray Balla & Hunta)","TG Crippy, Kenzo Balla, Ray Balla, Hunta","MusicWebsite/Heartless (featuring Ray Balla & Hunta).mp3","AlbumCovers/artwork (copy 100).jpg");
let song100 = new AudioPlayer("Hollows","Sdot Go,Jay Hound,NazGPG","MusicWebsite/Hollows.mp3","AlbumCovers/artwork (copy 101).jpg");
let song101= new AudioPlayer("I Can't Help It (feat. B-Lovee)","Wan Billz,B-Lovee","MusicWebsite/I Can't Help It (feat. B-Lovee).mp3","AlbumCovers/artwork (copy 102).jpg");
let song102= new AudioPlayer("In My Moods","Kenzo Balla","MusicWebsite/In My Moods.mp3","AlbumCovers/artwork (copy 103).jpg");
let song103= new AudioPlayer("It's About Time","Sha EK","MusicWebsite/It's About Time.mp3","AlbumCovers/artwork (copy 104).jpg");
let song104= new AudioPlayer("Jiggy In Jersey Pt. 2","Bandmanrill,mcvertt,Sha EK","MusicWebsite/Jiggy In Jersey Pt. 2.mp3","AlbumCovers/artwork (copy 105).jpg");
let song105= new AudioPlayer("Leave Me Alone","Say Drilly","MusicWebsite/Leave Me Alone.mp3","AlbumCovers/artwork (copy 106).jpg");
// skip 107
let song106= new AudioPlayer("Love Struggles","Dallah,Kyle Richh,Jenn Carter","MusicWebsite/Love Struggles.mp3","AlbumCovers/artwork (copy 108).jpg");
let song107= new AudioPlayer("M Row 'Bad Day'","WhoRunIt Records","MusicWebsite/M Row 'Bad Day'.mp3","AlbumCovers/artwork (copy 109).jpg");
let song108= new AudioPlayer("Maybach","Mr Bond,Kenzo Balla,Ray Balla","MusicWebsite/Maybach.mp3","AlbumCovers/artwork (copy 110).jpg");
let song109= new AudioPlayer("Me Myself & I","brennannocap,Kay FIock","MusicWebsite/Me Myself & I.mp3","AlbumCovers/artwork (copy 111).jpg");
let song110= new AudioPlayer("Me, Myself & I","Lee Drilly","MusicWebsite/Me, Myself & I.mp3","AlbumCovers/artwork (copy 112).jpg");
let song111= new AudioPlayer("Mixed Emotions","keem gtfm,TG Flocka","MusicWebsite/Mixed Emotions.mp3","AlbumCovers/artwork (copy 113).jpg");
let song112= new AudioPlayer("My Type Of Time","Kenzo Balla","MusicWebsite/My Type Of Time.mp3","AlbumCovers/artwork (copy 114).jpg");
let song113 = new AudioPlayer("Numb (unreleased)","Say Drilly","MusicWebsite/Say Drilly - Numb (Unreleased).mp3","AlbumCovers/artwork (copy 140).jpg")
let song114 = new AudioPlayer("Dead Game PT.2","Say Drilly X Mdot EBK X Ewuu X La X DG Karti X Melo","MusicWebsite/Say Drilly X Mdot EBK X Ewuu X La X DG Karti X Melo - Dead Game PT.2 (Official Music Video) KJShotIt.mp3","AlbumCovers/artwork (copy 141).jpg")
let song115 = new AudioPlayer("Rosa","Shaa Gz","MusicWebsite/Rosa.mp3","AlbumCovers/artwork (copy 142).jpg");
let song116 = new AudioPlayer("Shot in the Party","Sha EK","MusicWebsite/Shot in the Party.mp3","AlbumCovers/artwork (copy 143).jpg");
let song117 = new AudioPlayer("Show Me Love","Lee Drilly","MusicWebsite/Show Me Love.mp3","AlbumCovers/artwork (copy 144).jpg");
let song118 = new AudioPlayer("So Into You","Lee Drilly","MusicWebsite/So Into You.mp3","AlbumCovers/artwork (copy 145).jpg");
let song119 = new AudioPlayer("Spin Back","Christian Cartier,Jay Hound","MusicWebsite/Spin Back.mp3","AlbumCovers/artwork (copy 146).jpg");
let song120 = new AudioPlayer("Spin Thru The Mitch","41, Kyle Richh, Jenn Carter","MusicWebsite/Spin Thru The Mitch.mp3","AlbumCovers/artwork (copy 147).jpg");
let song121 = new AudioPlayer("Taking That Risk","Yus Gz","MusicWebsite/Taking That Risk.mp3","AlbumCovers/artwork (copy 148).jpg");
let song122 = new AudioPlayer("Taking That Trip","Lee Drilly,E-Wuu","MusicWebsite/Taking That Risk.mp3","AlbumCovers/artwork (copy 149).jpg")
let song123 = new AudioPlayer("Talk To Me","Kay FIock","MusicWebsite/Talk To Me.mp3","AlbumCovers/artwork (copy 150).jpg");
let song124 = new AudioPlayer("The One","Lee Drilly","MusicWebsite/The One.mp3","AlbumCovers/artwork (copy 151).jpg");
let song125 = new AudioPlayer("Too Easy","BBG Steppaa","MusicWebsite/Too Easy.mp3","AlbumCovers/artwork (copy 152).jpg")
let song126 = new AudioPlayer("Too Oppy","Sha EK","MusicWebsite/Too Oppy.mp3","AlbumCovers/artwork (copy 153).jpg");
let song127 = new AudioPlayer("Tweak","DudeyLo,Benzo B","MusicWebsite/Tweak.mp3","AlbumCovers/artwork (copy 154).jpg");
let song128 = new AudioPlayer("Where Are You","Rocko Ballin","MusicWebsite/Where Are You.mp3","AlbumCovers/artwork (copy 155).jpg");
let song129 = new AudioPlayer("Who I Am","DD Osama","MusicWebsite/Who I Am.mp3","AlbumCovers/artwork (copy 156).jpg");
let song130 = new AudioPlayer("WICKED","BLOODIE","MusicWebsite/WICKED.mp3","AlbumCovers/artwork (copy 157).jpg");
let song131 = new AudioPlayer("No Adlibs","KALIQ","MusicWebsite/No Adlibs.mp3","AlbumCovers/artwork (copy 158).jpg");
let song132 = new AudioPlayer("New Opp","Sha Gz","MusicWebsite/New Opp.mp3","AlbumCovers/artwork (copy 159).jpg");
let song133 = new AudioPlayer("Nina","Ndotspinalot","MusicWebsite/Nina.mp3","AlbumCovers/artwork (copy 160).jpg");
let song134 = new AudioPlayer("Public Service Announcement","Lee Drilly","MusicWebsite/Public Service Announcement.mp3","AlbumCovers/artwork (copy 161).jpg");
let song135 = new AudioPlayer("50 For 50","Blockwork","MusicWebsite/50 For 50.mp3","AlbumCovers/artwork (copy 162).jpg");
let song137 = new AudioPlayer("AHH HAA","BLOODIE","MusicWebsite/AHH HAA.mp3","AlbumCovers/artwork (copy 163).jpg");
let song138 = new AudioPlayer("Better Off Dead","Sha Gz","MusicWebsite/Better Off Dead.mp3","AlbumCovers/artwork (copy 164).jpg");
let song139 = new AudioPlayer("BluBop2","C Blu","MusicWebsite/BluBop2.mp3","AlbumCovers/artwork (copy 165).jpg");
let song140 = new AudioPlayer("Both Worlds","Edot Babyy","MusicWebsite/Both Worlds.mp3","AlbumCovers/artwork (copy 166).jpg");
let song141 = new AudioPlayer("cater 2 u","DD Osama,Notti Osama,Sugarhill Ddot","MusicWebsite/cater 2 u.mp3","AlbumCovers/artwork (copy 167).jpg");
let song142 = new AudioPlayer("Cloud9","SAVV G,Mir Ebk","MusicWebsite/Cloud9.mp3","AlbumCovers/artwork (copy 168).jpg");
let song143 = new AudioPlayer("Cold War","Jay5ive,NazGPG,Sdot Go,Jay Hound","MusicWebsite/Cold War.mp3","AlbumCovers/artwork (copy 169).jpg");
let song144 = new AudioPlayer("Da Real Brotherly Love 2","JStar Balla,DD Osama,JayKlickin","MusicWebsite/Da Real Brotherly Love 2.mp3","AlbumCovers/artwork (copy 170).jpg");
let song145 = new AudioPlayer("Dead Opps","DD Osama,Notti Osama","MusicWebsite/Dead Opps.mp3","AlbumCovers/artwork (copy 171).jpg");
let song146 = new AudioPlayer("Dyin 2 live","Blockwork","MusicWebsite/Dyin 2 Live.mp3","AlbumCovers/artwork (copy 172).jpg");
let song147 = new AudioPlayer("Everybody Sweap","TG Crippy","MusicWebsite/Everybody Sweap.mp3","AlbumCovers/artwork (copy 173).jpg");
let song148 = new AudioPlayer("Face Of The What ","Wowdy HBTL,Sha EK","MusicWebsite/Face Of The What .mp3","AlbumCovers/artwork (copy 174).jpg");
let song149 = new AudioPlayer("Fallen soldiers","Blockwork","MusicWebsite/Fallen soldiers.mp3","AlbumCovers/artwork (copy 175).jpg");
let song150 = new AudioPlayer("Fetty","41,Kyle Richh,Jenn Carter,TaTa","MusicWebsite/Fetty.mp3","AlbumCovers/artwork (copy 176).jpg");
let song151 = new AudioPlayer("Freak Freak","B-Lovee","MusicWebsite/Freak Freak.mp3","AlbumCovers/artwork (copy 177).jpg");
let song152 = new AudioPlayer("Insecurities","TaTa","MusicWebsite/Insecurities.mp3","AlbumCovers/artwork (copy 178).jpg");
let song153 = new AudioPlayer("Let Ha Go","Sugarhill Ddot","MusicWebsite/Let Ha Go.mp3","AlbumCovers/artwork (copy 179).jpg");
let song154 = new AudioPlayer("Long Live Notti","DD Osama","MusicWebsite/Long Live Notti.mp3","AlbumCovers/artwork (copy 180).jpg");
let song155 = new AudioPlayer("Notti Bop","Kyle Richh,TaTa,Jenn Carter","MusicWebsite/Notti Bop.mp3","AlbumCovers/artwork (copy 181).jpg");
let song156 = new AudioPlayer("On the Radar Freestyle","Kenzo Balla","MusicWebsite/On the Radar Freestyle 2.mp3","AlbumCovers/artwork (copy 182).jpg");
let song157 = new AudioPlayer("ONNAT","JStar Balla,Sugarhill Tj,Reese Loc","MusicWebsite/ONNAT.mp3","AlbumCovers/artwork (copy 183).jpg");
let song158 = new AudioPlayer("Poppa Perry","Sha Gz","MusicWebsite/Poppa Perry.mp3","AlbumCovers/artwork (copy 184).jpg");
let song159 = new AudioPlayer("Pray For Us","ReyFlock Gz,Sha EverythingK,BDOT Goon","MusicWebsite/Pray For Us.mp3","AlbumCovers/artwork (copy 185).jpg");
let song161 = new AudioPlayer("Ready 4 War","Edot Babyy","MusicWebsite/Ready 4 War.mp3","AlbumCovers/artwork (copy 186).jpg");
let song162 = new AudioPlayer("READY","BLOODIE","MusicWebsite/READY.mp3","AlbumCovers/artwork (copy 187).jpg","");
let song163 = new AudioPlayer("Shake It (feat. Cardi B, Dougie B & Bory300)","Kay Flock,Cardi B,Dougie B,Bory300","MusicWebsite/Shake It (feat. Cardi B, Dougie B & Bory300).mp3","AlbumCovers/artwork (copy 188).jpg");
let song164 = new AudioPlayer("Supa Sitchy","Kenzo Balla","MusicWebsite/Supa Sitchy.mp3","AlbumCovers/artwork (copy 189).jpg");
let song165 = new AudioPlayer("Taco","C Blu,M1 Reaper,Cito Blicc","MusicWebsite/Taco.mp3","AlbumCovers/artwork (copy 190).jpg");
let song166 = new AudioPlayer("To Whom It May Concern","41,TaTa,Touchamill","MusicWebsite/To Whom It May Concern.mp3","AlbumCovers/artwork (copy 191).jpg");
let song167 = new AudioPlayer("Touch The Ground","SugarHill Keem,Sha Ek,Edot Baby","MusicWebsite/Touch The Ground.mp3","AlbumCovers/artwork (copy 192).jpg");
let song168 = new AudioPlayer("Upnow (feat. Coi Leray)","DD Osama,Coi Leray","MusicWebsite/Upnow (feat. Coi Leray).mp3","AlbumCovers/artwork (copy 193).jpg");
let song169 = new AudioPlayer("We Back Pt. 2","Edot Babyy,Dee Play4Keeps","MusicWebsite/We Back Pt. 2.mp3","AlbumCovers/artwork (copy 194).jpg");
let song170 = new AudioPlayer("Autograph","Juice WRLD","MusicWebsite/Juice WRLD .mp3","AlbumCovers/JRAdnd3ORXM-HD.jpg");
let song171 = new AudioPlayer("734 OG","Juice WRLD","MusicWebsite/Juice WRLD - 734 (OG).mp3","AlbumCovers/emIsJ-czz5I-HD.jpg");







