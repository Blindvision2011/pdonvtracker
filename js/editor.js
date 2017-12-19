/***************************************************************/
// Name              : Javascript Textarea BBCode Markup Editor
// Version           : 1.3
// Author            : Balakrishnan
// Last Modified Date: 25/jan/2009
// License           : Free
// URL               : http://www.corpocrat.com
//
// Erweitert und mit neuen Funktionen versehen 24/03/2010
// Cerberus bei http://www.netvision-technik.de
/*************************************************************/

var textarea;
var content;

function edToolbar(obj, url, png, full)
{
    if (png == 'true')
    {
        var end = "png";
    }
    else
    {
        var end = "gif";
    }

    var fontoptions  = new Array("Arial", "Arial Black", "Arial Narrow", "Book Antiqua", "Century Gothic", "Comic Sans MS",
                                 "Courier New", "Fixedsys", "Franklin Gothic Medium", "Garamond", "Georgia", "Impact",
                                 "Lucida Console", "Lucida Sans Unicode", "Microsoft Sans Serif", "Palatino Linotype",
                                 "System", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana");
    var sizeoptions  = new Array(1, 2, 3, 4, 5, 6, 7);
    var coloroptions = new Array("#000000", "#8A4117", "#667C26", "#254117", "#2B3856", "#000080", "#4B0082",
                                 "#2F4F4F", "#8B0000", "#FF8C00", "#808000", "#008000", "#008080", "#0000FF",
                                 "#708090", "#696969", "#FF0000", "#F4A460", "#9ACD32", "#48D1CC", "#4169E1",
                                 "#800080", "#808080", "#FF00FF", "#FFA500", "#FFFF00", "#00FF00", "#00FFFF",
                                 "#00BFFF", "#9932CC", "#C0C0C0", "#FFC0CB", "#F5DEB3", "#FFFACD", "#98FB98",
                                 "#AFEEEE", "#ADD8E6", "#DDA0DD", "#FFFFFF");

    document.write("<div class=\"toolbar\">\n" +
                   "  <div style=\"float: left;\">\n" +
                   "    <img class=\"button\" src=\"" + url + "/removeformat." + end + "\" name=\"btnBold\" title=\"Formatierung entfernen\" onClick=\"doRemoveTags('" + obj + "')\" \/>\n" +
                   "    <img src=\"" + url + "/separator.gif\" \/>\n" +
                   "  </div>\n" +

                   "  <div style=\"float: left;\">\n" +
                   "    <div style=\"padding:2px; float:left;\">Schriftart</div>\n" +
                   "    <div style=\"float:left;\"><img class=\"button\" src=\"" + url + "/menupop." + end + "\" id=\"popFont\" onClick=\"showpopup('font','popFont')\" \/></div>\n" +
                   "    <div style=\"padding:2px; float:left;\">Gr&ouml;&szlig;e</div>\n" +
                   "    <div style=\"float:left;\"><img class=\"button\" src=\"" + url + "/menupop." + end + "\" id=\"popSize\" onClick=\"showpopup('size','popSize')\" \/></div>\n" +
                   "    <img src=\"" + url + "/separator.gif\" \/>\n" +
                   "  </div>\n" +

                   "  <div style=\"float: left;\">\n" +
                   "    <img class=\"button\" src=\"" + url + "/bold." + end + "\" name=\"btnBold\" title=\"Fett\" onClick=\"doAddTags('[b]','[/b]','" + obj + "')\" \/>\n" +
                   "    <img class=\"button\" src=\"" + url + "/italic." + end + "\" name=\"btnItalic\" title=\"Kursiv\" onClick=\"doAddTags('[i]','[/i]','" + obj + "')\" \/>\n" +
                   "    <img class=\"button\" src=\"" + url + "/underline." + end + "\" name=\"btnUnderline\" title=\"Unterstrichen\" onClick=\"doAddTags('[u]','[/u]','" + obj + "')\" \/>\n");

    if (full == 'yes')
    {
        document.write("    <img class=\"button\" src=\"" + url + "/pre." + end + "\" name=\"btnPre\" title=\"Blockschrift\" onClick=\"doAddTags('[pre]','[/pre]','" + obj + "')\" \/>\n");
    }

    document.write("    <img src=\"" + url + "/separator.gif\" \/>\n" +
                   "  </div>\n" +

                   "  <div style=\"float: left;\">\n" +
                   "    <div style=\"float:left;\"><img class=\"button\" src=\"" + url + "/color." + end + "\" id=\"popColor\" title=\"Textfarbe\" onClick=\"showpopup('color','popColor')\" \/></div>\n" +
                   "    <div style=\"float:left;\"><img class=\"button\" src=\"" + url + "/menupop." + end + "\" id=\"popFont\" onClick=\"showpopup('color','popColor')\" \/></div>\n" +
                   "    <img src=\"" + url + "/separator.gif\" \/>\n" +
                   "  </div>\n" +

                   "  <div style=\"float: left;\">\n");

    if (full == 'yes')
    {
        document.write("    <img class=\"button\" src=\"" + url + "/center." + end + "\" name=\"btnLink\" title=\"zentriert\" onClick=\"doAddTags('[center]','[/center]','" + obj + "')\" \/>\n");
    }

    document.write("    <img class=\"button\" src=\"" + url + "/link." + end + "\" name=\"btnLink\" title=\"URL Link\" onClick=\"doURL('" + obj + "')\" \/>\n" +
                   "    <img class=\"button\" src=\"" + url + "/unlink." + end + "\" name=\"btnunLink\" title=\"Links entfernen\" onClick=\"doRemoveURL('" + obj + "')\" \/>\n" +
                   "    <img class=\"button\" src=\"" + url + "/image." + end + "\" name=\"btnPicture\" title=\"Bild\" onClick=\"doImage('" + obj + "')\" />\n");

    if (full == 'yes')
    {
        document.write("    <img src=\"" + url + "/separator.gif\" \/>\n" +
                       "    <img class=\"button\" src=\"" + url + "/orderedlist." + end + "\" name=\"btnList\" title=\"nummerierte Liste\" onClick=\"doList('[list=1]','[/list]','" + obj + "')\" \/>\n" +
                       "    <img class=\"button\" src=\"" + url + "/unorderedlist." + end + "\" name=\"btnList\" title=\"normale Liste\" onClick=\"doList('[list]','[/list]','" + obj + "')\" \/>\n" +
                       "    <img src=\"" + url + "/separator.gif\" \/>\n" +
                       "    <img class=\"button\" src=\"" + url + "/quote." + end + "\" name=\"btnQuote\" title=\"Zitat\" onClick=\"doAddTags('[quote]','[/quote]','" + obj + "')\" \/>\n" +
                       "    <img src=\"" + url + "/separator.gif\" \/>\n" +
                       "    <img class=\"button\" src=\"" + url + "/smilie." + end + "\" name=\"btnSmilie\" title=\"Smileys anzeigen/ausblenden\" onClick=\"doViewSmilie('smiliebar')\" \/>\n");
    }

    document.write("    <img src=\"" + url + "/separator.gif\" \/>\n" +
                   "    <img class=\"button\" src=\"" + url + "/help." + end + "\" name=\"btnhelp\" title=\"Hilfe\" onClick=\"doHelp()\" \/>\n" +
                   "  </div>\n" +
                   "</div>\n" +
                   "<br style=\"clear: left;\" />\n");

    document.write("<div id=\"font\" style=\"display: none; z-index: 100; border: 1px solid black; overflow: auto; width: 120px; height: 120px;\">\n");
    for (var i = 0; i < fontoptions.length; i++)
    {
        document.write("  <div class=\"button\" style=\"font-family:'" + fontoptions[i] + "'; color: #000000;\" onClick=\"doSetFont('" + fontoptions[i] + "','" + obj + "')\">" + fontoptions[i] + "</div>\n");
    }
    document.write("</div>\n");

    document.write("<div id=\"size\" style=\"display: none; z-index: 100; border: 1px solid black; text-align: center;\">\n");
    for (var i = 0; i < sizeoptions.length; i++)
    {
        document.write("  <font class=\"button\" size=\"" + sizeoptions[i] + "\" color=\"#000000\" onClick=\"doSetSize('" + sizeoptions[i] + "','" + obj + "')\">" + sizeoptions[i] + "</font><br \/>\n");
    }
    document.write("</div>\n");

    document.write("<div id=\"color\" style=\"display: none; z-index: 100; border: 1px solid black; text-align: center;\">\n");
    for (var i = 0; i < coloroptions.length; i++)
    {
        if ( (i % 8 == 0) && (i != 0) )
        {
            document.write("  <br style=\"clear: left;\" />\n");
        }

        document.write("  <div class=\"button\" style=\"background-color: " + coloroptions[i] + "; width: 15px; height: 15px; float: left;\" onClick=\"doSetColor('" + coloroptions[i] + "','" + obj + "')\"></div>\n");

    }
    document.write("</div>\n");

    document.write("<div id=\"bbcode\" style=\"display: none; z-index: 200; overflow: auto;\">\n");
    document.write("</div>\n");
}

function edSmilye(obj, url, anz)
{
    anz = parseInt(anz);
    document.write("<div class=\"smiliebar\" id=\"smiliebar\" style=\"float: left;\">\n");

    for (var i = 0; i < smilieliste.length; i++)
    {
        var einzel = smilieliste[i];
        var code   = einzel.code;
        var bild   = einzel.bild;

        if ( (i % anz == 0) && (i != 0) )
        {
            document.write("  <br style=\"clear: left;\" />\n");
        }

        document.write("  <div style=\"float:left; text-align:center; width:30px; height:30px;\"><img class=\"button\" src=\"" + url + "/" + bild + "\" name=\"\" title=\"" + code + "\" onClick=\"doAddTags('" + code + "','','" + obj + "')\" \/></div>\n");
    }
    document.write("</div>\n");
}

function doViewSmilie(div)
{
    var box = document.getElementById(div);

    if (box.style.display == "none")
    {
        box.style.display = "inline";
    }
    else
    {
        box.style.display = "none";
    }
}

function doRemoveTags(obj)
{
    textarea = document.getElementById(obj);
    var txt = textarea.value;
    var simpel_strip  = new Array('b', 'i', 'u', 'center', 'pre', 'quote');
    var complex_strip = new Array('font', 'color', 'size');
    var tag;

    // Einfache Tags entfernen \\
    for (tag in simpel_strip)
    {
        var opentag    = '['  + simpel_strip[tag] + ']';
        var closetag   = '[/' + simpel_strip[tag] + ']';
        var stopindex  = 0;
        var startindex = 0;

        if (typeof iterations == 'undefined')
        {
            var iterations = -1;
        }

        while ((startindex = stripos(txt, opentag)) !== false && iterations != 0)
        {
            iterations --;
            if ((stopindex = stripos(txt, closetag)) !== false)
            {
                var text = txt.substr(startindex + opentag.length, stopindex - startindex - opentag.length);
                txt = txt.substr(0, startindex) + text + txt.substr(stopindex + closetag.length);
            }
            else
            {
                break;
            }
        }
    }

    // komplexe Tags mit Parametern entfernen \\
    for (tag in complex_strip)
    {
        var opentag    = '['  + complex_strip[tag] + '=';
        var closetag   = '[/' + complex_strip[tag] + ']';
        var stopindex  = 0;
        var startindex = 0;

        if (typeof iterations == 'undefined')
        {
            var iterations = -1;
        }

        while ((startindex = stripos(txt, opentag)) !== false && iterations != 0)
        {
            iterations --;
            if ((stopindex = stripos(txt, closetag)) !== false)
            {
                var openend = stripos(txt, ']', startindex);
                if (openend !== false && openend > startindex && openend < stopindex)
                {
                    var text = txt.substr(openend + 1, stopindex - openend - 1);
                    txt = txt.substr(0, startindex) + text + txt.substr(stopindex + closetag.length);
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }
        }
    }

    // Bereinigten Code zurückgeben \\
    textarea.value = txt;
}

function doRemoveURL(obj)
{
    textarea = document.getElementById(obj);

    var txt        = textarea.value;
    var opentag    = '[url=';
    var closetag   = '[/url]';
    var stopindex  = 0;
    var startindex = 0;

    if (typeof iterations == 'undefined')
    {
        var iterations = -1;
    }

    while ((startindex = stripos(txt, opentag)) !== false && iterations != 0)
    {
        iterations --;
        if ((stopindex = stripos(txt, closetag)) !== false)
        {
            var openend = stripos(txt, ']', startindex);
            if (openend !== false && openend > startindex && openend < stopindex)
            {
                var text = txt.substr(openend + 1, stopindex - openend - 1);
                txt = txt.substr(0, startindex) + text + txt.substr(stopindex + closetag.length);
            }
            else
            {
                break;
            }
        }
        else
        {
            break;
        }
    }

    var opentag    = '[url]';
    var closetag   = '[/url]';
    var stopindex  = 0;
    var startindex = 0;

    if (typeof iterations == 'undefined')
    {
        var iterations = -1;
    }

    while ((startindex = stripos(txt, opentag)) !== false && iterations != 0)
    {
        iterations --;
        if ((stopindex = stripos(txt, closetag)) !== false)
        {
            var text = txt.substr(startindex + opentag.length, stopindex - startindex - opentag.length);
            txt = txt.substr(0, startindex) + text + txt.substr(stopindex + closetag.length);
        }
        else
        {
            break;
        }
    }

    textarea.value = txt;
}

function doImage(obj)
{
    textarea = document.getElementById(obj);
    var url = prompt('Bitte Bild-URL angeben:','http://');
    var scrollTop = textarea.scrollTop;
    var scrollLeft = textarea.scrollLeft;

    if (url != '' && url != null)
    {
        if (document.selection)
        {
            textarea.focus();
            var sel = document.selection.createRange();
            sel.text = '[img]' + url + '[/img]';
        }
        else
        {
            var len = textarea.value.length;
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            var sel = textarea.value.substring(start, end);
            var rep = '[img]' + url + '[/img]';

            textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
        }
    }
}

function doURL(obj)
{
    textarea = document.getElementById(obj);
    var url = prompt('Bitte eine URL angeben:','http://');
    var scrollTop = textarea.scrollTop;
    var scrollLeft = textarea.scrollLeft;

    if (url != '' && url != null)
    {
        if (document.selection)
        {
            textarea.focus();
            var sel = document.selection.createRange();

            if(sel.text=="")
            {
                sel.text = '[url]'  + url + '[/url]';
            }
            else
            {
                sel.text = '[url=' + url + ']' + sel.text + '[/url]';
            }
        }
        else
        {
            var len = textarea.value.length;
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            var sel = textarea.value.substring(start, end);

            if(sel=="")
            {
                var rep = '[url]' + url + '[/url]';
            }
            else
            {
                var rep = '[url=' + url + ']' + sel + '[/url]';
            }

            textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
        }
    }
}

function doAddTags(tag1,tag2,obj)
{
    textarea = document.getElementById(obj);

    if (document.selection)
    {
        // Code for IE
        textarea.focus();
        var sel = document.selection.createRange();
        sel.text = tag1 + sel.text + tag2;
    }
    else
    {
        // Code for Mozilla Firefox
        var len = textarea.value.length;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var scrollTop = textarea.scrollTop;
        var scrollLeft = textarea.scrollLeft;
        var sel = textarea.value.substring(start, end);
        var rep = tag1 + sel + tag2;

        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
        textarea.scrollTop = scrollTop;
        textarea.scrollLeft = scrollLeft;
    }
}

function doSetSize(size,obj)
{
    textarea = document.getElementById(obj);
    size     = parseInt(size);

    if (document.selection)
    {
        // Code for IE
        textarea.focus();
        var sel = document.selection.createRange();
        sel.text = "[size=" + size + "]" + sel.text + "[/size]";
    }
    else
    {
        // Code for Mozilla Firefox
        var len = textarea.value.length;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var scrollTop = textarea.scrollTop;
        var scrollLeft = textarea.scrollLeft;
        var sel = textarea.value.substring(start, end);
        var rep = "[size=" + size + "]" + sel + "[/size]";

        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
        textarea.scrollTop = scrollTop;
        textarea.scrollLeft = scrollLeft;
    }

    document.getElementById("size").style.display = "none";
}

function doSetFont(font,obj)
{
    textarea = document.getElementById(obj);

    if (document.selection)
    {
        // Code for IE
        textarea.focus();
        var sel = document.selection.createRange();
        sel.text = "[font=" + font + "]" + sel.text + "[/font]";
    }
    else
    {
        // Code for Mozilla Firefox
        var len = textarea.value.length;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var scrollTop = textarea.scrollTop;
        var scrollLeft = textarea.scrollLeft;
        var sel = textarea.value.substring(start, end);
        var rep = "[font=" + font + "]" + sel + "[/font]";

        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
        textarea.scrollTop = scrollTop;
        textarea.scrollLeft = scrollLeft;
    }

    document.getElementById("font").style.display = "none";
}

function doSetColor(color,obj)
{
    textarea = document.getElementById(obj);

    if (document.selection)
    {
        // Code for IE
        textarea.focus();
        var sel = document.selection.createRange();
        sel.text = "[color=" + color + "]" + sel.text + "[/color]";
    }
    else
    {
        // Code for Mozilla Firefox
        var len = textarea.value.length;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var scrollTop = textarea.scrollTop;
        var scrollLeft = textarea.scrollLeft;
        var sel = textarea.value.substring(start, end);
        var rep = "[color=" + color + "]" + sel + "[/color]";

        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
        textarea.scrollTop = scrollTop;
        textarea.scrollLeft = scrollLeft;
    }

    document.getElementById("color").style.display = "none";
}

function doList(tag1,tag2,obj)
{
    textarea = document.getElementById(obj);

    if (document.selection)
    {
        // Code for IE
        textarea.focus();
        var sel = document.selection.createRange();
        var list = sel.text.split('\n');

        for(var i = 0; i < list.length; i++)
        {
           list[i] = '[*]' + list[i];
        }
        sel.text = tag1 + '\n' + list.join("\n") + '\n' + tag2;
    }
    else
    {
        // Code for Firefox
        var len = textarea.value.length;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var scrollTop = textarea.scrollTop;
        var scrollLeft = textarea.scrollLeft;
        var sel = textarea.value.substring(start, end);
        var list = sel.split('\n');

        for(var i = 0; i < list.length; i++)
        {
            list[i] = '[*]' + list[i];
        }

        var rep = tag1 + '\n' + list.join("\n") + '\n' +tag2;

        textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
        textarea.scrollTop = scrollTop;
        textarea.scrollLeft = scrollLeft;
    }
}

function stripos ( f_haystack, f_needle, f_offset )
{
    var haystack = (f_haystack + '').toLowerCase();
    var needle   = (f_needle   + '').toLowerCase();
    var index    = 0;

    if ((index = haystack.indexOf(needle, f_offset)) !== -1)
    {
        return index;
    }
    return false;
}

function showpopup(div, wer)
{
    var menu   = document.getElementById(div);
    var sender = document.getElementById(wer);

    if (menu.style.display == "none")
    {
        var pos  = getPosition(sender);

        if (wer == "popFont")
        {
            menu.style.left = (pos.x - 58) + "px";
        }
        else if (wer == "popColor")
        {
            menu.style.left = pos.x + "px";
        }
        else
        {
            menu.style.left = (pos.x - 40) + "px";
        }

        menu.style.top             = (pos.y + 17) + "px";
        menu.style.backgroundColor = "#FFFFFF";
        menu.style.padding         = "3px";
        menu.style.position        = "absolute";
        menu.style.display         = "inline";
    }
    else
    {
        menu.style.display = "none";
    }
}

function getPosition(was)
{
    var div     = was;
    var tagname = "";
    var x       = 0;
    var y       = 0;

    while ((typeof(div) == "object") && (typeof(div.tagName) != "undefined"))
    {
      var tagname = div.tagName.toUpperCase();
      y += div.offsetTop;
      x += div.offsetLeft;

     if (tagname == "BODY")
      {
          div = 0;
      }

      if (typeof(div) == "object")
      {
          if (typeof(div.offsetParent) == "object")
          {
              div = div.offsetParent;
          }
      }

    }

    var position = new Object();
    position.x = x;
    position.y = y;

    return position;
}

function doHelp()
{
    var popup     = document.getElementById('bbcode');
    var divwidth  = 800;
    var divheight = 700;
    var scrolly   = Ywindow();
    var setX      = ( window.innerWidth - divwidth  ) / 2;
    var setY      = ( window.innerHeight - divheight ) / 2 + scrolly;

    ajax_nv('6', '0');

    setX = ( setX < 0 ) ? 0 : setX;
    setY = ( setY < 0 ) ? 0 : setY;

    popup.style.padding         = "3px";
    popup.style.width           = divwidth + "px";
    popup.style.height          = divheight + "px";
    popup.style.left            = setX + "px";
    popup.style.top             = setY + "px";
    popup.style.backgroundColor = "#000000";
    popup.style.position        = "absolute";
    popup.style.display         = "block";

}

function Ywindow()
{
    var scrollY = 0;
    if ( document.documentElement && document.documentElement.scrollTop )
    {
        scrollY = document.documentElement.scrollTop;
    }
    else if ( document.body && document.body.scrollTop )
    {
        scrollY = document.body.scrollTop;
    }
    else if ( window.pageYOffset )
    {
        scrollY = window.pageYOffset;
    }
    else if ( window.scrollY )
    {
        scrollY = window.scrollY;
    }
    return scrollY;
}

function doHideHelp()
{
    var popup = document.getElementById('bbcode');

    popup.innerHTML     = "";
    popup.style.display = "none";
}