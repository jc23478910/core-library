/*----------------------------------
  ロールオーバー
----------------------------------*/
;(function($){
	$.fn.core_rollOver = function(option){
		/*オプション
		---------------------------*/
		var opt = $.extend({
			on : "_on",  //マウスがのった時
			act : "_act",//アクティブな時
			now : null   //アクティブにするクラス名
		}, option);

		/*実際の処理
		---------------------------*/
		return this.each(function() {
			var t = $(this),
			s = t.attr("src"),
			o = s.replace(/(\..+)$/,opt.on+"$1"),
			a = s.replace(/(\..+)$/,opt.act+"$1");
			if(t.hasClass(opt.now)) {
				t.attr("src",a);
			}else{
				t.hover(function(){
					t.attr("src",o);
				},function(){
					t.attr("src",s);
				});
			}
		});
	}
})(jQuery);





/*----------------------------------
  バリデーション
----------------------------------*/
;(function($){
	$.fn.core_validation = function(option){
		var
		valiClass = "core_vali",
		errClass = "core_err",
		rules = [
			'required',
			'max_20',
			'min'
		]

		//optionの読み込み
		var opt = $.extend({
			loadCloudCss : false
		}, option);

		//headにcssを埋め込む
		if(opt.loadCloudCss){
			$("head").append('<link rel="stylesheet" type="text/css" href="library.css">');
		}
		elm = [
			'input[type="text"]',
			'input[type="radio"]',
			'input[type="checkbox"]',
			'input[type="hidden"]',
			'input[type="search"]',
			'input[type="tel"]',
			'input[type="url"]',
			'input[type="email"]',
			'input[type="password"]',
			'input[type="datetime"]',
			'input[type="date"]',
			'input[type="month"]',
			'input[type="week"]',
			'input[type="tmie"]',
			'input[type="datetime-local"]',
			'input[type="number"]',
			'input[type="range"]',
			'input[type="color"]',
			'input[type="file"]',
			'textarea',
			'select'
		];

		elm = $(elm.join(","));
		//rules = rules.join(",");
		//console.log(rules);

		/*実際の処理
		---------------------------*/
		return elm.each(function() {
			var t = $(this);
			var tClass = t.attr("class");
			if(tClass != undefined && tClass.indexOf(' ')) { //クラスがあり、かつ、複数あるとき
				tClass = tClass.split(' ');
			}else {
				tClass = [tClass];
			}

			Array.prototype.contains = function(value) {
				for(var i in this) {
					if( this.hasOwnProperty(i) && this[i] === value) {
						return true;
					}
				}
				return false;
			}


			console.log(tClass.contains('required'));

			t.wrap('<div class="' + valiClass + '"></div>');

			//フォーカス時に指定時間後にエラーを消去
			t.focus(function(){
			});

			//フォーカスが外れたあと、少しおいてバリデーションの実行
			t.blur(function(){
				setTimeout(
					function(){
						doValidation(t)
					},300,t);
			});

			//バリデーションの実行
			function doValidation (target){
				for(var i = 0; i <= tClass.length; i++){
					var condintion = tClass[i];
					switch (condintion) {
						case rules[0]:
						break;
					}
				}
				msg = "エラーです";
				errorShow(target , msg);
			}

			//必須かどうかのチェック
			function requiredCheck () {
			}

			//エラーを表示
			function errorShow (target ,msg , fadeTime) {
				target.next("." + errClass).remove();
				//fadeTimeのデフォルト値を設定
				if(typeof fadeTime === 'undefined') fadeTime = 300;
				target.after('<div class="' + errClass + '">' + msg +'</div>')
				target.next("." + errClass).fadeIn(fadeTime);
			}

			//エラーを非表示
			function errorHide (target , fadeTime) {
				if(typeof fadeTime === 'undefined') fadeTime = 300;
				target.fadeOut(fadeTime);
			}
		});
	}
})(jQuery);

























$.fn.pageScrollList = function(option){
	var $this = this;
	var $thiId = $this.attr("id");

	$this.append('<ul id="addLinkArea"></ul>');
	$addLinkArea = $("#addLinkArea");
	$addLinkArea.css({
		'position':'absolute',
		'display':'none',
		'width':'190px',
		'background':'#EDEDE9',
		'list-style':'none'
	});

	var $i = 0;
	var $scrollPointId = [];
	$(".scrollPoint").each(function(){
		$scrollPoint = $(this);
		var $pointhead = '<li class="addLink">'+$scrollPoint.text()+'</li>';
		$addLinkArea.append($pointhead);
		$scrollPointId[$i] = '#'+$scrollPoint.attr('id')
		$i++;
	});

	$scroll = $.fn.smoothScroll();
	$('.addLink').click(function(){
		$num = $(this).index();
		$scroll.scrollToElement($scrollPointId[$num]);
	});

	$this.hover(function(e){
		$x = e.pageX;
		$y = e.pageY;
		$height = $addLinkArea.height();
		$addLinkArea.css({
			"top":$y-$height+'px',
			"left":$x+'px'
		}).stop(true,true).fadeIn(300);
	},function(){
		$addLinkArea.stop(true,true).fadeOut(300);
	});
}































