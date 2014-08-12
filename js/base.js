var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
var $introContainer;
var $introNavs;
var IntroPageAnimationScrollOffset = 40;
var introPageAnimating = false;
var introPageCount;
jQuery(document).ready(function($){
                       $introContainer = $('#intro-container');
                       afterResize();
                       $(window).resize(afterResize);
                       initIntro();
                       
});

var initIntro = function(){
    if($introContainer.length){
        $('body').css('overflow','hidden');
        $introContainer.on('mousewheel', introWheel);
        introPageCount = $introContainer.children('.intro-slide').length;
        $introNavs = $('#intro-nav-container li');
        $introNavs.on('click', introNavClick);
    }
}

var introNavClick = function(){
    $btn = $(this);
    var page = $introNavs.index($btn);
    if(page != getCurrentIntroPage()){
        setCurrentIntroPage(page);
    }
}

var introWheel = function(event){
    var deltaY = event.deltaY;
    if(deltaY > -10 && deltaY < 10){
        introPageAnimating = false;
    }
    if(introPageAnimating){
        return false;
    }
    if(deltaY > IntroPageAnimationScrollOffset){
        introPageAnimating = true;
        var currentPage = getCurrentIntroPage();
        if(currentPage >= 1){
            setCurrentIntroPage(currentPage - 1);
        }
        
    }else if(deltaY < (0 - IntroPageAnimationScrollOffset)){
        introPageAnimating = true;
        var currentPage = getCurrentIntroPage();
        if(currentPage <= (introPageCount - 2)){
            setCurrentIntroPage(currentPage + 1);
        }
    }
    return false;
}

var getCurrentIntroPage = function(){
    var transform = $introContainer.css('transform');
    if(transform == 'none'){
        return 0;
    }
    var elements = transform.split(',');
    var offset = elements[elements.length - 1].replace(')','');
    var page = -offset/$(window).height();
    page = Math.ceil(page);
    return page;
}

var setCurrentIntroPage = function(page){
    page = Math.ceil(page);
    var transform = 'translate3d(0px, -' + page +'00%, 0px)';
    $introContainer.css('transform', transform);
    $introContainer.css('-webkit-transform', transform);
    for(var i = 0; i < $introNavs.length; i++){
        var $n = $($introNavs.get(i));
        if(i == page){
            $n.addClass('current');
        }else{
            $n.removeClass('current');
        }
    }
}

var afterResize = function(){
    if($introContainer.length){
        $introContainer.height($(window).height());
    }
}
