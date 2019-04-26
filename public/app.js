$(document).ready(function() {



    $(".campos").keydown(function(e) {
        if ((e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40) ||
            $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

    });


});

$.getJSON('https://modulogenstionmedicamentos.firebaseapp.com/firstGet', function(data) {
    //data is the JSON string
    console.log(data);
});