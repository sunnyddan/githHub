$(function(){
	$.ajax({
		type:"GET",
		url:"seacch.php?q=1",
		success:datainsertion,
		error: erryFunction
	})
	function erryFunction() {  
        alert("error:获取数据");  
    }  
    function datainsertion(data){
        
    	var json = eval(data);
         console.log(json);
    	 $.each(json, function (index, item) { 
    	 	//var user_img =json[index].user_img;

    	 	var user_name = json[index].Openid;
    	 	var user_detils = json[index].content;
    	 	//$('.user_img').eq(index).attr('user_img');//图片
    	 	$('.user_name').eq(index).html(user_name);//用户名
    	 	$('.user_detils').eq(index).html(user_detils);//
    	 })
    }
    //每隔8秒刷新页面
    setTimeout("location.reload()",8000);
});