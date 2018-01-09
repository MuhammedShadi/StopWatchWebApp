//click start button
var mode = 0;
var action;    
var timeMinutes ,timeSecond,timeCentisecond ,lapMinutes,lapSecond,lapCentisecond;
var timeCounter = 0;
var lapCounter = 0; 
var lapNumber = 0; 
$(function(){   

    //hide buttons
    hideShowButtons("#startButton","#lapButton");
    //when click start 
    $("#startButton").click(function(){
        mode = 1;
        hideShowButtons("#stopButton","#lapButton");
        startAction();
    });
    $("#stopButton").click(function(){
        mode = 1;
        hideShowButtons("#resumeButton","#resetButton");
        clearInterval(action);
    });
    $("#resetButton").click(function(){
        mode = 1;
        hideShowButtons("#startButton","#lapButton");
        location.reload();
    });
    $("#resumeButton").click(function(){
        mode = 1;
        hideShowButtons("#stopButton","#lapButton");
        startAction();
    });
    $("#lapButton").click(function(){
        //if counter counting
        if(mode){
            //stop action    
           clearInterval(action);
            //add lap
            addLap();
            //startcount
            startAction();
           }
    });

});

function hideShowButtons(pX,pY){
    $(".control").hide();
    $(pX).show();
    $(pY).show();
}

function startAction(){
    action = setInterval(function(){
        timeCounter++;
        if(timeCounter == 100*60*100){
            timeCounter = 0;
           }
        lapCounter++;
        if(lapCounter == 100*60*100){
            lapCounter = 0;
           }
        updateTime();
    },10);
}

function updateTime(){
    //convert time
    timeMinutes = Math.floor(timeCounter/6000);
    timeSecond = Math.floor((timeCounter%6000)/100);
    timeCentisecond = (timeCounter%6000)%100;
    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSecond));
    $("#timecentisecond").text(format(timeCentisecond));

    //convert laps
    lapMinutes= Math.floor(lapCounter/6000);
    lapSecond = Math.floor((lapCounter%6000)/100);
    lapCentisecond = (lapCounter%6000)%100;
    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSecond));
    $("#lapcentisecond").text(format(lapCentisecond));
    
}
//format numbers
function format(number){
    if(number<10){
        return '0'+number;
       }else{
           return number;
       }
}

function addLap(){
        lapNumber++;
        var myLapDetails =
            '<div class="lap">'+
                '<div class="laptimetitle">'+
                    'Lap'+lapNumber+
                '</div>'+ 
                    '<div class="laptime">'+
                    '<span>'+format(lapMinutes)+'</span>'+
                    ':<span>'+format(lapSecond)+'</span>'+
                    ':<span>'+format(lapCentisecond)+'</span>'+
                    '</div>'+
            '</div>' ;
        $(myLapDetails).appendTo("#laps");
}