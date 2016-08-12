function checkModel() { //0 one 1 many
    var model = getModel();
    if (model == 0) {
        return "one";
    } else if(model == 1) {
        return "many";
    } else {
        alert("大侠也要先选模式，是否开启时空大门，是的你并没有选择权"+model);
        window.load("index.php");
        return "";
    }
}
function enterGame() {
    var model = checkModel();
    var ins = this.attributes["id"].value;
    if (model == "one") {
        setIns(ins);
        this.href="oneplay_"+ins+".php";
    } else {
    this.href = "select_rm.php";
        setIns(ins);
    }

}
window.onload = function() {
    var a_list = document.getElementsByTagName("a");
    for (var i=0;i<4;i++){
        if(a_list[i].addEventListener){  
            a_list[i].addEventListener("click",enterGame,false);  
        } else if(a_list[i].attachEvent){  
            a_list[i].attachEvent("onclick",enterGame);  
        }
    }
} 