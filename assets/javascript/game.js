//Assign Initial HP
function AssignHP(){
    $('#circleHP').text($('#circle').attr('hp'))
    $('#squareHP').text($('#square').attr('hp'))
    $('#triangleHP').text($('#triangle').attr('hp'))
    $('#pentagonHP').text($('#pentagon').attr('hp'))    
}
AssignHP();

//Listen for Player Selection and Perform Movement
$('.character').on('click', function(){
    $('#character-start').children(':first').css('display','none')
    if($('#your-player').attr('status')==='empty'){
        $(this).attr('status','active-player')
        $('#your-player').attr('status','active')
        $(this).siblings('.character').attr('status','enemy')
        $('#enemies').append($(this).siblings('.character'))
        $('#your-player').append($(this)) 
    }
})

//Listen for Enemy Selection and Perform Movement
$('.character').on('click', function(){
    if($(this).attr('status')==='enemy' && $('#defender').attr('status')==='empty'){
        $(this).attr('status','active-enemy')
        $('#defender').append($(this))   
        $('#defender').attr('status','active')         
    }
})

//Check for loss
function checkForLoss(){
    if($('[status="active-player"]').attr('hp')<=0){
        $('#lose-background-image').css('display','block')
        $('#lose-message').css('display','block')
        $('#background-image').css('display', 'none')
        $('#enemies').css('display','none')
        $('#fight-section').css('display','none')
        $('#defender').css('display','none')
        $('#yourplayertitle').css('display','none')
        $('#reset').css('display','block')
        $('#reset').on('click', function(){
            location.reload()
        })
    }
} 

//Check for win
function checkForWin(){
    if($('[status="active-player"]').attr('hp')>=0 && $('#defender').children(':nth-child(4)').attr('hp')<0){
        $('#win-background-image').css('display','block')
        $('#win-message').css('display','block')
        $('#background-image').css('display', 'none')
        $('#enemies').css('display','none') 
        $('#fight-section').css('display','none')
        $('#defender').css('display','none')
        $('#yourplayertitle').css('display','none')
        $('#reset').css('display','block')
        $('#reset').on('click', function(){
            location.reload()
        })
    }
} 

//Attack Button Logic
$('#attack').on('click', function(){
    if( $('#defender').children(':last').attr('status')==='active-enemy'){

        //Lower Active Player HP
        var newActivePlayerHP = parseInt($('[status="active-player"]').attr('hp'))-parseInt($('[status="active-enemy"]').attr('damage'))
        $('[status="active-player"]').attr('hp', newActivePlayerHP)
        $('[status="active-player"]').children('span').text('[status="active-player"]').attr('hp')
        AssignHP()
        $('[status="active-player"]').animate({width:'200px'}, 50)
        $('[status="active-player"]').animate({width:'150px'}, 50)

        //Lower Defender HP
        var newDefenderHP = parseInt($('[status="active-enemy"]').attr('hp'))-parseInt($('[status="active-player"]').attr('damage'))
        $('[status="active-enemy"]').attr('hp',newDefenderHP)
        $('[status="active-enemy"]').children('span').text('[status="active-enemy"]').attr('hp')
        AssignHP()
        $('[status="active-enemy"]').animate({width:'200px'}, 50)
        $('[status="active-enemy"]').animate({width:'150px'}, 50)

        //Increase Active Player Damage
        var newDamage = parseInt($('[status="active-player"]').attr('damage')) + parseInt($('[status="active-player"]').attr('originalDamage'))
        $('[status="active-player"]').attr('damage', newDamage)
        console.log(newDamage)

        //Check for Defeated Enemy
        if($('[status="active-enemy"]').attr('hp')<=0){
            $('[status="active-enemy"]').css('display', 'none')
            $('[status="active-enemy"]').attr('status', 'dead')
            
            //Choose New Enemy
            $('#enemies').children('.character').on('click', function(){
                $('#defender').append($(this))
                $(this).attr('status', 'active-enemy')
            })
        }

        checkForLoss();
        checkForWin();
    }
})




