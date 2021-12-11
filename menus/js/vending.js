var item_names = ["可口可樂" , "雪碧" , "百事可樂", "舒跑" , "麥香奶茶" , "黑松沙士"];
var item_costs = [29,25,29,25,30,28];

var curr_coin = 0;

// 畫面控制
function show_menu(i_id)
{
    let menu_count = 1;
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

function add_coin()
{
    let i_coins = 0;
    i_coins = $("#add_coin").val();
    curr_coin += parseInt(i_coins);
    console.log("投入" + i_coins + "枚硬幣");
    refresh_items();
}

function clear_coin()
{
    curr_coin = 0;
    refresh_items();
}

function buy_item(i_id)
{
    let voucher_code = "";
    for(let i = 0 ; i < 2; i++)
    {
        voucher_code += String.fromCharCode(RandomIntRange(65,90));
    }
    voucher_code += "-";
    for(let i = 0 ; i < 8; i++)
    {
        voucher_code += RandomIntRange(0,9);
    }
    console.log("發票號碼：" + voucher_code);
    curr_coin -= item_costs[i_id];
    
    $("#buy_item_title").text(item_names[i_id]);
    $("#voucher_text").html(voucher_code);
    $("#buy_item_img").attr("src" , "../img/vending/item_" + i_id.toString() + ".jpg");
    show_menu(1);
    
    refresh_items();
}

function RandomRange(min, max) 
{
  return Math.random() * (max - min) + min;
}

function RandomIntRange(min, max) 
{
  return Math.floor(RandomRange(min,max));
}

function refresh_items()
{
    $("#nowcoin_text").text("目前硬幣數量：" + curr_coin);
    for(let i = 0 ; i < item_costs.length; i++)
    {
        $("#cost_" + i.toString()).text("$：" + item_costs[i]);
        if(curr_coin < item_costs[i])
        {
            $("#buybtn_" + i.toString()).attr("disabled" , true);
        }
        else
        {
            $("#buybtn_" + i.toString()).attr("disabled" , false);
        }
    }
}

// 主程式 main
$( document ).ready(function() 
{
    console.log( "ready!" );
    refresh_items();
    show_menu(0);
});