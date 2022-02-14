class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: {count: session[:count]}
    end
    private
    def not_found(invalid)
        render json: {error: invalid}, status: :not_found
    end
end
