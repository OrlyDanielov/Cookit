function DisplayFormDirection(btn_cliked_id) {
   /* // get the id of the mutch span
    var span_name = "span_question_";
    var words = btn_cliked_id.split('_');
    span_name = span_name.concat(words[2]);
    if (words.length > 3)
        span_name = span_name.concat("_"+words[3]);
    //display on\off the span
    var display_state = $("#" + span_name).css('display');
    if (display_state == 'none')
        $("#" + span_name).show('slow');
    else
        $("#" + span_name).hide('slow');
        */
    var div_name = "explanation_";
    var words = btn_cliked_id.split('_');
    div_name = div_name.concat(words[2]);
    if (words.length > 3)
        div_name = div_name.concat("_" + words[3]);
    //display on\off the span
    var str = document.getElementById(div_name).innerHTML;
    if (str == "")
        document.getElementById(div_name).innerHTML = "הסיסמה באורך 6 עד 12 תווים, מכילה לפחות מספר אחד, ואות באנגלית.";
    else
        document.getElementById(div_name).innerHTML = "";

}
/*
function ShowExplanetion(btn_cliked_id) {
    var div_name = "explanation_";
    var words = btn_cliked_id.split('_');
    div_name = div_name.concat(words[2]);
    if (words.length > 3)
        div_name = div_name.concat("_" + words[3]);
    var str = document.getElementById(div_name).innerHTML;
        document.getElementById(div_name).innerHTML = "הסיסמה באורך 6 עד 12 תווים, מכילה לפחות מספר אחד, ואות באנגלית.";

}


function HideExplanetion(btn_cliked_id) {
    var div_name = "explanation_";
    var words = btn_cliked_id.split('_');
    div_name = div_name.concat(words[2]);
    if (words.length > 3)
        div_name = div_name.concat("_" + words[3]);
    var str = document.getElementById(div_name).innerHTML;
    document.getElementById(div_name).innerHTML = "";

}
*/