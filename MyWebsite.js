let beginValue = 0;
let title;
let artist;
let songID;
let cover;
let objectList = [""];
let getSong;
let randomIndex;


let randomSong;
let songImage;// gets the image for song in selectSong() 
let audio;
let currentsliderValue = 0; // used in updateSlider() to keep track of seconds for slider
var dur; // duration of song
let constantVolume;
let issongSelected = false;

let isprevSong = false;
let prevSong = 0;
let prevSongList = [""];
let prevCoverList = [""];
let prevArtistList = [""];
let prevTitleList = [""];

let skipSong = document.getElementById("skip");  // event listner variable for skip();
let getsliderPosition = document.getElementById("positionSlider"); // slider for sliderUpdate();
let getsliderVolume = document.getElementById("volumeSlider");
let getButton = document.getElementById("myButton");
let getMute = document.getElementById("mute");
let getPrev = document.getElementById("prevSong")
let getImage = document.getElementById("songCover");
let getartistName = document.getElementById("artistName");
let getTitle = document.getElementById("songTitle");
let getIcon = getButton.querySelector(".fa-play");
let getvolumeIcon = getMute.querySelector(".fa-volume-high");

getButton.addEventListener("click",play);
skipSong.addEventListener("click",skip);
getMute.addEventListener("click",muteSong);
getPrev.addEventListener("click",playprevSong);

class AudioPlayer{
    constructor(title,artist,songID,cover){
        this.title = title;
        this.artist = artist;
        this.songID = songID;
        this.cover = cover;

        objectList.push(this);
    }
}

