console.log("🔥 articles.js loaded")

document.addEventListener("turbo:load", async () => {
  const article = document.getElementById("article-show")
  if (!article) return

  const articleId = article.dataset.articleId
  const csrfToken = document
    .querySelector("meta[name='csrf-token']")
    .content

  const active = document.querySelector(".active-heart")
  const inactive = document.querySelector(".inactive-heart")

  // 初期状態
  const res = await fetch(`/articles/${articleId}/like`)
  const data = await res.json()

  if (data.hasLiked) {
    active.classList.remove("hidden")
    inactive.classList.add("hidden")
  } else {
    inactive.classList.remove("hidden")
    active.classList.add("hidden")
  }

  // like
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

  // unlike
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