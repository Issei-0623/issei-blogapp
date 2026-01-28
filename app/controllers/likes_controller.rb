class LikesController < ApplicationController
    before_action :authenticate_user!
  
    def show
      article = Article.find(params[:article_id])
      like_status = current_user.has_liked?(article)
       render json: { hasLiked: like_status }
    end

    def create
      article = Article.find(params[:article_id])
      article.likes.create!(user: current_user)
      render json: { status: "ok" }
    end

    def destroy
      article = Article.find(params[:article_id])
      article.likes.find_by!(user: current_user).destroy!
      render json: { status: "ok" }
    end
end