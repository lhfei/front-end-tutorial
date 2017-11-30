
// 预测、优化、仿真平台页面调用
$(function () {
    // 二级导航高亮
	$('.submenu .wrapper a').each(function () {
		$(this).on('click', function () {
			$(this).addClass('on')
			$(this).siblings().removeClass('on')
		})
	})
    // tab切换
	const tabs = function (tab, con) {
		tab.hover(function () {
			const index = tab.index(this)
			tab.removeClass('on')
			$(this).addClass('on')
			con.hide()
			con.eq(index).show()
		})
	}
	$(function () {
		tabs($('.lefmenu li'), $('.showbox .content'))
	})
    // 滑动滚动条
	$(window).scroll(function () {
        // 滚动条距离顶部的距离 大于 280px时
		if ($(window).scrollTop() >= 280) {
			$('#tryBtn').fadeIn(1000) // 开始淡入
		}
		else {
			$('#tryBtn').stop(true, true).fadeOut(1000) // 如果小于等于 200 淡出
		}
	})
})
