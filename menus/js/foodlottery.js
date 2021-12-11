// 選項
var options = [];
// 已選擇
var selected = [];

// 畫面控制
function show_menu(i_id)
{
    let menu_count = 2;
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

function add_option_btn()
{
    let i_name = $("#add_option").val();
    add_option(i_name);
    refresh_list();
}

// 新增選項
function add_option(i_name)
{
    let option_count = options.length;
    options.push(i_name);
}

// 增加選擇
function add_selects()
{
    let selected_list = $('#shop_list').val();
    for(let i = 0 ; i < selected_list.length; i++)
    {
        if(!selected.includes(selected_list[i].replace("shop_" , "")))
        {
            console.log( "added" + selected_list[i] );
            selected.push(selected_list[i].replace("shop_" , ""));
        }
    }
    refresh_list();
}

// 移除選擇
function remove_selects()
{
    let selected_list = $('#result_list').val();
    for(let i = 0 ; i < selected_list.length; i++)
    {
        for(let j = 0; j < selected.length; j++)
        {
            if(selected[j].toString() == selected_list[i].replace("shop_" , ""))
            {
                console.log( "removed" + options[selected[j]]);
                selected.splice(j,1);
            }
        }
    }
    refresh_list();
}

// 隨機顯示結果
function show_result()
{
    let rand_num = Math.floor(RandomRange(0,selected.length));
    let result_val = options[selected[rand_num]];
    console.log("RandInt=" + rand_num + " 隨機結果=" + result_val);
    $("#result_text").text(result_val);
    show_menu(2);
}

function RandomRange(min, max) 
{
  return Math.random() * (max - min) + min;
}

// 重整清單
function refresh_list()
{ 
    $('#shop_list').find('option').remove();
    $('#result_list').find('option').remove();
    for(let i = 0 ; i < options.length; i++)
    {
        console.log( "options_" + i + " = " + options[i] );
        let in_select = false;
        for(let j = 0 ; j < selected.length; j++)
        {
            if(i.toString() == selected[j])
            {
                in_select = true;
                $("#result_list").append($("<option></option>").attr("value", "shop_" + i.toString()).text(options[i]));
            }
        }
        if(!in_select)
        {
            $("#shop_list").append($("<option></option>").attr("value", "shop_" + i.toString()).text(options[i]));
        }
    }
    if(selected.length > 0)
    {
        $("#confirm_btn").attr("disabled" , false);
    }
    else
    {
        $("#confirm_btn").attr("disabled" , true);
    }
}

function confirm_show()
{
    let result_list_text = "";
    for(let i = 0 ; i < selected.length; i++)
    {
        result_list_text += options[selected[i]] + "<br/>";
    }
    $("#select_confirm_list").html(result_list_text);
    show_menu(1);
}

// 主程式 main
$( document ).ready(function() 
{
    console.log( "ready!" );
    add_option("麥當勞");
    add_option("肯德基");
    add_option("八方雲集");
    add_option("四海遊龍");
    refresh_list();
    show_menu(0);
});