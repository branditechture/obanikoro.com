$(document).ready(function() {

    $("#offer-form [type='submit']").click(function(e) {
        e.preventDefault();
        
        // Get input field values of the contact form
        var user_name       = $('input[name=name]').val();
        var user_email      = $('input[name=email-address]').val();
        var user_offer      = $('input[name=offer]').val();
       
        // Datadata to be sent to server
        post_data = {'userName':user_name, 'userEmail':user_email, 'userOffer':user_offer};
       
        // Ajax post data to server
        $.post('php/offer.php', post_data, function(response){  
           
            // Load json data from server and output message    
            if(response.type == 'error') {

                output = '<div class="error-message"><p>'+response.text+'</p></div>';

                $("#answer").hide().html(output).fadeIn();
                
            } else {
           
                output = '<div class="success-message"><p>'+response.text+'</p></div>';
               
                // After, the form is hidden and the success message is proudly displayed
                $("#global-form").fadeOut(400);

                setTimeout(function(){

                    $("#answer").hide().html(output).fadeIn();

                },410);
                
            }

        }, 'json');

    });

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