$(function () {
  $('.classify .classify_list').on('click', '.add', function () {
    if (!$(this).siblings('.title').val().trim()) {
      alert('标题不能为空。');
      return;
    }
    if (!$(this).siblings('.file')[0].files[0]) {
      alert('图片不能为空。');
      return;
    }
    var formData = new FormData();
    formData.set('file', $(this).siblings('.file')[0].files[0]);
    formData.set('id', $(this).siblings('.id').val());
    formData.set('title', $(this).siblings('.title').val());
    formData.set('type', 'list_add');
    $(this).text('保存中，请稍等。');
    var that = $(this);
    $.ajax({
      url: '/api/classify',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code == 1) {
          that.removeClass('add').addClass('save').html('保存');
          that.parent().removeClass('clone');
          that.siblings('.delete').show();
          that.siblings('.img')[0].src = data.data.img;
          alert('保存成功。');
        } else {
          that.text('保存');
          alert('保存失败。');
        }
      },
      error: function (error) {
        that.text('保存');
        alert('保存失败。');
      }
    })
  });
  $('.classify .classify_list').on('click', '.save', function () {
    if (!$(this).siblings('.title').val().trim()) {
      alert('标题不能为空。');
      return;
    }
    var formData = new FormData();
    if ($(this).siblings('.file')[0].files[0]) {
      formData.set('file', $(this).siblings('.file')[0].files[0]);
    } else {
      formData.delete('file');
    }
    formData.set('id', $(this).siblings('.id').val());
    formData.set('title', $(this).siblings('.title').val());
    formData.set('type', 'list_update');
    $(this).text('保存中，请稍等。');
    var that = $(this);
    $.ajax({
      url: '/api/classify',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code == 1) {
          that.text('保存');
          that.siblings('.img')[0].src = data.data.img;
          alert('保存成功。');
        } else {
          that.text('保存');
          alert('保存失败。');
        }
      },
      error: function (error) {
        that.text('保存');
        alert('保存失败。');
      }
    })
  });
  $('.classify .classify_list').on('click', '.delete', function () {
    if ($(this).parent().siblings('p').length == 0) {
      alert('请保留一个分类。');
      return;
    } else {
      var deleteIndex = 0;
      for (var i = 0; i < $(this).parent().siblings('p').length; i++) {
        if (!$(this).parent().siblings('p').eq(i).hasClass('clone')) {
          deleteIndex += 1;
        }
      }
      if (deleteIndex == 0) {
        alert('请保留一个分类。');
        return;
      }
    }
    var formData = new FormData();
    formData.set('type', 'list_delete');
    formData.set('id', $(this).siblings('.id').val());
    var that = $(this);
    $.ajax({
      url: '/api/classify',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code == 1) {
          that.parent().remove();
          alert('删除成功。');
        } else {
          that.text('删除');
          alert('删除失败。');
        }
      },
      error: function (data) {
        that.text('删除');
        alert('删除失败。');
      },
    })
  });
  $('.classify .classify_list .addClassify').click(function () {
    if ($(this).siblings('p').length == 9) {
      alert('最多支持添加九条分类。');
      return;
    }
    if ($(this).siblings('p').hasClass('clone')) {
      alert('请先保存上一条数据。');
      return;
    }
    var clone = $(this).siblings('p').last().clone();
    $(clone).addClass('clone');
    $(clone).children('.id').val(Number($(clone).children('.id').val()) + 1);
    $(clone).children('.img')[0].src = '';
    $(clone).children('.file').val('');
    $(clone).children('.title').val('');
    $(clone).children('.save').removeClass('save').addClass('add').html('保存');
    $(clone).children('.delete').hide();
    $(this).siblings('p').last().after(clone);
  });
  $('.classify .classify_banner').on('click', '.add', function () {
    if (!$(this).siblings('.url').val().trim()) {
      alert('url不能为空。');
      return;
    }
    if (!$(this).siblings('.file')[0].files[0]) {
      alert('图片不能为空。');
      return;
    }
    var formData = new FormData();
    formData.set('file', $(this).siblings('.file')[0].files[0]);
    formData.set('id', $(this).siblings('.id').val());
    formData.set('url', $(this).siblings('.url').val());
    formData.set('type', 'banner_add');
    $(this).text('保存中，请稍等。');
    var that = $(this);
    $.ajax({
      url: '/api/classify',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code == 1) {
          that.removeClass('add').addClass('save').html('保存');
          that.parent().removeClass('clone');
          that.siblings('.delete').show();
          that.siblings('.img')[0].src = data.data.img;
          alert('保存成功。');
        } else {
          that.text('保存');
          alert('保存失败。');
        }
      },
      error: function (error) {
        that.text('保存');
        alert('保存失败。');
      }
    })
  });
  $('.classify .classify_banner').on('click', '.save', function () {
    if (!$(this).siblings('.url').val().trim()) {
      alert('url不能为空。');
      return;
    }
    var formData = new FormData();
    if ($(this).siblings('.file')[0].files[0]) {
      formData.set('file', $(this).siblings('.file')[0].files[0]);
    } else {
      formData.delete('file');
    }
    formData.set('id', $(this).siblings('.id').val());
    formData.set('url', $(this).siblings('.url').val());
    formData.set('type', 'banner_update');
    $(this).text('保存中，请稍等。');
    var that = $(this);
    $.ajax({
      url: '/api/classify',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code == 1) {
          that.text('保存');
          that.siblings('.img')[0].src = data.data.img;
          alert('保存成功。');
        } else {
          that.text('保存');
          alert('保存失败。');
        }
      },
      error: function (error) {
        that.text('保存');
        alert('保存失败。');
      }
    })
  });
  $('.classify .classify_banner').on('click', '.delete', function () {
    if ($(this).parent().siblings('p').length == 0) {
      alert('请保留一个分类轮播图。');
      return;
    } else {
      var deleteIndex = 0;
      for (var i = 0; i < $(this).parent().siblings('p').length; i++) {
        if (!$(this).parent().siblings('p').eq(i).hasClass('clone')) {
          deleteIndex += 1;
        }
      }
      if (deleteIndex == 0) {
        alert('请保留一个分类轮播图。');
        return;
      }
    }
    var formData = new FormData();
    formData.set('type', 'banner_delete');
    formData.set('id', $(this).siblings('.id').val());
    var that = $(this);
    $.ajax({
      url: '/api/classify',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.code == 1) {
          that.parent().remove();
          alert('删除成功。');
        } else {
          that.text('删除');
          alert('删除失败。');
        }
      },
      error: function (data) {
        that.text('删除');
        alert('删除失败。');
      },
    })
  });
  $('.classify .classify_banner .addBanner').click(function () {
    if ($(this).siblings('p').length == 10) {
      alert('最多支持添加十条分类轮播图。');
      return;
    }
    if ($(this).siblings('p').hasClass('clone')) {
      alert('请先保存上一条数据。');
      return;
    }
    var clone = $(this).siblings('p').last().clone();
    $(clone).addClass('clone');
    $(clone).children('.id').val(Number($(clone).children('.id').val()) + 1);
    $(clone).children('.img')[0].src = '';
    $(clone).children('.file').val('');
    $(clone).children('.url').val('');
    $(clone).children('.save').removeClass('save').addClass('add').html('保存');
    $(clone).children('.delete').hide();
    $(this).siblings('p').last().after(clone);
  });
})