var poet_names = ["春曉" , "靜夜思" , "唐太宗之語" , "水平四方調" , "贈晶彥"];
var poet_vals = 
    [
        "春眠不覺曉，處處聞啼鳥。夜來風雨聲，花落知多少。",
        "床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。",
        "以銅為鏡，可以正衣冠。以古為鏡，可以知興替。以人為鏡，可以明得失。以銅、古和人為鏡，可以施放星爆氣流斬。",
        "朝辭現實頭盔聞，千裏艾恩一日還。兩岸劍聲響不住，為通關十六連斬。",
        "晶彥持劍將欲行，忽見塔上七四層。閃耀魔眼在彼方，突破限制不遠矣。"
    ];

var q_titles = [];
var q_anws = [];
var q_opts = [];

var score = 100;
var curr_quest = 0;

function show_menu(i_id)
{
    let menu_count = 8;
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

var lv_one_val = 0;
function level_one_show()
{
    let poet_val_text = "";
    for(let i = 0 ; i < poet_vals.length; i++)
    {
        poet_val_text += "[" + poet_names[i] + "]：" + poet_vals[i] + "<br/>";
    }
    $("#poets_text").html(poet_val_text);
    show_menu(2);
}
function level_one_enter()
{
    lv_one_val = RandomIntRange(0,poet_names.length);
    $("#poets_get_title").text("你抽中了[" + poet_names[lv_one_val] + "]，請輸入。");
    show_menu(3);
}
function level_one_confirm()
{
    let i_anw = $("#answer_0").val().toString();
    if(i_anw == poet_vals[lv_one_val])
    {
        level_two_show();
    }
    else
    {
        show_menu(1);
    }
}

var lv_two_val = 0;
var lv_two_live = 10;
function level_two_show()
{
    let poet_val_text = "";
    for(let i = 0 ; i < poet_vals.length; i++)
    {
        poet_val_text += "[" + poet_names[i] + "]：" + poet_vals[i] + "<br/>";
    }
    $("#poets_text").html(poet_val_text);
    show_menu(4);
}
function level_two_enter()
{
    lv_two_val = RandomIntRange(0,100);
    lv_two_live = 10;
    $("#level_two_live_text").text("請猜數字。");
    show_menu(5);
}
function level_two_confirm()
{
    let i_anw = $("#answer_1").val().toString();
    if(i_anw == lv_two_val)
    {
        show_menu(6);
    }
    else
    {
        if(lv_two_live > 0)
        {
            let hint_text = "";
            if(parseInt(i_anw) > lv_two_val)
            {
                hint_text = "太大了，猜小一點。" + "<br/>" + "還剩下" + lv_two_live.toString() + "次機會。";
            }
            else
            {
                hint_text = "太小了，猜大一點。" + "<br/>" + "還剩下" + lv_two_live.toString() + "次機會。";
            }
            $("#level_two_live_text").html(hint_text);
            lv_two_live -= 1;
        }
        else
        {
            show_menu(1);
        }
    }
}

function level_three_enter()
{
    show_question(RandomIntRange(0,q_titles.length - 1));
    show_menu(7);
}
function get_questions()
{
    $.get('js/wife_questions.csv', 
    function(data) 
    {
        let _lines = data.split("\n");
        for(let i = 0 ; i < _lines.length; i++)
        {
            let _datas = _lines[i].split(",");
            q_titles.push(_datas[0]);
            q_anws.push(parseInt(_datas[1]));
            console.log(parseInt(_datas[1]));
            let opt_list = [];
            opt_list.push(_datas[2]);
            opt_list.push(_datas[3]);
            opt_list.push(_datas[4]);
            opt_list.push(_datas[5]);
            q_opts.push(opt_list);
        }
        //show_question(0);
    }, 'text');
}

function check_answer()
{
    let i_answer = $("input[name=option_list]:checked").val();
    console.log(i_answer);
    if(i_answer == q_anws[curr_quest])
    {
        show_menu(8);
    }
    else
    {
        show_menu(1);
    }
}

function show_question(i_index)
{
    $("#title_text").text("第" + (i_index + 1) + "題");
    $("#description_text").text(q_titles[i_index]);
    $("#option_text_0").text(q_opts[i_index][0]);
    $("#option_text_1").text(q_opts[i_index][1]);
    $("#option_text_2").text(q_opts[i_index][2]);
    $("#option_text_3").text(q_opts[i_index][3]);
    show_menu(7);
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
    get_questions();
});