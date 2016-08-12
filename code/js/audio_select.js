//////
//选择乐器（独奏加载不同音频，合奏加载全部音频），准备好的json格式的音频数据
//////
//列举几种乐器种类
var piano;
var drum;
var box;
var my;
var sum;

piano = {

    piano6: 'audio/piano11.mp3',
    piano7: 'audio/piano12.mp3',
    piano8: 'audio/piano13.mp3',
    piano9: 'audio/piano14.mp3',
    piano10: 'audio/piano15.mp3',
    piano11: 'audio/piano16.mp3',
    piano12: 'audio/piano17.mp3',

};

drum = {
    drum1: 'audio/d1.mp3',
    drum2: 'audio/d2.mp3',
    drum3: 'audio/d1.wav',
    drum4: 'audio/d2.wav',
    drum5: 'audio/d3.wav',
    drum6: 'audio/d4.wav',
    drum7: 'audio/l3.mp3',
    drum8: 'audio/l4.mp3'
};

box = {
    box1: 'audio/piano11.mp3',
    box2: 'audio/piano12.mp3',
    box3: 'audio/piano13.mp3',
    box4:'audio/piano14.mp3',
    box5: 'audio/piano15.mp3',
    box6: 'audio/piano16.mp3',
    box7: 'audio/piano17.mp3',
    box8:'audio/piano17.mp3'
};

my = {
    my01: 'audio/bird1.wav',
    my02: 'audio/bone.wav',
    my03: 'audio/fly1.wav',
    my04: 'audio/glass.wav',
    my05: 'audio/ice.wav',
//    my06: 'audio/magic.wav',
    my07: 'audio/palm.wav'
};

sum = {
	piano1: 'audio/piano3.mp3',
    piano2: 'audio/piano4.mp3',
    piano3: 'audio/piano5.mp3',
    piano4: 'audio/piano6.mp3',
    piano5: 'audio/piano7.mp3',
    piano6: 'audio/piano11.mp3',
    piano7: 'audio/piano12.mp3',
    piano8: 'audio/piano13.mp3',
    piano9: 'audio/piano14.mp3',
    piano10: 'audio/piano15.mp3',
    piano11: 'audio/piano16.mp3',
    piano12: 'audio/piano17.mp3',
    piano13: 'audio/piano21.mp3',
    piano14: 'audio/piano22.mp3',
    piano15: 'audio/piano23.mp3',
    piano16: 'audio/piano24.mp3',
    drum1: 'audio/d1.mp3',
    drum2: 'audio/d2.mp3',
    drum3: 'audio/d3.mp3',
    drum4: 'audio/d4.mp3',
    drum5: 'audio/l1.mp3',
    drum6: 'audio/l2.mp3',
    drum7: 'audio/l3.mp3',
    drum8: 'audio/l4.mp3',
    box1: 'audio/piano3.mp3',
    box2: 'audio/piano5.mp3',
    box3: 'audio/piano7.mp3',
    box4: 'audio/piano13.mp3',
    box5: 'audio/piano17.mp3',
    box6: 'audio/piano21.mp3',
    box7: 'audio/piano23.mp3',
    box8: 'audio/piano24.mp3',
    my01: 'audio/bird1.wav',
    my02: 'audio/bone.wav',
    my03: 'audio/fly1.wav',
    my04: 'audio/glass.wav',
    my05: 'audio/ice.wav',
//    my06: 'audio/magic.wav',
    my07: 'audio/palm.wav'
};

//获取选择的乐器种类(选择特定乐器进入演奏界面的时候加载)
function select_instrument(id){
    var BUFFERS_TO_LOAD;
    switch(id){
        case "piano":
        BUFFERS_TO_LOAD = piano;
        break;
        case "drum":
        BUFFERS_TO_LOAD = drum;
        break;
        case "box":
        BUFFERS_TO_LOAD = box;
        break;
        case "my":
        BUFFERS_TO_LOAD = my;
        break;
    }
    return BUFFERS_TO_LOAD;
}

//直接加载全部乐器音频（进入合奏界面直接加载）
function select_all_instrument(){
    var BUFFERS_TO_LOAD;
	BUFFERS_TO_LOAD = sum;
	return BUFFERS_TO_LOAD;
}

