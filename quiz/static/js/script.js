var questions = [{
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "2. How to empty an array in JavaScript?",
    choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
    correctAnswer: 2
}, {
    question: "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}, {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0
}, {
    question: "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0
},{
    question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
},{
    question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3
},{
    question: "8. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
},{
    question: "9. How can a value be appended to an array?",
    choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
    correctAnswer: 1
},{
    question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
},];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var clear;
    var c=14;
    var c_temp=c;
    var t;

    var viewMode = 0;

    var focus;
    var endtest;
    var teststatus = false;
    var malpractice = true;
    var online = true;
    var netissue = false;




// detecting the malpractise and for now it's over active and user should be very causious...
var clean;
clean = setInterval("myFunction()", 500);

function myFunction() {
  if (!document.hasFocus()) {
    clearInterval(clean);
        //window.close();
        if ( teststatus ){
            clearTimeout(t);
            displayScore();
            currentQuestion = 0;
            c = c_temp;

            viewResults(currentQuestion);
            viewMode = 1;
            viewingAns = 3;
            quizOver = true;
            malpractice = false;
            $(document).find(".quizMessage").text("malpractice");
            $(document).find('.quizMessage').show();
            //focus.opener.document.write("<p> Your test has been end due to malpracice</p>");
        }
    }
}



// checking the answers and alloting the marks...

$(document).find('.choiceList').on('click', function(){
    if(!quizOver){
        var val1 = $("input[type='radio']:checked").val();

        if (iSelectedAnswer[currentQuestion] == questions[currentQuestion].correctAnswer){
              correctAnswers--;
            }
        if (val1 == questions[currentQuestion].correctAnswer) {
              correctAnswers++;
            }
        iSelectedAnswer[currentQuestion] = val1;
        //$(document).getElementById("change").style.background = 'rgba(0,0,255,1)';
    }

});

$(document).find('#start').on('click', function(){
        $(document).find('button').prop("disabled",'disabled');
        window.open("quiz.html","_blank",'fullscreen = yes','width = parent height = parent'  );
});

