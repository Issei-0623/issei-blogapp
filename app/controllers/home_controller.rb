class HomeController < ApplicationController
    def index
    # デフォルトで何も書かなければ views/home/index.html.erbを表示する
     @article = Article.first
    end

    def about
    @about = 'aboutページに飛んだよ'
    end
end
