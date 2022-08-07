// 'use strict'
// // 1行目に記載している 'use strict' は削除しないでください

// キーボードの入力状態を記録する配列の定義
let inputKeyBuffer = new Array();

// キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
function handleKeydown(enter) {
  console.log("push_key : " + enter.keyCode);
  inputKeyBuffer[enter.keyCode] = true;
}
function handleKeyup(enter) {
  inputKeyBuffer[enter.keyCode] = false;
}

// クリック位置の取得
let clickX = 0;
let clickY = 0;
function getPositionX(click) {
  console.log("clickX: " + click.offsetX);
  clickX = click.offsetX;
}
function getPositionY(click) {
  console.log("clickY: " + click.offsetY);
  clickY = click.offsetY;
}

// マウス座標の取得
let moveX = 0;
let moveY = 0;
function moveMouse(move){
  if (count % 3 === 0){
    moveX = move.offsetX;
    moveY = move.offsetY;
    console.log(moveX,moveY);
  }
}

// canvas要素の取得
const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");

// 画像の読み込み
// 背景画像の取得
let BGImage = new Image();
BGImage.src = "./carGameImage/backGround.png";
// 背景画像②の取得
let BGImage2 = new Image();
BGImage2.src = "./carGameImage/backGround2.png";
// クルマの画像を取得
let carImage = new Image();
carImage.src = "./carGameImage/carLevel1.png";
// センターラインの取得
let whiteLine = new Image();
whiteLine.src = "./carGameImage/whiteLine.png";
// HPbarの取得
let HPbar = new Image();
HPbar.src = "./carGameImage/HP.png";
// 障害物画像①の取得
let enemy1 = new Image();
enemy1.src = "./carGameImage/max.png";
// 障害物画像②の取得
let enemy2 = new Image();
enemy2.src = "./carGameImage/enemy2.png";
// 障害物画像③の取得
let enemy3 = new Image();
enemy3.src = "./carGameImage/enemy3.png";
// 障害物画像④の取得
let enemy4 = new Image();
enemy4.src = "./carGameImage/enemy4.png";
// 障害物画像⑤の取得
let enemy5 = new Image();
enemy5.src = "./carGameImage/narasan.png";
// 障害物画像⑥の取得
let enemy6 = new Image();
enemy6.src = "./carGameImage/tanktop.png";
// 障害物画像⑦の取得
let enemy7 = new Image();
enemy7.src = "./carGameImage/kunisi.png";
// エキストラ画像①の取得
let extra1 = new Image();
extra1.src = "./carGameImage/nishimurasan.png";
// エキストラ画像②の取得
let extra2 = new Image();
extra2.src = "./carGameImage/gonge.png";
// 衝突エフェクトの取得
let bomb = new Image();
bomb.src = "./carGameImage/bomb.png";
// 回復エフェクトの取得
let star = new Image();
star.src = "./carGameImage/star.png";
// ゲームオーバー字幕の取得
let gameOver = new Image();
gameOver.src = "./carGameImage/gameOver.png";
// クリア字幕の取得
let Clear = new Image();
Clear.src = "./carGameImage/clear!.png";
// メニュー字幕の取得
let Menu1 = new Image();
Menu1.src = "./carGameImage/menu.png";
// メニューアイコン②の取得
let Menu2 = new Image();
Menu2.src = "./carGameImage/config.png";
// プロフィールベースの取得
let baseProf = new Image();
baseProf.src = "./carGameImage/profile.png";
// プロフィールブロックの取得
let blockProf = new Image();
blockProf.src = "./carGameImage/square.png";
// 左矢印の取得
let left = new Image();
left.src = "./carGameImage/left.png";
// 右矢印の取得
let right = new Image();
right.src = "./carGameImage/right.png";
// 戻るボタンの取得
let Return = new Image();
Return.src = "./carGameImage/return.png";
// 吹き出しの取得
let Meesage = new Image();
Meesage.src = "./carGameImage/message.png";
// ミニカーの取得
let MiniCar = new Image();
MiniCar.src = "./carGameImage/miniCar.png";
// 運転者①の取得
let Driver1 = new Image();
Driver1.src = "./carGameImage/takanorisan.png";
// 運転者①の取得
let Driver11 = new Image();
Driver11.src = "./carGameImage/takanorisan2.png";
// 運転者②の取得
let Driver2 = new Image();
Driver2.src = "./carGameImage/akihikosan.png";
// 運転者②の取得
let Driver21 = new Image();
Driver21.src = "./carGameImage/akihikosan2.png";
// 運転者③の取得
let Driver3 = new Image();
Driver3.src = "./carGameImage/kawachisan.png";
// メッセージの取得
let messe = new Image();
messe.src = "./carGameImage/messeage.png";

