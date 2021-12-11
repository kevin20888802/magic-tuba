var q_titles = [];
var q_anws = [];
var q_opts = [];

var score = 100;
var curr_quest = 0;

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

function get_questions()
{
    $.get('js/popkart_questions.csv', 
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
    if(i_answer != q_anws[curr_quest].toString())
    {
        score -= 100 / q_anws.length
    }
    curr_quest += 1;
    console.log("Now Score=" + score);
    if(curr_quest >= q_anws.length)
    {
        $("#result_title").html("您的分數為： " + score.toString() + " 分");
        if(score >= 90)
        {
            $("#result_description").text("及格，恭喜您通過駕照學科考試。");
        }
        else
        {
            $("#result_description").text("不及格，請再接再厲。");
        }
        show_menu(2);
    }
    else
    {
       show_question(curr_quest); 
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
    show_menu(1);
}

// 主程式 main
$( document ).ready(function() 
{
    console.log( "ready!" );
    jQuery.support.cors = true;
    show_menu(0);
    get_questions();
});