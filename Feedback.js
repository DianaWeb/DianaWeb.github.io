class Feedback {
    constructor(source, container = '#feedback', form = '#myform') {
        this.source = source; // 'some.json'
        this.container = container;
        this.form = form;
        this.comments = []; // Все отзывы
        this.curID = 0;
        this._init(this.source);
    }
    _init(source){
        fetch(source)
            .then(result => result.json())
            .then(data => {
                this.curID = data.maxID;
                for(let comment of data.comments){
                    this.comments.push(comment);
                    this._renderComment(comment);
                }
                this._initForm();
            })
    }
    _initForm(){
        $(this.form).submit(e => {
            e.preventDefault();
            if(!$('#author').val() || !$('#text').val()){
                return;
            }
            let comment = {
                id: ++this.curID,
                author: $('#author').val(),
                text: $('#text').val(),
                approved: false
            };
            this.comments.push(comment);
            this._renderComment(comment);
        })
    }
    _renderComment(comment){
        let $wrapper = $('<div/>', {
            class: 'comment',
            'data-id': comment.id
        });
        let $author = $(`<h3 class="name-autor author">${comment.author}</h3>`);
        let $text = $(`<p class="text-feedback text">${comment.text}</p>`);
        let $divFlex = $(`<div class="btn-box"></div>`);
        let $delBtn = $(`<button class="remove-feedback-btn remove-btn">Delete</button>`);
        $wrapper.append($author);
        $wrapper.append($text);
        $wrapper.append($divFlex);
        $delBtn.appendTo($divFlex);
        $delBtn.click(() => {
            this._remove(comment.id);
        });
        if(!comment.approved){
            let $approve = $(`<button class="approve-feedback-btn approve-btn">Approve</button>`);
            $divFlex.append($approve);
            $wrapper.addClass('not-approved');
            $approve.click(() => {
                this._approve(comment.id);
            })
        } else {
            $wrapper.addClass('approved');
        }
        $(this.container).append($wrapper);
    }
    _approve(id){
        let find = this.comments.find(comment => comment.id === id);
        $(`div[data-id="${id}"]`)
            .addClass('approved')
            .removeClass('not-approved')
            .find('.approve-btn')
            .remove();
        find.approve = true;
    }
    _remove(id){
        let find = this.comments.find(comment => comment.id === id);
        this.comments.splice(this.comments.indexOf(find), 1);
        $(`.comment[data-id="${id}"]`).remove();
    }
}