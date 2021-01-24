//CHANNEL_ACCESS_TOKENを設定
//LINE developerで登録をした、自分のCHANNEL_ACCESS_TOKENを入れて下さい
var CHANNEL_ACCESS_TOKEN = 'アクセストークンを入れる'; 
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

//ポストで送られてくるので、ポストデータ取得
//JSONをパースする
function doPost(e) {
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token= json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたLINEメッセージを取得
  var user_message = json.events[0].message.text;  

  //返信する内容を作成
  var reply_messages;
  if ('高坂→大学' == user_message) {
    reply_messages = [myFunction1()];

  }else if ('大学→高坂' == user_message) {
    reply_messages = [myFunction2()];
    
  }else if ('北坂戸→大学' == user_message) {
    reply_messages = [myFunction3()];

  }else if ('大学→北坂戸' == user_message) {
    reply_messages = [myFunction4()];

  }else if ('熊谷→大学' == user_message) {
    reply_messages = [myFunction5()];

  }else if ('大学→熊谷' == user_message) {
    reply_messages = [myFunction6()];

  }else{
    reply_messages = [myFunction7()];
  }

  // メッセージを返信
  var messages = reply_messages.map(function (v) {
    return {'type': 'text', 'text': v};
  });
  UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

//高坂→大学
function myFunction1() {
  var today = new Date(); //Dateのデータを取得
  var hour = today.getHours(); //今の時刻を取得
  var minutes = today.getMinutes(); //今何分かを取得
  var dayofweek = today.getDay(); //曜日を取得(平日と休日でダイヤルが違うため。)

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //シートの情報を取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('高坂から大学'); //使用するシートのデータを取得

  if(dayofweek < 6 && dayofweek != 0){
    var hour_data = sheet.getRange('A8:A18').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B8:I18').getValues(); //バスデータ取得(分)
  
  }else if(dayofweek == 6){
    var hour_data = sheet.getRange('A22:A32').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B22:F32').getValues(); //バスデータ取得(分)  
  
  }else{
    var time = "日曜日はバスが走っていません!";
  }

  let time_table = {};
  var i = 0;
  
  for(key of hour_data){ //hourのdataを配列に代入
    time_table[key] = minutes_data[i].filter(v => !!v);　//minutes_dataのデータがあるところまでをフィルター
    i++;
  }
  
  if(dayofweek <= 6){

    if(time_table[hour] != undefined){
      var length = time_table[hour].length;

      for(let j = 0; j < length; j++){

        if(minutes < time_table[hour][j]){
          var time = time_table[hour][j] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes > time_table[hour][j] && minutes < time_table[hour][j+1]){
          var time = time_table[hour][j+1] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes == time_table[hour][length-1]){
          var time = "今到着しています。次の到着は" + (60 - minutes + time_table[hour+1][0] + "分後です！");
          break;
      
        }else if(minutes == time_table[hour][j]){
          var time = "今到着しています。次の到着は" + (time_table[hour][j+1] - minutes) + "分後です！";
          break;
      
        }else if(minutes > time_table[hour][length-1] && time_table[hour][j] == time_table[hour][length-1]){
          var time = 60 - minutes + time_table[hour+1][0];
          var time ="あと" + time + "分後です！";
          break;  
        }
      }
    
    }else{
      var time = "大学から高坂行きバスは、8～18時までしか運行しません。";
    }
  }
  return time;
}

//大学→高坂
function myFunction2() {
  var today = new Date(); //Dateのデータを取得
  var hour = today.getHours(); //今の時刻を取得
  var minutes = today.getMinutes(); //今何分かを取得
  var dayofweek = today.getDay(); //曜日を取得(平日と休日でダイヤルが違うため。)

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //シートの情報を取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('大学から高坂'); //使用するシートのデータを取得

  if(dayofweek < 6 && dayofweek != 0){
    var hour_data = sheet.getRange('A9:A21').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B9:I21').getValues(); //バスデータ取得(分)
  
  }else if(dayofweek == 6){
    var hour_data = sheet.getRange('A24:A35').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B24:E35').getValues(); //バスデータ取得(分)  
  
  }else{
    var time = "日曜日はバスが走っていません!";
  }

  let time_table = {};
  var i = 0;
  
  for(key of hour_data){ //hourのdataを配列に代入
    time_table[key] = minutes_data[i].filter(v => !!v);　//minutes_dataのデータがあるところまでをフィルター
    i++;
  }
  
  if(dayofweek <= 6){

    if(time_table[hour] != undefined){
      var length = time_table[hour].length;

      for(let j = 0; j < length; j++){

        if(minutes < time_table[hour][j]){
          var time = time_table[hour][j] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes > time_table[hour][j] && minutes < time_table[hour][j+1]){
          var time = time_table[hour][j+1] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes == time_table[hour][length-1]){
          var time = "今到着しています。次の到着は" + (60 - minutes + time_table[hour+1][0] + "分後です！");
          break;
      
        }else if(minutes == time_table[hour][j]){
          var time = "今到着しています。次の到着は" + (time_table[hour][j+1] - minutes) + "分後です！";
          break;
      
        }else if(minutes > time_table[hour][length-1] && time_table[hour][j] == time_table[hour][length-1]){
          var time = 60 - minutes + time_table[hour+1][0];
          var time ="あと" + time + "分後です！";
          break;  
        }
      }
    
    }else if(dayofweek < 6 && dayofweek != 0){
        var time = "大学から高坂行きバスは、平日9～21時までしか運行しません。";

    }else{
      var time = "大学から高坂行きバスは、休日10～21時までしか運行しません。";
    }
  }
  return time;
}

//北坂戸→大学
function myFunction3() {
  var today = new Date(); //Dateのデータを取得
  var hour = today.getHours(); //今の時刻を取得
  var minutes = today.getMinutes(); //今何分かを取得
  var dayofweek = today.getDay(); //曜日を取得(平日と休日でダイヤルが違うため。)

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //シートの情報を取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('北坂戸から大学'); //使用するシートのデータを取得

  if(dayofweek < 6 && dayofweek != 0){
    var hour_data = sheet.getRange('A8:A16').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B8:D16').getValues(); //バスデータ取得(分)
  
  }else if(dayofweek == 6){
    var hour_data = sheet.getRange('A22:A30').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B22:B30').getValues(); //バスデータ取得(分)  
  
  }else{
    var time = "日曜日はバスが走っていません!";
  }

  let time_table = {};
  var i = 0;
  
  for(key of hour_data){ //hourのdataを配列に代入
    time_table[key] = minutes_data[i].filter(v => !!v);　//minutes_dataのデータがあるところまでをフィルター
    i++;
  }
  
  if(dayofweek <= 6){

    if(time_table[hour] != undefined){
      var length = time_table[hour].length;

      for(let j = 0; j < length; j++){

        if(minutes < time_table[hour][j]){
          var time = time_table[hour][j] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes > time_table[hour][j] && minutes < time_table[hour][j+1]){
          var time = time_table[hour][j+1] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes == time_table[hour][length-1]){
          var time = "今到着しています。次の到着は" + (60 - minutes + time_table[hour+1][0] + "分後です！");
          break;
      
        }else if(minutes == time_table[hour][j]){
          var time = "今到着しています。次の到着は" + (time_table[hour][j+1] - minutes) + "分後です！";
          break;
      
        }else if(minutes > time_table[hour][length-1] && time_table[hour][j] == time_table[hour][length-1]){
          var time = 60 - minutes + time_table[hour+1][0];
          var time ="あと" + time + "分後です！";
          break;  
        }
      }
    
    }else{
      var time = "北坂戸から大学行きバスは、8～16時までしか運行しません。";
    }
  }
  return time;
}

//大学→北坂戸
function myFunction4() {
  var today = new Date(); //Dateのデータを取得
  var hour = today.getHours(); //今の時刻を取得
  var minutes = today.getMinutes(); //今何分かを取得
  var dayofweek = today.getDay(); //曜日を取得(平日と休日でダイヤルが違うため。)

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //シートの情報を取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('大学から北坂戸'); //使用するシートのデータを取得

  if(dayofweek < 6 && dayofweek != 0){
    var hour_data = sheet.getRange('A10:A20').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B10:D20').getValues(); //バスデータ取得(分)
  
  }else if(dayofweek == 6){
    var hour_data = sheet.getRange('A23:A31').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B23:B31').getValues(); //バスデータ取得(分)  
  
  }else{
    var time = "日曜日はバスが走っていません!";
  }

  let time_table = {};
  var i = 0;
  
  for(key of hour_data){ //hourのdataを配列に代入
    time_table[key] = minutes_data[i].filter(v => !!v);　//minutes_dataのデータがあるところまでをフィルター
    i++;
  }
  
  if(dayofweek <= 6){

    if(time_table[hour] != undefined){
      var length = time_table[hour].length;

      for(let j = 0; j < length; j++){

        if(minutes < time_table[hour][j]){
          var time = time_table[hour][j] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes > time_table[hour][j] && minutes < time_table[hour][j+1]){
          var time = time_table[hour][j+1] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes == time_table[hour][length-1]){
          var time = "今到着しています。次の到着は" + (60 - minutes + time_table[hour+1][0] + "分後です！");
          break;
      
        }else if(minutes == time_table[hour][j]){
          var time = "今到着しています。次の到着は" + (time_table[hour][j+1] - minutes) + "分後です！";
          break;
      
        }else if(minutes > time_table[hour][length-1] && time_table[hour][j] == time_table[hour][length-1]){
          var time = 60 - minutes + time_table[hour+1][0];
          var time ="あと" + time + "分後です！";
          break;  
        }
      }
    
    }else if(dayofweek < 6 && dayofweek != 0){
        var time = "大学から北坂戸行きバスは、平日10～20時までしか運行しません。";

    }else{
      var time = "大学から北坂戸行きバスは、休日10～18時までしか運行しません。";
    }
  }
  return time;
}

//熊谷→大学
function myFunction5() {
  var today = new Date(); //Dateのデータを取得
  var hour = today.getHours(); //今の時刻を取得
  var minutes = today.getMinutes(); //今何分かを取得
  var dayofweek = today.getDay(); //曜日を取得(平日と休日でダイヤルが違うため。)

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //シートの情報を取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('熊谷から大学'); //使用するシートのデータを取得

  if(dayofweek < 6 && dayofweek != 0){
    var hour_data = sheet.getRange('A8:A16').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B8:C16').getValues(); //バスデータ取得(分)
  
  }else if(dayofweek == 6){
    var hour_data = sheet.getRange('A22:A26').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B22:B26').getValues(); //バスデータ取得(分)  
  
  }else{
    var time = "日曜日はバスが走っていません!";
  }

  let time_table = {};
  var i = 0;
  
  for(key of hour_data){ //hourのdataを配列に代入
    time_table[key] = minutes_data[i].filter(v => !!v);　//minutes_dataのデータがあるところまでをフィルター
    i++;
  }
  
  if(dayofweek <= 6){

    if(time_table[hour] != undefined){
      var length = time_table[hour].length;

      for(let j = 0; j < length; j++){

        if(minutes < time_table[hour][j]){
          var time = time_table[hour][j] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes > time_table[hour][j] && minutes < time_table[hour][j+1]){
          var time = time_table[hour][j+1] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes == time_table[hour][length-1]){
          var time = "今到着しています。次の到着は" + (60 - minutes + time_table[hour+1][0] + "分後です！");
          break;
      
        }else if(minutes == time_table[hour][j]){
          var time = "今到着しています。次の到着は" + (time_table[hour][j+1] - minutes) + "分後です！";
          break;
      
        }else if(minutes > time_table[hour][length-1] && time_table[hour][j] == time_table[hour][length-1]){
          var time = 60 - minutes + time_table[hour+1][0];
          var time ="あと" + time + "分後です！";
          break;  
        }
      }
    
    }else if(dayofweek < 6 && dayofweek != 0){
        var time = "熊谷から大学行きバスは、平日8～16時までしか運行しません。";

    }else{
      var time = "熊谷から大学行きバスは、休日8～12時までしか運行しません。";
    }
  }
  return time;
}

//大学→熊谷
function myFunction6() {
  var today = new Date(); //Dateのデータを取得
  var hour = today.getHours(); //今の時刻を取得
  var minutes = today.getMinutes(); //今何分かを取得
  var dayofweek = today.getDay(); //曜日を取得(平日と休日でダイヤルが違うため。)

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //シートの情報を取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('大学から熊谷'); //使用するシートのデータを取得

  if(dayofweek < 6 && dayofweek != 0){
    var hour_data = sheet.getRange('A11:A21').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B11:B21').getValues(); //バスデータ取得(分)
  
  }else if(dayofweek == 6){
    var hour_data = sheet.getRange('A24:A32').getValues(); //バスデータ取得(時間)
    var minutes_data = sheet.getRange('B24:B32').getValues(); //バスデータ取得(分)  
  
  }else{
    var time = "日曜日はバスが走っていません!";
  }

  let time_table = {};
  var i = 0;
  
  for(key of hour_data){ //hourのdataを配列に代入
    time_table[key] = minutes_data[i].filter(v => !!v);　//minutes_dataのデータがあるところまでをフィルター
    i++;
  }
  
  if(dayofweek <= 6){

    if(time_table[hour] != undefined){
      var length = time_table[hour].length;

      for(let j = 0; j < length; j++){

        if(minutes < time_table[hour][j]){
          var time = time_table[hour][j] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes > time_table[hour][j] && minutes < time_table[hour][j+1]){
          var time = time_table[hour][j+1] - minutes;
          var time ="あと" + time + "分後です！";
          break;

        }else if(minutes == time_table[hour][length-1]){
          var time = "今到着しています。次の到着は" + (60 - minutes + time_table[hour+1][0] + "分後です！");
          break;
      
        }else if(minutes == time_table[hour][j]){
          var time = "今到着しています。次の到着は" + (time_table[hour][j+1] - minutes) + "分後です！";
          break;
      
        }else if(minutes > time_table[hour][length-1] && time_table[hour][j] == time_table[hour][length-1]){
          var time = 60 - minutes + time_table[hour+1][0];
          var time ="あと" + time + "分後です！";
          break;  
        }
      }
    
    }else if(dayofweek < 6 && dayofweek != 0){
        var time = "大学から熊谷行きバスは、平日11～21時までしか運行しません。";

    }else{
      var time = "熊谷から大学行きバスは、休日11～19時までしか運行しません。";
    }
  }
  return time;
}

//行先以外のメッセージの場合
function myFunction7() {
  var time = "どこ行きかを選択してください！";
  return time;
}
