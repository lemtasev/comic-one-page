console.log("popup.js is loaded");
// document.getElementsByTagId('show').html = 'running';
// document.getElementById("nowTime").style.color = "#ff0000";

document.getElementById('clickBtn').onclick = () => {
	alert('getElementById')
};

$('#clickBtn').on('click', function(){
	alert('测试');
});

function clickFn(){
	alert("clickFn is running");
}
