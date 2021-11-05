$(document).ready(function() {

    $("#offer").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
            $("#answer").hide().html("<p><i class='icon ion-close-round'></i> Please use only digits</p>").fadeIn().delay(1500).fadeOut();
            return false;
        }
    });
   
    // Reset and hide all messages on .keyup()
    $("#offer-form input").keyup(function() {
        $("#answer").fadeOut();
    });
   
});