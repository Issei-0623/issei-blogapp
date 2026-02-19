document.addEventListener("turbo:load", async () => {
  const article = document.getElementById("article-show")
  if (!article) return

  const articleId = article.dataset.articleId
  const csrfToken = document.querySelector("meta[name='csrf-token']").content
  const commentsContainer = document.querySelector(".comments-container")

  // コメントを1件描画
  const renderComment = (comment) => {
    const commentDiv = document.createElement("div")
    commentDiv.classList.add("article_comment")

    const p = document.createElement("p")
    p.textContent = comment.content

    commentDiv.appendChild(p)
    commentsContainer.appendChild(commentDiv)
  }

  // コメント一覧取得
  const loadComments = async () => {
    const response = await fetch(`/articles/${articleId}/comments`)
    const comments = await response.json()

    commentsContainer.innerHTML = ""
    comments.forEach(renderComment)
  }

  if (commentsContainer) {
    await loadComments()
  }

  // コメントフォーム表示切替
  const toggleBtn = document.getElementById("comment-toggle")
  const formContainer = document.querySelector(".comment-form-container")

  if (toggleBtn && formContainer) {
    toggleBtn.addEventListener("click", async (e) => {
      e.preventDefault()

      if (formContainer.innerHTML === "") {
        const res = await fetch(`/articles/${articleId}/comments/new`)
        const html = await res.text()
        formContainer.innerHTML = html

        const form = document.getElementById("comment-form")

        if (form) {
          form.addEventListener("submit", async (e) => {
            e.preventDefault()

            const formData = new FormData(form)

            const response = await fetch(form.action, {
              method: "POST",
              headers: { "X-CSRF-Token": csrfToken },
              body: formData
            })

            if (response.ok) {
              const newComment = await response.json()
              renderComment(newComment)
              form.reset()
              formContainer.innerHTML = ""
            }
          })
        }

      } else {
        formContainer.innerHTML = ""
      }
    })
  }

  // いいね処理
  const active = document.querySelector(".active-heart")
  const inactive = document.querySelector(".inactive-heart")

  const res = await fetch(`/articles/${articleId}/like`)
  const data = await res.json()

  if (data.hasLiked) {
    active.classList.remove("hidden")
    inactive.classList.add("hidden")
  } else {
    inactive.classList.remove("hidden")
    active.classList.add("hidden")
  }

  inactive.addEventListener("click", async () => {
    const r = await fetch(`/articles/${articleId}/like`, {
      method: "POST",
      headers: { "X-CSRF-Token": csrfToken }
    })
    if (r.ok) {
      inactive.classList.add("hidden")
      active.classList.remove("hidden")
    }
  })

  active.addEventListener("click", async () => {
    const r = await fetch(`/articles/${articleId}/like`, {
      method: "DELETE",
      headers: { "X-CSRF-Token": csrfToken }
    })
    if (r.ok) {
      active.classList.add("hidden")
      inactive.classList.remove("hidden")
    }
  })
})