let song = new AudioPlayer("Llkd","Dudylo","MusicWebsite/Llkd.mp3","AlbumCovers/artwork (copy 41).jpg");
let song1 = new AudioPlayer("'Letter To My Brother' Bootleg Kev Freestyle","Kyle Richh,Jenn Carter","MusicWebsite/'Letter To My Brother' Bootleg Kev Freestyle.mp3","AlbumCovers/artwork.jpg");
let song2 = new AudioPlayer("300 shots", "Sha Ek","MusicWebsite/300 Shots.mp3","AlbumCovers/artwork (copy 2).jpg");
let song3 = new AudioPlayer("300FLOCKA SHOT","Yus Gz,Sha Gzz,Nesty Gzz","MusicWebsite/300FLOCKA SHOT.mp3","AlbumCovers/artwork (copy 3).jpg");
let song4 = new AudioPlayer("4148 (feat. Edot Babyy)","DD Osama,Edot Babyy,Lawsy","MusicWebsite/4148 (feat. Edot Babyy).mp3","AlbumCovers/artwork (copy 4).jpg");
let song5 = new AudioPlayer("AFRICAN DEMONS PT2","Yus Gz,Scotty 2 Hotty,Nesty Floxks,Ab Da Jet","MusicWebsite/AFRICAN DEMONS PT2.mp3","AlbumCovers/artwork (copy 5).jpg");
let song6 = new AudioPlayer("B-Lovee - Freestyle - Open Mic","DJ Smallz,Studio Of Legends,B-Lovee","MusicWebsite/B-Lovee - Freestyle - Open Mic.mp3","AlbumCovers/artwork (copy 6).jpg");
let song7 = new AudioPlayer("BACKDOOR","Yus Gz","MusicWebsite/BACKDOOR.mp3","AlbumCovers/artwork (copy 7).jpg");
let song8 = new AudioPlayer("Beam","Kyle Richh,Mike Myerzz","AlbumCovers/artwork (copy 8).jpg","AlbumCovers/artwork (copy 8).jpg");
let song9 = new AudioPlayer("Big Time Rush","BigKayBeezy","MusicWebsite/Big Time Rush.mp3","AlbumCovers/artwork (copy 10).jpg");
let song10 = new AudioPlayer("Box","Sha EK,Defiant Presents","MusicWebsite/Box.mp3","AlbumCovers/artwork (copy 10).jpg");
let song11 = new AudioPlayer("BREAKIN THE CODE","Kyle Richh","MusicWebsite/BREAKIN THE CODE.mp3","AlbumCovers/artwork (copy 11).jpg","AlbumCovers/artwork (copy 11).jpg");
let song12 = new AudioPlayer("Bussin Oota's","Roscoe G,DudeyLo","MusicWebsite/Bussin Oota's.mp3","AlbumCovers/artwork (copy 12).jpg");
let song13 = new AudioPlayer("Catch Up","BBG Steppaa,DD Osama","MusicWebsite/Catch Up.mp3","AlbumCovers/artwork (copy 13).jpg");
let song14 = new AudioPlayer("Chosen Ones","DD Osama,Deon","MusicWebsite/Chosen Ones.mp3","AlbumCovers/artwork (copy 14).jpg");
let song15 = new AudioPlayer("Coe Pt. 2","justn,Sha EK,B-Lovee,150 Entertainment","MusicWebsite/Coe Pt. 2.mp3","AlbumCovers/artwork (copy 15).jpg");
let song16 = new AudioPlayer("Cuz We Did","41,TaTa,Kyle Richh","MusicWebsite/Cuz We Did.mp3","AlbumCovers/artwork (copy 16).jpg");
let song17 = new AudioPlayer("Demon","Nas Ebk,Set Da Trend","MusicWebsite/Demon.mp3","AlbumCovers/artwork (copy 17).jpg");
let song18 = new AudioPlayer("Dreams","Yus Gz","MusicWebsite/Dreams.mp3","AlbumCovers/artwork (copy 18).jpg");
let song19 = new AudioPlayer("Dyin 2 Live Pt 2","Blockwork","AlbumCovers/artwork (copy 19).jpg","AlbumCovers/artwork (copy 19).jpg");
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
let song33 = new AudioPlayer("I'm Addicted 2","laykied,Kyleee","MusicWebsite/I'm Addicted 2.mp3","AlbumCovers/artwork (copy 33).jpg");
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
let song67 = new AudioPlayer("WHERE ARE YOU NOW","Edot Babyy","","MusicWebsite/WHERE ARE YOU NOW.mp3","AlbumCovers/artwork (copy 67).jpg");
let song68 = new AudioPlayer("Who Punchin'","Sha EK","MusicWebsite/Who Punchin'.mp3","AlbumCovers/artwork (copy 68).jpg");
let song69 = new AudioPlayer("Who you","Jb sleeze","MusicWebsite/Who you.mp3","AlbumCovers/artwork (copy 69).jpg");
let song70 = new AudioPlayer("Without You","DD Osama,Notti Osama","MusicWebsite/Without You.mp3","AlbumCovers/artwork (copy 70).jpg");
let song71 = new AudioPlayer("Wonder [OTR FREESTYLE] (feat. Rayy Balla)","MusicWebsite/Wonder [OTR FREESTYLE] (feat. Rayy Balla).mp3","MusicWebsite/Wonder [OTR FREESTYLE] (feat. Rayy Balla).mp3","AlbumCovers/artwork (copy 71).jpg")
let song72 = new AudioPlayer("30","Kyle Rich Billz","MusicWebsite/30.mp3","AlbumCovers/LastAdditionArtWork/artwork.jpg");
let song73 = new AudioPlayer("41 Bop","TaTa,Dee Billz,Jenn Carter,Kyle Richh,Jay Gelato,Miah Kenzo","MusicWebsite/41 Bop.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 2).jpg");
let song74 = new AudioPlayer("41 CYPHER","TaTa,Jenn Carter,Dee Billz,Jerry West,Jay Gelato,FMB Savo,Kyle Richh","MusicWebsite/41 CYPHER.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 3).jpg");
let song75 = new AudioPlayer("700 DOAK","Bucky B,Blitz Gz","MusicWebsite/700 DOAK.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 4).jpg");
let song76 = new AudioPlayer("Act Bad","B-Lovee,2Rare","MusicWebsite/Act Bad.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 5).jpg");
let song77 = new AudioPlayer("AYO BRI REMIX","SugarHill Keem,Oy Quan","MusicWebsite/AYO BRI REMIX.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 6).jpg");
let song78 = new AudioPlayer("back to back ddosama","Shonentobii","MusicWebsite/back to back ddosama.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 7).jpg");
let song79 = new AudioPlayer("Beat the Odds","Sha EK","MusicWebsite/Beat the Odds.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 8).jpg");
let song80 = new AudioPlayer("Being Honest","Kay Flock","MusicWebsite/Being Honest.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 9).jpg");
let song81 = new AudioPlayer("Bestie","Ndotspinalot","MusicWebsite/Bestie.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 10).jpg");
let song82 = new AudioPlayer("Better Days","Blockwork","MusicWebsite/Better Days.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 11).jpg");
let song83 = new AudioPlayer("Bonnie & Clyde","DD Osama","MusicWebsite/Bonnie & Clyde.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 12).jpg");
let song84 = new AudioPlayer("Brotherly Love (Pt. 2) (feat. Dougie B & B-Lovee)","Kay Flock,Dougie B,B-Lovee","MusicWebsite/Brotherly Love (Pt. 2) (feat. Dougie B & B-Lovee).mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 13).jpg");
let song85 = new AudioPlayer("Cant Go","KALIQ","MusicWebsite/Cant Go.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 14).jpg");
let song86 = new AudioPlayer("Da Real Brotherly Love","King Fendi,DD Osama,JStar Balla,JayKlickin","MusicWebsite/Da Real Brotherly Love.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 15).jpg");
let song87 = new AudioPlayer("Don’t Panic ft. Cito Blick & Pdot Sav","Kenzo Balla,Cito Blick,Pdot Sav","MusicWebsite/Don’t Panic ft. Cito Blick & Pdot Sav.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 16).jpg");
let song88 = new AudioPlayer("DOTTY BOPP","Yus Gz","MusicWebsite/DOTTY BOPP.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 17).jpg");
let song89 = new AudioPlayer("E4N","Edot Babyy,Sugarhill Ddot,DD Osama,Dudeylo,Roscoe G,JStar Balla","MusicWebsite/E4N.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 18).jpg");
let song91 = new AudioPlayer("Eater","917 Rackz,Sdot Go,Jay Hound","MusicWebsite/Eater.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 19).jpg");
let song92 = new AudioPlayer("Feel The Rage","Kenzo Balla","MusicWebsite/Feel The Rage.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 20).jpg");
let song93 = new AudioPlayer("Finish The War","Edot Babyy,Sha EK","MusicWebsite/Finish The War.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 21).jpg");
let song94 = new AudioPlayer("Flame Em","brennannocap,Jo Bandzz,Kay FIock,Setty B","MusicWebsite/Feel The Rage.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 22).jpg");
let song95 = new AudioPlayer("Free Rico","Q Da Fool","MusicWebsite/Free Rico.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 23).jpg");
let song96 = new AudioPlayer("FTH","B-Lovee","MusicWebsite/FTH.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 24).jpg");
let song97 = new AudioPlayer("Good riddance","Fr33bandit,Quelly Woo","MusicWebsite/Good riddance.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 25).jpg");
let song98 = new AudioPlayer("Hazard Lights","Sdot Go","MusicWebsite/Sdot Go (GOMD).mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 26).jpg");
let song99 = new AudioPlayer("Heartless (featuring Ray Balla & Hunta)","MusicWebsite/Heartless (featuring Ray Balla & Hunta).mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 27).jpg");
let song100 = new AudioPlayer("Hollows","Sdot Go,Jay Hound,NazGPG","MusicWebsite/Hollows.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 28).jpg");
let song101= new AudioPlayer("I Can't Help It (feat. B-Lovee)","Wan Billz,B-Lovee","MusicWebsite/I Can't Help It (feat. B-Lovee).mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 29).jpg");
let song102= new AudioPlayer("In My Moods","Kenzo Balla","MusicWebsite/In My Moods.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 30).jpg");
let song103= new AudioPlayer("It's About Time","Sha EK","MusicWebsite/It's About Time.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 31).jpg");
let song104= new AudioPlayer("Jiggy In Jersey Pt. 2","Bandmanrill,mcvertt,Sha EK","MusicWebsite/Jiggy In Jersey Pt. 2.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 32).jpg");
let song105= new AudioPlayer("Leave Me Alone","Say Drilly","MusicWebsite/Leave Me Alone.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 33).jpg");
let song106= new AudioPlayer("Love Struggles","Dallah,Kyle Richh,Jenn Carter","MusicWebsite/Love Struggles.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 35).jpg");
let song107= new AudioPlayer("M Row 'Bad Day'","WhoRunIt Records","MusicWebsite/M Row 'Bad Day'.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 36).jpg");
let song108= new AudioPlayer("Maybach","Mr Bond,Kenzo Balla,Ray Balla","MusicWebsite/Maybach.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 37).jpg");
let song109= new AudioPlayer("Me Myself & I","brennannocap,Kay FIock","MusicWebsite/Me Myself & I.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 38).jpg");
let song110= new AudioPlayer("Me, Myself & I","Lee Drilly","MusicWebsite/Me, Myself & I.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 39).jpg");
let song111= new AudioPlayer("Mixed Emotions","keem gtfm,TG Flocka","MusicWebsite/Mixed Emotions.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 40).jpg");
let song112= new AudioPlayer("My Type Of Time","Kenzo Balla","MusicWebsite/My Type Of Time.mp3","AlbumCovers/LastAdditionArtWork/artwork (copy 41).jpg");



