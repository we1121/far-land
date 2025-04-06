document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabLinks = document.querySelectorAll(".account-nav li")
  const tabContents = document.querySelectorAll(".account-tab")

  // Check if there's a stored active tab
  const activeTab = localStorage.getItem("activeAccountTab")
  if (activeTab) {
    // Remove active class from all links and contents
    tabLinks.forEach((item) => item.classList.remove("active"))
    tabContents.forEach((item) => item.classList.remove("active"))

    // Add active class to the stored tab
    const tabLink = document.querySelector(`.account-nav li[data-tab="${activeTab}"]`)
    if (tabLink) {
      tabLink.classList.add("active")
      document.getElementById(activeTab).classList.add("active")
    }

    // Clear the stored tab
    localStorage.removeItem("activeAccountTab")
  }

  tabLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active class from all links and contents
      tabLinks.forEach((item) => item.classList.remove("active"))
      tabContents.forEach((item) => item.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Profile picture upload functionality
  const uploadBtn = document.querySelector(".upload-btn")
  const fileInput = document.getElementById("avatar-upload")
  const currentAvatar = document.querySelector(".current-avatar img")
  const removeBtn = document.querySelector(".remove-btn")

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener("click", () => {
      fileInput.click()
    })

    fileInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          currentAvatar.src = e.target.result
        }

        reader.readAsDataURL(this.files[0])
      }
    })
  }

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      currentAvatar.src = "/placeholder.svg?height=150&width=150"
      if (fileInput) {
        fileInput.value = ""
      }
    })
  }

  // Form submission handling
  const forms = document.querySelectorAll(".settings-form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Saving..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = "Saved!"

        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 1500)
      }, 1000)
    })
  })

  // Notification actions
  const markReadBtns = document.querySelectorAll(".mark-read")
  const deleteNotificationBtns = document.querySelectorAll(".delete-notification")
  const markAllReadBtn = document.querySelector(".mark-all-read")
  const clearAllBtn = document.querySelector(".clear-all")

  markReadBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const notification = this.closest(".notification-item")
      notification.classList.remove("unread")
    })
  })

  deleteNotificationBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const notification = this.closest(".notification-item")
      notification.style.opacity = "0"
      setTimeout(() => {
        notification.remove()
      }, 300)
    })
  })

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      const unreadNotifications = document.querySelectorAll(".notification-item.unread")
      unreadNotifications.forEach((notification) => {
        notification.classList.remove("unread")
      })
    })
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      const notifications = document.querySelectorAll(".notification-item")
      notifications.forEach((notification) => {
        notification.style.opacity = "0"
      })

      setTimeout(() => {
        const notificationsList = document.querySelector(".notifications-list")
        if (notificationsList) {
          notificationsList.innerHTML = '<p class="empty-state">No notifications to display.</p>'
        }
      }, 300)
    })
  }

  // Remove saved destination
  const removeSavedBtns = document.querySelectorAll(".remove-saved")

  removeSavedBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".saved-destination-card")
      card.style.opacity = "0"
      setTimeout(() => {
        card.remove()
      }, 300)
    })
  })
})

