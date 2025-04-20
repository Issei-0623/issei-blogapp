class ApplicationController < ActionController::Base
    # ActionController::Baseに色々なメソッドが用意されており、自由に使える
    # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
    allow_browser versions: :modern
end  