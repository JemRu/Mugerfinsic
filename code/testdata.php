<html>  
    <head>  
        <title>Test</title>  
        <script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>  
        <script type="text/javascript">
            function fetchData(data_info){  
                $.ajax({  
                    url:"test.php?",
                    data: data_info,
                    success:function(data){  
                        $("#b")[0].innerHTML = data;  
                    }  
                });  
            }
            function go() {
                var value = {id:"13"}
                fetchData(value);
            } 
        </script>  
    </head>  
      
    <body>  
        <div id="a" style="width:100px;height:100px;background-color:yellow">  
            <a onclick="go()">Click</a>  
        </div>  
        <div id="b" style="width:100px;height:100px;background-color:gray">  
              
        </div>  
    </body>  
</html>  