jQuery(function($){
    $(document).ready(function(){

        /* 풀페이지 설정 */

        $('#fullpage').fullpage({
            verticalCentered: true,
            anchors:['intro', 'tableInfo', 'tableSearch', 'end', 'footer'],
            // scrollOverflow: true,
            onLeave: function(origin, destination, direction, trigger){
                // 띠 배너 토글
                if(origin == 1 && direction == 'down'){
                    $('.hd-area .vertical-rolling').addClass('hide');
                } else if (origin == 2 && direction == "up"){
                    $('.hd-area .vertical-rolling').removeClass('hide');
                }
                // 맞춤 식탁 nav 토글
                if(origin == 1 && direction == 'down'){
                    $('.recommend-tab').addClass('active');
                    // 클릭 없이 스크롤을 내렸을 경우 첫번째 탭 활성화
                    var clickCheck = $('.recommend-tab .dep1-con').hasClass('active');
                    if(!clickCheck){
                        $('.recommend-tab .dep1-con').eq(0).addClass('active');
                    }
                } else if (origin == 2 && direction == "up"){
                    $('.recommend-tab').removeClass('active');
                    $('.recommend-personal .type-list-area .list-con').removeClass('active');
                }
            }


        });

        // 추천 식탁 자세히 알아보기 슬라이드
        var recommendTableInfoSwiper = new Swiper(".info-slide .slide-area", {
            speed: 0
        });

        // 딱 맞는 식탁 슬라이드
        var recommendSearchSwiper = new Swiper(".search-slide .slide-area", {
            speed: 0
        });

        $('.recommend-tab .dep1, .recommend-personal .type-list-area .list-inner').click(function(){
            var tmp = $(this).parent().index();
            recommendTableInfoSwiper.slideTo(tmp, 0);
            recommendSearchSwiper.slideTo(tmp, 0);
            $('.recommend-tab .dep1-con').eq(tmp).addClass('active').siblings().removeClass('active');
            $('.recommend-personal .type-list-area .list-con').eq(tmp).addClass('active').siblings().removeClass('active');
        });
    });
})