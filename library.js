(function($){
	$.fn.rollOver = function(option){
		var opt = $.extend({
			on : "_on",
			act : "_act",
			now : ""
		}, option);
		return this.each(function() {
			var t = $(this),
			s = t.attr("src"),
			o = s.replace(/(\..+)$/,opt.on+"$1"),
			a = s.replace(/(\..+)$/,opt.act+"$1");
			if(t.hasClass(opt.now)){
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































