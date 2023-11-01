const CORE = {
    setup: function (w, h) {
        this.engine = new Engine(w, h);
    }
}

class Engine {
    constructor(w, h) {
        const canvas = document.getElementById("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.style.backgroundColor = "#bbbbbb";
        CORE.canvas = canvas;
        CORE.ctx = canvas.getContext("2d");

        window.addEventListener('resize', () => { this.resizeCanvas(); });
        this.resizeCanvas();
    }
    _requestFrame() {
        this.update();
        requestAnimationFrame(() => { this._requestFrame(); });
    }
    resizeCanvas() {
        const canvas = CORE.canvas;
        const canvasHeightRatio = canvas.height / canvas.width;
        const windowHeightRatio = window.innerHeight / window.innerWidth;

        let width;
        let height;
        if (windowHeightRatio > canvasHeightRatio) {
            width = window.innerWidth;
            height = window.innerWidth * (canvas.height / canvas.width);
        } else {
            width = window.innerHeight * (canvas.width / canvas.height);
            height = window.innerHeight;
        }

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        CORE.resolutionRatio = height / canvas.height;
    }
    preload(data) {
        const length = Object.keys(data).length;
        let count = 0;
        const assets = [];
        for (let key in data) {
            assets[key] = new Image();
            assets[key].src = data[key];
            assets[key].onload = () => {
                if (++count == length) {
                    this.onload();
                }
            }
        }
        CORE.assets = assets;
    }
    clearCanvas() {//画面をクリア(前の画面描画を削除)
        CORE.ctx.clearRect(0, 0, CORE.canvas.width, CORE.canvas.height);
    }
    start() {
        this.init();
        requestAnimationFrame(() => { this._requestFrame(); });
    }
    onload() { }
    init() { }
    update() { }
}
function rectFill(x, y, w, h, color) {
    const ctx = CORE.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

const CANVAS_HEIGHT = 1334;
const CANVAS_WIDTH = 750;
const RED = "#ffffff";
const BLUE = "#999999";
const CW = 750, CH = 1334;
class Tile {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.row = 0;
        this.col = 0;
    }
}

class Block {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.row = 0;
        this.col = 0;
        this.color = "#000000";
    }
    draw() {
        rectFill(this.x, this.y, this.row, this.col, this.color);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const tileSize = 115;
const margin = 7;
const tiles = [];
const Len = 5;
now_x = 4, now_y = 0;
oni_x = 1, oni_y = 1;
turn = 1;
flag = 0;
f_t = 1000000000;
const V = 1030, D = 40, L = 30, K = 105;
const seq_p = [[4, 1], [4, 4]];
const seq_q = [[2, 2]];
const Blocks = [];
t_c = 0;
p = 0, q = 0;
time = 0;
tmp = 0;
const C = 5, LL = 0;
tx = 0, ty = 0;
s = 0, t = 0;
vc = [0, 0, 0];
mn = 20.0;
const dx = [[0, -1], [-1, 0], [1, 0], [0, 1]];
tx = 0, ty = 0, ox = 0, oy = 0;
a = 0, b = 0;
f_tmp = 0;
eps = 0.0;
isEnd = 0;
isStart = 0;
s = 0;

/// FontFaceオブジェクト生成
var fontFace = new FontFace(
    'deathspirit',
    'url(./Death_Spirit.ttf)',
    { style: 'normal', weight: 700 }
);

var fontFace2 = new FontFace(
    'nemuke',
    'url(./NemukeMedium.otf)',
    { style: 'normal', weight: 700 }
);

fontFace.load().then(function (loadedFace) {
    document.fonts.add(loadedFace);
    document.body.style.fontFamily = '"deathspirit"';
}).catch(function (e) {
    /// フォント読み込み失敗
    console.error('読み込み失敗...');
});


fontFace2.load().then(function (loadedFace) {
    document.fonts.add(loadedFace);
    document.body.style.fontFamily = '"nemuke"';
}).catch(function (e) {
    /// フォント読み込み失敗
    console.error('読み込み失敗...');
});

T = 75;
class CanvasOp {
    update(timestamp) {
        if (!isStart) {
            const ctx = CORE.ctx;
            ctx.font = "100px nemuke";
            ctx.clearRect(0, 0, CW, CH);
            textWidth = ctx.measureText("ゲーム説明").width;
            ctx.fillText("ゲーム説明", (CW - textWidth) / 2, 200);
            ctx.font = "35px nemuke";
            textWidth = ctx.measureText("1-3 HR 聴覚脱出ゲーム").width;
            ctx.fillText("       聴覚脱出ゲーム", (CW - textWidth) / 2, 320);
            ctx.font = "35px deathspirit";
            ctx.fillText("1-3 HR 　　　　　　", (CW - textWidth) / 2, 320);
            textWidth = ctx.measureText("「ESCAPE FROM SILENT LAB」の").width;
            ctx.fillText("「ESCAPE FROM SILENT LAB」　", (CW - textWidth) / 2, 320 + T);
            ctx.font = "35px nemuke";
            ctx.fillText("　                      の", (CW - textWidth) / 2, 320 + T);
            textWidth = ctx.measureText("ゲーム性を再現したゲームです。").width;
            ctx.fillText("ゲーム性を再現したゲームです。", (CW - textWidth) / 2, 320 + 2 * T);
            textWidth = ctx.measureText("鬼から逃げ切ってゴールに").width;
            ctx.fillText("鬼から逃げ切ってゴールに", (CW - textWidth) / 2, 320 + 3 * T);
            textWidth = ctx.measureText("たどり着けばクリアです。").width;
            ctx.fillText("たどり着けばクリアです。", (CW - textWidth) / 2, 320 + 4 * T);
            textWidth = ctx.measureText("鬼の位置は見えませんが、").width;
            ctx.fillText("鬼の位置は見えませんが、", (CW - textWidth) / 2, 320 + 5 * T);
            textWidth = ctx.measureText("センサーによって鬼の").width;
            ctx.fillText("センサーによって鬼の", (CW - textWidth) / 2, 320 + 6 * T);
            textWidth = ctx.measureText("大体の方向を知ることができます。").width;
            ctx.fillText("大体の方向を知ることができます。", (CW - textWidth) / 2, 320 + 7 * T);
            textWidth = ctx.measureText("それでは、お楽しみください。").width;
            ctx.fillText("それでは、お楽しみください。", (CW - textWidth) / 2, 320 + 8 * T);
            textWidth = ctx.measureText("このゲームが面白いと思ったら").width;
            ctx.fillText("このゲームが面白いと思ったら", (CW - textWidth) / 2, 320 + 9 * T);
            textWidth = ctx.measureText("1-3 HR への大衆賞をぜひ！").width;
            ctx.fillText("       への大衆賞をぜひ！", (CW - textWidth) / 2, 320 + 10 * T);
            ctx.font = "35px deathspirit";
            ctx.fillText(" 1-3 HR 　　　　　　　　　", (CW - textWidth) / 2, 320 + 10 * T);
            ctx.font = "35px nemuke";
            if (performance.now() / 1000 - Math.floor(performance.now() / 1000) <= 0.4) {
                ctx.font = "40px deathspirit";
                textWidth = ctx.measureText("TAP : START").width;
                ctx.fillText("TAP : START", (CW - textWidth) / 2, 320 + 11 * T + 40);
            }
        }
        if (isStart) {
            const ctx = CORE.ctx;
            for (i = 0; i < 5; ++i) {
                for (j = 0; j < 5; ++j) {
                    ctx.clearRect(tiles[i][j].x + 3, tiles[i][j].y + 3, tileSize - 6, tileSize - 6);
                }
            }
            ctx.font = "60px deathspirit";
            ctx.fillStyle = "#000000";
            ctx.clearRect(80, 1010, 250, 70);
            ctx.fillText("SENSOR", 80, 1070);
            {
                const tile = new Block();
                tile.x = CW / 2 - K / 2 + 150;
                tile.y = V;
                tile.row = K;
                tile.col = K;
                ctx.clearRect(tile.x, tile.y, tile.row, tile.col);
                tile.color = "#eeeeee";
                Blocks[0] = tile;
                tile.draw();
                ctx.beginPath();
                p = CW / 2 - K / 2 + 150, q = V;
                ctx.moveTo(p, q);
                ctx.lineTo(p + K, q);
                ctx.lineTo(p + K, q + K);
                ctx.lineTo(p, q + K);
                ctx.closePath();
                ctx.strokeStyle = "#222222";
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.font = "90px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("U").width;
                ctx.fillText("U", p + (K - textWidth) / 2, q + K - 10);
            }
            {
                const tile = new Block();
                tile.x = CW / 2 - K / 2 + 150;
                tile.y = V + K + D;
                tile.row = K;
                tile.col = K;
                ctx.clearRect(tile.x, tile.y, tile.row, tile.col);
                tile.color = "#eeeeee";
                Blocks[1] = tile;
                tile.draw();
                p = CW / 2 - K / 2 + 150, q = V + K + D
                ctx.moveTo(p, q);
                ctx.lineTo(p + K, q);
                ctx.lineTo(p + K, q + K);
                ctx.lineTo(p, q + K);
                ctx.closePath();
                ctx.strokeStyle = "#333333";
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.font = "90px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("D").width;
                ctx.fillText("D", p + (K - textWidth) / 2, q + K - 10);
            }
            {
                const tile = new Block();
                tile.x = CW / 2 - K / 2 - L - K + 150;
                tile.y = V + K / 2 + D / 2;
                tile.row = K;
                tile.col = K;
                ctx.clearRect(tile.x, tile.y, tile.row, tile.col);
                tile.color = "#eeeeee";
                Blocks[2] = tile;
                tile.draw();
                p = CW / 2 - K / 2 - L - K + 150, q = V + K / 2 + D / 2;
                ctx.moveTo(p, q);
                ctx.lineTo(p + K, q);
                ctx.lineTo(p + K, q + K);
                ctx.lineTo(p, q + K);
                ctx.closePath();
                ctx.strokeStyle = "#333333";
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.font = "90px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("L").width;
                ctx.fillText("L", p + (K - textWidth) / 2, q + K - 10);
            }
            {
                const tile = new Block();
                tile.x = CW / 2 + K / 2 + L + 150;
                tile.y = V + K / 2 + D / 2;
                tile.row = K;
                tile.col = K;
                ctx.clearRect(tile.x, tile.y, tile.row, tile.col);
                tile.color = "#eeeeee";
                Blocks[3] = tile;
                tile.draw();
                p = CW / 2 + K / 2 + L + 150, q = V + K / 2 + D / 2;
                ctx.moveTo(p, q);
                ctx.lineTo(p + K, q);
                ctx.lineTo(p + K, q + K);
                ctx.lineTo(p, q + K);
                ctx.closePath();
                ctx.strokeStyle = "#222222";
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.font = "90px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("R").width;
                ctx.fillText("R", p + (K - textWidth) / 2, q + K - 10);
            }
            ctx.font = "90px deathspirit";
            ctx.fillStyle = "#000000";
            ctx.clearRect(0, CANVAS_HEIGHT / 2 - 600, CANVAS_WIDTH, 120);
            var textWidth = ctx.measureText("Turn : " + turn.toString(10)).width;
            ctx.fillText("Turn : " + turn.toString(10), (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 510);
            time = performance.now() / 400;
            time -= Math.floor(time / 4) * 4;
            if (time < 1) {
                tmp = (time * time - 1) * 3.14 / C;
            }
            else if (time < 2) {
                tmp = (2 - (2 - time) * (2 - time) - 1) * 3.14 / C;
            }
            else if (time < 3) {
                tmp = (2 - (2 - time) * (2 - time) - 1) * 3.14 / C;
            }
            else {
                tmp = ((4 - time) * (4 - time) - 1) * 3.14 / C;
            }
            t_c = Math.sqrt((oni_x - now_x) * (oni_x - now_x) + (oni_y - now_y) * (oni_y - now_y));
            if (t_c == 0) {
                t_c = 1;
            }
            p = (oni_x - now_x) / t_c * Math.cos(tmp + eps * 3.14 / 2) - (oni_y - now_y) / t_c * Math.sin(tmp + eps * 3.14 / 2);
            q = (oni_x - now_x) / t_c * Math.sin(tmp + eps * 3.14 / 2) + (oni_y - now_y) / t_c * Math.cos(tmp + eps * 3.14 / 2);
            ctx.clearRect(60, 1080, 220, 220);
            ctx.beginPath();
            ctx.moveTo(170, 1190);
            ctx.lineTo(170 + q * 70, 1190 + p * 70);
            ctx.closePath();
            ctx.strokeStyle = "#333333";
            ctx.lineWidth = 8;
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(170, 1190, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            ctx.fillStyle = "#333333";
            ctx.fill();
            ctx.beginPath();
            ctx.arc((tiles[now_x][now_y].x + tileSize / 2), (tiles[now_x][now_y].y + tileSize / 2), tileSize / 2 - 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            ctx.fillStyle = "#cccc00";
            ctx.fill();
            {
                s = 4, t = 0;
                tx = t * tileSize + t * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
                ty = s * tileSize + s * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
                ctx.font = "90px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("S").width;
                ctx.fillText("S", tx + (tileSize - textWidth) / 2, ty + 90);
            }
            {
                s = 4, t = 4;
                tx = t * tileSize + t * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
                ty = s * tileSize + s * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
                ctx.font = "90px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("G").width;
                ctx.fillText("G", tx + (tileSize - textWidth) / 2, ty + 90);
            }

            isClear();
            isFail();
            ctx.clearRect((CW - 600) / 2, 170, 600, 170);
            if (!flag && !isEnd) {
                const ctx = CORE.ctx;
                ctx.font = "60px deathspirit";
                ctx.fillStyle = "#cc2222";
                var textWidth = ctx.measureText("YOUR TURN").width;
                ctx.fillText("YOUR TURN", (CW - textWidth) / 2, 270);
            }
            if (flag && !isEnd && performance.now() / 1000) {
                const ctx = CORE.ctx;
                ctx.font = "60px deathspirit";
                ctx.fillStyle = "#2222cc";
                var textWidth = ctx.measureText("DEMON'S TURN").width;
                ctx.fillText("DEMON'S TURN", (CW - textWidth) / 2, 270);
            }
            if (isEnd && now_x == 4 && now_y == 4) {
                ctx.font = "70px deathspirit";
                ctx.fillStyle = "#cc2222";
                var textWidth = ctx.measureText("CLEAR").width;
                ctx.fillText("CLEAR", (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 400);

                ctx.font = "40px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("TAP : CONTINUE").width;
                ctx.fillText("TAP : CONTINUE", (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 340);
            }
            if (isEnd && now_x == oni_x && now_y == oni_y) {
                ctx.font = "70px deathspirit";
                ctx.fillStyle = "#2222cc";
                var textWidth = ctx.measureText("FAIL").width;
                ctx.fillText("FAIL", (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 400);

                ctx.font = "40px deathspirit";
                ctx.fillStyle = "#000000";
                var textWidth = ctx.measureText("TAP : CONTINUE").width;
                ctx.fillText("TAP : CONTINUE", (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 340);
            }
            if (performance.now() / 1000 - f_t >= 0.7 && !isEnd) {
                flag = 0, f_t = 1000000000;
                mn = 20.0;
                for (i = 0; i < 4; ++i) {
                    tx = oni_x + dx[i][0], ty = oni_y + dx[i][1];
                    ox = now_x, oy = now_y;
                    if (tx < 0 || ty < 0 || 5 <= tx || 5 <= ty) continue;
                    if (Math.abs(dx[i][1]) == 1) {
                        a = tx, b = Math.max(oni_y, ty);
                        f_tmp = 1;
                        for (t = 0; t < seq_p.length; ++t) {
                            if (a == seq_p[t][0] && b == seq_p[t][1]) {
                                f_tmp = 0;
                            }
                        }
                        if (f_tmp == 0) {
                            continue;
                        }
                    }
                    if (Math.abs(dx[i][0]) == 1) {
                        a = Math.max(oni_x, tx), b = ty;
                        f_tmp = 1;
                        for (t = 0; t < seq_q.length; ++t) {
                            if (a == seq_q[t][0] && b == seq_q[t][1]) {
                                f_tmp = 0;
                            }
                        }
                        if (f_tmp == 0) {
                            continue;
                        }
                    }
                    if (Math.sqrt((tx - ox) * (tx - ox) + (ty - oy) * (ty - oy)) <= mn) {
                        vc = [i, tx - ox, ty - oy];
                        mn = Math.sqrt((tx - ox) * (tx - ox) + (ty - oy) * (ty - oy));
                    }
                }
                oni_x += dx[vc[0]][0], oni_y += dx[vc[0]][1];
                eps = Math.random() / (2 * C) - 1.0 / (4 * C);
            }
        }
        window.requestAnimationFrame((timestamp) => this.update(timestamp));
    }
}

function Start() {
    isStart = 1;
    const ctx = CORE.ctx;
    ctx.clearRect(0, 0, CORE.canvas.width, CORE.canvas.height);
    for (let i = 0; i < 5; i++) {
        tiles[i] = [];
        for (let j = 0; j < 5; j++) {
            const tile = new Tile();
            tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
            tile.row = i;
            tile.col = j;
            tiles[i][j] = tile;
        }
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if ((i != 0 && i != 5) && (j != 0 && j != 5)) {
                continue;
            }
            const tile = new Block();
            tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2 - margin;
            tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL - margin;
            tile.row = margin;
            tile.col = margin;
            tile.color = "#333333";
            tile.draw();
        }
    }
    for (i = 0; i < 5; ++i) {
        for (j = 0; j < 6; ++j) {
            if (j != 0 && j != 5) {
                continue;
            }
            const tile = new Block();
            tile.x = j * tileSize + (j - 1) * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
            tile.row = 7;
            tile.col = tileSize;
            tile.color = "#333333";
            tile.draw();
        }
    }
    for (t = 0; t < seq_p.length; ++t) {
        i = seq_p[t][0], j = seq_p[t][1];
        const tile = new Block();
        tile.x = j * tileSize + (j - 1) * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
        tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
        tile.row = 7;
        tile.col = tileSize;
        tile.color = "#333333";
        tile.draw();
    }
    for (i = 0; i < 6; ++i) {
        if (i != 0 && i != 5) {
            continue;
        }
        for (j = 0; j < 5; ++j) {
            const tile = new Block();
            tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            tile.y = i * tileSize + (i - 1) * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
            tile.row = tileSize;
            tile.col = 7;
            tile.color = "#333333";
            tile.draw();
        }
    }
    for (t = 0; t < seq_q.length; ++t) {
        i = seq_q[t][0], j = seq_q[t][1];
        const tile = new Block();
        tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
        tile.y = i * tileSize + (i - 1) * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - LL;
        tile.row = tileSize;
        tile.col = 7;
        tile.color = "#333333";
        tile.draw();
    }
}

window.onload = function () {
    CORE.setup(CANVAS_WIDTH, CANVAS_HEIGHT);
    s = getRandomInt(3);
    if (s == 0) {
        oni_x = 3, oni_y = 4;
    }
    if (s == 1) {
        oni_x = 4, oni_y = 3;
    }
    if (s == 2) {
        oni_x = 2, oni_y = 3;
    }
    
    
    canvas = new CanvasOp();
    canvas.update(0);
    CORE.canvas.addEventListener("pointerdown", (e) => {
        if (isStart && !flag && !isEnd) {
            f = false;
            f |= checkTiles0(e);
            f |= checkTiles1(e);
            f |= checkTiles2(e);
            f |= checkTiles3(e);
            if (f) {
                flag = 1, f_t = performance.now() / 1000;
            }
        }
        if (isStart && isEnd) {
            const ctx = CORE.ctx;
            now_x = 4, now_y = 0;
            s = getRandomInt(3);
            if (s == 0) {
                oni_x = 3, oni_y = 4;
            }
            if (s == 1) {
                oni_x = 4, oni_y = 3;
            }
            if (s == 2) {
                oni_x = 2, oni_y = 3;
            }
            eps = Math.random() / (2 * C) - 1.0 / (4 * C);
            turn = 1;
            flag = 0;
            f_t = 1000000000;
            isEnd = 0;
        }
        if (!isStart) {
            Start();
        }
    });
}
function isClear() {
    if (now_x == 4 && now_y == 4) {
        isEnd = 1;
    }
}
function isFail() {
    if (now_x == oni_x && now_y == oni_y) {
        isEnd = 1;
    }
}
function checkTiles0(e) {
    const x = e.offsetX / CORE.resolutionRatio;
    const y = e.offsetY / CORE.resolutionRatio;
    i = now_x, j = now_y;
    const tile = Blocks[0];
    if (x >= tile.x && x <= tile.x + tile.row && y >= tile.y && y <= tile.y + tile.row && i != 0) {
        for (t = 0; t < seq_q.length; ++t) {
            p = seq_q[t][0], q = seq_q[t][1];
            if (p == now_x && q == now_y) {
                return false;
            }
        }
        eps = Math.random() / (2 * C) - 1.0 / (4 * C);
        turn += 1;
        now_x -= 1;
        return true;
    }
    return false;
}

function checkTiles1(e) {
    const x = e.offsetX / CORE.resolutionRatio;
    const y = e.offsetY / CORE.resolutionRatio;
    i = now_x, j = now_y;
    const tile = Blocks[1];
    if (x >= tile.x && x <= tile.x + tile.row && y >= tile.y && y <= tile.y + tile.row && i != 4) {
        for (t = 0; t < seq_q.length; ++t) {
            p = seq_q[t][0], q = seq_q[t][1];
            if (p == now_x + 1 && q == now_y) {
                return false;
            }
        }
        eps = Math.random() / (2 * C) - 1.0 / (4 * C);
        turn += 1;
        now_x += 1;
        return true;
    }
    return false;
}

function checkTiles2(e) {
    const x = e.offsetX / CORE.resolutionRatio;
    const y = e.offsetY / CORE.resolutionRatio;
    i = now_x, j = now_y;
    const tile = Blocks[2];
    if (x >= tile.x && x <= tile.x + tile.row && y >= tile.y && y <= tile.y + tile.row && j != 0) {
        for (t = 0; t < seq_p.length; ++t) {
            p = seq_p[t][0], q = seq_p[t][1];
            if (p == now_x && q == now_y) {
                return false;
            }
        }
        eps = Math.random() / (2 * C) - 1.0 / (4 * C);
        turn += 1;
        now_y -= 1;
        return true;
    }
    return false;
}

function checkTiles3(e) {
    const x = e.offsetX / CORE.resolutionRatio;
    const y = e.offsetY / CORE.resolutionRatio;
    i = now_x, j = now_y;
    const tile = Blocks[3];
    if (x >= tile.x && x <= tile.x + tile.row && y >= tile.y && y <= tile.y + tile.row && j != 4) {
        for (t = 0; t < seq_p.length; ++t) {
            p = seq_p[t][0], q = seq_p[t][1];
            if (p == now_x && q == now_y + 1) {
                return false;
            }
        }
        eps = Math.random() / (2 * C) - 1.0 / (4 * C);
        turn += 1;
        now_y += 1;
        return true;
    }
    return false;
}
