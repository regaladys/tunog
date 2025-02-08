// 9 Feb 2025
// working selective controls for in range trees

// TODOs
// test with actual location
// autoplay when in range
// pause when out of range
// looped playing
// warning when you are out of range

// Code from Radu Mariescu-Istodor
// https://www.youtube.com/watch?v=Uki99zJ2UQs

// adapted from wakibadz.github.io

let CURRENT_LOCATION = null;

// para sa function setA(), setB()
let A = null;
let B = null;

// palibot ng bawat puno para makapakinig, meters
// para sa function loob()
const palibot = 250;

// 12 puno sa academic oval
const puno_01 = { latitude: 14.5883, longitude: 12.126};
const puno_02 = { latitude: 14.6145, longitude: 121.081};
const puno_03 = { latitude: 15.6145, longitude: 121.081};
const puno_04 = { latitude: 14.6145, longitude: 122.081};
const puno_05 = { latitude: 14.6145, longitude: 121.081};
const puno_06 = { latitude: 14.6145, longitude: 121.081};
const puno_07 = { latitude: 14.8283, longitude: 121.500};
const puno_08 = { latitude: 14.6145, longitude: 121.081};
const puno_09 = { latitude: 15.5883, longitude: 121.126};
const puno_10 = { latitude: 14.6145, longitude: 121.081};
const puno_11 = { latitude: 14.6145, longitude: 121.081};
const puno_12 = { latitude: 14.6145, longitude: 121.081};

var mgaPuno = [puno_01, puno_02, puno_03, puno_04, puno_05, puno_06,
    puno_07, puno_08, puno_09, puno_10, puno_11, puno_12];


let track_01;
let track_02;
let track_03;
let track_04;
let track_05;
let track_06;
let track_07;
let track_08;
let track_09;
let track_10;
let track_11;
let track_12;

let tracks = [];

function preload() {
  tracks.push(loadSound('https://cdn.glitch.global/11705c21-ee4f-4749-86b2-dc45b2801bef/01_bbc_tibetan-sn_nhu0501102.mp3?v=1738795399792'));
  tracks.push(loadSound('https://cdn.glitch.global/11705c21-ee4f-4749-86b2-dc45b2801bef/02_bbc_village-at_nhu0500809.mp3?v=1738795414610'));
  tracks.push(loadSound('https://cdn.glitch.global/11705c21-ee4f-4749-86b2-dc45b2801bef/03_bbc_waterfall-_nhu1034887.mp3?v=1738795422911'));
  tracks.push(loadSound('https://cdn.glitch.global/07b173b4-7a28-4629-9804-bb7b4991a7d9/04_bbc_ringing-be_nhu0501405.mp3?v=1739049219667'));
  tracks.push(loadSound('https://cdn.glitch.global/07b173b4-7a28-4629-9804-bb7b4991a7d9/05_bbc_traffic--m_07070197.mp3?v=1739049227566'));
  tracks.push(loadSound('https://cdn.glitch.global/07b173b4-7a28-4629-9804-bb7b4991a7d9/06_bbc_cash-regis_07074232.mp3?v=1739049232932'));
  tracks.push(loadSound('https://cdn.glitch.global/11705c21-ee4f-4749-86b2-dc45b2801bef/01_bbc_tibetan-sn_nhu0501102.mp3?v=1738795399792'));
  tracks.push(loadSound('https://cdn.glitch.global/11705c21-ee4f-4749-86b2-dc45b2801bef/02_bbc_village-at_nhu0500809.mp3?v=1738795414610'));
  tracks.push(loadSound('https://cdn.glitch.global/11705c21-ee4f-4749-86b2-dc45b2801bef/03_bbc_waterfall-_nhu1034887.mp3?v=1738795422911'));
  tracks.push(loadSound('https://cdn.glitch.global/07b173b4-7a28-4629-9804-bb7b4991a7d9/04_bbc_ringing-be_nhu0501405.mp3?v=1739049219667'));
  tracks.push(loadSound('https://cdn.glitch.global/07b173b4-7a28-4629-9804-bb7b4991a7d9/05_bbc_traffic--m_07070197.mp3?v=1739049227566'));
  tracks.push(loadSound('https://cdn.glitch.global/07b173b4-7a28-4629-9804-bb7b4991a7d9/06_bbc_cash-regis_07074232.mp3?v=1739049232932'));
}

