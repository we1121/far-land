document.addEventListener("DOMContentLoaded", () => {
  // 图片上传预览功能
  const uploadArea = document.getElementById("upload-area")
  const fileInput = document.querySelector(".file-input")
  const imagePreview = document.getElementById("image-preview")

  // 拖放功能
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.classList.add("active")
  })

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("active")
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.classList.remove("active")

    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files
      updateImagePreview(e.dataTransfer.files)
    }
  })

  // 点击上传
  fileInput.addEventListener("change", function () {
    updateImagePreview(this.files)
  })

  // 更新图片预览
  function updateImagePreview(files) {
    // 限制最多5张图片
    const maxFiles = 5
    const filesToProcess = Array.from(files).slice(0, maxFiles)

    // 清空预览区域
    imagePreview.innerHTML = ""

    filesToProcess.forEach((file, index) => {
      if (!file.type.match("image.*")) return

      const reader = new FileReader()

      reader.onload = (e) => {
        const previewItem = document.createElement("div")
        previewItem.className = "preview-item"
        previewItem.innerHTML = `
          <img src="${e.target.result}" alt="Preview ${index + 1}">
          <button type="button" class="remove-btn" data-index="${index}">
            <i class="fas fa-times"></i>
          </button>
        `

        imagePreview.appendChild(previewItem)

        // 添加删除按钮事件
        previewItem.querySelector(".remove-btn").addEventListener("click", () => {
          previewItem.remove()
        })
      }

      reader.readAsDataURL(file)
    })
  }

  // 表单验证
  const postForm = document.querySelector(".post-form")

  postForm.addEventListener("submit", (e) => {
    const title = document.getElementById("title").value.trim()
    const content = document.getElementById("content").value.trim()

    if (!title) {
      e.preventDefault()
      alert("Please enter a title for your story.")
      return
    }

    if (!content) {
      e.preventDefault()
      alert("Please share your story in the content area.")
      return
    }

    // 在实际应用中，这里会有更多的验证和AJAX提交
    console.log("Form submitted successfully!")
  })

  // 保存草稿功能
  const saveDraftBtn = document.querySelector(".secondary-btn")

  saveDraftBtn.addEventListener("click", () => {
    const formData = {
      title: document.getElementById("title").value,
      location: document.getElementById("location").value,
      travelDate: document.getElementById("travel-date").value,
      content: document.getElementById("content").value,
      tags: document.getElementById("tags").value,
    }

    // 在实际应用中，这里会将数据保存到localStorage或发送到服务器
    localStorage.setItem("postDraft", JSON.stringify(formData))

    alert("Your draft has been saved!")
  })

  // 加载草稿
  function loadDraft() {
    const savedDraft = localStorage.getItem("postDraft")

    if (savedDraft) {
      const formData = JSON.parse(savedDraft)

      document.getElementById("title").value = formData.title || ""
      document.getElementById("location").value = formData.location || ""
      document.getElementById("travel-date").value = formData.travelDate || ""
      document.getElementById("content").value = formData.content || ""
      document.getElementById("tags").value = formData.tags || ""
    }
  }

  // 页面加载时检查是否有保存的草稿
  loadDraft()
})

