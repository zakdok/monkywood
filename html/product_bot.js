if($("#board_category").length > 0){

	// 카테고리 버튼화
	var category_set = document.getElementById('board_category');
	var category_count = category_set.length;
	var option_values = category_set.options[category_set.selectedIndex].value ;
		 
	var boardNum = getParameterByName('board_no');

	var category_html = "";
	for (var i=0 ; i < category_count ; i++ )
	{
		if(i == option_values){
			category_html += "<li class='sel'>";
		}else{
			category_html += "<li>";
		}
		category_html += "<a href='list.html?board_no="+boardNum+"&category_no="+category_set.options[i].value+"'>"+category_set.options[i].text+"";		
		category_html += "<s></s></a></li>";

	}
	document.getElementById('board_select_nav').innerHTML = category_html;
//	console.log(boardNum);
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, ""));
}




/* 후기 게시판 이미지 표현 */
$(document).ready(function () {
/* 	$('.txtBreak > span > i').each(function() { */
	$('.review_a > i').each(function() {
//		console.log($(this).attr('data-idx')+':'+$(this).attr('data-no'));
		BOARD2.viewTarget($(this).attr('data-idx'),$(this).attr('data-no'),this);
	});	

	$('.fl_ck > i').each(function() {
		//console.log($(this).attr('data-idx')+':'+$(this).attr('data-Flag')+':'+$(this).attr('data-no'));
		BOARD2.load_attached_image($(this).attr('data-idx'),$(this).attr('data-Flag'),$(this).attr('data-no'));
	});	
});


