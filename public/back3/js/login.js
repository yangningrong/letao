
// 需求:进行表单校验
$(function(){

  //配置校验
  // 1 进行表单验证
  //   校验需求:
  //    (1) 用户名不能为空 长度为2-6位
  //    (2) 密码不能为空   长度为6-12位
  //使用表单校验插件
  $('#form').bootstrapValidator({
    
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          //配置回调函数的提示信息
          callback: {
            message:"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          // 配置回调函数的提示信息
          callback: {
            message: "密码错误"
          }
        }
      }


    }
  
  });
  

  //2 表单验证需要在表单提交时,进行校验,需要在submit按钮
  // 可以注册一个表单校验成功事件,表单校验成功后默认会提交
  // 可以在成功事件中,阻止默认的表单提交,通过ajax提交,就不会跳转了

  // 思路: 1 注册表单校验成功事件
        // 2 在事件中 阻止默认的表单提交,通过ajax 提交即可

        $("#form").on('success.form.bv', function (e) {
          e.preventDefault();
          //使用ajax提交逻辑
          console.log('通过ajax提交');
          $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
              console.log(info);
              //成功的话跳转到首页
              if(info.success){
                location.href = "index.html";
              }
              // 失败的话提示错误
              if ( info.error === 1000 ){
                //alert("用户名不存在");
                // 调用插件提供的方法 将用户名input状态更新成校验失败状态
                // updataeStatus
                //  参数1 校验字段  username/password
                // 参数2  校验状态  
                //  参数3  校验规则 , 用来配置错误时的提示信息 
                $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
              }
              if (info.error === 1001 ){
                $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
              }
            }
          })
      });

//3 重置功能,reset 按钮  本身就可以重置内容 这边只需要再重置状态即可

      $('[type= "reset"]').click(function(){
        $('#form').data("bootstrapValidator").resetForm();
      })


})