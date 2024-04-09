document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    
    var title = document.getElementById('titleInput').value;
    var content = document.getElementById('contentInput').value;
    
    // 确保标题已填写
    if (!title.trim()) {
      alert('Please enter your title');
      return;
    }
    
    // 发送数据到服务器
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, content: content })
    })
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
      console.log(data);
      if (data.success) {
        alert('帖子发布成功！');
        // 可以选择重定向到帖子页面或清空表单
      } else {
        alert('帖子发布失败，请重试。');
      }
    })
    .catch(error => {
      console.error('发布帖子时出错：', error);
    });
  });
  
  // 关闭按钮事件处理
  document.querySelector('.plus-icon').addEventListener('click', function() {
    window.location.href = './home.html'; // 这将导航到主页面，确保路径正确

  });
  