// This JavaScript file activates and customizes plugins, along with a few other odds and ends (see 'contents' below).

/* =====================================

    Contents :
    1. Toggle Domain Portfolio
    2. Enhance Form Labels
    3. Load Latest Tweet
    4. Form Validating/Processing

===================================== */ 

$(function(){ // When the page is loaded...

    // 1. Toggle the Domain Portfolio to hide and show your domain list
    // =====================================================================================================

    $('a#portfolioButton').click(function() {
        $('#domainPortfolio').stop().slideToggle(400);
        return false;
    });        

    // 2. Enhanced form label
    // ======================

    $("label").css({'position' : 'absolute', 'left' : '3px', 'padding' : '10px', 'top' : '0', 'z-index' : '99'});

    $("label").inFieldLabels();         

    // 3. Load latest Tweet
    // ======================   

    // cached selector
    var tweetElement = $('#tweet');

    // display loading message
    tweetElement.html("<em>Loading feed, please wait.</em>");

    // Fetch tweet from getTweet.php script.
    $.ajax({
        url: 'includes/getTweet.php',
        type: 'get',
        timeout: 10000, // Time limit of 10 seconds before triggering error function
        success: function(response){ 
            tweetElement.html(response);
        },
        error: function (x, t, m){
            tweetElement.text('There was an error fetching the latest tweet, sorry.')
        }
    });

    // 4. Validate, then Send the Form
    // ===============================

    // cached selectors
    var formSection = $('#formSection');
    var offerForm = $('#offerForm');

    $("a#submit").css({'display' : 'inline-block'});

    // Set the anchor tag to submit form
    $("#submit").click(function(){ 
        offerForm.submit();
        return false;
    });
    
    // Block the form while it is processing
    jQuery().ajaxStart(function() {
        formSection.block({ message: null, overlayCSS: { backgroundColor: '#333' } }); // Loading
    }).ajaxStop(function() {
        formSection.unblock();
    }).ajaxError(function(a, b, e) {
        throw e;
    });

    // Validate form
    offerForm.validate({
        submitHandler: function(form){
            // Submit form
            offerForm.ajaxSubmit({
                success: function(msg) {                
                    if(msg.substr(0,16) == "<!-- Success -->"){
                        formSection.slideUp('slow');
                        $('.success').html(msg);
                        $('.success').slideDown('medium');
                        $('.formerror').slideUp('medium');
                    } else {
                        // Automatically refresh the captcha if it's active
                        if( typeof grecaptcha !== 'undefined' ) {
                            grecaptcha.reset();
                        }
                        $('.formerror').html(msg);
                        $('.formerror').slideDown('medium');
                    }
                }
            });
        }
    });     
});