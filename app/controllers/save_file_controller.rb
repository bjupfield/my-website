class SaveFileController < ApplicationController
    serialization_scope :view_context
    # before_action only: :filesAntiUser do
    #     self.class.serialization_scope :file
    #   end
    def create
        p params[:file_data]
        p params[:file_name]
        p params[:file_mime]
        if(session[:user_id])
            b = SaveFile.create!(user_id: session[:user_id], file_data: params[:file_data], file_name: params[:file_name], file_mime: params[:file_mime], share: false)
            render json: b, status: 200
        else
            render json: {error: "Need To Be logged in"}, status: 400
        end
    end
    def filesUser
        files = SaveFile.where(user: User.find(session[:user_id]))
        render json: files, include: ["likes"], status: 200
    end
    def filesAntiUser
        @files = SaveFile.where.not(user_id: session[:user_id]).where(share: true)
        render json: @files, user_id: session[:user_id], include: ["user", "likes"], each_serializer: SaveFileAntiUserSerializer,  status: 200
    end
    def shareChange
        b = User.find(session[:user_id]).save_files.find(params[:id])
        b.update(share: !b.share)
        render json: true, status: 200
    rescue ActiveRecord::RecordNotFound => invalid
        render json: false, status: :not_found
    end
    def delete
        b = User.find(session[:user_id]).save_files.find(params[:id])
        b.destroy
        render json: true, status: 200
    rescue ActiveRecord::RecordNotFound => invalid
        render json: false, status: :not_found
    end
    private
    # def saveFileParams
        # params.permit(:file_data, :file_name, :file_mime)
    # end
end
