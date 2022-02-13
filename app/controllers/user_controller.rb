class UserController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unproccessable_entity
    def create
        user = User.create!(user_params);
        session[:user_id] = user.id
        render json: {username: user.username, id: user.id}, status: 201 
    end
    def login
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {session: session}, status: :created
        else
            render json: { error: "User Invalid"}, status: :unauthorized
        end
    end
    def checkedLoggedIn
        User.find(session[:user_id])
        render json: true, status: 200
    rescue ActiveRecord::RecordNotFound => invalid
        render json: false, status: :unauthorized
    end
    private
    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
    def unproccessable_entity(invalid)
        render json: {errors: invalid.record.errors}, status: 422
    end
end
