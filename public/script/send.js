function send(obj) {
  console.log('yeah');
  var button = $('#sendButton');
  button.attr("disabled", true);

  var values = [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]];
  
  for (var i=0;i<9;i++){
    for(var j=0;j<9;j++){
      values[i][j] = $('#' + i + j).val();
    }
  }
  console.log(values);

  $.ajax({
    type:"post",
    url:"https://us-central1-sudoku-fa55e.cloudfunctions.net/solve/solve",
    data:JSON.stringify({board: values}),
    contentType: 'application/json',
    dataType: "json",
    success: function(json_data) {
      for (let i = 0; i < json_data.board.length; i++) {
        for (let j = 0; j < json_data.board[i].length; j++) {
          var inner = '';
          for (let k = 0; k < json_data.flags[i][j].length; k++) {
            if (k > 0 && k%3 === 0){
              inner += '<br>';
            }
            if (json_data.flags[i][j][k]) {
              inner += (k + 1).toString();
            }
          }
          $('#flagsTable td.' + i + j).html(inner);

          if(json_data.board[i][j] > -1){
            $('#answerTable td.' + i + j).html('' + (json_data.board[i][j] + 1));
          }
        }
      }
      
    },
    error: function() {         // HTTPエラー時
        alert("Server Error. Pleasy try again later.");
    },
    complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
        button.attr("disabled", false);  // ボタンを再び enableにする
    }
});

}