class HomeController < ApplicationController
    def index
        @title = 'デイトラ'
    end

    def about
        @subtitle = '最高'
    end
end