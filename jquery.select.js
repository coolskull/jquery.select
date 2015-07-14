;
(function ($) {

    var skullSelect = {

        init: function (opts, $obj, selectId) {
            var $skullList;
            var self = this;
            self._$obj = $obj;
            self._selectId = selectId;
            self._opts=opts;

            self.disabledSelect();
            self.__popup= $skullList = self.createSelect();
            self.setPosition();
            $obj.parent().on("click", function () {
                self.show($(this).attr("skull"));
            });


            $("li", $skullList).on("click", function () {
                $(this).siblings("li").removeClass("checked");
                $(this).addClass("checked");


                // select change value
                var index = $(this).index();
                self.changeSelectValue(index);
                self.hideAll();
            });

            $("#skull_mask").on("click", function () {
                self.hideAll();
            });

            $(window).resize(function(){
                self.setPosition();
            });
        },

        // disabled select drop-down
        disabledSelect: function () {
            var self = this,
                $wrapper,
                $obj = self._$obj,
                selectId=self._selectId;

            $obj.wrap('<div class="skull_select" skull="' + selectId + '"></div>');
            $wrapper = $obj.parent();
            $wrapper.append('<div class="skull_select_mask"></div>');
        },

        // create popup html
        createSelect: function () {
            var self=this,
                html,
                $obj = self._$obj,
                selectId=self._selectId;

            var $skullList = $('<div id="skullList' + selectId
                + '" class="list radio_block skull_list"></div>');
            html = '<ul>';
            $obj.find('option').each(function (i, opt) {
                opt = $(opt);
                var text = opt.prop('selected') ? ' class="checked"' : '';
                html += '<li' + text + '>'
                    + '<label>' + (opt.text()) + '<i class="icon icon_radio"></i></label>'
                    + '</li>';

            });
            html += '</ul>';
            $skullList.hide();
            $skullList.append(html);
            $("body").append($skullList);

            return $skullList;
        },

        show: function () {
            var self=this;
            $("#skull_mask").show();
            $(".skull_list").hide();
            $("#skullList" + self._selectId).show();

        },

        changeSelectValue: function (index) {
            var self=this;
            var $select = $(".skull_select[skull=" + self._selectId + "]").find("select");
            $select.find('option').eq(index).prop('selected', true);
            $select.trigger("change");
        },

        hideAll: function () {
            $("#skull_mask").hide();
            $(".skull_list").hide();
        },

        fixed:function(){

            // maybe should do something here

            return true;
        },

        setPosition: function () {
            var self=this;
            var position=self._opts.position;

            switch(position){
                case "center":
                    self.setCenter();
                    break;
                case "bottom":
                    self.setBottom();
                    break;
                default:
                    self.setCenter();
            }

        },
        setCenter:function(){
            var self=this;
            var $window = $(window);
            var $document = $(document);
            var popup = self.__popup;
            var fixed = this.fixed;
            var dl = fixed ? 0 : $document.scrollLeft();
            var dt = fixed ? 0 : $document.scrollTop();
            var ww = $window.width();
            var wh = $window.height();
            var ow = popup.width();
            var oh = popup.height();
            var left = (ww - ow) / 2 + dl;
            var top = (wh - oh) * 382 / 1000 + dt;// golden section ratio
            //var style = popup[0].style;
            left = Math.max(parseInt(left), dl);
            top = Math.max(parseInt(top), dt);
            var maxHeight=wh-50;
            if(oh>maxHeight){
                top=top+25;
                popup.css("maxHeight",maxHeight);
            }

            popup.css({
                "left":left,
                "top":top
            });

        },
        setBottom:function(){
            var self=this;
            var popup=self.__popup;
            var height=200;
            var oh = popup.height();
            height = Math.min(oh, height);
            var bottom=0;
            var left=0;
            popup.css({
                "width":"100%",
                "height":height,
                "bottom":bottom,
                "left":left
            });
        }
    };

    $.fn.select = function (options) {

        var opts = $.extend({}, $.fn.select.defaults, options);

        if ($.isPlainObject(opts)) {
            var _count = 0;
            var _expando = new Date() - 0; // Date.now()

            return this.each(function () {
                var selectId, $obj;

                if(_count==0){
                    $('body').append('<div id="skull_mask" style="display: none"></div>');
                }
                $obj = $(this);
                _count++;
                selectId = opts.id || _expando + _count;

                var selectObj = Object.create(skullSelect);
                selectObj.init(opts, $obj, selectId);
                $(this).data('selectObj', selectObj);


            });
        }


    }


    $.fn.select.defaults = {"position":"center"};


})(jQuery);

