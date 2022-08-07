// キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
let inputKeyBuffer = new Array();
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
function handleKeydown(enter) {
  console.log("push_key : " + enter.keyCode);
  inputKeyBuffer[enter.keyCode] = true;
}
function handleKeyup(enter) {
  inputKeyBuffer[enter.keyCode] = false;
}

// 音楽の設定
let music1 = new Audio('./reportMusic/beckMusic.mp3');
// 音量の調整
music1.volume = 0.08;
// 音楽の再生
music1.play(); 

// Chart更新関数
function makeChart(num1,num2,num3){
    // Graph1を更新
    let targetBlue = getRuleBySelector('.box.blue .percent .line');
    targetBlue.style.setProperty('stroke-dashoffset', num1);
    // Graph2を更新
    let targetRed = getRuleBySelector('.box.red .percent .line');
    targetRed.style.setProperty('stroke-dashoffset', num2);
    // Graph3を更新
    let targetGreen = getRuleBySelector('.box.green .percent .line');
    targetGreen.style.setProperty('stroke-dashoffset', num3);
}
// CSS検索関数
function getRuleBySelector(css){
    let i, j, sheets, rules, rule = null;
    // stylesheetのリストを取得
    sheets = document.styleSheets;
    for(i=0; i<sheets.length; i++){
        // そのstylesheetが持つCSSルールのリストを取得
        rules = sheets[i].cssRules;
        for(j=0; j<rules.length; j++){
            // セレクタが一致するか調べる
            if(css === rules[j].selectorText){
                rule = rules[j];
                break;
            }
        }
    }
    return rule;
}
//日付の表示
const insert = document.getElementsByClassName("item2")[0];
const today = document.createElement("p");
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate()
today.innerHTML= "publish at: " + year + "年 " + month + "月 "+ day +"日";
insert.appendChild(today);

// 診断結果の表示
// const no = Math.floor(Math.random()*3);
const skill = [Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)];
// 今回は各数値をランダムで。。。
for (let i =0; i <= 2;i++){
    document.getElementsByClassName("title")[i].innerHTML=`${skill[i]}<span>%</span>`;
}
// どの能力が優れているかで表示先を変更
const no = skill.indexOf(Math.max(...skill));
const Persona = [
    ["かずまっくす","・いつも冷静に周囲を見渡すことが得意です。","・プレゼン力も高く、自分の考えを正しく伝える力が高いと思われます。",["./reportImage/max2.png","./reportImage/max1.png"][(skill[0]>30)*1]],
    ["むーらん","・人間力が非常に高いです。","・プログラミングも非常に強い傾向で、Pythonマスターと呼ばれます。","./reportImage/akihikosan.png"],
    ["くにしぃ☆","・行動力に非常にすぐれています。","・持ち前の行動力を活かし、企画業務で強みを発揮できます。","./reportImage/kyouka.png"],
];
// 人に合わせて文字色を変更
if (no === 0){
    getRuleBySelector('#Abstruct span').style.setProperty('color', "rgb(0, 21, 255)");
}else if(no === 1){
    getRuleBySelector('#Abstruct span').style.setProperty('color', "red");
}else{
    getRuleBySelector('#Abstruct span').style.setProperty('color', "rgb(0, 164, 41)");
}
// 説明文の表示
document.getElementById("Abstruct").innerHTML=`あなたは  <span>${Persona[no][0]}</span>  さんタイプです。`;
document.getElementsByClassName("detail1")[0].innerHTML=Persona[no][1];
document.getElementsByClassName("detail2")[0].innerHTML=Persona[no][2];
document.getElementById("images").src= Persona[no][3];
console.log(document.getElementById("images").src);

//円グラフの表示
makeChart(440-4.4*skill[0] ,440-4.4*skill[1] ,440-4.4*skill[2]);
// setTimeout("makeChart(30 ,120 ,360)", 1000);

// 画面遷移用関数
function URLlink(){
    // スペースが押されたらページをリンク
    if (inputKeyBuffer[32]) {
      window.location.href = './index.html';
    }else if(inputKeyBuffer[90]){
      window.location.href = './report.html';
    }
    window.requestAnimationFrame(URLlink);
}
window.requestAnimationFrame(URLlink);