$(document).ready(function ()
{
    // Display the first question by default...
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');

    // starting the timer...
    timedCount();
    teststatus = true;

    //previous button action
    $(this).find(".preButton").on("click", function ()
    {
        $(document).find(".quizMessage").hide();


        // action of previous button when quiz is running...
        if (!quizOver && malpractice && !netissue)
        {

            if(currentQuestion == 0) { return false; }

            if(currentQuestion == 1) {
              $(".preButton").attr('disabled', 'disabled');
            }

            else if (currentQuestion == questions.length-1) {
                $(document).find(".nextButton").text("Next Question");
            }

            currentQuestion--; // Since we have already displayed the first question on DOM ready

            if (currentQuestion < questions.length) {
                displayCurrentQuestion();
            }

        }

        // action of previous button when it is in viewmode...
        else if (viewMode == 1){
            if (currentQuestion == 0) { return false; }

            if (currentQuestion == 1 ) { $(".preButton").attr('disabled','disabled');}

            else if (currentQuestion == questions.length-1){ $(document).find(".nextButton").prop('disabled',false); }

            currentQuestion--;

            if(currentQuestion < questions.length){ viewResults(currentQuestion);}
        }

        // to view answer by clicking the viewans button...
         else if(quizOver){
            if(viewingAns == 3) { return false; }
            $(".preButton").prop("disabled", false);
            currentQuestion = 0; viewingAns = 3;
            viewMode = 1;
            viewResults(currentQuestion);
        }
    });


    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function ()
    {
        if (!quizOver)
        {

            var val = $("input[type='radio']:checked").val();

            if (val == undefined)
            {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            }
            else
            {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if(currentQuestion >= 1) {
                      $('.preButton').prop("disabled", false);
                }
                if (currentQuestion < questions.length)
                {
                    if (currentQuestion == questions.length-1) { $(document).find(".nextButton").text("Submit");}
                    displayCurrentQuestion();

                }
                else
                {
                    if (confirm("do you want to submit ?")){
                        clearTimeout(t);
                        displayScore();
                        $('#iTimeShow').html('Quiz Time Completed!');
                        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
                        c=c_temp;
                        $(".preButton").prop('disabled', false);
                        $(document).find(".preButton").text("View Answer");
                        $(document).find(".nextButton").text("Attempt Again?");
                        $(document).find('.clearResponse').text("end test");
                        quizOver = true;
                    }
                    else{
                        $(document).find('.quizMessage').text("not submit");
                        $(document).find('.quizMessage').show();
                    }
                }
            }

        }
        else if(viewMode == 1){
            currentQuestion++;

            if (currentQuestion == 1) { $(".preButton").attr('disabled',false); }


            if(currentQuestion < questions.length){

                if (currentQuestion == questions.length-1) {
                    $(document).find(".nextButton").prop('disabled','disabled');
                    $(document).find(".quizMessage").text("please press end review");
                    $(document).find(".quizMessage").show();
                    viewingAns = 0;
                }

                viewResults(currentQuestion);
            }
        }
        else if(malpractice)
        {   // quiz is over and clicked the next button (which now displays 'Attempt Again?')

            clearTimeout(t);
            if(viewingAns == 3){ return false; }
            quizOver = false;
            teststatus = true;
            netissue = false;

            $(document).find(".quizMessage").hide();
            resetQuiz();
            hideScore();

            $('#iTimeShow').html('Time Remaining:');
            timedCount();

            viewingAns = 0;
            viewMode =0;

            displayCurrentQuestion();
        }

        // if test is closed due to malpractise detection and trying to attempt again option...
        else{
            $(document).find('.quizMessage').text("malpractice has been found if not consult the administration");
            $(document).find('.quizMessage').show();
        }
    });

    //clear button action
    $(this).find('.clearResponse').on('click',function(){
        if(!quizOver){

            //when a currect answer is selected and cleared it will decrement the score...
            $("input[type = radio]:checked").prop('checked',false);
            if (iSelectedAnswer[currentQuestion]==questions[currentQuestion].correctAnswer){
                correctAnswers--;
            }
            iSelectedAnswer[currentQuestion] = -1;
        }

        //to end the review if pressed...
        else if(viewMode == 1){
            currentQuestion = questions.length-1;
            viewResults(currentQuestion);
            $(document).find(".nextButton").text("Attempt Again");
            $(document).find(".preButton").text("View Answers");
            $(document).find('.clearResponse').text("end test");
            $(document).find('.preButton').prop('disabled',false);
            $(document).find('.nextButton').prop('disabled',false);
            currentQuestion = 0;
            viewingAns = 0;
            viewMode = 0;
        }

        // to end the test if pressed...
        else{
            var clear = confirm('do you want to end test ?');

            if (clear){
                window.close();
                focus.opener.document.write("<p> Your test is ended please close the window </p>");
            }
        }
    });
});


//timer action
function timedCount()
    {
        if(!malpractice){return false;}
        if(!online){return false;}


        // making the timer to visible...
        $(document).find('#timer').show();

        //caluculating hours and minutes from the seconds specified during declaration...
        var hours = parseInt( c / 3600 ) % 24;
        var minutes = parseInt( c / 60 ) % 60;
        var seconds = c % 60;

        //formating the view of the timer...
        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
        var z;
        if (c<60){
                z = setTimeout(function(){
                    $('#timer').hide();
                },750);
            var result = (seconds  < 10 ? "0" + seconds : seconds)
        }

        $('#timer').html(result);

        // functionality of timer when it ticks to zero...
        if(c == 0 )
        {
            clearTimeout(z);
            //displaying the score when timer is zero...
            displayScore();
            // stoping the timer action from being initiated when the timer is zero...
            clearTimeout(t);

            // displaying the message of timer as Quiz is completed and score below it...
            $('#iTimeShow').html('Quiz Completed!');

            // reinitating the timer for next attempt...
            c=c_temp;

            //making the previous button active if it is disabled...
            $(".preButton").prop('disabled', false);

            //making the button of previous button as viewanswers to check the result and next button to attempt again..
            $(document).find(".preButton").text("View Answer");
            $(document).find(".nextButton").text("Attempt Again?");

            //clear button to end test...
            $(document).find('.clearResponse').text("end test");

            // teststatus to false to diable the functionality of the focus function
            teststatus = false;

            // to say the status quiz...
            quizOver = true;
            return false;

        }


        c = c - 1;
        t = setTimeout(function()
        {
            timedCount()
        },1000);
    }


