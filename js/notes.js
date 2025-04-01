// 这个文件包含与笔记相关的JavaScript功能
// 将来可以用于从后端API获取笔记数据

document.addEventListener("DOMContentLoaded", () => {
  // 模拟从后端获取数据的函数
  function fetchNotes(page = 1, category = "recent") {
    // 在实际应用中，这里会是一个真正的API调用
    // 例如: fetch('/api/notes?page=' + page + '&category=' + category)
    console.log(`Fetching notes: page=${page}, category=${category}`)

    // 这里只是模拟，将来会被实际API调用替换
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟数据
        resolve({
          notes: document.querySelectorAll(".note-card"),
          totalPages: 3,
          currentPage: page,
        })
      }, 300)
    })
  }

  // 初始化分页按钮
  const paginationButtons = document.querySelectorAll(".pagination-btn")
  if (paginationButtons.length) {
    paginationButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // 移除所有活动状态
        paginationButtons.forEach((btn) => btn.classList.remove("active"))
        // 添加活动状态到当前按钮
        this.classList.add("active")

        // 获取页码（如果是下一页按钮，则使用当前页码+1）
        const isNextButton = this.querySelector(".fa-chevron-right")
        let page

        if (isNextButton) {
          const activePage = document.querySelector(".pagination-btn.active:not(:last-child)")
          page = activePage ? Number.parseInt(activePage.textContent) + 1 : 1
        } else {
          page = Number.parseInt(this.textContent)
        }

        // 获取笔记容器的数据源
        const notesContainer = document.getElementById("notes-container")
        const dataSource = notesContainer.getAttribute("data-source") || "recent"

        // 获取笔记数据
        fetchNotes(page, dataSource).then((data) => {
          console.log(`Loaded ${data.notes.length} notes for page ${data.currentPage}`)
          // 在实际应用中，这里会更新DOM显示新的笔记
        })
      })
    })
  }

  // 为将来的筛选功能做准备
  function setupFilters() {
    // 这里可以添加筛选功能的代码
    // 例如按标签、日期、作者等筛选笔记
  }

  // 初始化
  fetchNotes().then((data) => {
    console.log("Notes loaded successfully")
  })
})

