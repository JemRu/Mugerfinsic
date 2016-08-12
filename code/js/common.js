function enterIns0() {
    var name = document.getElementById("playname");
    var value = name.value;
    console.log(name);
    if (value == ""){
        alert("请问大侠尊姓大名");
        this.href="index.php";
        return false;
    } else {
        setModel(0);
        setName(value);
        return true;
    }
}
function enterIns1() {
    var name = document.getElementById("playname");
    var value = name.value;
    console.log(name);
    if (value == ""){
        alert("请问大侠尊姓大名");
        this.href="index.php";
        return false;
    } else {
        setModel(1);
        setName(value);
        return true;
    }
}
window.onload = function() {
    var one = document.getElementById("one");
    var many = document.getElementById("many");
    if(one.addEventListener){  
    one.addEventListener("click",enterIns0,false);  
    }else if(one.attachEvent){  
        one.attachEvent("onclick",enterIns0);  
    }
    if(many.addEventListener){  
    many.addEventListener("click",enterIns1,false);  
    }else if(many.attachEvent){  
        many.attachEvent("onclick",enterIns1);  
    }
} 
