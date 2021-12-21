// Spawn the navbar html code with all img's src and a's href are added with the i_before value.
function create_Navbar(i_before)
{
	// get the navbar file.
    $.get(i_before + "navbar.html", function (data) 
      {
		  // need clone first or it won't change.
    var _navBar = $(data).clone();
	// select all a elements.
    $('a', _navBar).each(function() 
                         {
							 // change attr href 
        $(this).attr("href", i_before + $(this).attr("href"));
    });
	// select all img elements.
    $('img', _navBar).each(function() 
                           {
							   // change attr src
        $(this).attr("src", i_before + $(this).attr("src"));
    });
	// finally , append to body.
    $(_navBar).appendTo("#nav-placeholder");
    });
}

// Spawn the footbar html code.
function create_Footer(i_before)
{
        // get the navbar file.
        $.get(i_before + "footer_0.html", function (data) 
        {
            // need clone first or it won't change.
            var _footer = $(data).clone();
	       // finally , append to body.
            $(_footer).appendTo("#footer_container");
        });
}

// create article from i_dir link that linked to a article html file.
function create_article_link(i_before , i_dir , i_pic)
{
    var _articleTitle = "";
    var _articleIntro = "";
    // get the article file.
    $.get(i_dir, function (data) 
    {
        var _articleContent;
        // need clone first or it won't change.
        _articleContent = $(data).clone();
        _articleTitle = $("#article_title" , _articleContent).text();
        _articleIntro = $("#article_title_intro" , _articleContent).text();
        
            
        // get the panel file.
        $.get(i_before + "article_panel_0.html", function (data) 
        {
            // need clone first or it won't change.
            var _panel = $(data).clone();
            $("a" , _panel).attr("href" , i_dir);
            $("h2 a" , _panel).text(_articleTitle);
            $("img", _panel).attr("src" , i_pic);
            $("p" , _panel).text(_articleIntro);
	       // finally , append to body.
            $(_panel).appendTo("#article_container");
        });
    });
}

// Spawn a audio html code , (before , directory , title , description).
function create_audio_player(i_before, i_dir , i_title , i_des)
{
    // get the panel file.
    $.get(i_before + "audio_panel_0.html", function (data) 
    {
        // need clone first or it won't change.
        var _panel = $(data).clone();
        $("h2" , _panel).text(i_title);
        $("audio", _panel).attr("src" , i_before + i_dir);
        $("p" , _panel).text(i_des);
	   // finally , append to body.
        $(_panel).appendTo("#article_container");
    });
}

