$(document).ready(function(){

	var mql = window.matchMedia("screen and (max-width: 900px)");

    if(mql.matches) {	
        //console.log('mo 입니다.');
		setTimeout(function() { 
			$('#sh_map_item').contents().find(".store_layer").addClass('on');
		},1000);
		//$('#sh_map_item').contents().find(".store_layer").addClass('on');
    } else {
        //console.log('pc 입니다.');
		$('#sh_map_item').contents().find(".store_layer").removeClass('on');
    }

	mql.addListener(function(e) {
	    if(e.matches) {	
	        //console.log('mo 입니다.');
			$('#sh_map_item').contents().find(".store_layer").addClass('on');
	    } else {
	        //console.log('pc 입니다.');
			$('#sh_map_item').contents().find(".store_layer").removeClass('on');	    
	    }
	});

});

$('.showroom .category .title-btn-wrap .btn').click(function(){
    $(this).parent().toggleClass('active').next().slideToggle();
})


var STORE_MYO_MAP = {

    viewTarget_map : function(obj) {
        var elmTarget = $(obj);	   
                    
        var map_id = elmTarget.parents('div').find('#gmap_id').attr('g-map-url');	
        var map_id_name = elmTarget.parents('div').find('#gmap_id_name').attr('g-map-name');	
        var map_id_add = elmTarget.parents('div').find('#gmap_id_add').attr('g-map-add');	
        var map_id_open = elmTarget.parents('div').find('#gmap_id_open').attr('g-map-open');	
        var map_id_open2 = elmTarget.parents('div').find('#gmap_id_open2').attr('g-map-open2');	
        var map_id_open3 = elmTarget.parents('div').find('#gmap_id_open3').attr('g-map-open3');	
        var map_id_phone = elmTarget.parents('div').find('#gmap_id_phone').attr('g-map-phone');	
                
        var map_print = $('.sto_map_layer');

        var gmap_html =[];
        
            gmap_html.push('<div class="layer_map">');
            gmap_html.push('	<div class="layer_map_google"><iframe src="https://www.google.com/maps/embed?pb='+map_id+'" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');

            gmap_html.push('	</div>');
            gmap_html.push('	<div class="layer_map_add">');
            gmap_html.push('		<span class="name">'+map_id_name+'</span>');
            gmap_html.push('		<span class="add"><span class="title_pad">주소(위치)</span>'+map_id_add+'</span>');
            gmap_html.push('		<span class="time">');
            
            gmap_html.push('			<span class="title_pad">오픈시간</span>');
            
            gmap_html.push('			<span class="open">');
            gmap_html.push('				<span class="open1">'+map_id_open+'</span>');
            gmap_html.push('				<span class="open2">'+map_id_open2+'</span>');
            gmap_html.push('				<span class="open3">'+map_id_open3+'</span>');
            gmap_html.push('			</span>');
            
            gmap_html.push('		</span>');
            gmap_html.push('		<span class="phone"><span class="title_pad">문의전화</span>'+map_id_phone+'</span>');
            gmap_html.push('	</div>');
            gmap_html.push('	<div class="layer_map_close">');
            gmap_html.push('		<span class="map_close">닫기</span>');
            gmap_html.push('	</div>');
            gmap_html.push('</div>');

            
        map_print.html(gmap_html.join('')); //기본 생성 위치	

        //맵 팝업 오픈
        $('.sto_map_layer').addClass('on');
        $('html').css('overflow', 'hidden');


        //맵 팝업 닫기
        $('.map_close').click(function(){				
            $('.sto_map_layer').removeClass('on');
            $('html').css('overflow', 'initial');
        });

    }, 
    viewTarget_main : function(map_id,map_id_name,map_id_add,map_id_open,map_id_open2,map_id_open3,map_id_phone) {

                    
        var map_val = map_id;
        var map_name = map_id_name;
        
        var map_add = map_id_add;
        
        var map_open = map_id_open;
        var map_open2 = map_id_open2;
        var map_open3 = map_id_open3;
        
        var map_phone = map_id_phone;
        
        
/*
        console.log(map_val);
        console.log(map_name);
        console.log(map_add);
        console.log(map_open);
        console.log(map_open2);
        console.log(map_open3);
        console.log(map_phone);
*/

                
        var map_print = $('.sh_map');

        var gmap_html =[];
        
            gmap_html.push('<div class="layer_map">');
            gmap_html.push('	<div class="layer_map_google"><iframe src="https://www.google.com/maps/embed?pb='+map_val+'" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');

            gmap_html.push('	</div>');
            gmap_html.push('</div>');

            
        map_print.html(gmap_html.join('')); //기본 생성 위치	

    }, 

}; //STORE_MYO_MAP

	