var BOARD2 = {

    /**
     * 게시판 첨부 이미지 로드큐
     */
    aAttachImageLoadQueue : [],

    /**
     * 상품후기 리스트 펼침
     * @param int iNo 글번호
     * @param int iBoardNo 게시판번호
     * @param object obj
     */
    viewTarget : function(iNo, iBoardNo, obj) {
        var self = this;
        var elmTarget = $(obj);

        if (elmTarget.parents('div').next().attr('id') == 'content_view') {
            elmTarget.find('img').attr('src', function() {
                return this.src.replace('_fold','_unfold');
            });

            self.changeFoldImg(obj);

            $('#content_view').remove();
            return;
        } else {
            $('#content_view').remove();

            var aData = {
                    'no' : iNo,
                    'board_no' : iBoardNo
            };
            $.get('/exec/front/board/Get/'+iBoardNo, aData, function(req) {
                if (req.failed == false) {
                    var rData = req.data;
                    elmTarget.find('img').attr('src', function() {
                        return this.src.replace('_unfold','_fold');
                    });

                    self.changeFoldImg(obj);

                    var aHtml = [];
                    var bHtml = [];
                    var cHtml = [];
                    if(rData.content_image.length !== 0){
                        
						var sImg = rData.content_image; 
						var arr_img = sImg.split('<br>');
						var arr_cnt = arr_img.length-1;
						
                        aHtml.push( '<div class="popup-slide-outer" id="content_view_'+rData.no+'">');
                            aHtml.push( '<div class="popup-slide-area swiper">');
                                aHtml.push( '<div class="swiper-wrapper slide-wrap">');
                                    arr_img.forEach(function(item, idx){
                                        if(idx < arr_img.length - 1){
                                            aHtml.push( '<div class="swiper-slide slide-con">');
                                                aHtml.push( '<p class="thumbnail">'+arr_img[idx]+'</p>');
                                            aHtml.push('</div>');
                                        }
                                    });
                                aHtml.push('</div>');
                                aHtml.push('</div>');
                                aHtml.push('<div class="swiper-button-prev control-btn"><img src="/images/review-pop-prev.png" alt="prev"></div>');
                                aHtml.push('<div class="swiper-button-next control-btn"><img src="/images/review-pop-next.png" alt="next"></div>');
                        aHtml.push('</div>');


                        bHtml.push(arr_img[0]);

                        cHtml.push( '<div class="slide-thumb-nav">');
                            cHtml.push( '<ul class="dep1-wrap">');
                                arr_img.forEach(function(item, idx){
                                    if(idx < arr_img.length - 1){
                                        cHtml.push( '<li class="dep1-con">');
                                            cHtml.push( '<div class="dep1-inner"><button class="thumb">'+arr_img[idx]+'</button></div>');
                                        cHtml.push('</li>');
                                    }
                                });
                            cHtml.push('</ul>');
                        cHtml.push('</div>');

                        
                    } else {
                        
                    }
                    elmTarget.parents('.list-con').find('.pop-slide').prepend(aHtml.join(''));
                    elmTarget.parents('.list-con').find('.thumb-wrap').prepend(bHtml.join(''));
                    elmTarget.parents('.list-con').find('.pop-slide').append(cHtml.join(''));

                    if (rData.ucc_url){ 
                        $('.ec-ucc-media-box-'+ rData.no).replaceWith(APP_BOARD_UCC.getPreviewElement(rData.ucc_url));
                    }
                } else {
                    BOARD2.setBulletinSpreadFail(req.data);
                }
            }, 'json');
        }
    },
    setBulletinSpreadFail : function (sFailType)
    {
        switch(sFailType) {
            case 'S' :
                // alert(__('비밀글은 미리보기가 불가 합니다.'));
                break;
            case 'M' :
                alert(__('회원에게만 읽기 권한이 있습니다'));
                break;
            case 'A' :
                alert(__('관리자에게만 읽기 권한이 있습니다'));
                break;
        }
    },

    /**
     * 폴딩 이미지 변환
     * 현재 클릭한 이미지 이외에는 모두 '닫힘' 이미지로 만들기 위함
     *
     * @param HtmlElement obj
     */
    changeFoldImg : function(obj) {
        var elmEventList = $('[onclick*="BOARD.viewTarget"]');

        elmEventList.each(function(){
            if (obj !== this) {
                $(this).find('img').attr('src', function() {
                    return this.src.replace('_fold','_unfold');
                });
            }
        });
    },


	/** 
	 * EVENT BOARD 
	*/

/* 	<i data-idx="afile_{$idx}" data-Flag="1" data-no="{$board_no}"></i> */


    afile_display : function (sId, sFlag)
    {
        if (sFlag == 1) {
            $('#'+sId).css('display', 'block');
            //$('#'+sId).css('position', 'absolute');
        } else {
            $('#'+sId).css('display', 'none');
        }
    },
 
	load_attached_image : function(sId, sFlag, iBoardNo)
	{
	    /*
	     * 게시물 번호 계산
	     * sId는 항상 "afile_" 이 prefix 됨 
	     */
	    var iBulletinNo = sId.substr(6,sId.length);
//		console.log(iBulletinNo);
	    
	    //큐에서 해당 게시물의 이미지가 로드중 또는 로드되었는지 체크
	    var iPosition = $.inArray(iBulletinNo, this.aAttachImageLoadQueue);

	    var oTarget = $('#'+sId);
	    
	    //큐 체크
	    if (iPosition === -1) {
	        this.aAttachImageLoadQueue.push(iBulletinNo);
	        
	        var sRequestUrl = '/exec/front/Board/Get?no='+ iBulletinNo +'&board_no='+iBoardNo;
	        $.get(sRequestUrl, function(oResponse){
	            //로드 성공
	            if (oResponse.failed === false) {
	                oTarget.append(oResponse.data.thumbnail_image);
	                BOARD2.afile_display(sId, sFlag);
	            } 
	            //로드 실패
	            else {
	                //큐에서 제거처리하여, 다시 로드 가능하도록 변경
	                BOARD2.aAttachImageLoadQueue.splice(iPosition,1);
	            }
	        },'json');
	    }
	    
	    //이미지 존재 체크
	    if (oTarget.children().is('img') === true) {
	        BOARD2.afile_display(sId, sFlag);
	    }
	},


    END : function() {}
};

