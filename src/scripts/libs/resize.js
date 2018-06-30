(function (win) {
	var docEl = document.documentElement;
	var fontEl = document.createElement('style');

	// ios
	var docWidth = docEl.clientWidth;

	function setUnitA() {
		var docWidth = docEl.clientWidth;
		var extraStyle = '}';

		//如果是pc pc上宽度一般是1024以上 ipad的分辨率宽度1024 ipad就让其满屏显示 其余pc上显示640居中
		if (!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && docWidth > 1024) {
			docWidth = 640;
			//仅pc下body为640 且居中
			extraStyle = ';max-width:' + docWidth + 'px;margin-right:auto!important;margin-left:auto!important;}';
		}

		win.rem = docWidth / 10;

		//ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
		//老机器bug rem计算不是标准=html fontsize
		if (/ZTE U930_TD/.test(navigator.userAgent)) {
			win.rem = win.rem * 1.13;
		}

		//魅族 M351对应实验室的E6机器
		//Mozilla/5.0(Linux; Android 4.4.4; M351 Build/KTU84p) AppleWebKit/537.36(KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 AliApp(TB/5.2.7.2) WindVane/6.4.0 1080X1800 GCanvas/1.4.2.17
		if (/M351 /.test(navigator.userAgent)) {
			win.rem = win.rem / 1.05;
		}

		fontEl.innerHTML = 'html{font-size:' + win.rem + 'px!important;}body{font-size:' + 12 * (docWidth / 320) + 'px' + extraStyle;
	}

	docEl.firstElementChild.appendChild(fontEl);

	win.addEventListener('resize', function () {
		setUnitA();
	}, false);


	win.addEventListener('pageshow', function (e) {
		if (e.persisted) {
			setUnitA();
		}
	}, false);

	setUnitA();

})(window);