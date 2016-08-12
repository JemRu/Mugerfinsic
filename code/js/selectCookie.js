function setModel(num) { //0 one 1 many
    document.cookie = "model="+num;
}
function getModel(){
    var model = document.cookie.indexOf("model");
    if (model == -1){
        return "";
    } else {
        start = model+6;
        end =document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
function setIns(ins){
    document.cookie = "ins="+ins;
}
function getIns() { //得到ins cookie
    var ins = document.cookie.indexOf("ins");
    if (ins == -1){
        return "";
    } else {
        start = ins+4;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
function setName(name) {
    document.cookie = "name="+name;
}
function getName() { //得到ins cookie
    var name = document.cookie.indexOf("name");
    if (name == -1){
        return "";
    } else {
        start = name+5;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
function setRoomid(id){
    document.cookie = "rmid="+id;
}
function getRoomid() { //得到ins cookie
    var rmid = document.cookie.indexOf("rmid");
    if (rmid == -1){
        return "";
    } else {
        start = rmid+5;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
function setPosition(info){
    document.cookie = "pos="+info;
}
function getPosition() { //得到ins cookie
    var pos = document.cookie.indexOf("pos");
    if (pos == -1){
        return "";
    } else {
        start = pos+4;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}
function setBgm(info){
    document.cookie = "bgm="+info;
}
function getBgm() { //得到ins cookie
    var bgm = document.cookie.indexOf("bgm");
    if (bgm == -1){
        return "";
    } else {
        start = bgm+4;
        end = document.cookie.indexOf(";",start);
        if (end == -1) {
            end = document.cookie.length;
        }
        return document.cookie.substring(start,end);
    }
}