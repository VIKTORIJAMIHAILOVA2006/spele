const canvas = document.getElementById("spēles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let spēlētājs = { x: 100, y: 300, w: 50, h: 50, krāsa: "blue", ātrumsY: 0, lecienaSpēks: -12, gravitācija: 0.8, uzZemes: true };
let šķērslis = { x: 800, y: 320, w: 40, h: 40, krāsa: "red" };
let spēleBeigusies = false;

function zīmēt() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 350, canvas.width, 50);

    ctx.fillStyle = spēlētājs.krāsa;
    ctx.fillRect(spēlētājs.x, spēlētājs.y, spēlētājs.w, spēlētājs.h);

    ctx.fillStyle = šķērslis.krāsa;
    ctx.fillRect(šķērslis.x, šķērslis.y, šķērslis.w, šķērslis.h);
}

function atjaunināt() {
    spēlētājs.ātrumsY += spēlētājs.gravitācija;
    spēlētājs.y += spēlētājs.ātrumsY;

    if (spēlētājs.y >= 300) {
        spēlētājs.y = 300;
        spēlētājs.ātrumsY = 0;
        spēlētājs.uzZemes = true;
    }

    šķērslis.x -= 5;
    if (šķērslis.x + šķērslis.w < 0) {
        šķērslis.x = 800;
    }

    if (spēlētājs.x < šķērslis.x + šķērslis.w &&
        spēlētājs.x + spēlētājs.w > šķērslis.x &&
        spēlētājs.y + spēlētājs.h > šķērslis.y) {
        spēleBeigusies = false;
    } else if (šķērslis.x + šķērslis.w < spēlētājs.x && !spēleBeigusies) {
        spēleBeigusies = true;
        document.getElementById("spēle-beigusies").style.display = "block";
    }
}

function spēlesGaita() {
    if (!spēleBeigusies) {
        atjaunināt();
        zīmēt();
        requestAnimationFrame(spēlesGaita);
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && spēlētājs.uzZemes) {
        spēlētājs.ātrumsY = spēlētājs.lecienaSpēks;
        spēlētājs.uzZemes = false;
    }
    if (e.code === "KeyR" && spēleBeigusies) {
        spēlētājs.y = 300;
        spēlētājs.ātrumsY = 0;
        spēlētājs.uzZemes = true;
        šķērslis.x = 800;
        spēleBeigusies = false;
        document.getElementById("spēle-beigusies").style.display = "none";
        spēlesGaita();
    }
});

spēlesGaita();