// This displays the current question AND the choices
function displayCurrentQuestion()
{

    //making the clear button text as clear...
    if (currentQuestion == 0){
        $(document).find('.clearResponse').text("Clear");
    }

    // retriving the question and choices from the list of quesions container...
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;


    // Set the questionClass text to the current question
    $(questionClass).text(question);


    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;

    // Retriving the answer from the database and putting them to the container of choice list...
    for (i = 0; i < numChoices; i++)
    {
        choice = questions[currentQuestion].choices[i] ;

        if(iSelectedAnswer[currentQuestion] == i) {
            if (c != 0) {
                $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }

            else{
            $('<li><input type="radio" class="radio-inline" disabled = "disabled" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }

        }
        else {

            if (c != 0) {$('<li ><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);}

            else{
            $('<li><input type="radio" class="radio-inline" disabled = "disabled" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }

        }

    }

}


// To reset tha quiz and set everything reqired...
function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    iSelectedAnswer = [];
    $(".preButton").prop('disabled', 'disabled');
    $(document).find(".nextButton").text("Next Question");
    $(document).find(".preButton").text("Previous Question");
    hideScore();
}

// To display the score of the user...
function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

// To hide the score that is showing at the center of the screen...
function hideScore()
{
    $(document).find(".result").hide();
    $(document).find('#timer').hide();
}

// This displays the current question AND the choices
function viewResults(currentQuestion)
{

    // To disable the previous button and change the text from the viewans and attempt again to previous and next button...
    if (currentQuestion == 0){
        $(".preButton").prop("disabled","disabled");
        $(document).find(".nextButton").text("Next Question");
        $(document).find(".preButton").text("Previous Question");
        $(document).find(".clearResponse").text("end review");
    }

    // If the review reaches end of the questions current question will be set to zero and return false...
    if(currentQuestion == questions.length) { currentQuestion = 0;return false; }

    // To hide the message that is present at the center in the screen...
    $(document).find(".quizMessage").hide();
    hideScore();

    // To retrive the quetions and choice list to display to display...
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;


    // Display current question on the screen...
    $(questionClass).text(question);


    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    // A list that is used to retrive the choices in the database...
    var choice;

    // Retriving the choice list from the data base and giving them li and colors accordingly...
    for (i = 0; i < numChoices; i++)
    {
        choice = questions[currentQuestion].choices[i];

        if(iSelectedAnswer[currentQuestion] == i) {
            if(questions[currentQuestion].correctAnswer == i) {
                $('<li style="background-color:rgba(0,255,0,0.2); border-radius: 8px;"><input type="radio" class="radio-inline" disabled = "disabled" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            } else {
                $('<li style="background-color:rgba(255,0,0,0.35); border-radius: 8px;"><input type="radio" class="radio-inline" disabled = "disabled" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }
        } else {
            if(questions[currentQuestion].correctAnswer == i) {
                $('<li><input type="radio" class="radio-inline" disabled = "disabled" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            } else {
                $('<li><input type="radio" class="radio-inline" disabled = "disabled" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }
        }
    }
}