// 数字アイコンを読込み
const numbers = {};
for(let i = 0; i <= 9; i++){
  let num = new Image();
  num.src = "./carGameImage/"+String(i)+".png";
  numbers["n"+String(i)] = num;
}

// 処理基準カウンター
let count = 0;
let resultCount = 0;
// 被弾判定用（連続被弾を防ぐ）
let hitCount = -60;
// 回復判定用（連続回復を防ぐ）
let healCount = -60;
// 連続クリック＆入力を防ぐカウンタ
let clickCount = -1040;
// 白線を動かすためのループ
let lineCount = 42;
// 初期HP設定
let HP = 3;
// 残り時間
let timer = 20;
// 障害物の移動速度
let n = 8;
// 点滅用のカウンター
let timing = 1;
// アイテムカウンター
let itemCount = 0;
// どの関数を動かすか (function)
let process = start;
// let process = discription;
// 画面遷移用変数
let picture = 0;
// 一次変数
let temp = 0;
// 車位置の初期値を設定
let carX = 547;
let carY = 480;

// 爆発エフェクト位置の初期化
let bombX = 0;
let bombY = 0;

// 
let Driver = [[Driver1,Driver11], [Driver2,Driver21]][Math.floor(Math.random()*2)];



// 障害物の数と位置を格納するオブジェクトを作成
const enemies = { enem1 : [310 + Math.floor(Math.random() * 470) , Math.floor(Math.random() * 42) - 100, enemy1, 50 ,50],
                  enem2 : [310 + Math.floor(Math.random() * 470) , Math.floor(Math.random() * 42) - 100, enemy2, 50 ,50],
                  enem3 : [316 , -1000, enemy3, 50 ,50],
                  enem4 : [310 + Math.floor(Math.random() * 470) , Math.floor(Math.random() * 42) - 500, enemy4, 50 ,50],
                };
// 途中追加用の敵リストを作成
const select = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

// 音楽の設定
let music1 = new Audio('./carGameMusic/Main.mp3');
let music2 = new Audio('./carGameMusic/die.mp3');
let music3 = new Audio('./carGameMusic/clear.mp3');
let music4 = new Audio('./carGameMusic/shock.mp3');
let music5 = new Audio('./carGameMusic/discription.mp3');
let music6 = new Audio('./carGameMusic/intro.mp3');
let music7 = new Audio('./carGameMusic/clear2.mp3');
let music8 = new Audio('./carGameMusic/heal.mp3');

// 音量の調整
music1.volume = 0.1;
music2.volume = 0.1;
music3.volume = 0.1;
music4.volume = 0.3;
music5.volume = 0.1;
music6.volume = 0.1;
music7.volume = 0.1;
music8.volume = 0.1;

// 繰り返し再生の設定
music1.loop = true;
music5.loop = true;  
music6.loop = true;

// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // 音楽の再生
  music1.play(); 

  // countを進める
  count += 1;
  lineCount += (n+2);

  // 画面全体をクリア
  ctx.clearRect(0, 0, 1170, 660);

  // 移動速度を調整
  let speed = 3;
  if (n > 8){
    speed = n - 5;
  }

  // 残り時間の計算
  if (count % 60 === 0){  // let time =new Date(); // console.log(time.getSeconds());
    timer -= 1;
  }  
  // キーボード操作を取得
  if ((inputKeyBuffer[37]) && (carX > 310)) { // 左
    carX -= speed; 
  }
  if ((inputKeyBuffer[39]) && (carX < 781)){  // 右
    carX += speed;
  }
  if ((inputKeyBuffer[38]) && (carY > 42)){   // 上
    carY -= 8;
  }
  if ((inputKeyBuffer[40]) && (carY < 507)){  // 下
    carY += 8;
  }

  // 時間経過で障害物を追加
  if (count % 200 === 0){
    let leng = Object.keys(enemies).length;
    let enemy = select[Math.floor(Math.random() * 6.7 )];
    if (enemy === enemy5){
      enemies["enem" + String(leng +1)] = [310 + Math.floor(Math.random() * 470) , Math.floor(Math.random() * 42) - 200, enemy, 90 , 90];
    }else if (enemy === enemy3){
      enemies["enem" + String(leng +1)] = [[776,316][leng % 2] , Math.floor(Math.random() * 42) - 200, enemy, 50 , 50];
    }else{
      enemies["enem" + String(leng +1)] = [310 + Math.floor(Math.random() * 470) , Math.floor(Math.random() * 42) - 200, enemy, 50 , 50];
    }
  }

  // 障害物ごとに処理を実施
  for (enem in enemies){
    if (enemies[enem][1] < 566){ // 画面の下まで来ていなかったら下に進む
      enemies[enem][1] += n;
    }else{
      enemies[enem][2] = select[Math.floor(Math.random() * 5.2)];
      if (enemies[enem][2] === enemy5){
        enemies[enem][0] = 310 + Math.floor(Math.random() * 470);
        enemies[enem][1] = Math.floor(Math.random() * 42) - 200;
        enemies[enem][3] = 90;
        enemies[enem][4] = 90;
      }else if(enemies[enem][2] === enemy3){
        enemies[enem][0] = [776 , 316][count % 2];
        enemies[enem][1] = Math.floor(Math.random() * 42) - 200;
        enemies[enem][3] = 50;
        enemies[enem][4] = 50;
      }else{
        enemies[enem][0] = 310 + Math.floor(Math.random() * 470);
        enemies[enem][1] = Math.floor(Math.random() * 42) - 200;
        enemies[enem][3] = 50;
        enemies[enem][4] = 50;
      }
    }
      
    // もし、障害物にぶつかったらHPをマイナス。ただし、一度ぶつかると次の1秒間は無敵状態にする。
    if ((isAreaOverlap(carX, carY, carImage.naturalWidth/5, carImage.naturalHeight/5, enemies[enem][0], enemies[enem][1], enemies[enem][3], enemies[enem][4]))){
          if ((enemies[enem][2] !== enemy6) && (enemies[enem][2] !== enemy7) && (hitCount + 60 < count)){
            HP -= 1;
            itemCount -=1;
            hitCount = count;
            // 爆発エフェクトを表示するための位置座標を取得
            bombX = carX;
            bombY = carY;
            // 接触音を再生
            music4.play();
            // 位置を初期化
            enemies[enem][0] = 310 + Math.floor(Math.random() * 470);
            enemies[enem][1] = Math.floor(Math.random() * 42) - 200;
          }else if((enemies[enem][2] === enemy6) && (healCount + 20 < count)){
            if (HP < 5) {
              HP += 1;
            }
            itemCount += 5;
            healCount = count;
            // エフェクトを表示するための位置座標を取得
            bombX = carX;
            bombY = carY;
            // 音楽を再生
            music8.play(); 
            // 障害物を初期化
            enemies[enem][0] = 310 + Math.floor(Math.random() * 470);
            enemies[enem][1] = Math.floor(Math.random() * 42) - 200;
            enemies[enem][2] = enemy1;
          }else if((enemies[enem][2] === enemy7) && (healCount + 20 < count)){
            if (HP < 5) {
              HP += 2;
            }
            itemCount += 10;
            healCount = count;
            // エフェクトを表示するための位置座標を取得
            bombX = carX;
            bombY = carY;
            // 音楽を再生
            music8.play(); 
            // 障害物を初期化
            enemies[enem][0] = 310 + Math.floor(Math.random() * 470);
            enemies[enem][1] = Math.floor(Math.random() * 42) - 200;
            enemies[enem][2] = enemy1;
          }
    }
  }

  //　背景画像を表示
  ctx.drawImage(BGImage, 0, 0, BGImage.naturalWidth/3, BGImage.naturalHeight/3);
  // 白線を表示（2本を繰り返し表示）
  if (lineCount < 507){
    ctx.drawImage(whiteLine, 560, lineCount, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }else{
    lineCount = 42;
    ctx.drawImage(whiteLine, 560, lineCount, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }
  if (lineCount < 257){
    ctx.drawImage(whiteLine, 560, lineCount + 250, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }else if (lineCount < 507){
    ctx.drawImage(whiteLine, 560, lineCount - 257 + 42, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }
  // HPを表示（HPの数値に合わせて表示）
  for (let i = 1; i  <= HP; i++){
    ctx.drawImage(HPbar, 1048, 200 + 40*i, 60, 25);
  }
  // タイマーを表示
  let n1 = Math.floor(timer / 10)
  ctx.drawImage(numbers["n"+String(n1)], 1055, 92 , numbers["n"+String(n1)].naturalWidth/3, numbers["n"+String(n1)].naturalHeight/3);  // 10のくらい
  let n2 = timer - Math.floor(timer / 10) * 10
  ctx.drawImage(numbers["n"+String(n2)], 1080, 92 , numbers["n"+String(n2)].naturalWidth/3, numbers["n"+String(n2)].naturalHeight/3);  //  1のくらい

  // 障害物を表示
  for (enem in enemies){
    if (enemies[enem][1] >= 42){
      ctx.drawImage(enemies[enem][2], enemies[enem][0], enemies[enem][1], enemies[enem][3], enemies[enem][4]);
    }
  }

  // クルマを表示
  ctx.drawImage(carImage, carX, carY, carImage.naturalWidth/5, carImage.naturalHeight/5);

  // 運転者を表示
  if (hitCount + 30 < count){
    ctx.drawImage(Driver[0], 1020, 540, Driver1.naturalWidth, Driver1.naturalHeight);
  }else{
    ctx.drawImage(Driver[1], 1020, 540, Driver2.naturalWidth, Driver2 .naturalHeight);
  }
  
  // 爆発エフェクトを表示
  if (count < hitCount + 30){
    ctx.drawImage(bomb, bombX - 60 , bombY -30, bomb.naturalWidth/2, bomb.naturalHeight/2);   
  }
    // 回復エフェクトを表示
  if (count < healCount + 30){
    ctx.drawImage(star, bombX - 60 , bombY -30, star.naturalWidth/2, star.naturalHeight/2);   
  }
  // 進捗（ミニカーの表示）
  ctx.drawImage(MiniCar, 59, 525 - ((21.25/20) * Math.floor(count/3)), MiniCar.naturalWidth, MiniCar.naturalHeight);

  // クリアの判定
  if (timer === 0){
    music1.pause();  // 一時停止
    // 音楽を再生
    if (HP >= 4){
      setTimeout("music3.play()", 500); // 少し時間を空けて音楽再生
    }else{
      setTimeout("music7.play()", 500); // 少し時間を空けて音楽再生
    }
    // クリア画面を表示
    ctx.drawImage(Clear, 270, 180, 600, 300);
    // スコア表示ループ用
    resultCount = count;
    if (itemCount < 0){
      itemCount = 0;
    }    
    // 結果ページへの遷移
    process = End2;
    clickReset();
  }

  // gameOver判定
  if (HP <= 0){
    music1.pause();  // 一時停止
    setTimeout("music2.play()", 500); // 少し時間を空けて音楽再生
    // 字幕を表示
    ctx.drawImage(gameOver, 270, 180, 600, 300);
    // スコア表示ループ用
    resultCount = count;
    if (itemCount < 0){
      itemCount = 0;
    }
    // 結果ページへの遷移
    process = End1;
    clickReset();
  }

  // 再描画
  window.requestAnimationFrame(process);
}

// 当たり判定を計算
function isAreaOverlap(carX, carY, carWidth, carHeight, eneX, eneY, eneWidth, eneHeight) {
  if (carX + carWidth < eneX){
    return false;
  }
  if (carX > eneX + eneWidth){
    return false;
  }
  if (carY > eneY + eneHeight){
    return false;
  }
  if (carY + carHeight < eneY){
    return false;
  }
  return true;
}

function start(){
  // 音楽の再生
  music6.play();  
  // カウントを開始
  count += 1;
  // 画面全体をクリア
  ctx.clearRect(0, 0, 1170, 660);

  //　背景画像を表示
  ctx.drawImage(BGImage, 0, 0, BGImage.naturalWidth/3, BGImage.naturalHeight/3);
  // 白線を表示
  if (lineCount < 507){
    ctx.drawImage(whiteLine, 560, lineCount, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }else{
    lineCount = 42;
    ctx.drawImage(whiteLine, 560, lineCount, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }
  if (lineCount < 257){
    ctx.drawImage(whiteLine, 560, lineCount + 250, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }else if (lineCount < 507){
    ctx.drawImage(whiteLine, 560, lineCount - 257 + 42, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }
  //　configを表示
  ctx.drawImage(Menu2, 700, 441, Menu2.naturalWidth/5.5, Menu2.naturalHeight/5.5);


  // 点滅用のカウントを実施
  if (count % 80 === 0){
    timing = timing * -1;
  }
  // 説明内容の表示  
  if (timing === 1){
    ctx.drawImage(Menu1, 108, 260, 900, 150);
  }

  // スペースが押されたらゲーム開始
  if ((inputKeyBuffer[32] || inputKeyBuffer[13]) && (clickCount +15 < count)){
    // 音楽を停止
    music6.pause();  
    // カウントをゼロリセット
    count = 0;
    clickCount = -10;
    // 関数をメインループに移行
    process = chooseLevel;
  }
  // "z"が押されたら説明画面へ
  if ((inputKeyBuffer[90]) && (clickCount +15 < count)){
    // 音楽を停止
    music6.pause();  
    // 再生位置を最初に戻す
    music6.currentTime = 0;
    // 関数を説明ページ用関数に
    process = discription;
  }
  clickReset()
  // 再描画
  window.requestAnimationFrame(process);
}

function discription(){
  // 音楽を再生
  music5.play();  
  count += 1;
  // クリック位置を取得
  canvas.addEventListener('click', getPositionX);
  canvas.addEventListener('click', getPositionY);
  // マウス位置を取得
  canvas.addEventListener("mousemove", moveMouse);
  
  // 画面全体をクリア
  ctx.clearRect(0, 0, 1170, 660);
  // 背景画像を表示
  ctx.drawImage(BGImage2, 0, 0, BGImage2.naturalWidth/3, BGImage2.naturalHeight/3);
  // 戻るボタンを表示
  ctx.drawImage(Return, 1000, 540, Return.naturalWidth/3, Return.naturalHeight/3);
  // プロフィール写真の箱を表示
  let profCount =0;
  for (let y = 0; y <= 2;y++){
    for (let x = 0; x <= 2; x++){
      if (!((y == 2) && (x == 2))){
        ctx.drawImage(blockProf, 50 + x * 440, 100 + y * 200, blockProf.naturalWidth/3, blockProf.naturalHeight/3);
        ctx.drawImage(prof[profCount][0], 97 + x * 440, 122 + y * 200, 100, 100);
        profCount += 1;
      }
    }
  }
  // クリック判定
  profCount = 0;
  for (let y = 0; y <= 2;y++){
    for (let x = 0; x <= 2; x++){
      if (checkRange(45 + x * 440, 245 + x * 440 ,clickX) && checkRange(95 + y * 200, 250 + y * 200,clickY)){
        if (profCount < 8){
          process = discriptionDetail;
          picture = 
          picture = profCount;
        }
      }
      profCount += 1;
    }
  }
  // 画像をポップアップ
  profCount = 0;
  for (let y = 0; y <= 2;y++){
    for (let x = 0; x <= 2; x++){
      if (checkRange(45 + x * 440, 245 + x * 440 , moveX) && checkRange(95 + y * 200, 250 + y * 200, moveY)){
        if (profCount < 8){
          ctx.drawImage(blockProf, 27 + x * 440, 85 + y * 200, blockProf.naturalWidth/2.5, blockProf.naturalHeight/2.5);
          ctx.drawImage(prof[profCount][0], 80 + x * 440, 108 + y * 200, 130, 130);
        }
      }
      profCount += 1;
    }
  }

  if ((inputKeyBuffer[37] || inputKeyBuffer[38] || inputKeyBuffer[39] || inputKeyBuffer[40]||inputKeyBuffer[32]) && (clickCount + 10 < count) ){
    count = 0;
    clickCount = 0;
    picture = 0;
    process = discriptionDetail;
  }

  // "a"が押されたら説明画面へ
  if ((((checkRange(1000, 1100, clickX)) && (checkRange(560, 615, clickY))) || (inputKeyBuffer[65])|| inputKeyBuffer[13])
       && (clickCount + 15 < count)){
    clickCount = count;
    // 音楽を停止
    music5.pause();  
    // 再生位置を初期化
    music5.currentTime = 0;
    // 関数をスタート画面に変更
    process = start;
  }
  clickReset()
  // 再描画
  window.requestAnimationFrame(process);
}

const prof = [[enemy5, 'しつちょ～' ,760 ,'猪木ファン、我らの室長' ,'強い（確信）'],
              [enemy1, 'Max!' ,820 ,'タンクトップ愛好家' ,'鋼の肉体を持つ'],
              [extra1, 'アルファード' ,740 ,'西村さんの愛車・速い' ,'積載物はタンクトップ'],
              [enemy3, 'カラーコーン' ,740 ,'何のへんてつもない' ,'普通のカラーコーン'],
              [enemy6, 'タンクトップ' ,740 ,'絶滅の危機に瀕している' ,'着るとHPが回復'],
              [enemy4, '通行止めのやつ' ,720 ,'黄色と黒のストライプ' ,'ぶつかると痛い'],              
              [enemy2, 'ディグダ' ,780 ,'野生のディグダ' ,'クルマには勝てない'],
              [extra2, 'ヒミツ' ,800 ,'隠しキャラ' ,'出会えるとラッキー！'],
              [enemy7, 'きょうか' ,780 ,'隠しキャラ' ,'ぱわふるガール！']
            ];

function discriptionDetail(){
  // 音楽を再生
  music5.play();  
  count += 1;
  // キーボード操作を取得
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);

  // 画面全体をクリア
  ctx.clearRect(0, 0, 1170, 660);
  //　背景画像を表示
  ctx.drawImage(BGImage2, 0, 0, BGImage2.naturalWidth/3, BGImage2.naturalHeight/3);
  //　profileBaseを表示
  ctx.drawImage(baseProf, 30, 105, baseProf.naturalWidth/3 ,baseProf.naturalHeight/3);
  // 個別プロフィールを表示
  if ((picture === 7) && (checkRange(750, 1040, moveX) && checkRange(250, 440, moveY))){
    ctx.drawImage(prof[8][0], 800, 250, 190, 190);
    ctx.font = '40px fantasy';
    ctx.fillText(prof[8][1], prof[8][2], 600);
    ctx.fillText(prof[8][3], 70, 200);
    ctx.fillText(prof[8][4], 70, 270);
  }else{
    ctx.drawImage(prof[picture][0], 800, 250, 190, 190);
    ctx.font = '40px fantasy';
    ctx.fillText(prof[picture][1], prof[picture][2], 600);
    ctx.fillText(prof[picture][3], 70, 200);
    ctx.fillText(prof[picture][4], 70, 270);
  }
  
  // 戻るボタンを表示
  ctx.drawImage(Return, 430, 540, Return.naturalWidth/3, Return.naturalHeight/3);
  // 矢印を表示
  if (picture !== 0){
    ctx.drawImage(left, 10, 330, left.naturalWidth/4, left.naturalHeight/4);
  }
  if (picture < prof.length -2){
    ctx.drawImage(right, 1115, 330, right.naturalWidth/4, right.naturalHeight/4);
  }

  // 左矢印を押された、もしくはクリックされたらページを1つ前に
  if (((checkRange(10, 50, clickX) && checkRange(330, 380, clickY)) || (inputKeyBuffer[37])) 
      && (clickCount + 15 < count) 
      && (picture > 0)){
    clickCount = count;
    picture -=1;
  }
  // 右矢印を押された、もしくはクリックされたらページを1つ前に
  if (((checkRange(1115, 1155, clickX) && checkRange(330, 380, clickY)) || (inputKeyBuffer[39])) 
      && (clickCount + 15 < count) 
      && (picture < prof.length -1) && (picture < 7)){
    clickCount = count;
    picture +=1;
  }

  // "a"が押されたら説明画面へ
  if ((((checkRange(430, 530, clickX)) && (checkRange(560, 615, clickY))) || inputKeyBuffer[13] || (inputKeyBuffer[65]))
      && (clickCount + 15 < count)){
    clickCount = count;
    picture = 0;
    // 再生位置を初期化
    music5.currentTime = 0;
    // 関数をスタート画面に変更
    process = discription;
  }
  clickReset()
  // 再描画
  window.requestAnimationFrame(process);
}

// クリック範囲のチェック用関数
function checkRange(min, max, pos){
  if ((pos >= min) && (pos <= max)){
    return true;
  }
}
// クリック位置を常に初期化するため
function clickReset(){
  clickX = 0;
  clickY = 0;
}

function chooseLevel(){
  // 音楽の再生
  music6.play();  
  // 画面全体をクリア
  ctx.clearRect(0, 0, 1170, 660);
  count +=1;
  // クリック位置を取得
  canvas.addEventListener('click', getPositionX);
  canvas.addEventListener('click', getPositionY);
  // キーボード操作を取得
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);
  //　背景画像を表示
  ctx.drawImage(BGImage, 0, 0, BGImage.naturalWidth/3, BGImage.naturalHeight/3);
  // 白線を表示
  if (lineCount < 507){
    ctx.drawImage(whiteLine, 560, lineCount, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }else{
    lineCount = 42;
    ctx.drawImage(whiteLine, 560, lineCount, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }
  if (lineCount < 257){
    ctx.drawImage(whiteLine, 560, lineCount + 250, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }else if (lineCount < 507){
    ctx.drawImage(whiteLine, 560, lineCount - 257 + 42, whiteLine.naturalWidth/2, whiteLine.naturalHeight/2);
  }
  // 文字スペースを表示
  ctx.fillStyle = 'AliceBlue'; // 図形の色
  ctx.fillRect(300, 210 , Menu2.naturalWidth/3, Menu2.naturalHeight/3);
  ctx.fillStyle = 'black';  // 文字の色
  ctx.font = '33px fantasy';
  ctx.fillText("※レベルを選んでください", 315, 265);
  // 左矢印を押された、もしくはクリックされたらページを1つ前に
  if (((checkRange(320, 360, clickX) && checkRange(350, 400, clickY)) || (inputKeyBuffer[37]))
  && (clickCount + 10 < count) 
  && (n > 2)){
    clickCount = count;
    n -= 2;
  }
  // 右矢印を押された、もしくはクリックされたらページを1つ前に
  if (((checkRange(763, 804, clickX) && checkRange(350, 400, clickY)) || (inputKeyBuffer[39])) 
  && (clickCount + 10 < count) 
  && (n < 18)){
    clickCount = count;
    n += 2;
  }
  if  (n !== 2){
    ctx.drawImage(left, 320, 350, left.naturalWidth/4, left.naturalHeight/4);
  }
  if (n !== 18){
    ctx.drawImage(right, 760, 350, right.naturalWidth/4, right.naturalHeight/4);
  }
  // 点滅用のカウントを実施
  if ((count % 30 === 0)){
    timing = timing * -1;
  }
  // 数字を表示
  if (timing === 1){
    ctx.drawImage(numbers["n"+ String(n/2)],500,320,numbers["n"+ String(n/2)].naturalWidth * 2,numbers["n"+ String(n/2)].naturalWidth * 2); 
  }
  // 吹き出しを表示
  if (clickCount + 40 < count){
    ctx.drawImage(Meesage,660,470,Meesage.naturalWidth / 3,Meesage.naturalHeight / 3); 
  }

  if ((inputKeyBuffer[13]||inputKeyBuffer[32]) && (clickCount + 25 < count) ){
    // 音楽を停止
    music6.pause();  
    // カウントをゼロリセット
    count = 0;
    clickCount = -10;
    clickReset()
    // 関数をメインループに移行
    process = update;
  }
  clickReset()
  window.requestAnimationFrame(process); 
}

function End1(){
  count += 1;
  // scoreの表示
  ctx.fillStyle = 'AliceBlue'; // 図形の色
  ctx.fillRect(700, 492, Menu2.naturalWidth/5.5, Menu2.naturalHeight/8);
  ctx.fillStyle = 'black';  // 文字の色
  ctx.font = '23px fantasy';
  ctx.fillText("time score"  ,720, 520);
  ctx.fillText("item score"  ,720, 545);
  ctx.fillText("clear bounus",720, 570);
  ctx.fillText("total score" ,720, 595);

  if (((count - resultCount) % 20 === 0) && (temp < 15)){
    temp = (count - resultCount) / 20;
  }
  if(temp < 3){
    ctx.fillText(":   "+ 
                  String(String((20 - timer) * 10).padStart(3,0).slice(0,temp)+String(Math.floor(Math.random() * (1000/10 ** temp)))), 880, 520);
    ctx.fillText(":   "+ 
                  String(String((itemCount) * 20).padStart(3,0).slice(0,temp)+String(Math.floor(Math.random() * (1000/10 ** temp)))), 880, 545);
    ctx.fillText(":   "+ 
                  String(String(0).padStart(3,0).slice(0,temp)+String(Math.floor(Math.random() * (1000/10 ** temp)))), 880, 570);
    ctx.strokeText(":   ", 880, 595);
  }else{
    ctx.fillText(":   "+ String((20 - timer) * 10).padStart(3,0), 880, 520);
    ctx.fillText(":   "+ String((itemCount) * 20).padStart(3,0), 880, 545);
    ctx.fillText(":   "+ String(0).padStart(3,0), 880, 570);
    ctx.strokeStyle = 'red';  // 文字の色
    ctx.font = 'bold 24px fantasy';   
    ctx.strokeText(":   " + String(((20-timer) * 10) + (itemCount) * 20).padStart(3,0) , 880, 595);
    process = URLlink;
  }

  window.requestAnimationFrame(process);
}

function End2(){
  count += 1;
  // scoreの表示
  ctx.fillStyle = 'AliceBlue'; // 図形の色
  ctx.fillRect(700, 492, Menu2.naturalWidth/5.5, Menu2.naturalHeight/8);
  ctx.fillStyle = 'black';  // 文字の色
  ctx.font = '23px fantasy';
  ctx.fillText("time score"  ,720, 520);
  ctx.fillText("item score"  ,720, 545);
  ctx.fillText("clear bounus",720, 570);
  ctx.fillText("total score" ,720, 595);

  if (((count - resultCount) % 20 === 0) && (temp < 15)){
    temp = (count - resultCount) / 20 ;
  }
  if(temp < 3){
    ctx.fillText(":   "+ 
                  String(String((20 - timer) * 10).padStart(3,0).slice(0,temp)+String(Math.floor(Math.random() * (1000/10 ** temp)))), 880, 520);
    ctx.fillText(":   "+ 
                  String(String(itemCount * 20).padStart(3,0).slice(0,temp)+String(Math.floor(Math.random() * (1000/10 ** temp)))), 880, 545);
    ctx.fillText(":   "+ 
                  String(String(n * 25).padStart(3,0).slice(0,temp)+String(Math.floor(Math.random() * (1000/10 ** temp)))), 880, 570);
    ctx.strokeText(":   ", 880, 595);
  }else{
    ctx.fillText(":   "+ String((20 - timer) * 10).padStart(3,0), 880, 520);
    ctx.fillText(":   "+ String(itemCount * 20).padStart(3,0), 880, 545);
    ctx.fillText(":   "+ String(n * 25).padStart(3,0), 880, 570);
    ctx.strokeStyle = 'red';  // 文字の色
    ctx.font = 'bold 24px fantasy';   
    ctx.strokeText(":   " + String((n * 25) + ((20-timer) * 10) + (itemCount * 20)).padStart(3,0) , 880, 595);
    process = URLlink;
  }
  window.requestAnimationFrame(process);
}

// 画面遷移用関数
function URLlink(){
  // スペースが押されたらページをリンク

  if (HP !== 0){
    ctx.drawImage(messe, 140, 450, messe.naturalWidth/3, messe.naturalHeight/3);
  }
  if ((inputKeyBuffer[32])||(inputKeyBuffer[13])) {
    window.location.href = './report.html';
  }else if(inputKeyBuffer[90]){
    window.location.href = './index.html';
  }
  window.requestAnimationFrame(process);
}

// メイン処理
window.addEventListener("load", process);
