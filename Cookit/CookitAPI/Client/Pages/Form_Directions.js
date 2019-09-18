function DisplayFormDirection(btn_cliked_id) {
    // get the id of the mutch span
    var span_name = "span_question_";
    var words = btn_cliked_id.split('_');
    span_name = span_name.concat(words[2]);
    //display on\off the span
    var display_state = $("#" + span_name).css('display');
    if (display_state == 'none')
        $("#" + span_name).show('slow');
    else
        $("#" + span_name).hide('slow');

}
