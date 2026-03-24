$(window).ready(function () {

    document.querySelectorAll('input, textarea').forEach(el => {
        el.setAttribute("data-vnkeys", "");
    });

    let button_aw = document.getElementById("button_aw");
    let button_aa = document.getElementById("button_aa");
    let button_dd = document.getElementById("button_dd");
    let button_ee = document.getElementById("button_ee");
    let button_oo = document.getElementById("button_oo");
    let button_ow = document.getElementById("button_ow");
    let button_uw = document.getElementById("button_uw");

    button_aw.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_aa.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_dd.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_ee.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_oo.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_ow.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_uw.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });

    button_aw.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "ă" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_aa.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "â" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_dd.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "đ" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_ee.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "ê" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_oo.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "ô" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_ow.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "ơ" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_uw.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "ư" + typer.value.substr(typer.selectionEnd);
        typer.selectionStart = SELECT + 1, typer.selectionEnd = SELECT + 1;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    /*
                        <input type="button" value="`" id="button_f"></input>
                        <input type="button" value="´" id="button_s"></input>
                        <input type="button" value=" ̉" id="button_r"></input>
                        <input type="button" value="˜" id="button_x"></input>
                        <input type="button" value=" ̣" id="button_j"></input>
                        */

    let button_f = document.getElementById("button_f");
    let button_s = document.getElementById("button_s");
    let button_r = document.getElementById("button_r");
    let button_x = document.getElementById("button_x");
    let button_j = document.getElementById("button_j");
    button_f.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_s.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_r.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_x.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    button_j.addEventListener("mousedown", (e) => {
        e.preventDefault(); // ← フォーカス移動を阻止
    });
    /*
    a + "\u0301" = á
    a + "\u0300" = à
    a + "\u0309" = ả
    a + "\u0303" = ã
    a + "\u0323" = ạ
    */
    button_f.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        typer.value = typer.value.normalize("NFC");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "\u0300" + typer.value.substr(typer.selectionEnd);
        typer.value = typer.value.normalize("NFC");
        typer.selectionStart = SELECT, typer.selectionEnd = SELECT;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_s.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        typer.value = typer.value.normalize("NFC");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "\u0301" + typer.value.substr(typer.selectionEnd);
        typer.value = typer.value.normalize("NFC");
        typer.selectionStart = SELECT, typer.selectionEnd = SELECT;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_r.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        typer.value = typer.value.normalize("NFC");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "\u0309" + typer.value.substr(typer.selectionEnd);
        typer.value = typer.value.normalize("NFC");
        typer.selectionStart = SELECT, typer.selectionEnd = SELECT;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_x.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        typer.value = typer.value.normalize("NFC");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "\u0303" + typer.value.substr(typer.selectionEnd);
        typer.value = typer.value.normalize("NFC");
        typer.selectionStart = SELECT, typer.selectionEnd = SELECT;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    button_j.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        typer.value = typer.value.normalize("NFC");
        let SELECT = typer.selectionStart;
        typer.value = typer.value.substr(0, typer.selectionStart) + "\u0323" + typer.value.substr(typer.selectionEnd);
        typer.value = typer.value.normalize("NFC");
        typer.selectionStart = SELECT, typer.selectionEnd = SELECT;
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });


    let is_tonal = document.getElementById("is_tonal");
    let is_pref = document.getElementById("is_pref");
    let is_suff = document.getElementById("is_suff");

    is_tonal.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        if (document.getElementById('is_tonal').checked) {
            document.getElementById('is_pref').checked = false;
            document.getElementById('is_suff').checked = false;
        }
        typer.focus();
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    is_pref.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        if (document.getElementById('is_pref').checked) {
            document.getElementById('is_tonal').checked = false;
            document.getElementById('is_suff').checked = false;
        }
        typer.focus();
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });

    is_suff.addEventListener("click", () => {
        let typer = document.getElementById("typer-text");
        if (document.getElementById('is_suff').checked) {
            document.getElementById('is_tonal').checked = false
            document.getElementById('is_pref').checked = false;
        }
        typer.focus();
        typer.dispatchEvent(new KeyboardEvent("keyup", {
            bubbles: true,
            cancelable: true
        }));
    });


    //input[type="text"]
    $('input, textarea').dictionary().focus();
});