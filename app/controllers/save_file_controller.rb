class SaveFileController < ApplicationController
    def create
        p params[:file_data]
        p params[:file_name]
        p params[:file_mime]
        if(session[:user_id])
            b = SaveFile.create!(user_id: session[:user_id], file_data: params[:file_data], file_name: params[:file_name], file_mime: params[:file_mime])
            render json: b, status: 200
        else
            render json: {error: "Need To Be logged in"}, status: 400
        end
    end
    private
    # def saveFileParams
        # params.permit(:file_data, :file_name, :file_mime)
    # end
end
