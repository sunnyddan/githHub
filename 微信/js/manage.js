function load(){
        $.ajax({
        type:"GET",
        url:"seacch.php?q=0",
        success:datainsertion,
        error: erryFunction
       })
      setTimeout('load()',8000);
    }
    function erryFunction() {  
        alert("error");  
    } 
     function datainsertion(data){//请求成功
        var json = eval(data);
        $.each(json, function (index, item) {
            var id=json[index].id;
            //var user_img=json[index].user_img;//头像
            var user_name=json[index].Openid;//昵称
            var user_detils=json[index].content;//内容
            var time=json[index].time;//发送时间
            var flag=0;
            $("#tab11 tbody tr").clone().appendTo("#In-examine tbody"); 
            //$('#In-examine tbody tr').eq(index+1).find('.td').eq(0).append(user_img);
            $('#In-examine tbody tr').last().find('td').eq(1).html(user_name);
            $('#In-examine tbody tr').last().find('td').eq(2).html(user_detils);
            $('#In-examine tbody tr').last().find('td').eq(3).html(time);
            $('#In-examine tbody tr').last().find('td').eq(4).find('input').first().bind("click",function(){
                flag =1;
                //返回已审查状态表
                $("#tab12 tbody tr").clone().appendTo("#Had-examine tbody"); 
                //$('#Had-examine tbody tr').last().find('.td').eq(0).append(user_img);
                $('#Had-examine tbody tr').last().find('td').eq(1).html(user_name);
                $('#Had-examine tbody tr').last().find('td').eq(2).html(user_detils);
                $('#Had-examine tbody tr').last().find('td').eq(3).html(time);
         
                $('#Had-examine tbody tr').last().find('td').eq(4).find('input').first().bind('click',function(){
                    //console.log('s');
                    flag = 0;
                    submit(id,1);
                    deltr(this);
                });//返回数据
                submit(id,1);
                 deltr(this);
            });//上墙事件绑定
            $('#In-examine tbody tr').last().find('td').eq(4).find('input').last().bind('click',function(){
                flag =-1;
                //添加拒绝状态表
                $("#tab12 tbody tr").clone().appendTo("#refuse tbody"); 
                //$('#refuse tbody tr').last().find('.td').eq(0).append(user_img);
                $('#refuse tbody tr').last().find('td').eq(1).html(user_name);
                $('#refuse tbody tr').last().find('td').eq(2).html(user_detils);
                $('#refuse tbody tr').last().find('td').eq(3).html(time);
                $('#refuse tbody tr').last().find('td').eq(4).find('input').bind('click',function(){
                   // console.log('e');
                    flag = 0;
                    submit(id,-1);
                    deltr(this);
                });
                 deltr(this);
            });//拒接事件
        })
    }
    //移除表格函数
    function deltr(opp){
        $(opp).parent().parent().remove();//移除当前行
    }
    //反馈数据
    function submit(ip,state){
        $.ajax({
            type:"GET",
            url:"seacch.php?q=-1&id="+ip+"&state="+state,
            success:function(){
            },
            error: function(){
                 alert("error:返回数据出错");  
            }
        })
    }
$(function(){
    load();
})