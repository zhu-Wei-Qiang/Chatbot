// 渡一接口
// $(".get").click(function () {
//   var vlu = $(".vlutext").val().trim();
//   if (vlu) {
//     renderText("self", vlu, './image/3.png');

//     $.ajax({
//       url: "https://developer.duyiedu.com/edu/turing/chat",
//       type: "get",
//       data: {
//         text: vlu
//       },
//       dataType: "json",
//       success: function (res) {
//         console.log(res);
//         renderText("system", res.text, './image/dog1.jpg');
//       }
//     });
//   }
// });

// smeile 接口
$(".get").click(function () {
  var vlu = $(".vlutext").val().trim();
  //
  if (vlu) {
    //渲染自己发的信息
    renderText("self", vlu, './image/3.png');
    $.ajax({
      url: "https://open.drea.cc/bbsapi/chat/get",
      type: "get",
      data: {
        keyWord: vlu,
        userName: 'type=bbs'
      },
      dataType: "json",
      success: function (res) {
        // console.log(res);
        if (res.isSuccess) {
          //渲染得到回复
          renderText("system", res.data.reply, './image/dog1.jpg');
        } else {
          renderText("system", 'Smile不明白主人的意思喔...', './image/dog1.jpg');
        }
      }
    });
  }
});


$(".vlutext").on("keyup", function (e) {
  console.log(1);
  if (e.keyCode == 13) {
    $(".get").click();
  }
});

function renderText(className, text, img) {
  $(`<div class=${className}>
    <img src=${img} alt="" />
    <p>${text}</p>
    </div>`)
    .appendTo($(".content"))[0]
    .scrollIntoView();
  //scrollHeight滚动条（页面）总长度  innerHeight当前页面高度  相减就是应该隐藏的高度
  var scrollTop = $(".content")[0].scrollHeight - $(".content").innerHeight();
  console.log($(".content")[0].scrollHeight, $(".content").innerHeight());
  if (scrollTop) {
    $(".content").parent().css('overflow-y', 'auto');
  }
  $(".content").scrollTop(scrollTop);
  $(".vlutext").val("");
}
