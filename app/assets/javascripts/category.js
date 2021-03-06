$(function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChildrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='select-wrapper__box '>
                          <select class="select-wrapper__box--select children_wrapper" name="item[category_id]">
                            <option value="---" data-category="選択してください">選択してください</option>
                            ${insertHTML}
                          <select>
                      </div>`;
    $('.select-wrapper').append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成
  function appendGrandchildrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='select-wrapper__box' id= 'grandchildren_wrapper'>
                                <select class="select-wrapper__box--select" id="grandchildren_wrapper" name="item[category_id]">
                                <option value="---" data-category="選択してください">選択してください</option>
                                  ${insertHTML}
                                </select>
                            </div>`;
    $('.select-wrapper').append(grandchildSelectHtml);
  }
  // 親カテゴリー選択後のイベント
  $('#item_category_id').on('change', function(){
    var parentCategory = $('#item_category_id').val(); //選択された親カテゴリーのidを取得
    if (parentCategory != ""){ //親カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/items/get_category_children',
        type: 'GET',
        data: { parent_id: parentCategory },
        dataType: 'json'
      })

      .done(function(children){
        $('.children_wrapper').remove(); //親が変更された時、子以下を削除する
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChildrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('.children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除する
      $('#grandchildren_wrapper').remove();
    }
  });
  // 子カテゴリー選択後のイベント
  $('.select-wrapper').on('change', '.children_wrapper', function(){
    var childCategory = $(this).val(); //選択された子カテゴリーのidを取得
    console.log(childCategory)
    if (childCategory != "---"){ //子カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/items/get_category_grandchildren',
        type: 'GET',
        data: { child_id: childCategory },
        dataType: 'json'
      })
      .done(function(grandchildren){
          $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除する
          $('#size_wrapper').remove();
          $('#brand_wrapper').remove();
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchildrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除する
    }
  });
});

