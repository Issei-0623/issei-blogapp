class Api::CommentsController < Api::ApplicationController
    def index
      article = Article.find(params[:article_id])
      comments = article.comments
      render json: comments
    end
  
    def create
      article = Article.find(params[:article_id])
      @comment = article.comments.build(comment_params)

      if @comment.save
        render json: @comment
      else
        render json: { error: '保存失敗' }, status: :unprocessable_entity
      end
    end

    private
    def comment_params
      params.require(:comment).permit(:content)
    end
  end