// HOW TO SET SRC TO A FUNCTION OR VARIABLE AND HOW TO FIX COVER ART LINK

async function selectSong(){
    try{
        randomIndex = await Math.floor(Math.random() * objectList.length);
        getSong = await objectList[randomIndex];
        randomSong = await getSong.songID;
        songImage = await objectList[randomIndex].cover;
        console.log(audio);
        
        prevSongList.push(randomSong);
        prevCoverList.push(getSong.cover);
        prevArtistList.push(getSong.artist);
        prevTitleList.push(getSong.title);
        prevSong++;

        console.log(`before await: ${audio}`);
        audio = await new Audio(randomSong);
        console.log(`After awiat: ${audio}`);
        console.log(audio);
        return true;

    } catch (error){
        console.log(`Error: ${error}`);
    }
    
}
function setArtist(){
    getartistName.innerHTML = getSong.artist;
}

function setTitle(){
    getTitle.innerHTML = getSong.title;
}

async function setImage(){
    getImage.src = await songImage;
    await console.log("currently setting image");
}

async function selectprevSong(){
    if(prevSong > 0){
        audio = await new Audio(prevSongList[prevSong]); // Cant find preSong line 58
        songImage = prevCoverList[prevSong]; // to set new album cover
        console.log("getting previous image"); // pinpoint setting previous image
        getartistName.innerHTML = prevArtistList[prevSong];
        getTitle.innerHTML = prevTitleList[prevSong];
        console.log(objectList[prevSong]);
    }
    else{
        window.alert("No previous songs");
        prevSong = 0;
    }
    console.log(audio);
    
}

