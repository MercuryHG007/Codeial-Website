// class to toggle likes when a link is clicked, using AJAX

class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'Post',
                URL: $(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).html('${likesCount} Likes')
            })
            .fail(function(errData){
                console.log('Error in completing the request');
            });
        
        });
    }
}