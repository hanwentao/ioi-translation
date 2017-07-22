
// Initilize Makrded.js Renderer

var renderer = new marked.Renderer();
var original_table_renderer = renderer.table;
var IMAGES_URL;


// enable resize option for images
renderer.image = function(href, title, text) {
    var style = '';
    var images_folder = '';
    if (href.indexOf('/') < 0 && typeof IMAGES_URL !== 'undefined')
        images_folder = IMAGES_URL;
    if (title) {
        size = title.split('x');
        if (size[1])
            style = 'width: ' + size[0] + 'px; height: ' + size[1] + 'px;';
        else
            style = 'width: ' + size[0] + 'px;';
    }
    return ('<img src="' + images_folder + href + '" alt="' + text + '" style="' + style + '">');
};

// remove trailing newline in code blocks
renderer.code = function(code, language) {
    return ('<pre><code>' + code + '</code></pre>');
};

// render ltr tables (started with %ltr%)
renderer.table = function(header, body) {
    var html = '';
    if (header.search('%ltr%') < 0) {
        html = original_table_renderer(header, body);
    }
    else {
        header = header.replace('%ltr%', '');
        html = '<div dir="ltr">' + original_table_renderer(header, body) + '</div>';
    }
    return html;
}

// global options
marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
