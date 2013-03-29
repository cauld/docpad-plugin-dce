/*
Copyright (c) 2010 Hubert Łępicki <hubert.lepicki@amberbit.com>,
AmberBit - Ruby and Rails programming company <code@amberbit.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

$.fn["clientSidePagination"] = function(options) {
    options = options || {};

    var self = this;
    $(this).data("page", 1);
    $(this).data("per_page", $(this).attr("per-page") || 5);
    $(this).data("num", $(".i", $(self)).size());

    $(this).append("<div class='pagination'><a href='#' class='previous'>&lt;&lt;</a> <span class='current'></span> <a href='#' class='next'>&gt;&gt;</a></div>");
    showPage(1);

    $(".next", $(this)).bind("click", nextPage);
    $(".previous", $(this)).bind("click", previousPage);

    function nextPage(event) {
        event.preventDefault();
        current = $(self).data("page");
        if (Math.ceil($(self).data("num") / $(self).data("per_page")) > current)
            showPage(current + 1);
    }

    function previousPage(event) {
        event.preventDefault();
        current = $(self).data("page");
        if (current > 1)
            showPage(current - 1);
    }

    function showPage(page) {
        $(self).data("page", page);
        $(".i", $(self)).hide();
        for(i=0; i<$(self).data("per_page"); i++) {
            index = $(self).data("per_page") * ($(self).data("page")-1) + i;
            if (index < $(self).data("num"))
                $($(".i", $(self))[index]).show();
            $(".pagination .current", $(self)).html(page+" / "+Math.ceil($(self).data("num") / $(self).data("per_page")));
        }
    }
};

