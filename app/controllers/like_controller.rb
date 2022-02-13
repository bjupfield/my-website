class LikeController < ApplicationController
    def create
        user = User.find(session[:user_id])
        saved = SaveFile.find(params[:id])
        like = saved.likes.find_by(user_id: session[:user_id])
        if(like === nil)
            p like
            like = saved.likes.create(user_id: session[:user_id])
            render json: like, status: 200
        else
            like = saved.likes.find_by(user_id: session[:user_id])
            like.destroy
            render json: false, status: 200
        end
    rescue ActiveRecord::RecordNotFound => invalid
        render json: {error: invalid}, status: 422
    end 
end