function setup() {
  noCanvas();
}

// main(), tatakbo pagka-load ng buong page
function main() {
    let geolocation = null;
    if (window.navigator && window.navigator.geolocation) {
        geolocation = window.navigator.geolocation;
    }

    if (geolocation) {
        geolocation.watchPosition(onLocationUpdate, onError, {
            enableHighAccuracy: true,
            maximumAge: 1000
        });
    } else {
        alert("Cannot access location");
    }
}

function onLocationUpdate(event) {
    CURRENT_LOCATION = event.coords;
    document.getElementById("loc").innerHTML = `Latitude: ${event.coords.latitude}, Longitude: ${event.coords.longitude}`;
    console.log(event);
    console.log("check if inside a fence");
    for (var i = 0; i < mgaPuno.length; i++) {
        loob(i);
    }  
}

function onError(err) {
    alert("Cannot access location: " + err.message);
}

// checking if inside fences
function loob(j) {
    let dist = getDistance(CURRENT_LOCATION,mgaPuno[j]).toFixed(2);
    if (dist < palibot) {
      //document.getElementById("fence").innerHTML = `in range of ${fence}`;
      console.log("INSIDE PLAYING TRACK", j);
      //playAudio(j);
      tracks[j].play();
     
      //document.getElementById(players[j]).setAttribute("controls", "controls");
      //document.getElementById(players[j]).play();
    }
    else { 
      console.log("OUTSIDE");
      tracks[j].stop()
      //pauseAudio(j);
      
      //document.getElementById(players[j]).removeAttribute("controls", "controls");
      //document.getElementById(players[j]).pause();
      
    }
}

//function playAudio(trackIndex){
//  if (tracks[trackIndex] && !tracks[trackIndex].isPlaying()) {
//    tracks[trackIndex].play();
//  }
//}

//function pauseAudio(trackIndex) {
//  if (tracks[trackIndex].isPlaying()) { tracks[trackIndex].pause();}
//}

// button A
function setA() {
    A = CURRENT_LOCATION;
    updateInfo();
    console.log("updated A");
}

// button B
function setB() {
    B = CURRENT_LOCATION;
    updateInfo();
    console.log("updated B");
}

// distance between A and B
function updateInfo() {
    if (A != null) {
        document.getElementById("aBtn").innerHTML = `${A.latitude}<br>${A.longitude}`;
    }

    if (B != null) {
        document.getElementById("bBtn").innerHTML = `${B.latitude}<br>${B.longitude}`;
    }

    if (A != null && B != null) {
        let dist = getDistance(A, B).toFixed(2);
        document.getElementById("info").innerHTML = `Distance between A and B: ${dist} meters`;
    }
}

function latlonToXYZ(latlon, R) {
    const xyz = { x: 0, y: 0, z: 0 };
    xyz.y = Math.sin(degToRad(latlon.latitude)) * R;
    const r = Math.cos(degToRad(latlon.latitude)) * R;
    xyz.x = Math.sin(degToRad(latlon.longitude)) * r;
    xyz.z = Math.cos(degToRad(latlon.longitude)) * r;
    return xyz;
}

function degToRad(degree) {
    return degree * Math.PI / 180;
}

function getDistance(latlon1, latlon2) {
    const R = 6371000; // Earth radius in meters
    const xyz1 = latlonToXYZ(latlon1, R);
    const xyz2 = latlonToXYZ(latlon2, R);
    const eucl = euclidean(xyz1, xyz2);
    return eucl;
}

function euclidean(p1, p2) {
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) +
        (p1.y - p2.y) * (p1.y - p2.y) +
        (p1.z - p2.z) * (p1.z - p2.z)
    );
}


