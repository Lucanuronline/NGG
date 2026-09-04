function oeffneSkinVorschau(skin) {
    let overlay = document.createElement("div");
    overlay.className = "vorschau-overlay";

    overlay.innerHTML =
        "<div class='vorschau-modal'>" +
            "<h3>" + skin.titel + "</h3>" +
            "<canvas id='vorschauCanvas' width='280' height='180'></canvas>" +
            "<button class='vorschau-schliessen-btn'>Schließen</button>" +
        "</div>";

    document.body.appendChild(overlay);

    overlay.querySelector(".vorschau-schliessen-btn").addEventListener("click", function() {
        clearInterval(vorschauLoop);
        overlay.remove();
    });

    let canvas = document.getElementById("vorschauCanvas");
    let ctx = canvas.getContext("2d");
    let vorschauLoop = starteVorschauAnimation(ctx, canvas, skin);
}

function starteVorschauAnimation(ctx, canvas, skin) {
    if (skin.spiel === "snake") {
        return animiereSnakeVorschau(ctx, canvas, skin);
    }
    if (skin.spiel === "breakout") {
        return animiereBreakoutVorschau(ctx, canvas, skin);
    }
    if (skin.spiel === "aim") {
        return animiereAimVorschau(ctx, canvas, skin);
    }
    if (skin.spiel === "flappy") {
        return animiereFlappyVorschau(ctx, canvas, skin);
    }
    if (skin.spiel === "ttt") {
        return animiereTttVorschau(ctx, canvas, skin);
    }
    if (skin.spiel === "mines") {
        return animiereMinesVorschau(ctx, canvas, skin);
    }
}

function animiereSnakeVorschau(ctx, canvas, skin) {
    let segmente = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
    let richtung = "rechts";
    let groesse = 20;

    return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let kopf = { x: segmente[0].x, y: segmente[0].y };
        if (richtung === "rechts") kopf.x++;
        if (kopf.x * groesse >= canvas.width) { kopf.x = 0; }

        segmente.unshift(kopf);
        segmente.pop();

        for (let i = 0; i < segmente.length; i++) {
            ctx.fillStyle = i === 0 ? skin.kopfFarbe : skin.koerperFarbe;
            ctx.beginPath();
            ctx.roundRect(segmente[i].x * groesse + 1, segmente[i].y * groesse + 1, groesse - 2, groesse - 2, 4);
            ctx.fill();
        }
    }, 200);
}

function animiereBreakoutVorschau(ctx, canvas, skin) {
    let ballX = 50, ballY = 50, speedX = 2.5, speedY = 2;

    return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ballX += speedX;
        ballY += speedY;

        if (ballX <= 0 || ballX >= canvas.width - 15) speedX = -speedX;
        if (ballY <= 0 || ballY >= canvas.height - 15) speedY = -speedY;

        ctx.fillStyle = skin.ballFarbe;
        ctx.beginPath();
        ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = skin.schlaegerFarbe;
        ctx.beginPath();
        ctx.roundRect(canvas.width / 2 - 30, canvas.height - 15, 60, 10, 5);
        ctx.fill();
    }, 30);
}

function animiereAimVorschau(ctx, canvas, skin) {
    let radius = 15;
    let wachsend = true;

    return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        radius += wachsend ? 0.5 : -0.5;
        if (radius >= 22) wachsend = false;
        if (radius <= 15) wachsend = true;

        ctx.fillStyle = skin.zielFarbe;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fill();
    }, 30);
}

function animiereFlappyVorschau(ctx, canvas, skin) {
    let roehreX = canvas.width;

    return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        roehreX -= 3;
        if (roehreX < -40) roehreX = canvas.width;

        ctx.fillStyle = skin.roehreFarbe;
        ctx.fillRect(roehreX, 0, 40, 60);
        ctx.fillRect(roehreX, 120, 40, 60);

        ctx.fillStyle = "#ffb347";
        ctx.beginPath();
        ctx.arc(60, 90, 15, 0, Math.PI * 2);
        ctx.fill();
    }, 30);
}

function animiereTttVorschau(ctx, canvas, skin) {
    let phase = 0;

    return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#34d6ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(100, 20); ctx.lineTo(100, 160);
        ctx.moveTo(180, 20); ctx.lineTo(180, 160);
        ctx.moveTo(20, 60); ctx.lineTo(260, 60);
        ctx.moveTo(20, 120); ctx.lineTo(260, 120);
        ctx.stroke();

        phase += 0.05;
        let alpha = (Math.sin(phase) + 1) / 2;

        ctx.strokeStyle = skin.xFarbe;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(45, 35); ctx.lineTo(75, 55);
        ctx.moveTo(75, 35); ctx.lineTo(45, 55);
        ctx.stroke();

        ctx.fillStyle = skin.oFarbe;
        ctx.globalAlpha = 1 - alpha;
        ctx.beginPath();
        ctx.arc(140, 90, 20, 0, Math.PI * 2, true);
        ctx.lineWidth = 5;
        ctx.strokeStyle = skin.oFarbe;
        ctx.stroke();

        ctx.globalAlpha = 1;
    }, 30);
}

function animiereMinesVorschau(ctx, canvas, skin) {
    let phase = 0;

    return setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        phase += 0.05;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 6; c++) {
                let glow = (Math.sin(phase + r + c) + 1) / 2;
                ctx.fillStyle = "#241c52";
                ctx.fillRect(c * 45 + 10, r * 45 + 10, 40, 40);
                ctx.strokeStyle = skin.akzentFarbe;
                ctx.globalAlpha = 0.3 + glow * 0.7;
                ctx.lineWidth = 2;
                ctx.strokeRect(c * 45 + 10, r * 45 + 10, 40, 40);
            }
        }
        ctx.globalAlpha = 1;
    }, 30);
}