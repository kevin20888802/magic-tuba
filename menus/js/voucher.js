var reward_nums = [];

// 畫面控制
function show_menu(i_id)
{
    let menu_count = 0;
    for(let i = 0; i <= menu_count; i++)
    {
            if(i.toString() == i_id.toString())
            {
               $("#menu_" + i.toString()).show(); 
            }
            else
            {
                $("#menu_" + i.toString()).hide(); 
            }
    }
}

function get_reward_nums()
{
    // 解決CORS錯誤的API網址
    // 在目標網站前面加
    let cors_api = "https://cors-anywhere.herokuapp.com/";
    // 發票網站
    let voucher_url = "https://invoice.etax.nat.gov.tw/";
    
    // 網頁請求
    var get_process = new XMLHttpRequest();
    // 先定義取得後的動作
    get_process.onload = function() 
    {       
        console.log("Loaded Site.")
        console.log(get_process.response);
        let site_data = get_process.response;
        let num_datas = $(".t18Red" , site_data);
        console.log(num_datas.length);
        for(let i = 0 ; i < num_datas.length; i++)
        {
            console.log(i.toString() + "：" + num_datas[i].textContent);
        }
        reward_nums.push(num_datas[0].textContent); // 特別獎
        reward_nums.push(num_datas[1].textContent); // 特獎
        reward_nums.push(num_datas[2].textContent.split("、")[0]); // 頭獎1
        reward_nums.push(num_datas[2].textContent.split("、")[1]); // 頭獎1
        reward_nums.push(num_datas[2].textContent.split("、")[2]); // 頭獎1
        reward_nums.push(num_datas[3].textContent); // 增開六獎
        for(let i = 0 ; i < reward_nums.length; i++)
        {
            console.log(i.toString() + "：" + reward_nums[i]);
        }
        refresh_nums();
    }
    // 實際動作設定
    // "GET"取得或是"SET"傳訊息過去　,  網址
    get_process.open("GET", cors_api + voucher_url);       
    //　傳送請求
    get_process.send();
}

function refresh_nums()
{
    $("#reward_num_0").html(reward_nums[0]);
    $("#reward_num_1").html(reward_nums[1]);
    $("#reward_num_2").html(reward_nums[2] + "<br\>" + reward_nums[3] + "<br\>" + reward_nums[4]);
    $("#reward_num_3").html(reward_nums[5]);
}

function check_reward()
{
    let i_num = $("#inp_num").val();
    let output_text = "";
    if(i_num[i_num.length - 3] + i_num[i_num.length - 2] + i_num[i_num.length - 1] == reward_nums[5])
    {
        output_text = "增開六獎" + "<br\><br\>" + "2百元";
    }
    let _sameNums = [0,0,0];
    for(let i = reward_nums[2].length - 1 ; i >= 0; i -= 1)
    {
        if(reward_nums[2][i] == i_num[i])
        {
            _sameNums[0] += 1;
        }
        else
        {
            break;
        }
    }
    for(let i = reward_nums[3].length - 1 ; i >= 0; i -= 1)
    {
        if(reward_nums[3][i] == i_num[i])
        {
            _sameNums[1] += 1;
        }
        else
        {
            break;
        }
    }
    for(let i = reward_nums[4].length - 1 ; i >= 0; i -= 1)
    {
        if(reward_nums[4][i] == i_num[i])
        {
            _sameNums[2] += 1;
        }
        else
        {
            break;
        }
    }
    let _maxSameNum = _sameNums[0];
    for(let i = 0 ; i < _sameNums.length; i++)
    {
        if(_maxSameNum < _sameNums[i])
        {
            _maxSameNum = _sameNums[i];
        }
    }
    if(_maxSameNum == 3)
    {
        output_text = "六獎" + "<br\><br\>" + "2百元";
    }
    if(_maxSameNum == 4)
    {
        output_text = "五獎" + "<br\><br\>" + "1千元";
    }
    if(_maxSameNum == 5)
    {
        output_text = "四獎" + "<br\><br\>" + "4千元";
    }
    if(_maxSameNum == 6)
    {
        output_text = "三獎" + "<br\><br\>" + "1萬元";
    }
    if(_maxSameNum == 7)
    {
        output_text = "二獎" + "<br\><br\>" + "4萬元";
    }
    if(_maxSameNum == 8)
    {
        output_text = "頭獎" + "<br\><br\>" + "20萬元";
    }
    if(i_num == reward_nums[0])
    {
        output_text = "特別獎" + "<br\><br\>" + "1,000萬元";
    }
    if(i_num == reward_nums[1])
    {
        output_text = "特獎" + "<br\><br\>" + "200萬元";
    }
    if(output_text == "")
    {
        output_text = "未中獎";
    }
    output_text = "對獎結果：" + output_text;
    $("#result_text").html(output_text);
}

function RandomRange(min, max) 
{
  return Math.random() * (max - min) + min;
}

function RandomIntRange(min, max) 
{
  return Math.floor(RandomRange(min,max));
}

// 主程式 main
$( document ).ready(function() 
{
    console.log( "ready!" );
    jQuery.support.cors = true;
    show_menu(0);
    get_reward_nums();
});