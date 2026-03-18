$(window).ready(function () {

    document.querySelectorAll('input, textarea').forEach(el => {
        el.setAttribute("data-vnkeys", "");
    });

    //input[type="text"]
    $('input, textarea').dictionary().focus();
});