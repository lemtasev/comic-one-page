console.log("myScript is running");
$(function () {
    injectCustomJs();
    console.log("$(function (){});");

    // https://www.k886.net/index-look-name-%E6%9A%97%E6%AE%BA%E6%95%99%E5%AE%A4-cid-24741-id-167832-p-1
    console.log('window.location:', window.location);
    let hrefNoPage = window.location.href.replace(/-p-[0-9]*/i, '');
    console.log('hrefNoPage:', hrefNoPage);

    let total = $('#total').val();
    let id = $('#id').val();
    let cid = $('#cid').val();
    console.log('cid:', cid);
    console.log('id:', id);
    console.log('pos:', $('#pos').val());
    console.log('total:', total);

    if (!id || !cid || !total) {
        return
    }
	$('body').css('background-color', 'black').css('height', 'auto') // 关灯
	let comicInfoHtml = $('.b').html();

	let preHref = $('.c > .p.zhangjie').attr('href');
    let nextHref = $('.c > .n.zhangjie').attr('href');

	let operationHtml = 
		'<div class="operation-line">' +
		(preHref ? '<a href="'+preHref+'">上一章</a>' : '<span></span>') +
		(nextHref ? '<a href="'+nextHref+'">下一章</a>' : '<span></span>') +
        '</div>';
	
    let cusHtml = 
		'<div class="cus-header">' + 
			'<div class="comic-info">'+comicInfoHtml+'</div>' +
			'<div id="page-nav"></div>' +
			operationHtml + 
		'</div>' + 
        '<div id="cus-html-content"></div>' +
        operationHtml;

    $('body').html(cusHtml);
	
	let navHtml = ''

    for (let i = 1; i <= total; i++) {
        let url = hrefNoPage + '-p-' + i;
        let id = 'cusHtmlBox-' + i;
        let cusHtmlBox =
            '<div id="' + id + '" class="cusHtmlBox">' +
            '   <span class="page-index" onclick="refreshImg(this)" title="重新加载图片">' + i + '</span>' +
            '   <button class="refresh-btn" type="button" onclick="refreshThisPage(this)" title="刷新本页">刷新</button>' +
			'   <input class="hidden-url" value="' + url + '"/>' +
            '   <img src=""/>' +
            '</div>';
        $('#cus-html-content').append(cusHtmlBox);
		let navHtml = '<a href="#'+id+'">'+i+'</a>'
		$('#page-nav').append(navHtml);
        setTimeout(() => {
			getImg(url, id);
		}, (i - 1) * 500)
    }
});

function getImg(url, id, times){
	times = times | 1
	if (times > 5) {
		$('#' + id + ' > .refresh-btn').show();
		$('#' + id + ' > .hidden-url').show();
		return
	}
	$.get(url).done(function (data) {
		let src = $(data).find('#ComicPic').attr('src');
		if (!src) {
			getImg(url, id, ++times);
		}else{
			$('#' + id + ' > img').attr('src', src);	
		}
	})
}

// 向页面注入JS
function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function()
    {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}