function setVolume(){
    audio.volume = getsliderVolume.value * 0.01;
    getsliderVolume.value = constantVolume;
}

function volume_change(){
    audio.volume = getsliderVolume.value *.01;
    constantVolume = getsliderVolume.value
    return audio.volume;
}

function position_change(){
    getsliderPosition.min = 0;
    getsliderPosition.max = audio.duration;
    audio.currentTime = getsliderPosition.value; // sets current time to starting time for updateSlider();
    currentsliderValue = audio.currentTime;
    currentsliderValue++;
}

function muteSong(){
    if(audio.volume > 0){
        audio.volume = 0;
        getsliderVolume.value = 0;
        getvolumeIcon.classList.replace("fa-volume-high","fa-volume-xmark");
    }
    else if (audio.volume == 0){
        getsliderVolume.value = constantVolume;
        audio.volume = constantVolume *0.01;
        console.log(audio.volume);
        getvolumeIcon.classList.replace("fa-volume-xmark","fa-volume-high");
    }
    
}
async function skip(){
    if(beginValue == 1){
        beginValue--;
    }
    audio.currentTime = 0;
    getsliderPosition.value = audio.currentTime;
    currentsliderValue = audio.currentTime;
    clearInterval(timer);
    audio.pause();
    audio = null;
    // need to figure out why await is not awaiting. LIKELY NEED TO MOVE ALL DIS STUFF BACK TO SELECT SONG THEN CALL SELECT SONG IN SKIP TO RUN.
    await selectSong();
    await audio.play();
    
    console.log("Image tryna be set");
    setArtist();
    setTitle();
    toggleIcon();
    setImage();
    setVolume();
    beginValue++;
    getsliderPosition.max = audio.duration;
    constantVolume = getsliderVolume.value;
    timer = setInterval(updateTrack,1000);
    console.log(audio);
}

