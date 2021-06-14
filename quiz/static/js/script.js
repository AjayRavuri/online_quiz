<<<<<<< HEAD
var currentQuestion = 0;// current question pointer...
var viewingAns = 0;//status of viewmode...
var correctAnswers = 0; // correct ans counter...
var quizOver = false; // quiz status...
var iSelectedAnswer = []; // user selected ans...
var time=600; // time in seconds...
var t; // timeout variable...
var time_temp=time; //temporary time variable...
var viewMode = 0; //current status of view mode...
var malpractice = false;// malpractise status...
var clean; // timeinterval for focus variable...
var widthCheck = window.innerWidth; // to give provision to enlarging the width without malpractise detection...
var heigthCheck = window.innerHeight;// to give provision to enlarge height without malpractise detection...
=======
var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var clear;
var time=120;
var t;
var time_temp=time;
var viewMode = 0;
var focus;
var endtest;
var teststatus = false;
var malpractice = true;
var online = true;
var netissue = false;
var clean;
>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663

// detecting the malpractise and for now it's over active and user should be very causious...
function malpracicefun(){
<<<<<<< HEAD
  if (!quizOver){
    malpractice = true;
    correctAnswers = -1;
    update();
    clearTimeout(t);
    currentQuestion = 0;
    viewResults(currentQuestion);
    correctAnswers = 0;
    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
=======
  if ( !quizOver ){
    clearTimeout(t);
    currentQuestion = 0;
    time = time_temp;
    viewResults(currentQuestion);
    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
    teststatus = false;
>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
    viewMode = 1;
    viewingAns = 3;
    quizOver = true;
    $(".quizMessage").html("malpractice");
    $('.quizMessage').slideDown();
    $('#timer').slideDown();
  }
}
function focus() {
  if (!document.hasFocus()) {
    clearInterval(clean);
    malpracicefun();

  }
}


// detection of resize...
window.addEventListener('resize',function(){
  if(widthCheck>window.innerWidth || heigthCheck>window.innerHeight){
    malpracicefun();
  }
  widthCheck = window.innerWidth;
  heigthCheck = window.innerHeight;
});

// checking the answers and alloting the marks...
$(function ()
{
  // time interval to check the focus of current window...
  clean = setInterval("focus()", 500);
  // Display the first question by default...
  displayCurrentQuestion();
  $(".quizMessage").hide();
  $(".preButton").attr('disabled', 'disabled');

  // starting the timer...
  timedCount();

  //previous button action
  $(".preButton").click(function ()
  {
    $(".quizMessage").slideUp();

    // action of previous button when quiz is running...
    if (!quizOver && !malpractice)
    {
      if(currentQuestion == 0) { return false; }
      if(currentQuestion == 1) {
        $(".preButton").attr('disabled', 'disabled');
      }
      else if (currentQuestion == questions.length-1) {
          $(".nextButton").html("Next Question");
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
      else if (currentQuestion == questions.length-1){ $(".nextButton").prop('disabled',false); }
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
  $(".nextButton").click(function ()
  {
    if (!quizOver)
    {
<<<<<<< HEAD
      var val = $("input[type='radio']:checked").val();
      if (val == undefined)
      {
        $(".quizMessage").html("Please select an answer");
        $(".quizMessage").slideDown();
      }

      else
      {
        // TODO: Remove any message -> not sure if this is efficient to call this each time....
        $(".quizMessage").slideUp();
        currentQuestion++; // Since we have already displayed the first question on DOM ready
        if(currentQuestion >= 1) {
          $('.preButton').prop("disabled", false);
        }
=======
        if (!quizOver)
        {

            var val = $("input[type='radio']:checked").val();

            if (val == undefined)
            {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").slideDown();
            }
            else
            {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").slideUp();

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
                  teststatus = false;
                  $('#submit-test').modal('show');
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
                    $(document).find(".quizMessage").slideDown(1000);
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

            $(document).find(".quizMessage").slideUp();
            resetQuiz();
            hideScore();

            $('#iTimeShow').html('Time Remaining:');
            clean = setInterval("myFunction()", 500);
            timedCount();

            viewingAns = 0;
            viewMode =0;
>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663

        if (currentQuestion < questions.length)
        {
          if (currentQuestion == questions.length-1) { $(".nextButton").html("Submit");}
          displayCurrentQuestion();
        }

        else
        {
          $('#submit-test').modal('show');
        }
      }
    }

    else if(viewMode == 1){
      currentQuestion++;
      if (currentQuestion == 1) { $(".preButton").attr('disabled',false); }
      if(currentQuestion < questions.length){
        if (currentQuestion == questions.length-1) {
          $(".nextButton").prop('disabled','disabled');
          $(".quizMessage").html("please press end review");
          $(".quizMessage").slideDown(1000);
          viewingAns = 0;
        }
        viewResults(currentQuestion);
      }
    }
    else{   // quiz is over and clicked the next button (which now displays 'Attempt Again?')
      attempt();
    }
  });

<<<<<<< HEAD
  //clear button action
  $(this).find('.clearResponse').click(function(){
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
      $(".nextButton").html("Attempt Again");
      $(".preButton").html("View Answers");
      $('.clearResponse').html("end test");
      $('.preButton').prop('disabled',false);
      $('.nextButton').prop('disabled',false);
      currentQuestion = 0;
      viewingAns = 0;
      viewMode = 0;
    }
    // to end the test if pressed...
    else{
      end(malpractice);
      $('#conformation').modal('show');
    }
  });

  $('.choiceList').click(function(){
    if(!quizOver){
      var val1 = $("input[type='radio']:checked").val();
      $('.quizMessage').slideUp();
      if (iSelectedAnswer[currentQuestion] == questions[currentQuestion].correctAnswer){
        correctAnswers--;
      }
      if (val1 == questions[currentQuestion].correctAnswer) {
        correctAnswers++;
      }
      iSelectedAnswer[currentQuestion] = val1;
    }
  });
  $('.quizMessage').click(function(){
    $('.quizMessage').slideUp(500);
  });
  $('.result').click(function(){
    $('.result').slideUp();
  });
});

function hideScore(){ $(".result").slideUp(); }
// To reset tha quiz and set everything reqired...
function resetQuiz()
{
  currentQuestion = 0;
  correctAnswers = 0;
  iSelectedAnswer = [];
  $(".preButton").prop('disabled', 'disabled');
  $(".nextButton").html("Next Question");
  $(".preButton").html("Previous Question");
  hideScore();
}
// To display the score of the user...
function displayScore()
{
  $('.quizMessage').slideUp();
  $(".quizContainer > .result").html("You scored: " + correctAnswers + " out of: " + questions.length);
  $(".quizContainer > .result").slideDown();
}
=======
        // to end the test if pressed...
        else{
          $('#conformation').modal('show');
        }
    });
});

$('#submit-btn').click(function(){
  clearTimeout(t);
  displayScore();
  $('#timer').slideUp();
  $('#iTimeShow').html('Quiz Time Completed!');
  time=time_temp;


  $(".preButton").prop('disabled', false);
  $(document).find(".preButton").text("View Answer");
  $(document).find(".nextButton").text("Attempt Again?");
  $(document).find('.clearResponse').text("end test");
  quizOver = true;
});

>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
//timer action
function timedCount()
    {
        // making the timer to visible...
        $('#timer').slideDown();
        //caluculating hours and minutes from the seconds specified during declaration...
        var hours = parseInt( time / 3600 ) % 24;
        var minutes = parseInt( time / 60 ) % 60;
        var seconds = time % 60;
<<<<<<< HEAD
=======

>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
        //formating the view of the timer...
        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
        var z;
        if (time<60){
                z = setTimeout(function(){
                    $('#timer').slideUp();
                },750);
            var result = (seconds  < 10 ? "0" + seconds : seconds)
        }
        $('#timer').html(result);
        // functionality of timer when it ticks to zero...
        if(time == 0 )
        {
            update();
            clearTimeout(z);
            //displaying the score when timer is zero...
            displayScore();
            // stoping the timer action from being initiated when the timer is zero...
            clearTimeout(t);
            // displaying the message of timer as Quiz is completed and score below it...
            $('#timer').slideUp();
            $('#iTimeShow').html('Quiz Completed!');
            // reinitating the timer for next attempt...
            time=time_temp;
<<<<<<< HEAD
=======

>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
            //making the previous button active if it is disabled...
            $(".preButton").prop('disabled', false);
            //making the button of previous button as viewanswers to check the result and next button to attempt again..
            $(".preButton").html("View Answer");
            $(".nextButton").html("Attempt Again?");
            //clear button to end test...
            $('.clearResponse').html("end test");
            // to say the status quiz...
            quizOver = true;
            return false;
        }
<<<<<<< HEAD
=======


>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
        time = time - 1;
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
        $('.clearResponse').html("Clear");
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
            if (time != 0) {
                $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }
            else{
            $('<li><input type="radio" class="radio-inline" disabled = "disabled" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }
        }
        else {
<<<<<<< HEAD
            if (time != 0) {$('<li ><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);}
=======

            if (time != 0) {$('<li ><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);}

>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
            else{
            $('<li><input type="radio" class="radio-inline" disabled = "disabled" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
            }
        }
    }
}
// To hide the score that is showing at the center of the screen...
<<<<<<< HEAD
=======
function hideScore()
{
    $(document).find(".result").slideUp();
}

>>>>>>> dacbb260cd7bb2ca29e81f9ed388fa649f352663
// This displays the current question AND the choices
function viewResults(currentQuestion)
{
    // To disable the previous button and change the text from the viewans and attempt again to previous and next button...
    if (currentQuestion == 0){
        $(".preButton").prop("disabled","disabled");
        $(".nextButton").html("Next Question");
        $(".preButton").html("Previous Question");
        $(".clearResponse").html("end review");
    }
    // If the review reaches end of the questions current question will be set to zero and return false...
    if(currentQuestion == questions.length) { currentQuestion = 0;return false; }

    // To hide the message that is present at the center in the screen...
    $(".quizMessage").slideUp(1000);
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
