$(function() {
    function setupPagination() {
        $("#collection-items").clientSidePagination();
    }
    
    function teardownPagination() {
        $('.pagination').remove();
    }
    
    $('#active-collection').on('change', function(e) {
        teardownPagination();
        collectItemsContainerNode.empty();
    
        var selectedCollectionName = encodeURIComponent(this.value);
    
        $.getJSON('/service/get-collection-items?collectionName=' + selectedCollectionName, function(collectionItems) {
            var html,
                items = [];
         
            if (collectionItems && collectionItems.length > 0) {
                $.each(collectionItems, function(key, collectionItem) {
                    html = '<li class="i">' +
                                    '<a href="/edit?slug=' + encodeURIComponent(collectionItem.url) + '">' + 
                                        collectionItem.title + 
                                    '</a>' +
                                '</li>';
                
                    items.push(html);
                });
                
                collectItemsContainerNode.html(items);
                setupPagination();
            } else {
                html = '<li class="i">No items found!</li>';
                items.push(html);
                
                collectItemsContainerNode.html(items);
            }
        });
    });
    
    $('#addbtn').on('click', function() {
         var selectedCollectionName = $('#active-collection :selected').val();
         window.location = '/add?collectionName=' + encodeURIComponent(selectedCollectionName);
    });
    
    //init
    var collectItemsContainerNode = $('#collection-items ul');
    setupPagination();
});