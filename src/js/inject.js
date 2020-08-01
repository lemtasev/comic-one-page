
function refreshThisPage(obj) {
    let id = $(obj).parent().attr('id');
    let url = $(obj).parent().find('input').val();
	console.log('refreshThisPage', url)
	
	$.ajax({
		type: "GET",
		url: url,
		success: function(data){
			let src = $(data).find('#ComicPic').attr('src');
			if (!src) {
				// getImg(url, id, ++times);
			}else{
				$('#' + id + ' > .refresh-btn').hide();
				$('#' + id + ' > .hidden-url').hide();
				$('#' + id + ' > img').attr('src', src);	
			}
		}
	});
	
	
    // $.get(url).done(function (data) {
        // let src = $(data).find('#ComicPic').attr('src');
		// if (!src) {
			
		// }else{
			// $('#' + id + ' > .refresh-btn').hide();
			// $('#' + id + ' > .hidden-url').hide();
			// $('#' + id + ' > img').attr('src', src);	
		// }
    // })
}

function refreshImg(obj) {
	let id = $(obj).parent().attr('id');
	let src = $('#' + id + ' > img').attr('src');
	console.log('refreshImg', src)
	$('#' + id + ' > img').attr('src', src);	
}