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
        canvas.style.backgroundColor = "#999999";
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

/***********************
ここからライツアウトのプログラム
************************/
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
        this.color = RED;
    }
    draw() {
        rectFill(this.x, this.y, tileSize, tileSize, this.color);
    }
}

class Block {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.row = 0;
        this.col = 0;
        this.color = RED;
    }
    draw() {
        rectFill(this.x, this.y, this.row, this.col, this.color);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const tileSize = 110;
const margin = 10;
const tiles = [];
const Len = 5;
now_x = 4, now_y = 0;
oni_x = 4, oni_y = 3;
let turn = 1;
t_col = "#000000";
const V = 1000, D = 40, L = 30, K = 105;
const seq_p = [[4,1],[4,4]];
const seq_q = [[1, 2]];
const Blocks = [];
a = 0, b = 0;
p = 0, q = 0;
time = 0;
tmp = 0;
C = 5;
tx = 0, ty = 0;
s = 0, t = 0;
class CanvasOp {
    update(timestamp) {
        const ctx = CORE.ctx;
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
        p = a * Math.cos(tmp) - b * Math.sin(tmp);
        q = a * Math.sin(tmp) + b * Math.cos(tmp);
        ctx.clearRect(60, 890, 220, 270);
        ctx.beginPath();
        ctx.moveTo(170, 1050);
        ctx.lineTo(170 + q * 100, 1050 + p * 100);
        ctx.closePath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.arc(170, 1050, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
        ctx.fillStyle = "#000000";
        ctx.fill();
        {
            s = 4, t = 0;
            tx = t * tileSize + t * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            ty = s * tileSize + s * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
            const ctx = CORE.ctx;
            ctx.font = '90px fantasy';
            ctx.fillStyle = "#000000";
            var textWidth = ctx.measureText("S").width;
            ctx.fillText("S", tx + (tileSize - textWidth) / 2, ty + tileSize - 10);
        }
        {
            s = 4, t = 4;
            tx = t * tileSize + t * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            ty = s * tileSize + s * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
            const ctx = CORE.ctx;
            ctx.font = '90px fantasy';
            ctx.fillStyle = "#000000";
            var textWidth = ctx.measureText("G").width;
            ctx.fillText("G", tx + (tileSize - textWidth) / 2, ty + tileSize - 10);
        }
        window.requestAnimationFrame((timestamp) => this.update(timestamp));
    }
}

window.onload = function () {
    CORE.setup(CANVAS_WIDTH, CANVAS_HEIGHT);
    s = getRandomInt(5);
    if (s == 0) {
        oni_x = 3, oni_y = 4;
    }
    if (s == 1) {
        oni_x = 4, oni_y = 3;
    }
    if (s == 2) {
        oni_x = 2, oni_y = 3;
    }
    if (s == 3) {
        oni_x = 1, oni_y = 4;
    }
    if (s == 4) {
        oni_x = 0, oni_y = 3;
    }
    {
        ctx = CORE.ctx;
        ctx.font = '60px fantasy';
        ctx.fillStyle = "#000000";
        var textWidth = ctx.measureText("SENSOR").width;
        ctx.fillText("SENSOR", 80, 1250);
    }
    for (let i = 0; i < 5; i++) {
        tiles[i] = [];
        for (let j = 0; j < 5; j++) {
            const tile = new Tile();
            tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
            tile.row = i;
            tile.col = j;
            if (i == 4 && j == 0) {
                tile.color = RED;
                tile.draw();
            }
            /*if (i == oni_x && j == oni_y) {
                tile.color = "#00ffff";
                tile.draw();
            }*/
            tiles[i][j] = tile;
        }
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const tile = new Block();
            tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2 - margin;
            tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100 - margin;
            tile.row = margin;
            tile.col = margin;
            tile.color = "#000000";
            tile.draw();
        }
    }
    {
        mn = Math.sqrt((oni_x - now_x) * (oni_x - now_x) + (oni_y - now_y) * (oni_y - now_y));
        a = (oni_x - now_x) / mn, b = (oni_y - now_y) / mn;
        theta = (Math.random() / C - 1.0 / (2 * C)) * 3.14;
        x = a * Math.cos(theta) - b * Math.sin(theta);
        y = a * Math.sin(theta) + b * Math.cos(theta);
        a = x, b = y;
    }
    for (i = 0; i < 5; ++i) {
        for (j = 0; j < 6; ++j) {
            const tile = new Block();
            tile.x = j * tileSize + (j - 1) * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
            tile.row = margin;
            tile.col = tileSize;
            tile.color = "#000000";
            tile.draw();
        }
    }
    for (t = 0; t < seq_p.length; ++t) {
        i = seq_p[t][0], j = seq_p[t][1];
        const tile = new Block();
        tile.x = j * tileSize + (j - 1) * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
        tile.y = i * tileSize + i * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
        tile.row = margin;
        tile.col = tileSize;
        tile.color = "#00cc00";
        tile.draw();
    }
    for (i = 0; i < 6; ++i) {
        for (j = 0; j < 5; ++j) {
            const tile = new Block();
            tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
            tile.y = i * tileSize + (i - 1) * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
            tile.row = tileSize;
            tile.col = margin;
            tile.color = "#000000";
            tile.draw();
        }
    }
    for (t = 0; t < seq_q.length; ++t) {
        i = seq_q[t][0], j = seq_q[t][1];
        const tile = new Block();
        tile.x = j * tileSize + j * margin + margin * 0.5 + (CANVAS_WIDTH - (tileSize + margin) * 5) / 2;
        tile.y = i * tileSize + (i - 1) * margin + margin * 0.5 + (CANVAS_HEIGHT - (tileSize + margin) * 5) / 2 - 100;
        tile.row = tileSize;
        tile.col = margin;
        tile.color = "#00cc00";
        tile.draw();
    }
    {
        const tile = new Block();
        tile.x = CW / 2 - K / 2 + 150;
        tile.y = V;
        tile.row = K;
        tile.col = K;
        tile.color = "#cccccc";
        Blocks[0] = tile;
        tile.draw();
        const ctx = CORE.ctx;
        ctx.beginPath();
        p = CW / 2 - K / 2 + 150, q = V;
        ctx.moveTo(p, q);
        ctx.lineTo(p + K, q);
        ctx.lineTo(p + K, q + K);
        ctx.lineTo(p, q + K);
        ctx.closePath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.font = '90px fantasy';
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
        tile.color = "#cccccc";
        Blocks[1] = tile;
        tile.draw();
        p = CW / 2 - K / 2 + 150, q = V + K + D;
        const ctx = CORE.ctx;
        ctx.moveTo(p, q);
        ctx.lineTo(p + K, q);
        ctx.lineTo(p + K, q + K);
        ctx.lineTo(p, q + K);
        ctx.closePath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.font = '90px fantasy';
        ctx.fillStyle = "#000000";
        var textWidth = ctx.measureText("D").width;
        ctx.fillText("D", p + (K - textWidth) / 2, q + K - 10);
    }
    {
        const tile = new Block();
        tile.x = CW / 2 - K / 2 - L - K + 150;
        tile.y = V + K / 2 + D;
        tile.row = K;
        tile.col = K;
        tile.color = "#cccccc";
        Blocks[2] = tile;
        tile.draw();
        p = CW / 2 - K / 2 - L - K + 150, q = V + K / 2 + D;
        const ctx = CORE.ctx;
        ctx.moveTo(p, q);
        ctx.lineTo(p + K, q);
        ctx.lineTo(p + K, q + K);
        ctx.lineTo(p, q + K);
        ctx.closePath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.font = '90px fantasy';
        ctx.fillStyle = "#000000";
        var textWidth = ctx.measureText("L").width;
        ctx.fillText("L", p + (K - textWidth) / 2, q + K - 10);
    }
    {
        const tile = new Block();
        tile.x = CW / 2 + K / 2 + L + 150;
        tile.y = V + K / 2 + D;
        tile.row = K;
        tile.col = K;
        tile.color = "#cccccc";
        Blocks[3] = tile;
        tile.draw();
        p = CW / 2 + K / 2 + L + 150, q = V + K / 2 + D;
        const ctx = CORE.ctx;
        ctx.moveTo(p, q);
        ctx.lineTo(p + K, q);
        ctx.lineTo(p + K, q + K);
        ctx.lineTo(p, q + K);
        ctx.closePath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.font = '90px fantasy';
        ctx.fillStyle = "#000000";
        var textWidth = ctx.measureText("R").width;
        ctx.fillText("R", p + (K - textWidth) / 2, q + K - 10);
    }
    {
        const ctx = CORE.ctx;
        ctx.font = '100px fantasy';
        ctx.fillStyle = t_col;
        var textWidth = ctx.measureText("Turn : " + turn.toString(10)).width;
        ctx.fillText("Turn : " + turn.toString(10), (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 500);
    }
    canvas = new CanvasOp();
    canvas.update(0);
    CORE.canvas.addEventListener("pointerdown", (e) => {
        f = false;
        f |= checkTiles0(e);
        f |= checkTiles1(e);
        f |= checkTiles2(e);
        f |= checkTiles3(e);
        isClear();
        isFail();
        if (f) {
            /*tiles[oni_x][oni_y].color = "#777777";
            tiles[oni_x][oni_y].draw();*/
            vc = [0, 0, 0];
            mn = 20.0;
            dx = [[0, -1], [-1, 0], [1, 0], [0, 1]];
            for (i = 0; i < 4; ++i) {
                tx = oni_x + dx[i][0], ty = oni_y + dx[i][1];
                ox = now_x, oy = now_y;
                if (tx < 0 || ty < 0 || 5 <= tx || 5 <= ty) continue;
                if (Math.abs(dx[i][1]) == 1) {
                    a = tx, b = Math.max(oni_y, ty);
                    f = 1;
                    for (t = 0; t < seq_p.length; ++t) {
                        if (a == seq_p[t][0] && b == seq_p[t][1]) {
                            f = 0;
                        }
                    }
                    if (f == 0) {
                        continue;
                    }
                }
                if (Math.abs(dx[i][0]) == 1) {
                    a = Math.max(oni_x, tx), b = ty;
                    f = 1;
                    for (t = 0; t < seq_q.length; ++t) {
                        if (a == seq_q[t][0] && b == seq_q[t][1]) {
                            f = 0;
                        }
                    }
                    if (f == 0) {
                        continue;
                    }
                }
                if (Math.sqrt((tx - ox) * (tx - ox) + (ty - oy) * (ty - oy)) <= mn) {
                    vc = [i, tx - ox, ty - oy];
                    mn = Math.sqrt((tx - ox) * (tx - ox) + (ty - oy) * (ty - oy));
                }
            }
            oni_x += dx[vc[0]][0], oni_y += dx[vc[0]][1];
            if (mn == 0) {
                mn = 1;
            }
            /*tiles[oni_x][oni_y].color = "#00ffff";
            tiles[oni_x][oni_y].draw();*/
            a = vc[1] / mn, b = vc[2] / mn;
            theta = (Math.random() / C - 1.0 / (C * 2)) * 3.14;
            x = a * Math.cos(theta) - b * Math.sin(theta);
            y = a * Math.sin(theta) + b * Math.cos(theta);
            a = x, b = y;
        }
        isFail();
    });
}
function isClear() {
    if (now_x == 4 && now_y == 4) {
        const ctx = CORE.ctx;
        ctx.font = '80px fantasy';
        ctx.fillStyle = "#cc0000";
        var textWidth = ctx.measureText("CLEAR").width;
        ctx.fillText("CLEAR", (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 + 300);
    }
}
function isFail() {
    if (now_x == oni_x && now_y == oni_y) {
        const ctx = CORE.ctx;
        ctx.font = '80px fantasy';
        ctx.fillStyle = "#0000cc";
        var textWidth = ctx.measureText("FAIL").width;
        ctx.fillText("FAIL", (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 + 300);
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
        turn += 1;
        now_x -= 1;
        const ctx = CORE.ctx;
        ctx.font = '100px fantasy';
        ctx.fillStyle = t_col;
        ctx.clearRect(0, CANVAS_HEIGHT / 2 - 600, CANVAS_WIDTH, 120);
        var textWidth = ctx.measureText("Turn : " + turn.toString(10)).width;
        ctx.fillText("Turn : " + turn.toString(10), (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 500);
        const row = tile.row;
        const col = tile.col;
        tiles[i - 1][j].color = RED;
        tiles[i - 1][j].draw();
        tiles[i][j].color = BLUE;
        tiles[i][j].draw();
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
        turn += 1;
        now_x += 1;
        const ctx = CORE.ctx;
        ctx.font = '100px fantasy';
        ctx.fillStyle = t_col;
        ctx.clearRect(0, CANVAS_HEIGHT / 2 - 600, CANVAS_WIDTH, 120);
        var textWidth = ctx.measureText("Turn : " + turn.toString(10)).width;
        ctx.fillText("Turn : " + turn.toString(10), (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 500);
        const row = tile.row;
        const col = tile.col;
        tiles[i + 1][j].color = RED;
        tiles[i + 1][j].draw();
        tiles[i][j].color = BLUE;
        tiles[i][j].draw();
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
        turn += 1;
        now_y -= 1;
        const ctx = CORE.ctx;
        ctx.font = '100px fantasy';
        ctx.fillStyle = t_col;
        ctx.clearRect(0, CANVAS_HEIGHT / 2 - 600, CANVAS_WIDTH, 120);
        var textWidth = ctx.measureText("Turn : " + turn.toString(10)).width;
        ctx.fillText("Turn : " + turn.toString(10), (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 500);
        const row = tile.row;
        const col = tile.col;
        tiles[i][j - 1].color = RED;
        tiles[i][j - 1].draw();
        tiles[i][j].color = BLUE;
        tiles[i][j].draw();
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
        turn += 1;
        now_y += 1;
        const ctx = CORE.ctx;
        ctx.font = '100px fantasy';
        ctx.fillStyle = t_col;
        ctx.clearRect(0, CANVAS_HEIGHT / 2 - 600, CANVAS_WIDTH, 120);
        var textWidth = ctx.measureText("Turn : " + turn.toString(10)).width;
        ctx.fillText("Turn : " + turn.toString(10), (CANVAS_WIDTH - textWidth) / 2, CANVAS_HEIGHT / 2 - 500);
        const row = tile.row;
        const col = tile.col;
        tiles[i][j + 1].color = RED;
        tiles[i][j + 1].draw();
        tiles[i][j].color = BLUE;
        tiles[i][j].draw();
        return true;
    }
    return false;
}