async function playprevSong(){ // need to play previous song rest is fix except for mute
    if (beginValue == 1){
        beginValue--;
    }
    audio.currentTime = 0;
    getsliderPosition.value = audio.currentTime;
    currentsliderValue = audio.currentTime;
    prevSong--;
    clearInterval(timer);
    audio.pause();
    audio = null;
    await selectprevSong();
    console.log(audio);
    setImage();
    setVolume();
    play();
}

function toggleIcon(){
    if (getIcon.classList.contains("fa-play")){
        getIcon.classList.replace("fa-play","fa-pause");
    }
    else{
        getIcon.classList.replace("fa-pause","fa-play");
        console.log("Did toggle work");
    }
}

async function play(){
    if (beginValue == 0){
        if(audio != null){
            beginValue++;
            audio.play();
            toggleIcon();
            console.log("Image tryna be set first if");
            timer = setInterval(updateTrack,1000);
        }
        else{
            issongSelected = await selectSong();
            if (issongSelected){
                try{
                    await audio.play(); //  JUST NEED TO FIX AWAIT ON AUDIO FREEZING PAGE. CONSOLE SHOWS I GOT AN AUDIO BUT SOMEHOW AUDIO.PLAY NOT WORKING. MAY NEED TO CHECK ON SELECT AUDIO IN SELECTSONG();
                } catch (Error){
                    console.log(Error);
                }
                console.log("Image tryna be set")
                setImage()
                console.log("is image set")
                setArtist()
                setTitle()
                toggleIcon()
                beginValue++
                getsliderPosition.max = audio.duration
                constantVolume = getsliderVolume.value
                timer = setInterval(updateTrack,1000);
                console.log(audio)
            }
            
                             
             
        }
    }
    else if(beginValue ==1){
        await toggleIcon();
        beginValue--;
        console.log("This is running too and should not be")
        audio.pause();
        clearInterval(timer);
    }
}

function updateSlider(){
    getsliderPosition.max = audio.duration;
    currentsliderValue++
    getsliderPosition.value = currentsliderValue;
    console.log(getsliderPosition.value);
}

// update track automatically // need to fix tens place for seconds
function updateTrack(){
    if(audio != null){
        var maxMinutes = (Math.floor(audio.duration / 60));
        var maxSeconds = (Math.floor(audio.duration & 60) + 10);
        maxMinutes = pad(maxMinutes);
        maxSeconds = pad(maxSeconds);
        let endtimeEdited = maxMinutes + ":" + maxSeconds; // creates end timestamp
        document.getElementById("endTime").innerHTML = endtimeEdited;

        var minutes = Math.floor(audio.currentTime / 60);
        var seconds = Math.floor(audio.currentTime % 60);
        minutes = pad(minutes); // either adds zero before value if lenght < 2 or remvoes if otherwise.
        seconds = pad(seconds);
        updateSlider();

        if(!isNaN(audio.duration)){
            dur = minutes.substring(-2) + ":" + seconds;
            document.getElementById("currentTime").innerHTML = dur;
        }

        function pad(unit){
            return ("0" + unit).length > 2 ? unit : "0" + unit;
        }

        audio.addEventListener("ended", async() =>{
            await clearInterval(timer);
            skip();
        })
    }
    
}




