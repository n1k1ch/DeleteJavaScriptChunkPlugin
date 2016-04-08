require('./css/app.scss');
require('./modernizr');

if(Modernizr.cssresize ) {
    // yes, we can "require('./css/non-ie.scss');" here, and additional JavaScript won'te be put to output directory, so, we don't need to delete it and use DeleteJavaScriptChunkPlugin at all
    // But for demo purposes i am building "non-ie.css" as an entry
    // Use case: "jar" module with frontend files, which are including to several "war"s, who use this "jar".
    // Not all the "war"s need "non-ie.css".
    // So, we can build "non-ie.css", include it into "jar" library and use from the "war"
    // TODO: create example project with "jar" and "war"
    // require('./css/non-ie.scss');

    var txtArea = document.querySelector('.cssresize textarea');

    if(Modernizr.placeholder) {
        txtArea.setAttribute('placeholder', "Resize Me");
    }

    var body = document.getElementsByTagName('body')[0];

    txtArea.setAttribute('data-height', txtArea.offsetHeight)

    txtArea.addEventListener('mouseup', function(e) {
        var tgt = e.currentTarget;
        var oldHeight = tgt.getAttribute('data-height');
        var h = tgt.offsetHeight;

        if(h != oldHeight) {
            console.log('resized to ' + h);
            tgt.setAttribute('data-height', tgt.offsetHeight);
            var col = h % 255;

            body.style.backgroundColor = 'rgb(0, ' + h % 255 + ', 0)';

            if(col < 128) {
                body.style.color = '#fff';
            } else {
                body.style.color = '#000';
            }
        }
    });
} else {
    console.log('Resize is not supported, please, download normal browser');
}